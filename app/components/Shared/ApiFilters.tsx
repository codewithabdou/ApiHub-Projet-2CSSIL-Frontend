import React from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select';

// Define types for props
type FilterOption = {
  label: string;
  options: string[];
};

type ApiFiltersProps = {
  filters: FilterOption[];
  onFilterChange: (filterLabel: string, selectedValue: string) => void;
};


export const ApiFilters: React.FC<ApiFiltersProps> = ({ filters, onFilterChange }) => {
  const handleFilterChange = (filterLabel: string, selectedValue: string) => {
    onFilterChange(filterLabel, selectedValue);
  };

  return (
    <section>
      <label htmlFor="search" className='text-lg'>Filtrer par:</label>
      <div className='flex flex-row flex-wrap gap-2 items-starts-center'>

        {filters.map(filter => (
    <Select  onValueChange={(e)=>handleFilterChange(filter.label, e)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={filter.label} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{filter.label}</SelectLabel>
            {filter.options.map(option => (
                <SelectItem key={option} value={option}>
                {option}
                </SelectItem>
            ))}
            </SelectGroup>
        </SelectContent>
        </Select>

        ))}
      </div>
    </section>
  );
};
