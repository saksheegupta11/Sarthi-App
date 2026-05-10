import { Request, Response } from 'express';
import User from '../models/User';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

// Generate 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Send OTP via email
const sendOTP = async (email: string, otp: string) => {
  console.log('Attempting to send OTP. Credentials status:', {
    user: !!process.env['EMAIL_USER'],
    pass: !!process.env['EMAIL_PASS']
  });

  if (!process.env['EMAIL_USER'] || !process.env['EMAIL_PASS']) {
    const missing = !process.env['EMAIL_USER'] ? 'EMAIL_USER' : 'EMAIL_PASS';
    console.error(`Missing Environment Variable: ${missing}`);
    throw new Error(`Email configuration error: ${missing} is missing`);
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // Use STARTTLS
    auth: {
      user: process.env['EMAIL_USER'],
      pass: process.env['EMAIL_PASS'],
    },
    tls: {
      rejectUnauthorized: false,
      minVersion: 'TLSv1.2'
    }
  });

  const mailOptions = {
    from: `"Sarthi App" <${process.env['EMAIL_USER']}>`,
    to: email,
    subject: 'Your Sarthi Login OTP',
    text: `Your OTP is: ${otp}. It is valid for 3 minutes.`,
    html: `<div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee;">
      <h2 style="color: #4A90E2;">Sarthi Login Verification</h2>
      <p>Use the following One-Time Password (OTP) to complete your login:</p>
      <div style="font-size: 24px; font-weight: bold; padding: 10px; background: #f9f9f9; text-align: center; letter-spacing: 5px;">
        ${otp}
      </div>
      <p>This OTP is valid for <strong>3 minutes</strong>.</p>
      <p>If you didn't request this, please ignore this email.</p>
    </div>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Detailed Nodemailer Error:', error);
    throw error;
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

    // Upsert user (only if not login, or if login it will just update)
    // Actually, if it's login, the user must exist. If it's registration, it will be created.
    // Upsert user
    try {
      await User.findOneAndUpdate(
        { email },
        { email, otp, otpExpiry },
        { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true }
      );
    } catch (dbError) {
      console.error('Database Error in requestOTP:', dbError);
      res.status(500).json({ message: 'Database error while generating OTP' });
      return;
    }

    try {
      await sendOTP(email, otp);
      res.json({ message: 'OTP sent successfully' });
    } catch (mailError) {
      console.error('Email Error in requestOTP:', mailError);
      res.status(500).json({ message: 'Failed to send OTP email' });
    }
  } catch (error) {
    console.error('General Error in requestOTP:', error);
    res.status(500).json({ message: 'An unexpected error occurred' });
  }
};

// Verify OTP
export const verifyOTP = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user || user.otp !== otp || !user.otpExpiry || user.otpExpiry < new Date()) {
      res.status(401).json({ message: 'Invalid or expired OTP' });
      return;
    }

    // Clear OTP fields in database using $unset
    await User.updateOne({ _id: user._id }, { $unset: { otp: "", otpExpiry: "" } });

    // Generate JWT
    const jwtSecret = process.env['JWT_SECRET'];
    if (!jwtSecret) {
      console.error('JWT_SECRET is not defined');
      res.status(500).json({ message: 'Server configuration error' });
      return;
    }

    const token = jwt.sign({ userId: user._id, email: user.email }, jwtSecret, {
      expiresIn: '7d',
    });

    // Return user data (without OTP fields)
    const userData = {
      email: user.email,
      name: user.name,
      language: user.language,
      appearance: user.appearance,
    };

    res.json({ token, user: userData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Verification failed' });
  }
};

// Get current user (protected)
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