// src/components/ValueProposition.jsx

import React from 'react';
import FixedPriceIcon from '../assets/fixid_price.PNG';      // Calculadora
import EcoFriendlyIcon from '../assets/eco_friendly.PNG';  // Gota con hoja
import GuaranteeIcon from '../assets/100_guarantee.PNG';    // Escudo con check

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
    <section className="value-section">
      <div className="container">
        <h2 style={{ textAlign: 'center', marginBottom: '50px', color: 'var(--color-navy)', fontSize: '2.5em' }}>
          Why Choose Top Cleaning?
        </h2>
        
        <div className="value-grid">
          {values.map((value, index) => (
            <div key={index} className="value-card">
              <div className="value-icon">
                {/* Usamos la imagen importada.
                  El estilo height: '80px' es un ejemplo. Ajusta el tamaño de la imagen 
                  para que se vea bien en el contenedor.
                */}
                <img 
                  src={value.icon} 
                  alt={value.title} 
                  style={{ height: '80px', width: 'auto', marginBottom: '15px' }} 
                /> 
              </div>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </div>
          ))}
        </div>
        
        {/* Recomendación de UX: Añadir un eslogan debajo para reforzar la confianza */}
        <p style={{ textAlign: 'center', marginTop: '60px', fontSize: '1.5em', fontWeight: '500', color: 'var(--color-navy)' }}>
          The Cleaning that Fits Your Life, Guaranteed.
        </p>
      </div>
    </section>
  );
};

export default ValueProposition;