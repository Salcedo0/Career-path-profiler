import React, { useEffect, useState } from 'react';
import Previsual from './previsual';
import Pagination from './pagination';
import DescPrev from './desc_prev';

function MainApp() {
  const [previsualData, setPrevisualData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchLastKeyword = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/user_keywords', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'GET',
      });
      const data = await response.json();
      const lastKeyword = data.key_words?.slice(-1)[0] || "";
      setSearchTerm(lastKeyword);
    } catch (e) {
      console.log("Error al obtener la última palabra clave:", e);
    }
  };

  const fetchData = async (term = "") => {
    try {
      const response = await fetch('http://localhost:5000/search', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ term, limit: 10 }),
      });
      const data = await response.json();

      setTotalItems(data.length);
      const previsualItems = data.map((vacante) => ({
        title: vacante.title || 'Sin título',
        empresa: vacante.empresa || 'Sin empresa',
        city: vacante.city || 'Sin ubicación',
        description: vacante.description || 'Sin descripción',
        experience_education: vacante.experience_education || 'Sin experiencia/educación',
        salary: vacante.salary || 'Sin salario',
        key_words: vacante.key_words || 'Sin palabras clave',
      }));

      setPrevisualData(previsualItems);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchLastKeyword();
  }, []);

  useEffect(() => {
    fetchData(searchTerm);
  }, [currentPage, searchTerm]);

  return (
    <div className="main-container">
      <div className="previsual-container">
        {previsualData.map((item, index) => (
          <Previsual
            key={index}
            {...item}
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
            empresa={selectedJob.empresa}
            city={selectedJob.city}
            description={selectedJob.description}
            experience_education={selectedJob.experience_education}
            salary={selectedJob.salary}
            key_words={selectedJob.key_words}
          />
        ) : (
          <p>Selecciona un trabajo para ver los detalles.</p>
        )}
      </div>
    </div>
  );
}

export default MainApp;