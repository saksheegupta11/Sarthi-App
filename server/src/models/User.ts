import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  email: string;
  name?: string;
  dateOfBirth?: string;
  school?: string;
  classYear?: string;
  language: string;           // 'en', 'hi', etc.
  appearance: 'light' | 'dark';
  savedScholarships: string[]; // titles
  savedInternships: string[];
  otp?: string;
  otpExpiry?: Date;
}

const userSchema = new mongoose.Schema<IUser>({
  email: { type: String, required: true, unique: true },
  name: String,
  dateOfBirth: String,
  school: String,
  classYear: String,
  language: { type: String, default: 'en' },
  appearance: { type: String, enum: ['light', 'dark'], default: 'light' },
  savedScholarships: [String],
  savedInternships: [String],
  otp: String,
  otpExpiry: Date,
}, { timestamps: true });

export default mongoose.model<IUser>('User', userSchema);