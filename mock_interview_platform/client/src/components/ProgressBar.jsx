const ProgressBar = ({ current, total, showLabel = true }) => {
  const percent = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <div>
      {showLabel && (
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginBottom: '10px', fontSize: '13px', color: 'var(--color-text-secondary)',
        }}>
          <span>Question {current} of {total}</span>
          <span>{percent}%</span>
        </div>
      )}
      <div className="progress-container">
        <div className="progress-fill" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
};

export default ProgressBar;
