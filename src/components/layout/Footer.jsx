import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Terminal, Shield, Cpu, ExternalLink, Mail, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 text-slate-400 text-sm mt-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">Future Skills</span>
            </Link>
            <p className="text-sky-400 font-medium text-xs tracking-wide">
              "Learn. Build. Innovate. Lead."
            </p>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              An advanced student technology platform empowering next-generation engineers in artificial intelligence, cybersecurity, cloud infrastructure, and modern software engineering.
            </p>
            <div className="flex items-center gap-2 pt-2 text-xs text-slate-400">
              <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
              <span>Future Skills Academic Technology Center</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Mail className="w-4 h-4 text-sky-400 shrink-0" />
              <span>contact@futureskills.placeholder.edu</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Platform</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/about" className="hover:text-sky-400 transition-colors">About Department</Link></li>
              <li><Link to="/courses" className="hover:text-sky-400 transition-colors">Course Catalog</Link></li>
              <li><Link to="/notices" className="hover:text-sky-400 transition-colors">Notice Board</Link></li>
              <li><Link to="/events" className="hover:text-sky-400 transition-colors">Events & Hackathons</Link></li>
              <li><Link to="/projects" className="hover:text-sky-400 transition-colors">Student Projects</Link></li>
              <li><Link to="/achievements" className="hover:text-sky-400 transition-colors">Hall of Fame</Link></li>
            </ul>
          </div>

          {/* Student Hub */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Student Hub</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/dashboard" className="hover:text-sky-400 transition-colors">Learning Dashboard</Link></li>
              <li><Link to="/timetable" className="hover:text-sky-400 transition-colors">Weekly Timetable</Link></li>
              <li><Link to="/assignments" className="hover:text-sky-400 transition-colors">Assignment Tracker</Link></li>
              <li><Link to="/labs" className="hover:text-sky-400 transition-colors">Interactive Labs</Link></li>
              <li><Link to="/tech-zone" className="hover:text-sky-400 transition-colors">Tech Zone & Quizzes</Link></li>
              <li><Link to="/profile" className="hover:text-sky-400 transition-colors">Student Profile</Link></li>
            </ul>
          </div>

          {/* Specializations */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Specializations</h4>
            <ul className="space-y-2 text-xs">
              <li><span className="text-slate-400">Cyber Security & Defense</span></li>
              <li><span className="text-slate-400">Artificial Intelligence & ML</span></li>
              <li><span className="text-slate-400">Cloud & Kubernetes DevOps</span></li>
              <li><span className="text-slate-400">Data Science & Analytics</span></li>
              <li><span className="text-slate-400">Full-Stack React & Node</span></li>
              <li><span className="text-slate-400">Industrial IoT & Edge</span></li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 mt-10 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Future Skills Department. Built for student innovation.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-300 cursor-pointer">Privacy Guidelines</span>
            <span className="hover:text-slate-300 cursor-pointer">Accessibility Statement</span>
            <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
