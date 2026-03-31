import { Request, Response } from 'express';
import User from '../models/User';
import { fetchCollegesFromAPIs } from '../services/collegeApiService';

export const getAllColleges = async (_req: Request, res: Response): Promise<void> => {
  try {
    const colleges = await fetchCollegesFromAPIs();
    res.json(colleges);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const saveCollege = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name } = req.body;
    const userId = req.userId;

    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    await User.findByIdAndUpdate(userId, {
      $addToSet: { savedColleges: name },
    });

    res.json({ message: 'College saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to save college' });
  }
};

export const unsaveCollege = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name } = req.body;
    const userId = req.userId;

    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    await User.findByIdAndUpdate(userId, {
      $pull: { savedColleges: name },
    });

    res.json({ message: 'College removed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to remove college' });
  }
};

export const getSavedColleges = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.userId;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const user = await User.findById(userId);
    res.json(user?.savedColleges || []);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
