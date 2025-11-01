// src/components/Footer.jsx

import React from 'react';
// Importamos el logo para usarlo en el footer
import Logo from '../assets/Logo_TopCleaning.png'; 

const Footer = () => {
  return (
    <footer className="main-footer" style={{ 
      backgroundColor: 'var(--color-navy)', // Fondo Deep Navy Blue
      color: 'var(--color-white)', 
      padding: '50px 0 20px 0',
      fontSize: '0.95em'
    }}>
      <div className="container footer-grid">
        
        {/* Columna 1: Logo y Copyright */}
        <div className="footer-col brand-info">
          <img 
            src={Logo} 
            alt="Top Cleaning Logo" 
            style={{ height: '55px'}} 
          />
          <p style={{ marginTop: '15px' }}>
            Top Cleaning is dedicated to providing meticulous, eco-friendly cleaning services for homes and offices.
          </p>
          <p style={{ marginTop: '20px', fontSize: '0.85em' }}>
            &copy; {new Date().getFullYear()} Top Cleaning. All rights reserved.
          </p>
        </div>

        {/* Columna 2: Areas we Serve */}
        <div className="footer-col quick-links">
          <h4 style={{ color: 'var(--color-yellow-accent)', marginBottom: '15px' }}>Areas we Serve</h4>
          <ul className="footer-links-list">
            <li>Markham</li>
            <li>Richmond Hill</li>
            <li>Stouffville</li>
            <li>Pickering</li>
            <li>Ajax</li>
            <li>Oshawa</li>
            <li>GTA</li>
          </ul>
        </div>

        {/* Columna 3: Services */}
        <div className="footer-col services-links">
          <h4 style={{ color: 'var(--color-yellow-accent)', marginBottom: '15px' }}>Services</h4>
          <ul className="footer-links-list">
            <li><a href="#services">Standard Clean</a></li>
            <li><a href="#services">Deep Clean</a></li>
            <li><a href="#services">Move In/Out</a></li>
            <li><a href="#addons">Add-Ons</a></li>
          </ul>
        </div>

        {/* Columna 4: Contact Info */}
        <div className="footer-col contact-info">
          <h4 style={{ color: 'var(--color-yellow-accent)', marginBottom: '15px' }}>Contact Us</h4>
          <p>
            Email: <a href="mailto:info@top-cleaning.ca" style={{ color: 'var(--color-white)' }}>info@topcleaning.ca</a>
          </p>
          <p>
            Phone: <a href="tel:6476063974" style={{ color: 'var(--color-white)' }}>(647) 606-3974</a>
          </p>
          
          {/* Aquí podrías añadir íconos de redes sociales */}
          <div className="social-links" style={{ marginTop: '15px' }}>
            {/* ... (Ejemplo de enlaces a redes sociales) ... */}
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;