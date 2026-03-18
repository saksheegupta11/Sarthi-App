import express from 'express';
import { authMiddleware } from '../middleware/auth';
import { getProfile, updateProfile } from '../controllers/profileController';

const router = express.Router();

router.get('/', authMiddleware, getProfile);
router.put('/', authMiddleware, updateProfile);

export default router;