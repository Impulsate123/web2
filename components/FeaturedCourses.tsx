
import React from 'react';
import { Course } from '../types';
import CourseCard from './CourseCard';

interface FeaturedCoursesProps {
  courses: Course[];
  onSelectCourse: (course: Course) => void;
}

const FeaturedCourses: React.FC<FeaturedCoursesProps> = ({ courses, onSelectCourse }) => {
  return (
    <section id="courses" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Cursos Destacados</h2>
          <p className="text-lg text-gray-400 mt-2">Cursos seleccionados para ayudarte a alcanzar tus metas.</p>
          <div className="mt-4 w-24 h-1 bg-brand-primary mx-auto rounded"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses.map((course, index) => (
            <div key={course.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
              <CourseCard course={course} onSelectCourse={onSelectCourse} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
