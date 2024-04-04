'use client';
import React from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select';
import { usePathname, useRouter } from 'next/navigation';

// Define types for props
type FilterOption = {
  label: string;
  options: string[];
};

type ApiFiltersProps = {
  filters: FilterOption[];
};

let selectedFilters: Record<string, string> = {};


export const ApiFilters: React.FC<ApiFiltersProps> = ({ filters }) => {
  const router = useRouter();
  const path = usePathname()
  const handleFilterChange = (filterLabel: string, selectedValue: string) => {
    selectedFilters = {
      ...selectedFilters,
      [filterLabel]: selectedValue
    };

    // use the url search params to filter the data
    const params = new URLSearchParams(
      selectedFilters
    );  

    
    // update the url with the new search params
    // router.replace(params.toString())
    router.push("?"+params.toString()  );
    
  };

  return (
    <section>
      <label htmlFor="search" className='text-lg '>Filtrer par:</label>
      <div className='flex flex-row flex-wrap gap-2 items-starts-center'>

        {filters.map(filter => (
          
    <Select  onValueChange={(e)=>handleFilterChange(filter.label, e)} >
      <SelectTrigger className="w-[180px] bg-white">
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
