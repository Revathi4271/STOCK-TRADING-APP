import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { stockService } from '../services/stockService';
import { useAuth } from '../context/AuthContext';
import { orderService } from '../services/orderService';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Loader } from '../components/Loader';
import { toast } from 'react-toastify';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const StockDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, updateBalance } = useAuth();
  
  const [stock, setStock] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isTrading, setIsTrading] = useState(false);

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const res = await stockService.getStockById(id);
        setStock(res.data);
      } catch (error) {
        toast.error('Stock not found');
        navigate('/stocks');
      } finally {
        setLoading(false);
      }
    };
    fetchStock();
  }, [id, navigate]);

  const handleTrade = async (type) => {
    if (quantity <= 0) {
      toast.error('Quantity must be greater than 0');
      return;
    }

    const totalAmount = stock.price * quantity;

    if (type === 'buy' && user.balance < totalAmount) {
      toast.error('Insufficient funds');
      return;
    }

    setIsTrading(true);
    try {
      await orderService.placeOrder(user.id, {
        stockSymbol: stock.symbol,
        stockName: stock.name,
        type,
        quantity: parseInt(quantity),
        price: stock.price,
        totalAmount
      });

      if (type === 'buy') {
        updateBalance(user.balance - totalAmount);
        toast.success(`Successfully bought ${quantity} shares of ${stock.symbol}`);
      } else {
        updateBalance(user.balance + totalAmount);
        toast.success(`Successfully sold ${quantity} shares of ${stock.symbol}`);
      }
      setQuantity(1);
    } catch (error) {
      toast.error('Trade failed');
    } finally {
      setIsTrading(false);
    }
  };

  if (loading || !stock) return <Loader />;

  const chartData = {
    labels: stock.historicalData.map(d => d.date),
    datasets: [
      {
        label: `${stock.symbol} Price`,
        data: stock.historicalData.map(d => d.price),
        borderColor: stock.change >= 0 ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)',
        backgroundColor: stock.change >= 0 ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
        fill: true,
        tension: 0.4,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: { grid: { display: false } },
      x: { grid: { display: false }, ticks: { maxTicksLimit: 7 } }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center text-xl font-bold text-gray-800">
            {stock.symbol.substring(0, 2)}
          </div>
          <div className="ml-4">
            <h1 className="text-3xl font-bold text-gray-900">{stock.symbol}</h1>
            <p className="text-gray-500">{stock.name}</p>
          </div>
        </div>
        <div className="text-left md:text-right">
          <p className="text-3xl font-bold text-gray-900">${stock.price.toFixed(2)}</p>
          <p className={`font-medium ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}% (24h)
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <Card className="lg:col-span-2">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Price History (30 Days)</h2>
          <div className="h-80 w-full">
            <Line data={chartData} options={chartOptions} />
          </div>
        </Card>

        {/* Trading Panel */}
        <Card>
          <h2 className="text-lg font-medium text-gray-900 mb-4">Trade {stock.symbol}</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Available Balance</span>
              <span className="font-bold text-gray-900">${user.balance?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity (Shares)</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="flex justify-between text-sm py-3 border-t border-b border-gray-100">
              <span className="font-medium text-gray-700">Estimated Total</span>
              <span className="font-bold text-gray-900">${(stock.price * (quantity || 0)).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <Button 
                variant="success" 
                onClick={() => handleTrade('buy')}
                isLoading={isTrading}
              >
                Buy
              </Button>
              <Button 
                variant="danger" 
                onClick={() => handleTrade('sell')}
                isLoading={isTrading}
              >
                Sell
              </Button>
            </div>
            <p className="text-xs text-center text-gray-500 mt-2">
              *Paper trading only. No real money involved.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};
