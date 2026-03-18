import mongoose from 'mongoose';

export interface IMockTestQuestion extends mongoose.Document {
  subject: string;
  question: string;
  options: string[];
  correctAnswer: number; // index of correct option
}

const mockTestQuestionSchema = new mongoose.Schema<IMockTestQuestion>({
  subject: { type: String, required: true, index: true },
  question: String,
  options: [String],
  correctAnswer: Number,
});

export default mongoose.model<IMockTestQuestion>('MockTestQuestion', mockTestQuestionSchema);