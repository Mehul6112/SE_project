import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Investment {
  id: string;
  type: 'stock' | 'mutual-fund';
  symbol: string;
  name: string;
  quantity: number;
  buyPrice: number;
  date: string;
}

interface PortfolioState {
  investments: Investment[];
  addInvestment: (investment: Omit<Investment, 'id'>) => void;
  removeInvestment: (id: string) => void;
  updateInvestment: (id: string, updates: Partial<Investment>) => void;
}

export const usePortfolioStore = create<PortfolioState>()(
  persist(
    (set) => ({
      investments: [],
      addInvestment: (investment) => set((state) => ({
        investments: [...state.investments, { ...investment, id: Date.now().toString() }]
      })),
      removeInvestment: (id) => set((state) => ({
        investments: state.investments.filter((inv) => inv.id !== id)
      })),
      updateInvestment: (id, updates) => set((state) => ({
        investments: state.investments.map((inv) =>
          inv.id === id ? { ...inv, ...updates } : inv
        )
      })),
    }),
    {
      name: 'portfolio-storage',
    }
  )
);