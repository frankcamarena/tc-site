// src/components/MainContent.jsx

import React from 'react';
import Hero from './Hero'; 
import ValueProposition from './ValueProposition'; 
import ServiceChecklist from './ServiceChecklist'; 
import ScrollingTestimonials from './ScrollingTestimonials';

const MainContent = () => {
    return (
        <main>
            {/* 2. Sección Principal / Cotizador */}
            <Hero /> 
            
            {/* 3. Propuesta de Valor (3 Beneficios Clave) */}
            <ValueProposition /> 
            
            {/* 4. Lista de Servicios con Pestañas (Service Checklist) */}
            <ServiceChecklist />
            
            {/* 5. Testimonios con Scrolling */}
            <ScrollingTestimonials /> 
        </main>
    );
};

export default MainContent;