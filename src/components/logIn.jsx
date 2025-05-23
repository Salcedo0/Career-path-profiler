import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LogIn.css';
import magnetoLogo from '/public/magneto-logo.png';
import {
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
} from 'react-icons/fa';

const LogIn = ({
  type = 'register',
  logoSrc = magnetoLogo,
  title = "Create an Account",
  subtitle = "Join Magneto365 to start your journey",
}) => {
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (type === 'register') {
      try {
        const response = await fetch('http://localhost:5000/api/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: fullName,
            password,
          }),
        });

        if (!response.ok) {
          throw new Error('Error al registrar el usuario');
        }

        const data = await response.json();
        console.log('Usuario registrado o existente. ID:', data.userId);

        // Guardar el userId en localStorage
        localStorage.setItem('userId', data.userId);

        // Redirigir según si el usuario ya existía o es nuevo
        if (data.existingUser) {
          navigate('/app'); // Si el usuario ya existía, redirigir a la página principal
        } else {
          navigate('/suggestions'); // Si es un nuevo usuario, redirigir a las sugerencias
        }
      } catch (error) {
        console.error('Error al registrar el usuario:', error);
      }
    }
  };

  const isSignUpDisabled =
    type === 'register' &&
    (!fullName || !password || !confirmPassword || !agreedToTerms || password !== confirmPassword);

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
            <FaLock className="input-icon" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="password-toggle-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {type === 'register' && (
            <div className="input-group">
              <FaLock className="input-icon" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Repeat your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <span
                className="password-toggle-icon"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
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
                I agree to the <a href="#" className="link">Terms</a> and{' '}
                <a href="#" className="link">Privacy Policy</a>
              </label>
            </div>
          )}

          <button
            type="submit"
            className="auth-button primary-button"
            disabled={isSignUpDisabled}
          >
            Sign Up <FaArrowRight />
          </button>
        </form>
      </div>
    </div>
  );
};

export default LogIn;