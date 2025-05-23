import React from 'react';
import '../styles/previsual.css';
import placeholderIcon from '/public/magneto-logo.png'; // Importa la imagen correctamente

const Previsual = ({ title, company, location, contract, salary, experience, level, onClick }) => {
  return (
    <div className="previsual-card" onClick={onClick}>
      <div className="previsual-icon">
        <img src={placeholderIcon} alt="Company Icon" />
      </div>
      <div className="previsual-content">
        <h3 className="previsual-title">{title || 'titulo'}</h3>
        <p className="previsual-company">{company || 'compañia'}</p>
        <p className="previsual-location">{location || 'mi casa'}</p>
        <p className="previsual-details">
          {contract || 'definido'}, {salary || 'mucho'}, {experience || 'nula'}.
        </p>
      </div>
      <div className="previsual-arrow">
        <span>&gt;</span>
      </div>
    </div>
  );
};

export default Previsual;