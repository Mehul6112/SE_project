import React, { useState } from 'react';
import { Calculator, TrendingUp, Target, PiggyBank } from 'lucide-react';
import { EMICalculator } from './EMICalculator';
import { SIPCalculator } from './SIPCalculator';
import { GoalPlanner } from './GoalPlanner';

export function FinancialTools() {
  const [activeTab, setActiveTab] = useState('emi');

  const tabs = [
    { id: 'emi', label: 'EMI Calculator', icon: <Calculator className="h-5 w-5" /> },
    { id: 'sip', label: 'SIP Calculator', icon: <TrendingUp className="h-5 w-5" /> },
    { id: 'goal', label: 'Goal Planner', icon: <Target className="h-5 w-5" /> },
    { id: 'budget', label: 'Budget Planner', icon: <PiggyBank className="h-5 w-5" /> },
  ];

  return (
    <div className="flex h-[70vh]">
      <div className="w-64 border-r">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 w-full px-4 py-3 text-left ${
              activeTab === tab.id
                ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            {tab.icon}
            <span className="font-medium">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto">
        {activeTab === 'emi' && <EMICalculator />}
        {activeTab === 'sip' && <SIPCalculator />}
        {activeTab === 'goal' && <GoalPlanner />}
        {activeTab === 'budget' && (
          <div className="p-6">
            <div className="flex items-center space-x-2">
              <PiggyBank className="h-6 w-6 text-blue-600" />
              <h3 className="text-lg font-semibold">Budget Planner</h3>
            </div>
            <p className="mt-4 text-gray-600">Budget planner coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
}