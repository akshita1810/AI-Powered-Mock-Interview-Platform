import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useInterview } from '../context/InterviewContext';
import AppLayout from '../layouts/AppLayout';
import QuestionCard from '../components/QuestionCard';
import ProgressBar from '../components/ProgressBar';
import Button from '../components/Button';
import Loader from '../components/Loader';
import Card from '../components/Card';
import { RiSendPlaneLine, RiLightbulbLine } from 'react-icons/ri';
import { toast } from 'react-hot-toast';

const TOTAL = 5;

const InterviewPage = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const {
    session, currentQuestion, questionNumber, feedback,
    isLoading, isComplete, submitAnswer, completeInterview, resetInterview,
  } = useInterview();

  const [answer, setAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [localFeedback, setLocalFeedback] = useState('');
  const [answeredQuestion, setAnsweredQuestion] = useState('');
  const [answeredNumber, setAnsweredNumber] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [completing, setCompleting] = useState(false);

  useEffect(() => {
    if (!session && !isLoading) {
      navigate('/interview/select-role', { replace: true });
    } else if (session && session.id !== sessionId) {
      navigate(`/interview/${session.id}`, { replace: true });
    }
  }, [session, sessionId, isLoading, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!answer.trim()) {
      toast.error('Please write your answer before submitting');
      return;
    }
    setSubmitting(true);
    try {
      setAnsweredQuestion(currentQuestion);
      setAnsweredNumber(questionNumber);
      const data = await submitAnswer(answer.trim());
      setLocalFeedback(data.feedback);
      setShowFeedback(true);
      setAnswer('');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit answer');
    } finally {
      setSubmitting(false);
    }
  };

  const handleNext = () => {
    setShowFeedback(false);
    setLocalFeedback('');
    setAnsweredQuestion('');
  };

  const handleViewReport = async () => {
    setCompleting(true);
    try {
      await completeInterview();
      navigate(`/interview/${session.id}/report`, { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to generate report');
    } finally {
      setCompleting(false);
    }
  };

  if (!session || !currentQuestion) {
    return (
      <AppLayout>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
          <Loader text="Loading interview..." />
        </div>
      </AppLayout>
    );
  }

  const displayFeedback = localFeedback || feedback;
  const progressCurrent = showFeedback ? answeredNumber : questionNumber;

  return (
    <AppLayout>
      {(isLoading || submitting || completing) && (
        <Loader
          fullScreen
          text={completing ? 'Generating your performance report...' : submitting ? 'Evaluating your answer...' : 'Processing...'}
        />
      )}

      <div className="container" style={{ padding: '32px 24px 64px', maxWidth: '800px' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
            <span className="badge badge-primary">{session.role}</span>
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={() => { resetInterview(); navigate('/dashboard'); }}
            >
              Exit Interview
            </button>
          </div>
          <ProgressBar current={progressCurrent} total={TOTAL} />
        </div>

        <AnimatePresence mode="wait">
          {!showFeedback ? (
            <motion.div
              key={`q-${questionNumber}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <QuestionCard question={currentQuestion} number={questionNumber} />

              <form onSubmit={handleSubmit} style={{ marginTop: '24px' }}>
                <div className="input-group">
                  <label className="input-label">Your Answer</label>
                  <textarea
                    className="input-field textarea-field"
                    placeholder="Type your answer here... Be specific and technical."
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    rows={8}
                    disabled={submitting}
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                  <Button type="submit" variant="primary" size="lg" disabled={submitting || !answer.trim()}>
                    <RiSendPlaneLine size={18} />
                    Submit Answer
                  </Button>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key={`fb-${questionNumber}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <QuestionCard question={answeredQuestion || currentQuestion} number={answeredNumber} label="Question" />

              <Card solid hover={false} style={{ padding: '24px 28px', marginTop: '20px', borderLeft: '3px solid var(--color-primary)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                  <RiLightbulbLine size={20} color="var(--color-warning)" />
                  <span style={{ fontWeight: 700, color: 'white', fontSize: '15px' }}>AI Feedback</span>
                </div>
                <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, fontSize: '15px' }}>{displayFeedback}</p>
              </Card>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
                {isComplete ? (
                  <Button variant="primary" size="lg" onClick={handleViewReport} loading={completing}>
                    View Performance Report →
                  </Button>
                ) : (
                  <Button variant="primary" size="lg" onClick={handleNext}>
                    Next Question →
                  </Button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AppLayout>
  );
};

export default InterviewPage;
