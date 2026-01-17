// src/components/JoinTeam.jsx

import React, { useState } from 'react';
import ApplicationForm from './ApplicationForm'; // <--- IMPORTAMOS EL FORMULARIO FILTRO
import { workerTestimonials, faqData } from '../data/WorkersData';
import Checkmark from '../assets/100_guarantee.PNG'; 
import MissionImage from '../assets/cleaner_04.PNG'; 
import BenefitsImage from '../assets/cleaner_02.PNG'; 
import FAQImage from '../assets/FAQ.PNG'; 

// --- Componentes Reutilizables (Sin cambios) ---

const WorkerTestimonialCard = ({ testimonial }) => (
    <div className="bg-white p-8 rounded-lg shadow-sm border-t-4 border-navy text-center transition-transform hover:-translate-y-1 hover:shadow-md">
        <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-navy text-white rounded-full flex items-center justify-center font-bold text-xl">
                {testimonial.initial}
            </div>
        </div>
        <p className="italic text-text-dark mb-4 text-sm md:text-base">"{testimonial.quote}"</p>
        <div className="text-center">
            <p className="font-bold text-navy">— {testimonial.name}</p>
            <span className="text-xs text-text-muted uppercase tracking-wide">{testimonial.title}</span>
        </div>
    </div>
);

const FAQItem = ({ faq, isActive, toggle }) => (
    <div className="border-b border-gray-200">
        <button 
            onClick={toggle} 
            className={`w-full flex justify-between items-center py-5 text-left font-semibold transition-colors duration-200 ${
                isActive ? 'text-yellow-accent' : 'text-navy hover:text-yellow-accent'
            }`}
        >
            <span className="text-lg">{faq.question}</span>
            <span className={`text-2xl transform transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`}>
                {isActive ? '−' : '+'}
            </span>
        </button>
        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isActive ? 'max-h-96 opacity-100 mb-5' : 'max-h-0 opacity-0'}`}>
            <p className="text-text-muted leading-relaxed text-sm md:text-base pr-4">
                {faq.answer}
            </p>
        </div>
    </div>
);

// --- Componente Principal ---

const JoinTeam = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="bg-transparent">
            
            {/* 1. SECCIÓN DE VIDEO (Con Zoom para ocultar logo) */}
            <section className="py-16 md:py-24 bg-white/50">
                <div className="container-custom">
                    <h2 className="text-3xl md:text-4xl font-bold text-navy text-center mb-10">
                        Residential Cleaning Technician Application
                    </h2>
                    <div className="max-w-4xl mx-auto bg-white p-2 rounded-xl shadow-lg">
                        <div className="aspect-video w-full rounded-lg overflow-hidden relative">
                            {/* CAMBIO: Zoom aplicado con -top-5% -left-5% w-[110%] h-[110%] */}
                            <iframe 
                                src="https://share.synthesia.io/embeds/videos/3aa77502-2f7d-44ed-a8d1-41e2e5805fd5"
                                loading="lazy"
                                allowFullScreen
                                allow="encrypted-media; fullscreen; microphone;"
                                title="Synthesia video player"
                                className="absolute -top-[5%] -left-[5%] w-[115%] h-[115%] border-none"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. MISIÓN Y VALORES */}
             <section className="py-20">
                <div className="container-custom grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="relative group">
                        <div className="absolute -inset-2 bg-yellow-accent rounded-lg opacity-20 group-hover:opacity-40 transition duration-300 blur-sm"></div>
                        <img src={MissionImage} alt="Nuestra Misión y Valores" className="relative w-full h-auto rounded-lg shadow-xl" />
                    </div>
                    <div className="text-left">
                        <h3 className="text-yellow-accent text-xl font-bold mb-4 uppercase tracking-wider">Our Mission</h3>
                        <p className="text-2xl font-serif italic text-navy mb-6">"Service BEYOND Your Expectations — Guaranteed."</p>
                        <p className="text-text-muted mb-8 leading-relaxed">
                            We go the extra mile for every customer and every teammate. Our business is built on honesty, integrity, and genuine appreciation.
                        </p>
                        <h3 className="text-navy text-xl font-bold mb-4 border-b-2 border-yellow-accent inline-block pb-1">Our Values</h3>
                        <ul className="space-y-3">
                            {[
                                { title: "Going Above and Beyond", desc: "We strive to exceed expectations." },
                                { title: "Integrity", desc: "We act with honesty and transparency." },
                                { title: "Teamwork", desc: "Collaboration creates success." }
                            ].map((val, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                    <span className="text-yellow-accent text-xl mt-0.5">•</span>
                                    <span className="text-navy font-medium"><strong className="text-navy">{val.title}</strong> – {val.desc}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* 3. BENEFICIOS */}
            <section className="py-20 bg-lavender/30">
                <div className="container-custom grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                     <div className="order-2 md:order-1 text-left">
                        <h2 className="text-3xl font-bold text-navy mb-4">Benefits & Rewards</h2>
                        <div className="w-16 h-1 bg-yellow-accent mb-6"></div>
                        <p className="text-text-dark mb-8">We value hard work, loyalty, and commitment.</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-2">
                            {["Paid Weekly Every Friday", "Gas Allowance", "Referral Bonuses", "Paid Birthday Off", "Holidays Off", "Hourly Pay Increase (6 Mo)"].map((benefit, idx) => (
                                <div key={idx} className="flex items-center gap-3 p-2 rounded hover:bg-white/50 transition-colors">
                                    <img src={Checkmark} alt="Check" className="w-6 h-6 drop-shadow-sm" />
                                    <span className="text-navy font-semibold text-sm">{benefit}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="order-1 md:order-2">
                        <img src={BenefitsImage} alt="Beneficios y Recompensas" className="w-full h-auto rounded-lg shadow-xl border-4 border-white" />
                    </div>
                </div>
            </section>

            {/* 4. TESTIMONIOS */}
            <section className="py-20">
                <div className="container-custom">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <h2 className="text-3xl font-bold text-navy mb-2">Why our team loves us</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {workerTestimonials.map((t, index) => (
                            <WorkerTestimonialCard key={index} testimonial={t} />
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. APLICACIÓN (GATEKEEPER FORM) - REEMPLAZADO */}
            <section id="calendly-section" className="py-20 bg-gray-50">
                <div className="container-custom">
                    <h2 className="text-2xl md:text-3xl font-bold text-navy text-center mb-4">
                        Ready to Apply?
                    </h2>
                    <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
                        Complete the form below. If you meet our current requirements, you'll be able to schedule your interview instantly.
                    </p>
                    
                    {/* Renderizamos el Formulario Filtro */}
                    <ApplicationForm />
                </div>
            </section>
            
            {/* 6. FAQ (PREGUNTAS FRECUENTES) - BOTÓN CORREGIDO */}
            <section className="py-20">
                <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    
                    {/* Izquierda: Preguntas */}
                    <div>
                        <h2 className="text-3xl font-bold text-navy mb-8">Frequently Asked Questions</h2>
                        <div className="border-t border-gray-200">
                            {faqData.map((faq, index) => (
                                <FAQItem 
                                    key={faq.id} 
                                    faq={faq} 
                                    isActive={activeIndex === index} 
                                    toggle={() => toggleFAQ(index)} 
                                />
                            ))}
                        </div>
                    </div>

                    {/* Derecha: Imagen y Botón Centrado */}
                    <div className="hidden lg:block relative sticky top-24">
                        <div className="absolute inset-0 bg-navy/10 transform translate-x-4 translate-y-4 rounded-lg -z-10"></div>
                        <img src={FAQImage} alt="Oficina" className="w-full h-auto rounded-lg shadow-lg" />
                        
                        
                    </div>
                </div>
                
                {/* Botón Móvil */}
                {/* CAMBIO: Flexbox para centrar el botón */}
                <div className="mt-8 flex flex-col items-center justify-center text-center">
                    <a href="#calendly-section" className="btn-cta bg-yellow-accent text-navy text-base hover:shadow-lg hover:-translate-y-0.5 transform transition-all">
                        Join the Team Today!
                    </a>
                </div>
            </section>

        </div>
    );
};

export default JoinTeam;