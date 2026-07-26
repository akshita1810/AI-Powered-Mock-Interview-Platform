import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInterview } from '../context/InterviewContext';
import AppLayout from '../layouts/AppLayout';
import Card from '../components/Card';
import Button from '../components/Button';
import Loader from '../components/Loader';
import { ROLES } from '../utils/helpers';
import {
  RiCodeLine, RiDatabase2Line, RiStackLine, RiCpuLine,
  RiBrainLine, RiBarChartLine, RiFlaskLine, RiCloudLine, RiArrowRightLine,
} from 'react-icons/ri';
import { toast } from 'react-hot-toast';

const iconMap = {
  code: RiCodeLine,
  database: RiDatabase2Line,
  stack: RiStackLine,
  chip: RiCpuLine,
  brain: RiBrainLine,
  chart: RiBarChartLine,
  science: RiFlaskLine,
  cloud: RiCloudLine,
};

const RoleSelectionPage = () => {
  const navigate = useNavigate();
  const { startInterview, isLoading } = useInterview();
  const [selectedRole, setSelectedRole] = useState(null);

  const handleStart = async () => {
    if (!selectedRole) {
      toast.error('Please select a role to continue');
      return;
    }
    try {
      const session = await startInterview(selectedRole);
      toast.success('Interview started! Good luck 🚀');
      navigate(`/interview/${session.id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to start interview');
    }
  };

  return (
    <AppLayout>
      {isLoading && <Loader fullScreen text="Preparing your interview..." />}
      <div className="container section" style={{ paddingTop: '32px', paddingBottom: '64px', position: 'relative' }}>
        <div className="gradient-orb orb-purple" style={{ width: 400, height: 400, top: 0, right: '-100px', opacity: 0.5 }} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'center', marginBottom: '48px', position: 'relative', zIndex: 1 }}
        >
          <span className="badge badge-primary" style={{ marginBottom: '12px', display: 'inline-flex' }}>Step 1</span>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 40px)', marginBottom: '12px' }}>
            Choose Your <span className="text-gradient">Interview Role</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.45)', maxWidth: '500px', margin: '0 auto' }}>
            Select the developer role you want to practice for. The AI will generate custom questions.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px', marginBottom: '48px', position: 'relative', zIndex: 1 }}>
          {ROLES.map((role, i) => {
            const Icon = iconMap[role.icon] || RiCodeLine;
            const isSelected = selectedRole === role.id;
            return (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Card
                  onClick={() => setSelectedRole(role.id)}
                  style={{
                    padding: '24px', height: '100%',
                    border: isSelected ? '2px solid var(--color-primary)' : '1px solid rgba(255,255,255,0.08)',
                    background: isSelected ? 'rgba(124, 111, 247, 0.15)' : 'rgba(255,255,255,0.02)',
                    boxShadow: isSelected ? '0 8px 25px rgba(124, 111, 247, 0.3)' : 'none',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <div style={{
                      width: 48, height: 48, borderRadius: '12px',
                      background: `${role.color}20`,
                      border: `1px solid ${role.color}40`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Icon size={24} color={role.color} />
                    </div>
                    {isSelected && (
                      <span className="badge badge-primary">Selected</span>
                    )}
                  </div>
                  <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'white', marginBottom: '6px' }}>{role.id}</h3>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>{role.desc}</p>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
          <Button
            variant="primary"
            size="xl"
            disabled={!selectedRole || isLoading}
            onClick={handleStart}
          >
            Start Interview
            <RiArrowRightLine size={20} />
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default RoleSelectionPage;
