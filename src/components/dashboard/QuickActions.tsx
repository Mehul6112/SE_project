import React, { useState } from 'react';
import { LineChart, PieChart, Calculator, GraduationCap } from 'lucide-react';
import { FloatingWindow } from './FloatingWindow';
import { FinancialTools } from '../calculators/FinancialTools';
import { StockMarket } from '../market/StockMarket';
import { MutualFunds } from '../market/MutualFunds';
import { FinancialLiteracy } from '../education/FinancialLiteracy';

export function QuickActions() {
  const [activeWindow, setActiveWindow] = useState<string | null>(null);

  const actions = [
    { icon: <LineChart className="h-6 w-6" />, label: 'Stocks', id: 'stocks' },
    { icon: <PieChart className="h-6 w-6" />, label: 'Mutual Funds', id: 'mutual-funds' },
    { icon: <Calculator className="h-6 w-6" />, label: 'Financial Tools', id: 'tools' },
    { icon: <GraduationCap className="h-6 w-6" />, label: 'Financial Literacy', id: 'education' },
  ];

  const getWindowContent = (id: string) => {
    switch (id) {
      case 'stocks':
        return <StockMarket />;
      case 'mutual-funds':
        return <MutualFunds />;
      case 'tools':
        return <FinancialTools />;
      case 'education':
        return <FinancialLiteracy />;
      default:
        return (
          <div className="p-4">
            <p className="text-gray-600">Content for {id} will be added later.</p>
          </div>
        );
    }
  };

  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={() => setActiveWindow(action.id)}
            className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <div className="text-blue-600 mb-2">{action.icon}</div>
            <span className="text-sm font-medium text-gray-700">{action.label}</span>
          </button>
        ))}
      </div>

      <FloatingWindow
        isOpen={activeWindow !== null}
        onClose={() => setActiveWindow(null)}
        title={actions.find(a => a.id === activeWindow)?.label || ''}
      >
        {activeWindow && getWindowContent(activeWindow)}
      </FloatingWindow>
    </>
  );
}