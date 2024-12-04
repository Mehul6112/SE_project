import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';

export function SIPCalculator() {
  const [monthly, setMonthly] = useState<number>(5000);
  const [rate, setRate] = useState<number>(12);
  const [years, setYears] = useState<number>(10);
  const [result, setResult] = useState<{ total: number; invested: number; returns: number } | null>(null);

  const calculateSIP = () => {
    const monthlyRate = rate / (12 * 100);
    const months = years * 12;
    const invested = monthly * months;
    const total = monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    
    setResult({
      total: Math.round(total),
      invested,
      returns: Math.round(total - invested)
    });
  };

  return (
    <div className="p-6">
      <div className="flex items-center space-x-2 mb-6">
        <TrendingUp className="h-6 w-6 text-blue-600" />
        <h3 className="text-lg font-semibold">SIP Calculator</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Monthly Investment (₹)</label>
          <input
            type="number"
            value={monthly}
            onChange={(e) => setMonthly(Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Expected Return Rate (%)</label>
          <input
            type="number"
            step="0.1"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Time Period (Years)</label>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={calculateSIP}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Calculate Returns
        </button>

        {result && (
          <div className="mt-4 space-y-3">
            <div className="p-3 bg-blue-50 rounded-md">
              <p className="text-sm text-gray-600">Total Value</p>
              <p className="text-2xl font-bold text-blue-600">₹{result.total.toLocaleString()}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-green-50 rounded-md">
                <p className="text-sm text-gray-600">Amount Invested</p>
                <p className="text-lg font-semibold text-green-600">₹{result.invested.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-md">
                <p className="text-sm text-gray-600">Est. Returns</p>
                <p className="text-lg font-semibold text-purple-600">₹{result.returns.toLocaleString()}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}