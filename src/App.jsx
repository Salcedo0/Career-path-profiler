//App.jsx
import React, { useEffect, useState } from 'react';
import './App.css';
import Nav_bar from './components/nav_bar';
import Footer from './components/Footer';
import Previsual from './components/previsual';
import Pagination from './components/pagination';
import DescPrev from './components/desc_prev';

function App() {
  const [previsualData, setPrevisualData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [itemsPerPage] = useState(10); // Elementos por página
  const [totalItems, setTotalItems] = useState(0); // Total de elementos
  const [selectedJob, setSelectedJob] = useState(null); // Estado para el trabajo seleccionado
  const [searchTerm, setSearchTerm] = useState("Ingeniero"); // Estado para el término de búsqueda

  const fetchData = async (term = "") => {
    try {
      const response = await fetch('http://localhost:5000/search', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ term, limit: 10 }) // Usa el término de búsqueda
      }); 
      const data = await response.json();

      setTotalItems(data.length);
      const startIndex = (currentPage - 1) * itemsPerPage;

      const previsualItems = data.map(vacante => ({
        title: vacante.nombre_vacante || 'Sin título',
        company: vacante.empresa || 'Sin empresa',
        location: vacante.ubicacion || 'Sin ubicación',
        description: vacante.informacionAmpliada?.descripcion || 'Sin descripción',
        responsibilities: vacante.informacionAmpliada?.palabrasClave || [],
        contract: vacante.tipo_contrato.tipo,
        salary: vacante.salario,
        experience: vacante.requisitos.experiencia
      }));

      console.log(data)
      setPrevisualData(previsualItems);
    } catch (e) {
      console.log(e);
    }
  };

  // Función para manejar la búsqueda desde Nav_bar
  const handleSearch = (term) => {
    setSearchTerm(term); // Actualiza el estado del término de búsqueda
    fetchData(term); // Llama a fetchData con el término de búsqueda
  };

  useEffect(() => {
    fetchData(searchTerm); // Llama a fetchData cuando cambia la página o el término de búsqueda
  }, [currentPage]);

  return (
    <>
      <Nav_bar onSearch={handleSearch} /> {/* Pasa la función handleSearch como prop */}
      <div className="main-container">
        <div className="previsual-container">
          {previsualData.map((item, index) => (
            <Previsual
              key={index}
              {...item} // Spread del item
              onClick={() => setSelectedJob(item)}
            />
          ))}
          <Pagination
            currentPage={currentPage}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
        <div className="desc-prev-container-app">
          {selectedJob ? (
            <DescPrev
              title={selectedJob.title}
              company={selectedJob.company}
              location={selectedJob.location}
              description={selectedJob.description}
              responsibilities={selectedJob.responsibilities}
              requirements={selectedJob.requirements}
            />
          ) : (
            <p>Selecciona un trabajo para ver los detalles.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
