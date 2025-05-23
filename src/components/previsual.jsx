import React, { useState } from 'react';
import '../styles/previsual.css';
import placeholderIcon from '/public/magneto-logo.png'; // Asegúrate de que esta ruta sea correcta para tu proyecto

const Previsual = ({
  title,
  empresa,
  city,
  salary,
  description,
  experience_education,
  key_words,
  isNew, // Booleano: true para mostrar la etiqueta "New"
  onClick, // Función para manejar el clic en la tarjeta
}) => {
  const [isSaved, setIsSaved] = useState(false); // Estado para el corazón

  const handleHeartClick = async () => {
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
          vacant: title, // Guardar el título de la vacante
          key_words: Array.isArray(key_words) ? key_words : key_words.split(',').map((kw) => kw.trim()), // Asegúrate de que sea un array
        }),
      });

      if (!response.ok) {
        throw new Error('Error al guardar la vacante visitada');
      }

      const data = await response.json();
      console.log('Vacante guardada exitosamente:', data.message);

      setIsSaved(true); // Cambiar el estado del corazón a rojo
    } catch (error) {
      console.error('Error al guardar la vacante visitada:', error);
    }
  };

  return (
    <div className="previsual-card" onClick={onClick}>
      {/* Etiqueta "New" */}
      {isNew && <span className="previsual-new-label">New</span>}

      {/* Ícono de corazón */}
      <div className="previsual-heart-icon" onClick={(e) => {
        e.stopPropagation(); // Evitar que el clic en el corazón dispare el clic en la tarjeta
        handleHeartClick();
      }}>
        <span className={isSaved ? 'saved' : ''}>&#x2764;</span> {/* Corazón relleno */}
      </div>

      {/* Ícono de la empresa */}
      <div className="previsual-icon">
        <img src={placeholderIcon} alt="Company Icon" />
      </div>

      {/* Contenido principal */}
      <div className="previsual-content">
        <h3 className="previsual-title">{title || 'Sin título'}</h3>
        <p className="previsual-company">{empresa || 'Sin empresa'}</p>
        <p className="previsual-location">{city || 'Sin ubicación'}</p>

        {/* Detalles adicionales */}
        <div className="previsual-details">
          <span>{salary || 'Sin salario'}</span>
          <span>{experience_education || 'Sin experiencia/educación'}</span>
        </div>
      </div>

      {/* Enlace "View Details" */}
      <a href="#" className="previsual-view-details">Ver Detalles</a>
    </div>
  );
};

export default Previsual;