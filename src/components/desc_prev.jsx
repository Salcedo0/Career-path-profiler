import React from 'react';
import '../styles/desc_prev.css';
import placeholderIcon from '/public/magneto-logo.png'; // Asegúrate de que esta ruta sea correcta
import {
  FaMapMarkerAlt, // Para ubicación
  FaBriefcase,    // Para tipo de contrato
  FaDollarSign,   // Para salario
  FaCalendarAlt,  // Para "Posted days ago"
  FaUsers,        // Para "applicants"
  FaShareAlt,     // Para el ícono de compartir
  FaPaperPlane    // Para el ícono del botón "Apply Now" (simula una flecha de enviar)
} from 'react-icons/fa';


const DescPrev = ({
  title,
  company,
  location,
  contract, // Nuevo: tipo de contrato
  salary,   // Nuevo: rango salarial
  isNew,    // Nuevo: para la etiqueta "New"
  isSaved,  // Nuevo: para el ícono de corazón
  tags,     // Nuevo: para las etiquetas de habilidades
  description,
  requirements,
  responsibilities, // Cambiado de 'responsibilities' a 'jobDescription' en el ejemplo de imagen para la descripción principal
  benefits, // Nuevo: para la sección de beneficios
}) => {
  return (
    <div className="desc-prev-container">
      {/* Sección del encabezado de la tarjeta */}
      <div className="desc-prev-header">
        <div className="desc-prev-header-top">
          <div className="desc-prev-icon-wrapper">
            <img src={placeholderIcon} alt="Company Icon" className="desc-prev-icon" />
          </div>
          <h2 className="desc-prev-title">{title || 'Título del Trabajo'}</h2>
          {isNew && <span className="desc-prev-new-label">New</span>}
          <div className="desc-prev-heart-icon">
            <span className={isSaved ? 'saved' : ''}>&#x2764;</span> {/* Corazón relleno */}
          </div>
        </div>

        <p className="desc-prev-company">{company || 'Nombre de la Empresa'}</p>

        {/* Detalles de ubicación, contrato, salario */}
        <div className="desc-prev-details">
          <div className='desc-prev-details-icons'>
            <span>
              <FaMapMarkerAlt />
              {location || 'Ubicación'}
            </span>
            <span>
              <FaBriefcase />
              {contract || 'Tiempo Completo'}
            </span>
            <span>
              <FaDollarSign />
              {salary || '$Rango - $Rango'}
            </span>
          </div>
        </div>  

        {/* Tags de habilidades */}
        {tags && tags.length > 0 && (
          <div className="desc-prev-tag-container">
            {tags.map((tag, index) => (
              <span key={index} className="desc-prev-tag">{tag}</span>
            ))}
          </div>
        )}
      </div>

      {/* Cuerpo principal de la descripción */}
      <div className="desc-prev-content-sections">
        {/* Sección de Descripción del Trabajo */}
        <h3 className="section-title">Job Description</h3>
        <p className="section-paragraph">{description || 'No hay descripción disponible.'}</p>

        {/* Sección de Responsabilidades (si se usa así, la imagen no la tiene explícitamente separada de la descripción) */}
        {responsibilities && responsibilities.length > 0 && (
          <>
            <h3 className="section-title">Responsibilities</h3>
            <ul className="section-list">
              {responsibilities.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </>
        )}

        {/* Sección de Requisitos */}
        {requirements && requirements.length > 0 && (
          <>
            <h3 className="section-title">Requirements</h3>
            <ul className="section-list">
              {requirements.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </>
        )}

        {/* Sección de Beneficios */}
        {benefits && benefits.length > 0 && (
          <>
            <h3 className="section-title">Benefits</h3>
            <ul className="section-list">
              {benefits.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </>
        )}
      </div>

      {/* Botón "Apply Now" */}
      <div className="desc-prev-apply-section">
        <button className="apply-now-button">
          {/* Si usas react-icons: <MdSend /> */}
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default DescPrev;