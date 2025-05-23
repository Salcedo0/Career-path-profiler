import React from 'react';
import '../styles/previsual.css';
import placeholderIcon from '../assets/placeholder_prev.png';

let lastClickTime = null;
let lastVacant = null;

const userId = "68301050ddf230c5943587c0"; // Cambia esto por el id real del usuario logueado

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

  const handleClick = async () => {
    const now = Date.now();
    let secondsSinceLastClick = null;

    if (lastClickTime) {
      secondsSinceLastClick = Math.floor((now - lastClickTime) / 1000);
      // Si el tiempo fue mayor a 30s, guardar la vacante anterior
      if (secondsSinceLastClick > 30 && lastVacant) {
        // Filtrar las palabras clave
        const filteredKeyWords = lastVacant.key_words.replace("Palabras clave: ", "").split(", ").map(word => word.trim());

        await fetch('http://localhost:5000/api/visited_vacant', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId,
            vacant: lastVacant,
            key_words: filteredKeyWords
          })
        });
      }
    }

    lastClickTime = now;
    lastVacant = { title, key_words }; // Guardar la vacante actual y sus palabras clave

    const logData = {
      title,
      empresa,
      city,
      salary,
      description,
      experience_education,
      key_words,
      timestamp: Math.floor(now / 1000),
      secondsSinceLastClick,
      lastVacant
    };

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