import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import connectDB from './config/db';

import authRoutes from './routes/authRoutes';
import profileRoutes from './routes/profileRoutes';
import quizRoutes from './routes/quizRoutes';
import scholarshipRoutes from './routes/scholarshipRoutes';
import internshipRoutes from './routes/internshipRoutes';
import mockTestRoutes from './routes/mockTestRoutes';
import chatbotRoutes from './routes/chatbotRoutes';
import collegeRoutes from './routes/collegeRoutes';

dotenv.config();

// Connect Database
connectDB();

const app = express();

// ✅ CORRECT CORS CONFIGURATION
const allowedOrigins = [
  'https://sarthi-df5g6jotv-saksheegupta986-1149s-projects.vercel.app',
  'http://localhost:5173',  // local development ke liye (agar Vite use kar rahe ho)
  'http://localhost:3000'   // local React ke liye
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,  // cookies, authorization headers ke liye
}));

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/scholarships', scholarshipRoutes);
app.use('/api/internships', internshipRoutes);
app.use('/api/mocktest', mockTestRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/colleges', collegeRoutes);

// Server Port
const PORT = process.env['PORT'] || 5000;

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;