import React, { useState, useEffect } from 'react';
import Category from './components/Category';
import FilterBar from './components/FilterBar';
import './assets/App.css';  
import './assets/styles.css';  

function App() {
  const [recursos, setRecursos] = useState({});
  const [filteredRecursos, setFilteredRecursos] = useState({});
  const [activeFilters, setActiveFilters] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/recursos.json`)
      .then((response) => response.json())
      .then((data) => {
        setRecursos(data);
        setFilteredRecursos(data);
      })
      .catch((error) => {
        console.error('Error al cargar los recursos: ', error);
      });
  }, []);

  const toggleFilter = (filter) => {
    const isActive = activeFilters.includes(filter);
    setActiveFilters(isActive ? activeFilters.filter(f => f !== filter) : [...activeFilters, filter]);
  };

  const clearFilters = () => {
    setActiveFilters([]);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.setAttribute('data-theme', darkMode ? 'light' : 'dark');
  };

  useEffect(() => {
    if (Object.keys(recursos).length > 0 && activeFilters.length > 0) {
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
          <h1>Recursos</h1>
          <p>Descubre los mejores recursos en categorías como CSS, JavaScript, Figma, y más.</p>
        </div>
        <div className="switch">
          <label className="switch-label" htmlFor="theme-switch">
            <input type="checkbox" id="theme-switch" onChange={toggleDarkMode} />
            <span className="slider round"></span>
          </label>
        </div>
      </header>

      <FilterBar filters={activeFilters} toggleFilter={toggleFilter} clearFilters={clearFilters} />

      <div className="container grid-3-columns">
        {Object.keys(filteredRecursos).map((category) => (
          <Category key={category} title={category} resources={filteredRecursos[category]} />
        ))}
      </div>
    </div>
  );
}

export default App;
