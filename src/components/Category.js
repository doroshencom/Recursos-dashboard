import React from 'react';
import ResourceCard from './ResourceCard';

const Category = ({ title, resources }) => {
  return (
    <div className="category-box">
      <h2>{title}</h2>
      <div className="resource-list">
        {resources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    </div>
  );
};

export default Category;
