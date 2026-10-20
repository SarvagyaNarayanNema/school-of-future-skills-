import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { FutureBot } from './components/layout/FutureBot';
import { CommandPalette } from './components/common/CommandPalette';
import { ToastContainer } from './components/common/ToastContainer';
import { ErrorBoundary } from './components/common/ErrorBoundary';

// 5 Core Pages + Home & 404
import { Home } from './pages/Home';
import { Courses } from './pages/Courses';
import { Achievements } from './pages/Achievements';
import { Notices } from './pages/Notices';
import { ClubsAndProjects } from './pages/ClubsAndProjects';
import { Alumni } from './pages/Alumni';
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
  return (
    <ErrorBoundary>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 antialiased tech-grid-pattern selection:bg-cyan-500 selection:text-slate-950 transition-colors duration-200">
        
        {/* Sticky Top Navbar strictly holding Future Skills brand + 5 links */}
        <Navbar />

        {/* Dynamic Route Content */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/notices" element={<Notices />} />
            <Route path="/clubs-and-projects" element={<ClubsAndProjects />} />
            <Route path="/alumni" element={<Alumni />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* Global Footer */}
        <Footer />

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
