import mongoose from 'mongoose';
import MockTestQuestion from '../models/MockTestQuestion';
import dotenv from 'dotenv';
dotenv.config();

// =============================================
// 📦 FALLBACK QUESTIONS (same as in mockTestController)
// =============================================
interface FallbackQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

const FALLBACK_QUESTIONS: Record<string, FallbackQuestion[]> = {
  Mathematics: [
    { question: "What is the value of √144?", options: ["10", "11", "12", "13"], correctAnswer: 2 },
    { question: "If 3x + 7 = 22, what is x?", options: ["3", "4", "5", "6"], correctAnswer: 2 },
    { question: "What is 15% of 200?", options: ["25", "30", "35", "40"], correctAnswer: 1 },
    { question: "The LCM of 4 and 6 is:", options: ["8", "12", "16", "24"], correctAnswer: 1 },
    { question: "What is the area of a circle with radius 7? (π = 22/7)", options: ["144", "154", "164", "174"], correctAnswer: 1 },
    { question: "Simplify: (2³ × 2²)", options: ["2⁴", "2⁵", "2⁶", "2⁷"], correctAnswer: 1 },
    { question: "What is 25% of 480?", options: ["100", "110", "120", "130"], correctAnswer: 2 },
    { question: "The sum of angles in a triangle is:", options: ["90°", "180°", "270°", "360°"], correctAnswer: 1 },
    { question: "What is the HCF of 18 and 24?", options: ["3", "4", "6", "8"], correctAnswer: 2 },
    { question: "If a = 5, b = 3, then a² - b² = ?", options: ["14", "16", "18", "20"], correctAnswer: 1 },
  ],
  Science: [
    { question: "What is the chemical formula of water?", options: ["H₂O₂", "H₂O", "HO₂", "H₃O"], correctAnswer: 1 },
    { question: "Which planet is closest to the Sun?", options: ["Venus", "Earth", "Mercury", "Mars"], correctAnswer: 2 },
    { question: "What is the unit of electric current?", options: ["Volt", "Watt", "Ampere", "Ohm"], correctAnswer: 2 },
    { question: "Photosynthesis occurs in which part of the plant?", options: ["Root", "Stem", "Leaf", "Flower"], correctAnswer: 2 },
    { question: "What is the speed of light?", options: ["3×10⁶ m/s", "3×10⁸ m/s", "3×10¹⁰ m/s", "3×10⁴ m/s"], correctAnswer: 1 },
    { question: "Which gas is most abundant in Earth's atmosphere?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], correctAnswer: 2 },
    { question: "DNA stands for:", options: ["Deoxyribonucleic Acid", "Diribonucleic Acid", "Deoxyribose Acid", "None"], correctAnswer: 0 },
    { question: "Newton's first law is also called:", options: ["Law of Acceleration", "Law of Inertia", "Law of Gravity", "Law of Motion"], correctAnswer: 1 },
    { question: "The powerhouse of the cell is:", options: ["Nucleus", "Ribosome", "Mitochondria", "Golgi Body"], correctAnswer: 2 },
    { question: "Which element has atomic number 1?", options: ["Helium", "Oxygen", "Hydrogen", "Carbon"], correctAnswer: 2 },
  ],
  English: [
    { question: "Choose the correct synonym for 'Brave':", options: ["Cowardly", "Timid", "Courageous", "Fearful"], correctAnswer: 2 },
    { question: "What is the plural of 'child'?", options: ["Childs", "Childes", "Children", "Childrens"], correctAnswer: 2 },
    { question: "Identify the noun in: 'The dog runs fast.'", options: ["The", "dog", "runs", "fast"], correctAnswer: 1 },
    { question: "Choose the correct antonym for 'Ancient':", options: ["Old", "Modern", "Historic", "Aged"], correctAnswer: 1 },
    { question: "Which tense is: 'She has completed her work.'?", options: ["Simple Past", "Present Perfect", "Past Perfect", "Future Perfect"], correctAnswer: 1 },
    { question: "The passive voice of 'He writes a letter' is:", options: ["A letter is written by him", "A letter was written by him", "A letter will be written by him", "A letter has been written by him"], correctAnswer: 0 },
    { question: "Choose the correct spelling:", options: ["Accomodation", "Accommodation", "Acommodation", "Acomodation"], correctAnswer: 1 },
    { question: "What is a metaphor?", options: ["A direct comparison using 'like' or 'as'", "An indirect comparison without 'like' or 'as'", "A type of rhyme", "A figure of speech using exaggeration"], correctAnswer: 1 },
    { question: "The word 'benevolent' means:", options: ["Cruel", "Kind and generous", "Selfish", "Angry"], correctAnswer: 1 },
    { question: "Which is a compound sentence?", options: ["She sings.", "She sings and dances.", "Because she sings.", "She sings beautifully."], correctAnswer: 1 },
  ],
  "General Knowledge": [
    { question: "Who is known as the Father of the Nation in India?", options: ["Jawaharlal Nehru", "Subhas Chandra Bose", "Mahatma Gandhi", "Bhagat Singh"], correctAnswer: 2 },
    { question: "What is the capital of India?", options: ["Mumbai", "Kolkata", "Chennai", "New Delhi"], correctAnswer: 3 },
    { question: "Which is the largest ocean in the world?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], correctAnswer: 3 },
    { question: "Who wrote the Indian National Anthem?", options: ["Bankim Chandra Chatterjee", "Rabindranath Tagore", "Sarojini Naidu", "Subramanya Bharati"], correctAnswer: 1 },
    { question: "The 2024 Olympics were held in:", options: ["Tokyo", "Paris", "London", "Los Angeles"], correctAnswer: 1 },
    { question: "Which is the longest river in India?", options: ["Yamuna", "Brahmaputra", "Ganga", "Godavari"], correctAnswer: 2 },
    { question: "Who invented the telephone?", options: ["Thomas Edison", "Alexander Graham Bell", "Nikola Tesla", "James Watt"], correctAnswer: 1 },
    { question: "The United Nations was founded in:", options: ["1944", "1945", "1946", "1947"], correctAnswer: 1 },
    { question: "Which country has the largest population?", options: ["USA", "Russia", "India", "China"], correctAnswer: 2 },
    { question: "What is the national animal of India?", options: ["Lion", "Elephant", "Tiger", "Peacock"], correctAnswer: 2 },
  ],
  Reasoning: [
    { question: "If APPLE = 50, MANGO = 56, then GRAPE = ?", options: ["48", "50", "52", "54"], correctAnswer: 1 },
    { question: "Find the odd one out: 2, 3, 5, 7, 9, 11", options: ["2", "9", "11", "3"], correctAnswer: 1 },
    { question: "Complete the series: 1, 4, 9, 16, ?", options: ["20", "24", "25", "30"], correctAnswer: 2 },
    { question: "If A = 1, B = 2, C = 3... then CAB = ?", options: ["312", "321", "123", "213"], correctAnswer: 0 },
    { question: "A is taller than B. B is taller than C. Who is shortest?", options: ["A", "B", "C", "Cannot determine"], correctAnswer: 2 },
    { question: "Mirror image: If CLOCK shows 3:00, what does the mirror show?", options: ["3:00", "9:00", "6:00", "12:00"], correctAnswer: 1 },
    { question: "Complete: 2, 6, 12, 20, 30, ?", options: ["40", "42", "44", "46"], correctAnswer: 1 },
    { question: "If Monday is 2 days after Saturday, what day is 3 days before Wednesday?", options: ["Sunday", "Monday", "Saturday", "Friday"], correctAnswer: 0 },
    { question: "Find the missing number: 3, 6, 11, 18, 27, ?", options: ["36", "38", "40", "42"], correctAnswer: 1 },
    { question: "Which number replaces '?': 4 : 16 :: 7 : ?", options: ["42", "49", "56", "63"], correctAnswer: 1 },
  ],
};

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env['MONGO_URI']!);
    console.log('✅ Connected to MongoDB');

    // Clear existing questions
    await MockTestQuestion.deleteMany({});
    console.log('✅ Cleared existing questions');

    // Insert all fallback questions
    for (const [subject, questions] of Object.entries(FALLBACK_QUESTIONS)) {
      const docs = questions.map((q) => ({
        subject,
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
      }));
      await MockTestQuestion.insertMany(docs);
      console.log(`✅ Inserted ${docs.length} questions for ${subject}`);
    }

    console.log('🎉 Seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();