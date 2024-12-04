import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthLayout } from './components/auth/AuthLayout';
import { LoginForm } from './components/auth/LoginForm';
import { SignupForm } from './components/auth/SignupForm';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { Header } from './components/layout/Header';
import { MarketOverview } from './components/dashboard/MarketOverview';
import { Portfolio } from './components/dashboard/Portfolio';
import { QuickActions } from './components/dashboard/QuickActions';
import { TopStocks } from './components/dashboard/TopStocks';

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <div className="grid gap-6">
          <QuickActions />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Portfolio />
            </div>
            <div>
              <MarketOverview />
            </div>
          </div>
          <TopStocks />
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route
          path="/login"
          element={
            <AuthLayout title="Sign in to Fund Aid">
              <LoginForm />
            </AuthLayout>
          }
        />
        <Route
          path="/signup"
          element={
            <AuthLayout title="Create your account">
              <SignupForm />
            </AuthLayout>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;