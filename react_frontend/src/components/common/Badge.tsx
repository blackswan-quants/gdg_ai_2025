import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  color?: string;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ children, color = '#8B5CF6', className = '' }) => {
  return (
    <span 
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}
      style={{ backgroundColor: `${color}30`, color }}
    >
      {children}
    </span>
  );
};

export default Badge;