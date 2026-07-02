import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  FiHome, FiActivity, FiPieChart, 
  FiList, FiClock, FiStar, FiSettings, 
  FiShield, FiLogOut 
} from 'react-icons/fi';

export const Sidebar = () => {
  const { user, logout } = useAuth();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: FiHome },
    { name: 'Stocks Market', path: '/stocks', icon: FiActivity },
    { name: 'Portfolio', path: '/portfolio', icon: FiPieChart },
    { name: 'Orders', path: '/orders', icon: FiList },
    { name: 'Transactions', path: '/transactions', icon: FiClock },
    { name: 'Watchlist', path: '/watchlist', icon: FiStar },
    { name: 'Profile', path: '/profile', icon: FiSettings },
  ];

  if (user?.role === 'admin') {
    navItems.push({ name: 'Admin Panel', path: '/admin', icon: FiShield });
  }

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-[calc(100vh-4rem)] sticky top-16 hidden md:flex flex-col">
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
                }`
              }
            >
              <item.icon className="mr-3 flex-shrink-0 h-5 w-5" />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={logout}
          className="flex items-center w-full px-3 py-2.5 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors"
        >
          <FiLogOut className="mr-3 flex-shrink-0 h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  );
};
