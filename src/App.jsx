// src/App.jsx

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Importaciones de React Router

// Importación de estilos globales
import './styles/global.css'; 

// Importación de componentes de la estructura
import Header from './components/Header';
import Footer from './components/Footer'; 
// Componentes de Contenido
import MainContent from './components/MainContent'; // Contenido de la página principal (Home)
import JoinTeam from './components/JoinTeam';       // Componente de la página "Join Team"


function App() {
    /* Nota Importante:
    1. Se elimina el estado 'currentPage' y la función 'navigateTo'.
    2. Ahora usamos <BrowserRouter> para manejar las URLs limpias.
    3. Usamos <Routes> para definir qué componente se muestra en cada 'path'.
    4. El componente <Header> se coloca FUERA de <Routes> para que se muestre en todas las rutas.
    */
    
    return (
        <BrowserRouter>
            <div className="App">
                
                {/* 1. Barra de Navegación (Ahora usa Hooks de React Router internamente para navegar) */}
                <Header />
                
                {/* 2. Definición del Contenido Principal y las Rutas */}
                <Routes>
                    
                    {/* Ruta para la página principal: top-cleaning.ca/ */}
                    <Route 
                        path="/" 
                        element={<MainContent />} 
                    />
                    
                    {/* Ruta para la página "Join Team": top-cleaning.ca/joinTeam */}
                    <Route 
                        path="/joinTeam" 
                        element={<JoinTeam />} 
                    />

                    {/* Manejo de Rutas no encontradas (Opcional: puedes crear un componente 404) */}
                    {/* Por ahora, si la ruta no existe, simplemente podrías mostrar el contenido principal si lo deseas: */}
                    <Route 
                        path="*" 
                        element={<MainContent />} 
                    />
                    
                </Routes>
                
                {/* 3. Pie de página (Global) */}
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;