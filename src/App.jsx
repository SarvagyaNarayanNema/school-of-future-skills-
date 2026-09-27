import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { FutureBot } from './components/layout/FutureBot';
import { CommandPalette } from './components/common/CommandPalette';
import { ToastContainer } from './components/common/ToastContainer';
import { ErrorBoundary } from './components/common/ErrorBoundary';

// Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Courses } from './pages/Courses';
import { CourseDetails } from './pages/CourseDetails';
import { Notices } from './pages/Notices';
import { Events } from './pages/Events';
import { EventDetails } from './pages/EventDetails';
import { Projects } from './pages/Projects';
import { Achievements } from './pages/Achievements';
import { TechZone } from './pages/TechZone';
import { Dashboard } from './pages/Dashboard';
import { Timetable } from './pages/Timetable';
import { Assignments } from './pages/Assignments';
import { Labs } from './pages/Labs';
import { Profile } from './pages/Profile';
import { NotFound } from './pages/NotFound';

// Scroll to top helper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
};

export const App = () => {
  return (
    <ErrorBoundary>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 tech-grid-pattern transition-colors duration-200">
        <Navbar />
        
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<CourseDetails />} />
            <Route path="/notices" element={<Notices />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<EventDetails />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/tech-zone" element={<TechZone />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/timetable" element={<Timetable />} />
            <Route path="/assignments" element={<Assignments />} />
            <Route path="/labs" element={<Labs />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
        <FutureBot />
        <CommandPalette />
        <ToastContainer />
      </div>
    </ErrorBoundary>
  );
};

export default App;
