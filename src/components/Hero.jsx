// src/components/Hero.jsx

import React, { useState, useEffect, useCallback, useMemo } from 'react'; 
// Agregamos useMemo para un cálculo de precio limpio y estable.
// Usamos .png según tu último ajuste de archivo.
import heroImage from '../assets/hero_image.png'; 

const Hero = () => {
    // Estado para manejar las selecciones del cotizador
    const [cleaningType, setCleaningType] = useState('deep'); // Valor por defecto
    const [frequency, setFrequency] = useState('bi-weekly'); // Valor por defecto
    const [bedrooms, setBedrooms] = useState(1);
    const [bathrooms, setBathrooms] = useState(1);
    const [halfBaths, setHalfBaths] = useState(0);
    const [squareFeet, setSquareFeet] = useState('1000-1500'); 
    const [currentPrice, setCurrentPrice] = useState('150.00'); // Estado para el precio que se muestra

    // Función para manejar el incremento/decremento de números
    const updateCount = (state, setState, delta, min = 0) => {
        setState(Math.max(min, state + delta));
    };

    // --- LÓGICA DE CÁLCULO DE PRECIOS ACTUALIZADA ---
    const calculateRawPrice = useCallback(() => {
        const BASE_PRICE = 50;
        const DEEP_CLEAN_SURCHARGE = 50;
        const PRICE_PER_BEDROOM = 25;
        const PRICE_PER_BATHROOM = 30;
        const PRICE_PER_HALF_BATH = 15;
        const MIN_PRICE = 150;

        let total = BASE_PRICE;
        
        // 1. Ajuste por tipo de limpieza
        if (cleaningType === 'deep') total += DEEP_CLEAN_SURCHARGE;

        // 2. Ajuste por tamaño de habitaciones/baños
        total += (bedrooms * PRICE_PER_BEDROOM) + (bathrooms * PRICE_PER_BATHROOM) + (halfBaths * PRICE_PER_HALF_BATH);

        // 3. Ajuste por Square Footage 
        switch (squareFeet) {
            case '1000-1500':
                total += 20;
                break;
            case '1500-2000':
                total += 35;
                break;
            case '2000-2500':
                total += 50;
                break;
            case '2500+':
                total += 65;
                break;
            default:
                break;
        }

        // 4. Ajuste por frecuencia (descuentos/recargos)
        if (frequency === 'weekly') {
            total *= 0.85; 
        } else if (frequency === 'monthly') {
            total *= 1.05; 
        }

        // 5. RESTRICCIÓN DE PRECIO MÍNIMO
        if (total < MIN_PRICE) {
            total = MIN_PRICE;
        }
        
        // Redondeamos para el cálculo, el toFixed(2) final es para la UI
        return Math.round(total); 
    }, [cleaningType, frequency, bedrooms, bathrooms, halfBaths, squareFeet]);
    
    // Almacena el precio base calculado (como número) para usarlo en el CTA
    const rawCalculatedPrice = useMemo(() => calculateRawPrice(), [calculateRawPrice]);

    // Usamos useEffect para actualizar el estado del precio de la UI
    useEffect(() => {
        setCurrentPrice(rawCalculatedPrice.toFixed(2));
    }, [rawCalculatedPrice]);
    
    // --- FIN LÓGICA DE CÁLCULO DE PRECIOS ACTUALIZADA ---

    // --- FUNCIÓN DE WHATSAPP PARA EL BOTÓN 'BOOK NOW' ---
    const handleBookNow = () => {
        // Los datos de la cotización ya son accesibles desde los estados y rawCalculatedPrice.

        // 1. Mapeo para nombres de variables más legibles en el mensaje
        const formattedSqft = squareFeet.replace('-', ' to ');
        const formattedType = cleaningType === 'deep' ? 'Deep Clean' : 'Standard Clean';
        const formattedFreq = frequency.charAt(0).toUpperCase() + frequency.slice(1).replace('-', ' ');

        // 2. Construcción del mensaje solicitado (en inglés)
        const message = `Hello, I have this quote of $${rawCalculatedPrice.toFixed(2)} for a ${formattedType} service at my ${formattedSqft} sq ft home, which has ${bedrooms} bedrooms, ${bathrooms} bathrooms, and ${halfBaths} half baths, with a ${formattedFreq} frequency. I would like to coordinate and schedule our cleaning service.`;
        
        // 3. Codificar el mensaje
        const encodedMessage = encodeURIComponent(message);
        
        // 4. Construir la URL completa con el número de teléfono
        const whatsappUrl = `https://wa.me/6476063974?text=${encodedMessage}`;
        
        // 5. Abrir la nueva ventana/pestaña
        window.open(whatsappUrl, '_blank');
    };
    // --- FIN FUNCIÓN DE WHATSAPP ---


    return (
        <section className="hero-section" id="quote-section" style={{ // Agregamos el ID para el CTA inferior
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '80vh', 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative', 
            color: 'var(--color-white)', 
            textAlign: 'center'
        }}>
            {/* Overlay semitransparente */}
            <div className="hero-overlay"></div>

            {/* Contenido del Hero (Titular y Cotizador) */}
            <div className="container hero-content" style={{ position: 'relative', zIndex: 2 }}>
                <h1 style={{ fontSize: '3em', marginBottom: '30px' }}>
                    Quote & Book Your Clean Instantly.
                </h1>

                {/* COTIZADOR INTERACTIVO */}
                <div className="quoter-box" style={{
                    backgroundColor: 'var(--color-lavender)', 
                    padding: '30px',
                    borderRadius: '10px',
                    maxWidth: '750px', 
                    margin: '0 auto',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
                    color: 'var(--color-text-dark)' 
                }}>
                    
                    <div className="quoter-grid"> 
                        
                        {/* Columna Izquierda: Service Type, Frequency, Square Footage */}
                        <div className="quoter-col left-col">
                            
                            {/* 1. Service Type */}
                            <div className="quoter-row cleaning-type-selector">
                                <label>Service Type:</label>
                                <div className="button-group full-width">
                                    <button
                                        className={`type-button ${cleaningType === 'regular' ? 'active' : ''}`}
                                        onClick={() => setCleaningType('regular')}
                                    >
                                        Standard Clean
                                    </button>
                                    <button
                                        className={`type-button ${cleaningType === 'deep' ? 'active' : ''}`}
                                        onClick={() => setCleaningType('deep')}
                                    >
                                        Deep Clean
                                    </button>
                                </div>
                            </div>

                            {/* 2. Frequency */}
                            <div className="quoter-row frequency-selector">
                                <label>Frequency:</label>
                                <div className="button-group full-width">
                                    <button
                                        className={`freq-button ${frequency === 'weekly' ? 'active' : ''}`}
                                        onClick={() => setFrequency('weekly')}
                                    >
                                        Weekly
                                    </button>
                                    <button
                                        className={`freq-button ${frequency === 'bi-weekly' ? 'active' : ''}`}
                                        onClick={() => setFrequency('bi-weekly')}
                                    >
                                        Bi-Weekly
                                    </button>
                                    <button
                                        className={`freq-button ${frequency === 'monthly' ? 'active' : ''}`}
                                        onClick={() => setFrequency('monthly')}
                                    >
                                        Monthly
                                    </button>
                                </div>
                            </div>
                            
                            {/* 3. Square Footage */}
                            <div className="quoter-row sq-ft-selector">
                                <label>Square Footage:</label>
                                <select
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

                        {/* Columna Derecha: Bedrooms, Bathrooms, Half Baths */}
                        <div className="quoter-col right-col">
                            
                            {/* 4. Bedrooms */}
                            <div className="quoter-row input-group-small">
                                <label>Bedrooms:</label>
                                <div className="number-input">
                                    <button onClick={() => updateCount(bedrooms, setBedrooms, -1, 1)}>-</button>
                                    <span>{bedrooms}</span>
                                    <button onClick={() => updateCount(bedrooms, setBedrooms, 1)}>+</button>
                                </div>
                            </div>

                            {/* 5. Bathrooms */}
                            <div className="quoter-row input-group-small">
                                <label>Bathrooms:</label>
                                <div className="number-input">
                                    <button onClick={() => updateCount(bathrooms, setBathrooms, -1, 1)}>-</button>
                                    <span>{bathrooms}</span>
                                    <button onClick={() => updateCount(bathrooms, setBathrooms, 1)}>+</button>
                                </div>
                            </div>

                            {/* 6. Half Baths */}
                            <div className="quoter-row input-group-small">
                                <label>Half Baths:</label>
                                <div className="number-input">
                                    <button onClick={() => updateCount(halfBaths, setHalfBaths, -1)}>-</button>
                                    <span>{halfBaths}</span>
                                    <button onClick={() => updateCount(halfBaths, setHalfBaths, 1)}>+</button>
                                </div>
                            </div>
                        </div>
                    </div> {/* Fin de quoter-grid */}

                    {/* Precio y Botón de Reserva (Sección inferior) */}
                    <div className="price-display-full-width" style={{ 
                        marginTop: '25px', 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        flexDirection: window.innerWidth < 768 ? 'column' : 'row', 
                        gap: window.innerWidth < 768 ? '15px' : '0' 
                    }}>
                        <span style={{ fontSize: '1.8em', fontWeight: 'bold' }}>
                            Price: <span style={{ color: 'var(--color-navy)' }}>${currentPrice}</span>
                        </span>
                        <button
                            className="cta-button"
                            style={{ backgroundColor: 'var(--color-yellow-accent)', color: 'var(--color-navy)', fontSize: '1.1em' }}
                            onClick={handleBookNow} // LLAMADA AL WHATSAPP
                        >
                            Book Now
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;