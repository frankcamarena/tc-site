// src/components/Header.jsx

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient'; // Importamos Supabase para verificar sesión
import Logo from '../assets/Logo_TopCleaning.png'; 

const Header = () => {
    const navigate = useNavigate();
    const [session, setSession] = useState(null);

    // --- LÓGICA DE SESIÓN (EL CEREBRO DEL HEADER) ---
    useEffect(() => {
        // 1. Verificar si hay alguien logueado al cargar
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        // 2. Escuchar cambios en tiempo real (Login o Logout)
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    // --- FUNCIÓN DE LOGOUT ---
    const handleLogout = async () => {
        await supabase.auth.signOut(); // Cierra sesión en Supabase
        navigate('/'); // Te manda al home
    };

    return (
        <header className="bg-navy py-4 shadow-md w-full sticky top-0 z-50">
            <div className="container-custom flex justify-between items-center">
                
                {/* LOGO - Link a home */}
                <Link 
                    to="/" 
                    className="flex items-center cursor-pointer hover:opacity-90 transition-opacity"
                >
                    <img 
                        src={Logo} 
                        alt="Top Cleaning Logo" 
                        className="h-[55px] w-auto" 
                    />
                </Link>

                {/* Navegación */}
                <nav className="flex items-center gap-5">
                    
                    {/* Enlace "Join Team" (Siempre visible) */}
                    <Link 
                        to="/joinTeam"
                        className="text-white font-semibold no-underline hover:text-yellow-accent transition-colors duration-200"
                    >
                        Join Team
                    </Link>

                    {/* --- LÓGICA CONDICIONAL: ¿ESTÁ LOGUEADO? --- */}
                    {session ? (
                        // OPCIÓN A: ADMIN LOGUEADO (Dashboard + Logout)
                        <div className="flex items-center gap-5">
                            <Link 
                                to="/dashboard" 
                                className="text-white font-bold hover:text-white transition-colors"
                            >
                                Dashboard
                            </Link>
                            
                            <button 
                                onClick={handleLogout}
                                className="text-white font-semibold no-underline hover:text-red-400 font-medium transition-colors"
                            >
                                Log Out
                            </button>
                        </div>
                    ) : (
                        // OPCIÓN B: VISITANTE (Link discreto de Login)
                        <Link 
                            to="/login" 
                            className="text-white font-semibold no-underline hover:text-gray-300 transition-colors"
                        >
                            Staff Login
                        </Link>
                    )}
                    
                    {/* CTA Rápido (WhatsApp) - Siempre visible */}
                    <a
                        href="https://wa.me/6476063974"
                        className="btn-cta bg-yellow-accent text-navy text-sm px-5 py-2.5 shadow-sm hover:shadow-md hover:bg-yellow-400 font-bold rounded"
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