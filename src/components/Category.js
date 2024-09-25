import React from 'react';
import ResourceCard from './ResourceCard';

function Category({ title, resources }) {
  const validResources = Array.isArray(resources) ? resources : [];

  return (
    <div className="category">
      <h2 className="category-title">{title}</h2>
      <div className="resources-list">
        {validResources.length > 0 ? (
          validResources.map((resource, index) => (
            <ResourceCard key={index} resource={resource} />
          ))
        ) : (
          <p>No hay recursos disponibles</p>
        )}
      </div>
    </div>
  );
}

export default Category;
