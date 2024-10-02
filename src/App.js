import React, { useState, useEffect } from 'react';
import Category from './components/Category';
import FilterBar from './components/FilterBar';
import AddResource from './components/AddResource'; // Importamos el componente AddResource
import './assets/styles.css';  // Importar estilos
import localResources from './recursos.json'; // Asegúrate de que esta ruta sea correcta
import { collection, getDocs } from 'firebase/firestore'; // Importamos funciones de Firestore
import { db } from './firebaseConfig'; // Configuración de Firebase

function App() {
  const [recursos, setRecursos] = useState({});
  const [filteredRecursos, setFilteredRecursos] = useState({});
  const [activeFilters, setActiveFilters] = useState([]);
  const [allTags, setAllTags] = useState([]); // Nueva variable para las etiquetas
  const [activeResource, setActiveResource] = useState(null); // Estado para manejar el recurso activo
  const [showModal, setShowModal] = useState(false); // Estado para manejar el modal

  // Función para extraer todas las etiquetas únicas
  const extractUniqueTags = (data) => {
    const tags = new Set(); // Utilizamos Set para asegurarnos de que no se repitan
    Object.keys(data).forEach(category => {
      data[category].forEach(resource => {
        resource.etiquetas.forEach(tag => tags.add(tag));
      });
    });
    return Array.from(tags);
  };

  // Cargar recursos desde Firebase y el archivo JSON local
  useEffect(() => {
    const fetchFirebaseData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "recursos"));
        const firebaseResources = {};
        querySnapshot.forEach((doc) => {
          const resource = doc.data();
          const category = resource.category || 'default'; // Asegúrate de definir la categoría
          if (!firebaseResources[category]) {
            firebaseResources[category] = [];
          }
          firebaseResources[category].push(resource);
        });

        // Combinamos los recursos locales con los de Firebase
        const combinedResources = { ...localResources, ...firebaseResources };
        setRecursos(combinedResources);
        setFilteredRecursos(combinedResources);
        const uniqueTags = extractUniqueTags(combinedResources);
        setAllTags(uniqueTags); // Guardar etiquetas en el estado
      } catch (error) {
        console.error('Error al cargar recursos desde Firebase: ', error);
      }
    };

    fetchFirebaseData();
  }, []);

  const toggleFilter = (filter) => {
    const isActive = activeFilters.includes(filter);
    setActiveFilters(isActive ? activeFilters.filter(f => f !== filter) : [...activeFilters, filter]);
  };

  const clearFilters = () => {
    setActiveFilters([]);
  };

  useEffect(() => {
    if (activeFilters.length > 0) {
      const filtered = {};
      for (let category in recursos) {
        filtered[category] = recursos[category].filter(resource =>
          activeFilters.some(filter => resource.etiquetas.includes(filter))
        );
      }
      setFilteredRecursos(filtered);
    } else {
      setFilteredRecursos(recursos);
    }
  }, [activeFilters, recursos]);

  const handleResourceClick = (category, index) => {
    // Si se hace clic en el mismo recurso, lo cerramos
    if (activeResource && activeResource.category === category && activeResource.index === index) {
      setActiveResource(null);
    } else {
      // Si es un recurso diferente, lo establecemos como activo
      setActiveResource({ category, index });
    }
  };

  return (
    <div className="App">
      <header className="hero">
        <div className="hero-content">
          <h1 className='hero-title'>
            {/* Usamos una imagen como título */}
            <img 
              src="https://doroshen.com/favicon.ico" 
              alt="Logo" 
              style={{ width: '50px', height: '50px' }} 
            />
          </h1>
          <p className='hero-content'>Descubre los mejores recursos en categorías como CSS, JavaScript, Figma, y más.</p>
        </div>
      </header>
      <FilterBar filters={allTags} activeFilters={activeFilters} toggleFilter={toggleFilter} clearFilters={clearFilters} />
      <div className="container grid-3-columns">
        {Object.keys(filteredRecursos).map((category) => (
          <Category
            key={category}
            title={category}
            resources={filteredRecursos[category]}
            activeResource={activeResource}
            onResourceClick={handleResourceClick} // Pasamos la función que gestiona el recurso activo
          />
        ))}
      </div>

      {/* Botón para abrir el modal */}
      <button className="open-modal-button" onClick={() => setShowModal(true)}>
        Añadir Recurso
      </button>

      {/* Modal para el formulario */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-modal" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <AddResource /> {/* Formulario dentro del modal */}
          </div>
        </div>
      )}

      {/* Footer añadido */}
      <footer>
        <p>
            Realizado por <a href="https://shenko.es" target="_blank" rel="noopener noreferrer">shenko.es</a> /  
            <a href="https://doroshen.com" target="_blank" rel="noopener noreferrer"> doroshen.com</a> en octubre de 2024.
        </p>
      </footer>
    </div>
  );
}

export default App;
