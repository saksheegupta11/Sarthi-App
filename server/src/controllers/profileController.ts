import { Request, Response } from 'express';
import User from '../models/User';

export const getProfile = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.userId).select('-otp -otpExpiry');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { name, dateOfBirth, school, classYear, language, appearance } = req.body;
    console.log('Attempting to update profile for userId:', req.userId, 'with data:', req.body);

    const user = await User.findByIdAndUpdate(
      req.userId,
      { name, dateOfBirth, school, classYear, language, appearance },
      { new: true, runValidators: true }
    ).select('-otp -otpExpiry');

    if (!user) {
      console.error('User not found during profile update:', req.userId);
      res.status(404).json({ message: 'User not found' });
      return;
    }

    console.log('Profile updated successfully for:', user.email);
    res.json(user);
  } catch (error: any) {
    console.error('Profile Update Error:', error);
    res.status(500).json({ message: 'Failed to update profile', error: error.message });
  }
};