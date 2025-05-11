import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { Share2, BookOpen, Swords } from 'lucide-react';

const TabNavigation: React.FC = () => {
  const { activeTab, setActiveTab } = useAppContext();

  const tabs = [
    { id: 'graph', label: 'Graph View', icon: Share2 },
    { id: 'material', label: 'Material View', icon: BookOpen },
    { id: 'battle', label: 'Battle Mode', icon: Swords }
  ];

  return (
    <div className="border-b border-gray-800">
      <nav className="flex space-x-8 px-6" aria-label="Tabs">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center py-4 px-1 border-b-2 font-medium text-sm
                ${isActive 
                  ? 'border-purple-500 text-purple-400' 
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-700'}
                transition-colors duration-200
              `}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon className="mr-2 h-5 w-5" />
              {tab.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default TabNavigation;