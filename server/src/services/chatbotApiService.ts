import axios from 'axios';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getChatbotResponse as getRuleBasedResponse } from '../utils/chatbotResponses';

export interface ChatbotResponse {
  reply: string;
  source: 'openai' | 'gemini' | 'openrouter' | 'rule-based' | 'grok';
}

// API Keys from environment
const OPENAI_API_KEY = process.env['OPENAI_API_KEY'] || '';
const GEMINI_API_KEY = process.env['GEMINI_API_KEY'] || '';
const OPENROUTER_API_KEY = process.env['OPENROUTER_API_KEY'] || '';
const GROK_API_KEY = process.env['GROK_API_KEY'] || '';

// --- API 0: Grok (xAI) ---
async function fetchFromGrok(message: string): Promise<ChatbotResponse | null> {
  try {
    if (!GROK_API_KEY) return null;

    const response = await axios.post(
      'https://api.x.ai/v1/chat/completions',
      {
        model: 'grok-2-latest', // Updated to a more stable model ID
        messages: [
          {
            role: 'system',
            content: 'You are Sarthi AI, an expert career guidance assistant for Indian students. Be concise and professional.'
          },
          { role: 'user', content: message }
        ],
        temperature: 0.7,
      },
      {
        headers: {
          'Authorization': `Bearer ${GROK_API_KEY}`,
          'Content-Type': 'application/json',
        },
        timeout: 8000,
      }
    );

    return {
      reply: response.data.choices[0].message.content,
      source: 'grok',
    };
  } catch (error) {
    console.log('Grok API failed:', error instanceof Error ? error.message : 'Unknown error');
    return null;
  }
}

// --- API 1: OpenAI GPT ---
async function fetchFromOpenAI(message: string): Promise<ChatbotResponse | null> {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are Sarthi AI, a helpful career and education guidance assistant for Indian students. Provide concise, accurate advice.'
          },
          { role: 'user', content: message }
        ],
        max_tokens: 300,
        temperature: 0.7,
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        timeout: 5000,
      }
    );

    return {
      reply: response.data.choices[0].message.content,
      source: 'openai',
    };
  } catch (error) {
    console.log('OpenAI API failed:', error instanceof Error ? error.message : 'Unknown error');
    return null;
  }
}

// Initialize Google Generative AI with correct model
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
// ✅ Using stable Gemini 2.0 Flash
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// --- API 2: Google Gemini ---
// async function fetchFromGemini(message: string): Promise<ChatbotResponse | null> {
//   try {
//     const result = await model.generateContent(`You are Sarthi AI, a career guidance assistant for Indian students. Answer this query: ${message}`);
//     const response = await result.response;
//     const text = response.text();

//     return {
//       reply: text,
//       source: 'gemini',
//     };
//   } catch (error) {
//     console.log('Gemini API failed:', error instanceof Error ? error.message : 'Unknown error');
//     return null;
//   }
// }

async function fetchFromGemini(message: string): Promise<ChatbotResponse | null> {
  try {
    console.log('🤖 Gemini processing query:', message);

    const prompt = `You are Sarthi AI, an expert career and education guidance assistant for Indian students. 
Current query: "${message}"

Provide a helpful, accurate, and concise response.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    console.log('📝 Gemini raw response:', text);

    // ✅ Agar response empty hai toh fallback
    if (!text || text.trim().length === 0) {
      console.log('⚠️ Gemini returned empty response');
      return null;
    }

    return {
      reply: text,
      source: 'gemini',
    };
  } catch (error) {
    console.log('❌ Gemini API failed:', error instanceof Error ? error.message : 'Unknown error');
    return null;
  }
}

// --- API 3: OpenRouter (access to multiple models) ---
async function fetchFromOpenRouter(message: string): Promise<ChatbotResponse | null> {
  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'openrouter/auto', // Automatically selects best available model
        messages: [
          {
            role: 'system',
            content: 'You are Sarthi AI, a career guidance assistant for Indian students.'
          },
          { role: 'user', content: message }
        ],
        max_tokens: 300,
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'HTTP-Referer': 'http://localhost:5000',
          'X-Title': 'Sarthi AI',
          'Content-Type': 'application/json',
        },
        timeout: 5000,
      }
    );

    return {
      reply: response.data.choices[0].message.content,
      source: 'openrouter',
    };
  } catch (error) {
    console.log('OpenRouter API failed:', error instanceof Error ? error.message : 'Unknown error');
    return null;
  }
}

// --- API 4: Rule-based fallback ---
function fetchFromRuleBased(message: string): ChatbotResponse {
  return {
    reply: getRuleBasedResponse(message),
    source: 'rule-based',
  };
}

// --- Main function that tries all APIs in sequence ---
export async function getChatbotReply(message: string): Promise<ChatbotResponse> {
  console.log('Trying OpenRouter API...');
  const openRouterResponse = await fetchFromOpenRouter(message);
  if (openRouterResponse) {
    console.log(`✅ OpenRouter responded`);
    return openRouterResponse;
  }

  console.log('OpenRouter failed, trying Grok API...');
  const grokResponse = await fetchFromGrok(message);
  if (grokResponse) {
    console.log(`✅ Grok responded`);
    return grokResponse;
  }

  console.log('Grok failed, trying OpenAI API...');
  const openAIResponse = await fetchFromOpenAI(message);
  if (openAIResponse) {
    console.log(`✅ OpenAI responded`);
    return openAIResponse;
  }

  console.log('OpenAI failed, trying Gemini API...');
  const geminiResponse = await fetchFromGemini(message);
  if (geminiResponse) {
    console.log(`✅ Gemini responded`);
    return geminiResponse;
  }

  console.log('All APIs failed, using rule-based fallback');
  try {
    const fallback = fetchFromRuleBased(message);
    return fallback;
  } catch (error) {
    console.error('CRITICAL: Rule-based fallback failed:', error);
    return {
      reply: "I'm sorry, I'm currently having technical difficulties. Please try again later.",
      source: 'rule-based'
    };
  }
}