
import React from 'react';

const AcademicCapIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.627 48.627 0 0 1 12 20.904a48.627 48.627 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.57 50.57 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
    </svg>
  );

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <AcademicCapIcon className="h-8 w-8 text-brand-primary" />
              <span className="text-2xl font-bold text-white">EduVerse</span>
            </div>
            <p className="text-sm">Potenciando mentes, construyendo futuros. Únete a nuestra comunidad y comienza tu viaje de aprendizaje hoy.</p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Explora</h4>
            <ul className="space-y-2">
              <li><a href="#courses" className="hover:text-white transition">Cursos</a></li>
              <li><a href="#pricing" className="hover:text-white transition">Precios</a></li>
              <li><a href="#" className="hover:text-white transition">Afiliados</a></li>
              <li><a href="#" className="hover:text-white transition">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Compañía</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition">Sobre Nosotros</a></li>
              <li><a href="#" className="hover:text-white transition">Empleo</a></li>
              <li><a href="#" className="hover:text-white transition">Contacto</a></li>
              <li><a href="#" className="hover:text-white transition">Política de Privacidad</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Mantente Conectado</h4>
            <p className="mb-4">Recibe los últimos cursos y actualizaciones en tu bandeja de entrada.</p>
            <form className="flex">
              <input type="email" placeholder="Tu correo electrónico" className="w-full bg-gray-800 border border-gray-700 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-primary" />
              <button type="submit" className="bg-brand-primary text-white font-semibold px-4 rounded-r-md hover:bg-indigo-500 transition">
                Suscribirse
              </button>
            </form>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-800 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} EduVerse. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
