import express from 'express';
import { authMiddleware } from '../middleware/auth';
import {
  getAllScholarships,
  saveScholarship,
  getSavedScholarships,
} from '../controllers/scholarshipController';

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// GET /api/scholarships - Get all scholarships
router.get('/', getAllScholarships);

// POST /api/scholarships/save - Save a scholarship
// Body: { title: string }
router.post('/save', saveScholarship);

// GET /api/scholarships/saved - Get user's saved scholarships
router.get('/saved', getSavedScholarships);

export default router;