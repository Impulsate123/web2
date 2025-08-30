
import React from 'react';
import { Course } from '../types';

const StarIcon: React.FC<{className: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
    </svg>
);

interface CourseCardProps {
  course: Course;
  onSelectCourse: (course: Course) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onSelectCourse }) => {
  return (
    <div 
      className="bg-gray-800 rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer flex flex-col h-full"
      onClick={() => onSelectCourse(course)}
    >
      <img className="w-full h-48 object-cover" src={course.imageUrl} alt={course.title} />
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex-grow">
            <p className="text-sm text-brand-primary font-semibold">{course.category}</p>
            <h3 className="text-xl font-bold text-white mt-2 mb-2">{course.title}</h3>
            <p className="text-gray-400 text-sm mb-4">{course.description}</p>
        </div>
        <div className="flex items-center justify-between text-sm mt-auto pt-4 border-t border-gray-700">
            <div className="flex items-center">
                <StarIcon className="w-5 h-5 text-brand-accent mr-1"/>
                <span className="text-white font-bold">{course.rating}</span>
                <span className="text-gray-400 ml-1">({course.reviews})</span>
            </div>
            <span className="text-xl font-bold text-brand-secondary">${course.price}</span>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
