const Button = ({
  children,
  variant = 'primary',
  size = '',
  className = '',
  loading = false,
  disabled = false,
  type = 'button',
  ...props
}) => {
  const variantClass = {
    primary: 'btn-primary',
    accent: 'btn-accent',
    outline: 'btn-outline',
    ghost: 'btn-ghost',
  }[variant] || 'btn-primary';

  const sizeClass = {
    sm: 'btn-sm',
    lg: 'btn-lg',
    xl: 'btn-xl',
  }[size] || '';

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`btn ${variantClass} ${sizeClass} ${className}`}
      {...props}
    >
      {loading ? (
        <>
          <span className="animate-spin">⚙</span>
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
