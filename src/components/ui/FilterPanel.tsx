import React from 'react';

interface FilterOption {
  label: string;
  minKey?: string;
  maxKey?: string;
  minPlaceholder?: string;
  maxPlaceholder?: string;
  type?: 'range' | 'select';
  key?: string;
  options?: string[];
}

interface FilterPanelProps {
  filters: Record<string, string>;
  setFilters: (filters: Record<string, string>) => void;
  options: FilterOption[];
  additionalFilters?: FilterOption[];
}

export function FilterPanel({
  filters,
  setFilters,
  options,
  additionalFilters = [],
}: FilterPanelProps) {
  const handleFilterChange = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  return (
    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {options.map((option) => (
          <div key={option.label} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {option.label}
            </label>
            <div className="flex space-x-2">
              <input
                type="number"
                value={filters[option.minKey!]}
                onChange={(e) => handleFilterChange(option.minKey!, e.target.value)}
                placeholder={option.minPlaceholder}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <input
                type="number"
                value={filters[option.maxKey!]}
                onChange={(e) => handleFilterChange(option.maxKey!, e.target.value)}
                placeholder={option.maxPlaceholder}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        ))}
        
        {additionalFilters.map((filter) => (
          <div key={filter.label} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {filter.label}
            </label>
            <select
              value={filters[filter.key!]}
              onChange={(e) => handleFilterChange(filter.key!, e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">All</option>
              {filter.options?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}