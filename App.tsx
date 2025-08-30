import React, { useState } from 'react';
import { Course } from './types';
import { MOCK_COURSES } from './constants';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedCourses from './components/FeaturedCourses';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import CourseDetailView from './components/CourseDetailView';
import CreatorDashboard from './components/CreatorDashboard';
import ChatWidget from './components/ChatWidget';

type View = 'home' | 'courseDetail' | 'dashboard';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  // Simula la posesión de cursos. Por defecto, el usuario posee el curso con ID 1.
  const [ownedCourseIds, setOwnedCourseIds] = useState<Set<number>>(new Set([1]));

  const handleSelectCourse = (course: Course) => {
    setSelectedCourse(course);
    setCurrentView('courseDetail');
    window.scrollTo(0, 0);
  };

  const handleBackToHome = () => {
    setSelectedCourse(null);
    setCurrentView('home');
  };
  
  const handleViewDashboard = () => {
      setCurrentView('dashboard');
      window.scrollTo(0, 0);
  };

  const handlePurchaseCourse = (courseId: number) => {
    setOwnedCourseIds(prev => new Set(prev).add(courseId));
  };

  const renderContent = () => {
    switch (currentView) {
      case 'courseDetail':
        return selectedCourse && (
          <CourseDetailView 
            course={selectedCourse} 
            onBack={handleBackToHome} 
            allCourses={MOCK_COURSES}
            ownedCourseIds={ownedCourseIds}
            onPurchase={handlePurchaseCourse}
          />
        );
      case 'dashboard':
        return <CreatorDashboard onBack={handleBackToHome} />;
      case 'home':
      default:
        return (
          <>
            <Hero onGetStartedClick={() => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })} />
            <FeaturedCourses courses={MOCK_COURSES} onSelectCourse={handleSelectCourse} />
            <Testimonials />
            <Pricing />
          </>
        );
    }
  };

  return (
    <div className="bg-brand-dark min-h-screen font-sans">
      <Header onHomeClick={handleBackToHome} onViewDashboard={handleViewDashboard}/>
      <main>
        {renderContent()}
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default App;