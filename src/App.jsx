//App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Login from './components/logIn';
import SuggestionsNewUsers from './components/suggestions_new_user';
import MainApp from './components/mainApp'; // Extrae la lógica principal de App.jsx a un nuevo componente

function App() {
  return (
    <>
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
