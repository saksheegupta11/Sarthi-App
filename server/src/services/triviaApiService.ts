import axios from 'axios';
import he from 'he';

export interface TriviaQuestion {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  type: string;
  difficulty: string;
  category: string;
}

const categoryMap: Record<string, number> = {
  Mathematics: 19,
  Science: 17,
  English: 15,
  'General Knowledge': 9,
  Reasoning: 9,
};

const QUESTIONS_PER_REQUEST = 10;

export async function fetchTriviaQuestions(subject: string): Promise<TriviaQuestion[]> {
  try {
    const categoryId = categoryMap[subject] || 9;
    const response = await axios.get('https://opentdb.com/api.php', {
      params: {
        amount: QUESTIONS_PER_REQUEST,
        category: categoryId,
        type: 'multiple',
        encode: 'url3986',
      },
      timeout: 5000,
    });

    if (response.data.response_code !== 0) {
      throw new Error(`Trivia API error: code ${response.data.response_code}`);
    }

    return response.data.results;
  } catch (error) {
    console.error('Failed to fetch trivia questions:', error);
    return [];
  }
}

export function decodeHtmlEntities(text: string): string {
  return he.decode(text);
}