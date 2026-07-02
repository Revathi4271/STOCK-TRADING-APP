import React from 'react';
import { Card } from '../components/Card';
import { Link } from 'react-router-dom';
import { FiStar } from 'react-icons/fi';

export const Watchlist = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Watchlist</h1>
        <p className="text-gray-500">Track your favorite stocks.</p>
      </div>

      <Card className="text-center py-12">
        <div className="mx-auto w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mb-4">
          <FiStar className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No stocks in your watchlist</h3>
        <p className="text-gray-500 mb-6">Start adding stocks to keep track of their performance.</p>
        <Link to="/stocks" className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
          Browse Stocks
        </Link>
      </Card>
    </div>
  );
};
