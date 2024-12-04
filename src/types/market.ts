export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  volume: string;
  marketCap: string;
}

export interface MutualFund {
  name: string;
  category: string;
  nav: number;
  change: number;
  aum: string;
  risk: 'High' | 'Moderate' | 'Low';
  rating: number;
}

export interface SortConfig {
  field: string;
  order: 'asc' | 'desc';
}

export interface Column {
  header: string;
  accessor: string;
  sortable?: boolean;
  render?: (value: any) => React.ReactNode;
}