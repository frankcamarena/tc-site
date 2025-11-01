// src/components/Testimonials.jsx

import React from 'react';

// Datos de ejemplo para 3 testimonios
const TESTIMONIALS_DATA = [
  {
    quote: "Top Cleaning exceeded all expectations! The deep clean was incredible, and the house sparkled. Booking was super fast and easy with their online tool.",
    name: "Sarah M.",
    source: "Google Reviews",
    rating: '★★★★★'
  },
  {
    quote: "The fixed pricing is a game-changer—no surprises! Our bi-weekly cleaner is always punctual and thorough. Highly recommend their service in the Toronto area.",
    name: "David K.",
    source: "NextDoor",
    rating: '★★★★★'
  },
  {
    quote: "We used Top Cleaning for a move-out service, and they were meticulous. It passed the landlord's inspection with flying colors. Worth every penny!",
    name: "Jessica P.",
    source: "Direct Client",
    rating: '★★★★★'
  }
];

// Componente para una tarjeta de testimonio
const TestimonialCard = ({ quote, name, source, rating }) => {
  return (
    <div className="testimonial-card">
      <div className="rating" style={{ color: 'var(--color-yellow-accent)', fontSize: '1.4em', marginBottom: '10px' }}>
        {rating}
      </div>
      <p className="quote-text" style={{ fontStyle: 'italic', fontSize: '1.1em', marginBottom: '15px', color: 'var(--color-text-dark)' }}>
        "{quote}"
      </p>
      <div className="client-info">
        <strong style={{ color: 'var(--color-navy)' }}>{name}</strong> 
        <span style={{ display: 'block', fontSize: '0.85em', color: '#666' }}>— {source}</span>
      </div>
    </div>
  );
};

const Testimonials = () => {
  return (
    <section className="testimonials-section" style={{ padding: '80px 0', backgroundColor: '#F9F9F9' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <h2 style={{ color: 'var(--color-navy)', fontSize: '2.5em', marginBottom: '50px' }}>
          What Our Clients Say
        </h2>
        
        <div className="testimonials-grid">
          {TESTIMONIALS_DATA.map((testimonial, index) => (
            <TestimonialCard 
              key={index} 
              quote={testimonial.quote}
              name={testimonial.name}
              source={testimonial.source}
              rating={testimonial.rating}
            />
          ))}
        </div>
        
        {/* CTA sutil al final de la sección */}
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
    </section>
  );
};

export default Testimonials;