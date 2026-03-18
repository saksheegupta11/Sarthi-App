import mongoose from 'mongoose';

export interface IScholarship extends mongoose.Document {
  title: string;
  description: string;
  eligibility: string;
  link: string;
  type: 'Government' | 'Private'; // for filtering
}

const scholarshipSchema = new mongoose.Schema<IScholarship>({
  title: { type: String, required: true, unique: true },
  description: String,
  eligibility: String,
  link: String,
  type: { type: String, enum: ['Government', 'Private'], default: 'Government' },
});

export default mongoose.model<IScholarship>('Scholarship', scholarshipSchema);