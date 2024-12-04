import React, { useState, useMemo } from 'react';
import { Filter, ArrowUpDown } from 'lucide-react';
import { initialFunds } from '../market/fundData';
import { FilterPanel } from '../ui/FilterPanel';
import { DataTable } from '../ui/DataTable';

type SortField = 'nav' | 'change' | 'aum' | 'rating';
type SortOrder = 'asc' | 'desc';

export function MutualFundScreener() {
  const [filters, setFilters] = useState({
    navMin: '',
    navMax: '',
    changeMin: '',
    changeMax: '',
    aumMin: '',
    aumMax: '',
    risk: '',
    rating: '',
  });
  const [sortConfig, setSortConfig] = useState<{ field: SortField; order: SortOrder }>({
    field: 'aum',
    order: 'desc',
  });
  const [showFilters, setShowFilters] = useState(false);

  const filterOptions = [
    {
      label: 'NAV Range (₹)',
      minKey: 'navMin',
      maxKey: 'navMax',
      minPlaceholder: 'Min NAV',
      maxPlaceholder: 'Max NAV',
    },
    {
      label: 'Change (%)',
      minKey: 'changeMin',
      maxKey: 'changeMax',
      minPlaceholder: 'Min Change',
      maxPlaceholder: 'Max Change',
    },
    {
      label: 'AUM (Cr)',
      minKey: 'aumMin',
      maxKey: 'aumMax',
      minPlaceholder: 'Min AUM',
      maxPlaceholder: 'Max AUM',
    },
  ];

  const parseAUM = (aum: string) => {
    return parseFloat(aum.replace(/[^0-9.]/g, ''));
  };

  const filteredFunds = useMemo(() => {
    return initialFunds.filter(fund => {
      if (filters.navMin && fund.nav < parseFloat(filters.navMin)) return false;
      if (filters.navMax && fund.nav > parseFloat(filters.navMax)) return false;
      if (filters.changeMin && fund.change < parseFloat(filters.changeMin)) return false;
      if (filters.changeMax && fund.change > parseFloat(filters.changeMax)) return false;
      
      const aumValue = parseAUM(fund.aum);
      if (filters.aumMin && aumValue < parseFloat(filters.aumMin)) return false;
      if (filters.aumMax && aumValue > parseFloat(filters.aumMax)) return false;
      
      if (filters.risk && fund.risk !== filters.risk) return false;
      if (filters.rating && fund.rating < parseInt(filters.rating)) return false;
      
      return true;
    });
  }, [filters]);

  const sortedFunds = useMemo(() => {
    return [...filteredFunds].sort((a, b) => {
      let comparison = 0;
      switch (sortConfig.field) {
        case 'nav':
          comparison = a.nav - b.nav;
          break;
        case 'change':
          comparison = a.change - b.change;
          break;
        case 'aum':
          comparison = parseAUM(a.aum) - parseAUM(b.aum);
          break;
        case 'rating':
          comparison = a.rating - b.rating;
          break;
      }
      return sortConfig.order === 'asc' ? comparison : -comparison;
    });
  }, [filteredFunds, sortConfig]);

  const handleSort = (field: SortField) => {
    setSortConfig(current => ({
      field,
      order: current.field === field && current.order === 'asc' ? 'desc' : 'asc',
    }));
  };

  const columns = [
    { header: 'Fund Name', accessor: 'name' },
    { header: 'Category', accessor: 'category' },
    {
      header: 'NAV',
      accessor: 'nav',
      sortable: true,
      render: (value: number) => `₹${value.toFixed(2)}`,
    },
    {
      header: 'Change',
      accessor: 'change',
      sortable: true,
      render: (value: number) => `${value}%`,
    },
    { header: 'AUM', accessor: 'aum', sortable: true },
    { header: 'Risk', accessor: 'risk' },
    {
      header: 'Rating',
      accessor: 'rating',
      sortable: true,
      render: (value: number) => '★'.repeat(value) + '☆'.repeat(5 - value),
    },
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
          additionalFilters={[
            {
              label: 'Risk Level',
              type: 'select',
              key: 'risk',
              options: ['High', 'Moderate', 'Low'],
            },
            {
              label: 'Minimum Rating',
              type: 'select',
              key: 'rating',
              options: ['5', '4', '3', '2', '1'],
            },
          ]}
        />
      )}

      <DataTable
        data={sortedFunds}
        columns={columns}
        sortConfig={sortConfig}
        onSort={handleSort}
      />
    </div>
  );
}