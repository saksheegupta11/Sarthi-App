import express from 'express';
import { authMiddleware } from '../middleware/auth';
import {
  getAllInternships,
  saveInternship,
  unsaveInternship,
  getSavedInternships,
} from '../controllers/internshipController';

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

router.get('/', getAllInternships);
router.post('/save', saveInternship);
router.post('/unsave', unsaveInternship);
router.get('/saved', getSavedInternships);

export default router;