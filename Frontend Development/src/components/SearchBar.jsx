import React from 'react';
import { FiSearch } from 'react-icons/fi';

export const SearchBar = ({ placeholder = 'Search...', value, onChange, className }) => {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <FiSearch className="text-gray-400" />
      </div>
      <input
        type="text"
        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm transition-colors"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
