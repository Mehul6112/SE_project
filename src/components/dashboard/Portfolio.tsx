import React, { useState } from 'react';
import { PieChart, IndianRupee, TrendingUp, Plus } from 'lucide-react';
import { usePortfolioStore } from '../../store/portfolioStore';
import { FloatingWindow } from './FloatingWindow';
import { AddInvestmentForm } from './AddInvestmentForm';
import { formatCurrency } from '../../utils/marketUtils';

export function Portfolio() {
  const [showAddInvestment, setShowAddInvestment] = useState(false);
  const investments = usePortfolioStore((state) => state.investments);

  const calculatePortfolioValue = () => {
    return investments.reduce((total, inv) => total + (inv.quantity * inv.buyPrice), 0);
  };

  const totalInvestment = calculatePortfolioValue();

  return (
    <>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Your Portfolio</h2>
          <button
            onClick={() => setShowAddInvestment(true)}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
          >
            <Plus className="h-4 w-4" />
            <span>Add Investment</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <IndianRupee className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total Investment</p>
                <p className="text-xl font-bold">{formatCurrency(totalInvestment)}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Current Value</p>
                <p className="text-xl font-bold">{formatCurrency(totalInvestment * 1.1)}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <PieChart className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Total Returns</p>
                <p className="text-xl font-bold text-green-600">+10.00%</p>
              </div>
            </div>
          </div>
        </div>

        {investments.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Your Investments</h3>
            <div className="space-y-3">
              {investments.map((investment) => (
                <div
                  key={investment.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900">{investment.name}</p>
                    <p className="text-sm text-gray-500">
                      {investment.quantity} {investment.type === 'stock' ? 'shares' : 'units'} @ {formatCurrency(investment.buyPrice)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatCurrency(investment.quantity * investment.buyPrice)}</p>
                    <p className="text-sm text-gray-500">{new Date(investment.date).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <FloatingWindow
        isOpen={showAddInvestment}
        onClose={() => setShowAddInvestment(false)}
        title="Add New Investment"
      >
        <AddInvestmentForm onComplete={() => setShowAddInvestment(false)} />
      </FloatingWindow>
    </>
  );
}