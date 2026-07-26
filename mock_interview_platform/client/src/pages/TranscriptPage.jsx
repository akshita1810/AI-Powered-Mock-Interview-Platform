import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { interviewService } from '../services/interviewService';
import AppLayout from '../layouts/AppLayout';
import Card from '../components/Card';
import ScoreCircle from '../components/ScoreCircle';

import Loader from '../components/Loader';
import { formatDateTime, getScoreLabel } from '../utils/helpers';
import {
  RiArrowLeftLine,
} from 'react-icons/ri';
import { toast } from 'react-hot-toast';

const TranscriptPage = () => {
  const { sessionId } = useParams();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await interviewService.getTranscript(sessionId);
        setSession(data.session);
      } catch {
        toast.error('Failed to load transcript');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [sessionId]);

  if (loading) {
    return (
      <AppLayout>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
          <Loader text="Loading transcript..." />
        </div>
      </AppLayout>
    );
  }

  if (!session) {
    return (
      <AppLayout>
        <div className="container section" style={{ textAlign: 'center' }}>
          <p>Transcript not found.</p>
          <Link to="/interview/history" className="btn btn-primary" style={{ marginTop: '16px' }}>Back to History</Link>
        </div>
      </AppLayout>
    );
  }

  const isCompleted = session.status === 'completed';

  return (
    <AppLayout>
      <div className="container section" style={{ paddingTop: '32px', paddingBottom: '64px', maxWidth: '860px' }}>
        <Link to="/interview/history" className="btn btn-ghost btn-sm" style={{ marginBottom: '24px' }}>
          <RiArrowLeftLine size={16} /> Back to History
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '40px' }}>
          <span className="badge badge-primary" style={{ marginBottom: '12px', display: 'inline-flex' }}>Transcript</span>
          <h1 style={{ fontSize: 'clamp(24px, 4vw, 36px)', marginBottom: '8px' }}>{session.role}</h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>{formatDateTime(session.createdAt)}</p>
        </motion.div>

        {isCompleted && (
          <Card solid hover={false} style={{ padding: '24px 28px', marginBottom: '32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <ScoreCircle score={session.score} size={64} />
              <div>
                <div style={{ fontWeight: 700, color: 'white', fontSize: '18px' }}>
                  {getScoreLabel(session.score)}
                </div>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)' }}>Overall Score</div>
              </div>
            </div>
            <Link to={`/interview/${sessionId}/report`} className="btn btn-primary btn-sm">
              View Full Report
            </Link>
          </Card>
        )}

        {/* Question & Answers */}
        <h2 style={{ fontSize: '20px', marginBottom: '20px', color: 'white' }}>Question Transcript</h2>
        <div style={{ display: 'grid', gap: '24px' }}>
          {session.questions?.map((q, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Card solid hover={false} style={{ padding: '28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <span className="badge badge-primary">Question {i + 1}</span>
                </div>
                <h3 style={{ fontSize: '17px', fontWeight: 600, color: 'white', marginBottom: '20px', lineHeight: 1.5 }}>
                  {q.question || q.questionText}
                </h3>

                {(q.answer || q.userAnswer) && (
                  <div style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '12px',
                    padding: '20px',
                    marginBottom: '16px',
                  }}>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px', fontWeight: 600 }}>
                      Your Answer
                    </div>
                    <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, fontSize: '14px' }}>
                      {q.answer || q.userAnswer}
                    </p>
                  </div>
                )}

                {q.feedback && (
                  <div style={{
                    background: 'rgba(124, 111, 247, 0.1)',
                    borderLeft: '3px solid var(--color-primary)',
                    borderRadius: '0 8px 8px 0',
                    padding: '16px 20px',
                  }}>
                    <div style={{ fontSize: '12px', color: 'var(--color-primary-light)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px', fontWeight: 700 }}>
                      AI Feedback
                    </div>
                    <p style={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, fontSize: '14px' }}>
                      {q.feedback}
                    </p>
                  </div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default TranscriptPage;
