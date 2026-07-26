import { Link } from 'react-router-dom';
import { RiBrainLine, RiGithubLine, RiLinkedinLine, RiTwitterLine } from 'react-icons/ri';

const Footer = () => {
  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.06)',
      background: 'rgba(5, 8, 22, 0.9)',
      padding: '48px 0 32px',
      marginTop: 'auto',
    }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '40px' }}>
          {/* Brand */}
          <div>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', marginBottom: '16px' }}>
              <div style={{
                width: 34, height: 34,
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                borderRadius: '8px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <RiBrainLine size={18} color="white" />
              </div>
              <span style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '18px', color: 'white' }}>
                Interview<span className="text-gradient">AI</span>
              </span>
            </Link>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', lineHeight: 1.7, maxWidth: '220px' }}>
              Master your next tech interview with AI-powered mock sessions and real-time feedback.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 style={{ fontFamily: 'Space Grotesk', color: 'white', fontWeight: 600, marginBottom: '16px', fontSize: '15px' }}>Platform</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { label: 'Dashboard', to: '/dashboard' },
                { label: 'Start Interview', to: '/role-selection' },
                { label: 'Interview History', to: '/history' },
                { label: 'Profile', to: '/profile' },
              ].map(link => (
                <Link key={link.to} to={link.to} style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => e.target.style.color = 'rgba(255,255,255,0.9)'}
                  onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.5)'}
                >{link.label}</Link>
              ))}
            </div>
          </div>

          {/* Roles */}
          <div>
            <h4 style={{ fontFamily: 'Space Grotesk', color: 'white', fontWeight: 600, marginBottom: '16px', fontSize: '15px' }}>Interview Roles</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {['Frontend Developer', 'Backend Developer', 'Full Stack', 'AI/ML Engineer', 'Data Scientist', 'DevOps Engineer'].map(role => (
                <span key={role} style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>{role}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ 
          borderTop: '1px solid rgba(255,255,255,0.06)',
          paddingTop: '24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px',
        }}>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px' }}>
            © 2024 InterviewAI. Built with Gemini AI.
          </p>
          <div style={{ display: 'flex', gap: '16px' }}>
            {[RiGithubLine, RiLinkedinLine, RiTwitterLine].map((Icon, i) => (
              <a key={i} href="#" style={{
                color: 'rgba(255,255,255,0.4)', 
                transition: 'color 0.2s',
                display: 'flex',
              }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.9)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
