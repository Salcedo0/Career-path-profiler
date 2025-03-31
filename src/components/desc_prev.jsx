import React from 'react';
import '../styles/desc_prev.css';

const DescPrev = ({ title, company, location, description, requirements, responsibilities }) => {
  return (
    <div className="desc-prev-container">
      <h2 className="desc-prev-title">{title || 'Título del trabajo'}</h2>
      <p className="desc-prev-company">{company || 'Nombre de la empresa'}</p>
      <p className="desc-prev-location">{location || 'Ubicación'}</p>
      <div className="desc-prev-content">
        <h3>Descripción:</h3>
        <p>{description || 'No hay descripción disponible.'}</p>
        <h3>Responsabilidades:</h3>
        <ul>
          {responsibilities && responsibilities.length > 0 ? (
            responsibilities.map((item, index) => <li key={index}>{item}</li>)
          ) : (
            <li>No hay responsabilidades disponibles.</li>
          )}
        </ul>
        <h3>Requisitos:</h3>
        <ul>
          {requirements && requirements.length > 0 ? (
            requirements.map((item, index) => <li key={index}>{item}</li>)
          ) : (
            <li>No hay requisitos disponibles.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DescPrev;