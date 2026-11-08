import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { PublicHeader } from './components/layout/PublicHeader';
import { Footer } from './components/layout/Footer';
import { FutureBot } from './components/layout/FutureBot';
import { CommandPalette } from './components/common/CommandPalette';
import { NotificationDrawer } from './components/layout/NotificationDrawer';
import { ToastContainer } from './components/common/ToastContainer';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { FuturisticBackground } from './components/background/FuturisticBackground';
import { useApp } from './context/AppContext';

// Public Institutional Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Courses } from './pages/Courses';
import { CourseDetails } from './pages/CourseDetails';
import { Labs } from './pages/Labs';
import { Achievements } from './pages/Achievements';
import { Notices } from './pages/Notices';
import { ClubsAndProjects } from './pages/ClubsAndProjects';
import { Alumni } from './pages/Alumni';
import { Events } from './pages/Events';
import { EventDetails } from './pages/EventDetails';
import { Projects } from './pages/Projects';
import { NotFound } from './pages/NotFound';

// Smooth scroll to top on page navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
};

export const App = () => {
  const { notificationDrawerOpen, setNotificationDrawerOpen } = useApp();

  return (
    <ErrorBoundary>
      <ScrollToTop />
      <div className="relative min-h-screen flex flex-col bg-slate-50 dark:bg-[#060913] text-slate-900 dark:text-slate-100 antialiased tech-grid-pattern selection:bg-cyan-500 selection:text-slate-950 transition-colors duration-200">
        
        {/* Advanced Multi-Layer Futuristic Immersive Background */}
        <FuturisticBackground />

        {/* Streamlined Public Collegiate Header */}
        <PublicHeader />

        {/* Dynamic Public Route Content */}
        <main id="main-content" className="flex-1 relative z-10">
          <Routes>
            {/* Public Departmental Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<CourseDetails />} />
            <Route path="/labs" element={<Labs />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/notices" element={<Notices />} />
            <Route path="/clubs-and-projects" element={<ClubsAndProjects />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/alumni" element={<Alumni />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<EventDetails />} />

            {/* Seamless Redirects for Decommissioned Student Portal URLs */}
            <Route path="/dashboard" element={<Navigate to="/" replace />} />
            <Route path="/assignments" element={<Navigate to="/courses" replace />} />
            <Route path="/timetable" element={<Navigate to="/events" replace />} />
            <Route path="/tech-zone" element={<Navigate to="/labs" replace />} />
            <Route path="/profile" element={<Navigate to="/about" replace />} />
            <Route path="/portal" element={<Navigate to="/" replace />} />

            {/* Catch-all 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* Global Comprehensive Institutional Footer */}
        <Footer />

        {/* Notification Drawer */}
        <NotificationDrawer
          isOpen={notificationDrawerOpen}
          onClose={() => setNotificationDrawerOpen(false)}
        />

        {/* Floating AI Helper Widget */}
        <FutureBot />

        {/* Command Palette (Ctrl + K) Search */}
        <CommandPalette />

        {/* Toast Notification Container */}
        <ToastContainer />

      </div>
    </ErrorBoundary>
  );
};

export default App;
