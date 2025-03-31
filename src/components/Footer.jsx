// Footer.jsx
import React from 'react';
import '../styles/footer.css'; 
import logoTuya from '../assets/logo-tuya-min.svg'
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube, FaGlobe } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="footer-tuya">
      <div className="footer-container">
        <div className="logo-container">
          <img src={logoTuya} alt="Tuya" className="tuya-logo" />
        </div>
        
        <div className="social-text">
          <p>Encuéntranos en redes sociales:</p>
        </div>
        
        <div className="social-icons">{/*aui agregue los iconos de las redes sociales*/}
          <a href="#" className="social-icon"><FaFacebook/></a>
          <a href="#" className="social-icon"><FaInstagram/></a>
          <a href="#" className="social-icon"><FaLinkedin/></a>
        </div>
        
        <div className="footer-links">
          <a href="/la-compania">La compañía</a>
          <a href="/ofertas-laborales">Ofertas Laborales</a>
          <a href="/crear-cuenta">Crear cuenta</a>
          <a href="/sitio-oficial">Sitio oficial</a>
        </div>
        
        <div className="powered-by">
          <button className="powered-button">Powered by:</button>
        </div>
        
        <div className="legal-links">
          <a href="/tratamiento-datos">Tratamiento de datos personales</a>
          <a href="/politica-uso">Política de uso de información personal</a>
          <a href="/terminos">Términos y condiciones</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;