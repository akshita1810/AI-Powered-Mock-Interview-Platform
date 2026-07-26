import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useState } from 'react';
import { RiBrainLine, RiMenuLine, RiCloseLine, RiSunLine, RiMoonLine } from 'react-icons/ri';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ transparent = false }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      padding: '16px 0',
      background: transparent ? 'transparent' : 'rgba(5, 8, 22, 0.85)',
      backdropFilter: 'blur(20px)',
      borderBottom: transparent ? 'none' : '1px solid rgba(255,255,255,0.06)',
      transition: 'all 0.3s ease',
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div style={{
            width: 38, height: 38,
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            borderRadius: '10px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 15px rgba(124, 111, 247, 0.4)',
          }}>
            <RiBrainLine size={22} color="white" />
          </div>
          <span style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '20px', color: 'white' }}>
            Interview<span className="text-gradient">AI</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }} className="hidden md:flex">
          <button
            type="button"
            onClick={toggleTheme}
            className="btn btn-ghost btn-sm"
            aria-label="Toggle theme"
            style={{ padding: '8px 10px' }}
          >
            {isDark ? <RiSunLine size={18} /> : <RiMoonLine size={18} />}
          </button>
          {isAuthenticated ? (
            <>
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>
                Hey, <strong style={{ color: 'white' }}>{user?.name?.split(' ')[0]}</strong>
              </span>
              <Link to="/dashboard" className="btn btn-ghost btn-sm">Dashboard</Link>
              <button onClick={handleLogout} className="btn btn-outline btn-sm">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-ghost btn-sm">Login</Link>
              <Link to="/signup" className="btn btn-primary btn-sm">Get Started</Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', display: 'flex' }}
          className="flex md:hidden"
          aria-label="Toggle menu"
        >
          {menuOpen ? <RiCloseLine size={26} /> : <RiMenuLine size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{
              background: 'rgba(13, 17, 27, 0.98)',
              backdropFilter: 'blur(20px)',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              padding: '16px 24px 24px',
              display: 'flex', flexDirection: 'column', gap: '10px',
            }}
          >
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="btn btn-ghost" onClick={() => setMenuOpen(false)}>Dashboard</Link>
                <Link to="/history" className="btn btn-ghost" onClick={() => setMenuOpen(false)}>History</Link>
                <button type="button" onClick={toggleTheme} className="btn btn-ghost">
                  {isDark ? 'Light Mode' : 'Dark Mode'}
                </button>
                <button onClick={handleLogout} className="btn btn-outline">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-ghost" onClick={() => setMenuOpen(false)}>Login</Link>
                <Link to="/signup" className="btn btn-primary" onClick={() => setMenuOpen(false)}>Get Started</Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
