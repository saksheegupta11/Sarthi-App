import { Request, Response } from 'express';
import QuizResult from '../models/QuizResult';

const quizQuestions = [
  {
    question: "Which subject do you enjoy the most?",
    options: ["Mathematics", "Biology", "Economics", "History"],
    categoryScores: [3, 1, 2, 0],
  },
  {
    question: "What kind of activities do you prefer during your free time?",
    options: ["Solving puzzles and logic problems", "Reading science magazines or watching documentaries", "Managing budgets or organizing events", "Visiting museums or historical sites"],
    categoryScores: [3, 1, 2, 0],
  },
  {
    question: "Which of these skills do you want to develop?",
    options: ["Coding and software development", "Conducting experiments and research", "Financial analysis and investment", "Writing and communication"],
    categoryScores: [3, 1, 2, 0],
  },
  {
    question: "What is your approach to solving problems?",
    options: ["Analytical and logical", "Observational and experimental", "Practical and results-oriented", "Creative and conceptual"],
    categoryScores: [3, 1, 2, 0],
  },
  {
    question: "Which environment do you find most stimulating?",
    options: ["A lab or workshop", "A library or study", "A business meeting or conference", "An art studio or theatre"],
    categoryScores: [1, 3, 2, 0],
  },
  {
    question: "What motivates you to learn something new?",
    options: ["Curiosity about how things work", "Desire to help others or improve health", "Ambition for success and recognition", "Passion for knowledge and understanding"],
    categoryScores: [2, 1, 3, 0],
  },
  {
    question: "Which of these careers sounds most interesting to you?",
    options: ["Software Engineer", "Doctor or Surgeon", "Chartered Accountant", "Journalist or Author"],
    categoryScores: [3, 1, 2, 0],
  },
  {
    question: "How do you handle complex information?",
    options: ["Break it down into smaller parts", "Research and verify facts", "Use it to make decisions", "Interpret and present it"],
    categoryScores: [2, 1, 3, 0],
  },
  {
    question: "What kind of impact do you want to make on the world?",
    options: ["Technological innovation", "Medical advancements", "Economic growth", "Cultural enrichment"],
    categoryScores: [3, 1, 2, 0],
  },
  {
    question: "Which of these qualities do you value most in a team?",
    options: ["Problem-solving skills", "Attention to detail", "Leadership", "Creativity"],
    categoryScores: [2, 1, 3, 0],
  },
];

export const getQuestions = (_req: Request, res: Response): void => {
  res.json(quizQuestions);
};

export const submitQuiz = async (req: Request, res: Response): Promise<void> => {
  try {
    const { answers } = req.body;
    const userId = req.userId;

    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    console.log("📥 Received quiz answers:", answers);

    let scienceScore = 0;
    let medicalScore = 0;
    let commerceScore = 0;
    let artsScore = 0;

    for (let i = 0; i < answers.length; i++) {
      const question = quizQuestions[i];
      if (!question) continue;

      const selectedOption = answers[i];
      // categoryScores layout: [scienceScore, medicalScore, commerceScore, artsScore]
      const scores = question.categoryScores;
      scienceScore  += Number(scores[0] ?? 0) * (selectedOption === 0 ? 1 : 0);
      medicalScore  += Number(scores[1] ?? 0) * (selectedOption === 1 ? 1 : 0);
      commerceScore += Number(scores[2] ?? 0) * (selectedOption === 2 ? 1 : 0);
      artsScore     += Number(scores[3] ?? 0) * (selectedOption === 3 ? 1 : 0);
    }

    const maxScore = Math.max(scienceScore, medicalScore, commerceScore, artsScore);
    let recommendedStream = "Science/Engineering";
    if (maxScore === medicalScore) recommendedStream = "Medical";
    else if (maxScore === commerceScore) recommendedStream = "Commerce";
    else if (maxScore === artsScore) recommendedStream = "Arts";

    const result = new QuizResult({
      userId,
      recommendedStream,
      suggestedSubjects: [],
      careerScope: `Career scope for ${recommendedStream}`,
      score: maxScore,
    });
    await result.save();

    console.log("✅ Quiz result saved:", result);
    res.json(result);
  } catch (error) {
    console.error('❌ Quiz submission error:', error);
    res.status(500).json({ message: 'Failed to submit quiz' });
  }
};

export const getLatestResult = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.userId;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const result = await QuizResult.findOne({ userId }).sort({ createdAt: -1 });
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch result' });
  }
};