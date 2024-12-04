import React, { useState, useMemo } from 'react';
import { Filter, ArrowUpDown } from 'lucide-react';
import { initialStocks } from '../market/stockData';
import { FilterPanel } from '../ui/FilterPanel';
import { DataTable } from '../ui/DataTable';

type SortField = 'price' | 'change' | 'volume' | 'marketCap';
type SortOrder = 'asc' | 'desc';

export function StockScreener() {
  const [filters, setFilters] = useState({
    priceMin: '',
    priceMax: '',
    changeMin: '',
    changeMax: '',
    marketCapMin: '',
    marketCapMax: '',
  });
  const [sortConfig, setSortConfig] = useState<{ field: SortField; order: SortOrder }>({
    field: 'marketCap',
    order: 'desc',
  });
  const [showFilters, setShowFilters] = useState(false);

  const filterOptions = [
    {
      label: 'Price Range (₹)',
      minKey: 'priceMin',
      maxKey: 'priceMax',
      minPlaceholder: 'Min Price',
      maxPlaceholder: 'Max Price',
    },
    {
      label: 'Change (%)',
      minKey: 'changeMin',
      maxKey: 'changeMax',
      minPlaceholder: 'Min Change',
      maxPlaceholder: 'Max Change',
    },
    {
      label: 'Market Cap (Cr)',
      minKey: 'marketCapMin',
      maxKey: 'marketCapMax',
      minPlaceholder: 'Min Market Cap',
      maxPlaceholder: 'Max Market Cap',
    },
  ];

  const parseMarketCap = (marketCap: string) => {
    const numStr = marketCap.replace(/[^0-9.]/g, '');
    const multiplier = marketCap.includes('L') ? 100000 : 1;
    return parseFloat(numStr) * multiplier;
  };

  const filteredStocks = useMemo(() => {
    return initialStocks.filter(stock => {
      if (filters.priceMin && stock.price < parseFloat(filters.priceMin)) return false;
      if (filters.priceMax && stock.price > parseFloat(filters.priceMax)) return false;
      if (filters.changeMin && stock.change < parseFloat(filters.changeMin)) return false;
      if (filters.changeMax && stock.change > parseFloat(filters.changeMax)) return false;
      
      const marketCapValue = parseMarketCap(stock.marketCap);
      if (filters.marketCapMin && marketCapValue < parseFloat(filters.marketCapMin)) return false;
      if (filters.marketCapMax && marketCapValue > parseFloat(filters.marketCapMax)) return false;
      
      return true;
    });
  }, [filters]);

  const sortedStocks = useMemo(() => {
    return [...filteredStocks].sort((a, b) => {
      let comparison = 0;
      switch (sortConfig.field) {
        case 'price':
          comparison = a.price - b.price;
          break;
        case 'change':
          comparison = a.change - b.change;
          break;
        case 'marketCap':
          comparison = parseMarketCap(a.marketCap) - parseMarketCap(b.marketCap);
          break;
      }
      return sortConfig.order === 'asc' ? comparison : -comparison;
    });
  }, [filteredStocks, sortConfig]);

  const handleSort = (field: SortField) => {
    setSortConfig(current => ({
      field,
      order: current.field === field && current.order === 'asc' ? 'desc' : 'asc',
    }));
  };

  const columns = [
    { header: 'Symbol', accessor: 'symbol' },
    { header: 'Company', accessor: 'name' },
    {
      header: 'Price',
      accessor: 'price',
      sortable: true,
      render: (value: number) => `₹${value.toLocaleString()}`,
    },
    {
      header: 'Change',
      accessor: 'change',
      sortable: true,
      render: (value: number) => `${value}%`,
    },
    { header: 'Volume', accessor: 'volume' },
    { header: 'Market Cap', accessor: 'marketCap', sortable: true },
  ];

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
        >
          <Filter className="h-4 w-4" />
          <span>Filters</span>
        </button>
        <div className="flex items-center space-x-2">
          <ArrowUpDown className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-600">
            Sort by: {sortConfig.field} ({sortConfig.order})
          </span>
        </div>
      </div>

      {showFilters && (
        <FilterPanel
          filters={filters}
          setFilters={setFilters}
          options={filterOptions}
        />
      )}

      <DataTable
        data={sortedStocks}
        columns={columns}
        sortConfig={sortConfig}
        onSort={handleSort}
      />
    </div>
  );
}