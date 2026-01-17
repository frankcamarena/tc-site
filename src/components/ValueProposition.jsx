// src/components/ValueProposition.jsx

import React from 'react';
import FixedPriceIcon from '../assets/fixid_price.PNG';      
import EcoFriendlyIcon from '../assets/eco_friendly.PNG';  
import GuaranteeIcon from '../assets/100_guarantee.PNG';    

const ValueProposition = () => {
  const values = [
    {
      icon: FixedPriceIcon,
      title: "Fixed Pricing",
      description: "Transparent, upfront quotes. Know exactly what you pay—no hidden fees, ever."
    },
    {
      icon: EcoFriendlyIcon,
      title: "Eco-Friendly, Quality Products",
      description: "We use high-quality, non-toxic, and green products that are safe for your family and pets."
    },
    {
      icon: GuaranteeIcon,
      title: "100% Satisfaction Guarantee",
      description: "If you're not completely thrilled, we come back and make it right—guaranteed."
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        
        {/* Título de la Sección */}
        <h2 className="text-3xl md:text-4xl font-bold text-navy text-center mb-16">
          Why Choose Top Cleaning?
        </h2>
        
        {/* Grid de Valores (1 columna en móvil, 3 en desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {values.map((value, index) => (
            <div 
                key={index} 
                className="flex flex-col items-center text-center p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white border border-gray-50"
            >
              <div className="mb-6 h-24 flex items-center justify-center">
                {/* Imagen del Icono */}
                <img 
                  src={value.icon} 
                  alt={value.title} 
                  className="h-20 w-auto object-contain drop-shadow-sm" 
                /> 
              </div>
              
              <h3 className="text-xl font-bold text-navy mb-3">
                {value.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
        
        {/* Eslogan de Cierre */}
        <p className="text-center mt-16 text-xl md:text-2xl font-medium text-navy italic border-t border-gray-100 pt-8 w-full max-w-2xl mx-auto">
          "The Cleaning that Fits Your Life, Guaranteed."
        </p>

      </div>
    </section>
  );
};

export default ValueProposition;