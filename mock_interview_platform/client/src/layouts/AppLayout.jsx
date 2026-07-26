import Navbar from '../components/Navbar';

const AppLayout = ({ children, transparentNav = false }) => (
  <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--color-bg)' }}>
    <Navbar transparent={transparentNav} />
    <main style={{ flex: 1, paddingTop: '80px' }}>
      {children}
    </main>
  </div>
);

export default AppLayout;
