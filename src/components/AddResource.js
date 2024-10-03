import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

function AddResource({ selectedCategory }) {
  const [resource, setResource] = useState({
    category: selectedCategory, // Establecer la categoría seleccionada
    titulo: '',
    descripcion: '',
    etiquetas: '',
    miniatura: '',
    imagenGrande: '',
    enlace: ''
  });

  const handleChange = (e) => {
    setResource({ ...resource, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'recursos'), {
        ...resource,
        etiquetas: resource.etiquetas.split(',').map((tag) => tag.trim())
      });
      alert('Recurso añadido correctamente');
    } catch (error) {
      console.error('Error al agregar el recurso: ', error);
    }
  };

  return (
    <form className="add-resource-form" onSubmit={handleSubmit}>
      {/* Selector de categoría */}
      <label>Categoría</label>
      <input
        type="text"
        name="category"
        value={resource.category}
        onChange={handleChange}
        disabled
      />

      <label>Título</label>
      <input type="text" name="titulo" value={resource.titulo} onChange={handleChange} required />

      <label>Descripción</label>
      <textarea name="descripcion" value={resource.descripcion} onChange={handleChange} required />

      <label>Etiquetas (separadas por comas)</label>
      <input type="text" name="etiquetas" value={resource.etiquetas} onChange={handleChange} required />

      <label>URL de la miniatura</label>
      <input type="url" name="miniatura" value={resource.miniatura} onChange={handleChange} />

      <label>URL de la imagen grande</label>
      <input type="url" name="imagenGrande" value={resource.imagenGrande} onChange={handleChange} />

      <label>Enlace</label>
      <input type="url" name="enlace" value={resource.enlace} onChange={handleChange} required />

      <button type="submit">Añadir Recurso</button>
    </form>
  );
}

export default AddResource;
