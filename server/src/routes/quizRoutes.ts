import express from 'express';
import { authMiddleware } from '../middleware/auth';
import { getQuestions, submitQuiz, getLatestResult } from '../controllers/quizController';

const router = express.Router();

router.get('/questions', authMiddleware, getQuestions);
router.post('/submit', authMiddleware, submitQuiz);
router.get('/result', authMiddleware, getLatestResult);

export default router;