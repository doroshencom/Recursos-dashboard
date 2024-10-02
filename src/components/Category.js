import React, { useState } from 'react';
import ResourceCard from './ResourceCard';

function Category({ title, resources, activeResource, onResourceClick }) {
  return (
    <div className="category">
      <h2 className='category-title'>{title}</h2>
      <div className="resource-list">
        {resources.map((resource, index) => (
          <ResourceCard
            key={index}
            resource={resource}
            isActive={activeResource && activeResource.category === title && activeResource.index === index}
            onClick={() => onResourceClick(title, index)}
          />
        ))}
      </div>
    </div>
  );
}

export default Category;
