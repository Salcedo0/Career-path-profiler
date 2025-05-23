import React, { useState } from 'react';
import '../styles/nav_bar.css';
import magnetoLogo from '../assets/magneto.svg'; 


import {
  FaSearch,     
  FaBell,      
  FaChevronDown 
} from 'react-icons/fa';

function Nav_bar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState(""); 

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            if (onSearch) {
                onSearch(searchTerm);
            }
        }
    };

    const handleSearchClick = () => {
        if (onSearch) {
            onSearch(searchTerm); // Llamar a la función onSearch con el término de búsqueda
        }
    };

    return (
        <div className='nav-bar'>
            <div className="nav-left">
                <a href="/">
                    <img src={magnetoLogo} alt='Magneto Logo' className='nav-bar-logo' />
                </a>
            </div>

            <div className="nav-search-bar">
                <FaSearch className="search-icon" />
                <input
                    type="text"
                    placeholder="busca trabajos, compañías o personas"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onKeyPress={handleKeyPress}
                />
                <button onClick={handleSearchClick}></button>
            </div>

            <div className="nav-right">
                <nav className="nav-links">
                    <a href="#" className="nav-link active">Home</a>
                    <a href="#" className="nav-link">Trabajos</a>
                    <a href="#" className="nav-link">Perfiles</a>
                    <a href="#" className="nav-link">Mensajes</a>
                </nav>

                <div className="nav-profile-section">
                    <div className="nav-notifications">
                        <FaBell className="notification-icon" />
                        <span className="notification-badge"></span> 
                    </div>

                    <div className="nav-user-profile">
                        <img src="src\assets\foto_perfil.jpg" alt="User Avatar" className="user-avatar" /> 
                        <span className="user-name">Juan Salcedo</span>
                        <FaChevronDown className="dropdown-icon" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Nav_bar;