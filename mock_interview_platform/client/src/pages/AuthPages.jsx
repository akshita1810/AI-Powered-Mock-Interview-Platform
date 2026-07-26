import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { RiBrainLine, RiEyeLine, RiEyeOffLine, RiArrowRightLine } from 'react-icons/ri';
import { toast } from 'react-hot-toast';

const AuthLayout = ({ children, title, subtitle }) => (
  <div style={{
    minHeight: '100vh', display: 'flex',
    background: 'var(--color-bg)',
    position: 'relative', overflow: 'hidden',
  }}>
    <div className="gradient-orb orb-purple" style={{ width: 500, height: 500, top: '-150px', left: '-150px' }} />
    <div className="gradient-orb orb-pink" style={{ width: 400, height: 400, bottom: '-100px', right: '-100px' }} />

    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      width: '100%', padding: '32px 16px', position: 'relative', zIndex: 1,
    }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="glass-card-solid"
        style={{ width: '100%', maxWidth: '460px', padding: '48px 40px' }}
      >
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', marginBottom: '36px', justifyContent: 'center' }}>
          <div style={{
            width: 40, height: 40,
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            borderRadius: '10px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <RiBrainLine size={22} color="white" />
          </div>
          <span style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '22px', color: 'white' }}>
            Interview<span className="text-gradient">AI</span>
          </span>
        </Link>

        <h1 style={{ fontSize: '26px', fontWeight: 800, marginBottom: '8px', textAlign: 'center', color: 'white' }}>{title}</h1>
        <p style={{ color: 'rgba(255,255,255,0.45)', textAlign: 'center', fontSize: '14px', marginBottom: '36px' }}>{subtitle}</p>

        {children}
      </motion.div>
    </div>
  </div>
);

export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Invalid email';
    if (!form.password) errs.password = 'Password is required';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success('Welcome back! 👋');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Welcome Back" subtitle="Sign in to continue your interview practice">
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div className="input-group">
          <label className="input-label">Email Address</label>
          <input
            id="login-email"
            type="email"
            className={`input-field ${errors.email ? 'error' : ''}`}
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, email: '' }); }}
            autoComplete="email"
          />
          {errors.email && <span className="input-error">{errors.email}</span>}
        </div>

        <div className="input-group">
          <label className="input-label">Password</label>
          <div style={{ position: 'relative' }}>
            <input
              id="login-password"
              type={showPw ? 'text' : 'password'}
              className={`input-field ${errors.password ? 'error' : ''}`}
              placeholder="Your password"
              value={form.password}
              onChange={(e) => { setForm({ ...form, password: e.target.value }); setErrors({ ...errors, password: '' }); }}
              autoComplete="current-password"
              style={{ paddingRight: '48px' }}
            />
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              style={{
                position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)',
                display: 'flex', alignItems: 'center',
              }}
            >
              {showPw ? <RiEyeOffLine size={18} /> : <RiEyeLine size={18} />}
            </button>
          </div>
          {errors.password && <span className="input-error">{errors.password}</span>}
        </div>

        <button id="login-submit" type="submit" className="btn btn-primary btn-lg" disabled={loading} style={{ marginTop: '8px' }}>
          {loading ? 'Signing in...' : 'Sign In'}
          {!loading && <RiArrowRightLine size={18} />}
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: 'rgba(255,255,255,0.4)' }}>
        Don't have an account?{' '}
        <Link to="/signup" style={{ color: 'var(--color-primary-light)', fontWeight: 600 }}>Sign up free</Link>
      </p>
    </AuthLayout>
  );
};

export const SignupPage = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    else if (form.name.trim().length < 2) errs.name = 'Name must be at least 2 characters';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Invalid email';
    if (!form.password) errs.password = 'Password is required';
    else if (form.password.length < 6) errs.password = 'Password must be at least 6 characters';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      await signup(form.name.trim(), form.email, form.password);
      toast.success("Account created! Let's practice 🚀");
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Create Your Account" subtitle="Join thousands of developers leveling up their interview skills">
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div className="input-group">
          <label className="input-label">Full Name</label>
          <input
            id="signup-name"
            type="text"
            className={`input-field ${errors.name ? 'error' : ''}`}
            placeholder="John Doe"
            value={form.name}
            onChange={(e) => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: '' }); }}
            autoComplete="name"
          />
          {errors.name && <span className="input-error">{errors.name}</span>}
        </div>

        <div className="input-group">
          <label className="input-label">Email Address</label>
          <input
            id="signup-email"
            type="email"
            className={`input-field ${errors.email ? 'error' : ''}`}
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, email: '' }); }}
            autoComplete="email"
          />
          {errors.email && <span className="input-error">{errors.email}</span>}
        </div>

        <div className="input-group">
          <label className="input-label">Password</label>
          <div style={{ position: 'relative' }}>
            <input
              id="signup-password"
              type={showPw ? 'text' : 'password'}
              className={`input-field ${errors.password ? 'error' : ''}`}
              placeholder="Min. 6 characters"
              value={form.password}
              onChange={(e) => { setForm({ ...form, password: e.target.value }); setErrors({ ...errors, password: '' }); }}
              autoComplete="new-password"
              style={{ paddingRight: '48px' }}
            />
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              style={{
                position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)',
                display: 'flex', alignItems: 'center',
              }}
            >
              {showPw ? <RiEyeOffLine size={18} /> : <RiEyeLine size={18} />}
            </button>
          </div>
          {errors.password && <span className="input-error">{errors.password}</span>}
        </div>

        <button id="signup-submit" type="submit" className="btn btn-primary btn-lg" disabled={loading} style={{ marginTop: '8px' }}>
          {loading ? 'Creating account...' : 'Create Account'}
          {!loading && <RiArrowRightLine size={18} />}
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: 'rgba(255,255,255,0.4)' }}>
        Already have an account?{' '}
        <Link to="/login" style={{ color: 'var(--color-primary-light)', fontWeight: 600 }}>Sign in</Link>
      </p>
    </AuthLayout>
  );
};
