import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface IconButtonProps {
  icon: LucideIcon;
  onClick?: () => void;
  className?: string;
  size?: number;
  label?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
}

const IconButton: React.FC<IconButtonProps> = ({ 
  icon: Icon, 
  onClick, 
  className = '',
  size = 20,
  label,
  variant = 'ghost'
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-purple-600 hover:bg-purple-700 text-white';
      case 'secondary':
        return 'bg-teal-600 hover:bg-teal-700 text-white';
      case 'ghost':
      default:
        return 'bg-transparent hover:bg-gray-700 text-gray-300 hover:text-white';
    }
  };

  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-lg transition-all duration-200 flex items-center justify-center ${getVariantClasses()} ${className}`}
      aria-label={label || 'Button'}
    >
      <Icon size={size} />
    </button>
  );
};

export default IconButton;