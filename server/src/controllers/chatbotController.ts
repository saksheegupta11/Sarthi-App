import { Request, Response } from 'express';
import ChatMessage from '../models/ChatMessage';
import { getChatbotReply } from '../services/chatbotApiService';
import mongoose from 'mongoose';

export const sendMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { message, sessionId } = req.body;
    const userId = req.userId;

    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    if (!sessionId) {
      res.status(400).json({ message: 'sessionId is required' });
      return;
    }

    await ChatMessage.create({
      userId,
      sessionId,
      sender: 'User',
      message,
      timestamp: new Date(),
    });

    const { reply } = await getChatbotReply(message);

    await ChatMessage.create({
      userId,
      sessionId,
      sender: 'Chatbot',
      message: reply,
      timestamp: new Date(),
    });

    res.json({ reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to process message' });
  }
};

export const getHistory = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.userId;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const sessionId = req.query['sessionId'];

    const filter: Record<string, unknown> = { userId };
    if (sessionId && typeof sessionId === 'string') {
      filter['sessionId'] = sessionId;
    }

    const messages = await ChatMessage.find(filter).sort({ timestamp: 1 });
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getSessions = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.userId;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    // Aggregate sessions: group by sessionId, get first user message as preview, and latest timestamp
    const sessions = await ChatMessage.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId as string) } },
      { $sort: { timestamp: 1 } },
      {
        $group: {
          _id: '$sessionId',
          firstUserMessage: {
            $first: {
              $cond: [{ $eq: ['$sender', 'User'] }, '$message', null],
            },
          },
          preview: { $first: '$message' },
          latestTimestamp: { $last: '$timestamp' },
          messageCount: { $sum: 1 },
        },
      },
      { $sort: { latestTimestamp: -1 } },
      {
        $project: {
          sessionId: '$_id',
          _id: 0,
          preview: 1,
          firstUserMessage: 1,
          latestTimestamp: 1,
          messageCount: 1,
        },
      },
    ]);

    res.json(sessions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch sessions' });
  }
};