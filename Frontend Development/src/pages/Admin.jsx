import React, { useEffect, useState } from 'react';
import { adminService } from '../services/adminService';
import { Card } from '../components/Card';
import { Table } from '../components/Table';
import { Loader } from '../components/Loader';
import { FiUsers, FiActivity, FiDollarSign } from 'react-icons/fi';

export const Admin = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const [statsRes, usersRes] = await Promise.all([
          adminService.getSystemStats(),
          adminService.getUsers()
        ]);
        setStats(statsRes.data);
        setUsers(usersRes.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAdminData();
  }, []);

  const userColumns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { 
      header: 'Role', 
      accessor: 'role',
      render: (row) => (
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
          row.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {row.role.toUpperCase()}
        </span>
      )
    },
    { header: 'Balance', accessor: 'balance', render: (row) => `$${row.balance.toLocaleString()}` },
    { header: 'Joined', accessor: 'joined' },
  ];

  if (loading || !stats) return <Loader />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-500">System overview and user management.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="flex items-center p-6 border-l-4 border-blue-500">
          <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
            <FiUsers className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 truncate">Total Users</p>
            <p className="text-2xl font-semibold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
          </div>
        </Card>
        
        <Card className="flex items-center p-6 border-l-4 border-green-500">
          <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
            <FiActivity className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 truncate">Total Trades</p>
            <p className="text-2xl font-semibold text-gray-900">{stats.totalTrades.toLocaleString()}</p>
          </div>
        </Card>

        <Card className="flex items-center p-6 border-l-4 border-indigo-500">
          <div className="p-3 rounded-full bg-indigo-100 text-indigo-600 mr-4">
            <FiDollarSign className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 truncate">Volume Traded</p>
            <p className="text-2xl font-semibold text-gray-900">${stats.volumeTraded.toLocaleString()}</p>
          </div>
        </Card>
      </div>

      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Manage Users</h2>
        </div>
        <Table columns={userColumns} data={users} emptyMessage="No users found." />
      </div>
    </div>
  );
};
