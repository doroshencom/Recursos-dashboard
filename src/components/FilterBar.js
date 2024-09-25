import React from 'react';

const FilterBar = ({ filters, toggleFilter, clearFilters }) => {
  return (
    <div className="filter-container">
      {filters.map((filter, index) => (
        <span
          key={index}
          className={`filter ${filter.isActive ? 'active' : ''}`}
          onClick={() => toggleFilter(filter.name)}
        >
          {filter.name}
        </span>
      ))}
      <button className="clear-filters" onClick={clearFilters}>Limpiar Filtros</button>
    </div>
  );
};

export default FilterBar;
