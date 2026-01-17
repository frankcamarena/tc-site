// src/components/ScrollingTestimonials.jsx

import React from 'react';
import testimonials from '../data/TestimonialsData';

// Función para renderizar estrellas (Sin cambios)
const renderStars = (rating) => {
  return '⭐'.repeat(rating);
};

// Componente para una tarjeta de testimonio
const TestimonialCard = ({ t }) => (
    <div className="min-w-[320px] md:min-w-[380px] w-[320px] md:w-[380px] bg-white p-8 rounded-xl shadow-lg border-t-4 border-yellow-accent shrink-0 mx-4 flex flex-col justify-between">
        <div>
            <div className="flex items-center gap-4 mb-6">
                {/* Avatar */}
                <div className="w-12 h-12 bg-navy text-white rounded-full flex items-center justify-center font-bold text-lg shrink-0 shadow-sm">
                    {t.initials}
                </div>
                
                {/* Rating y Fuente */}
                <div>
                    <div className="text-yellow-400 text-sm tracking-widest mb-1">
                        {renderStars(t.rating)}
                    </div>
                    <p className="text-xs text-gray-400 italic">
                        Source: <span className="font-semibold text-gray-500">{t.source}</span>
                    </p>
                </div>
            </div>
            
            {/* Texto del testimonio */}
            <p className="text-gray-600 italic leading-relaxed mb-6">
                "{t.text}"
            </p>
        </div>

        {/* Autor */}
        <p className="text-navy font-bold text-right border-t border-gray-100 pt-4">
            — {t.name}
        </p>
    </div>
);

const ScrollingTestimonials = () => {
  // CLAVE: Triplicamos la lista para asegurar un loop infinito suave
  // Esto funciona con la animación configurada en tailwind.config.js que mueve el track un 33.33%
  const allTestimonials = [
    ...testimonials.map((t, i) => ({ ...t, uniqueKey: `a-${i}` })),
    ...testimonials.map((t, i) => ({ ...t, uniqueKey: `b-${i}` })),
    ...testimonials.map((t, i) => ({ ...t, uniqueKey: `c-${i}` })),
  ];

  return (
    <section className="py-20 bg-transparent overflow-hidden">
      <div className="w-full"> {/* Usamos full width para el carrusel, el texto tiene container */}
        
        {/* Título */}
        <div className="container-custom text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy">
                What Our Clients Say
            </h2>
            <div className="w-20 h-1 bg-yellow-accent mx-auto mt-4 rounded-full"></div>
        </div>
        
        {/* Contenedor del Carrusel Rotatorio */}
        {/* 'group' permite detectar el hover en el padre para pausar el hijo */}
        <div className="relative w-full overflow-hidden group py-4">
          
          {/* Gradients laterales para efecto de desvanecimiento (Opcional, se ve pro) */}
          <div className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-[#f0f4f8] to-transparent pointer-events-none hidden md:block"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-[#f0f4f8] to-transparent pointer-events-none hidden md:block"></div>

          {/* Pista de testimonios (Track) */}
          {/* animate-scroll-left: Definida en tailwind.config.js */}
          {/* group-hover: Pausa la animación al pasar el mouse */}
          <div className="flex w-max animate-scroll-left group-hover:[animation-play-state:paused]">
            {allTestimonials.map((t) => (
                <TestimonialCard t={t} key={t.uniqueKey} />
            ))}
          </div>
        </div>
        
        {/* CTA al final */}
        <div className="text-center mt-12 px-4">
            <a 
                href="#quote-section" 
                className="btn-cta bg-yellow-accent text-navy text-lg shadow-md hover:shadow-xl hover:-translate-y-1 transform transition-all duration-300 inline-block"
            >
                Get Your Instant Quote Now
            </a>
        </div>

      </div>
    </section>
  );
};

export default ScrollingTestimonials;