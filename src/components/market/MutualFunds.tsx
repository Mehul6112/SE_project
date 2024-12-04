import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Search } from 'lucide-react';
import { generateRandomPriceChange } from '../utils/marketUtils';

interface MutualFund {
  name: string;
  category: string;
  nav: number;
  change: number;
  aum: string;
  risk: 'High' | 'Moderate' | 'Low';
  rating: number;
}

const initialFunds: MutualFund[] = [
  { name: 'Axis Bluechip Fund', category: 'Large Cap', nav: 45.67, change: 1.2, aum: '25,890 Cr', risk: 'Moderate', rating: 5 },
  { name: 'ICICI Pru Technology Fund', category: 'Sectoral', nav: 89.23, change: -0.8, aum: '8,456 Cr', risk: 'High', rating: 4 },
  { name: 'SBI Small Cap Fund', category: 'Small Cap', nav: 78.90, change: 2.1, aum: '12,345 Cr', risk: 'High', rating: 5 },
  { name: 'HDFC Mid-Cap Opportunities', category: 'Mid Cap', nav: 112.45, change: -1.5, aum: '15,678 Cr', risk: 'High', rating: 4 },
  { name: 'Kotak Equity Hybrid', category: 'Hybrid', nav: 34.56, change: 0.5, aum: '9,876 Cr', risk: 'Moderate', rating: 3 },
  { name: 'Aditya Birla Sun Life Liquid', category: 'Liquid', nav: 335.78, change: 0.1, aum: '32,456 Cr', risk: 'Low', rating: 4 },
  { name: 'Nippon India Growth Fund', category: 'Multi Cap', nav: 67.89, change: 1.8, aum: '11,234 Cr', risk: 'Moderate', rating: 4 },
  { name: 'UTI Flexi Cap Fund', category: 'Flexi Cap', nav: 56.78, change: -0.6, aum: '18,765 Cr', risk: 'Moderate', rating: 5 },
];

export function MutualFunds() {
  const [funds, setFunds] = useState(initialFunds);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setFunds(currentFunds =>
        currentFunds.map(fund => ({
          ...fund,
          nav: Number((fund.nav + generateRandomPriceChange(fund.nav)).toFixed(2)),
          change: Number((generateRandomPriceChange(3)).toFixed(2))
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const filteredFunds = funds.filter(fund =>
    fund.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fund.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRiskColor = (risk: 'High' | 'Moderate' | 'Low') => {
    switch (risk) {
      case 'High': return 'text-red-600 bg-red-50';
      case 'Moderate': return 'text-yellow-600 bg-yellow-50';
      case 'Low': return 'text-green-600 bg-green-50';
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search mutual funds..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fund Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">NAV</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">AUM</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Risk</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredFunds.map((fund) => (
              <tr key={fund.name} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{fund.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{fund.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right">₹{fund.nav.toFixed(2)}</td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm text-right flex items-center justify-end ${
                  fund.change >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {fund.change >= 0 ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  )}
                  {Math.abs(fund.change)}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500">₹{fund.aum}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                  <span className={`px-2 py-1 rounded-full text-xs ${getRiskColor(fund.risk)}`}>
                    {fund.risk}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                  {'★'.repeat(fund.rating)}{'☆'.repeat(5 - fund.rating)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}