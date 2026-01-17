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
    <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-yellow-accent transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl flex flex-col justify-between">
      
      {/* Estrellas */}
      <div className="text-yellow-accent text-2xl mb-4 tracking-widest">
        {rating}
      </div>
      
      {/* Cita */}
      <p className="text-lg italic text-gray-600 mb-6 leading-relaxed">
        "{quote}"
      </p>
      
      {/* Info Cliente */}
      <div className="border-t border-gray-100 pt-4 mt-auto">
        <strong className="text-navy text-lg block">{name}</strong> 
        <span className="text-xs text-gray-400 font-semibold uppercase tracking-wide">
             — {source}
        </span>
      </div>
    </div>
  );
};

const Testimonials = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container-custom text-center">
        
        {/* Título de Sección */}
        <h2 className="text-3xl md:text-4xl font-bold text-navy mb-12">
          What Our Clients Say
        </h2>
        
        {/* Grid de Testimonios (1 col móvil, 3 cols desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
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
            className="btn-cta bg-yellow-accent text-navy text-lg font-bold py-3 px-8 rounded shadow-md hover:shadow-lg inline-block transition-transform hover:-translate-y-0.5"
        >
            Get Your Instant Quote Now
        </a>
      </div>
    </section>
  );
};

export default Testimonials;