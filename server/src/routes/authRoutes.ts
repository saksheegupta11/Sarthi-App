import express from 'express';
import { requestOTP, verifyOTP, getMe } from '../controllers/authController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

router.post('/request-otp', requestOTP);
router.post('/verify-otp', verifyOTP);
router.get('/me', authMiddleware, getMe);

export default router;