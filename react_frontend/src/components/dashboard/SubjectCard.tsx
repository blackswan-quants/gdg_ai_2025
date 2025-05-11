import React from 'react';
import { Subject } from '../../types';
import CardContainer from '../common/CardContainer';
import ProgressBar from '../common/ProgressBar';
import { getIconComponent } from '../../data/mockData';

interface SubjectCardProps {
  subject: Subject;
  onClick: (subject: Subject) => void;
}

const SubjectCard: React.FC<SubjectCardProps> = ({ subject, onClick }) => {
  const Icon = getIconComponent(subject.icon);

  return (
    <CardContainer 
      onClick={() => onClick(subject)}
      className="h-full flex flex-col"
    >
      <div className="flex items-start justify-between mb-3">
        <div 
          className="p-3 rounded-lg" 
          style={{ backgroundColor: `${subject.color}20` }}
        >
          <Icon size={24} color={subject.color} />
        </div>
        <span 
          className="text-xs font-medium rounded-full px-2 py-1"
          style={{ 
            backgroundColor: `${subject.color}20`,
            color: subject.color
          }}
        >
          {subject.progress}%
        </span>
      </div>
      
      <h3 className="text-white text-lg font-medium mb-1">{subject.title}</h3>
      <p className="text-gray-400 text-sm mb-4 flex-grow">{subject.description}</p>
      
      <div className="mt-auto">
        <div className="flex justify-between text-xs text-gray-400 mb-1">
          <span>Progress</span>
          <span>{subject.progress}%</span>
        </div>
        <ProgressBar progress={subject.progress} color={subject.color} />
      </div>
    </CardContainer>
  );
};

export default SubjectCard;