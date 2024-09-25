import React, { useState } from 'react';

function ResourceCard({ resource }) {
  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={`resource-card ${expanded ? 'expanded' : ''}`} onClick={handleExpand}>
      {!expanded ? (
        <div className="collapsed-content">
          <img src={resource.imageThumbnail} alt={resource.title} className="thumbnail" />
          <div className="resource-info">
            <h3>{resource.title}</h3>
            <div className="tags">
              {resource.etiquetas.map((etiqueta, index) => (
                <span key={index} className="tag">
                  <i className="fas fa-tag"></i> {etiqueta}
                </span>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="expanded-content">
          <img src={resource.imageFull} alt={resource.title} className="full-image" />
          <h3>{resource.title}</h3>
          <p>{resource.description}</p>
          <a href={resource.link} className="resource-link">Ir al Recurso</a>
        </div>
      )}
    </div>
  );
}

export default ResourceCard;
