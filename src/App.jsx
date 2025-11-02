// src/App.jsx

import React from 'react';
// IMPORTANTE: Usamos HashRouter para máxima compatibilidad con GitHub Pages
import { HashRouter, Routes, Route } from 'react-router-dom'; 

// Importación de estilos globales
import './styles/global.css'; 

// Importación de componentes de la estructura
import Header from './components/Header';
import Footer from './components/Footer'; 
import MainContent from './components/MainContent'; 
import JoinTeam from './components/JoinTeam';       


// Componente que maneja la lógica de las rutas
const AppRouter = () => {
    // Nota: El Header ya no necesita la prop navigateTo. Asumimos que usa <Link to="/...">
    
    return (
        <div className="App">
            
            {/* 1. Barra de Navegación (Global) */}
            <Header />
            
            {/* 2. Definición del Contenido Principal y las Rutas */}
            <Routes>
                
                {/* Ruta principal: / */}
                <Route 
                    path="/" 
                    element={<MainContent />} 
                />
                
                {/* Ruta para "Join Team": /joinTeam */}
                <Route 
                    path="/joinTeam" 
                    element={<JoinTeam />} 
                />

                {/* Ruta de 404/Fallback: Muestra la página principal para cualquier otra ruta */}
                <Route 
                    path="*" 
                    element={<MainContent />} 
                />
                
            </Routes>
            
            {/* 3. Pie de página (Global) */}
            <Footer />
        </div>
    );
}

// Componente principal que envuelve el HashRouter
function App() {
    return (
        // Usar HashRouter garantiza que el enrutamiento funcione sin problemas en GitHub Pages.
        <HashRouter>
            <AppRouter />
        </HashRouter>
    );
}

export default App;