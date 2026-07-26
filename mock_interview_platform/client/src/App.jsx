import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { InterviewProvider } from './context/InterviewContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import { LoginPage, SignupPage } from './pages/AuthPages';
import DashboardPage from './pages/DashboardPage';
import RoleSelectionPage from './pages/RoleSelectionPage';
import InterviewPage from './pages/InterviewPage';
import PerformanceReportPage from './pages/PerformanceReportPage';
import InterviewHistoryPage from './pages/InterviewHistoryPage';
import TranscriptPage from './pages/TranscriptPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';

const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
      >
        <Routes location={location}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/role-selection"
            element={
              <ProtectedRoute>
                <RoleSelectionPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/interview/select-role"
            element={
              <ProtectedRoute>
                <RoleSelectionPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/interview/:sessionId"
            element={
              <ProtectedRoute>
                <InterviewPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/performance-report/:sessionId"
            element={
              <ProtectedRoute>
                <PerformanceReportPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/interview/:sessionId/report"
            element={
              <ProtectedRoute>
                <PerformanceReportPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <InterviewHistoryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/interview/history"
            element={
              <ProtectedRoute>
                <InterviewHistoryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/transcript/:sessionId"
            element={
              <ProtectedRoute>
                <TranscriptPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/interview/:sessionId/transcript"
            element={
              <ProtectedRoute>
                <TranscriptPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <InterviewProvider>
          <BrowserRouter>
            <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
            <AnimatedRoutes />
          </BrowserRouter>
        </InterviewProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
