// src/components/Header.jsx

import React from 'react';
// Asegúrate de que la ruta de importación sea correcta
import Logo from '../assets/Logo_TopCleaning.png'; 

// El componente ahora acepta la prop 'navigateTo'
const Header = ({ navigateTo }) => {
 // Estilos inline para el ejemplo, pero se recomienda usar clases CSS
 const headerStyle = {
  backgroundColor: 'var(--color-navy)',
  padding: '15px 0',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
 };

 // Estilos para el botón CTA
 const ctaStyle = {
  backgroundColor: 'var(--color-yellow-accent)', 
  color: 'var(--color-navy)',
  fontWeight: 'bold'
 };

 return (
  <header className="header" style={headerStyle}>
   <div className="container header-content">
    
    {/* LOGO - Usa navigateTo('home') para volver a la página principal */}
    <div 
            className="logo"
            onClick={() => navigateTo('home')} 
            style={{ cursor: 'pointer' }} // Agregamos estilo para indicar que es clickeable
        >
     <img src={Logo} alt="Top Cleaning Logo" style={{ height: '55px' }} />
    </div>

    {/* Navegación - Añadimos el enlace "Join Team" */}
        <nav className="nav" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {/* Enlace "Join Team" */}
            <a 
                href="#"
                onClick={(e) => {
                    e.preventDefault(); 
                    navigateTo('joinTeam');
                }}
                className="header-link"
                style={{ 
                color: 'var(--color-white)', 
                textDecoration: 'none', 
                fontWeight: '600'
                }}
            >
                Join Team
            </a>
            {/* CTA Rápido */}
            <a
                href="https://wa.me/6476063974"
                className="cta-button header-cta primary-cta"
                target="_blank"
                rel="noopener noreferrer"
                >
                    Contact Us
                    </a>
        </nav>
    </div>
  </header>
 );
};

export default Header;