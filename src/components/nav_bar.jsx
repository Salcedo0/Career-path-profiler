import { useState } from 'react';
import '../styles/nav_bar.css'; 
import logo from '../assets/magneto.svg';
import iniciar_sesion from '../assets/iniciar_sesion.svg';
import crear_cuenta from '../assets/crear_cuenta.svg';

function Nav_bar({ onSearch }) { // Recibe la prop onSearch desde el padre
    const [search, setSearch] = useState("");

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            if (onSearch) { // Llama a la función pasada desde el padre
                onSearch(search);
            }
        }
    };

    return (
        <div className='nav_bar'>
            <img src={logo} alt='logo' className='nav_bar_logo' />  

            <button className='nav_button'>
                <img src={iniciar_sesion} alt='iniciar_sesion' className='nav_iniciar_sesion' />
                Iniciar sesión
            </button>               
            <button className='nav_button'>
                <img src={crear_cuenta} alt='crear_cuenta' className='nav_crear_cuenta' />    
                Crear cuenta
            </button>
        </div>
    );
}

export default Nav_bar;