import ResourceCard from './ResourceCard';

function Category({ title, resources, activeResource, onResourceClick }) {
  return (
    <div className="category">
      <h2 className="category-title">{title}</h2>
      <div className="resource-list">
        {resources.map((resource, index) => (
          <ResourceCard
            key={resource.id || `${title}-${index}`}  // Usar `id` único; si no existe, generar uno basado en el índice y la categoría
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
