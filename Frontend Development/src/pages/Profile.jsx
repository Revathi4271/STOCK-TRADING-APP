import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

export const Profile = () => {
  const { user, logout } = useAuth();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
        <p className="text-gray-500">Manage your account details.</p>
      </div>

      <Card>
        <div className="flex items-center space-x-6 border-b border-gray-200 pb-6 mb-6">
          <div className="h-24 w-24 bg-indigo-100 rounded-full flex items-center justify-center text-3xl font-bold text-indigo-700">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{user?.name}</h2>
            <p className="text-gray-500">{user?.email}</p>
            <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
              {user?.role?.toUpperCase()}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input type="text" disabled value={user?.name} className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm sm:text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input type="email" disabled value={user?.email} className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm sm:text-sm" />
            </div>
          </div>

          <div>
             <h3 className="text-lg font-medium text-gray-900 mb-2">Account Balance</h3>
             <p className="text-3xl font-bold text-gray-900">${user?.balance?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
             <p className="text-sm text-gray-500 mt-1">This is your virtual paper trading balance.</p>
          </div>

          <div className="pt-6 border-t border-gray-200 flex justify-between">
            <Button variant="secondary">Reset Password</Button>
            <Button variant="danger" onClick={logout}>Sign Out</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
