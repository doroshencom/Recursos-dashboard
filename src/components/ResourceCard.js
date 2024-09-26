import React, { useState } from 'react';

function ResourceCard({ resource }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <div className={`resource-card ${isExpanded ? 'expanded' : ''}`} onClick={toggleExpand}>
      <div className="resource-header">
        <img
          src={isExpanded ? resource.imagenGrande : resource.miniatura || "https://img.freepik.com/vector-gratis/ilustracion-icono-galeria_53876-27002.jpg"}
          alt="Miniatura"
          className={`resource-thumbnail ${isExpanded ? 'expanded-thumbnail' : ''}`}
        />
        <div>
          <h3>{resource.titulo}</h3>
          {!isExpanded && (
            <div className="resource-tags">
              {resource.etiquetas.map((tag, index) => (
                <span key={index} className="tag">{tag}</span>
              ))}
            </div>
          )}
        </div>
      </div>
      {isExpanded && (
        <div className="resource-details">
          <p>{resource.descripcion || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla at ipsum ut sem sollicitudin."}</p>
          <a href={resource.enlace} className="resource-link">Leer</a>
        </div>
      )}
    </div>
  );
}

export default ResourceCard;
