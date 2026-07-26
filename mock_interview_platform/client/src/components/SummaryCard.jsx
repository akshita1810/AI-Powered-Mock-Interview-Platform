import Card from './Card';

const SummaryCard = ({ title, items, icon: Icon, accent = 'primary' }) => {
  const colors = {
    primary: { bg: 'rgba(124, 111, 247, 0.15)', border: 'rgba(124, 111, 247, 0.3)', text: 'var(--color-primary-light)' },
    success: { bg: 'rgba(67, 233, 123, 0.12)', border: 'rgba(67, 233, 123, 0.3)', text: '#43e97b' },
    warning: { bg: 'rgba(255, 209, 102, 0.12)', border: 'rgba(255, 209, 102, 0.3)', text: 'var(--color-warning)' },
    danger: { bg: 'rgba(239, 35, 60, 0.12)', border: 'rgba(239, 35, 60, 0.3)', text: 'var(--color-danger)' },
  }[accent];

  return (
    <Card solid hover={false} style={{ padding: '28px', height: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
        {Icon && (
          <div style={{
            width: 40, height: 40, borderRadius: '10px',
            background: colors.bg, border: `1px solid ${colors.border}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon size={22} color={colors.text} />
          </div>
        )}
        <h3 style={{ fontSize: '18px', fontWeight: 700 }}>{title}</h3>
      </div>
      <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingLeft: '20px' }}>
        {items?.map((item, i) => (
          <li key={i} style={{ color: 'var(--color-text-secondary)', fontSize: '15px', lineHeight: 1.6 }}>
            {item}
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default SummaryCard;
