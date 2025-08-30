
import React from 'react';
import { PRICING_TIERS } from '../constants';

const CheckIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-brand-secondary">
        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.06-1.06L11.25 12.94l-1.72-1.72a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.06 0l3.75-3.75Z" clipRule="evenodd" />
    </svg>
);


const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Planes Flexibles para Todos</h2>
          <p className="text-lg text-gray-400 mt-2">Elige el plan adecuado para tu viaje de aprendizaje.</p>
           <div className="mt-4 w-24 h-1 bg-brand-primary mx-auto rounded"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {PRICING_TIERS.map((tier, index) => (
            <div 
              key={tier.name}
              className={`bg-gray-800 rounded-lg p-8 shadow-lg flex flex-col animate-fade-in-up ${tier.isFeatured ? 'border-2 border-brand-primary transform scale-105' : 'border-2 border-gray-700'}`}
               style={{ animationDelay: `${index * 150}ms` }}
            >
              {tier.isFeatured && (
                <div className="bg-brand-primary text-white text-xs font-bold rounded-full px-4 py-1 self-center absolute -top-4">
                  MÁS POPULAR
                </div>
              )}
              <h3 className="text-2xl font-bold text-white text-center">{tier.name}</h3>
              <div className="text-center my-6">
                <span className="text-5xl font-extrabold text-white">${tier.price}</span>
                <span className="text-gray-400">{tier.period}</span>
              </div>
              <ul className="space-y-4 mb-8 flex-grow">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <CheckIcon />
                    <span className="ml-3 text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 rounded-lg font-semibold transition-transform transform hover:scale-105 ${tier.isFeatured ? 'bg-brand-primary text-white hover:bg-indigo-500' : 'bg-gray-700 text-white hover:bg-gray-600'}`}>
                Comenzar
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
