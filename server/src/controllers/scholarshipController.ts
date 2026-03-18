import { Request, Response } from 'express';
import User from '../models/User';
import { fetchScholarshipsFromAPIs } from '../services/scholarshipApiService';

export const getAllScholarships = async (_req: Request, res: Response): Promise<void> => {
  try {
    const scholarships = await fetchScholarshipsFromAPIs();
    res.json(scholarships);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const saveScholarship = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title } = req.body;
    const userId = req.userId;

    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    await User.findByIdAndUpdate(userId, {
      $addToSet: { savedScholarships: title },
    });

    res.json({ message: 'Scholarship saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to save scholarship' });
  }
};

export const getSavedScholarships = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.userId;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const user = await User.findById(userId);
    res.json(user?.savedScholarships || []);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};