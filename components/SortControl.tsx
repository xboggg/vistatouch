
import React from 'react';

interface SortControlProps {
  sortOrder: string;
  onSortChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SortControl: React.FC<SortControlProps> = ({ sortOrder, onSortChange }) => {
  return (
    <div className="flex items-center">
      <label htmlFor="sort-order" className="text-sm font-medium text-gray-700 mr-2 whitespace-nowrap">Sort by:</label>
      <select
        id="sort-order"
        name="sort-order"
        value={sortOrder}
        onChange={onSortChange}
        className="p-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-accent bg-white text-text-dark"
        aria-label="Sort properties"
      >
        <option value="default">Default</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
      </select>
    </div>
  );
};

export default SortControl;
