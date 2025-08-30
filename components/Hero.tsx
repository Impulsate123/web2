
import React from 'react';

interface HeroProps {
  onGetStartedClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onGetStartedClick }) => {
  return (
    <section className="relative h-[80vh] min-h-[500px] flex items-center justify-center text-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-brand-dark opacity-50 z-10"></div>
        <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute z-0 w-auto min-w-full min-h-full max-w-none"
        >
            <source
                src="https://assets.mixkit.co/videos/preview/mixkit-futuristic-computer-data-processing-3D-graphics-4876-large.mp4"
                type="video/mp4"
            />
            Your browser does not support the video tag.
        </video>
        <div className="relative z-20 container mx-auto px-6 animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 tracking-tighter">
                Desbloquea tu Potencial. <span className="text-brand-primary">Crea tu Futuro.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                Domina habilidades de alta demanda en finanzas, tecnología y bienestar. Nuestra plataforma impulsada por IA proporciona un camino personalizado hacia el éxito.
            </p>
            <div className="flex justify-center space-x-4">
                <button onClick={onGetStartedClick} className="bg-brand-primary hover:bg-indigo-500 text-white font-bold py-3 px-8 rounded-full text-lg transition-transform transform hover:scale-105 shadow-lg">
                    Explorar Cursos
                </button>
                <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-bold py-3 px-8 rounded-full text-lg transition-transform transform hover:scale-105">
                    Prueba Gratis
                </button>
            </div>
        </div>
    </section>
  );
};

export default Hero;
