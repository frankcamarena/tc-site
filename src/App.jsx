// src/App.jsx

import React, { useEffect } from 'react';
// Importamos useNavigate para la redirección programática
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'; 

// Importación de estilos globales
import './styles/global.css'; 

// Importación de componentes de la estructura
import Header from './components/Header';
import Footer from './components/Footer'; 
import MainContent from './components/MainContent'; 
import JoinTeam from './components/JoinTeam';       


// Componente que maneja la lógica de redirección, debe estar dentro de BrowserRouter
const AppRouter = () => {
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
        <BrowserRouter basename="/">
            <AppRouter />
        </BrowserRouter>
    );
}

export default App;