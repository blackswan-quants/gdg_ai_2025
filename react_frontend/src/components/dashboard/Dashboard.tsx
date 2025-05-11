import React from 'react';
import { useAppContext } from '../../context/AppContext';
import SubjectCard from './SubjectCard';

const Dashboard: React.FC = () => {
  const { subjects, setSelectedSubject } = useAppContext();

  const handleSelectSubject = (subject: any) => {
    setSelectedSubject(subject);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Your Study Areas</h2>
        <p className="text-gray-400">Choose a subject to continue your studies</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {subjects.map(subject => (
          <SubjectCard 
            key={subject.id} 
            subject={subject} 
            onClick={handleSelectSubject}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;