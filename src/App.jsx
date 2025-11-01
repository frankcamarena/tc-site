// src/App.jsx

import React, { useState } from 'react';
// Importación de estilos globales (contiene variables de color y CSS de los componentes)
import './styles/global.css'; 

// Importación de componentes de la estructura
import Header from './components/Header';
import Footer from './components/Footer'; 
// Nuevo componente que agrupa toda la página principal
import MainContent from './components/MainContent'; 
// Nuevo componente para la página de postulación
import JoinTeam from './components/JoinTeam'; 


function App() {
    // Estado para saber qué página mostrar. El valor inicial es 'home'.
    const [currentPage, setCurrentPage] = useState('home'); 

    // Función para cambiar la página que se pasa al Header
    const navigateTo = (page) => {
        setCurrentPage(page);
        // Opcional: Desplazarse al inicio de la página al cambiar
        window.scrollTo(0, 0); 
    };

    return (
        <div className="App">
            {/* 1. Barra de Navegación (Pasa la función de navegación) */}
            <Header navigateTo={navigateTo} />
            
            {/* 2. Contenido Principal - Renderizado Condicional */}
            {currentPage === 'home' && <MainContent />} 
            {currentPage === 'joinTeam' && <JoinTeam />}
            
            {/* 3. Pie de página */}
            <Footer />
        </div>
    );
}

export default App;