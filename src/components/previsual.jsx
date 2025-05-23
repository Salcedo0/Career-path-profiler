import React from 'react';
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
  isSaved, // Booleano: true para mostrar el corazón rojo (guardado)
  onClick, // Función para manejar el clic en la tarjeta
}) => {
  return (
    <div className="previsual-card" onClick={onClick}>
      {/* Etiqueta "New" */}
      {isNew && <span className="previsual-new-label">New</span>}

      {/* Ícono de corazón */}
      <div className="previsual-heart-icon">
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

        {/* Palabras clave */}
        {/* {key_words && (
          <div className="previsual-keywords">
            <h4>Palabras Clave:</h4>
            <ul>
              {key_words.split(',').map((keyword, index) => (
                <li key={index}>{keyword.trim()}</li>
              ))}
            </ul>
          </div>
        )} */}
      </div>

      {/* Enlace "View Details" */}
      <a href="#" className="previsual-view-details">Ver Detalles</a>
    </div>
  );
};

export default Previsual;