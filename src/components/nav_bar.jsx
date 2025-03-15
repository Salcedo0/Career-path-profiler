import { useState } from 'react';
import '../styles/nav_bar.css'; 
import logo from '../assets/magneto.svg';
import magnifying_glass from '../assets/magnifying.svg';
import iniciar_sesion from '../assets/iniciar_sesion.svg';
import crear_cuenta from '../assets/crear_cuenta.svg';




function Nav_bar(){

    const [search, setSearch] = useState("");

    return (
        <div className='nav_bar'>
            
            <img src={logo} alt='logo' className='nav_bar_logo' />  

            <div className="buscador_empleo">  
            <input
                type="text"
                placeholder="Buscar empleo por ciudad, cargo, empresa o profesión"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search_input"
            />
            <img src={magnifying_glass} alt='magnifying_glass' className='nav_bar_magnifying_glass' />          
            </div>

            <button className='nav_button'>
                <img src = {iniciar_sesion} alt='iniciar_sesion' className='nav_iniciar_sesion' />
                Iniciar sesión
            </button>               
            <button className='nav_button'>
                <img src = {crear_cuenta} alt='crear_cuenta' className='nav_crear_cuenta' />    
                Crear cuenta
            </button>

            

        </div>
    );
}
export default Nav_bar;