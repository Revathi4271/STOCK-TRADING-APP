import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Card } from '../components/Card';
import { portfolioService } from '../services/portfolioService';
import { FiDollarSign, FiTrendingUp, FiActivity, FiArrowUpRight, FiArrowDownRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Loader } from '../components/Loader';

export const Dashboard = () => {
  const { user } = useAuth();
  const [portfolioStats, setPortfolioStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await portfolioService.getPortfolioSummary(user.id);
        setPortfolioStats(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, [user.id]);

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user.name}</h1>
          <p className="text-gray-500">Here's what's happening with your portfolio today.</p>
        </div>
        <div className="mt-4 md:mt-0 space-x-3">
          <Link to="/stocks" className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
            Trade Stocks
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="flex items-center p-6">
          <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
            <FiDollarSign className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 truncate">Available Balance</p>
            <p className="text-2xl font-semibold text-gray-900">${user.balance?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
          </div>
        </Card>

        <Card className="flex items-center p-6">
          <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
            <FiActivity className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 truncate">Total Invested</p>
            <p className="text-2xl font-semibold text-gray-900">${portfolioStats?.totalInvested?.toLocaleString(undefined, { minimumFractionDigits: 2 }) || '0.00'}</p>
          </div>
        </Card>

        <Card className="flex items-center p-6">
          <div className="p-3 rounded-full bg-indigo-100 text-indigo-600 mr-4">
            <FiTrendingUp className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 truncate">Current Value</p>
            <p className="text-2xl font-semibold text-gray-900">${portfolioStats?.currentValue?.toLocaleString(undefined, { minimumFractionDigits: 2 }) || '0.00'}</p>
          </div>
        </Card>

        <Card className="flex items-center p-6">
          <div className={`p-3 rounded-full mr-4 ${portfolioStats?.profitLoss >= 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
            {portfolioStats?.profitLoss >= 0 ? <FiArrowUpRight className="h-6 w-6" /> : <FiArrowDownRight className="h-6 w-6" />}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 truncate">Total Profit/Loss</p>
            <div className="flex items-baseline space-x-2">
              <p className={`text-2xl font-semibold ${portfolioStats?.profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {portfolioStats?.profitLoss >= 0 ? '+' : '-'}${Math.abs(portfolioStats?.profitLoss || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </p>
              <p className={`text-sm ${portfolioStats?.profitLossPercentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ({portfolioStats?.profitLossPercentage?.toFixed(2)}%)
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Recent Transactions</h2>
            <Link to="/transactions" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">View all</Link>
          </div>
          <div className="text-center py-8 text-gray-500">
            <p>No recent transactions.</p>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Market Overview</h2>
            <Link to="/stocks" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">View market</Link>
          </div>
          <div className="text-center py-8 text-gray-500">
             <p>Go to Stocks Market to view top gainers and losers.</p>
          </div>
        </Card>
      </div>
    </div>
  );
};
