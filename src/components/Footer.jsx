// src/components/Footer.jsx

import React from 'react';
// Importamos el logo para usarlo en el footer
import Logo from '../assets/Logo_TopCleaning.png'; 

const Footer = () => {
  return (
    <footer className="bg-navy text-white py-12 text-sm">
      {/* Contenedor principal con Grid de Tailwind */}
      {/* En móvil: 1 columna. En escritorio: 12 columnas para distribuir espacios asimétricos */}
      <div className="container-custom grid grid-cols-1 md:grid-cols-12 gap-8 border-b border-white/10 pb-8">
        
        {/* Columna 1: Logo y Copyright (Ocupa 4 espacios en desktop) */}
        <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left">
          <img 
            src={Logo} 
            alt="Top Cleaning Logo" 
            className="h-14 mb-4" 
          />
          <p className="mb-4 text-white/90">
            Top Cleaning is dedicated to providing meticulous, eco-friendly cleaning services for homes and offices.
          </p>
          <p className="text-xs text-white/60">
            &copy; {new Date().getFullYear()} Top Cleaning. All rights reserved.
          </p>
        </div>

        {/* Columna 2: Areas we Serve (Ocupa 2 espacios en desktop) */}
        <div className="md:col-span-2 text-center md:text-left">
          <h4 className="text-yellow-accent font-bold mb-4 text-lg">Areas we Serve</h4>
          <ul className="space-y-2">
            <li>Markham</li>
            <li>Richmond Hill</li>
            <li>Stouffville</li>
            <li>Pickering</li>
            <li>Ajax</li>
            <li>Oshawa</li>
            <li>GTA</li>
          </ul>
        </div>

        {/* Columna 3: Services (Ocupa 2 espacios en desktop) */}
        <div className="md:col-span-2 text-center md:text-left">
          <h4 className="text-yellow-accent font-bold mb-4 text-lg">Services</h4>
          <ul className="space-y-2">
            <li>
              <a href="#services" className="hover:text-yellow-accent transition-colors duration-200">Standard Clean</a>
            </li>
            <li>
              <a href="#services" className="hover:text-yellow-accent transition-colors duration-200">Deep Clean</a>
            </li>
            <li>
              <a href="#services" className="hover:text-yellow-accent transition-colors duration-200">Move In/Out</a>
            </li>
            <li>
              <a href="#addons" className="hover:text-yellow-accent transition-colors duration-200">Add-Ons</a>
            </li>
          </ul>
        </div>

        {/* Columna 4: Contact Info (Ocupa 4 espacios en desktop) */}
        <div className="md:col-span-4 text-center md:text-left">
          <h4 className="text-yellow-accent font-bold mb-4 text-lg">Contact Us</h4>
          <div className="space-y-2">
            <p>
              Email: <a href="mailto:info@top-cleaning.ca" className="text-white hover:text-yellow-accent transition-colors duration-200">info@topcleaning.ca</a>
            </p>
            <p>
              Phone: <a href="tel:6476063974" className="text-white hover:text-yellow-accent transition-colors duration-200">(647) 606-3974</a>
            </p>
          </div>
          
          {/* Espacio para redes sociales */}
          <div className="mt-4 flex justify-center md:justify-start gap-4">
            {/* ... Iconos sociales ... */}
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

