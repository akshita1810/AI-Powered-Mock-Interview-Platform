const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, default: '' },
  feedback: { type: String, default: '' },
});

const interviewSessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
      enum: [
        'Frontend Developer',
        'Backend Developer',
        'Full Stack Developer',
        'Software Engineer',
        'AI/ML Engineer',
        'Data Analyst',
        'Data Scientist',
        'DevOps Engineer',
      ],
    },
    questions: [questionSchema],
    status: {
      type: String,
      enum: ['in-progress', 'completed'],
      default: 'in-progress',
    },
    overallSummary: { type: String, default: '' },
    strengths: [{ type: String }],
    weaknesses: [{ type: String }],
    improvementSuggestions: [{ type: String }],
    score: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('InterviewSession', interviewSessionSchema);
