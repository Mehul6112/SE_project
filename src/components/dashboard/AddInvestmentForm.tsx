import React, { useState } from 'react';
import { usePortfolioStore } from '../../store/portfolioStore';
import { stocks } from '../../data/marketData';
import { mutualFunds } from '../../data/marketData';
import { TabButton } from '../ui/TabButton';

interface AddInvestmentFormProps {
  onComplete: () => void;
}

export function AddInvestmentForm({ onComplete }: AddInvestmentFormProps) {
  const [type, setType] = useState<'stock' | 'mutual-fund'>('stock');
  const [symbol, setSymbol] = useState('');
  const [quantity, setQuantity] = useState('');
  const [buyPrice, setBuyPrice] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const addInvestment = usePortfolioStore((state) => state.addInvestment);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let name = '';
    if (type === 'stock') {
      name = stocks.find(s => s.symbol === symbol)?.name || symbol;
    } else {
      name = mutualFunds.find(f => f.name === symbol)?.name || symbol;
    }

    addInvestment({
      type,
      symbol,
      name,
      quantity: Number(quantity),
      buyPrice: Number(buyPrice),
      date,
    });

    onComplete();
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex space-x-4 border-b">
        <TabButton
          active={type === 'stock'}
          onClick={() => setType('stock')}
        >
          Stocks
        </TabButton>
        <TabButton
          active={type === 'mutual-fund'}
          onClick={() => setType('mutual-fund')}
        >
          Mutual Funds
        </TabButton>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {type === 'stock' ? 'Stock Symbol' : 'Fund Name'}
          </label>
          <select
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="">Select {type === 'stock' ? 'a stock' : 'a fund'}</option>
            {type === 'stock'
              ? stocks.map(stock => (
                  <option key={stock.symbol} value={stock.symbol}>
                    {stock.symbol} - {stock.name}
                  </option>
                ))
              : mutualFunds.map(fund => (
                  <option key={fund.name} value={fund.name}>
                    {fund.name}
                  </option>
                ))
            }
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Quantity
          </label>
          <input
            type="number"
            min="0"
            step={type === 'stock' ? '1' : '0.001'}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Buy Price
          </label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={buyPrice}
            onChange={(e) => setBuyPrice(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Purchase Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add Investment
          </button>
        </div>
      </form>
    </div>
  );
}