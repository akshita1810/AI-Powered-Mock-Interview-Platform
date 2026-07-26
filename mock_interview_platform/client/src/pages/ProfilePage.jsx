import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { interviewService } from '../services/interviewService';
import AppLayout from '../layouts/AppLayout';
import Card from '../components/Card';
import { DashboardSkeleton } from '../components/SkeletonLoader';
import { computeInterviewStats, formatDate } from '../utils/helpers';
import {
  RiUserLine, RiMailLine, RiCalendarLine, RiBarChartLine,
  RiStarLine, RiTrophyLine, RiPlayCircleLine,
} from 'react-icons/ri';
import { toast } from 'react-hot-toast';

const ProfilePage = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalInterviews: 0, averageScore: 0, highestScore: 0 });

  useEffect(() => {
    const load = async () => {
      try {
        const data = await interviewService.getHistory();
        setStats(computeInterviewStats(data.history || []));
      } catch {
        toast.error('Failed to load profile stats');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const infoRows = [
    { icon: RiUserLine, label: 'Name', value: user?.name },
    { icon: RiMailLine, label: 'Email', value: user?.email },
    { icon: RiCalendarLine, label: 'Member Since', value: formatDate(user?.createdAt) },
  ];

  const statRows = [
    { icon: RiBarChartLine, label: 'Total Interviews', value: stats.totalInterviews, color: '#667eea' },
    { icon: RiStarLine, label: 'Average Score', value: stats.totalInterviews ? stats.averageScore : '—', color: '#43e97b' },
    { icon: RiTrophyLine, label: 'Highest Score', value: stats.totalInterviews ? stats.highestScore : '—', color: '#ffd166' },
  ];

  return (
    <AppLayout>
      <div className="container section" style={{ paddingTop: '32px', paddingBottom: '64px', maxWidth: '720px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: '40px' }}
        >
          <span className="badge badge-primary" style={{ marginBottom: '12px', display: 'inline-flex' }}>Account</span>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 40px)', marginBottom: '8px' }}>
            Your <span className="text-gradient">Profile</span>
          </h1>
        </motion.div>

        {loading ? (
          <DashboardSkeleton />
        ) : (
          <>
            {/* Avatar */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '24px' }}>
              <Card solid hover={false} style={{ padding: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                  <div style={{
                    width: 72, height: 72, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '28px', fontWeight: 800, color: 'white',
                    boxShadow: '0 8px 25px rgba(124, 111, 247, 0.4)',
                  }}>
                    {user?.name?.[0].toUpperCase() || 'U'}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '22px', fontWeight: 800, color: 'white', marginBottom: '4px' }}>{user?.name}</h3>
                    <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '14px' }}>{user?.email}</p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Details */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ marginBottom: '24px' }}>
              <Card solid hover={false} style={{ padding: '28px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px', color: 'white' }}>Account Information</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {infoRows.map((row) => (
                    <div key={row.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>
                        <row.icon size={18} />
                        <span>{row.label}</span>
                      </div>
                      <div style={{ fontWeight: 600, color: 'white', fontSize: '14px' }}>{row.value}</div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Stats */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ marginBottom: '24px' }}>
              <Card solid hover={false} style={{ padding: '28px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px', color: 'white' }}>Interview Statistics</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px' }}>
                  {statRows.map((stat) => (
                    <div key={stat.label} style={{
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      borderRadius: '12px',
                      padding: '20px',
                    }}>
                      <stat.icon size={20} color={stat.color} style={{ marginBottom: '10px' }} />
                      <div style={{ fontSize: '24px', fontWeight: 800, fontFamily: 'Space Grotesk', color: 'white' }}>{stat.value}</div>
                      <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', marginTop: '4px' }}>{stat.label}</div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Link to="/interview/select-role" className="btn btn-primary btn-lg">
                <RiPlayCircleLine size={18} />
                Start New Interview
              </Link>
            </div>
          </>
        )}
      </div>
    </AppLayout>
  );
};

export default ProfilePage;
