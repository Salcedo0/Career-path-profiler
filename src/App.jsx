//App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Nav_bar from './components/nav_bar';
import Footer from './components/Footer';
import Login from './components/logIn';
import SuggestionsNewUsers from './components/suggestions_new_user';
import MainApp from './components/mainApp'; // Extrae la lógica principal de App.jsx a un nuevo componente

function App() {
  return (
    <>
      <Nav_bar /> {/* Navbar visible en todas las páginas */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/suggestions" element={<SuggestionsNewUsers />} />
        <Route path="/app" element={<MainApp />} />
      </Routes>
      <Footer /> {/* Footer visible en todas las páginas */}
    </>
  );
}

export default App;
