import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { initialCourses } from '../data/courses';
import { initialEvents } from '../data/events';
import { initialNotices } from '../data/notices';
import { initialProjects } from '../data/projects';
import { dailyQuestion } from '../data/quizzes';
import { CourseCard } from '../components/cards/CourseCard';
import { EventCard } from '../components/cards/EventCard';
import { NoticeCard } from '../components/cards/NoticeCard';
import { EventRegisterModal } from '../components/modals/EventRegisterModal';
import { NoticeDetailModal } from '../components/modals/NoticeDetailModal';
import { CourseEnrollModal } from '../components/modals/CourseEnrollModal';
import { eventService } from '../services/eventService';
import { courseService } from '../services/courseService';
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  Calendar,
  Bell,
  Code2,
  Terminal,
  Award,
  Zap,
  Shield,
  Cpu,
  Layers,
  CheckCircle,
  TrendingUp,
  Flame,
  ChevronRight
} from 'lucide-react';

export const Home = () => {
  const { user, levelInfo } = useApp();
  const navigate = useNavigate();

  // Modals state
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const featuredCourse = initialCourses[0];
  const upcomingEvent = initialEvents[0];
  const latestNotice = initialNotices[0];
  const projectOfMonth = initialProjects.find(p => p.isProjectOfMonth) || initialProjects[0];

  const quickAccessCards = [
    { title: "Courses", icon: BookOpen, desc: "Cyber, AI, Cloud & Web Specializations", url: "/courses", color: "from-sky-500/20 to-brand-500/5", border: "border-sky-500/30", iconColor: "text-sky-400" },
    { title: "Timetable", icon: Calendar, desc: "Weekly Classes, Labs & Room Codes", url: "/timetable", color: "from-purple-500/20 to-indigo-500/5", border: "border-purple-500/30", iconColor: "text-purple-400" },
    { title: "Notices", icon: Bell, desc: "Circulars, Exams & Internship Drives", url: "/notices", color: "from-amber-500/20 to-orange-500/5", border: "border-amber-500/30", iconColor: "text-amber-400" },
    { title: "Assignments", icon: Code2, desc: "Pending Deadlines & Code Deliverables", url: "/assignments", color: "from-emerald-500/20 to-teal-500/5", border: "border-emerald-500/30", iconColor: "text-emerald-400" },
    { title: "Interactive Labs", icon: Terminal, desc: "In-Browser Code Execution Sandboxes", url: "/labs", color: "from-cyan-500/20 to-blue-500/5", border: "border-cyan-500/30", iconColor: "text-cyan-400" },
    { title: "Tech Events", icon: Zap, desc: "Hackathons, Seminars & Workshops", url: "/events", color: "from-rose-500/20 to-pink-500/5", border: "border-rose-500/30", iconColor: "text-rose-400" }
  ];

  return (
    <div className="space-y-16 pb-12">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-8 md:pt-16 pb-12 border-b border-slate-800/60">
        {/* Glow ambient background effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-sky-500/15 via-indigo-600/15 to-purple-600/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute -top-12 -left-12 w-96 h-96 bg-brand-500/10 blur-[90px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Copy */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Badge Announcement */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-sky-500/30 text-xs text-sky-300 shadow-inner">
                <span className="flex h-2 w-2 rounded-full bg-sky-400 animate-ping" />
                <span className="font-semibold tracking-wide">Future Skills Academic Technology Portal</span>
                <span className="text-slate-400 hidden sm:inline">• 2026/2027 Cohort Active</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                Shape Your Future With{' '}
                <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
                  Technology.
                </span>
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Learn emerging technologies, build real-world projects, participate in competitions, and prepare yourself for the future of work.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/courses"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 via-brand-600 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-sky-500/25 transition-all hover:scale-[1.02]"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Explore Courses</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/tech-zone"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white font-bold text-sm border border-slate-700/80 shadow-lg transition-all hover:scale-[1.02]"
                >
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  <span>Explore Tech Zone</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                    XP Hub
                  </span>
                </Link>
              </div>

              {/* Quick Status Stats */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-800/80 text-left max-w-lg mx-auto lg:mx-0">
                <div>
                  <span className="text-xl sm:text-2xl font-black text-white block">8 Tracks</span>
                  <span className="text-xs text-slate-400">Specializations</span>
                </div>
                <div>
                  <span className="text-xl sm:text-2xl font-black text-sky-400 block">100% Free</span>
                  <span className="text-xs text-slate-400">Student Access</span>
                </div>
                <div>
                  <span className="text-xl sm:text-2xl font-black text-indigo-400 block">48-Hr</span>
                  <span className="text-xs text-slate-400">Hackathon Open</span>
                </div>
              </div>
            </div>

            {/* Hero Interactive Tech Card Visualization */}
            <div className="lg:col-span-5 relative">
              <div className="glass-panel p-6 rounded-3xl border border-sky-500/30 shadow-2xl relative overflow-hidden space-y-4">
                {/* Floating header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="text-xs font-mono text-slate-400 ml-2">future-skills.env</span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    SYSTEM OPERATIONAL
                  </span>
                </div>

                {/* Simulated Terminal Live Snippet */}
                <div className="bg-slate-950/90 rounded-2xl p-4 font-mono text-xs text-slate-300 space-y-2 border border-slate-800/80 shadow-inner">
                  <p className="text-sky-400">$ student.initProfile("{user.name}")</p>
                  <p className="text-slate-400">&gt; Level: <span className="text-white font-bold">{levelInfo.title}</span> (Lvl {levelInfo.levelNumber})</p>
                  <p className="text-slate-400">&gt; Gamification Points: <span className="text-amber-400 font-bold">{user.points} XP</span></p>
                  <p className="text-slate-400">&gt; Active Badges: <span className="text-purple-400 font-bold">{user.badges.length} Unlocked</span></p>
                  <p className="text-emerald-400">&gt; Ready for next engineering challenge.</p>
                </div>

                {/* Daily Tech Question Teaser Card */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 text-xs space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="font-semibold text-sky-400 flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 text-amber-400" />
                      Daily Tech Challenge
                    </span>
                    <span className="text-amber-400 font-mono font-bold">+50 XP</span>
                  </div>
                  <p className="text-slate-200 font-medium line-clamp-2">
                    {dailyQuestion.question}
                  </p>
                  <Link
                    to="/tech-zone"
                    className="inline-flex items-center gap-1 text-sky-400 hover:text-sky-300 font-bold pt-1"
                  >
                    Solve question now <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* QUICK ACCESS DASHBOARD (Section 6) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-400">Quick Access Dashboard</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">Student Command Hub</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md">
            Instant shortcuts to your daily engineering workflows, class schedules, lab workstations, and notices.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {quickAccessCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <Link
                key={idx}
                to={card.url}
                className={`glass-panel p-6 rounded-2xl border ${card.border} hover:border-sky-400 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-500/10 group flex flex-col justify-between`}
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center ${card.iconColor} mb-4 border border-slate-700/60 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors mb-1.5">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-sky-400 pt-4 group-hover:translate-x-1 transition-transform">
                  <span>Open section</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* UPCOMING HIGHLIGHTS (Section 7) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Upcoming Highlights</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">Featured Campus Spotlights</h2>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/events"
              className="text-xs font-semibold text-sky-400 hover:text-sky-300 inline-flex items-center gap-1"
            >
              All Events <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Featured Event Card */}
          <div className="glass-panel p-5 rounded-2xl border border-purple-500/30 flex flex-col justify-between group">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                Top Event
              </span>
              <h3 className="text-base font-bold text-white mt-3 group-hover:text-purple-300 transition-colors line-clamp-2">
                {upcomingEvent.title}
              </h3>
              <p className="text-xs text-slate-400 mt-2 line-clamp-3">
                {upcomingEvent.description}
              </p>
              <div className="text-xs text-slate-300 mt-4 space-y-1 border-t border-slate-800 pt-3">
                <p>📅 {upcomingEvent.date}</p>
                <p className="truncate">📍 {upcomingEvent.venue}</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedEvent(upcomingEvent)}
              className="mt-4 w-full py-2 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 font-semibold text-xs border border-purple-500/40 transition-colors"
            >
              Register Seats ({upcomingEvent.seatsRemaining} left)
            </button>
          </div>

          {/* Latest Notice Card */}
          <div className="glass-panel p-5 rounded-2xl border border-amber-500/30 flex flex-col justify-between group">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                Urgent Notice
              </span>
              <h3 className="text-base font-bold text-white mt-3 group-hover:text-amber-300 transition-colors line-clamp-2">
                {latestNotice.title}
              </h3>
              <p className="text-xs text-slate-400 mt-2 line-clamp-3">
                {latestNotice.summary}
              </p>
              <div className="text-xs text-slate-300 mt-4 border-t border-slate-800 pt-3">
                <p className="font-mono text-slate-400">📅 {latestNotice.date}</p>
                <p className="truncate text-slate-400">By: {latestNotice.author}</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedNotice(latestNotice)}
              className="mt-4 w-full py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-semibold text-xs border border-amber-500/40 transition-colors"
            >
              Read Circular Details
            </button>
          </div>

          {/* Featured Course Card */}
          <div className="glass-panel p-5 rounded-2xl border border-sky-500/30 flex flex-col justify-between group">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
                Featured Track
              </span>
              <h3 className="text-base font-bold text-white mt-3 group-hover:text-sky-300 transition-colors line-clamp-2">
                {featuredCourse.title}
              </h3>
              <p className="text-xs text-slate-400 mt-2 line-clamp-3">
                {featuredCourse.description}
              </p>
              <div className="text-xs text-slate-300 mt-4 border-t border-slate-800 pt-3 space-y-1">
                <p>⏳ {featuredCourse.duration} • {featuredCourse.difficulty}</p>
                <p className="truncate text-slate-400">{featuredCourse.instructor}</p>
              </div>
            </div>
            <Link
              to={`/courses/${featuredCourse.id}`}
              className="mt-4 w-full py-2 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 font-semibold text-xs text-center border border-sky-500/40 transition-colors"
            >
              View Full Syllabus
            </Link>
          </div>

          {/* Project of the Month Card */}
          <div className="glass-panel p-5 rounded-2xl border border-cyan-500/30 flex flex-col justify-between group">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                Project of the Month
              </span>
              <h3 className="text-base font-bold text-white mt-3 group-hover:text-cyan-300 transition-colors line-clamp-2">
                {projectOfMonth.name}
              </h3>
              <p className="text-xs text-slate-400 mt-2 line-clamp-3">
                {projectOfMonth.description}
              </p>
              <div className="text-xs text-slate-300 mt-4 border-t border-slate-800 pt-3">
                <p className="text-slate-400">Team: <span className="text-slate-200">{projectOfMonth.studentTeam}</span></p>
              </div>
            </div>
            <Link
              to="/projects"
              className="mt-4 w-full py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 font-semibold text-xs text-center border border-cyan-500/40 transition-colors"
            >
              Inspect Architecture
            </Link>
          </div>
        </div>
      </section>

      {/* POPULAR COURSES PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Curriculum</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">Core Technology Programs</h2>
          </div>
          <Link
            to="/courses"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-400 hover:text-sky-300"
          >
            <span>Browse all 8 Tracks</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {initialCourses.slice(0, 3).map((c) => (
            <CourseCard
              key={c.id}
              course={c}
              onEnrollClick={(course) => setSelectedCourse(course)}
            />
          ))}
        </div>
      </section>

      {/* MODALS */}
      <EventRegisterModal
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        event={selectedEvent}
        onRegistered={(id, data) => eventService.register(id, data)}
      />

      <NoticeDetailModal
        isOpen={!!selectedNotice}
        onClose={() => setSelectedNotice(null)}
        notice={selectedNotice}
      />

      <CourseEnrollModal
        isOpen={!!selectedCourse}
        onClose={() => setSelectedCourse(null)}
        course={selectedCourse}
        onConfirmed={(id) => courseService.enroll(id)}
      />

    </div>
  );
};
