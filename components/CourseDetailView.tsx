import React, { useState, useEffect } from 'react';
import { Course } from '../types';
import { getCourseRecommendations } from '../services/geminiService';
import CourseCard from './CourseCard';

interface CourseDetailViewProps {
  course: Course;
  allCourses: Course[];
  onBack: () => void;
  ownedCourseIds: Set<number>;
  onPurchase: (courseId: number) => void;
}

const BackArrowIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
    </svg>
);
const CheckCircleIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-brand-secondary">
        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.06-1.06L11.25 12.94l-1.72-1.72a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.06 0l3.75-3.75Z" clipRule="evenodd" />
    </svg>
);
const CircleIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-500">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);
const LoadingSpinner: React.FC = () => (
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary"></div>
);

const CourseDetailView: React.FC<CourseDetailViewProps> = ({ course, onBack, allCourses, ownedCourseIds, onPurchase }) => {
    const [recommendations, setRecommendations] = useState<Course[]>([]);
    const [isLoadingRecs, setIsLoadingRecs] = useState(true);
    const [showPurchaseModal, setShowPurchaseModal] = useState(false);
    const [purchaseSuccess, setPurchaseSuccess] = useState(false);

    const isOwned = ownedCourseIds.has(course.id);

    const handlePurchaseClick = () => {
        setShowPurchaseModal(true);
    };
    
    const handleConfirmPurchase = () => {
        onPurchase(course.id);
        setShowPurchaseModal(false);
        setPurchaseSuccess(true);
        setTimeout(() => setPurchaseSuccess(false), 5000); // Ocultar mensaje después de 5s
    };

    const fetchRecommendations = React.useCallback(async () => {
        setIsLoadingRecs(true);
        const recs = await getCourseRecommendations(course, allCourses);
        setRecommendations(recs);
        setIsLoadingRecs(false);
    }, [course, allCourses]);

    useEffect(() => {
        fetchRecommendations();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [course]);

    const completedLessons = course.lessons.filter(l => l.isCompleted).length;
    const totalLessons = course.lessons.length;
    const progress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

    return (
        <div className="container mx-auto px-6 py-12 animate-fade-in-up">
            {purchaseSuccess && (
                <div className="fixed top-24 right-8 bg-brand-secondary text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in-up">
                    <p><strong>¡Éxito!</strong> Curso desbloqueado. Revisa tu correo para más detalles.</p>
                </div>
            )}
            {showPurchaseModal && (
                <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
                    <div className="bg-gray-800 rounded-lg shadow-xl p-8 max-w-md w-full text-center animate-fade-in-up">
                        <h3 className="text-2xl font-bold text-white mb-4">Redireccionando a Hotmart</h3>
                        <p className="text-gray-300 mb-6">
                            Estás a punto de ser redirigido a Hotmart para completar tu compra de forma segura. Una vez finalizada, tu acceso al curso se activará automáticamente en tu cuenta de EduVerse y recibirás un correo electrónico de confirmación.
                        </p>
                        <div className="flex justify-center space-x-4">
                            <button onClick={() => setShowPurchaseModal(false)} className="bg-gray-600 hover:bg-gray-500 text-white font-semibold py-2 px-6 rounded-lg transition">Cancelar</button>
                            <button onClick={handleConfirmPurchase} className="bg-brand-secondary hover:bg-green-500 text-white font-semibold py-2 px-6 rounded-lg transition">Confirmar Compra (Simulación)</button>
                        </div>
                    </div>
                </div>
            )}
            <button onClick={onBack} className="flex items-center space-x-2 text-brand-primary hover:text-indigo-400 font-semibold mb-8">
                <BackArrowIcon />
                <span>Volver a Cursos</span>
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2">
                    <p className="text-brand-primary font-semibold mb-2">{course.category}</p>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">{course.title}</h1>
                    <p className="text-lg text-gray-300 mb-6">{course.longDescription}</p>
                    
                    {isOwned ? (
                         <div className="bg-gray-800 rounded-lg p-6">
                            <h3 className="text-2xl font-bold text-white mb-4">Contenido del Curso</h3>
                            <div className="space-y-4">
                                {course.lessons.map((lesson, index) => (
                                    <div key={index} className="flex items-center justify-between bg-gray-900 p-4 rounded-md">
                                        <div className="flex items-center space-x-4">
                                            {lesson.isCompleted ? <CheckCircleIcon /> : <CircleIcon />}
                                            <span className="text-white">{lesson.title}</span>
                                        </div>
                                        <span className="text-gray-400">{lesson.duration}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="bg-gray-800 rounded-lg p-8 text-center">
                            <h3 className="text-2xl font-bold text-white mb-4">Obtén Acceso Inmediato</h3>
                            <p className="text-gray-300 mb-6">Compra este curso a través de Hotmart para desbloquear todas las lecciones, materiales y obtener tu certificado de finalización.</p>
                            <button onClick={handlePurchaseClick} className="w-full max-w-sm mx-auto bg-brand-primary hover:bg-indigo-500 text-white font-bold py-3 px-6 rounded-lg text-lg transition-transform transform hover:scale-105">
                                Comprar en Hotmart por ${course.price}
                            </button>
                        </div>
                    )}
                </div>

                <div className="lg:col-span-1">
                    <div className="bg-gray-800 rounded-lg shadow-xl p-6 sticky top-28">
                        <img src={course.imageUrl} alt={course.title} className="rounded-lg w-full h-48 object-cover mb-6" />
                        {isOwned ? (
                            <>
                                <div className="mb-6">
                                    <h4 className="text-lg text-white font-semibold mb-2">Tu Progreso</h4>
                                    <div className="w-full bg-gray-700 rounded-full h-2.5">
                                        <div className="bg-brand-secondary h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                                    </div>
                                    <p className="text-sm text-gray-400 mt-2 text-right">{completedLessons} de {totalLessons} lecciones completadas</p>
                                </div>
                                <button className="w-full bg-brand-primary hover:bg-indigo-500 text-white font-bold py-3 px-6 rounded-lg text-lg transition-transform transform hover:scale-105">
                                    Continuar Aprendiendo
                                </button>
                            </>
                        ) : (
                             <>
                                <p className="text-center text-4xl font-bold text-white">${course.price}</p>
                                <button onClick={handlePurchaseClick} className="w-full mt-4 bg-brand-primary hover:bg-indigo-500 text-white font-bold py-3 px-6 rounded-lg text-lg transition-transform transform hover:scale-105">
                                    Comprar Ahora
                                </button>
                             </>
                        )}
                    </div>
                </div>
            </div>

             <div className="mt-20">
                <h2 className="text-3xl font-bold text-white mb-6 text-center">También podría interesarte</h2>
                {isLoadingRecs ? (
                     <div className="flex justify-center items-center h-40">
                         <LoadingSpinner/>
                         <p className="ml-4 text-gray-400">Buscando recomendaciones para ti...</p>
                     </div>
                ) : recommendations.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {recommendations.map(rec => (
                            <CourseCard key={rec.id} course={rec} onSelectCourse={() => { /* Not implemented for recs */ }} />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-400">No hay recomendaciones disponibles en este momento.</p>
                )}
            </div>

        </div>
    );
};

export default CourseDetailView;