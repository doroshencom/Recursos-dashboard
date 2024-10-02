import React, { useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

function AddResource() {
  const [resourceData, setResourceData] = useState({
    category: '',
    titulo: '',
    descripcion: '',
    etiquetas: '',
    miniatura: '',
    imagenGrande: '',
    enlace: '',
  });

  const handleChange = (e) => {
    setResourceData({
      ...resourceData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'recursos'), {
        ...resourceData,
        etiquetas: resourceData.etiquetas.split(',').map((tag) => tag.trim()), // Convertimos etiquetas en array
      });
      setResourceData({
        category: '',
        titulo: '',
        descripcion: '',
        etiquetas: '',
        miniatura: '',
        imagenGrande: '',
        enlace: '',
      });
      alert('Recurso añadido con éxito.');
    } catch (error) {
      console.error('Error al agregar el documento: ', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-resource-form">
      <h3>Añadir Nuevo Recurso</h3>
      <div className="add-resource-grid">
        {/* Selector de categoría */}
        <div>
          <label htmlFor="category">Categoría</label>
          <select
            id="category"
            name="category"
            value={resourceData.category}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona una categoría</option>
            <option value="Formación">Formación</option>
            <option value="Recursos">Recursos</option>
            <option value="Herramientas">Herramientas</option>
          </select>
        </div>

        {/* Título */}
        <div>
          <label htmlFor="titulo">Título</label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            value={resourceData.titulo}
            onChange={handleChange}
            required
          />
        </div>

        {/* Descripción */}
        <div>
          <label htmlFor="descripcion">Descripción</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={resourceData.descripcion}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        {/* Etiquetas */}
        <div>
          <label htmlFor="etiquetas">Etiquetas (separadas por comas)</label>
          <input
            type="text"
            id="etiquetas"
            name="etiquetas"
            value={resourceData.etiquetas}
            onChange={handleChange}
            required
          />
        </div>

        {/* Miniatura */}
        <div>
          <label htmlFor="miniatura">URL de la Miniatura</label>
          <input
            type="text"
            id="miniatura"
            name="miniatura"
            value={resourceData.miniatura}
            onChange={handleChange}
          />
        </div>

        {/* Imagen Grande */}
        <div>
          <label htmlFor="imagenGrande">URL de la Imagen Grande</label>
          <input
            type="text"
            id="imagenGrande"
            name="imagenGrande"
            value={resourceData.imagenGrande}
            onChange={handleChange}
          />
        </div>

        {/* Enlace */}
        <div>
          <label htmlFor="enlace">Enlace al recurso</label>
          <input
            type="text"
            id="enlace"
            name="enlace"
            value={resourceData.enlace}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* Botón para enviar */}
      <button type="submit">Añadir Recurso</button>
    </form>
  );
}

export default AddResource;
