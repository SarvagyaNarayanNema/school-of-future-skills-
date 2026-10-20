import React from 'react';
import { Link } from 'react-router-dom';
import { initialCourses } from '../data/courses';
import { wallOfFameSpotlights, initialAchievements } from '../data/achievements';
import { initialNotices } from '../data/notices';
import { initialTechClubs, initialStudentProjects } from '../data/clubsAndProjects';
import { initialAlumni } from '../data/alumni';
import { FacultySection } from '../components/sections/FacultySection';
import { BuildersSection } from '../components/sections/BuildersSection';
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  Trophy,
  Bell,
  Users,
  GraduationCap,
  Code2,
  Terminal,
  Shield,
  Cpu,
  Star,
  ExternalLink,
  Flame,
  CheckCircle2
} from 'lucide-react';

export const Home = () => {
  const topCourse = initialCourses[0];
  const topSpotlight = wallOfFameSpotlights[0];
  const urgentNotice = initialNotices[0];
  const featuredClub = initialTechClubs[1]; // AI Syndicate
  const featuredProject = initialStudentProjects[0]; // NeuralShield
  const featuredAlumni = initialAlumni[0]; // Google DeepMind

  const stats = [
    { label: "Active Student Innovators", value: "1,450+", icon: Users, color: "text-cyan-400" },
    { label: "Hackathons & Contests Won", value: "38+", icon: Trophy, color: "text-yellow-400" },
    { label: "Active Technical Clubs", value: "2 Guilds", icon: Terminal, color: "text-purple-400" },
    { label: "Placed Alumni at Top Tech", value: "420+", icon: GraduationCap, color: "text-blue-400" }
  ];

  return (
    <div className="space-y-20 pb-16">
      
      {/* ========================================================= */}
      {/* 1. HIGH-IMPACT HERO SECTION                              */}
      {/* ========================================================= */}
      <section className="relative overflow-hidden pt-10 md:pt-16 pb-16 border-b border-slate-200 dark:border-slate-800/60">
        {/* Subtle Ambient Glow Blobs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-cyan-500/15 via-blue-600/15 to-purple-600/10 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Badge Announcement */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50/80 dark:bg-slate-900/90 border border-cyan-500/30 text-xs text-cyan-800 dark:text-cyan-300 shadow-[0_0_12px_rgba(0,210,255,0.15)]">
                <span className="flex h-2 w-2 rounded-full bg-cyan-500 animate-ping" />
                <span className="font-semibold tracking-wide">Future Skills Student Platform</span>
                <span className="text-slate-500 dark:text-slate-400 hidden sm:inline">• Academic Year 2026</span>
              </div>

              {/* Tagline Heading */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                Empowering the{' '}
                <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 dark:from-cyan-400 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                  Next Generation
                </span>{' '}
                of Technologists.
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Master emerging computer science domains, publish breakthrough research, build open-source student capstones, and prepare for tier-1 engineering careers.
              </p>

              {/* Primary CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/courses"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-sm shadow-[0_0_24px_rgba(0,210,255,0.3)] transition-all hover:scale-[1.02]"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Explore Courses</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/clubs-and-projects"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 hover:text-slate-900 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-slate-200 dark:hover:text-white font-bold text-sm border border-slate-300 dark:border-slate-700/80 shadow-sm dark:shadow-lg transition-all hover:scale-[1.02]"
                >
                  <Code2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  <span>View Club Projects</span>
                </Link>
              </div>

              {/* Verified Trust Strip */}
              <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs text-slate-600 dark:text-slate-400">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> Open Source First</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> FAANG Alumni Mentors</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> Free Student Access</span>
              </div>

            </div>

            {/* Right Hero Interactive Teaser Card */}
            <div className="lg:col-span-5 relative">
              <div className="glass-panel p-6 rounded-3xl border border-cyan-500/30 shadow-2xl relative overflow-hidden space-y-4">
                
                {/* Header Window Bar */}
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400 ml-2">future-skills.tech</span>
                  </div>
                  <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20 font-bold">
                    PORTAL ACTIVE
                  </span>
                </div>

                {/* Live Spotlight Teaser */}
                <div className="bg-slate-50/90 dark:bg-[#0B0F19] rounded-2xl p-4 border border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-cyan-700 dark:text-cyan-400 font-bold flex items-center gap-1.5">
                      <Trophy className="w-3.5 h-3.5 text-yellow-500 dark:text-yellow-400" /> Wall of Fame Spotlight
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">{topSpotlight.year}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                    {topSpotlight.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                    {topSpotlight.description}
                  </p>
                  <div className="pt-1 flex items-center justify-between text-xs">
                    <span className="text-amber-600 dark:text-amber-400 font-medium">{topSpotlight.award}</span>
                    <Link to="/achievements" className="text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1 font-semibold">
                      Explore <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>

                {/* Urgent Circular Snippet */}
                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Bell className="w-4 h-4 text-amber-500 dark:text-amber-400 shrink-0 animate-bounce" />
                    <span className="text-amber-900 dark:text-amber-200 font-medium truncate">
                      {urgentNotice.title}
                    </span>
                  </div>
                  <Link
                    to="/notices"
                    className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-[11px] shrink-0 transition-colors"
                  >
                    View Notice
                  </Link>
                </div>

              </div>
            </div>

          </div>

          {/* ========================================================= */}
          {/* LIVE STATS COUNTER STRIP                                  */}
          {/* ========================================================= */}
          <div className="mt-14 pt-8 border-t border-slate-200 dark:border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div key={idx} className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-slate-800/80 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono">{s.value}</span>
                    <Icon className={`w-5 h-5 ${s.color}`} />
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">{s.label}</span>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. QUICK-PEEK HIGHLIGHTS (FOR ALL 5 CORE SECTIONS)       */}
      {/* ========================================================= */}
      <section id="courses" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-mono">Platform Architecture</span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">5 Pillars of Future Skills</h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            A comprehensive ecosystem spanning interactive learning, competitive milestones, student guilds, and lifelong alumni support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* 1. COURSES PEEK */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                  <BookOpen className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20 font-bold">
                  01. CURRICULUM
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                Specialized Courses
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                5 industry-aligned technology tracks: AI/ML, Cyber Security, Cloud Computing, Full Stack Web, and Data Science with syllabus previews.
              </p>
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 space-y-1">
                <p className="font-semibold text-slate-900 dark:text-white truncate">Featured: {topCourse.title}</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">{topCourse.duration} • {topCourse.difficulty}</p>
              </div>
            </div>
            <Link
              to="/courses"
              className="mt-5 inline-flex items-center justify-between text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 pt-2 border-t border-slate-200 dark:border-slate-800"
            >
              <span>Explore All Courses</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* 2. ACHIEVEMENTS PEEK */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-yellow-500/50 transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-2xl bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border border-yellow-500/20">
                  <Trophy className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono text-yellow-600 dark:text-yellow-400 bg-yellow-500/10 px-2 py-0.5 rounded border border-yellow-500/20 font-bold">
                  02. WALL OF FAME
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-yellow-600 dark:group-hover:text-yellow-300 transition-colors">
                Student Achievements
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Showcasing world champions in cyber war-games, patent grants, top ICPC ranks, and best academic research papers.
              </p>
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 space-y-1">
                <p className="font-semibold text-slate-900 dark:text-white truncate">{topSpotlight.badge}: {topSpotlight.team}</p>
                <p className="text-[11px] text-yellow-600 dark:text-yellow-400 font-mono">{topSpotlight.award}</p>
              </div>
            </div>
            <Link
              to="/achievements"
              className="mt-5 inline-flex items-center justify-between text-xs font-bold text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300 pt-2 border-t border-slate-200 dark:border-slate-800"
            >
              <span>Browse Wall of Fame</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* 3. NOTICES PEEK */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                  <Bell className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 font-bold">
                  03. CIRCULARS
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors">
                Official Notices
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Centralized bulletin board for upcoming hackathon registrations, practical exam slots, GPU cluster quotas, and workshops.
              </p>
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 space-y-1">
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-700 dark:text-amber-300">
                  {urgentNotice.priority}
                </span>
                <p className="font-semibold text-slate-900 dark:text-white line-clamp-1 pt-1">{urgentNotice.title}</p>
              </div>
            </div>
            <Link
              to="/notices"
              className="mt-5 inline-flex items-center justify-between text-xs font-bold text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 pt-2 border-t border-slate-200 dark:border-slate-800"
            >
              <span>Check All Circulars</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* 4. STUDENT CLUBS & PROJECTS PEEK */}
          <div id="clubs" className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-purple-500/50 transition-all duration-300 flex flex-col justify-between group md:col-span-2 lg:col-span-2">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                  <Users className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono text-purple-600 dark:text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20 font-bold">
                  04. CLUBS & CAPSTONES
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
                Student Clubs & Project Showcase
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Join premier departmental societies (Binary Battle Club, Cyber Warriors Club) or discover open-source student software repositories.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                  <span className="text-purple-600 dark:text-purple-400 font-mono text-[11px] font-bold">Featured Club:</span>
                  <p className="font-semibold text-slate-900 dark:text-white">{featuredClub.name}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">{featuredClub.activeMembers} Members Active</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                  <span className="text-cyan-600 dark:text-cyan-400 font-mono text-[11px] font-bold">Featured Project:</span>
                  <p className="font-semibold text-slate-900 dark:text-white truncate">{featuredProject.name}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">{featuredProject.likes} Upvotes • {featuredProject.studentTeam.split(',')[0]}</p>
                </div>
              </div>
            </div>
            <Link
              to="/clubs-and-projects"
              className="mt-5 inline-flex items-center justify-between text-xs font-bold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 pt-2 border-t border-slate-200 dark:border-slate-800"
            >
              <span>Explore Clubs & Projects Showcase</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* 5. ALUMNI PEEK */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20 font-bold">
                  05. MENTORSHIP
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
                Alumni Network
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Connect with graduates now at Google DeepMind, AWS, Stripe, and CrowdStrike for 1-on-1 resume reviews and technical interview prep.
              </p>
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 space-y-1">
                <p className="font-semibold text-slate-900 dark:text-white">{featuredAlumni.name}</p>
                <p className="text-[11px] text-blue-600 dark:text-blue-300">{featuredAlumni.currentRole} at {featuredAlumni.company}</p>
              </div>
            </div>
            <Link
              to="/alumni"
              className="mt-5 inline-flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 pt-2 border-t border-slate-200 dark:border-slate-800"
            >
              <span>Book Alumni Mentorship</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>

      </section>

      {/* ========================================================= */}
      {/* 3. DEDICATED FACULTY & MENTORS SECTION                    */}
      {/* ========================================================= */}
      <FacultySection />

      {/* ========================================================= */}
      {/* 4. DEDICATED WEBSITE BUILDERS & CREATORS SECTION          */}
      {/* ========================================================= */}
      <BuildersSection />

    </div>
  );
};
