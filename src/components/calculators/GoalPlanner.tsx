import React, { useState } from 'react';
import { Target } from 'lucide-react';

export function GoalPlanner() {
  const [targetAmount, setTargetAmount] = useState<number>(1000000);
  const [years, setYears] = useState<number>(5);
  const [expectedReturn, setExpectedReturn] = useState<number>(12);
  const [result, setResult] = useState<{ monthly: number; total: number } | null>(null);

  const calculateMonthlyInvestment = () => {
    const monthlyRate = expectedReturn / (12 * 100);
    const months = years * 12;
    const monthly = (targetAmount * monthlyRate) / 
                   ((Math.pow(1 + monthlyRate, months) - 1) * (1 + monthlyRate));
    
    setResult({
      monthly: Math.round(monthly),
      total: Math.round(monthly * months)
    });
  };

  return (
    <div className="p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Target className="h-6 w-6 text-blue-600" />
        <h3 className="text-lg font-semibold">Goal Planner</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Target Amount (₹)</label>
          <input
            type="number"
            value={targetAmount}
            onChange={(e) => setTargetAmount(Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Time to Goal (Years)</label>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Expected Return Rate (%)</label>
          <input
            type="number"
            step="0.1"
            value={expectedReturn}
            onChange={(e) => setExpectedReturn(Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={calculateMonthlyInvestment}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Calculate Required Investment
        </button>

        {result && (
          <div className="mt-4 space-y-3">
            <div className="p-4 bg-blue-50 rounded-md">
              <p className="text-sm text-gray-600">Required Monthly Investment</p>
              <p className="text-2xl font-bold text-blue-600">₹{result.monthly.toLocaleString()}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-md">
              <p className="text-sm text-gray-600">Total Investment Required</p>
              <p className="text-lg font-semibold text-gray-700">₹{result.total.toLocaleString()}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}