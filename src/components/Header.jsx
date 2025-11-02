// src/components/Header.jsx

import React from 'react';
// IMPORTANTE: Importamos 'Link' para la navegación interna
import { Link } from 'react-router-dom';
// Asegúrate de que la ruta de importación sea correcta
import Logo from '../assets/Logo_TopCleaning.png'; 

// El componente ahora NO acepta la prop 'navigateTo'
const Header = () => {
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
            
                {/* LOGO - Usa <Link to="/"> para ir a la página principal */}
                <Link 
                    to="/" 
                    className="logo"
                    style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                >
                    <img src={Logo} alt="Top Cleaning Logo" style={{ height: '55px' }} />
                </Link>

                {/* Navegación - Añadimos el enlace "Join Team" */}
                <nav className="nav" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    
                    {/* Enlace "Join Team" - Usa <Link to="/joinTeam"> */}
                    <Link 
                        to="/joinTeam"
                        className="header-link"
                        style={{ 
                            color: 'var(--color-white)', 
                            textDecoration: 'none', 
                            fontWeight: '600'
                        }}
                    >
                        Join Team
                    </Link>
                    
                    {/* CTA Rápido (Este sigue siendo un enlace externo normal) */}
                    <a
                        href="https://wa.me/6476063974"
                        className="cta-button header-cta primary-cta"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={ctaStyle}
                    >
                        Contact Us
                    </a>
                </nav>
            </div>
        </header>
    );
};

export default Header;