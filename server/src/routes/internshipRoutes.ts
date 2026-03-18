import express from 'express';
import { authMiddleware } from '../middleware/auth';
import {
  getAllInternships,
  saveInternship,
  getSavedInternships,
} from '../controllers/internshipController';

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

router.get('/', getAllInternships);
router.post('/save', saveInternship);
router.get('/saved', getSavedInternships);

export default router;