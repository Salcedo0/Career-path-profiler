import React from 'react';
import '../styles/desc_prev.css';
import placeholderIcon from '/public/magneto-logo.png'; // Asegúrate de que esta ruta sea correcta
import {
  FaMapMarkerAlt, // Para ubicación
  FaBriefcase,    // Para tipo de contrato
  FaDollarSign,   // Para salario
  FaHeart,        // Para el ícono de guardado
  FaPaperPlane    // Para el botón "Apply Now"
} from 'react-icons/fa';

const DescPrev = ({
  title,
  empresa,
  city,
  description,
  experience_education,
  salary,
  key_words,
}) => {
  return (
    <div className="desc-prev-container">
      {/* Encabezado */}
      <div className="desc-prev-header">
        <div className="desc-prev-icon-wrapper">
          <img src={placeholderIcon} alt="Company Icon" className="desc-prev-icon" />
        </div>
        <h2 className="desc-prev-title">{title || 'Título del Trabajo'}</h2>
        <p className="desc-prev-company">{empresa || 'Nombre de la Empresa'}</p>
      </div>

      {/* Detalles */}
      <div className="desc-prev-details">
        <div className="desc-prev-detail-item">
          <FaMapMarkerAlt className="desc-prev-icon" />
          <span>{city || 'Ubicación no disponible'}</span>
        </div>
        <div className="desc-prev-detail-item">
          <FaBriefcase className="desc-prev-icon" />
          <span>{experience_education || 'No especificado'}</span>
        </div>
        <div className="desc-prev-detail-item">
          <FaDollarSign className="desc-prev-icon" />
          <span>{salary || 'Salario no especificado'}</span>
        </div>
      </div>

      
      <div className="desc-prev-description">
        <h3>Descripción del Trabajo</h3>
        <p>{description || 'No hay descripción disponible.'}</p>
      </div>

      
      {key_words && (
        <div className="desc-prev-keywords">
          <h3>Palabras Clave</h3>
          <ul>
            {key_words.split(',').map((keyword, index) => (
              <li key={index}>{keyword.trim()}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="desc-prev-apply-section">
        <button className="apply-now-button">
          <FaPaperPlane className="apply-now-icon" />
          Aplique ahora
        </button>
      </div>
    </div>
  );
};

export default DescPrev;