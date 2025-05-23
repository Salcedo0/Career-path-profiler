import React, { useState } from 'react';
import '../styles/suggestions_new_users.css'; // Asegúrate de tener el CSS correspondiente

// Importa íconos de React Icons para las categorías
// Asegúrate de tenerlos instalados: npm install react-icons
import {
  FaLaptopCode,    // Software Engineer
  FaPalette,       // UI/UX Designer
  FaProjectDiagram, // Project Manager
  FaBullhorn,      // Marketing Specialist
  FaDatabase,      // Data Analyst
  FaUserTie,       // HR Specialist
  FaHandshake,     // Sales Executive
  FaHeadset        // Customer Support
} from 'react-icons/fa';

// Array de ejemplo para las categorías (puedes pasarlo como prop o gestionarlo internamente)
const jobCategories = [
  { id: 'software-engineer', title: 'Software Engineer', subtitle: 'Tech & IT', icon: FaLaptopCode },
  { id: 'ui-ux-designer', title: 'UI/UX Designer', subtitle: 'Design & Creative', icon: FaPalette },
  { id: 'project-manager', title: 'Project Manager', subtitle: 'Management', icon: FaProjectDiagram },
  { id: 'marketing-specialist', title: 'Marketing Specialist', subtitle: 'Marketing', icon: FaBullhorn },
  { id: 'data-analyst', title: 'Data Analyst', subtitle: 'Analytics', icon: FaDatabase },
  { id: 'hr-specialist', title: 'HR Specialist', subtitle: 'HR & Admin', icon: FaUserTie },
  { id: 'sales-executive', title: 'Sales Executive', subtitle: 'Sales', icon: FaHandshake },
  { id: 'customer-support', title: 'Customer Support', subtitle: 'Support', icon: FaHeadset },
];

const CategorySelector = ({
  heading = "What are you interested in?",
  subheading = "Select the job categories and roles you're most interested in. This helps us personalize your job feed and recommendations.",
  categories = jobCategories, // Permite pasar las categorías como prop
  onContinue, // Función que se ejecuta al hacer clic en "Continue"
  disclaimer = "You can update your interests anytime in your profile settings."
}) => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategories(prevSelected =>
      prevSelected.includes(categoryId)
        ? prevSelected.filter(id => id !== categoryId) // Deseleccionar
        : [...prevSelected, categoryId] // Seleccionar
    );
  };

  const handleContinueClick = () => {
    if (onContinue) {
      onContinue(selectedCategories);
    }
    console.log("Categorías seleccionadas:", selectedCategories);
    // Aquí podrías navegar a la siguiente página o guardar las selecciones
  };

  return (
    <div className="category-selector-container">
      <h1 className="category-selector-heading">{heading}</h1>
      <p className="category-selector-subheading">{subheading}</p>

      <div className="categories-grid">
        {categories.map(category => {
          const IconComponent = category.icon; // Componente de ícono de React Icons
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
        disabled={selectedCategories.length === 0} // Deshabilita el botón si no hay selecciones
      >
        Continue to Personalized Feed <span className="arrow-icon">&#8594;</span>
      </button>

      <p className="category-disclaimer">{disclaimer}</p>
    </div>
  );
};

export default CategorySelector;