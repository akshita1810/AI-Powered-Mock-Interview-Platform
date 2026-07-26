const SkeletonLoader = ({ width = '100%', height = '20px', style = {} }) => (
  <div className="skeleton" style={{ width, height, ...style }} />
);

export const DashboardSkeleton = () => (
  <div style={{ display: 'grid', gap: '24px' }}>
    <SkeletonLoader height="120px" />
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
      {[1, 2, 3, 4].map((i) => <SkeletonLoader key={i} height="100px" />)}
    </div>
    <SkeletonLoader height="200px" />
  </div>
);

export const HistorySkeleton = () => (
  <div style={{ display: 'grid', gap: '16px' }}>
    {[1, 2, 3, 4].map((i) => (
      <SkeletonLoader key={i} height="80px" style={{ borderRadius: '14px' }} />
    ))}
  </div>
);

export default SkeletonLoader;
