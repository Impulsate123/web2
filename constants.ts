import { Course, Testimonial, PricingTier } from './types';

export const MOCK_COURSES: Course[] = [
  {
    id: 1,
    title: 'Plan para la Libertad Financiera',
    instructor: 'Jane Doe',
    category: 'Creación de Riqueza',
    description: 'Domina la inversión, el presupuesto y las estrategias de creación de riqueza.',
    longDescription: 'Este curso completo cubre todo, desde los fundamentos del mercado de valores hasta la inversión inmobiliaria avanzada. Aprende a construir múltiples fuentes de ingresos y a alcanzar la independencia financiera más rápido de lo que creías posible.',
    price: 499.99,
    imageUrl: 'https://picsum.photos/seed/finance/600/400',
    rating: 4.9,
    reviews: 1250,
    lessons: [
        { title: 'Introducción a la Riqueza', duration: '15min', isCompleted: true },
        { title: 'El Poder del Interés Compuesto', duration: '25min', isCompleted: true },
        { title: 'Bolsa de Valores 101', duration: '45min', isCompleted: false },
        { title: 'Inversión Inmobiliaria', duration: '60min', isCompleted: false },
    ]
  },
  {
    id: 2,
    title: 'Acelerador de Habilidades Digitales',
    instructor: 'John Smith',
    category: 'Reentrenamiento Laboral',
    description: 'Mejora con habilidades tecnológicas de alta demanda: programación, marketing y diseño.',
    longDescription: 'En un mercado laboral que cambia rápidamente, este curso es tu clave para mantenerte relevante. Ofrecemos tres rutas: desarrollo web con React, embudos de marketing digital y principios de diseño UX/UI con Figma. No se requiere experiencia previa.',
    price: 349.99,
    imageUrl: 'https://picsum.photos/seed/digital/600/400',
    rating: 4.8,
    reviews: 980,
    lessons: [
        { title: 'El Panorama Digital', duration: '20min', isCompleted: true },
        { title: 'Fundamentos de HTML y CSS', duration: '55min', isCompleted: false },
        { title: 'Introducción a JavaScript', duration: '75min', isCompleted: false },
        { title: 'Tu Primera App con React', duration: '90min', isCompleted: false },
    ]
  },
  {
    id: 3,
    title: 'Mindfulness y Bienestar Mental',
    instructor: 'Dra. Emily Carter',
    category: 'Salud Mental',
    description: 'Técnicas para la reducción del estrés, mejora del enfoque y equilibrio emocional.',
    longDescription: 'Basado en investigación clínica, este curso proporciona herramientas prácticas para navegar los desafíos de la vida moderna. Aprende meditación, técnicas cognitivo-conductuales y prácticas de mindfulness para fomentar la resiliencia y un profundo sentido de bienestar.',
    price: 199.99,
    imageUrl: 'https://picsum.photos/seed/mindful/600/400',
    rating: 4.9,
    reviews: 2100,
    lessons: [
        { title: 'Comprendiendo el Estrés', duration: '20min', isCompleted: true },
        { title: 'Tu Primera Meditación', duration: '15min', isCompleted: true },
        { title: 'Respiración Consciente', duration: '30min', isCompleted: true },
        { title: 'Reestructuración Cognitiva', duration: '45min', isCompleted: false },
    ]
  },
  {
    id: 4,
    title: 'Clase Magistral de Vida Sostenible',
    instructor: 'Leo Hernández',
    category: 'Sostenibilidad',
    description: 'Aprende a vivir una vida más ecológica y a reducir tu huella de carbono.',
    longDescription: 'Una guía práctica para tener un impacto positivo en el planeta. Este curso cubre todo, desde la vida sin residuos y la moda sostenible hasta la jardinería doméstica y los conceptos básicos de energía renovable. Haz de la sostenibilidad una parte integral de tu estilo de vida.',
    price: 149.99,
    imageUrl: 'https://picsum.photos/seed/sustain/600/400',
    rating: 4.7,
    reviews: 750,
    lessons: [
        { title: 'La Crisis Climática', duration: '30min', isCompleted: false },
        { title: 'La Cocina Cero Residuos', duration: '45min', isCompleted: false },
        { title: 'Moda Sostenible', duration: '40min', isCompleted: false },
        { title: 'Soluciones Energéticas para el Hogar', duration: '50min', isCompleted: false },
    ]
  },
];

export const MOCK_TESTIMONIALS: Testimonial[] = [
    {
        id: 1,
        name: 'Carlos Rivera',
        role: 'Fundador, Startup Inc.',
        quote: "El 'Plan para la Libertad Financiera' cambió por completo mi perspectiva sobre el dinero. Ahora invierto con confianza y construyo mi futuro. ¡Un curso que cambia la vida!",
        avatarUrl: 'https://picsum.photos/seed/person1/100/100'
    },
    {
        id: 2,
        name: 'Aisha Khan',
        role: 'Diseñadora Freelance',
        quote: "Estaba atrapada en un trabajo sin futuro. El 'Acelerador de Habilidades Digitales' me dio la confianza y el portafolio para lanzar mi propio negocio freelance. ¡Muy recomendado!",
        avatarUrl: 'https://picsum.photos/seed/person2/100/100'
    },
    {
        id: 3,
        name: 'David Chen',
        role: 'Ingeniero de Software',
        quote: "El curso de mindfulness de la Dra. Carter me ayudó a manejar el estrés laboral como nada más lo había hecho. Las técnicas son simples, prácticas e increíblemente efectivas.",
        avatarUrl: 'https://picsum.photos/seed/person3/100/100'
    }
];

export const PRICING_TIERS: PricingTier[] = [
    {
        name: 'Acceso Mensual',
        price: '49',
        period: '/mes',
        features: [
            'Acceso a todos los cursos',
            'Nuevos cursos cada mes',
            'Acceso al foro de la comunidad',
            'Cancela en cualquier momento'
        ],
        isFeatured: false,
    },
    {
        name: 'Anual Pro',
        price: '499',
        period: '/año',
        features: [
            'Todo lo del plan Mensual',
            'Ahorra un 15% con pago anual',
            'Certificados descargables',
            'Acceso a webinars exclusivos',
            'Sesiones de Q&A con instructores'
        ],
        isFeatured: true,
    },
    {
        name: 'Vitalicio',
        price: '1,499',
        period: 'pago único',
        features: [
            'Todo lo del plan Anual Pro',
            'Acceso de por vida a todo el contenido',
            'Acceso anticipado a nuevas funciones',
            'Soporte prioritario'
        ],
        isFeatured: false,
    }
];

export const affiliateData = [
  { name: 'InversionesHoy', earnings: 1200 },
  { name: 'DigitalizateYa', earnings: 950 },
  { name: 'PazMental.net', earnings: 780 },
  { name: 'EcoGuía', earnings: 600 },
  { name: 'AprendeTop', earnings: 450 },
];