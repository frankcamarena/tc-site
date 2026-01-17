// src/components/ServiceChecklist.jsx

import React, { useState } from 'react';
import { CHECKLIST_DATA } from '../data/ChecklistData'; 

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

    // Ícono de checkmark con Tailwind
    const CheckIcon = () => (
        <span className="text-navy font-bold mr-2">✓</span>
    );

    return (
        <section className="py-20 bg-transparent">
            <div className="container-custom">
                
                <h2 className="text-3xl md:text-4xl font-bold text-navy text-center mb-10">
                    What's Included in Your Clean?
                </h2>

                {/* CONTENEDOR DE PESTAÑAS (TABS) */}
                <div className="flex flex-col gap-8">
                    
                    {/* Botones de Pestañas */}
                    <div className="flex flex-col sm:flex-row justify-center gap-4 bg-gray-100 p-2 rounded-lg max-w-3xl mx-auto w-full">
                        {tabKeys.map(key => (
                            <button
                                key={key}
                                className={`flex-1 py-3 px-6 rounded font-bold text-lg transition-all duration-300 ${
                                    activeTab === key 
                                    ? 'bg-navy text-white shadow-md' 
                                    : 'text-navy hover:bg-lavender bg-transparent'
                                }`}
                                onClick={() => setActiveTab(key)}
                            >
                                {tabNames[key]}
                            </button>
                        ))}
                    </div>

                    {/* CONTENIDO DEL CHECKLIST */}
                    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                        <h3 className="text-2xl font-bold text-navy mb-6 border-l-4 border-yellow-accent pl-4">
                            {currentChecklist.title}
                        </h3>
                        
                        {/* Grid de Categorías */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {currentChecklist.list.map((category, catIndex) => (
                                <div key={catIndex} className="bg-gray-50 p-6 rounded-lg">
                                    <h4 className="text-lg font-bold text-navy border-b-2 border-yellow-accent pb-2 mb-4">
                                        {category.category}
                                    </h4>
                                    <ul className="space-y-3">
                                        {category.items.map((item, itemIndex) => (
                                            <li key={itemIndex} className="flex items-start text-sm text-gray-700">
                                                <CheckIcon />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                        
                        {/* Nota del servicio */}
                        <div className="mt-8 p-4 bg-lavender/40 rounded-r-lg border-l-4 border-navy text-navy text-sm md:text-base">
                            <span className="font-bold">Note:</span> {currentChecklist.note}
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServiceChecklist;