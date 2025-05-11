import React from 'react';
import { NavLink } from 'react-router-dom';
import { BarChart2, Timer, Settings } from 'lucide-react';

const NavBar: React.FC = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2 shadow-lg">
      <div className="container max-w-md mx-auto">
        <div className="flex justify-around">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex flex-col items-center p-2 rounded-md transition-colors ${
                isActive ? 'text-teal-600' : 'text-gray-500 hover:text-gray-700'
              }`
            }
          >
            <BarChart2 size={24} />
            <span className="text-xs mt-1">Records</span>
          </NavLink>
          
          <NavLink
            to="/timer"
            className={({ isActive }) =>
              `flex flex-col items-center p-2 rounded-md transition-colors ${
                isActive ? 'text-teal-600' : 'text-gray-500 hover:text-gray-700'
              }`
            }
          >
            <Timer size={24} />
            <span className="text-xs mt-1">Timer</span>
          </NavLink>
          
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex flex-col items-center p-2 rounded-md transition-colors ${
                isActive ? 'text-teal-600' : 'text-gray-500 hover:text-gray-700'
              }`
            }
          >
            <Settings size={24} />
            <span className="text-xs mt-1">Settings</span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;