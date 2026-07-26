const mongoose = require('mongoose');
const InterviewSession = require('../models/InterviewSession');
const {
  generateFirstQuestion,
  generateFeedback,
  generateNextQuestion,
  generateFinalReport,
} = require('../services/geminiService');

const TOTAL_QUESTIONS = 5;

// In-memory store for fallback/demo mode when MongoDB is offline
const inMemorySessions = new Map();

// POST /api/interview/start
const startInterview = async (req, res) => {
  try {
    const { role } = req.body;

    if (!role) {
      return res.status(400).json({ success: false, message: 'Role is required.' });
    }

    const validRoles = [
      'Frontend Developer', 'Backend Developer', 'Full Stack Developer',
      'Software Engineer', 'AI/ML Engineer', 'Data Analyst',
      'Data Scientist', 'DevOps Engineer',
    ];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ success: false, message: 'Invalid role selected.' });
    }

    // Generate first question via Gemini or fallback
    const firstQuestion = await generateFirstQuestion(role);
    const userId = req.user._id || req.user.id;

    if (mongoose.connection.readyState === 1) {
      const session = await InterviewSession.create({
        userId,
        role,
        questions: [{ question: firstQuestion, answer: '', feedback: '' }],
        status: 'in-progress',
      });

      return res.status(201).json({
        success: true,
        message: 'Interview session started.',
        session: {
          id: session._id.toString(),
          role: session.role,
          status: session.status,
          currentQuestion: firstQuestion,
          questionNumber: 1,
          totalQuestions: TOTAL_QUESTIONS,
        },
      });
    } else {
      const sessionId = 'session_' + Date.now();
      const sessionData = {
        _id: sessionId,
        id: sessionId,
        userId,
        role,
        questions: [{ question: firstQuestion, answer: '', feedback: '' }],
        status: 'in-progress',
        createdAt: new Date().toISOString(),
      };
      inMemorySessions.set(sessionId, sessionData);

      return res.status(201).json({
        success: true,
        message: 'Interview session started (Demo Mode).',
        session: {
          id: sessionId,
          role: sessionData.role,
          status: sessionData.status,
          currentQuestion: firstQuestion,
          questionNumber: 1,
          totalQuestions: TOTAL_QUESTIONS,
        },
      });
    }
  } catch (error) {
    console.error('Start interview error:', error);
    res.status(500).json({ success: false, message: 'Failed to start interview. ' + error.message });
  }
};

// POST /api/interview/:id/answer
const submitAnswer = async (req, res) => {
  try {
    const { id } = req.params;
    const { answer } = req.body;

    if (!answer || !answer.trim()) {
      return res.status(400).json({ success: false, message: 'Answer cannot be empty.' });
    }

    const userId = req.user._id || req.user.id;
    let session;

    if (mongoose.connection.readyState === 1) {
      session = await InterviewSession.findOne({ _id: id, userId });
    } else {
      session = inMemorySessions.get(id);
    }

    if (!session) {
      return res.status(404).json({ success: false, message: 'Interview session not found.' });
    }
    if (session.status === 'completed') {
      return res.status(400).json({ success: false, message: 'Interview already completed.' });
    }

    // Find current unanswered question
    const currentIndex = session.questions.length - 1;
    const currentQuestion = session.questions[currentIndex];

    if (!currentQuestion) {
      return res.status(400).json({ success: false, message: 'No active question found.' });
    }

    const history = session.questions.slice(0, currentIndex).map((q) => ({
      question: q.question,
      answer: q.answer,
      feedback: q.feedback,
    }));

    const feedback = await generateFeedback(
      session.role,
      currentIndex + 1,
      currentQuestion.question,
      answer.trim(),
      history
    );

    session.questions[currentIndex].answer = answer.trim();
    session.questions[currentIndex].feedback = feedback;

    const questionNumber = currentIndex + 1;
    let nextQuestion = null;
    let isComplete = false;

    if (questionNumber < TOTAL_QUESTIONS) {
      const updatedHistory = session.questions.map((q) => ({
        question: q.question,
        answer: q.answer,
        feedback: q.feedback,
      }));

      nextQuestion = await generateNextQuestion(session.role, questionNumber + 1, updatedHistory);
      session.questions.push({ question: nextQuestion, answer: '', feedback: '' });
    } else {
      isComplete = true;
    }

    if (mongoose.connection.readyState === 1) {
      session.markModified('questions');
      await session.save();
    } else {
      inMemorySessions.set(id, session);
    }

    res.status(200).json({
      success: true,
      feedback,
      nextQuestion,
      questionNumber: isComplete ? TOTAL_QUESTIONS : questionNumber + 1,
      totalQuestions: TOTAL_QUESTIONS,
      isComplete,
      sessionId: session._id || session.id,
    });
  } catch (error) {
    console.error('Submit answer error:', error);
    res.status(500).json({ success: false, message: 'Failed to process answer. ' + error.message });
  }
};

// POST /api/interview/:id/complete
const completeInterview = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id || req.user.id;
    let session;

    if (mongoose.connection.readyState === 1) {
      session = await InterviewSession.findOne({ _id: id, userId });
    } else {
      session = inMemorySessions.get(id);
    }

    if (!session) {
      return res.status(404).json({ success: false, message: 'Interview session not found.' });
    }

    if (session.status === 'completed') {
      return res.status(200).json({
        success: true,
        report: {
          overallSummary: session.overallSummary,
          strengths: session.strengths,
          weaknesses: session.weaknesses,
          improvementSuggestions: session.improvementSuggestions,
          score: session.score,
        },
        session,
      });
    }

    const history = session.questions.map((q) => ({
      question: q.question,
      answer: q.answer,
      feedback: q.feedback,
    }));

    const report = await generateFinalReport(session.role, history);

    session.overallSummary = report.overallSummary || '';
    session.strengths = report.strengths || [];
    session.weaknesses = report.weaknesses || [];
    session.improvementSuggestions = report.improvementSuggestions || [];
    session.score = typeof report.score === 'number' ? report.score : 85;
    session.status = 'completed';

    if (mongoose.connection.readyState === 1) {
      await session.save();
    } else {
      inMemorySessions.set(id, session);
    }

    res.status(200).json({
      success: true,
      message: 'Interview completed successfully.',
      report: {
        overallSummary: session.overallSummary,
        strengths: session.strengths,
        weaknesses: session.weaknesses,
        improvementSuggestions: session.improvementSuggestions,
        score: session.score,
      },
      session,
    });
  } catch (error) {
    console.error('Complete interview error:', error);
    res.status(500).json({ success: false, message: 'Failed to generate report. ' + error.message });
  }
};

// GET /api/interview/history
const getHistory = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;

    if (mongoose.connection.readyState === 1) {
      const sessions = await InterviewSession.find({ userId })
        .sort({ createdAt: -1 })
        .select('role status score createdAt questions');

      const history = sessions.map((s) => ({
        id: s._id,
        role: s.role,
        status: s.status,
        score: s.score,
        questionCount: s.questions.length,
        questionsCount: s.questions.length,
        date: s.createdAt,
      }));

      return res.status(200).json({ success: true, history });
    } else {
      const history = Array.from(inMemorySessions.values())
        .filter((s) => s.userId === userId)
        .map((s) => ({
          id: s.id,
          role: s.role,
          status: s.status,
          score: s.score || 85,
          questionCount: s.questions.length,
          questionsCount: s.questions.length,
          date: s.createdAt,
        }));

      return res.status(200).json({ success: true, history });
    }
  } catch (error) {
    console.error('Get history error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch history.' });
  }
};

// GET /api/interview/:id
const getTranscript = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id || req.user.id;
    let session;

    if (mongoose.connection.readyState === 1) {
      session = await InterviewSession.findOne({ _id: id, userId });
    } else {
      session = inMemorySessions.get(id);
    }

    if (!session) {
      return res.status(404).json({ success: false, message: 'Interview session not found.' });
    }

    res.status(200).json({ success: true, session });
  } catch (error) {
    console.error('Get transcript error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch transcript.' });
  }
};

module.exports = { startInterview, submitAnswer, completeInterview, getHistory, getTranscript };
