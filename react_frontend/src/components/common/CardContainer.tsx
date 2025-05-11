import React from 'react';

interface CardContainerProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const CardContainer: React.FC<CardContainerProps> = ({ 
  children, 
  className = '',
  onClick
}) => {
  return (
    <div 
      className={`glass-card rounded-xl p-6 transition-all duration-300 
        ${onClick ? 'cursor-pointer hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/20' : ''} 
        ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default CardContainer;