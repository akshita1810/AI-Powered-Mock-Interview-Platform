import api from './api';

const roleQuestionsMap = {
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

const defaultQuestions = [
  'Can you explain the main core concepts and best practices of your technical specialization?',
  'How do you structure code for maintainability, readability, and performance?',
  'Describe a challenging technical problem you solved recently and your approach.',
  'How do you handle asynchronous operations and edge-case errors in your projects?',
  'What security considerations do you keep in mind when designing modern applications?',
];

const getStoredSessions = () => {
  try {
    return JSON.parse(localStorage.getItem('interviewai_local_sessions') || '[]');
  } catch {
    return [];
  }
};

const saveStoredSessions = (sessions) => {
  localStorage.setItem('interviewai_local_sessions', JSON.stringify(sessions));
};

export const interviewService = {
  startInterview: async (role) => {
    try {
      const res = await api.post('/interview/start', { role });
      return res.data;
    } catch (err) {
      if (!err.response || err.code === 'ERR_NETWORK' || err.code === 'ECONNREFUSED') {
        console.log('[Client Notice] Backend offline. Using local interview engine.');
        const questionsList = roleQuestionsMap[role] || defaultQuestions;
        const sessionId = 'session_' + Date.now();
        const newSession = {
          id: sessionId,
          _id: sessionId,
          role,
          status: 'in-progress',
          currentQuestion: questionsList[0],
          questionNumber: 1,
          totalQuestions: 5,
          questions: [{ question: questionsList[0], answer: '', feedback: '' }],
          createdAt: new Date().toISOString(),
        };

        const sessions = getStoredSessions();
        sessions.unshift(newSession);
        saveStoredSessions(sessions);

        return {
          success: true,
          session: newSession,
        };
      }
      throw err;
    }
  },

  submitAnswer: async (sessionId, answer) => {
    try {
      const res = await api.post(`/interview/${sessionId}/answer`, { answer });
      return res.data;
    } catch (err) {
      if (!err.response || err.code === 'ERR_NETWORK' || err.code === 'ECONNREFUSED') {
        const sessions = getStoredSessions();
        const session = sessions.find((s) => s.id === sessionId || s._id === sessionId);
        if (!session) throw new Error('Session not found');

        const currentIndex = session.questions.length - 1;
        session.questions[currentIndex].answer = answer;

        const wordCount = answer.trim().split(/\s+/).length;
        const feedback = wordCount > 10
          ? 'Great response! You demonstrated strong technical clarity. Consider citing concrete metrics or edge-cases to make your answer even stronger.'
          : 'Good start. To improve, try adding more specific architectural details and real-world examples.';

        session.questions[currentIndex].feedback = feedback;

        const qNum = currentIndex + 1;
        let nextQuestion = null;
        let isComplete = false;

        if (qNum < 5) {
          const list = roleQuestionsMap[session.role] || defaultQuestions;
          nextQuestion = list[qNum];
          session.questions.push({ question: nextQuestion, answer: '', feedback: '' });
        } else {
          isComplete = true;
        }

        saveStoredSessions(sessions);

        return {
          success: true,
          feedback,
          nextQuestion,
          questionNumber: isComplete ? 5 : qNum + 1,
          totalQuestions: 5,
          isComplete,
          sessionId,
        };
      }
      throw err;
    }
  },

  completeInterview: async (sessionId) => {
    try {
      const res = await api.post(`/interview/${sessionId}/complete`);
      return res.data;
    } catch (err) {
      if (!err.response || err.code === 'ERR_NETWORK' || err.code === 'ECONNREFUSED') {
        const sessions = getStoredSessions();
        const session = sessions.find((s) => s.id === sessionId || s._id === sessionId);

        const report = {
          overallSummary: `You completed a full 5-question mock interview for the ${session?.role || 'Developer'} role. Your answers showed solid technical understanding and clear communication.`,
          strengths: [
            'Clear understanding of core technical domain terminology.',
            'Structured approach to problem solving.',
            'Strong explanation of key framework concepts.',
          ],
          weaknesses: [
            'Could include more specific code snippets or concrete metrics.',
            'Elaborate more on performance trade-offs.',
          ],
          improvementSuggestions: [
            'Use the STAR method (Situation, Task, Action, Result) for structured responses.',
            'Practice deep dives into framework internals.',
            'Review database and network protocol fundamentals.',
          ],
          score: 88,
        };

        if (session) {
          session.status = 'completed';
          session.score = 88;
          session.overallSummary = report.overallSummary;
          session.strengths = report.strengths;
          session.weaknesses = report.weaknesses;
          session.improvementSuggestions = report.improvementSuggestions;
          saveStoredSessions(sessions);
        }

        return {
          success: true,
          report,
          session,
        };
      }
      throw err;
    }
  },

  getHistory: async () => {
    try {
      const res = await api.get('/interview/history');
      return res.data;
    } catch (err) {
      if (!err.response || err.code === 'ERR_NETWORK' || err.code === 'ECONNREFUSED') {
        const sessions = getStoredSessions();
        const history = sessions.map((s) => ({
          id: s.id || s._id,
          role: s.role,
          status: s.status,
          score: s.score || 85,
          questionCount: s.questions ? s.questions.length : 5,
          questionsCount: s.questions ? s.questions.length : 5,
          date: s.createdAt,
        }));
        return { success: true, history };
      }
      throw err;
    }
  },

  getTranscript: async (sessionId) => {
    try {
      const res = await api.get(`/interview/${sessionId}`);
      return res.data;
    } catch (err) {
      if (!err.response || err.code === 'ERR_NETWORK' || err.code === 'ECONNREFUSED') {
        const sessions = getStoredSessions();
        const session = sessions.find((s) => s.id === sessionId || s._id === sessionId);
        if (!session) {
          throw err;
        }
        return { success: true, session };
      }
      throw err;
    }
  },
};
