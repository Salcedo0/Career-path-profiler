import React from 'react';
import '../styles/previsual.css';
import placeholderIcon from '../assets/placeholder_prev.png';

let lastClickTime = null;
let lastVacant = null;

const Previsual = ({
  title,
  empresa,
  city,
  salary,
  description,
  experience_education,
  key_words,
  onClick
}) => {

  const handleClick = () => {
    const now = Date.now();
    let secondsSinceLastClick = null;

    if (lastClickTime) {
      secondsSinceLastClick = Math.floor((now - lastClickTime) / 1000);
    }

    const logData = {
      title,
      empresa,
      city,
      salary,
      description,
      experience_education,
      key_words,
      timestamp: Math.floor(now / 1000), // timestamp en segundos
      secondsSinceLastClick, // tiempo en segundos desde el último click (null si es el primero)
      lastVacant // nombre de la vacante anterior al click
    };

    lastClickTime = now;
    lastVacant = title;

    console.log('Log Click:', logData);
    if (onClick) onClick(logData);
  };

  return (
    <div
      className="previsual-card"
      onClick={handleClick}
    >
      <div className="previsual-icon">
        <img src={placeholderIcon} alt="Company Icon" />
      </div>
      <div className="previsual-content">
        <h3 className="previsual-title">{title || 'Sin título'}</h3>
        <p className="previsual-company">{empresa || 'Sin empresa'}</p>
        <p className="previsual-location">{city || 'Sin ubicación'}</p>
        <p className="previsual-details">
          {salary || 'Sin salario'}<br />
          {experience_education || 'Sin experiencia/educación'}<br />
          {key_words || 'Sin palabras clave'}
        </p>
      </div>
      <div className="previsual-arrow">
        <span>&gt;</span>
      </div>
    </div>
  );
};

export default Previsual;