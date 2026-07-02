import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './context/AuthContext';
import { MainLayout } from './layouts/MainLayout';
import { DashboardLayout } from './layouts/DashboardLayout';
import { ProtectedRoute } from './routes/ProtectedRoute';

// Pages
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { Stocks } from './pages/Stocks';
import { StockDetails } from './pages/StockDetails';
import { Portfolio } from './pages/Portfolio';
import { Orders, Transactions } from './pages/Transactions';
import { Watchlist } from './pages/Watchlist';
import { Profile } from './pages/Profile';
import { Admin } from './pages/Admin';

const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
    <div className="max-w-max mx-auto text-center">
      <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">404</h1>
      <p className="mt-2 text-base text-gray-500">The page you're looking for doesn't exist.</p>
      <div className="mt-6 flex justify-center">
        <a href="/" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
          Go back home
        </a>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Protected Dashboard Routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/stocks" element={<Stocks />} />
              <Route path="/stocks/:id" element={<StockDetails />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/watchlist" element={<Watchlist />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Route>

          {/* Admin Only Routes */}
          <Route element={<ProtectedRoute adminOnly />}>
            <Route element={<DashboardLayout />}>
              <Route path="/admin" element={<Admin />} />
            </Route>
          </Route>

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer position="bottom-right" />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
