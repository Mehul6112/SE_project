import React, { useState } from 'react';
import { StockScreener } from './StockScreener';
import { MutualFundScreener } from './MutualFundScreener';
import { TabButton } from '../ui/TabButton';

export function Screener() {
  const [activeTab, setActiveTab] = useState<'stocks' | 'mutual-funds'>('stocks');

  return (
    <div className="p-6">
      <div className="mb-6 flex space-x-4 border-b">
        <TabButton
          active={activeTab === 'stocks'}
          onClick={() => setActiveTab('stocks')}
        >
          Stocks
        </TabButton>
        <TabButton
          active={activeTab === 'mutual-funds'}
          onClick={() => setActiveTab('mutual-funds')}
        >
          Mutual Funds
        </TabButton>
      </div>

      {activeTab === 'stocks' ? <StockScreener /> : <MutualFundScreener />}
    </div>
  );
}