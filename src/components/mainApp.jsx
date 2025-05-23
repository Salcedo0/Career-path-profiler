import React, { useEffect, useState, useRef } from 'react';
import Previsual from './previsual';
import Pagination from './pagination';
import DescPrev from './desc_prev';
import Nav_bar from './nav_bar';


function MainApp() {
  const [previsualData, setPrevisualData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const timerRef = useRef(null); // Referencia para el temporizador
  const previousJobRef = useRef(null); // Referencia para la previsual-card anterior

  const fetchLastKeyword = async () => {
    const userId = localStorage.getItem('userId'); // Obtener el userId del localStorage

    if (!userId) {
      console.error('No se encontró el userId en localStorage');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/user_keywords', {
        method: 'POST', // Cambiar a POST para enviar datos
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }), // Enviar el userId en el cuerpo de la solicitud
      });

      if (!response.ok) {
        throw new Error('Error al obtener la última palabra clave');
      }

      const data = await response.json();
      const lastKeyword = data.key_words?.slice(-1)[0] || ""; // Obtener la última palabra clave
      setSearchTerm(lastKeyword); // Actualizar el término de búsqueda
    } catch (e) {
      console.error('Error al obtener la última palabra clave:', e);
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

    // Función para manejar la búsqueda desde Nav_bar
  const handleSearch = (term) => {
    setSearchTerm(term); // Actualiza el estado del término de búsqueda
    fetchData(term); // Llama a fetchData con el término de búsqueda
  };

  const handleJobClick = (job) => {
    // Si hay un temporizador activo, verifica si el tiempo supera los 30 segundos
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      const timeSpent = (Date.now() - timerRef.current.startTime) / 1000; // Tiempo en segundos

      if (timeSpent > 30 && previousJobRef.current) {
        saveVisitedVacant(previousJobRef.current); // Guardar la previsual-card anterior
      }
    }

    // Iniciar un nuevo temporizador para la nueva previsual-card
    timerRef.current = { startTime: Date.now() };
    previousJobRef.current = job; // Actualizar la referencia de la previsual-card anterior
    setSelectedJob(job); // Actualizar la vacante seleccionada
  };

const saveVisitedVacant = async (job) => {
  const userId = localStorage.getItem('userId'); // Obtener el userId del localStorage
  if (!userId) {
    console.error('No se encontró el userId en localStorage');
    return;
  }

  try {
    const response = await fetch('http://localhost:5000/api/visited_vacant', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        vacant: job.title, // Enviar el título de la vacante
        key_words: job.key_words.replace('Palabras clave: ', '').split(',').map(keyword => keyword.trim()), // Filtrar y limpiar las palabras clave
      }),
    });

    if (!response.ok) {
      throw new Error('Error al guardar la vacante visitada');
    }

    const data = await response.json();
    console.log('Vacante guardada exitosamente:', data.message);
  } catch (error) {
    console.error('Error al guardar la vacante visitada:', error);
  }
};

  useEffect(() => {
    fetchLastKeyword();
  }, []);

  useEffect(() => {
    fetchData(searchTerm);
  }, [currentPage, searchTerm]);

  return (
    <>
    <Nav_bar onSearch={handleSearch} /> {/* Pasa la función handleSearch como prop */}
    <div className="main-container">
      <div className="previsual-container">
        {previsualData.map((item, index) => (
          <Previsual
            key={index}
            {...item}
            onClick={() => handleJobClick(item)} // Manejar clic en la previsual-card
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
    </>
  );
}

export default MainApp;