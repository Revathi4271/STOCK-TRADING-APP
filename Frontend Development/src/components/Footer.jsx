import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center justify-center mb-4 md:mb-0">
          <span className="text-gray-500 text-sm">
            © {new Date().getFullYear()} SB Stocks. All rights reserved. Paper trading simulation only.
          </span>
        </div>
        <div className="flex space-x-6 text-sm text-gray-500">
          <a href="#" className="hover:text-indigo-600 transition-colors">Terms</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">Support</a>
        </div>
      </div>
    </footer>
  );
};
