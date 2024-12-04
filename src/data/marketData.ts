import { Stock, MutualFund } from '../types/market';

export const stocks: Stock[] = [
  { symbol: 'RELIANCE', name: 'Reliance Industries', price: 2456.75, change: 1.2, volume: '2.5M', marketCap: '15.8L Cr' },
  { symbol: 'TCS', name: 'Tata Consultancy Services', price: 3890.45, change: -0.8, volume: '1.8M', marketCap: '12.4L Cr' },
  { symbol: 'HDFCBANK', name: 'HDFC Bank', price: 1678.90, change: 0.5, volume: '3.2M', marketCap: '9.2L Cr' },
  { symbol: 'INFY', name: 'Infosys', price: 1567.30, change: -1.2, volume: '2.1M', marketCap: '6.5L Cr' },
  { symbol: 'ICICIBANK', name: 'ICICI Bank', price: 945.60, change: 0.7, volume: '2.8M', marketCap: '5.8L Cr' },
  { symbol: 'BHARTIARTL', name: 'Bharti Airtel', price: 867.25, change: 1.5, volume: '1.5M', marketCap: '4.2L Cr' },
  { symbol: 'WIPRO', name: 'Wipro Limited', price: 456.80, change: -0.3, volume: '1.2M', marketCap: '2.8L Cr' },
  { symbol: 'ASIANPAINT', name: 'Asian Paints', price: 3245.90, change: 0.9, volume: '0.8M', marketCap: '2.6L Cr' },
];

export const mutualFunds: MutualFund[] = [
  { name: 'Axis Bluechip Fund', category: 'Large Cap', nav: 45.67, change: 1.2, aum: '25,890 Cr', risk: 'Moderate', rating: 5 },
  { name: 'ICICI Pru Technology Fund', category: 'Sectoral', nav: 89.23, change: -0.8, aum: '8,456 Cr', risk: 'High', rating: 4 },
  { name: 'SBI Small Cap Fund', category: 'Small Cap', nav: 78.90, change: 2.1, aum: '12,345 Cr', risk: 'High', rating: 5 },
  { name: 'HDFC Mid-Cap Opportunities', category: 'Mid Cap', nav: 112.45, change: -1.5, aum: '15,678 Cr', risk: 'High', rating: 4 },
  { name: 'Kotak Equity Hybrid', category: 'Hybrid', nav: 34.56, change: 0.5, aum: '9,876 Cr', risk: 'Moderate', rating: 3 },
  { name: 'Aditya Birla Sun Life Liquid', category: 'Liquid', nav: 335.78, change: 0.1, aum: '32,456 Cr', risk: 'Low', rating: 4 },
  { name: 'Nippon India Growth Fund', category: 'Multi Cap', nav: 67.89, change: 1.8, aum: '11,234 Cr', risk: 'Moderate', rating: 4 },
  { name: 'UTI Flexi Cap Fund', category: 'Flexi Cap', nav: 56.78, change: -0.6, aum: '18,765 Cr', risk: 'Moderate', rating: 5 },
];