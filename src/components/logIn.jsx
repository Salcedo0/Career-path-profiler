import React, { useState } from 'react';
import '../styles/LogIn.css';
import magnetoLogo from '/public/magneto-logo.png'; // Asegúrate de que esta ruta sea correcta para el logo

// Importa íconos de React Icons (Fa para Font Awesome)
import {
  FaUser,       // Para nombre completo
  FaEnvelope,   // Para email
  FaLock,       // Para contraseña
  FaEye,        // Para mostrar contraseña
  FaEyeSlash,   // Para ocultar contraseña
  FaArrowRight, // Para el botón Sign Up
  FaGoogle,     // Para Google
  FaLinkedinIn  // Para LinkedIn
} from 'react-icons/fa';

const LogIn = ({
  type = 'register', // 'register' o 'login'
  logoSrc = magnetoLogo,
  title = "Create an Account",
  subtitle = "Join Magneto365 to start your journey",
  onFormSubmit, // Función que se llama al enviar el formulario
  onGoogleSignIn, // Función al hacer clic en Google
  onLinkedInSignIn, // Función al hacer clic en LinkedIn
  onToggleAuthMode // Función para cambiar entre registro/login
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onFormSubmit) {
      onFormSubmit({ fullName, email, password, confirmPassword, agreedToTerms });
    }
    console.log("Formulario enviado:", { fullName, email, password, confirmPassword, agreedToTerms });
    // Aquí puedes añadir lógica de validación o llamada a API
  };

  const isSignUpDisabled = type === 'register' && (!fullName || !email || !password || !confirmPassword || !agreedToTerms || (password !== confirmPassword));
  const isLoginDisabled = type === 'login' && (!email || !password);


  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <img src={logoSrc} alt="Magneto Logo" className="auth-logo" />
          <h1 className="auth-title">{title}</h1>
          <p className="auth-subtitle">{subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {type === 'register' && (
            <div className="input-group">
              <FaUser className="input-icon" />
              <input
                type="text"
                placeholder="Your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="input-group">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="password-toggle-icon" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {type === 'register' && (
            <div className="input-group">
              <FaLock className="input-icon" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Repeat your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <span className="password-toggle-icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          )}

          {type === 'register' && (
            <div className="checkbox-group">
              <input
                type="checkbox"
                id="terms"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                required
              />
              <label htmlFor="terms">
                I agree to the <a href="#" className="link">Terms</a> and <a href="#" className="link">Privacy Policy</a>
              </label>
            </div>
          )}

          <button
            type="submit"
            className="auth-button primary-button"
            disabled={type === 'register' ? isSignUpDisabled : isLoginDisabled}
          >
            {type === 'register' ? 'Sign Up' : 'Sign In'} <FaArrowRight />
          </button>
        </form>

        <div className="auth-or-divider">
          <span>or</span>
        </div>

        <button className="auth-button social-button" onClick={onGoogleSignIn}>
          <FaGoogle className="social-icon" /> Sign up with Google
        </button>

        <button className="auth-button social-button" onClick={onLinkedInSignIn}>
          <FaLinkedinIn className="social-icon" /> Sign up with LinkedIn
        </button>

        <p className="auth-footer-text">
          {type === 'register' ? "Already have an account?" : "Don't have an account?"}
          <a href="#" className="link" onClick={onToggleAuthMode}>
            {type === 'register' ? "Sign In" : "Sign Up"}
          </a>
        </p>
      </div>
    </div>
  );
};

export default LogIn;