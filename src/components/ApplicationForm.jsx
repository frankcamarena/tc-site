// src/components/ApplicationForm.jsx
import React, { useState, useEffect } from 'react';

const ApplicationForm = () => {
  const [step, setStep] = useState('form'); // 'form', 'qualified', 'disqualified'
  
  // CAMBIO 1: Inicializamos experience y hours como vacíos '' para obligar a elegir
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    driversLicense: '', 
    experience: '', // Antes tenía valor por defecto, ahora vacío
    hours: '',      // Antes tenía valor por defecto, ahora vacío
    resume: null
  });

  // Manejo de Inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Manejo de Archivo (Resume)
  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, resume: e.target.files[0] }));
  };

  // Lógica del "Gatekeeper" + Envío a n8n
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // REEMPLAZA ESTO CON TU URL DE N8N (Usa la de TEST primero)
    const N8N_WEBHOOK_URL = import.meta.env.VITE_WEBHOOK_URL; 

    try {
        // Creamos un objeto FormData para poder enviar el archivo
        const formDataToSend = new FormData();
        
        // Agregamos los campos de texto
        formDataToSend.append('fullName', formData.fullName);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('phone', formData.phone);
        formDataToSend.append('driversLicense', formData.driversLicense);
        formDataToSend.append('experience', formData.experience);
        formDataToSend.append('hours', formData.hours);
        
        // Agregamos el archivo (si existe)
        if (formData.resume) {
            formDataToSend.append('resume', formData.resume);
        }

        // Enviamos a n8n (Sin Content-Type header, el navegador lo pone automático con el boundary correcto)
        fetch(N8N_WEBHOOK_URL, {
            method: 'POST',
            body: formDataToSend
        });
        
        console.log("Datos enviados a n8n...");

    } catch (error) {
        console.error("Error enviando a n8n:", error);
    }

    // Filtro Lógico (UI)
    if (formData.driversLicense === 'yes') {
      setStep('qualified');
    } else {
      setStep('disqualified');
    }
  };

  // Efecto para cargar Calendly SOLO si está calificado
  useEffect(() => {
    if (step === 'qualified') {
      const head = document.querySelector("head");
      const script = document.createElement("script");
      script.setAttribute("src", "https://assets.calendly.com/assets/external/widget.js");
      head.appendChild(script);
    }
  }, [step]);

  // Lógica de Pre-llenado (Prefill)
  const getCalendlyUrl = () => {
    const baseUrl = "https://calendly.com/fgustavocamarena/top-cleaning-meeting";
    const params = new URLSearchParams({
      hide_event_type_details: "1",
      hide_gdpr_banner: "1",
      name: formData.fullName, 
      email: formData.email,   
    });
    return `${baseUrl}?${params.toString()}`;
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100">
      
      {/* --- ESTADO 1: FORMULARIO DE APLICACIÓN --- */}
      {step === 'form' && (
        <div className="p-8 md:p-12">
          <h3 className="text-2xl font-bold text-navy mb-6 text-center">
            Tell us about yourself
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nombre y Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-navy mb-2">Full Name *</label>
                <input 
                  type="text" name="fullName" required 
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-yellow-accent"
                  placeholder="Jane Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-navy mb-2">Email Address *</label>
                <input 
                  type="email" name="email" required 
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-yellow-accent"
                  placeholder="jane@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Teléfono */}
            <div>
              <label className="block text-sm font-bold text-navy mb-2">Phone Number *</label>
              <input 
                type="tel" name="phone" required 
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-yellow-accent"
                placeholder="(647) 555-0123"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            {/* PREGUNTA FILTRO: Licencia */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <label className="block text-base font-bold text-navy mb-3">
                Do you have a valid driver's license and reliable vehicle? *
              </label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" name="driversLicense" value="yes" required 
                    onChange={handleChange}
                    className="accent-navy w-5 h-5"
                  />
                  <span className="text-navy">Yes, I do</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" name="driversLicense" value="no" required 
                    onChange={handleChange}
                    className="accent-navy w-5 h-5"
                  />
                  <span className="text-navy">No, I don't</span>
                </label>
              </div>
            </div>

            {/* Experiencia y Horario (CAMBIO CLAVE AQUÍ) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-navy mb-2">Cleaning Experience *</label>
                <select 
                  name="experience" 
                  required // <--- OBLIGATORIO
                  value={formData.experience} // <--- Controlado por estado
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-yellow-accent bg-white"
                  onChange={handleChange}
                >
                  {/* Opción vacía y deshabilitada para forzar elección */}
                  <option value="" disabled>Select experience...</option>
                  <option value="Up to 1 Year">Up to 1 Year</option>
                  <option value="Up to 2 Years">Up to 2 Years</option>
                  <option value="2+ Years">2+ Years</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-navy mb-2">Availability *</label>
                <select 
                  name="hours" 
                  required // <--- OBLIGATORIO
                  value={formData.hours} // <--- Controlado por estado
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-yellow-accent bg-white"
                  onChange={handleChange}
                >
                  {/* Opción vacía y deshabilitada para forzar elección */}
                  <option value="" disabled>Select availability...</option>
                  <option value="Full-Time (30 - 40 Hours)">Full-Time (30 - 40 Hours)</option>
                  <option value="Part-Time (10 - 20 Hours)">Part-Time (10 - 20 Hours)</option>
                </select>
              </div>
            </div>

            {/* Upload Resume */}
            <div>
              <label className="block text-sm font-bold text-navy mb-2">Upload Resume (PDF/Word)</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer relative">
                <input 
                  type="file" accept=".pdf,.doc,.docx" 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleFileChange}
                />
                <div className="text-navy">
                  {formData.resume ? (
                    <span className="font-bold text-green-600">✓ {formData.resume.name}</span>
                  ) : (
                    <span><span className="font-bold text-yellow-accent">Click to upload</span> or drag and drop</span>
                  )}
                </div>
              </div>
            </div>

            <button type="submit" className="w-full btn-cta bg-navy text-white text-lg hover:bg-opacity-90 py-4 mt-4">
              Submit Application
            </button>
          </form>
        </div>
      )}

      {/* --- ESTADO 2: NO CUALIFICADO --- */}
      {step === 'disqualified' && (
        <div className="p-12 text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">📝</span>
          </div>
          <h3 className="text-2xl font-bold text-navy mb-4">Application Received</h3>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Thank you for applying to Top Cleaning, <strong>{formData.fullName}</strong>. 
            <br/><br/>
            At this time, we are specifically prioritizing candidates with independent transportation for our mobile teams. We have added your profile to our <strong>Waitlist</strong>.
            <br/><br/>
            When a position that matches your profile opens up, we will contact you immediately via email.
          </p>
          <button onClick={() => window.location.reload()} className="text-navy underline font-semibold hover:text-yellow-accent">
            Return to Home
          </button>
        </div>
      )}

      {/* --- ESTADO 3: CUALIFICADO --- */}
      {step === 'qualified' && (
        <div>
           <div className="bg-green-50 p-6 border-b border-green-100 text-center">
              <h3 className="text-xl font-bold text-navy mb-2">🎉 Profile Approved!</h3>
              <p className="text-green-800 text-sm">
                Your experience and transport status match our current needs. <br/>
                <strong>Please select a time below for your introduction call.</strong>
              </p>
           </div>
           {/* Widget de Calendly con URL dinámica */}
           <div 
              className="calendly-inline-widget w-full" 
              data-url={getCalendlyUrl()} 
              style={{ minWidth: '320px', height: '650px' }}
           ></div>
        </div>
      )}

    </div>
  );
};

export default ApplicationForm;