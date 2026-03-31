import express from 'express';
import { authMiddleware } from '../middleware/auth';
import {
  getAllColleges,
  saveCollege,
  unsaveCollege,
  getSavedColleges,
} from '../controllers/collegeController';

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// GET /api/colleges - Get all colleges
router.get('/', getAllColleges);

// POST /api/colleges/save - Save a college
// Body: { name: string }
router.post('/save', saveCollege);

// POST /api/colleges/unsave - Unsave a college
// Body: { name: string }
router.post('/unsave', unsaveCollege);

// GET /api/colleges/saved - Get user's saved colleges
router.get('/saved', getSavedColleges);

export default router;
