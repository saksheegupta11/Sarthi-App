import { Request, Response } from 'express';
import User from '../models/User';
import { fetchInternshipsFromAPIs, ApiInternship } from '../services/internshipApiService';

// GET /api/internships
export const getAllInternships = async (req: Request, res: Response): Promise<void> => {
  try {
    // Fetch from APIs (with fallbacks)
    const apiInternships = await fetchInternshipsFromAPIs();

    // Optional: apply client-side filtering (if needed)
    const search = req.query['search'] as string | undefined;

    let filteredInternships = apiInternships;

    if (search) {
      const lowerSearch = search.toLowerCase();
      filteredInternships = apiInternships.filter(
        (internship: ApiInternship) =>
          internship.title.toLowerCase().includes(lowerSearch) ||
          internship.company.toLowerCase().includes(lowerSearch) ||
          internship.description.toLowerCase().includes(lowerSearch)
      );
    }

    res.json(filteredInternships);
  } catch (error) {
    console.error('Error fetching internships:', error);
    res.status(500).json({ message: 'Failed to fetch internships' });
  }
};

// POST /api/internships/save
export const saveInternship = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title } = req.body;
    const userId = req.userId;

    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    await User.findByIdAndUpdate(userId, {
      $addToSet: { savedInternships: title },
    });

    res.json({ message: 'Internship saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to save internship' });
  }
};

// GET /api/internships/saved
export const getSavedInternships = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.userId;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const user = await User.findById(userId);
    res.json(user?.savedInternships || []);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};