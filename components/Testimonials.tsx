
import React from 'react';
import { MOCK_TESTIMONIALS } from '../constants';

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 bg-brand-dark">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Historias de Éxito</h2>
          <p className="text-lg text-gray-400 mt-2">Descubre cómo hemos transformado vidas.</p>
           <div className="mt-4 w-24 h-1 bg-brand-primary mx-auto rounded"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MOCK_TESTIMONIALS.map((testimonial, index) => (
            <div 
              key={testimonial.id} 
              className="bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col items-center text-center animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <img className="w-24 h-24 rounded-full mb-4 border-4 border-brand-primary" src={testimonial.avatarUrl} alt={testimonial.name} />
              <p className="text-gray-300 italic mb-6">"{testimonial.quote}"</p>
              <h4 className="text-white font-bold text-lg">{testimonial.name}</h4>
              <p className="text-brand-secondary">{testimonial.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
