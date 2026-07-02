import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from './Button';
import { FiTrendingUp, FiMenu, FiX, FiUser } from 'react-icons/fi';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <FiTrendingUp className="text-white h-6 w-6" />
              </div>
              <span className="font-bold text-xl text-gray-900 tracking-tight">SB Stocks</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            {!user ? (
              <>
                <Link to="/login" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md font-medium transition-colors">
                  Login
                </Link>
                <Link to="/register">
                  <Button variant="primary">Get Started</Button>
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-end mr-4">
                  <span className="text-sm text-gray-500">Balance</span>
                  <span className="font-bold text-gray-900">${user.balance?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
                <Link to="/profile" className="text-gray-600 hover:text-indigo-600 transition-colors">
                  <FiUser className="h-6 w-6" />
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              {isMobileMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden border-t border-gray-200 bg-white">
          <div className="pt-2 pb-3 space-y-1">
            {!user ? (
              <>
                <Link to="/login" className="block px-4 py-2 text-base font-medium text-gray-600 hover:text-indigo-600 hover:bg-gray-50">
                  Login
                </Link>
                <Link to="/register" className="block px-4 py-2 text-base font-medium text-gray-600 hover:text-indigo-600 hover:bg-gray-50">
                  Register
                </Link>
              </>
            ) : (
              <>
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-500">Balance</p>
                  <p className="text-lg font-bold text-gray-900">${user.balance?.toLocaleString()}</p>
                </div>
                <Link to="/dashboard" className="block px-4 py-2 text-base font-medium text-gray-600 hover:text-indigo-600 hover:bg-gray-50">Dashboard</Link>
                <Link to="/profile" className="block px-4 py-2 text-base font-medium text-gray-600 hover:text-indigo-600 hover:bg-gray-50">Profile</Link>
                <button 
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-base font-medium text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
