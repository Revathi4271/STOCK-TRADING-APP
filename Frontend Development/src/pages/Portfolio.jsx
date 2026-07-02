import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { portfolioService } from '../services/portfolioService';
import { Card } from '../components/Card';
import { Table } from '../components/Table';
import { Loader } from '../components/Loader';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export const Portfolio = () => {
  const { user } = useAuth();
  const [portfolio, setPortfolio] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const [portfolioRes, summaryRes] = await Promise.all([
          portfolioService.getPortfolio(user.id),
          portfolioService.getPortfolioSummary(user.id)
        ]);
        
        setPortfolio(portfolioRes.data);
        
        setSummary({
          totalInvested: summaryRes.data.totalInvested || 0,
          currentValue: summaryRes.data.currentValue || 0,
          profitLoss: summaryRes.data.profitLoss || 0,
          profitLossPercentage: summaryRes.data.profitLossPercentage || 0
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolio();
  }, [user.id]);

  const columns = [
    { header: 'Symbol', accessor: 'symbol', render: (row) => <span className="font-bold">{row.symbol}</span> },
    { header: 'Name', accessor: 'name' },
    { header: 'Quantity', accessor: 'quantity' },
    { header: 'Avg Price', accessor: 'avgPrice', render: (row) => `$${row.avgPrice.toFixed(2)}` },
    { header: 'Current Price', accessor: 'currentPrice', render: (row) => `$${row.currentPrice.toFixed(2)}` },
    { 
      header: 'Total Value', 
      accessor: 'totalValue', 
      render: (row) => <span className="font-medium">${(row.quantity * row.currentPrice).toFixed(2)}</span> 
    },
    {
      header: 'P&L',
      accessor: 'pl',
      render: (row) => {
        const pl = (row.currentPrice - row.avgPrice) * row.quantity;
        const plPercent = ((row.currentPrice - row.avgPrice) / row.avgPrice) * 100;
        return (
          <div className={pl >= 0 ? 'text-green-600' : 'text-red-600'}>
            {pl >= 0 ? '+' : ''}{pl.toFixed(2)} ({plPercent.toFixed(2)}%)
          </div>
        );
      }
    }
  ];

  if (loading || !summary) return <Loader />;

  const chartData = {
    labels: portfolio.map(item => item.symbol),
    datasets: [
      {
        data: portfolio.map(item => item.quantity * item.currentPrice),
        backgroundColor: [
          'rgba(99, 102, 241, 0.8)',
          'rgba(168, 85, 247, 0.8)',
          'rgba(236, 72, 153, 0.8)',
          'rgba(244, 63, 94, 0.8)',
          'rgba(249, 115, 22, 0.8)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Portfolio</h1>
        <p className="text-gray-500">View your current holdings and performance.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card className="h-full flex flex-col items-center justify-center">
            <h3 className="text-lg font-medium text-gray-900 mb-4 self-start">Asset Allocation</h3>
            {portfolio.length > 0 ? (
              <div className="w-64 h-64">
                <Doughnut data={chartData} options={{ maintainAspectRatio: false }} />
              </div>
            ) : (
              <p className="text-gray-500">No assets in portfolio</p>
            )}
          </Card>
        </div>
        
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Card className="flex flex-col justify-center p-8">
            <p className="text-sm font-medium text-gray-500">Total Invested</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">${summary.totalInvested.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
          </Card>
          <Card className="flex flex-col justify-center p-8">
            <p className="text-sm font-medium text-gray-500">Current Value</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">${summary.currentValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
          </Card>
          <Card className="sm:col-span-2 flex flex-col justify-center p-8 border-l-4 border-l-indigo-600">
            <p className="text-sm font-medium text-gray-500">Total Profit & Loss</p>
            <div className="flex items-baseline space-x-2 mt-2">
              <p className={`text-4xl font-bold ${summary.profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {summary.profitLoss >= 0 ? '+' : '-'}${Math.abs(summary.profitLoss).toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </p>
              <p className={`text-lg font-medium ${summary.profitLossPercentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ({summary.profitLossPercentage >= 0 ? '+' : ''}{summary.profitLossPercentage.toFixed(2)}%)
              </p>
            </div>
          </Card>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Current Holdings</h2>
        <Table columns={columns} data={portfolio} emptyMessage="You don't have any stocks in your portfolio yet." />
      </div>
    </div>
  );
};
