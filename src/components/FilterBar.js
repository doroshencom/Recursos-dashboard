import React from 'react';

function FilterBar({ filters, toggleFilter, clearFilters }) {
  const allFilters = ['CSS', 'JavaScript', 'Figma', 'Diseño'];

  return (
    <div className="filter-bar">
      <input type="text" placeholder="Css, Javascript, ..." className="filter-input" />
      <div className="filter-buttons">
        {allFilters.map((filter) => (
          <button
            key={filter}
            className={`filter-button ${filters.includes(filter) ? 'active' : ''}`}
            onClick={() => toggleFilter(filter)}
          >
            {filter}
          </button>
        ))}
        <button className="filter-clear" onClick={clearFilters}>Clear</button>
      </div>
    </div>
  );
}

export default FilterBar;
