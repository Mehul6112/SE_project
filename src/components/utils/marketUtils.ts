export function generateRandomPriceChange(baseValue: number): number {
  const maxChange = baseValue * 0.002; // 0.2% max change
  return (Math.random() - 0.5) * maxChange;
}