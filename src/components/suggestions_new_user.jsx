import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import '../styles/suggestions_new_users.css';
import Nav_bar from './nav_bar';
import {
  FaLaptopCode,
  FaPalette,
  FaProjectDiagram,
  FaBullhorn,
  FaDatabase,
  FaUserTie,
  FaHandshake,
  FaHeadset,
} from 'react-icons/fa';

const jobCategories = [
  { id: 'software-engineer', title: 'Ingenieria de Software', subtitle: 'Tecnología e IT', icon: FaLaptopCode },
  { id: 'ui-ux-designer', title: 'Diseño UI/UX', subtitle: 'Diseño y Creatividad', icon: FaPalette },
  { id: 'project-manager', title: 'Gerencia de Proyectos', subtitle: 'Gestión', icon: FaProjectDiagram },
  { id: 'marketing-specialist', title: 'Especialista en Marketing', subtitle: 'Marketing', icon: FaBullhorn },
  { id: 'data-analyst', title: 'Analista de Datos', subtitle: 'Analítica', icon: FaDatabase },
  { id: 'hr-specialist', title: 'Especialista en Recursos Humanos', subtitle: 'RRHH y Administración', icon: FaUserTie },
  { id: 'sales-executive', title: 'Ejecutivo de Ventas', subtitle: 'Ventas', icon: FaHandshake },
  { id: 'customer-support', title: 'Soporte al Cliente', subtitle: 'Atención al Cliente', icon: FaHeadset },
];

const CategorySelector = ({
  heading = "¿Qué te interesa?",
  subheading = "Selecciona las categorías de trabajo y roles que más te interesan. Esto nos ayuda a personalizar tu feed de trabajos y recomendaciones.",
  categories = jobCategories,
  disclaimer = "Puedes actualizar tus intereses en cualquier momento desde la configuración de tu perfil.",
}) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const navigate = useNavigate(); // Inicializar useNavigate

  const handleCategoryClick = (categoryId) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(categoryId)
        ? prevSelected.filter((id) => id !== categoryId)
        : [...prevSelected, categoryId]
    );
  };

  const handleContinueClick = async () => {
    const userId = localStorage.getItem('userId'); // Recuperar el userId del localStorage

    if (!userId) {
      console.error('No se encontró el userId en localStorage');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/update-keywords', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          keyWords: selectedCategories,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar las key words');
      }

      const data = await response.json();
      console.log(data.message);

      // Aquí podrías redirigir al usuario a la página principal
      console.log('Categorías seleccionadas guardadas correctamente:', selectedCategories);

      // Navegar a la página principal
      navigate('/app');
    } catch (error) {
      console.error('Error al guardar las categorías seleccionadas:', error);
    }
  };

  return (
    <>
      <Nav_bar />
    <div className="category-selector-container">
      <h1 className="category-selector-heading">{heading}</h1>
      <p className="category-selector-subheading">{subheading}</p>

      <div className="categories-grid">
        {categories.map((category) => {
          const IconComponent = category.icon;
          const isSelected = selectedCategories.includes(category.id);
          return (
            <div
              key={category.id}
              className={`category-card ${isSelected ? 'selected' : ''}`}
              onClick={() => handleCategoryClick(category.id)}
            >
              <div className="category-icon-wrapper">
                {IconComponent && <IconComponent className="category-icon" />}
              </div>
              <h3 className="category-title">{category.title}</h3>
              <p className="category-subtitle">{category.subtitle}</p>
            </div>
          );
        })}
      </div>

      <button
        className="continue-button"
        onClick={handleContinueClick}
        disabled={selectedCategories.length === 0}
      >
        Continuar a tu Feed Personalizado <span className="arrow-icon">&#8594;</span>
      </button>

      <p className="category-disclaimer">{disclaimer}</p>
    </div>
    </>
  );
};

export default CategorySelector;