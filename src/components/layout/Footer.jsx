import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, MapPin, Mail, BookOpen, Trophy, Bell, Users, GraduationCap } from 'lucide-react';

export const Footer = () => {
  const builders = [
    { name: "Sarvagya Narayan Nema", image: "/builders/sarvagya.jpg" },
    { name: "Dimpy Rai", image: "/builders/dimpy.jpg" },
    { name: "Hemant", image: "/builders/hemant.jpg" },
    { name: "Soumya Malviya", image: "/builders/soumya.jpg" }
  ];

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0B0F19] text-slate-600 dark:text-slate-400 text-sm mt-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-10">
          
          {/* Brand Col */}
          <div className="sm:col-span-2 md:col-span-3 lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-[0_0_18px_rgba(242,101,34,0.3)] group-hover:shadow-[0_0_24px_rgba(217,70,239,0.5)] transition-all duration-300 shrink-0 bg-slate-900 border border-fuchsia-500/30 group-hover:border-amber-400/60 flex items-center justify-center p-0.5">
                <img
                  src="/fsit-neon-logo.png"
                  alt="School of Future Skills Logo"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="font-extrabold text-xl text-slate-900 dark:text-white tracking-tight group-hover:text-cyan-600 dark:group-hover:text-cyan-200 transition-colors">School of Future Skills</span>
            </Link>
            <p className="text-cyan-600 dark:text-cyan-400 font-medium text-xs tracking-wide">
              "Empowering the Next Generation of Technologists"
            </p>
            <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed max-w-sm">
              An advanced student technology platform empowering engineers in artificial intelligence, cybersecurity, cloud computing, modern web architecture, and algorithmic mastery.
            </p>
            <div className="space-y-1.5 pt-2 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                <span>Scope Global Skills University Campus, NH-12, Bhopal</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                <span>portal@futureskills.edu</span>
              </div>
            </div>
          </div>

          {/* New Column: WEBSITE BUILDERS / DEVELOPED BY */}
          <div className="space-y-3">
            <a href="/#builders" className="group/title inline-block">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 group-hover/title:text-cyan-600 dark:group-hover/title:text-cyan-300 transition-colors flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400" />
                Website Builders
              </h4>
            </a>
            <div className="space-y-3 pt-1">
              {builders.map((builder, idx) => (
                <a
                  key={idx}
                  href="/#builders"
                  className="flex items-center gap-2.5 group"
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-cyan-500/40 bg-slate-900 shrink-0 shadow-sm group-hover:border-cyan-400 group-hover:scale-105 transition-all">
                    <img
                      src={builder.image}
                      alt={builder.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <span className="text-xs md:text-sm text-slate-700 dark:text-slate-300 font-medium group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors truncate">
                    {builder.name}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links: Core 5 Pages */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">Core Platform</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/courses" className="text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" /> Courses (45)</Link></li>
              <li><Link to="/achievements" className="text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-1.5"><Trophy className="w-3.5 h-3.5 text-amber-500 dark:text-yellow-400" /> Wall of Fame</Link></li>
              <li><Link to="/notices" className="text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-1.5"><Bell className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" /> Circulars</Link></li>
              <li><Link to="/clubs-and-projects" className="text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" /> Clubs & Projects</Link></li>
              <li><Link to="/alumni" className="text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-1.5"><GraduationCap className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" /> Mentorship</Link></li>
            </ul>
          </div>

          {/* Specialization Domains */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">Curriculum Tracks</h4>
            <ul className="space-y-2 text-xs">
              <li><span className="text-slate-600 dark:text-slate-400">AI & Deep Learning</span></li>
              <li><span className="text-slate-600 dark:text-slate-400">Cyber Security & Zero Trust</span></li>
              <li><span className="text-slate-600 dark:text-slate-400">Cloud & Kubernetes DevOps</span></li>
              <li><span className="text-slate-600 dark:text-slate-400">Full Stack Web (React 19)</span></li>
              <li><span className="text-slate-600 dark:text-slate-400">Data Science & Analytics</span></li>
            </ul>
          </div>

          {/* Campus Initiatives & Guilds */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">Student Guilds</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/clubs-and-projects" className="text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors">Binary Battle Club</Link></li>
              <li><Link to="/clubs-and-projects" className="text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors">Cyber Warriors Club</Link></li>
              <li><Link to="/clubs-and-projects" className="text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors">NeuralShield Capstone</Link></li>
              <li><Link to="/clubs-and-projects" className="text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors">AuraDoc Clinical RAG</Link></li>
              <li><Link to="/clubs-and-projects" className="text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors">SkySense IoT Mesh</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-10 border-t border-slate-200 dark:border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Scope Global Skills University (SGSU) • Future Skills Platform.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-700 dark:hover:text-slate-400 cursor-pointer">Academic Guidelines</span>
            <span className="hover:text-slate-700 dark:hover:text-slate-400 cursor-pointer">Student Honor Code</span>
            <span className="hover:text-slate-700 dark:hover:text-slate-400 cursor-pointer">System Status (99.98%)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
