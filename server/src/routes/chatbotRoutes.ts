import express from 'express';
import { authMiddleware } from '../middleware/auth';
import {
  sendMessage,
  getHistory,
  getSessions,
} from '../controllers/chatbotController';

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// POST /api/chatbot/message - Send a message to chatbot
// Expected body: { message: string, sessionId: string }
router.post('/message', sendMessage);

// GET /api/chatbot/history?sessionId=... - Get chat history (optional session filter)
router.get('/history', getHistory);

// GET /api/chatbot/sessions - Get all session summaries for sidebar
router.get('/sessions', getSessions);

export default router;