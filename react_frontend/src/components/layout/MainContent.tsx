import React from 'react';
import { useAppContext } from '../../context/AppContext';
import Dashboard from '../dashboard/Dashboard';
import SubjectWorkspace from '../subject/SubjectWorkspace';

const MainContent: React.FC = () => {
  const { selectedSubject } = useAppContext();

  return (
    <main className="flex-1 overflow-y-auto bg-gray-900">
      {selectedSubject ? <SubjectWorkspace /> : <Dashboard />}
    </main>
  );
};

export default MainContent;