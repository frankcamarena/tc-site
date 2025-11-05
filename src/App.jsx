// src/App.jsx

import React, { useEffect } from 'react'; 
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'; 

// Importación de estilos globales
import './styles/global.css'; 

// Importación de componentes de la estructura (ajusta estas rutas si son diferentes)
import Header from './components/Header';
import Footer from './components/Footer'; 
import MainContent from './components/MainContent'; // Componente de la página principal
import JoinTeam from './components/JoinTeam';       // Componente de la página /joinTeam


// Componente principal que contiene la lógica de enrutamiento
const AppRouter = () => {
    const navigate = useNavigate();

    // Lógica para manejar la redirección de GitHub Pages (404.html)
    // Se ejecuta solo una vez al cargar la aplicación.
    useEffect(() => {
        // 1. Revisa si hay una URL guardada por el script 404.html
        if (sessionStorage.redirect) {
            
            let redirectPath = null;
            const fullUrl = sessionStorage.redirect;
            
            // Lógica de parsing robusta con try/catch para manejar URLs sin protocolo
            // Esto asegura que podemos extraer la ruta correcta, sea https://.../joinTeam
            // o solo /joinTeam
            try {
                // Intenta parsear la URL completa
                const urlObject = new URL(fullUrl);
                redirectPath = urlObject.pathname;
            } catch (e) {
                // Si falla (porque no tiene http/https), asumimos que ya es la ruta
                // y limpiamos cualquier posible origen que se haya colado.
                const pathOnly = fullUrl.replace(/^(http|https):\/\/[^/]+/, '');
                redirectPath = pathOnly;
            }
            
            // 2. Limpia el sessionStorage inmediatamente para evitar redirecciones en cascada
            sessionStorage.removeItem('redirect');

            // 3. Forzamos la navegación a la ruta limpia (ej: /joinTeam)
            // Solo si la ruta no es la raíz.
            if (redirectPath && redirectPath !== '/') {
                // console.log(`Redirigiendo a la ruta original: ${redirectPath}`);
                navigate(redirectPath, { replace: true });
            }
        }
    }, [navigate]);

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
        // Usamos BrowserRouter para URLs limpias (sin #), esencial para SEO.
        <BrowserRouter>
            {/* El AppRouter debe estar dentro del BrowserRouter para usar useNavigate */}
            <AppRouter />
        </BrowserRouter>
    );
}

export default App;