// src/components/Hero.jsx

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import heroImage from '../assets/hero_image.png';

const Hero = () => {
    // --- ESTADO Y LÓGICA (Sin cambios) ---
    const [cleaningType, setCleaningType] = useState('deep');
    const [frequency, setFrequency] = useState('bi-weekly');
    const [bedrooms, setBedrooms] = useState(1);
    const [bathrooms, setBathrooms] = useState(1);
    const [halfBaths, setHalfBaths] = useState(0);
    const [squareFeet, setSquareFeet] = useState('1000-1500');
    const [currentPrice, setCurrentPrice] = useState('150.00');

    const updateCount = (state, setState, delta, min = 0) => {
        setState(Math.max(min, state + delta));
    };

    const calculateRawPrice = useCallback(() => {
        const BASE_PRICE = 50;
        const DEEP_CLEAN_SURCHARGE = 50;
        const PRICE_PER_BEDROOM = 25;
        const PRICE_PER_BATHROOM = 30;
        const PRICE_PER_HALF_BATH = 15;
        const MIN_PRICE = 150;

        let total = BASE_PRICE;
        if (cleaningType === 'deep') total += DEEP_CLEAN_SURCHARGE;
        total += (bedrooms * PRICE_PER_BEDROOM) + (bathrooms * PRICE_PER_BATHROOM) + (halfBaths * PRICE_PER_HALF_BATH);

        switch (squareFeet) {
            case '1000-1500': total += 20; break;
            case '1500-2000': total += 35; break;
            case '2000-2500': total += 50; break;
            case '2500+': total += 65; break;
            default: break;
        }

        if (frequency === 'weekly') total *= 0.85;
        else if (frequency === 'monthly') total *= 1.05;

        if (total < MIN_PRICE) total = MIN_PRICE;
        return Math.round(total);
    }, [cleaningType, frequency, bedrooms, bathrooms, halfBaths, squareFeet]);

    const rawCalculatedPrice = useMemo(() => calculateRawPrice(), [calculateRawPrice]);

    useEffect(() => {
        setCurrentPrice(rawCalculatedPrice.toFixed(2));
    }, [rawCalculatedPrice]);

    const handleBookNow = () => {
        const formattedSqft = squareFeet.replace('-', ' to ');
        const formattedType = cleaningType === 'deep' ? 'Deep Clean' : 'Standard Clean';
        const formattedFreq = frequency.charAt(0).toUpperCase() + frequency.slice(1).replace('-', ' ');
        const message = `Hello, I have this quote of $${rawCalculatedPrice.toFixed(2)} for a ${formattedType} service at my ${formattedSqft} sq ft home, which has ${bedrooms} bedrooms, ${bathrooms} bathrooms, and ${halfBaths} half baths, with a ${formattedFreq} frequency. I would like to coordinate and schedule our cleaning service.`;
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/6476063974?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
    };

    // --- RENDERIZADO CON TAILWIND ---
    return (
        <section 
            id="quote-section" 
            className="relative min-h-[80vh] flex items-center justify-center text-center bg-cover bg-center text-white"
            style={{ backgroundImage: `url(${heroImage})` }} // El bg-image inline es aceptable si es dinámico o una imagen importada
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-navy/65 z-10"></div>

            {/* Contenido */}
            <div className="container-custom relative z-20 px-4">
                <h1 className="text-3xl md:text-5xl font-bold mb-8 drop-shadow-md">
                    Quote & Book Your Clean Instantly.
                </h1>

                {/* COTIZADOR */}
                <div className="bg-lavender p-6 md:p-8 rounded-xl max-w-3xl mx-auto shadow-xl text-text-dark">
                    
                    {/* Grid de 2 Columnas (1 en móvil, 2 en desktop) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                        
                        {/* COLUMNA IZQUIERDA */}
                        <div className="flex flex-col gap-5">
                            
                            {/* 1. Service Type */}
                            <div className="flex flex-col items-start gap-2">
                                <label className="font-bold text-navy text-sm">Service Type:</label>
                                <div className="flex w-full gap-2">
                                    <button
                                        className={`flex-1 py-2.5 px-4 rounded font-bold border border-navy transition-colors ${
                                            cleaningType === 'regular' ? 'bg-navy text-white' : 'bg-white text-navy hover:bg-white/80'
                                        }`}
                                        onClick={() => setCleaningType('regular')}
                                    >
                                        Standard Clean
                                    </button>
                                    <button
                                        className={`flex-1 py-2.5 px-4 rounded font-bold border border-navy transition-colors ${
                                            cleaningType === 'deep' ? 'bg-navy text-white' : 'bg-white text-navy hover:bg-white/80'
                                        }`}
                                        onClick={() => setCleaningType('deep')}
                                    >
                                        Deep Clean
                                    </button>
                                </div>
                            </div>

                            {/* 2. Frequency */}
                            <div className="flex flex-col items-start gap-2">
                                <label className="font-bold text-navy text-sm">Frequency:</label>
                                <div className="flex flex-wrap w-full gap-2">
                                    {['weekly', 'bi-weekly', 'monthly'].map((freq) => (
                                        <button
                                            key={freq}
                                            className={`flex-1 py-2.5 px-2 rounded font-bold border border-navy capitalize transition-colors min-w-[80px] ${
                                                frequency === freq ? 'bg-navy text-white' : 'bg-white text-navy hover:bg-white/80'
                                            }`}
                                            onClick={() => setFrequency(freq)}
                                        >
                                            {freq.replace('-', ' ')}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* 3. Square Footage */}
                            <div className="flex flex-col items-start gap-2">
                                <label className="font-bold text-navy text-sm">Square Footage:</label>
                                <select
                                    className="w-full p-2.5 rounded border border-navy bg-white text-text-dark focus:outline-none focus:border-yellow-accent cursor-pointer"
                                    value={squareFeet}
                                    onChange={(e) => setSquareFeet(e.target.value)}
                                >
                                    <option value="1000-1500">1000 - 1500 sq ft</option>
                                    <option value="1500-2000">1500 - 2000 sq ft</option>
                                    <option value="2000-2500">2000 - 2500 sq ft</option>
                                    <option value="2500+">2500+ sq ft</option>
                                </select>
                            </div>
                        </div>

                        {/* COLUMNA DERECHA */}
                        <div className="flex flex-col gap-5 justify-center">
                            
                            {/* Helper component para los inputs de número */}
                            <NumberInput label="Bedrooms:" value={bedrooms} onChange={setBedrooms} />
                            <NumberInput label="Bathrooms:" value={bathrooms} onChange={setBathrooms} />
                            <NumberInput label="Half Baths:" value={halfBaths} onChange={setHalfBaths} min={0} />

                        </div>
                    </div>

                    {/* SECCIÓN PRECIO Y BOTÓN */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-6 pt-6 border-t border-navy/10">
                        <span className="text-2xl md:text-3xl font-bold text-text-dark">
                            Price: <span className="text-navy">${currentPrice}</span>
                        </span>
                        <button
                            className="btn-cta bg-yellow-accent text-navy text-lg px-8 py-3 w-full md:w-auto shadow-md hover:shadow-lg"
                            onClick={handleBookNow}
                        >
                            Book Now
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Componente pequeño local para evitar repetir código en los inputs
const NumberInput = ({ label, value, onChange, min = 1 }) => (
    <div className="flex justify-between items-center py-1">
        <label className="font-bold text-navy text-sm w-1/2 text-left">{label}</label>
        <div className="flex items-center border border-gray-300 rounded overflow-hidden w-[45%]">
            <button 
                className="bg-navy text-white px-3 py-2 hover:bg-blue-900 transition-colors"
                onClick={() => onChange(Math.max(min, value - 1))}
            >-</button>
            <span className="flex-1 text-center font-bold text-navy bg-white py-2">{value}</span>
            <button 
                className="bg-navy text-white px-3 py-2 hover:bg-blue-900 transition-colors"
                onClick={() => onChange(value + 1)}
            >+</button>
        </div>
    </div>
);

export default Hero;