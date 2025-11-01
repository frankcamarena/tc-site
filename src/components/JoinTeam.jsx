import React, { useState } from 'react';
import { workerTestimonials, faqData } from '../data/WorkersData';
import Checkmark from '../assets/100_guarantee.PNG'; // Usaremos el checkmark para los beneficios
import MissionImage from '../assets/cleaner_04.PNG'; // Imagen de ejemplo para Misión
import BenefitsImage from '../assets/cleaner_02.PNG'; // Imagen de ejemplo para Beneficios
import FAQImage from '../assets/FAQ.PNG'; // Imagen de ejemplo para FAQ

// ----------------------------------------------------------------
// Componente Reutilizable: Tarjeta de Testimonio de Trabajador
// ----------------------------------------------------------------
const WorkerTestimonialCard = ({ testimonial }) => (
    <div className="testimonial-card worker-card">
        <div className="testimonial-header">
            <div className="testimonial-avatar">{testimonial.initial}</div>
        </div>
        <p className="worker-quote">"{testimonial.quote}"</p>
        <p className="worker-author">
            — **{testimonial.name}**
            <br />
            <span className="worker-title">{testimonial.title}</span>
        </p>
    </div>
);

// ----------------------------------------------------------------
// Componente Reutilizable: Item de FAQ con Toggle
// ----------------------------------------------------------------
const FAQItem = ({ faq, isActive, toggle }) => (
    <div className={`faq-item ${isActive ? 'active' : ''}`}>
        <button onClick={toggle} className="faq-question">
            {faq.question}
            <span>{isActive ? '—' : '+'}</span>
        </button>
        {isActive && <div className="faq-answer">{faq.answer}</div>}
    </div>
);


// ----------------------------------------------------------------
// Componente Principal: JoinTeam
// ----------------------------------------------------------------
const JoinTeam = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="join-team-page">
            <div className="container">
                {/* 1. SECCIÓN DE VIDEO */}
                <section className="video-section">
                    <h2 className="section-title">Residential Cleaning Technician Application</h2>
                    <div className="video-container">
                        <div style={{ position: 'relative', width: '100%', overflow: 'hidden', aspectRatio: '16/9' }}>
                            <iframe 
                                src="https://share.synthesia.io/embeds/videos/3aa77502-2f7d-44ed-a8d1-41e2e5805fd5"
                                loading="lazy"
                                allowFullScreen
                                allow="encrypted-media; fullscreen; microphone;"
                                title="Synthesia video player"
                                style={{
                                    position: 'absolute',
                                    top: '-5%',
                                    left: '-5%',
                                    width: '115%',
                                    height: '115%',
                                    border: 'none',
                                }}
                            ></iframe>
                        </div>
                    </div>
                </section>

                {/* 2. MISIÓN Y VALORES */}
                <section className="mission-values-section section-padding">
                    <div className="two-col-layout">
                        {/* Columna Izquierda: Imagen */}
                        <div className="col-image image-left">
                            <img src={MissionImage} alt="Nuestra Misión y Valores" className="responsive-image" />
                        </div>
                        {/* Columna Derecha: Texto */}
                        <div className="col-text text-right">
                            <h3 className="section-subtitle">Our Mission</h3>
                            <p className="mission-quote">"Service BEYOND Your Expectations — Guaranteed."</p>
                            <p>We go the extra mile for every customer and every teammate. Our business is built on honesty, integrity, and genuine appreciation. We take pride in showing gratitude for our employees’ efforts and our customers’ trust. Every team member contributes unique skills and expertise that make a difference. We celebrate our collective success and the positive impact of our work. Our achievements come from shared values, teamwork, and the dedication that drives us all to grow and be rewarded together.</p>

                            <h3 className="section-subtitle values-title">Our Values</h3>
                            <p>Our values guide everything we do, every single day. If you share these principles, we believe you’ll feel right at home in our company:</p>
                            <ul className="values-list">
                                <li>**Going Above and Beyond** – We always strive to exceed expectations for our clients and teammates.</li>
                                <li>**Integrity** – We act with honesty, fairness, and transparency in all that we do.</li>
                                <li>**Teamwork** – We believe collaboration, respect, and support create a strong foundation for success.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* 3. BENEFICIOS Y RECOMPENSAS */}
                <section className="benefits-section section-padding">
                    <div className="two-col-layout reverse-on-mobile">
                        {/* Columna Izquierda: Texto */}
                        <div className="col-text text-left">
                            <h2 className="section-title">Benefits & Rewards</h2>
                            <p>We value hard work, loyalty, and commitment — and we make sure our team feels appreciated. From financial rewards to time off for personal milestones, we want every team member to feel motivated and valued.</p>
                            
                            <ul className="benefits-list">
                                <li><img src={Checkmark} alt="Check" className="benefit-icon" /> Paid Weekly Every Friday</li>
                                <li><img src={Checkmark} alt="Check" className="benefit-icon" /> Gas Allowance</li>
                                <li><img src={Checkmark} alt="Check" className="benefit-icon" /> Bonuses for Referring Workers or Customers</li>
                                <li><img src={Checkmark} alt="Check" className="benefit-icon" /> Paid Birthday Off</li>
                                <li><img src={Checkmark} alt="Check" className="benefit-icon" /> Holidays Off (Overtime Available If You Work)</li>
                                <li><img src={Checkmark} alt="Check" className="benefit-icon" /> Hourly Pay Increase After 6 Months</li>
                            </ul>
                        </div>
                        {/* Columna Derecha: Imagen */}
                        <div className="col-image image-right">
                            <img src={BenefitsImage} alt="Beneficios y Recompensas" className="responsive-image" />
                        </div>
                    </div>
                </section>

                {/* 4. TESTIMONIOS DE TRABAJADORES */}
                <section className="worker-testimonials-section section-padding">
                    <div className="worker-hero-content text-center">
                        <h2 className="section-title">There’s a reason so many team members love working with us...</h2>
                        <h3 className="section-subtitle">Let us show you why!</h3>
                    </div>

                    <div className="worker-testimonials-grid">
                        {workerTestimonials.map((t, index) => (
                            <WorkerTestimonialCard key={index} testimonial={t} />
                        ))}
                    </div>
                </section>

                {/* 5. CALENDLY (APLICACIÓN) */}
                <section id="calendly-section" className="calendly-section section-padding background-light-gray">
                    <h2 className="section-title text-center">Ready to Apply? Book Your Introduction Call.</h2>
                    {/* Contenedor del widget de Calendly */}
                    <div className="calendly-widget-container">
                        <div 
                            className="calendly-inline-widget" 
                            data-url="https://calendly.com/fgustavocamarena/top-cleaning-meeting" 
                            style={{ minWidth: '320px', height: '700px' }}
                        ></div>
                        <script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async></script>
                    </div>
                </section>
                
                {/* 6. FAQ (PREGUNTAS FRECUENTES) */}
                <section className="faq-section section-padding">
                    <div className="two-col-layout">
                        {/* Columna Izquierda: Preguntas */}
                        <div className="col-faq">
                            <h2 className="section-title">Frequently Asked Questions</h2>
                            <div className="faq-list">
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
                        {/* Columna Derecha: Imagen */}
                        <div className="col-image image-right">
                            <img src={FAQImage} alt="Oficina de reclutamiento" className="responsive-image" />
                        </div>
                    </div>
                    <div className="button-area center-content">
                        <a href="#calendly-section" className="cta-button primary-cta">
                            Join the Team Today!
                        </a>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default JoinTeam;