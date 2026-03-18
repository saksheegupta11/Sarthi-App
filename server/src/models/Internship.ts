import mongoose from 'mongoose';

export interface IInternship extends mongoose.Document {
  title: string;
  description: string;
  company: string;
  duration: string;
  eligibility: string;
  link: string;
  category: string; // Engineering, Medical, Commerce, Arts
}

const internshipSchema = new mongoose.Schema<IInternship>({
  title: { type: String, required: true, unique: true },
  description: String,
  company: String,
  duration: String,
  eligibility: String,
  link: String,
  category: String,
});

export default mongoose.model<IInternship>('Internship', internshipSchema);