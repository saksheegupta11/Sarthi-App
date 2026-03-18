import { Request, Response } from 'express';
import MockTestQuestion from '../models/MockTestQuestion';

export const getQuestions = async (req: Request, res: Response): Promise<void> => {
  try {
    const subject = req.params['subject'];
    if (!subject) {
      res.status(400).json({ message: 'Subject is required' });
      return;
    }

    const questions = await MockTestQuestion.aggregate([
      { $match: { subject } },
      { $sample: { size: 10 } },
    ]);

    if (questions.length === 0) {
      res.status(404).json({ message: 'No questions found for this subject' });
      return;
    }

    const questionsForClient = questions.map(q => ({
      _id: q._id,
      question: q.question,
      options: q.options,
    }));

    res.json(questionsForClient);
  } catch (error) {
    console.error('Error in getQuestions:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const submitTest = async (req: Request, res: Response): Promise<void> => {
  try {
    const { subject, answers, questionIds } = req.body;

    console.log("📥 Mock test submission:", { subject, answers, questionIds });

    if (!subject || !answers || !questionIds || !Array.isArray(answers) || !Array.isArray(questionIds)) {
      console.error("❌ Invalid request data:", { subject, answers, questionIds });
      res.status(400).json({ message: 'Invalid request data' });
      return;
    }

    const validQuestionIds = questionIds.filter((id: string) => 
      id && id.match(/^[0-9a-fA-F]{24}$/)
    );
    
    if (validQuestionIds.length === 0) {
      console.error("❌ No valid question IDs:", questionIds);
      res.status(400).json({ message: 'Invalid question IDs' });
      return;
    }

    const questions = await MockTestQuestion.find({ 
      _id: { $in: validQuestionIds } 
    });

    console.log(`📚 Found ${questions.length} questions in database`);

    if (questions.length === 0) {
      res.status(404).json({ message: 'Questions not found' });
      return;
    }

    const questionMap = new Map(questions.map(q => [q._id.toString(), q]));

    let score = 0;
    for (let i = 0; i < questionIds.length; i++) {
      const qid = questionIds[i];
      const question = questionMap.get(qid);
      if (question) {
        const userAnswer = answers[i];
        const correctAnswer = question.correctAnswer;
        
        console.log(`Q${i}: user=${userAnswer}, correct=${correctAnswer}, match=${userAnswer === correctAnswer}`);
        
        if (userAnswer === correctAnswer) {
          score++;
        }
      } else {
        console.warn(`⚠️ Question ID ${qid} not found in database`);
      }
    }

    const total = questions.length;
    const percentage = (score / total) * 100;
    const rating = percentage >= 80 ? 'Excellent' : percentage >= 50 ? 'Good' : 'Needs Improvement';

    console.log(`✅ Score: ${score}/${total}, Rating: ${rating}`);

    res.json({ subject, score, total, rating });
  } catch (error) {
    console.error('❌ Error in submitTest:', error);
    res.status(500).json({ message: 'Failed to submit test' });
  }
};