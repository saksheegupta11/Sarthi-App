import mongoose from 'mongoose';

export interface IQuizResult extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  recommendedStream: string;
  suggestedSubjects: string[];
  careerScope: string;
  score: number;
}

const quizResultSchema = new mongoose.Schema<IQuizResult>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  recommendedStream: String,
  suggestedSubjects: [String],
  careerScope: String,
  score: Number,
}, { timestamps: true });

export default mongoose.model<IQuizResult>('QuizResult', quizResultSchema);