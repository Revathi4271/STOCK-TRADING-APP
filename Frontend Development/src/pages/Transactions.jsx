import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { transactionService } from '../services/transactionService';
import { orderService } from '../services/orderService';
import { Table } from '../components/Table';
import { Loader } from '../components/Loader';

export const Transactions = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await orderService.getOrders(user.id);
        setOrders(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user.id]);

  const columns = [
    { 
      header: 'Date', 
      accessor: 'date', 
      render: (row) => new Date(row.date).toLocaleString()
    },
    { 
      header: 'Type', 
      accessor: 'type',
      render: (row) => (
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
          row.type === 'buy' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {row.type.toUpperCase()}
        </span>
      )
    },
    { header: 'Symbol', accessor: 'stockSymbol', render: (row) => <span className="font-bold">{row.stockSymbol}</span> },
    { header: 'Quantity', accessor: 'quantity' },
    { header: 'Price', accessor: 'price', render: (row) => `$${row.price.toFixed(2)}` },
    { header: 'Total', accessor: 'totalAmount', render: (row) => <span className="font-medium">${row.totalAmount.toFixed(2)}</span> },
    { 
      header: 'Status', 
      accessor: 'status',
      render: (row) => (
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
          {row.status.toUpperCase()}
        </span>
      )
    }
  ];

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Order & Transaction History</h1>
        <p className="text-gray-500">View all your past trades and pending orders.</p>
      </div>

      <Table columns={columns} data={orders} emptyMessage="No transactions found." />
    </div>
  );
};

// Also exporting a basic Orders component that just redirects or shows the same
export const Orders = () => <Transactions />;
