import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { initialCourses } from '../data/courses';
import { wallOfFameSpotlights } from '../data/achievements';
import { initialEvents } from '../data/events';
import { initialTechClubs, initialStudentProjects } from '../data/clubsAndProjects';
import { initialAlumni } from '../data/alumni';
import { FacultySection } from '../components/sections/FacultySection';
import { BuildersSection } from '../components/sections/BuildersSection';
import { StatCard } from '../components/common/StatCard';
import { Button } from '../components/common/Button';
import { getImageFallback } from '../utils/assets';
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  Trophy,
  Users,
  GraduationCap,
  Code2,
  Terminal,
  Shield,
  Cpu,
  Star,
  ExternalLink,
  Flame,
  CheckCircle2,
  Calendar,
  MapPin,
  Clock,
  ArrowUpRight,
  Layers,
  ThumbsUp,
  Briefcase
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Home = () => {
  const { user, upvoteProject, userUpvotedProjects = [] } = useApp();
  const [selectedDomain, setSelectedDomain] = useState('All');

  const institutionalStats = [
    { label: "Active Student Innovators", value: "1,450+", icon: Users, color: "cyan", subtext: "Across 4 Technology Tracks" },
    { label: "National Contests Won", value: "38+", icon: Trophy, color: "amber", subtext: "Smart India, SIH & Global Hackathons" },
    { label: "Technical Guilds & Clubs", value: "2 Active", icon: Terminal, color: "purple", subtext: "AI Syndicate & CyberSec Brigade" },
    { label: "Placed Alumni at Top Tech", value: "420+", icon: GraduationCap, color: "blue", subtext: "Google, Microsoft, Zomato, AWS" }
  ];

  const featuredCourses = initialCourses.slice(0, 3);
  const featuredEvents = initialEvents.slice(0, 2);
  const featuredProjects = initialStudentProjects.slice(0, 2);
  const topSpotlight = wallOfFameSpotlights[0];
  const prominentAlumni = initialAlumni.slice(0, 3);

  const pillars = [
    {
      icon: Terminal,
      title: "Hands-On Practical Labs",
      description: "Step away from dry theory. Engage directly in production-grade code execution, network simulations, and live container sandboxes.",
      color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30"
    },
    {
      icon: Cpu,
      title: "Applied AI & Systems First",
      description: "Explore large language models, retrieval augmented generation, autonomous agent architectures, and high-performance computing.",
      color: "text-blue-400 bg-blue-500/10 border-blue-500/30"
    },
    {
      icon: Shield,
      title: "Cyber Defense War Room",
      description: "Practice ethical hacking, intrusion analysis, threat modeling, and defensive system hardening in competitive CTF environments.",
      color: "text-purple-400 bg-purple-500/10 border-purple-500/30"
    },
    {
      icon: Layers,
      title: "Open Source Capstones",
      description: "Build real tools with active student teams. Ship production releases to GitHub, collaborate with alumni, and present at national hackathons.",
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30"
    }
  ];

  return (
    <div className="space-y-24 pb-20">
      
      {/* ========================================================= */}
      {/* 1. HERO SECTION                                           */}
      {/* ========================================================= */}
      <section className="relative overflow-hidden pt-12 md:pt-20 pb-16 border-b border-slate-200 dark:border-slate-800/60">
        
        {/* Ambient Glow Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-cyan-500/15 via-blue-600/15 to-purple-600/10 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Heading & Calls to Action */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Institutional Badge Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50/90 dark:bg-slate-900/90 border border-cyan-500/30 text-xs text-cyan-800 dark:text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                <span className="flex h-2 w-2 rounded-full bg-cyan-500 animate-ping" />
                <span className="font-semibold tracking-wide">Scope Global Skills University</span>
                <span className="text-slate-500 dark:text-slate-400 hidden sm:inline">• School of Future Skills & IT</span>
              </div>

              {/* Master Headline from Plan */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.08]">
                Learn. Build.{' '}
                <span className="bg-gradient-to-r from-cyan-600 via-sky-500 to-blue-600 dark:from-cyan-400 dark:via-sky-300 dark:to-blue-400 bg-clip-text text-transparent">
                  Innovate.
                </span>{' '}
                Lead.
              </h1>

              {/* Supporting Editorial Paragraph */}
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Transform your curiosity into practical skills through technology-driven education, research, innovation and real-world projects. Master computer science, artificial intelligence, and cyber defense in a dedicated engineering ecosystem.
              </p>

              {/* Primary Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link to="/courses" className="w-full sm:w-auto">
                  <Button size="lg" variant="primary" icon={ArrowRight} iconPosition="right" className="w-full">
                    Explore Programmes
                  </Button>
                </Link>

                <Link to="/about" className="w-full sm:w-auto">
                  <Button size="lg" variant="secondary" icon={Sparkles} className="w-full">
                    Discover FSIT
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-600 dark:text-slate-400 font-medium">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-cyan-500" /> Industry Capstones</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-cyan-500" /> Alumni Mentorship</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-cyan-500" /> Research Laboratories</span>
              </div>

            </div>

            {/* Right Column: Interactive Terminal Preview Window */}
            <div className="lg:col-span-5 relative">
              <div className="glass-panel p-6 rounded-3xl border border-cyan-500/30 shadow-2xl relative overflow-hidden space-y-4">
                
                {/* Window Topbar */}
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400 ml-2">fsit.terminal.sh</span>
                  </div>
                  <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20 font-bold">
                    LIVE ECOSYSTEM
                  </span>
                </div>

                {/* Spotlight Teaser */}
                <div className="bg-slate-50/90 dark:bg-[#0B0F19] rounded-2xl p-4 border border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-cyan-700 dark:text-cyan-400 font-bold flex items-center gap-1.5">
                      <Trophy className="w-3.5 h-3.5 text-yellow-500" /> Wall of Fame Spotlight
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
                      Explore All <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>

                {/* Quick Link to Student Portal */}
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-blue-500/5 to-purple-500/10 border border-cyan-500/25 flex items-center justify-between gap-3 text-xs">
                  <div className="space-y-0.5">
                    <span className="font-bold text-slate-900 dark:text-white block">Enrolled Student Portal</span>
                    <span className="text-slate-500 dark:text-slate-400 text-[11px]">Assignments, Labs, Grades &amp; Timetable</span>
                  </div>
                  <Link
                    to="/dashboard"
                    className="px-3 py-1.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-[11px] hover:bg-cyan-400 transition-all shadow-sm shrink-0"
                  >
                    Launch &rarr;
                  </Link>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. INSTITUTIONAL HIGHLIGHTS / STATS                       */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <h2 className="text-xs font-mono font-bold tracking-widest text-cyan-600 dark:text-cyan-400 uppercase">
            Institutional Benchmarks
          </h2>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Excellence Validated by Results
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {institutionalStats.map((stat, i) => (
            <StatCard
              key={i}
              icon={stat.icon}
              label={stat.label}
              value={stat.value}
              subtext={stat.subtext}
              color={stat.color}
            />
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. WHY CHOOSE FUTURE SKILLS — EDITORIAL PILLARS           */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-slate-200 dark:border-slate-800 relative overflow-hidden">
          
          <div className="max-w-3xl space-y-3 mb-10 text-left">
            <span className="text-xs font-mono font-bold tracking-wider text-cyan-600 dark:text-cyan-400 uppercase">
              The FSIT Advantage
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              An Academic Model Built for the AI Century
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              We combine computer science rigor with real-world software engineering practices. Learn modern distributed systems, data analytics, and security in an immersive laboratory environment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((p, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 transition-all duration-300 hover:-translate-y-1 shadow-sm space-y-3"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${p.color}`}>
                  <p.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  {p.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {p.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. ACADEMIC PROGRAMMES SHOWCASE                           */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
          <div className="space-y-1.5">
            <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
              Undergraduate &amp; Postgraduate Curricula
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Featured Academic Programmes
            </h2>
          </div>
          <Link
            to="/courses"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:underline"
          >
            <span>View All 42+ Programmes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredCourses.map((c) => (
            <div
              key={c.id}
              className="glass-card flex flex-col justify-between overflow-hidden group p-5 space-y-4"
            >
              <div>
                <div className="relative aspect-video rounded-xl overflow-hidden mb-4 bg-slate-900 border border-slate-800">
                  <img
                    src={c.image}
                    alt={c.programme}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = getImageFallback(c.programme);
                    }}
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <span className="text-[10px] font-mono font-bold bg-[#0B0F19]/90 text-cyan-300 px-2.5 py-0.5 rounded-full border border-cyan-500/30">
                      {c.track || "B.C.A. (AI-ML)"}
                    </span>
                  </div>
                </div>

                <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors line-clamp-1">
                  {c.programme}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {c.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                <span className="font-mono text-slate-500 dark:text-slate-400 text-[11px]">{c.duration || "3 Years"}</span>
                <Link
                  to={`/courses/${c.id}`}
                  className="font-semibold text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
                >
                  <span>Syllabus</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. DISTINGUISHED FACULTY SECTION                          */}
      {/* ========================================================= */}
      <FacultySection />

      {/* ========================================================= */}
      {/* 6. PROJECTS & INNOVATION SHOWCASE                         */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
          <div className="space-y-1.5">
            <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
              Student Open Source Engineering
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Student Capstones &amp; Projects
            </h2>
          </div>
          <Link
            to="/clubs-and-projects?view=projects"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:underline"
          >
            <span>Explore All Projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredProjects.map((proj) => {
            const isUpvoted = userUpvotedProjects.includes(proj.id);
            return (
              <div
                key={proj.id}
                className="glass-card p-6 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-500/10 text-cyan-800 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-500/30">
                      {proj.category}
                    </span>
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400">Team {proj.author}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {proj.title || proj.name}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {proj.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {proj.techStack?.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-mono text-slate-700 dark:text-slate-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                  <button
                    onClick={() => upvoteProject(proj.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold border transition-colors ${
                      isUpvoted
                        ? 'bg-cyan-500 text-slate-950 border-cyan-400'
                        : 'bg-slate-100 dark:bg-slate-800/80 hover:bg-cyan-500/10 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{proj.upvotes} Upvotes</span>
                  </button>

                  <Link
                    to="/clubs-and-projects?view=projects"
                    className="text-xs text-cyan-600 dark:text-cyan-400 hover:underline font-semibold flex items-center gap-1"
                  >
                    <span>Inspect Capstone</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 7. UPCOMING EVENTS & HACKATHONS                           */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
          <div className="space-y-1.5">
            <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
              Hackathons &amp; Technical Guild Sessions
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Upcoming University Events
            </h2>
          </div>
          <Link
            to="/events"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:underline"
          >
            <span>Events Calendar</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredEvents.map((evt) => (
            <div
              key={evt.id}
              className="glass-card p-6 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-500/10 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-500/30">
                    {evt.category}
                  </span>
                  <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 font-semibold flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> {evt.date}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {evt.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                  {evt.description}
                </p>

                <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-cyan-500" /> {evt.time}</span>
                  <span className="flex items-center gap-1 truncate"><MapPin className="w-3.5 h-3.5 text-cyan-500" /> {evt.venue}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-amber-600 dark:text-amber-400 font-mono font-semibold">
                  {evt.seatsRemaining} Seats Remaining
                </span>
                <Link
                  to={`/events/${evt.id}`}
                  className="px-3.5 py-1.5 rounded-xl bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 transition-colors shadow-sm"
                >
                  View Details &amp; Register
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 8. ALUMNI NETWORK & IMPACT                                */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
          <div className="space-y-1.5">
            <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
              Graduates Shaping Tier-1 Technology
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Alumni Mentorship Network
            </h2>
          </div>
          <Link
            to="/alumni"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:underline"
          >
            <span>Alumni Directory</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {prominentAlumni.map((alum) => (
            <div
              key={alum.id}
              className="glass-card p-5 flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center font-bold text-cyan-400 shrink-0">
                    {alum.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white truncate">{alum.name}</h3>
                    <p className="text-xs text-cyan-600 dark:text-cyan-400 font-semibold truncate">{alum.currentRole}</p>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block">{alum.company}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                  {alum.bio || "Active alumni mentor supporting undergraduate engineers through capstone advisory and mock interview workshops."}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-emerald-600 dark:text-emerald-400 font-mono text-[11px] font-semibold">Available for Mentorship</span>
                <Link
                  to="/alumni?tab=mentorship"
                  className="font-bold text-cyan-600 dark:text-cyan-400 hover:underline"
                >
                  Book 1-on-1 &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 9. WEBSITE BUILDERS TEAM                                  */}
      {/* ========================================================= */}
      <BuildersSection />

      {/* ========================================================= */}
      {/* 10. FINAL CALL TO ACTION BANNER                           */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-8 sm:p-14 bg-gradient-to-r from-cyan-600 via-blue-700 to-indigo-800 text-white overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400/20 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-2xl space-y-5 text-left">
            <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-mono font-bold uppercase tracking-wider text-cyan-200">
              Admissions Open • Academic Year 2026-27
            </span>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Ready to Engineer Your Future in Emerging Tech?
            </h2>

            <p className="text-sm sm:text-base text-cyan-100 leading-relaxed">
              Join a community of ambitious technologists, researchers, and creators. Explore undergraduate and master's degree specializations at Scope Global Skills University.
            </p>

            <div className="pt-3 flex flex-wrap items-center gap-4">
              <Link to="/courses">
                <Button size="lg" className="bg-white text-slate-950 hover:bg-slate-100 font-bold shadow-lg">
                  Explore Curriculums
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button size="lg" variant="outline" className="text-white border-white/40 hover:bg-white/10 font-bold">
                  Access Student Portal
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
