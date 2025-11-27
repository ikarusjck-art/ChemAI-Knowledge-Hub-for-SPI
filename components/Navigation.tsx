import React from 'react';
import { NAV_ITEMS } from '../constants';
import { NavItem } from '../types';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-md">
      <div className="glass-panel rounded-full px-6 py-3 flex justify-between items-center shadow-2xl">
        {NAV_ITEMS.map((item: NavItem) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center justify-center p-2 rounded-full transition-all duration-300 ${
              activeTab === item.id 
                ? 'text-primary bg-blue-100 scale-110 shadow-inner' 
                : 'text-gray-500 hover:text-secondary hover:bg-gray-100/50'
            }`}
            aria-label={item.label}
          >
            {item.icon}
            <span className="text-[10px] font-medium mt-1">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
