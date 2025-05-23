import React from 'react';
import '../styles/desc_prev.css';

const DescPrev = ({ 
  title, 
  empresa, 
  city, 
  description, 
  experience_education, 
  salary, 
  key_words 
}) => {
  return (
    <div className="desc-prev-container">
      <h2 className="desc-prev-title">{title || 'Título del trabajo'}</h2>
      <p className="desc-prev-company">{empresa || 'Nombre de la empresa'}</p>
      <p className="desc-prev-location">{city || 'Ubicación'}</p>
      <div className="desc-prev-content">
        <h3>Descripción:</h3>
        <p>{description || 'No hay descripción disponible.'}</p>
        <h3>Experiencia y Educación:</h3>
        <p>{experience_education || 'No hay información disponible.'}</p>
        <h3>Salario:</h3>
        <p>{salary || 'No hay información de salario.'}</p>
        <h3>Palabras clave:</h3>
        <p>{key_words || 'No hay palabras clave.'}</p>
      </div>
    </div>
  );
};

export default DescPrev;