import { motion, AnimatePresence } from 'framer-motion';
import { RiCloseLine } from 'react-icons/ri';

const Modal = ({ isOpen, onClose, title, children, maxWidth = '520px' }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          background: 'rgba(5, 8, 22, 0.75)',
          backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '24px',
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="glass-card-solid"
          style={{ width: '100%', maxWidth, padding: '32px', position: 'relative' }}
          onClick={(e) => e.stopPropagation()}
        >
          {title && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '20px' }}>{title}</h3>
              <button
                onClick={onClose}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-text-secondary)',
                  cursor: 'pointer',
                  display: 'flex',
                  padding: '4px',
                }}
              >
                <RiCloseLine size={24} />
              </button>
            </div>
          )}
          {children}
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default Modal;
