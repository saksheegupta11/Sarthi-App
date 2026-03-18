// =============================================
// 📦 TYPES FOR BACKEND API RESPONSES
// =============================================

// User Profile
export interface Profile {
  _id?: string;
  email: string;
  name?: string;
  dateOfBirth?: string;
  school?: string;
  classYear?: string;
  language: string;
  appearance: 'light' | 'dark';
  savedScholarships?: string[];
  savedInternships?: string[];
  createdAt?: string;
  updatedAt?: string;
}

// Quiz
export interface CareerQuizQuestion {
  question: string;
  options: string[];
  categoryScores?: number[];
}

export interface CareerQuizResult {
  recommendedStream: string;
  suggestedSubjects: string[];
  careerScope: string;
  score: number;
  createdAt?: string;
}

// Scholarships
export interface Scholarship {
  title: string;
  description: string;
  eligibility: string;
  link: string;
  type: 'Government' | 'Private';
  deadline?: string;
  amount?: string;
}

// Internships
export interface Internship {
  title: string;
  description: string;
  company: string;
  location?: string;
  duration?: string;
  eligibility?: string;
  link: string;
  category: 'Engineering' | 'Medical' | 'Commerce' | 'Arts';
}

// Mock Tests
export interface MockTestQuestion {
  question: string;
  options: string[];
  // correctAnswer is not sent to client during test
}

export interface MockTestResult {
  subject: string;
  score: number;
  total: number;
  rating: 'Excellent' | 'Good' | 'Needs Improvement';
}

// Chatbot
export interface ChatMessage {
  _id?: string;
  sender: 'User' | 'Chatbot';
  message: string;
  timestamp: string;
}

// API Response Types (if needed)
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status?: string;
}