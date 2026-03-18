import { Request, Response } from 'express';
import User from '../models/User';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

// Generate 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Send OTP via email
const sendOTP = async (email: string, otp: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env['EMAIL_USER'],
      pass: process.env['EMAIL_PASS'],
    },
  });

  const mailOptions = {
    from: process.env['EMAIL_USER'],
    to: email,
    subject: 'Your Sarthi Login OTP',
    text: `Your OTP is: ${otp}. It is valid for 10 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Nodemailer Error:', error);
    throw error;
  }
};

// temporary email method for testing
// const sendOTP = async (email: string, otp: string) => {
//   // Use fixed Ethereal credentials (jo abhi generate kiye the)
//   const transporter = nodemailer.createTransport({
//     host: 'smtp.ethereal.email',
//     port: 587,
//     secure: false,
//     auth: {
//       user: 'w7j54acvulfxbkgn@ethereal.email',  // copy from above
//       pass: 'M9NKQybrYpm21vVxX1',  // copy from above
//     },
//   });

//   const mailOptions = {
//     from: '"Sarthi" <sarthi@example.com>',
//     to: email,
//     subject: 'Your Sarthi Login OTP',
//     text: `Your OTP is: ${otp}. It is valid for 10 minutes.`,
//     html: `<b>Your OTP is: ${otp}</b><br>It is valid for 10 minutes.`,
//   };

//   const info = await transporter.sendMail(mailOptions);
//   console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info)); // ← yahan OTP dikhega
// };

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
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Upsert user (only if not login, or if login it will just update)
    // Actually, if it's login, the user must exist. If it's registration, it will be created.
    await User.findOneAndUpdate(
      { email },
      { email, otp, otpExpiry },
      { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true }
    );

    await sendOTP(email, otp);
    res.json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error in requestOTP:', error);
    res.status(500).json({ message: 'Failed to send OTP' });
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