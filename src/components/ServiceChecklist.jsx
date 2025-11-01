// src/components/ServiceChecklist.jsx

import React, { useState } from 'react';
import { CHECKLIST_DATA } from '../data/ChecklistData'; // Asegúrate de crear este archivo

const ServiceChecklist = () => {
  // Estado para la pestaña activa
  const [activeTab, setActiveTab] = useState('standard'); 
  
  // Obtenemos los datos de la pestaña activa
  const currentChecklist = CHECKLIST_DATA[activeTab];

  const tabKeys = Object.keys(CHECKLIST_DATA);
  const tabNames = {
    standard: 'Standard Clean',
    deep: 'Deep Clean',
    moveInOut: 'Move In/Out Clean'
  };

  // Ícono de checkmark simple
  const CheckIcon = () => (
    <span style={{ color: 'var(--color-navy)', marginRight: '10px', fontWeight: 'bold' }}>✓</span>
  );

  return (
    <section className="checklist-section" style={{ padding: '80px 0'}}>
      <div className="container">
        
        <h2 style={{ color: 'var(--color-navy)', fontSize: '2.5em', textAlign: 'center', marginBottom: '40px' }}>
          What's Included in Your Clean?
        </h2>

        {/* CONTENEDOR DE PESTAÑAS (TABS) */}
        <div className="tabs-container">
          <div className="tab-buttons-group">
            {tabKeys.map(key => (
              <button
                key={key}
                className={`tab-button ${activeTab === key ? 'active' : ''}`}
                onClick={() => setActiveTab(key)}
              >
                {tabNames[key]}
              </button>
            ))}
          </div>

          {/* CONTENIDO DEL CHECKLIST */}
          <div className="checklist-content-box">
            <h3 style={{ color: 'var(--color-navy)', marginBottom: '20px' }}>
              {currentChecklist.title}
            </h3>
            
            <div className="checklist-grid">
              {currentChecklist.list.map((category, catIndex) => (
                <div key={catIndex} className="checklist-category-card">
                  <h4 style={{ color: 'var(--color-navy)', borderBottom: '2px solid var(--color-yellow-accent)', paddingBottom: '5px', marginBottom: '10px' }}>
                    {category.category}
                  </h4>
                  <ul className="checklist-list">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="checklist-item">
                        <CheckIcon />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            
            {/* Nota del servicio */}
            <p className="checklist-note" style={{ marginTop: '30px', padding: '15px', backgroundColor: 'var(--color-lavender)', borderRadius: '5px', borderLeft: '5px solid var(--color-navy)' }}>
              **Note:** {currentChecklist.note}
            </p>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceChecklist;