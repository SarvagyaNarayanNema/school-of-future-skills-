import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { initialCourses } from '../../data/courses';
import { initialNotices } from '../../data/notices';
import { initialAchievements } from '../../data/achievements';
import { initialTechClubs, initialStudentProjects } from '../../data/clubsAndProjects';
import { initialAlumni } from '../../data/alumni';
import {
  Search,
  BookOpen,
  Trophy,
  Bell,
  Users,
  GraduationCap,
  Code2,
  ArrowRight,
  X
} from 'lucide-react';

export const CommandPalette = () => {
  const { commandPaletteOpen, setCommandPaletteOpen } = useApp();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (commandPaletteOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [commandPaletteOpen]);

  if (!commandPaletteOpen) return null;

  const q = query.toLowerCase().trim();

  // Search across courses
  const matchedCourses = initialCourses
    .filter(c => c.title.toLowerCase().includes(q) || c.category.toLowerCase().includes(q) || c.technologies.some(t => t.toLowerCase().includes(q)))
    .slice(0, 2)
    .map(c => ({
      id: `course-${c.id}`,
      type: "Course",
      title: c.title,
      subtitle: `${c.category} • ${c.difficulty}`,
      icon: BookOpen,
      iconColor: "text-cyan-400",
      url: `/courses`
    }));

  // Search across notices
  const matchedNotices = initialNotices
    .filter(n => n.title.toLowerCase().includes(q) || n.priority.toLowerCase().includes(q) || n.summary.toLowerCase().includes(q))
    .slice(0, 2)
    .map(n => ({
      id: `notice-${n.id}`,
      type: "Notice",
      title: n.title,
      subtitle: `${n.priority} • ${n.date}`,
      icon: Bell,
      iconColor: "text-amber-400",
      url: `/notices`
    }));

  // Search across achievements
  const matchedAchievements = initialAchievements
    .filter(a => a.title.toLowerCase().includes(q) || a.team.toLowerCase().includes(q) || a.category.toLowerCase().includes(q))
    .slice(0, 2)
    .map(a => ({
      id: `ach-${a.id}`,
      type: "Achievement",
      title: a.title,
      subtitle: `${a.category} • ${a.team}`,
      icon: Trophy,
      iconColor: "text-yellow-400",
      url: `/achievements`
    }));

  // Search across clubs & projects
  const matchedClubs = initialTechClubs
    .filter(c => c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q) || c.tags.some(t => t.toLowerCase().includes(q)))
    .slice(0, 2)
    .map(c => ({
      id: `club-${c.id}`,
      type: "Tech Club",
      title: c.name,
      subtitle: `${c.activeMembers} Members • Lead: ${c.lead.split(' ')[0]}`,
      icon: Users,
      iconColor: "text-purple-400",
      url: `/clubs-and-projects`
    }));

  const matchedProjects = initialStudentProjects
    .filter(p => p.name.toLowerCase().includes(q) || p.studentTeam.toLowerCase().includes(q) || p.technologies.some(t => t.toLowerCase().includes(q)))
    .slice(0, 2)
    .map(p => ({
      id: `proj-${p.id}`,
      type: "Student Project",
      title: p.name,
      subtitle: `${p.category} • ${p.studentTeam}`,
      icon: Code2,
      iconColor: "text-emerald-400",
      url: `/clubs-and-projects`
    }));

  // Search across alumni
  const matchedAlumni = initialAlumni
    .filter(al => al.name.toLowerCase().includes(q) || al.company.toLowerCase().includes(q) || al.currentRole.toLowerCase().includes(q))
    .slice(0, 2)
    .map(al => ({
      id: `alumni-${al.id}`,
      type: "Alumni Leader",
      title: al.name,
      subtitle: `${al.currentRole} at ${al.company} (${al.batch})`,
      icon: GraduationCap,
      iconColor: "text-blue-400",
      url: `/alumni`
    }));

  // Default Quick Navigation when empty
  const defaultShortcuts = [
    { id: "nav-courses", type: "Navigation", title: "All Courses", subtitle: "Explore AI, Cyber Security, Cloud, Web, Data Science", icon: BookOpen, iconColor: "text-cyan-400", url: "/courses" },
    { id: "nav-achievements", type: "Navigation", title: "Wall of Fame & Achievements", subtitle: "Hackathon champions, patents & research honors", icon: Trophy, iconColor: "text-yellow-400", url: "/achievements" },
    { id: "nav-notices", type: "Navigation", title: "Official Notice Board", subtitle: "Hackathon updates, exam dates & circulars", icon: Bell, iconColor: "text-amber-400", url: "/notices" },
    { id: "nav-cp", type: "Navigation", title: "Student Clubs & Projects", subtitle: "Join tech guilds & explore open-source capstones", icon: Users, iconColor: "text-purple-400", url: "/clubs-and-projects" },
    { id: "nav-alumni", type: "Navigation", title: "Alumni Mentorship Directory", subtitle: "Book 1-on-1 mentorship with leaders at Google, AWS & Stripe", icon: GraduationCap, iconColor: "text-blue-400", url: "/alumni" }
  ];

  const results = q ? [
    ...matchedCourses,
    ...matchedNotices,
    ...matchedAchievements,
    ...matchedClubs,
    ...matchedProjects,
    ...matchedAlumni
  ] : defaultShortcuts;

  const handleSelect = (item) => {
    setCommandPaletteOpen(false);
    navigate(item.url);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (results.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + (results.length || 1)) % (results.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[selectedIndex]) {
        handleSelect(results[selectedIndex]);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0B0F19]/80 backdrop-blur-md"
        onClick={() => setCommandPaletteOpen(false)}
      />

      {/* Palette Box */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Search Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-slate-800 gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type to search courses, notices, clubs, projects, alumni... (Esc to exit)"
            className="w-full bg-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400 text-sm md:text-base focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="hidden sm:inline-block px-2 py-0.5 text-xs font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
            ESC
          </span>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-2 divide-y divide-slate-100 dark:divide-slate-800/40">
          {results.length > 0 ? (
            results.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors ${
                    isSelected ? 'bg-cyan-50 dark:bg-cyan-500/10 text-slate-900 dark:text-white border border-cyan-200 dark:border-cyan-500/20' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`p-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 ${item.iconColor}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">{item.type}</span>
                      </div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">{item.title}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{item.subtitle}</p>
                    </div>
                  </div>
                  <ArrowRight className={`w-4 h-4 text-slate-400 transition-transform ${isSelected ? 'translate-x-1 text-cyan-500 dark:text-cyan-400' : ''}`} />
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center text-slate-500 dark:text-slate-400 text-sm">
              No matching records found for "{query}".
            </div>
          )}
        </div>

        {/* Keyboard Helper */}
        <div className="px-4 py-2 bg-slate-50 dark:bg-[#0B0F19] border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span><kbd className="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded border border-slate-300 dark:border-slate-700">↑</kbd> <kbd className="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded border border-slate-300 dark:border-slate-700">↓</kbd> navigate</span>
            <span><kbd className="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded border border-slate-300 dark:border-slate-700">Enter</kbd> open</span>
          </div>
          <span>Future Skills Directory Search</span>
        </div>

      </div>
    </div>
  );
};
