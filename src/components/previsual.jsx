import React from 'react';
import '../styles/previsual.css';
import placeholderIcon from '/public/magneto-logo.png'; // Asegúrate de que esta ruta sea correcta para tu proyecto

const Previsual = ({
  title,
  company,
  location,
  contract,
  salary,
  experience, // Esta prop se usará para el texto de "experience" (ej: "Junior", "Mid-level")
  level, // Esta prop no se usa en el diseño actual, puedes quitarla si no la necesitas
  tags, // Array de strings para las etiquetas de habilidades (ej: ['Figma', 'User Research'])
  isNew, // Booleano: true para mostrar la etiqueta "New"
  isSaved, // Booleano: true para mostrar el corazón rojo (guardado)
  onClick // Función para manejar el clic en la tarjeta
}) => {
  return (
    <div className="previsual-card" onClick={onClick}>
      {isNew && <span className="previsual-new-label">New</span>}

      {/* Ícono de corazón */}
      <div className="previsual-heart-icon">
        {/* Usamos una clase condicional para el estado "guardado" */}
        <span className={isSaved ? 'saved' : ''}>&#x2764;</span> {/* Carácter Unicode de corazón relleno */}
      </div>

=======
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
  onClick,
  
  isNew, // Booleano: true para mostrar la etiqueta "New"
  isSaved, // Booleano: true para mostrar el corazón rojo (guardado)
  
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
      
          <div className="previsual-card" onClick={onClick}>
      {isNew && <span className="previsual-new-label">New</span>}

      {/* Ícono de corazón */}
      <div className="previsual-heart-icon">
        {/* Usamos una clase condicional para el estado "guardado" */}
        <span className={isSaved ? 'saved' : ''}>&#x2764;</span> {/* Carácter Unicode de corazón relleno */}
      </div>

      
      <div className="previsual-icon">
        <img src={placeholderIcon} alt="Company Icon" />
      </div>

      <div className="previsual-content">
        <h3 className="previsual-title">{title || 'Título del Puesto de Trabajo'}</h3>
        <p className="previsual-company">{company || 'Nombre de la Compañía'}</p>
        <p className="previsual-location">{location || 'Ubicación Desconocida'}</p>

        {/* Detalles como "Full-time", "Salary", "Experience" */}
        <div className="previsual-details">
          <span>{contract || 'Tipo de Contrato'}</span>
          <span>{salary || 'Salario Estimado'}</span>
          <span>{experience || 'Nivel de Experiencia'}</span>
        </div>

        {/* Contenedor para las etiquetas de habilidades/tecnologías */}
        {tags && tags.length > 0 && (
          <div className="previsual-tag-container">
            {tags.map((tag, index) => (
              <span key={index} className="previsual-tag">{tag}</span>
            ))}
          </div>
        )}
        <h3 className="previsual-title">{title || 'Sin título'}</h3>
        <p className="previsual-company">{empresa || 'Sin empresa'}</p>
        <p className="previsual-location">{city || 'Sin ubicación'}</p>
        <p className="previsual-details">
          {salary || 'Sin salario'}<br />
          {experience_education || 'Sin experiencia/educación'}<br />
          {key_words || 'Sin palabras clave'}
        </p>
      </div>

      {/* Enlace "View Details" */}
      {/* Puedes cambiar el `href` a una ruta real si es necesario */}
      <a href="#" className="previsual-view-details">View Details</a>

      {/* La flecha ">" de tu diseño original no está en la imagen de referencia,
          así que la he omitido del JSX. Si la necesitas, puedes volver a añadirla. */}
      {/* <div className="previsual-arrow">
        <span>&gt;</span>
      </div> */}
    </div>
  );
};

export default Previsual;