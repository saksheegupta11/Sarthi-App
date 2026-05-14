import { Request, Response } from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import { google } from 'googleapis';

// Generate 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Send OTP via Gmail API (HTTPS) to bypass Render's SMTP block
const sendOTP = async (email: string, otp: string) => {
  if (!process.env['GOOGLE_CLIENT_ID'] || !process.env['GOOGLE_CLIENT_SECRET'] || !process.env['GOOGLE_REFRESH_TOKEN']) {
    throw new Error('Google OAuth credentials are missing in environment variables');
  }

  const oAuth2Client = new google.auth.OAuth2(
    process.env['GOOGLE_CLIENT_ID'],
    process.env['GOOGLE_CLIENT_SECRET'],
    "https://developers.google.com/oauthplayground"
  );

  oAuth2Client.setCredentials({ refresh_token: process.env['GOOGLE_REFRESH_TOKEN'] });

  const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

  const rawMessage = [
    `From: "Sarthi App" <${process.env['EMAIL_USER']}>`,
    `To: ${email}`,
    `Subject: Your Sarthi Login OTP`,
    `Content-Type: text/html; charset=utf-8`,
    ``,
    `<div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee;">
      <h2 style="color: #4A90E2;">Sarthi Login Verification</h2>
      <p>Use the following OTP to complete your login:</p>
      <div style="font-size: 24px; font-weight: bold; padding: 10px; background: #f9f9f9; text-align: center; letter-spacing: 5px;">
        ${otp}
      </div>
      <p>This OTP is valid for <strong>3 minutes</strong>.</p>
      <p>If you didn't request this, please ignore this email.</p>
    </div>`
  ].join('\r\n');

  // The Gmail API requires base64url encoded strings
  const encodedMessage = Buffer.from(rawMessage)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  try {
    const info = await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodedMessage,
      },
    });
    console.log(`OTP sent to ${email}: ${info.data.id}`);
  } catch (error) {
    console.error('Gmail API error:', error);
    throw new Error('Failed to send OTP email');
  }
};

// Request OTP
export const requestOTP = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, isLogin } = req.body;
    if (!email) {
      res.status(400).json({ message: 'Email required' });
      return;
    }

    if (isLogin) {
      const user = await User.findOne({ email });
      if (!user) {
        res.status(404).json({ message: 'Email is not registered. Please use a registered email.' });
        return;
      }
    }

    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 3 * 60 * 1000); // 3 minutes

    await User.findOneAndUpdate(
      { email },
      { $set: { email, otp, otpExpiry } },
      { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true }
    );

    await sendOTP(email, otp);
    res.json({ message: 'OTP sent successfully' });
  } catch (error: any) {
    console.error('requestOTP error:', error);
    res.status(500).json({ message: error.message || 'Failed to send OTP' });
  }
};

// Verify OTP (unchanged)
export const verifyOTP = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user || user.otp !== otp || !user.otpExpiry || user.otpExpiry < new Date()) {
      res.status(401).json({ message: 'Invalid or expired OTP' });
      return;
    }

    await User.updateOne({ _id: user._id }, { $unset: { otp: "", otpExpiry: "" } });

    const jwtSecret = process.env['JWT_SECRET'];
    if (!jwtSecret) {
      res.status(500).json({ message: 'Server configuration error' });
      return;
    }

    const token = jwt.sign({ userId: user._id, email: user.email }, jwtSecret, { expiresIn: '7d' });

    res.json({
      token,
      user: {
        _id: user._id,
        email: user.email,
        name: user.name || "",
        language: user.language,
        appearance: user.appearance,
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Verification failed' });
  }
};

// Get current user
export const getMe = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.userId;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    const user = await User.findById(userId).select('-otp -otpExpiry');
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};