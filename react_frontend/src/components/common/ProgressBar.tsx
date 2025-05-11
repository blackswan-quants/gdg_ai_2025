import React from 'react';

interface ProgressBarProps {
  progress: number;
  color?: string;
  height?: number;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  progress, 
  color = '#8B5CF6', 
  height = 8,
  className = ''
}) => {
  return (
    <div className={`w-full bg-gray-700 rounded-full overflow-hidden ${className}`} style={{ height }}>
      <div 
        className="h-full transition-all duration-500 ease-out"
        style={{ 
          width: `${progress}%`, 
          backgroundColor: color 
        }}
      ></div>
    </div>
  );
};

export default ProgressBar;