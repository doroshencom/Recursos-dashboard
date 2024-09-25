import React, { useState } from 'react';

const ResourceCard = ({ resource }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleInfo = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`resource-card ${isOpen ? 'open' : ''}`} onClick={toggleInfo}>
      <img
        src={resource.thumbnail || 'https://img.freepik.com/vector-gratis/ilustracion-icono-galeria_53876-27002.jpg?semt=ais_hybrid'}
        alt="Miniatura del recurso"
      />
      <h3>{resource.nombre}</h3>
      <span className="pildora">{resource.categoria}</span>
      {isOpen && (
        <div className="extra-info">
          <p>{resource.descripcionLarga}</p>
          <a href={resource.enlace} target="_blank" rel="noopener noreferrer">
            Ir al Recurso
          </a>
        </div>
      )}
    </div>
  );
};

export default ResourceCard;
