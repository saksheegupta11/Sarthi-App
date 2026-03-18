import mongoose from 'mongoose';

export interface IChatMessage extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  sessionId: string;
  sender: 'User' | 'Chatbot';
  message: string;
  timestamp: Date;
}

const chatMessageSchema = new mongoose.Schema<IChatMessage>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  sessionId: { type: String, required: true, index: true },
  sender: { type: String, enum: ['User', 'Chatbot'] },
  message: String,
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model<IChatMessage>('ChatMessage', chatMessageSchema);