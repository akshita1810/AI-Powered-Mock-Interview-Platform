import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { interviewService } from '../services/interviewService';
import AppLayout from '../layouts/AppLayout';
import Card from '../components/Card';
import { DashboardSkeleton } from '../components/SkeletonLoader';
import { computeInterviewStats, formatDate, getScoreBadgeClass } from '../utils/helpers';
import {
  RiPlayCircleLine, RiHistoryLine, RiUserLine, RiLogoutBoxLine,
  RiTrophyLine, RiBarChartLine, RiStarLine, RiArrowRightLine,
} from 'react-icons/ri';
import { toast } from 'react-hot-toast';

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.08 },
  }),
};

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalInterviews: 0, averageScore: 0, highestScore: 0, recentInterview: null });

  useEffect(() => {
    const load = async () => {
      try {
        const data = await interviewService.getHistory();
        setStats(computeInterviewStats(data.history || []));
      } catch {
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const statCards = [
    { label: 'Total Interviews', value: stats.totalInterviews, icon: RiBarChartLine, color: '#667eea' },
    { label: 'Average Score', value: stats.totalInterviews ? `${stats.averageScore}` : '—', icon: RiStarLine, color: '#43e97b' },
    { label: 'Highest Score', value: stats.totalInterviews ? `${stats.highestScore}` : '—', icon: RiTrophyLine, color: '#ffd166' },
  ];

  const actions = [
    { to: '/interview/select-role', icon: RiPlayCircleLine, title: 'Start Interview', desc: 'Begin a new AI mock session', gradient: 'linear-gradient(135deg, #667eea, #764ba2)' },
    { to: '/interview/history', icon: RiHistoryLine, title: 'Interview History', desc: 'Review past sessions & scores', gradient: 'linear-gradient(135deg, #f093fb, #f5576c)' },
    { to: '/profile', icon: RiUserLine, title: 'Profile', desc: 'View your account & stats', gradient: 'linear-gradient(135deg, #43e97b, #38f9d7)' },
  ];

  return (
    <AppLayout>
      <div className="container section" style={{ paddingTop: '32px', paddingBottom: '64px' }}>
        {loading ? (
          <DashboardSkeleton />
        ) : (
          <>
            <motion.div variants={fadeInUp} initial="hidden" animate="visible" custom={0} style={{ marginBottom: '40px' }}>
              <span className="badge badge-primary" style={{ marginBottom: '12px', display: 'inline-flex' }}>Dashboard</span>
              <h1 style={{ fontSize: 'clamp(28px, 4vw, 40px)', marginBottom: '8px' }}>
                Welcome back, <span className="text-gradient">{user?.name?.split(' ')[0]}</span>
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.45)' }}>Ready to sharpen your interview skills today?</p>
            </motion.div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '40px' }}>
              {statCards.map((stat, i) => (
                <motion.div key={stat.label} variants={fadeInUp} initial="hidden" animate="visible" custom={i + 1}>
                  <Card solid hover={false} style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <div style={{
                        width: 48, height: 48, borderRadius: '12px',
                        background: `${stat.color}20`, border: `1px solid ${stat.color}40`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <stat.icon size={22} color={stat.color} />
                      </div>
                      <div>
                        <div style={{ fontSize: '28px', fontWeight: 800, fontFamily: 'Space Grotesk', color: 'white' }}>{stat.value}</div>
                        <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)' }}>{stat.label}</div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Action cards */}
            <motion.div variants={fadeInUp} initial="hidden" animate="visible" custom={4} style={{ marginBottom: '40px' }}>
              <h2 style={{ fontSize: '20px', marginBottom: '20px', color: 'white' }}>Quick Actions</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                {actions.map((action) => (
                  <Link key={action.to} to={action.to} style={{ textDecoration: 'none' }}>
                    <Card style={{ padding: '28px', height: '100%' }}>
                      <div style={{
                        width: 50, height: 50, borderRadius: '14px', background: action.gradient,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px',
                        boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                      }}>
                        <action.icon size={24} color="white" />
                      </div>
                      <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'white', marginBottom: '8px' }}>{action.title}</h3>
                      <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>{action.desc}</p>
                    </Card>
                  </Link>
                ))}
                <button
                  type="button"
                  onClick={() => { logout(); navigate('/'); }}
                  className="glass-card"
                  style={{
                    padding: '28px', height: '100%', textAlign: 'left', cursor: 'pointer',
                    border: '1px solid rgba(239, 35, 60, 0.2)', background: 'rgba(239, 35, 60, 0.05)',
                  }}
                >
                  <div style={{
                    width: 50, height: 50, borderRadius: '14px',
                    background: 'linear-gradient(135deg, #ef233c, #f5576c)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px',
                  }}>
                    <RiLogoutBoxLine size={24} color="white" />
                  </div>
                  <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'white', marginBottom: '8px' }}>Logout</h3>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)' }}>Sign out of your account</p>
                </button>
              </div>
            </motion.div>

            {/* Recent interview */}
            {stats.recentInterview && (
              <motion.div variants={fadeInUp} initial="hidden" animate="visible" custom={5}>
                <h2 style={{ fontSize: '20px', marginBottom: '16px', color: 'white' }}>Recent Interview</h2>
                <Card solid hover={false} style={{ padding: '24px 28px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
                    <div>
                      <div style={{ fontWeight: 700, color: 'white', fontSize: '16px', marginBottom: '6px' }}>
                        {stats.recentInterview.role}
                      </div>
                      <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>
                        {formatDate(stats.recentInterview.date)}
                        {stats.recentInterview.status === 'completed' && (
                          <span className={`badge ${getScoreBadgeClass(stats.recentInterview.score)}`} style={{ marginLeft: '12px' }}>
                            Score: {stats.recentInterview.score}
                          </span>
                        )}
                      </div>
                    </div>
                    <Link
                      to={`/interview/${stats.recentInterview.id}/transcript`}
                      className="btn btn-outline btn-sm"
                    >
                      View Transcript <RiArrowRightLine size={16} />
                    </Link>
                  </div>
                </Card>
              </motion.div>
            )}
          </>
        )}
      </div>
    </AppLayout>
  );
};

export default DashboardPage;
