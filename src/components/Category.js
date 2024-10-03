import React from 'react';
import ResourceCard from './ResourceCard';

function Category({ title, resources, activeResource, onResourceClick, onAddResourceClick }) {
  return (
    <div className="category">
      <div className="category-header">
        <h2 className="category-title">{title}</h2>
        <button 
          className="add-resource-button" 
          onClick={() => onAddResourceClick(title)} 
          title="Añadir recurso"
        >
          +
        </button>
      </div>
      <div className="resource-list">
        {resources.map((resource, index) => (
          <ResourceCard
            key={resource.id || index}
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
