import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { FiTrendingUp, FiShield, FiBarChart2 } from 'react-icons/fi';

export const Home = () => {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] bg-white">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
          Master the Market, <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Risk Free.</span>
        </h1>
        <p className="mt-4 max-w-2xl text-xl text-gray-500 mb-10">
          SB Stocks is a premium paper trading platform. Practice trading strategies with real-time market data without risking your actual money.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/register">
            <Button size="lg" className="w-full sm:w-auto px-8">Start Trading for Free</Button>
          </Link>
          <Link to="/login">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto px-8">Login to Dashboard</Button>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900">Everything you need to succeed</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center p-6">
              <div className="bg-indigo-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FiBarChart2 className="text-indigo-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Real-time Data</h3>
              <p className="text-gray-500">Access live stock prices, historical data, and interactive charts to make informed decisions.</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-purple-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FiTrendingUp className="text-purple-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Paper Trading</h3>
              <p className="text-gray-500">Start with a virtual balance of $10,000 and build your portfolio in a simulated environment.</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FiShield className="text-green-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Zero Risk</h3>
              <p className="text-gray-500">Test new strategies without any financial risk. Perfect for beginners and experts alike.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
