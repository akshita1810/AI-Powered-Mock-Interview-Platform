const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  startInterview,
  submitAnswer,
  completeInterview,
  getHistory,
  getTranscript,
} = require('../controllers/interviewController');

// All routes require authentication
router.use(protect);

router.post('/start', startInterview);
router.get('/history', getHistory);
router.post('/:id/answer', submitAnswer);
router.post('/:id/complete', completeInterview);
router.get('/:id', getTranscript);

module.exports = router;
