import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { initialCourses } from '../../data/courses';
import { initialNotices } from '../../data/notices';
import { initialEvents } from '../../data/events';
import { initialProjects } from '../../data/projects';
import { initialAchievements } from '../../data/achievements';
import { initialFaculty } from '../../data/faculty';
import {
  Search,
  BookOpen,
  Bell,
  Calendar,
  Code2,
  Trophy,
  Users,
  Terminal,
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

  // Filter datasets based on query
  const q = query.toLowerCase().trim();

  const matchedCourses = initialCourses
    .filter(c => c.title.toLowerCase().includes(q) || c.category.toLowerCase().includes(q) || c.technologies.some(t => t.toLowerCase().includes(q)))
    .slice(0, 3)
    .map(c => ({
      id: `course-${c.id}`,
      type: "Course",
      title: c.title,
      subtitle: `${c.category} • ${c.difficulty}`,
      icon: BookOpen,
      iconColor: "text-sky-400",
      url: `/courses/${c.id}`
    }));

  const matchedNotices = initialNotices
    .filter(n => n.title.toLowerCase().includes(q) || n.category.toLowerCase().includes(q) || n.summary.toLowerCase().includes(q))
    .slice(0, 2)
    .map(n => ({
      id: `notice-${n.id}`,
      type: "Notice",
      title: n.title,
      subtitle: `${n.category} • ${n.date}`,
      icon: Bell,
      iconColor: "text-amber-400",
      url: `/notices`
    }));

  const matchedEvents = initialEvents
    .filter(e => e.title.toLowerCase().includes(q) || e.category.toLowerCase().includes(q) || e.venue.toLowerCase().includes(q))
    .slice(0, 2)
    .map(e => ({
      id: `event-${e.id}`,
      type: "Event",
      title: e.title,
      subtitle: `${e.category} • ${e.date}`,
      icon: Calendar,
      iconColor: "text-emerald-400",
      url: `/events/${e.id}`
    }));

  const matchedProjects = initialProjects
    .filter(p => p.name.toLowerCase().includes(q) || p.technologies.some(t => t.toLowerCase().includes(q)))
    .slice(0, 2)
    .map(p => ({
      id: `proj-${p.id}`,
      type: "Project",
      title: p.name,
      subtitle: `${p.category} • ${p.studentTeam}`,
      icon: Code2,
      iconColor: "text-purple-400",
      url: `/projects`
    }));

  const matchedAchievements = initialAchievements
    .filter(a => a.achievement.toLowerCase().includes(q) || a.competitionOrg.toLowerCase().includes(q))
    .slice(0, 2)
    .map(a => ({
      id: `ach-${a.id}`,
      type: "Achievement",
      title: a.achievement,
      subtitle: `${a.studentTeam} • ${a.competitionOrg}`,
      icon: Trophy,
      iconColor: "text-yellow-400",
      url: `/achievements`
    }));

  const matchedFaculty = initialFaculty
    .filter(f => f.name.toLowerCase().includes(q) || f.department.toLowerCase().includes(q) || f.specialization.toLowerCase().includes(q))
    .slice(0, 2)
    .map(f => ({
      id: `fac-${f.id}`,
      type: "Faculty",
      title: f.name,
      subtitle: `${f.department} • ${f.specialization}`,
      icon: Users,
      iconColor: "text-rose-400",
      url: `/about`
    }));

  // Quick navigation destinations when search is empty
  const defaultActions = [
    { id: "act-courses", type: "Navigation", title: "Explore All Courses", subtitle: "Cyber Security, AI/ML, Cloud, IoT, Web", icon: BookOpen, iconColor: "text-sky-400", url: "/courses" },
    { id: "act-techzone", type: "Navigation", title: "Open Tech Zone", subtitle: "Coding challenges, AI & Cyber quizzes, Leaderboard", icon: Terminal, iconColor: "text-cyan-400", url: "/tech-zone" },
    { id: "act-timetable", type: "Navigation", title: "Weekly Timetable", subtitle: "Lecture & practical schedule", icon: Calendar, iconColor: "text-indigo-400", url: "/timetable" },
    { id: "act-assignments", type: "Navigation", title: "Assignments & Submissions", subtitle: "Track deliverables and scores", icon: Code2, iconColor: "text-emerald-400", url: "/assignments" },
    { id: "act-labs", type: "Navigation", title: "Interactive Labs Sandbox", subtitle: "Browser-based code executor & exercises", icon: Terminal, iconColor: "text-purple-400", url: "/labs" }
  ];

  const results = q ? [
    ...matchedCourses,
    ...matchedNotices,
    ...matchedEvents,
    ...matchedProjects,
    ...matchedAchievements,
    ...matchedFaculty
  ] : defaultActions;

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
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        onClick={() => setCommandPaletteOpen(false)}
      />

      {/* Palette box */}
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800 gap-3">
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
            placeholder="Type to search courses, notices, events, labs, projects... (or Esc to exit)"
            className="w-full bg-transparent text-slate-100 placeholder-slate-400 text-sm md:text-base focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="hidden sm:inline-block px-2 py-0.5 text-xs font-mono text-slate-400 bg-slate-800 rounded border border-slate-700">
            ESC
          </span>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-2 divide-y divide-slate-800/40">
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
                    isSelected ? 'bg-sky-500/10 text-white border border-sky-500/20' : 'text-slate-300 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`p-2 rounded-lg bg-slate-800 border border-slate-700/50 ${item.iconColor}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">{item.type}</span>
                      </div>
                      <p className="text-sm font-medium text-slate-100 truncate">{item.title}</p>
                      <p className="text-xs text-slate-400 truncate">{item.subtitle}</p>
                    </div>
                  </div>
                  <ArrowRight className={`w-4 h-4 text-slate-400 transition-transform ${isSelected ? 'translate-x-1 text-sky-400' : ''}`} />
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center text-slate-400 text-sm">
              No matching records found for "{query}".
            </div>
          )}
        </div>

        {/* Keyboard Footer Helper */}
        <div className="px-4 py-2 bg-slate-950/80 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span><kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700">↑</kbd> <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700">↓</kbd> to navigate</span>
            <span><kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700">Enter</kbd> to select</span>
          </div>
          <span className="hidden sm:inline">Future Skills Search Matrix</span>
        </div>
      </div>
    </div>
  );
};
