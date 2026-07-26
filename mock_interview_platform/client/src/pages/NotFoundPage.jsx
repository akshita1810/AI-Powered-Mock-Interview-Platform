import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RiBrainLine, RiHomeLine } from 'react-icons/ri';

const NotFoundPage = () => (
  <div style={{
    minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: 'var(--color-bg)', position: 'relative', overflow: 'hidden', padding: '24px',
  }}>
    <div className="gradient-orb orb-purple" style={{ width: 500, height: 500, top: '-100px', left: '-100px' }} />
    <div className="gradient-orb orb-pink" style={{ width: 400, height: 400, bottom: '-100px', right: '-100px' }} />

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}
    >
      <div style={{
        width: 64, height: 64, borderRadius: '16px',
        background: 'linear-gradient(135deg, #667eea, #764ba2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 24px',
        boxShadow: '0 8px 25px rgba(124, 111, 247, 0.4)',
      }}>
        <RiBrainLine size={32} color="white" />
      </div>
      <h1 style={{ fontSize: 'clamp(60px, 10vw, 120px)', fontWeight: 900, lineHeight: 1, marginBottom: '16px' }}>
        4<span className="text-gradient">0</span>4
      </h1>
      <h3 style={{ fontSize: '24px', marginBottom: '12px' }}>Page Not Found</h3>
      <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: '400px', margin: '0 auto 32px', lineHeight: 1.6 }}>
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="btn btn-primary btn-lg">
        <RiHomeLine size={18} />
        Back to Home
      </Link>
    </motion.div>
  </div>
);

export default NotFoundPage;
