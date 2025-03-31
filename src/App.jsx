//App.jsx
import React, { useEffect, useState } from 'react';
import './App.css';
import Nav_bar from './components/nav_bar';
import Footer from './components/Footer';
import Previsual from './components/previsual';
import Pagination from './components/pagination';
import * as XLSX from 'xlsx';
import DescPrev from './components/desc_prev';

function App() {
  const [previsualData, setPrevisualData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [itemsPerPage] = useState(10); // Elementos por página
  const [totalItems, setTotalItems] = useState(0); // Total de elementos
  const [selectedJob, setSelectedJob] = useState(null); // Estado para el trabajo seleccionado

  const fetchData = async () => {
    const response = await fetch('/backend/MagnetoScrapping2.xlsx');
    const arrayBuffer = await response.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet);

    setTotalItems(data.length); // Total de elementos en el archivo
    const startIndex = (currentPage - 1) * itemsPerPage;
    const previsualItems = data.slice(startIndex, startIndex + itemsPerPage).map((row) => ({
      title: row.title || 'Sin título',
      company: row.empresa || 'Sin empresa',
      location: row.ubicacion || 'Sin ubicación',
      description: row.description || 'Sin descripción',
      responsibilities: row.responsabilidades ? row.responsabilidades.split(';') : [],
      requirements: row.requisitos ? row.requisitos.split(';') : [],
    }));

    setPrevisualData(previsualItems);
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]); // Vuelve a cargar los datos cuando cambia la página

  return (
    <>
      <Nav_bar />
      <div className="main-container">
        {/* Contenedor de las tarjetas de previsualización */}
        <div className="previsual-container">
          {previsualData.map((item, index) => (
            <Previsual
              key={index}
              title={item.title}
              company={item.company}
              location={item.location}
              onClick={() => setSelectedJob(item)} // Actualiza el trabajo seleccionado
            />
          ))}
          <Pagination
            currentPage={currentPage}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={(page) => setCurrentPage(page)} // Cambia la página actual
          />
        </div>
  
        {/* Contenedor del detalle del trabajo */}
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
