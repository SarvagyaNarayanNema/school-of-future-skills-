import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { PublicHeader } from './components/layout/PublicHeader';
import { PortalLayout } from './components/layout/PortalLayout';
import { Footer } from './components/layout/Footer';
import { FutureBot } from './components/layout/FutureBot';
import { CommandPalette } from './components/common/CommandPalette';
import { NotificationDrawer } from './components/layout/NotificationDrawer';
import { ToastContainer } from './components/common/ToastContainer';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { useApp } from './context/AppContext';

// Public & Institutional Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Courses } from './pages/Courses';
import { CourseDetails } from './pages/CourseDetails';
import { Achievements } from './pages/Achievements';
import { Notices } from './pages/Notices';
import { ClubsAndProjects } from './pages/ClubsAndProjects';
import { Alumni } from './pages/Alumni';
import { Events } from './pages/Events';
import { EventDetails } from './pages/EventDetails';
import { Projects } from './pages/Projects';

// Student Portal & Interactive Learning Pages
import { Dashboard } from './pages/Dashboard';
import { Assignments } from './pages/Assignments';
import { Labs } from './pages/Labs';
import { TechZone } from './pages/TechZone';
import { Timetable } from './pages/Timetable';
import { Profile } from './pages/Profile';
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
  const location = useLocation();

  const PORTAL_PREFIXES = ['/dashboard', '/assignments', '/labs', '/tech-zone', '/timetable', '/profile'];
  const isPortal = PORTAL_PREFIXES.some(p => location.pathname === p || location.pathname.startsWith(p + '/'));

  return (
    <ErrorBoundary>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#080C16] text-slate-900 dark:text-slate-100 antialiased tech-grid-pattern selection:bg-cyan-500 selection:text-slate-950 transition-colors duration-200">
        
        {isPortal ? (
          <PortalLayout>
            <Routes>
              {/* Student Portal & Learning Ecosystem Routes */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/assignments" element={<Assignments />} />
              <Route path="/labs" element={<Labs />} />
              <Route path="/tech-zone" element={<TechZone />} />
              <Route path="/timetable" element={<Timetable />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </PortalLayout>
        ) : (
          <>
            {/* Streamlined Public Collegiate Header */}
            <PublicHeader />

            {/* Dynamic Public Route Content */}
            <main className="flex-1">
              <Routes>
                {/* Public Institutional Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/courses/:id" element={<CourseDetails />} />
                <Route path="/achievements" element={<Achievements />} />
                <Route path="/notices" element={<Notices />} />
                <Route path="/clubs-and-projects" element={<ClubsAndProjects />} />
                <Route path="/alumni" element={<Alumni />} />
                <Route path="/events" element={<Events />} />
                <Route path="/events/:id" element={<EventDetails />} />
                <Route path="/projects" element={<Projects />} />

                {/* Catch-all 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>

            {/* Global Comprehensive Footer */}
            <Footer />
          </>
        )}

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
