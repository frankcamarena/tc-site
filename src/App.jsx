// src/App.jsx

import React from 'react';
// IMPORTANTE: Cambiamos de nuevo a BrowserRouter para URLs limpias y SEO
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 

// Importación de estilos globales
import './styles/global.css'; 

// Importación de componentes de la estructura
import Header from './components/Header';
import Footer from './components/Footer'; 
import MainContent from './components/MainContent'; 
import JoinTeam from './components/JoinTeam';       


// Componente que maneja la lógica de las rutas
const AppRouter = () => {
    // El Header debe usar <Link to="/..."> para la navegación interna
    
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

// Componente principal que envuelve el BrowserRouter
function App() {
    return (
        // Usamos BrowserRouter para URLs limpias (sin #).
        // Depende de public/404.html para funcionar en GitHub Pages.
        <BrowserRouter>
            <AppRouter />
        </BrowserRouter>
    );
}

export default App;