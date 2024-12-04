import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Search } from 'lucide-react';
import { generateRandomPriceChange } from '../utils/marketUtils';

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  volume: string;
  marketCap: string;
}

const initialStocks: Stock[] = [
  { symbol: 'RELIANCE', name: 'Reliance Industries', price: 2456.75, change: 1.2, volume: '2.5M', marketCap: '15.8L Cr' },
  { symbol: 'TCS', name: 'Tata Consultancy Services', price: 3890.45, change: -0.8, volume: '1.8M', marketCap: '12.4L Cr' },
  { symbol: 'HDFCBANK', name: 'HDFC Bank', price: 1678.90, change: 0.5, volume: '3.2M', marketCap: '9.2L Cr' },
  { symbol: 'INFY', name: 'Infosys', price: 1567.30, change: -1.2, volume: '2.1M', marketCap: '6.5L Cr' },
  { symbol: 'ICICIBANK', name: 'ICICI Bank', price: 945.60, change: 0.7, volume: '2.8M', marketCap: '5.8L Cr' },
  { symbol: 'BHARTIARTL', name: 'Bharti Airtel', price: 867.25, change: 1.5, volume: '1.5M', marketCap: '4.2L Cr' },
  { symbol: 'WIPRO', name: 'Wipro Limited', price: 456.80, change: -0.3, volume: '1.2M', marketCap: '2.8L Cr' },
  { symbol: 'ASIANPAINT', name: 'Asian Paints', price: 3245.90, change: 0.9, volume: '0.8M', marketCap: '2.6L Cr' },
];

export function StockMarket() {
  const [stocks, setStocks] = useState(initialStocks);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setStocks(currentStocks =>
        currentStocks.map(stock => ({
          ...stock,
          price: Number((stock.price + generateRandomPriceChange(stock.price)).toFixed(2)),
          change: Number((generateRandomPriceChange(5)).toFixed(2))
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const filteredStocks = stocks.filter(stock =>
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search stocks..."
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Symbol</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Volume</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Market Cap</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredStocks.map((stock) => (
              <tr key={stock.symbol} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{stock.symbol}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{stock.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right">₹{stock.price.toLocaleString()}</td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm text-right flex items-center justify-end ${
                  stock.change >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stock.change >= 0 ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  )}
                  {Math.abs(stock.change)}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500">{stock.volume}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500">{stock.marketCap}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}