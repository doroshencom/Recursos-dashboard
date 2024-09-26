import React from 'react';
import ResourceCard from './ResourceCard';

function Category({ title, resources }) {
  return (
    <div className="category">
      <h2 className='category-title'>{title}</h2>
      <div className="resource-list">
        {resources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    </div>
  );
}

export default Category;
