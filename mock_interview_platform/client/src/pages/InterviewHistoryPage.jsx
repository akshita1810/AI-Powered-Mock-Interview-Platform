import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { interviewService } from '../services/interviewService';
import AppLayout from '../layouts/AppLayout';
import Card from '../components/Card';
import { HistorySkeleton } from '../components/SkeletonLoader';
import { formatDate, getScoreBadgeClass, getScoreLabel } from '../utils/helpers';
import { RiHistoryLine, RiArrowRightLine, RiInboxLine } from 'react-icons/ri';
import { toast } from 'react-hot-toast';

const InterviewHistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await interviewService.getHistory();
        setHistory(data.history || []);
      } catch {
        toast.error('Failed to load interview history');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <AppLayout>
      <div className="container section" style={{ paddingTop: '32px', paddingBottom: '64px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: '40px' }}
        >
          <span className="badge badge-primary" style={{ marginBottom: '12px', display: 'inline-flex' }}>
            <RiHistoryLine size={12} /> History
          </span>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 40px)', marginBottom: '8px' }}>
            Interview <span className="text-gradient">History</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.45)' }}>
            Review all your past mock interviews and track your progress.
          </p>
        </motion.div>

        {loading ? (
          <HistorySkeleton />
        ) : history.length === 0 ? (
          <Card solid hover={false} style={{ padding: '64px 32px', textAlign: 'center' }}>
            <RiInboxLine size={48} color="rgba(255,255,255,0.2)" style={{ marginBottom: '16px' }} />
            <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>No Interviews Yet</h3>
            <p style={{ color: 'rgba(255,255,255,0.45)', marginBottom: '24px' }}>
              You haven't completed any mock interviews yet. Start your first session now!
            </p>
            <Link to="/interview/select-role" className="btn btn-primary">
              Start First Interview
            </Link>
          </Card>
        ) : (
          <div style={{ display: 'grid', gap: '16px' }}>
            {history.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Card solid hover={false} style={{ padding: '20px 28px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{
                        width: 44, height: 44, borderRadius: '12px',
                        background: 'rgba(124, 111, 247, 0.15)',
                        border: '1px solid rgba(124, 111, 247, 0.3)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <RiHistoryLine size={22} color="var(--color-primary-light)" />
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, color: 'white', fontSize: '16px', marginBottom: '4px' }}>
                          {item.role}
                        </div>
                        <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>
                          {formatDate(item.date)} 
                          {item.questionsCount ? ` • ${item.questionsCount} questions` : ''}
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      {item.status === 'completed' ? (
                        <div style={{ textAlign: 'right' }}>
                          <span className={`badge ${getScoreBadgeClass(item.score)}`}>
                            Score: {item.score}/100
                          </span>
                          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', marginTop: '4px' }}>
                            {getScoreLabel(item.score)}
                          </div>
                        </div>
                      ) : (
                        <span className="badge badge-warning">In Progress</span>
                      )}
                      <Link
                        to={`/interview/${item.id}/transcript`}
                        className="btn btn-ghost btn-sm"
                      >
                        View <RiArrowRightLine size={16} />
                      </Link>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default InterviewHistoryPage;
