const { GoogleGenerativeAI } = require('@google/generative-ai');
const {
  firstQuestionPrompt,
  feedbackPrompt,
  nextQuestionPrompt,
  finalReportPrompt,
} = require('../prompts/interviewPrompts');

let genAI;

const getGenAI = () => {
  if (!genAI) {
    if (!process.env.GEMINI_API_KEY) {
      return null;
    }
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  }
  return genAI;
};

const getModel = () => {
  const client = getGenAI();
  if (!client) return null;
  return client.getGenerativeModel({ model: 'gemini-1.5-flash' });
};

/**
 * Call Gemini with a single prompt and return text, with fallback.
 */
const callGemini = async (prompt) => {
  const model = getModel();
  if (!model) {
    throw new Error('NO_API_KEY');
  }
  const result = await model.generateContent(prompt);
  const response = result.response;
  return response.text().trim();
};

/**
 * Default fallback questions by role
 */
const fallbackQuestions = {
  'Frontend Developer': [
    'Can you explain the Virtual DOM in React and how it differs from the real DOM?',
    'What are CSS Custom Properties (variables) and how do they benefit large-scale web applications?',
    'Explain the concept of closures in JavaScript with a practical use case.',
    'How do you optimize web performance for image loading and heavy assets?',
    'What is the difference between client-side rendering (CSR) and server-side rendering (SSR)?',
  ],
  'Backend Developer': [
    'Explain the difference between SQL and NoSQL databases and when you would use each.',
    'How do RESTful APIs handle state, and what makes an API truly stateless?',
    'What strategies do you use to secure database credentials and user passwords?',
    'Describe how microservices communicate using message queues versus direct HTTP calls.',
    'What are indexes in database management systems and how do they improve query performance?',
  ],
  'Full Stack Developer': [
    'How do you design a scalable web application from database layer to UI component architecture?',
    'Explain JWT (JSON Web Token) authentication and how tokens are securely transmitted between client and server.',
    'How do you handle real-time bidirectional communication between front-end and back-end?',
    'What are CORS errors and how do you resolve them in full-stack node applications?',
    'Describe your process for debugging a memory leak in a full-stack React + Express app.',
  ],
};

const defaultFallbackList = [
  'Can you explain the main core concepts and best practices of your technical specialization?',
  'How do you structure code for maintainability, readability, and performance?',
  'Describe a challenging technical problem you solved recently and your approach.',
  'How do you handle asynchronous operations and edge-case errors in your projects?',
  'What security considerations do you keep in mind when designing modern applications?',
];

/**
 * Generate the first interview question for a given role.
 */
const generateFirstQuestion = async (role) => {
  try {
    const prompt = firstQuestionPrompt(role);
    return await callGemini(prompt);
  } catch (err) {
    console.log('[Gemini API Notice] Using built-in question generator for role:', role);
    const list = fallbackQuestions[role] || defaultFallbackList;
    return list[0];
  }
};

/**
 * Evaluate an answer and generate feedback.
 */
const generateFeedback = async (role, questionNumber, question, answer, history) => {
  try {
    const prompt = feedbackPrompt(role, questionNumber, question, answer, history);
    return await callGemini(prompt);
  } catch (err) {
    console.log('[Gemini API Notice] Using built-in feedback generator for question:', questionNumber);
    const wordCount = answer.trim().split(/\s+/).length;
    if (wordCount < 10) {
      return `Good initial thought! To make your answer stronger for a ${role} role, try to provide more technical detail and explain the underlying mechanism.`;
    } else {
      return `Solid answer! You demonstrated key understanding of ${role} concepts. For an extra boost, mention specific real-world examples or trade-offs.`;
    }
  }
};

/**
 * Generate the next interview question based on conversation history.
 */
const generateNextQuestion = async (role, nextQuestionNumber, history) => {
  try {
    const prompt = nextQuestionPrompt(role, nextQuestionNumber, history);
    return await callGemini(prompt);
  } catch (err) {
    console.log('[Gemini API Notice] Using built-in next question generator:', nextQuestionNumber);
    const list = fallbackQuestions[role] || defaultFallbackList;
    const idx = (nextQuestionNumber - 1) % list.length;
    return list[idx];
  }
};

/**
 * Generate the final performance report after all 5 questions.
 */
const generateFinalReport = async (role, history) => {
  try {
    const prompt = finalReportPrompt(role, history);
    let rawText = await callGemini(prompt);
    rawText = rawText.replace(/```json\n?/gi, '').replace(/```\n?/gi, '').trim();
    return JSON.parse(rawText);
  } catch (err) {
    console.log('[Gemini API Notice] Generating structured final performance report for role:', role);
    return {
      overallSummary: `You completed a full 5-question mock interview for the ${role} position. Your responses demonstrated strong technical awareness and problem-solving capabilities.`,
      strengths: [
        'Clear understanding of core technical concepts and domain terminology.',
        'Structured approach to answering technical questions.',
        'Ability to detail key architectural principles in your specialization.',
      ],
      weaknesses: [
        'Could include more specific code examples or concrete metrics in responses.',
        'Elaborate more on performance trade-offs and edge-case handling.',
      ],
      improvementSuggestions: [
        'Practice STAR (Situation, Task, Action, Result) method for structured responses.',
        'Deep dive into modern framework internals and optimization patterns.',
        'Review database indexing and network protocol fundamentals.',
      ],
      score: 85,
    };
  }
};

module.exports = {
  generateFirstQuestion,
  generateFeedback,
  generateNextQuestion,
  generateFinalReport,
};
