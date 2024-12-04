import React from 'react';

const topStocks = [
  { name: 'TCS', price: '3,890.45', change: '+2.3%', positive: true },
  { name: 'Reliance', price: '2,456.70', change: '+1.8%', positive: true },
  { name: 'HDFC Bank', price: '1,678.90', change: '-0.5%', positive: false },
  { name: 'Infosys', price: '1,567.30', change: '+1.2%', positive: true },
];

export function TopStocks() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Top Stocks</h2>
        <button className="text-blue-600 text-sm font-medium">View More</button>
      </div>
      
      <div className="space-y-4">
        {topStocks.map((stock) => (
          <div key={stock.name} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div>
              <h3 className="font-medium">{stock.name}</h3>
              <p className="text-sm text-gray-500">NSE</p>
            </div>
            <div className="text-right">
              <p className="font-medium">₹{stock.price}</p>
              <p className={`text-sm ${stock.positive ? 'text-green-500' : 'text-red-500'}`}>
                {stock.change}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}