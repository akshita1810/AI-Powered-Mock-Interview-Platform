const Input = ({
  label,
  error,
  className = '',
  textarea = false,
  rows = 6,
  ...props
}) => {
  const fieldClass = textarea ? 'textarea-field' : '';
  const Component = textarea ? 'textarea' : 'input';

  return (
    <div className="input-group">
      {label && <label className="input-label">{label}</label>}
      <Component
        className={`input-field ${fieldClass} ${error ? 'error' : ''} ${className}`.trim()}
        rows={textarea ? rows : undefined}
        {...props}
      />
      {error && <span className="input-error">{error}</span>}
    </div>
  );
};

export default Input;
