import express from 'express';
import { authMiddleware } from '../middleware/auth';
import {
  getQuestions,
  submitTest,
} from '../controllers/mockTestController';

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// GET /api/mocktest/questions/:subject - Get questions for a specific subject
router.get('/questions/:subject', getQuestions);

// POST /api/mocktest/submit - Submit test answers
// Expected body: { subject: string, answers: number[] }
router.post('/submit', submitTest);

export default router;