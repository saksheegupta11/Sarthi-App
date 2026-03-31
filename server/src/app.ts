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
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/scholarships', scholarshipRoutes);
app.use('/api/internships', internshipRoutes);
app.use('/api/mocktest', mockTestRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/colleges', collegeRoutes);

if (process.env['NODE_ENV'] !== 'production') {
  const PORT = process.env['PORT'] || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;