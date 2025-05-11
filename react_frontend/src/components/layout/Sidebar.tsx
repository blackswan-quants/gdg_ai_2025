import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { Bell, Settings } from 'lucide-react';
import IconButton from '../common/IconButton';
import ProgressBar from '../common/ProgressBar';
import { getIconComponent } from '../../data/mockData';

const Sidebar: React.FC = () => {
  const { currentUser, navItems, flashcardDecks } = useAppContext();

  return (
    <aside className="bg-dark-lighter h-screen w-64 flex flex-col shadow-lg border-r border-white/5">
      {/* User profile */}
      <div className="p-4 border-b border-white/5">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img 
              src={currentUser.avatar} 
              alt={currentUser.name} 
              className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/30"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-secondary rounded-full border-2 border-dark-lighter"></div>
          </div>
          <div className="flex-1">
            <h3 className="text-white font-medium neon-text">{currentUser.name}</h3>
            <div className="flex items-center text-gray-400 text-xs">
              <span>Level {currentUser.level}</span>
              <div className="mx-2 w-1 h-1 bg-primary rounded-full"></div>
              <span>{currentUser.progress}% Complete</span>
            </div>
          </div>
        </div>
        <div className="mt-3">
          <ProgressBar progress={currentUser.progress} color="#4287f5" height={4} />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {navItems?.map(item => {
          const Icon = getIconComponent(item.icon);
          return (
            <a 
              key={item.id}
              href={item.path}
              className="flex items-center px-3 py-2 text-sm font-medium rounded-lg text-gray-300 hover:bg-primary/10 hover:text-white group transition-all duration-200"
            >
              <Icon className="mr-3 h-5 w-5" />
              {item.title}
            </a>
          );
        })}
      </nav>

      {/* Flashcard progress */}
      <div className="p-4 border-t border-white/5">
        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
          Flashcard Progress
        </h4>
        <div className="space-y-4">
          {flashcardDecks?.map(deck => (
            <div key={deck.id} className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-300">{deck.title}</span>
                <span className="text-gray-400 text-xs">{deck.cards.completed}/{deck.cards.total}</span>
              </div>
              <div className="flex space-x-0.5 h-1.5 rounded-full overflow-hidden bg-dark-light">
                <div 
                  className="bg-secondary rounded-l-full transition-all duration-300" 
                  style={{ width: `${(deck.cards.completed / deck.cards.total) * 100}%` }}
                ></div>
                <div 
                  className="bg-primary transition-all duration-300" 
                  style={{ width: `${(deck.cards.inReview / deck.cards.total) * 100}%` }}
                ></div>
                <div 
                  className="bg-red-500/70 transition-all duration-300" 
                  style={{ width: `${(deck.cards.onHold / deck.cards.total) * 100}%` }}
                ></div>
                <div 
                  className="bg-gray-700/50 rounded-r-full transition-all duration-300" 
                  style={{ width: `${(deck.cards.toStart / deck.cards.total) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom actions */}
      <div className="p-4 border-t border-white/5 flex justify-between">
        <IconButton 
          icon={Bell} 
          label="Notifications" 
          className="hover:bg-primary/20"
        />
        <IconButton 
          icon={Settings} 
          label="Settings" 
          className="hover:bg-primary/20"
        />
      </div>
    </aside>
  );
};

export default Sidebar;