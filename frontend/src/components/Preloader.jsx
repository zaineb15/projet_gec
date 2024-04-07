// Preloader.jsx

import React from 'react';
import Loading from '../assets/images/25.png';
import './Preloader.css'; // Import du fichier CSS

const Preloader = () => {
  return (
    <div className="preloader-page"> {/* Ajoutez une classe spécifique à la page Preloader */}
      <img src={Loading} alt="Logo" />
    </div>
  );
}

export default Preloader;
