import { motion } from 'framer-motion';

const Card = ({
  children,
  className = '',
  hover = true,
  solid = false,
  onClick,
  style = {},
  ...motionProps
}) => {
  const baseClass = solid ? 'glass-card-solid' : hover ? 'glass-card' : 'glass-card-solid';

  return (
    <motion.div
      className={`${baseClass} ${className}`.trim()}
      style={{ cursor: onClick ? 'pointer' : undefined, ...style }}
      onClick={onClick}
      whileHover={onClick ? { scale: 1.01 } : undefined}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
};

export default Card;
