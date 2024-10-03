import React, { useState } from 'react';

function AddResource({ selectedCategory, onSubmit }) {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [etiquetas, setEtiquetas] = useState('');
  const [miniatura, setMiniatura] = useState('');
  const [imagenGrande, setImagenGrande] = useState('');
  const [enlace, setEnlace] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newResource = {
      category: selectedCategory, // Añade la categoría seleccionada automáticamente
      titulo,
      descripcion,
      etiquetas: etiquetas.split(',').map((tag) => tag.trim()), // Convierte la lista de etiquetas a un array
      miniatura,
      imagenGrande,
      enlace,
    };
    onSubmit(newResource); // Enviar el recurso al padre (App.js)
  };

  return (
    <form onSubmit={handleSubmit} className="add-resource-form">
      {/* Selector de categoría ya seleccionado */}
      <input
        type="text"
        value={selectedCategory}
        disabled
        className="input-field"
        placeholder="Categoría"
      />

      <input
        type="text"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        placeholder="Título del recurso"
        className="input-field"
      />

      <input
        type="text"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        placeholder="Descripción"
        className="input-field"
      />

      <input
        type="text"
        value={etiquetas}
        onChange={(e) => setEtiquetas(e.target.value)}
        placeholder="Etiquetas (separadas por comas)"
        className="input-field"
      />

      <input
        type="text"
        value={miniatura}
        onChange={(e) => setMiniatura(e.target.value)}
        placeholder="URL de la miniatura"
        className="input-field"
      />

      <input
        type="text"
        value={imagenGrande}
        onChange={(e) => setImagenGrande(e.target.value)}
        placeholder="URL de la imagen grande"
        className="input-field"
      />

      <input
        type="text"
        value={enlace}
        onChange={(e) => setEnlace(e.target.value)}
        placeholder="Enlace al recurso"
        className="input-field"
      />

      <button type="submit" className="submit-button">Añadir Recurso</button>
    </form>
  );
}

export default AddResource;
