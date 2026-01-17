// src/App.jsx

import React, { useEffect } from 'react'; 
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'; 

// Importación de estilos globales
import './styles/global.css'; 

// Importación de componentes de la estructura
import Header from './components/Header';
import Footer from './components/Footer'; 
import MainContent from './components/MainContent'; // Componente de la página principal
import JoinTeam from './components/JoinTeam';       // Componente de la página /joinTeam
import Dashboard from './components/Dashboard';     // Componente del Dashboard

// --- NUEVOS IMPORTS DE AUTENTICACIÓN ---
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';

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
            
            // Lógica de parsing robusta
            try {
                const urlObject = new URL(fullUrl);
                redirectPath = urlObject.pathname;
            } catch (e) {
                const pathOnly = fullUrl.replace(/^(http|https):\/\/[^/]+/, '');
                redirectPath = pathOnly;
            }
            
            // 2. Limpia el sessionStorage
            sessionStorage.removeItem('redirect');

            // 3. Forzamos la navegación a la ruta limpia
            if (redirectPath && redirectPath !== '/') {
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

                {/* --- RUTA DE LOGIN (PÚBLICA) --- */}
                <Route 
                    path="/login" 
                    element={<Login />} 
                />

                {/* --- RUTA PROTEGIDA (DASHBOARD) --- */}
                {/* Solo se puede acceder si ProtectedRoute lo permite */}
                <Route 
                    path="/dashboard" 
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    } 
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
        <BrowserRouter>
            <AppRouter />
        </BrowserRouter>
    );
}

export default App;