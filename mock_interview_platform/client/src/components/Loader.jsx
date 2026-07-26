import { motion } from 'framer-motion';
import { RiLoader4Line } from 'react-icons/ri';

const Loader = ({ size = 24, text = '', fullScreen = false }) => {
  if (fullScreen) {
    return (
      <div style={{
        position: 'fixed', inset: 0,
        background: 'rgba(5, 8, 22, 0.9)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        zIndex: 9999, gap: '16px',
      }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          <RiLoader4Line size={40} color="var(--color-primary)" />
        </motion.div>
        {text && (
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '15px', fontWeight: 500 }}>
            {text}
          </p>
        )}
      </div>
    );
  }

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        style={{ display: 'flex' }}
      >
        <RiLoader4Line size={size} color="var(--color-primary)" />
      </motion.div>
      {text && <span style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>{text}</span>}
    </div>
  );
};

export default Loader;
