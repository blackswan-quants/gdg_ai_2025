import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import CardContainer from '../common/CardContainer';
import { Swords, Play, Shield, Trophy, Clock } from 'lucide-react';
import QuickFireMode from './QuickFireMode';
import TournamentMode from './TournamentMode';

const BattleMode: React.FC = () => {
  const { selectedSubject } = useAppContext();
  const [selectedMode, setSelectedMode] = useState<string | null>(null);

  if (!selectedSubject) return null;

  const battleModes = [
    {
      id: 'quickfire',
      title: 'Quick Fire',
      description: 'Race against the clock to answer as many questions as possible in 2 minutes',
      icon: Clock,
      color: '#F97316' // Orange
    },
    {
      id: 'challenge',
      title: 'Challenge Mode',
      description: 'Test your knowledge with increasingly difficult questions',
      icon: Shield,
      color: '#8B5CF6' // Purple
    },
    {
      id: 'tournament',
      title: 'Tournament',
      description: 'Compete against yourself or friends to reach the highest score',
      icon: Trophy,
      color: '#14B8A6' // Teal
    }
  ];

  const renderSelectedMode = () => {
    switch (selectedMode) {
      case 'quickfire':
        return <QuickFireMode onBack={() => setSelectedMode(null)} />;
      case 'tournament':
        return <TournamentMode onBack={() => setSelectedMode(null)} />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      {!selectedMode ? (
        <>
          <div className="mb-6">
            <h3 className="text-xl font-medium text-white flex items-center">
              <Swords className="mr-2" />
              Battle Mode
            </h3>
            <p className="text-gray-400 mt-2">
              Challenge yourself with fast-paced study sessions to reinforce your knowledge
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {battleModes.map(mode => (
              <CardContainer 
                key={mode.id}
                className="p-6 flex flex-col items-center text-center h-full transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                onClick={() => setSelectedMode(mode.id)}
              >
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${mode.color}20` }}
                >
                  <mode.icon size={32} color={mode.color} />
                </div>
                <h4 className="text-white text-lg font-medium mb-2">{mode.title}</h4>
                <p className="text-gray-400 text-sm mb-6">{mode.description}</p>
                <button 
                  className="mt-auto flex items-center justify-center space-x-2 rounded-lg px-4 py-2 text-white"
                  style={{ backgroundColor: mode.color }}
                >
                  <Play size={16} />
                  <span>Start</span>
                </button>
              </CardContainer>
            ))}
          </div>
        </>
      ) : (
        renderSelectedMode()
      )}
    </div>
  );
};

export default BattleMode;