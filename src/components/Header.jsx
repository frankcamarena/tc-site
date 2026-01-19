// src/components/Header.jsx

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient'; // Importamos Supabase para verificar sesión
import Logo from '../assets/Logo_TopCleaning.png'; 

const Header = () => {
    const navigate = useNavigate();
    const [session, setSession] = useState(null);
    
    // TU NÚMERO DE TWILIO (Formato internacional sin el +)
    const TWILIO_NUMBER = "12494683100"; 

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

    // --- LÓGICA SMART CONTACT (SMS en Móvil / WhatsApp en PC) ---
    const handleContactClick = (e) => {
        e.preventDefault();
        
        // Mensaje inicial para romper el hielo
        const message = "Welcome to Top Cleaning. How can we help you?";
        const encodedMessage = encodeURIComponent(message);
        
        // Detectar si es dispositivo móvil
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

        if (isMobile) {
            // En celular: Abre la app de SMS
            // iOS usa '&' para el cuerpo, Android suele usar '?'
            const separator = navigator.userAgent.match(/iPhone|iPad/i) ? '&' : '?';
            window.location.href = `sms:+${TWILIO_NUMBER}${separator}body=${encodedMessage}`;
        } else {
            // En computadora: Abre WhatsApp Web (es más cómodo para desktop)
            window.open(`https://wa.me/${TWILIO_NUMBER}?text=${encodedMessage}`, '_blank');
        }
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
                    
                    {/* CTA Rápido (Smart SMS Button) - Siempre visible */}
                    <button
                        onClick={handleContactClick}
                        className="btn-cta bg-yellow-accent text-navy text-sm px-5 py-2.5 shadow-sm hover:shadow-md hover:bg-yellow-400 font-bold rounded cursor-pointer"
                    >
                        Contact Us
                    </button>
                </nav>
            </div>
        </header>
    );
};

export default Header;