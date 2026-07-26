const ScoreCircle = ({ score, size = 160 }) => {
  const radius = (size - 16) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const getColor = (s) => {
    if (s >= 90) return '#43e97b';
    if (s >= 75) return '#7c6ff7';
    if (s >= 60) return '#ffd166';
    if (s >= 45) return '#f5576c';
    return '#ef233c';
  };

  const color = getColor(score);

  return (
    <div className="score-circle" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="10"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1s ease' }}
        />
      </svg>
      <div className="score-value">
        <div style={{ fontSize: '36px', fontWeight: 800, fontFamily: 'Space Grotesk', color: 'white' }}>{score}</div>
        <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>/ 100</div>
      </div>
    </div>
  );
};

export default ScoreCircle;
