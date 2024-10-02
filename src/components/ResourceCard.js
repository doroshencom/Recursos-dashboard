import React from 'react';

function ResourceCard({ resource, isActive, onClick }) {
  return (
    <div className={`resource-card ${isActive ? 'expanded' : ''}`} onClick={onClick}>
      <div className="resource-img">
        <img
          src={isActive ? resource.imagenGrande : resource.miniatura || "https://img.freepik.com/vector-gratis/ilustracion-icono-galeria_53876-27002.jpg"}
          alt="Miniatura"
          className={`resource-thumbnail ${isActive ? 'expanded-thumbnail' : ''}`}
        />
      </div>
      <div className="resource-header">
        <div>
          <h3>{resource.titulo}</h3>
          {!isActive && (
            <div className="resource-tags">
              {resource.etiquetas.map((tag, index) => (
                <span key={index} className="tag">{tag}</span>
              ))}
            </div>
          )}
        </div>
      </div>

      {isActive && (
        <div className="resource-details">
          <p>{resource.descripcion || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla at ipsum ut sem sollicitudin."}</p>
          <div className="resource-tags">
            {resource.etiquetas.map((tag, index) => (
              <span key={index} className="tag">{tag}</span>
            ))}
          </div>
          <a href={resource.enlace} className="resource-link">Leer</a>
        </div>
      )}
    </div>
  );
}

export default ResourceCard;
