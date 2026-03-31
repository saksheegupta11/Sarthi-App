import mongoose from 'mongoose';

export interface ICollege extends mongoose.Document {
  name: string;
  location: string;
  type: 'Government' | 'Private';
  courses: string[];
  eligibility: string;
  link: string;
  image?: string;
  rating?: number;
}

const collegeSchema = new mongoose.Schema<ICollege>({
  name: { type: String, required: true, unique: true },
  location: { type: String, required: true },
  type: { type: String, enum: ['Government', 'Private'], default: 'Government' },
  courses: [String],
  eligibility: String,
  link: String,
  image: String,
  rating: { type: Number, default: 0 },
});

export default mongoose.model<ICollege>('College', collegeSchema);
