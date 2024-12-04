import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const marketData = [
  { name: 'NIFTY 50', value: '22,147.50', change: '+0.75%', positive: true },
  { name: 'SENSEX', value: '72,956.10', change: '+0.65%', positive: true },
  { name: 'BANK NIFTY', value: '46,785.25', change: '-0.25%', positive: false },
];

export function MarketOverview() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Market Overview</h2>
      <div className="space-y-4">
        {marketData.map((item) => (
          <div key={item.name} className="flex justify-between items-center">
            <span className="text-gray-600">{item.name}</span>
            <div className="flex items-center space-x-2">
              <span className="font-medium">{item.value}</span>
              <div className={`flex items-center ${item.positive ? 'text-green-500' : 'text-red-500'}`}>
                {item.positive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                <span className="text-sm">{item.change}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}