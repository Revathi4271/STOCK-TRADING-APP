import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { stockService } from '../services/stockService';
import { Card } from '../components/Card';
import { Loader } from '../components/Loader';
import { SearchBar } from '../components/SearchBar';
import { Table } from '../components/Table';
import { FiArrowUpRight, FiArrowDownRight } from 'react-icons/fi';

export const Stocks = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const res = await stockService.getStocks();
        setStocks(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchStocks();
  }, []);

  const filteredStocks = stocks.filter(stock => 
    stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) || 
    stock.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    {
      header: 'Symbol',
      accessor: 'symbol',
      render: (row) => (
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-800 font-bold text-sm">
            {row.symbol.substring(0, 2)}
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{row.symbol}</div>
            <div className="text-sm text-gray-500">{row.name}</div>
          </div>
        </div>
      )
    },
    {
      header: 'Price',
      accessor: 'price',
      render: (row) => <span className="font-medium">${row.price.toFixed(2)}</span>
    },
    {
      header: '24h Change',
      accessor: 'change',
      render: (row) => (
        <div className={`flex items-center ${row.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {row.change >= 0 ? <FiArrowUpRight className="mr-1" /> : <FiArrowDownRight className="mr-1" />}
          {Math.abs(row.change).toFixed(2)}%
        </div>
      )
    },
    { header: 'Volume', accessor: 'volume', render: (row) => row.volume.toLocaleString() },
    { header: 'Market Cap', accessor: 'marketCap' },
    {
      header: 'Action',
      accessor: 'id',
      render: (row) => (
        <Link 
          to={`/stocks/${row.symbol}`}
          className="text-indigo-600 hover:text-indigo-900 font-medium"
        >
          View & Trade
        </Link>
      )
    }
  ];

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Stocks Market</h1>
          <p className="text-gray-500">Browse and trade available stocks.</p>
        </div>
        <div className="mt-4 md:mt-0 w-full md:w-64">
          <SearchBar 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search stocks..." 
          />
        </div>
      </div>

      <Table 
        columns={columns} 
        data={filteredStocks} 
        keyField="id" 
        emptyMessage="No stocks found matching your search."
      />
    </div>
  );
};
