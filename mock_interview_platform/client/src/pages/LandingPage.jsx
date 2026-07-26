import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  RiBrainLine, RiFlashlightLine, RiLineChartLine, RiShieldCheckLine,
  RiCheckLine, RiArrowRightLine, RiStarLine, RiTimeLine, RiCodeLine,
  RiRobotLine, RiBarChartLine, RiDatabase2Line,
} from 'react-icons/ri';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

const roles = [
  { icon: RiCodeLine, label: 'Frontend Developer', color: '#667eea' },
  { icon: RiDatabase2Line, label: 'Backend Developer', color: '#f093fb' },
  { icon: RiFlashlightLine, label: 'Full Stack Developer', color: '#43e97b' },
  { icon: RiBrainLine, label: 'AI/ML Engineer', color: '#f5576c' },
  { icon: RiBarChartLine, label: 'Data Scientist', color: '#ffd166' },
  { icon: RiShieldCheckLine, label: 'DevOps Engineer', color: '#38f9d7' },
];

const features = [
  {
    icon: RiRobotLine,
    title: 'AI-Powered Questions',
    desc: 'Gemini AI generates dynamic, role-specific questions that adapt based on your answers — just like a real interviewer.',
    gradient: 'linear-gradient(135deg, #667eea, #764ba2)',
  },
  {
    icon: RiFlashlightLine,
    title: 'Instant Feedback',
    desc: 'Receive detailed, constructive feedback after every answer. Know exactly where you excelled and what to improve.',
    gradient: 'linear-gradient(135deg, #f093fb, #f5576c)',
  },
  {
    icon: RiLineChartLine,
    title: 'Performance Analytics',
    desc: 'Track your progress over time with detailed scores, strengths/weaknesses analysis, and improvement suggestions.',
    gradient: 'linear-gradient(135deg, #43e97b, #38f9d7)',
  },
  {
    icon: RiTimeLine,
    title: 'Session History',
    desc: 'Every interview is permanently stored. Revisit transcripts, compare scores, and track your growth.',
    gradient: 'linear-gradient(135deg, #ffecd2, #fcb69f)',
  },
];

const steps = [
  { number: '01', title: 'Choose Your Role', desc: 'Select from 8 tech specializations and let the AI tailor your interview.' },
  { number: '02', title: 'Answer Questions', desc: '5 progressively challenging AI-generated questions, one at a time.' },
  { number: '03', title: 'Get Feedback', desc: 'Receive instant, specific feedback after every single answer.' },
  { number: '04', title: 'View Your Report', desc: 'Detailed performance report with score, strengths, and action items.' },
];

const LandingPage = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar transparent />

      {/* ===== HERO ===== */}
      <section style={{
        minHeight: '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden', paddingTop: '80px',
      }}>
        {/* Background orbs */}
        <div className="gradient-orb orb-purple" style={{ width: 600, height: 600, top: '-100px', left: '-200px' }} />
        <div className="gradient-orb orb-pink" style={{ width: 500, height: 500, bottom: '-100px', right: '-150px' }} />
        <div className="gradient-orb orb-teal" style={{ width: 350, height: 350, top: '40%', left: '50%', transform: 'translate(-50%, -50%)' }} />

        {/* Grid overlay */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.04,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <motion.div variants={fadeInUp} initial="hidden" animate="visible" custom={0}>
            <span className="badge badge-primary" style={{ marginBottom: '24px', display: 'inline-flex' }}>
              <RiBrainLine size={12} />
              Powered by Gemini AI
            </span>
          </motion.div>

          <motion.h1
            variants={fadeInUp} initial="hidden" animate="visible" custom={1}
            style={{ fontSize: 'clamp(40px, 7vw, 80px)', fontWeight: 900, lineHeight: 1.05, marginBottom: '28px', letterSpacing: '-0.02em' }}
          >
            Ace Your Next<br />
            <span className="text-gradient">Tech Interview</span><br />
            with AI
          </motion.h1>

          <motion.p
            variants={fadeInUp} initial="hidden" animate="visible" custom={2}
            style={{ fontSize: 'clamp(16px, 2.5vw, 20px)', color: 'rgba(255,255,255,0.55)', maxWidth: '580px', margin: '0 auto 44px', lineHeight: 1.7 }}
          >
            Practice with an AI interviewer that asks real questions, evaluates your answers, and gives you actionable feedback — all personalized to your role.
          </motion.p>

          <motion.div
            variants={fadeInUp} initial="hidden" animate="visible" custom={3}
            style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '64px' }}
          >
            <Link to="/signup" className="btn btn-primary btn-xl">
              Start Practicing Free
              <RiArrowRightLine size={20} />
            </Link>
            <Link to="/login" className="btn btn-ghost btn-lg">
              I have an account
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeInUp} initial="hidden" animate="visible" custom={4}
            style={{ display: 'flex', justifyContent: 'center', gap: '48px', flexWrap: 'wrap' }}
          >
            {[
              { value: '8', label: 'Tech Roles' },
              { value: '5', label: 'AI Questions' },
              { value: '100', label: 'Point Score' },
              { value: '∞', label: 'Practice Sessions' },
            ].map(stat => (
              <div key={stat.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '32px', fontWeight: 800, fontFamily: 'Space Grotesk', color: 'white' }}>{stat.value}</div>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginTop: '4px' }}>{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== ROLES ===== */}
      <section className="section">
        <div className="container">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeInUp}
            style={{ textAlign: 'center', marginBottom: '56px' }}
          >
            <span className="badge badge-primary" style={{ marginBottom: '16px', display: 'inline-flex' }}>Specializations</span>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', marginBottom: '16px' }}>
              Interview for Any <span className="text-gradient">Tech Role</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.45)', maxWidth: '480px', margin: '0 auto' }}>
              Choose from 8 in-demand tech specializations and get role-specific questions.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '16px' }}>
            {roles.map((role, i) => (
              <motion.div
                key={role.label}
                variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.5}
                className="glass-card"
                style={{ padding: '28px 20px', textAlign: 'center', cursor: 'default' }}
              >
                <div style={{
                  width: 52, height: 52,
                  background: `${role.color}20`,
                  border: `1px solid ${role.color}40`,
                  borderRadius: '14px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 14px',
                }}>
                  <role.icon size={24} color={role.color} />
                </div>
                <p style={{ fontSize: '14px', fontWeight: 600, color: 'rgba(255,255,255,0.8)', lineHeight: 1.3 }}>{role.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="section" style={{ background: 'rgba(255,255,255,0.01)' }}>
        <div className="container">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeInUp}
            style={{ textAlign: 'center', marginBottom: '56px' }}
          >
            <span className="badge badge-primary" style={{ marginBottom: '16px', display: 'inline-flex' }}>Features</span>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', marginBottom: '16px' }}>
              Everything You Need to <span className="text-gradient">Succeed</span>
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
            {features.map((feat, i) => (
              <motion.div
                key={feat.title}
                variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.5}
                className="glass-card"
                style={{ padding: '32px' }}
              >
                <div style={{
                  width: 54, height: 54,
                  background: feat.gradient,
                  borderRadius: '14px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '20px',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                }}>
                  <feat.icon size={26} color="white" />
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px', color: 'white' }}>{feat.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', lineHeight: 1.7 }}>{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="section">
        <div className="container">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeInUp}
            style={{ textAlign: 'center', marginBottom: '64px' }}
          >
            <span className="badge badge-primary" style={{ marginBottom: '16px', display: 'inline-flex' }}>Process</span>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', marginBottom: '16px' }}>
              How It <span className="text-gradient">Works</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.45)', maxWidth: '440px', margin: '0 auto' }}>
              Four simple steps to a better interview performance.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px', position: 'relative' }}>
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.4}
                style={{ textAlign: 'center', padding: '32px 24px' }}
              >
                <div style={{
                  width: 64, height: 64,
                  background: 'linear-gradient(135deg, rgba(124, 111, 247, 0.2), rgba(118, 75, 162, 0.2))',
                  border: '1.5px solid rgba(124, 111, 247, 0.3)',
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 20px',
                  fontFamily: 'Space Grotesk', fontWeight: 800, fontSize: '20px',
                  color: 'var(--color-primary-light)',
                }}>
                  {step.number}
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px', color: 'white' }}>{step.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', lineHeight: 1.7 }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeInUp}
            style={{
              background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.15), rgba(118, 75, 162, 0.15))',
              border: '1px solid rgba(124, 111, 247, 0.25)',
              borderRadius: 'var(--radius-xl)',
              padding: 'clamp(48px, 6vw, 80px) clamp(32px, 5vw, 80px)',
              position: 'relative', overflow: 'hidden',
            }}
          >
            <div className="gradient-orb orb-purple" style={{ width: 400, height: 400, top: '-100px', right: '-100px' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '24px' }}>
                {[...Array(5)].map((_, i) => <RiStarLine key={i} size={22} color="#ffd166" style={{ fill: '#ffd166' }} />)}
              </div>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', marginBottom: '20px', color: 'white' }}>
                Ready to Land Your <span className="text-gradient">Dream Job?</span>
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: '480px', margin: '0 auto 36px', fontSize: '17px' }}>
                Join thousands of developers who practice with InterviewAI. Start your first session — free, forever.
              </p>
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/signup" className="btn btn-primary btn-xl">
                  Get Started Free
                  <RiArrowRightLine size={20} />
                </Link>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '24px', flexWrap: 'wrap' }}>
                {['No credit card', 'Free forever', 'Start in 30 seconds'].map(item => (
                  <span key={item} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>
                    <RiCheckLine size={14} color="var(--color-success)" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
