// src/components/ScrollingTestimonials.jsx

import React from 'react';
import testimonials from '../data/TestimonialsData';

// Función para renderizar estrellas
const renderStars = (rating) => {
  return '⭐'.repeat(rating);
};

// Componente para una tarjeta de testimonio
const TestimonialCard = ({ t, key }) => (
    <div key={key} className="testimonial-card">
        <div className="testimonial-header">
            <div className="testimonial-avatar">{t.initials}</div>
            <div>
                <div className="testimonial-rating">{renderStars(t.rating)}</div>
                <p className="testimonial-source">Source: {t.source}</p>
            </div>
        </div>
        <p className="testimonial-text">"{t.text}"</p>
        <p className="testimonial-author"><strong>— {t.name}</strong></p>
    </div>
);


const ScrollingTestimonials = () => {
  // CLAVE: Creamos una lista de testimonios repetida 3 veces para asegurar la longitud.
  const allTestimonials = [
    ...testimonials.map((t, i) => ({ ...t, key: `a-${i}` })),
    ...testimonials.map((t, i) => ({ ...t, key: `b-${i}` })),
    ...testimonials.map((t, i) => ({ ...t, key: `c-${i}` })),
  ];

  return (
    <section className="testimonials-section">
      <div className="container">
        <h2 style={{ textAlign: 'center', color: 'var(--color-navy)', marginBottom: '40px' }}>
          What Our Clients Say
        </h2>
        
        {/* Contenedor del Carrusel Rotatorio */}
        {/* Usamos el mismo nombre de clase, pero con CSS simplificado */}
        <div className="scrolling-container">
          
          {/* Única pista (testimonial-track) */}
          <div className="testimonial-track track-single">
            {allTestimonials.map((t) => (
                <TestimonialCard t={t} key={t.key} />
            ))}
          </div>
        </div>
        
        {/* CTA al final - Centrado */}
        <div style={{ textAlign: 'center', marginTop: '40px', paddingBottom: '40px' }}>
            <a 
                href="#quote-section" 
                className="cta-button"
                style={{ 
                    marginTop: '40px',
                    display: 'inline-block', 
                    backgroundColor: 'var(--color-yellow-accent)', 
                    color: 'var(--color-navy)'
                }}
            >
            Get Your Instant Quote Now
            </a>
        </div>
      </div>
    </section>
  );
};

export default ScrollingTestimonials;