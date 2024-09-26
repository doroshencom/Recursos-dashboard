import React, { useState, useEffect } from 'react';
import Category from './components/Category';
import FilterBar from './components/FilterBar';
import './assets/styles.css';  // Importar estilos

function App() {
  const [recursos, setRecursos] = useState({});
  const [filteredRecursos, setFilteredRecursos] = useState({});
  const [activeFilters, setActiveFilters] = useState([]);
  const [allTags, setAllTags] = useState([]); // Nueva variable para las etiquetas

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

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/recursos.json`)  // Ruta correcta para acceder al archivo JSON
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al cargar los datos');
        }
        return response.json();
      })
      .then((data) => {
        setRecursos(data);
        setFilteredRecursos(data);
        const uniqueTags = extractUniqueTags(data); // Extraer etiquetas únicas
        setAllTags(uniqueTags); // Guardar etiquetas en el estado
      })
      .catch((error) => {
        console.error('Error al cargar recursos: ', error);
      });
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

  return (
    <div className="App">
      <header className="hero">
        <div className="hero-content">
          <h1 className='hero-title'>Explora Recursos</h1>
          <p className='hero-content'>Descubre los mejores recursos en categorías como CSS, JavaScript, Figma, y más.</p>
        </div>
      </header>
      <FilterBar filters={allTags} activeFilters={activeFilters} toggleFilter={toggleFilter} clearFilters={clearFilters} />
      <div className="container grid-3-columns">
        {Object.keys(filteredRecursos).map((category) => (
          <Category key={category} title={category} resources={filteredRecursos[category]} />
        ))}
      </div>
    </div>
  );
}

export default App;
