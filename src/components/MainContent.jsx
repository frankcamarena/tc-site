// src/components/MainContent.jsx

import React from 'react';

// Importación de componentes hijos (Ya migrados a Tailwind)
import Hero from './Hero'; 
import ValueProposition from './ValueProposition'; 
import ServiceChecklist from './ServiceChecklist'; 
import ScrollingTestimonials from './ScrollingTestimonials';

const MainContent = () => {
    return (
        // El tag <main> encapsula el contenido principal de la página.
        // 'flex-grow' es útil si usas Flexbox en App.jsx para empujar el footer hacia abajo.
        // 'w-full' asegura que ocupe todo el ancho.
        <main className="flex-grow w-full bg-transparent">
            
            {/* 1. SECCIÓN HERO (Cotizador y Primera Impresión) */}
            {/* Esta sección ya tiene su propio padding y background, no necesita wrapper extra */}
            <Hero /> 
            
            {/* 2. PROPUESTA DE VALOR (Beneficios Clave) */}
            {/* Agregamos un contenedor opcional si quisieras un fondo específico aquí */}
            <div className="relative">
                <ValueProposition /> 
            </div>
            
            {/* 3. CHECKLIST DE SERVICIOS (Tabs interactivos) */}
            <div className="relative">
                <ServiceChecklist />
            </div>
            
            {/* 4. PRUEBA SOCIAL (Testimonios en Scroll) */}
            <ScrollingTestimonials /> 
            
        </main>
    );
};

export default MainContent;