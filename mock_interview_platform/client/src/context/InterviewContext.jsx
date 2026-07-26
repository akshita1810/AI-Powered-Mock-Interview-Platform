import { createContext, useContext, useState, useCallback } from 'react';
import { interviewService } from '../services/interviewService';

const InterviewContext = createContext(null);

export const InterviewProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [questionNumber, setQuestionNumber] = useState(1);
  const [feedback, setFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [report, setReport] = useState(null);

  const startInterview = useCallback(async (role) => {
    setIsLoading(true);
    try {
      const data = await interviewService.startInterview(role);
      setSession(data.session);
      setCurrentQuestion(data.session.currentQuestion);
      setQuestionNumber(1);
      setFeedback('');
      setIsComplete(false);
      setReport(null);
      return data.session;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const submitAnswer = useCallback(async (answer) => {
    if (!session?.id) throw new Error("No active interview session.");
    setIsLoading(true);
    try {
      const data = await interviewService.submitAnswer(session.id, answer);
      setFeedback(data.feedback);
      if (data.isComplete) {
        setIsComplete(true);
      } else {
        setCurrentQuestion(data.nextQuestion);
        setQuestionNumber(data.questionNumber);
      }
      return data;
    } finally {
      setIsLoading(false);
    }
  }, [session]);

  const completeInterview = useCallback(async () => {
    if (!session?.id) throw new Error("No active interview session.");
    setIsLoading(true);
    try {
      const data = await interviewService.completeInterview(session.id);
      setReport(data.report);
      setIsComplete(true);
      return data;
    } finally {
      setIsLoading(false);
    }
  }, [session]);

  const resetInterview = useCallback(() => {
    setSession(null);
    setCurrentQuestion('');
    setQuestionNumber(1);
    setFeedback('');
    setIsLoading(false);
    setIsComplete(false);
    setReport(null);
  }, []);

  return (
    <InterviewContext.Provider
      value={{
        session,
        currentQuestion,
        questionNumber,
        feedback,
        isLoading,
        isComplete,
        report,
        startInterview,
        submitAnswer,
        completeInterview,
        resetInterview,
      }}
    >
      {children}
    </InterviewContext.Provider>
  );
};

export const useInterview = () => {
  const context = useContext(InterviewContext);
  if (!context) throw new Error('useInterview must be used within an InterviewProvider');
  return context;
};
