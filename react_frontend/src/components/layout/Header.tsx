import React from 'react';
import { Search, Bell, User, Menu } from 'lucide-react';
import IconButton from '../common/IconButton';
import { useAppContext } from '../../context/AppContext';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { selectedSubject } = useAppContext();

  return (
    <header className="h-16 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center">
        <IconButton 
          icon={Menu} 
          onClick={toggleSidebar} 
          className="md:hidden mr-2" 
          label="Toggle sidebar"
        />
        <h1 className="text-xl font-semibold text-white">
          {selectedSubject ? selectedSubject.title : 'Study Manager'}
        </h1>
      </div>

      <div className="flex items-center space-x-1">
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Search..."
            className="bg-gray-800 text-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
        </div>
        <IconButton 
          icon={Search} 
          className="md:hidden" 
          label="Search"
        />
        <IconButton 
          icon={Bell} 
          label="Notifications" 
        />
        <div className="ml-2 flex items-center">
          <img 
            src={useAppContext().currentUser.avatar} 
            alt="Profile" 
            className="w-8 h-8 rounded-full object-cover"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;