import React, { useState, useEffect } from 'react';

const AcademicCapIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.627 48.627 0 0 1 12 20.904a48.627 48.627 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.57 50.57 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
  </svg>
);

interface HeaderProps {
    onHomeClick: () => void;
    onViewDashboard: () => void;
}

const Header: React.FC<HeaderProps> = ({ onHomeClick, onViewDashboard }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-brand-dark/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div 
            onClick={onHomeClick}
            className="flex items-center space-x-2 cursor-pointer"
        >
          <AcademicCapIcon className="h-8 w-8 text-brand-primary" />
          <span className="text-2xl font-bold text-white">EduVerse</span>
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#courses" onClick={(e) => { e.preventDefault(); document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-gray-300 hover:text-white transition">Cursos</a>
          <a href="#testimonials" onClick={(e) => { e.preventDefault(); document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-gray-300 hover:text-white transition">Historias de Éxito</a>
          <a href="#pricing" onClick={(e) => { e.preventDefault(); document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-gray-300 hover:text-white transition">Precios</a>
          <a href="#community" className="text-gray-300 hover:text-white transition">Comunidad</a>
        </nav>
        <button onClick={onViewDashboard} className="bg-brand-primary hover:bg-indigo-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
          Panel de Creador
        </button>
      </div>
    </header>
  );
};

export default Header;