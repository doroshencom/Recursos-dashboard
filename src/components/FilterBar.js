import React from 'react';

const FilterBar = ({ filters, activeFilters, toggleFilter, clearFilters }) => {
  return (
    <div className="filter-bar">
      {filters.map((filter) => (
        <button
          key={filter}
          className={`filter-button ${activeFilters.includes(filter) ? 'active' : ''}`}
          onClick={() => toggleFilter(filter)}
        >
          {filter}
        </button>
      ))}
      <button className="filter-clear-button" onClick={clearFilters}>Clear</button>
    </div>
  );
};

export default FilterBar;
