export const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatDateTime = (dateStr) => {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getScoreLabel = (score) => {
  if (score >= 90) return 'Exceptional';
  if (score >= 75) return 'Strong';
  if (score >= 60) return 'Good';
  if (score >= 45) return 'Needs Work';
  return 'Keep Practicing';
};

export const getScoreBadgeClass = (score) => {
  if (score >= 75) return 'badge-success';
  if (score >= 60) return 'badge-warning';
  return 'badge-danger';
};

export const computeInterviewStats = (history = []) => {
  const completed = history.filter((h) => h.status === 'completed' && typeof h.score === 'number');
  const totalInterviews = completed.length;
  const scores = completed.map((h) => h.score);
  const averageScore = totalInterviews
    ? Math.round(scores.reduce((a, b) => a + b, 0) / totalInterviews)
    : 0;
  const highestScore = totalInterviews ? Math.max(...scores) : 0;
  const recentInterview = history[0] || null;

  return { totalInterviews, averageScore, highestScore, recentInterview };
};

export const ROLES = [
  { id: 'Frontend Developer', icon: 'code', color: '#667eea', desc: 'React, CSS, browser APIs & UI architecture' },
  { id: 'Backend Developer', icon: 'database', color: '#f093fb', desc: 'APIs, databases, system design & scalability' },
  { id: 'Full Stack Developer', icon: 'stack', color: '#43e97b', desc: 'End-to-end development across the full stack' },
  { id: 'Software Engineer', icon: 'chip', color: '#764ba2', desc: 'Algorithms, OOP, design patterns & problem solving' },
  { id: 'AI/ML Engineer', icon: 'brain', color: '#f5576c', desc: 'ML models, neural networks & AI systems' },
  { id: 'Data Analyst', icon: 'chart', color: '#38f9d7', desc: 'SQL, visualization, statistics & insights' },
  { id: 'Data Scientist', icon: 'science', color: '#ffd166', desc: 'Statistics, ML, experimentation & modeling' },
  { id: 'DevOps Engineer', icon: 'cloud', color: '#4facfe', desc: 'CI/CD, Docker, Kubernetes & cloud infra' },
];
