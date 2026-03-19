const axios = require('axios');
require('dotenv').config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function testGemini() {
  console.log('Testing Gemini API with key:', GEMINI_API_KEY ? 'Present' : 'Missing');
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [{
          parts: [{
            text: "Hello, are you there?"
          }]
        }],
      },
      {
        headers: { 'Content-Type': 'application/json' },
        timeout: 10000,
      }
    );
    console.log('Gemini Response:', JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('Gemini Error:', error.response ? error.response.data : error.message);
  }
}

testGemini();
