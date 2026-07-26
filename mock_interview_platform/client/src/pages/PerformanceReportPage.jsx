import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInterview } from '../context/InterviewContext';
import { interviewService } from '../services/interviewService';
import AppLayout from '../layouts/AppLayout';
import ScoreCircle from '../components/ScoreCircle';
import SummaryCard from '../components/SummaryCard';
import Card from '../components/Card';
import Loader from '../components/Loader';
import { getScoreLabel } from '../utils/helpers';
import {
  RiThumbUpLine, RiAlertLine, RiRocketLine, RiDashboardLine,
  RiFileListLine, RiArrowRightLine,
} from 'react-icons/ri';
import { toast } from 'react-hot-toast';

const PerformanceReportPage = () => {
  const { sessionId } = useParams();
  const { report: contextReport, resetInterview } = useInterview();
  const [report, setReport] = useState(contextReport);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(!contextReport);

  useEffect(() => {
    const load = async () => {
      if (contextReport) {
        setReport(contextReport);
      }
      try {
        const data = await interviewService.getTranscript(sessionId);
        setSession(data.session);
        if (!contextReport && data.session?.status === 'completed') {
          setReport({
            overallSummary: data.session.overallSummary,
            strengths: data.session.strengths,
            weaknesses: data.session.weaknesses,
            improvementSuggestions: data.session.improvementSuggestions,
            score: data.session.score,
          });
        } else if (!contextReport && data.session?.status !== 'completed') {
          const completeData = await interviewService.completeInterview(sessionId);
          setReport(completeData.report);
          setSession(completeData.session);
        }
      } catch {
        toast.error('Failed to load performance report');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [sessionId, contextReport]);

  if (loading) {
    return (
      <AppLayout>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
          <Loader text="Loading report..." />
        </div>
      </AppLayout>
    );
  }

  if (!report) {
    return (
      <AppLayout>
        <div className="container section" style={{ textAlign: 'center' }}>
          <p>Report not found.</p>
          <Link to="/dashboard" className="btn btn-primary" style={{ marginTop: '16px' }}>Back to Dashboard</Link>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="container section" style={{ paddingTop: '32px', paddingBottom: '64px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'center', marginBottom: '40px' }}
        >
          <span className="badge badge-success" style={{ marginBottom: '12px', display: 'inline-flex' }}>Interview Completed!</span>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 40px)', marginBottom: '8px' }}>
            Performance <span className="text-gradient">Report</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.45)' }}>
            {session?.role || 'Mock Interview'} Session
          </p>
        </motion.div>

        {/* Score & summary */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '40px' }}>
          <Card solid hover={false} style={{ padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <ScoreCircle score={report.score} size={180} />
            <h3 style={{ fontSize: '20px', fontWeight: 700, marginTop: '16px', marginBottom: '4px' }}>
              {getScoreLabel(report.score)}
            </h3>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)' }}>Overall Interview Score</p>
          </Card>

          <Card solid hover={false} style={{ padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px', color: 'white' }}>Overall Summary</h3>
            <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, fontSize: '15px' }}>
              {report.overallSummary}
            </p>
          </Card>
        </div>

        {/* Detailed Breakdown */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '40px' }}>
          <SummaryCard
            title="Key Strengths"
            items={report.strengths}
            icon={RiThumbUpLine}
            accent="success"
          />
          <SummaryCard
            title="Areas for Improvement"
            items={report.weaknesses}
            icon={RiAlertLine}
            accent="warning"
          />
          <SummaryCard
            title="Actionable Steps"
            items={report.improvementSuggestions}
            icon={RiRocketLine}
            accent="primary"
          />
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to={`/interview/${sessionId}/transcript`} className="btn btn-outline btn-lg">
            <RiFileListLine size={18} />
            View Full Transcript
          </Link>
          <Link
            to="/interview/select-role"
            className="btn btn-primary btn-lg"
            onClick={resetInterview}
          >
            Start Another Interview
            <RiArrowRightLine size={18} />
          </Link>
          <Link to="/dashboard" className="btn btn-ghost btn-lg">
            <RiDashboardLine size={18} />
            Dashboard
          </Link>
        </div>
      </div>
    </AppLayout>
  );
};

export default PerformanceReportPage;
