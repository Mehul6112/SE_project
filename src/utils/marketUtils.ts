export function generateRandomPriceChange(baseValue: number): number {
  const maxChange = baseValue * 0.002; // 0.2% max change
  return (Math.random() - 0.5) * maxChange;
}

export function formatCurrency(value: number): string {
  return `₹${value.toLocaleString('en-IN')}`;
}

export function parseMarketCap(marketCap: string): number {
  const numStr = marketCap.replace(/[^0-9.]/g, '');
  const multiplier = marketCap.includes('L') ? 100000 : 1;
  return parseFloat(numStr) * multiplier;
}

export function parseAUM(aum: string): number {
  return parseFloat(aum.replace(/[^0-9.]/g, ''));
}

export function getRiskColor(risk: 'High' | 'Moderate' | 'Low'): string {
  switch (risk) {
    case 'High': return 'text-red-600 bg-red-50';
    case 'Moderate': return 'text-yellow-600 bg-yellow-50';
    case 'Low': return 'text-green-600 bg-green-50';
  }
}