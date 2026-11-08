import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { initialCourses } from '../data/courses';
import { initialEvents } from '../data/events';
import { studentClubs } from '../data/clubsAndProjects';
import { initialProjects } from '../data/projects';
import { initialAlumni } from '../data/alumni';
import { wallOfFameSpotlights } from '../data/achievements';
import { FacultySection } from '../components/sections/FacultySection';
import { BuildersSection } from '../components/sections/BuildersSection';
import { FutureBotShowcaseSection } from '../components/sections/FutureBotShowcaseSection';
import { HeroKnowledgeCore } from '../components/three/HeroKnowledgeCore';
import { StatCard } from '../components/common/StatCard';
import { Button } from '../components/common/Button';
import { getImageFallback, getAssetUrl } from '../utils/assets';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useApp } from '../context/AppContext';

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
  Briefcase,
  Building2,
  Award,
  Radio,
  FileText
} from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const Home = () => {
  const { user, upvoteProject, userUpvotedProjects = [] } = useApp();
  const { prefersReducedMotion } = useReducedMotion();

  const heroRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);
  const badgeRef = useRef(null);
  const headlineLeftRef = useRef(null);
  const headlineRightRef = useRef(null);
  const paragraphRef = useRef(null);
  const ctaRef = useRef(null);
  const pillarsRef = useRef(null);

  // GSAP Refined Entrance & Responsive Scroll Kinematics for Asymmetric Hero
  useEffect(() => {
    if (prefersReducedMotion || !headlineLeftRef.current || !headlineRightRef.current) return;

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;

    // On mobile devices, disable entrance animations so content is immediately readable
    if (isMobile) return;

    const ctx = gsap.context(() => {
      // 1. Initial Page-Load Entrance Sequence (Fast, clean, non-blocking for tablet & desktop)
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out', duration: 0.65 },
        onComplete: () => {
          gsap.set(
            [
              badgeRef.current,
              headlineLeftRef.current,
              headlineRightRef.current,
              paragraphRef.current,
              ctaRef.current?.children,
              pillarsRef.current?.children,
              rightColRef.current
            ].filter(Boolean),
            { clearProps: 'opacity,transform,translate,scale,rotate' }
          );
        }
      });

      if (badgeRef.current) {
        tl.from(badgeRef.current, { y: -14, opacity: 0, duration: 0.5 });
      }

      tl.from(headlineLeftRef.current, { x: -30, opacity: 0, duration: 0.65 }, '-=0.3')
        .from(headlineRightRef.current, { x: -20, opacity: 0, duration: 0.65 }, '-=0.45');

      if (paragraphRef.current) {
        tl.from(paragraphRef.current, { y: 16, opacity: 0, duration: 0.55 }, '-=0.4');
      }

      if (ctaRef.current?.children) {
        tl.from(ctaRef.current.children, { y: 14, opacity: 0, stagger: 0.08, duration: 0.5 }, '-=0.35');
      }

      if (pillarsRef.current?.children) {
        tl.from(pillarsRef.current.children, { y: 10, opacity: 0, stagger: 0.06, duration: 0.45 }, '-=0.25');
      }

      if (rightColRef.current) {
        tl.from(rightColRef.current, { x: 30, scale: 0.97, opacity: 0, duration: 0.75, ease: 'power2.out' }, 0.1);
      }

      // 2. Responsive Scroll-Based Kinematics (Desktop only for optimal performance)
      if (isDesktop && heroRef.current) {
        if (leftColRef.current) {
          gsap.to(leftColRef.current, {
            x: -24,
            opacity: 0.75,
            ease: 'none',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 1.2,
            },
          });
        }

        if (rightColRef.current) {
          gsap.to(rightColRef.current, {
            y: 35,
            scale: 0.98,
            ease: 'none',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 1.2,
            },
          });
        }
      }
    }, heroRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  // Section 3: Verified Institutional Benchmarks
  const institutionalStats = [
    { label: "Active Student Innovators", value: "1,450+", icon: Users, color: "cyan", subtext: "Across 4 Engineering Tracks" },
    { label: "National Contests Won", value: "38+", icon: Trophy, color: "amber", subtext: "Smart India, SIH & Global Hackathons" },
    { label: "Specialized Research Labs", value: "4 Active", icon: Cpu, color: "purple", subtext: "AI, Cyber Defense, Cloud & IoT" },
    { label: "Placed Alumni at Top Tech", value: "420+", icon: GraduationCap, color: "blue", subtext: "Google DeepMind, AWS, Microsoft" }
  ];

  // Section 4: Flagship Academic Programmes
  const featuredCourses = initialCourses.slice(0, 4);

  // Section 5: Educational Pillars
  const pillars = [
    {
      icon: Terminal,
      title: "Hands-On Practical Labs",
      description: "Engage directly in production-grade code execution, network simulations, container sandboxes, and hardware testbeds from Semester 1.",
      color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30"
    },
    {
      icon: Cpu,
      title: "Applied AI & Systems First",
      description: "Explore foundation models, retrieval augmented generation, autonomous agent workflows, and tensor parallelism on dedicated compute clusters.",
      color: "text-blue-400 bg-blue-500/10 border-blue-500/30"
    },
    {
      icon: Shield,
      title: "Cyber Defense War Room",
      description: "Practice ethical hacking, threat modeling, kernel forensics, and active perimeter hardening in competitive international CTF arenas.",
      color: "text-purple-400 bg-purple-500/10 border-purple-500/30"
    },
    {
      icon: Layers,
      title: "Open Source Capstones",
      description: "Build authentic systems with student engineering squads. Publish real code to GitHub, collaborate with alumni, and present at national summits.",
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30"
    }
  ];

  // Section 6: University Research & Innovation Laboratories
  const researchLabs = [
    {
      id: "lab-ai",
      name: "Quantum & Neural Intelligence Lab",
      track: "Artificial Intelligence & HPC",
      focus: "Transformer memory alignment, eBPF telemetry, local LLM fine-tuning, and on-chip quantization.",
      hardware: "NVIDIA Tensor-Core Compute • PyTorch Accelerated Stacks",
      badge: "Flagship Research",
      color: "border-cyan-500/30 text-cyan-400 bg-cyan-500/10",
      icon: Cpu,
    },
    {
      id: "lab-sec",
      name: "Cyber Defense SOC & Forensics Arena",
      track: "Offensive & Defensive Security",
      focus: "Simulated industrial SCADA intrusion defense, packet reverse-engineering, and live CTF wargames.",
      hardware: "Isolated Attack-Defense Sandboxes • Threat Telemetry Wall",
      badge: "Industry Certified",
      color: "border-purple-500/30 text-purple-400 bg-purple-500/10",
      icon: Shield,
    },
    {
      id: "lab-cloud",
      name: "Cloud Native & DevOps Engineering Forge",
      track: "Distributed Systems & Infrastructure",
      focus: "Multi-tenant Kubernetes architectures, GitOps automation, service mesh observability, and resilience.",
      hardware: "Private Cloud Infrastructure • Bare-Metal Micro-Datacenter",
      badge: "DevOps Pipeline",
      color: "border-blue-500/30 text-blue-400 bg-blue-500/10",
      icon: Terminal,
    },
    {
      id: "lab-iot",
      name: "Smart Embedded Systems & IoT Foundry",
      track: "Edge Computing & Hardware",
      focus: "Ultra-low power sensor mesh networks, RISC-V edge prototyping, and real-time robotic telemetry.",
      hardware: "Hardware Logic Analyzers • Wireless Protocol Testbeds",
      badge: "Hardware Prototyping",
      color: "border-emerald-500/30 text-emerald-400 bg-emerald-500/10",
      icon: Layers,
    },
  ];

  // Section 7: Curated Real Department Projects Showcase
  const featuredProjects = initialProjects.filter((p) => p.featured).slice(0, 4);

  // Section 8: Achievements & Recognition Spotlights
  const spotlightAchievements = wallOfFameSpotlights.slice(0, 2);

  // Section 10: Student Life & Technical Guilds
  const clubs = studentClubs.slice(0, 2);

  // Section 11: Industry Collaboration & Career Development
  const careerHighlights = [
    {
      title: "Co-Created Curriculum with Industry",
      org: "Geeks of Gurukul Partnership",
      desc: "Specialized undergraduate curricula designed directly alongside tier-1 software architects to address verified industry engineering gaps.",
      icon: Briefcase,
    },
    {
      title: "Executive Training Credibility",
      org: "SBI, LIC, EPFO, RCVP Noronha Academy",
      desc: "Faculty and lab resources trusted by national administrative and financial institutions for executive and digital transformation sessions.",
      icon: Building2,
    },
    {
      title: "1-on-1 Alumni Capstone Advisory",
      org: "Global Alumni Mentorship Network",
      desc: "Direct weekly review sessions connecting student project teams with practicing engineers at Google DeepMind, AWS, and CrowdStrike.",
      icon: Users,
    },
    {
      title: "Dedicated Technical Placement Cell",
      org: "Scope Global Skills University Campus",
      desc: "Rigorous coding interview preparation, competitive programming hackathons, and direct campus recruitment drives.",
      icon: Award,
    },
  ];

  // Section 12: Prominent Alumni
  const prominentAlumni = initialAlumni.slice(0, 3);

  // Section 13: Events & Workshops
  const featuredEvents = initialEvents.slice(0, 2);

  return (
    <div className="space-y-24 md:space-y-32 pb-24">
      
      {/* ========================================================= */}
      {/* SECTION 2 — ASYMMETRIC SPLIT-SCREEN CINEMATIC HERO        */}
      {/* ========================================================= */}
      <section
        ref={heroRef}
        className="relative overflow-hidden pt-8 md:pt-14 lg:pt-16 pb-14 lg:pb-20 border-b border-slate-200 dark:border-slate-800/60"
      >
        {/* Ambient Subtle Gradients */}
        <div className="absolute top-1/4 left-1/4 -translate-y-1/2 w-[550px] h-[350px] bg-gradient-to-tr from-cyan-500/15 via-blue-600/10 to-transparent blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[500px] h-[400px] bg-gradient-to-bl from-purple-600/15 via-cyan-500/10 to-transparent blur-[130px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 items-center">
            
            {/* ---------------------------------------------------- */}
            {/* LEFT SIDE — CONTENT COMPOSITION (~48%)               */}
            {/* ---------------------------------------------------- */}
            <div ref={leftColRef} className="lg:col-span-6 xl:col-span-6 space-y-6 text-left will-change-transform">
              
              {/* Institutional Identity Badge */}
              <div
                ref={badgeRef}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50/90 dark:bg-slate-900/90 border border-cyan-500/30 text-xs text-cyan-800 dark:text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.15)]"
              >
                <span className="flex h-2 w-2 rounded-full bg-cyan-500 animate-ping" />
                <span className="font-semibold tracking-wide">Scope Global Skills University</span>
                <span className="text-slate-400 dark:text-slate-500">•</span>
                <span className="text-slate-600 dark:text-slate-400 font-medium">School of Future Skills &amp; IT</span>
              </div>

              {/* Dominant Asymmetric Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[4.25rem] font-black tracking-tight text-slate-900 dark:text-white leading-[1.05] space-y-1">
                <span ref={headlineLeftRef} className="block text-slate-900 dark:text-white will-change-transform">
                  Learn. Build.
                </span>
                <span
                  ref={headlineRightRef}
                  className="block bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-600 dark:from-cyan-400 dark:via-sky-300 dark:to-blue-500 bg-clip-text text-transparent will-change-transform"
                >
                  Innovate. Lead.
                </span>
              </h1>

              {/* Supporting Editorial Message */}
              <div ref={paragraphRef} className="space-y-3">
                <p className="text-lg sm:text-xl font-medium text-slate-800 dark:text-slate-200 leading-snug">
                  Where technology, creativity and practical learning shape tomorrow's innovators.
                </p>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
                  Transform curiosity into capability through hands-on research, engineering capstones, and industry-partnered software creation in a dedicated technical ecosystem.
                </p>
              </div>

              {/* Functional Dual Action CTAs */}
              <div ref={ctaRef} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
                <Link to="/courses" className="w-full sm:w-auto">
                  <Button size="lg" variant="primary" icon={ArrowRight} iconPosition="right" className="w-full sm:w-auto shadow-lg shadow-cyan-500/25">
                    Explore Programmes
                  </Button>
                </Link>

                <Link to="/about" className="w-full sm:w-auto">
                  <Button size="lg" variant="secondary" icon={Sparkles} className="w-full sm:w-auto">
                    Discover Our Department
                  </Button>
                </Link>
              </div>

              {/* Institutional Highlights — Three Pillars */}
              <div
                ref={pillarsRef}
                className="pt-6 border-t border-slate-200/80 dark:border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3"
              >
                <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-100/60 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/60">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center shrink-0">
                    <GraduationCap className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-900 dark:text-white leading-tight">Academic Excellence</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">UGC &amp; AICTE Aligned</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-100/60 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/60">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/25 flex items-center justify-center shrink-0">
                    <Cpu className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-900 dark:text-white leading-tight">Research &amp; Innovation</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">4 Specialized Labs</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-100/60 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/60">
                  <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/25 flex items-center justify-center shrink-0">
                    <Code2 className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-900 dark:text-white leading-tight">Student Projects</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">Live Deployments</span>
                  </div>
                </div>
              </div>

            </div>

            {/* ---------------------------------------------------- */}
            {/* RIGHT SIDE — HERO VISUAL EXPERIENCE (~52%)           */}
            {/* ---------------------------------------------------- */}
            <div ref={rightColRef} className="lg:col-span-6 xl:col-span-6 will-change-transform">
              <div className="relative rounded-3xl bg-gradient-to-br from-slate-900/95 via-slate-950/95 to-cyan-950/40 border border-cyan-500/30 shadow-2xl shadow-cyan-500/10 p-5 sm:p-7 overflow-hidden group">
                
                {/* Visual Ambient Glows */}
                <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/15 rounded-full blur-[90px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/15 rounded-full blur-[80px] pointer-events-none" />

                {/* Decorative Technical Coordinates Header */}
                <div className="relative z-20 flex items-center justify-between pb-3 border-b border-slate-800/80 text-[11px] font-mono text-slate-400">
                  <div className="flex items-center gap-2 text-cyan-400">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="font-bold tracking-wider">FSIT // TECH-CORE</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="hidden sm:inline text-slate-500">SYS.ONLINE</span>
                    <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 font-semibold">
                      4 LABS ACTIVE
                    </span>
                  </div>
                </div>

                {/* Main 3D Technology Core — Interactive Spatial Visualization */}
                <div className="relative z-10 py-2 sm:py-4 flex items-center justify-center">
                  <HeroKnowledgeCore />
                </div>

                {/* Floating Telemetry & Real Student Innovation Stack */}
                <div className="relative z-20 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-4 bg-slate-950/60 -mx-5 -mb-5 sm:-mx-7 sm:-mb-7 p-4 sm:px-6 backdrop-blur-md">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2 overflow-hidden">
                      <img
                        src={getAssetUrl("/projects/dimpy-cosmos.png")}
                        alt="Dimpy's COSMOS"
                        className="inline-block h-7 w-7 rounded-full ring-2 ring-cyan-500 object-cover shadow"
                        title="Dimpy's COSMOS (3D WebXR)"
                      />
                      <img
                        src={getAssetUrl("/projects/pixelmefaizan.png")}
                        alt="PixelMeFaizan"
                        className="inline-block h-7 w-7 rounded-full ring-2 ring-purple-500 object-cover shadow"
                        title="PixelMeFaizan (AI/ML)"
                      />
                      <img
                        src={getAssetUrl("/projects/binary-battle-club.png")}
                        alt="Binary Battle Club"
                        className="inline-block h-7 w-7 rounded-full ring-2 ring-sky-500 object-cover shadow"
                        title="Binary Battle Club (Coding Guild)"
                      />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-white leading-tight">
                        Live Digital Creations
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        COSMOS • BBC • Portfolios
                      </span>
                    </div>
                  </div>

                  <Link
                    to="/projects"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 hover:text-cyan-300 border border-cyan-500/30 text-xs font-bold transition-colors shrink-0"
                  >
                    <span>Inspect</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 3 — INSTITUTIONAL TRUST & BENCHMARKS              */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
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

        {/* Accreditation & Governance Strip */}
        <div className="mt-8 p-4 rounded-2xl bg-white dark:bg-[#0B0F19] border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-around gap-4 text-xs font-mono text-slate-500 dark:text-slate-400 text-center">
          <span>🏛️ Established under Madhya Pradesh State Act</span>
          <span>📜 UGC Recognized Higher Educational Institution</span>
          <span>🔬 Outcome-Based Engineering Framework</span>
          <span>🤝 Co-Created Industry Specializations</span>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 4 — ACADEMIC PROGRAMMES SHOWCASE                  */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
          <div className="space-y-1.5">
            <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
              Undergraduate Degree Specializations
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Flagship Academic Programmes
            </h2>
          </div>
          <Link
            to="/courses"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:underline"
          >
            <span>View All 42+ Degree Tracks</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCourses.map((c) => (
            <div
              key={c.id}
              className="glass-card flex flex-col justify-between overflow-hidden group p-5 space-y-4 hover:border-cyan-500/40 transition-all duration-300"
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
                      {c.level || "UG Degree"}
                    </span>
                  </div>
                </div>

                <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors line-clamp-2">
                  {c.programme}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                  {c.overview || c.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                <span className="font-mono text-slate-500 dark:text-slate-400 text-[11px]">{c.duration || "3 Years (6 Semesters)"}</span>
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
      {/* SECTION 5 — WHY SCHOOL OF FUTURE SKILLS (PILLARS)         */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-slate-200 dark:border-slate-800 relative overflow-hidden">
          
          <div className="max-w-3xl space-y-3 mb-10 text-left">
            <span className="text-xs font-mono font-bold tracking-wider text-cyan-600 dark:text-cyan-400 uppercase">
              The FSIT Pedagogy
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              An Academic Model Built for the AI Century
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              We combine computer science rigor with production software engineering. Learn modern distributed systems, data analytics, and autonomous security inside dedicated technical laboratories.
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
      {/* SECTION 6 — RESEARCH, LABORATORIES & INNOVATION           */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
          <div className="space-y-1.5">
            <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
              Research Infrastructure &amp; Technical Capabilities
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Specialized University Research Labs
            </h2>
          </div>
          <Link
            to="/labs"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:underline"
          >
            <span>Explore Interactive Practice Labs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {researchLabs.map((lab) => (
            <div
              key={lab.id}
              className="glass-card p-6 flex flex-col justify-between space-y-4 hover:border-cyan-500/40 transition-all duration-300"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${lab.color}`}>
                    {lab.track}
                  </span>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400">{lab.badge}</span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 text-cyan-500">
                    <lab.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {lab.name}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                      {lab.focus}
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-[11px] font-mono text-slate-600 dark:text-slate-400">
                  <span className="text-cyan-600 dark:text-cyan-400 font-bold block mb-0.5">Hardware &amp; Tooling Rig:</span>
                  {lab.hardware}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400 font-mono text-[11px]">Academic &amp; Student Research</span>
                <Link
                  to="/labs"
                  className="font-bold text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
                >
                  <span>Launch Practice Terminal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 7 — PROJECTS & DIGITAL CREATIONS SHOWCASE         */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
          <div className="space-y-1.5 max-w-2xl">
            <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
              Department Engineering &amp; Digital Creations
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Built With Vision. Created With Technology.
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Explore digital experiences, creative applications, interactive 3D simulations, and community platforms developed by the students and engineering cohorts of School of Future Skills.
            </p>
          </div>
          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:text-white hover:bg-cyan-500/10 border border-cyan-500/20 transition-all shrink-0"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredProjects.map((proj) => {
            const isUpvoted = userUpvotedProjects.includes(proj.id);
            return (
              <div
                key={proj.id}
                className="glass-card overflow-hidden rounded-2xl flex flex-col justify-between hover:border-cyan-500/40 transition-all duration-300 group hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/10"
              >
                <div>
                  {/* Screenshot Thumbnail */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950 border-b border-slate-200 dark:border-slate-800/80">
                    <img
                      src={getAssetUrl(proj.image)}
                      alt={proj.name}
                      loading="lazy"
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
                      <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-slate-950/80 text-cyan-300 border border-cyan-500/30 backdrop-blur-md">
                        {proj.category}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 backdrop-blur-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Verified Live
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        {proj.creators || proj.studentTeam}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                      {proj.name}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                      {proj.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {proj.technologies?.map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-mono text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-5 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
                  <button
                    onClick={() => upvoteProject(proj.id)}
                    type="button"
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors ${
                      isUpvoted
                        ? 'bg-cyan-500 text-slate-950 border-cyan-400'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-cyan-500/40 hover:text-cyan-600'
                    }`}
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{proj.upvotes || 0} Applauds</span>
                  </button>

                  <a
                    href={proj.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 dark:bg-cyan-500 dark:hover:bg-cyan-400 transition-colors shadow-sm shadow-cyan-500/20"
                  >
                    <span>View Live Project</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 8 — ACHIEVEMENTS & RECOGNITION (WALL OF FAME)     */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
          <div className="space-y-1.5">
            <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              Verified Honours &amp; Competition Triumphs
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Wall of Fame Spotlights
            </h2>
          </div>
          <Link
            to="/achievements"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:underline"
          >
            <span>View All Awards &amp; Honors</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {spotlightAchievements.map((ach) => (
            <div
              key={ach.id}
              className="glass-card p-6 flex flex-col justify-between space-y-4 hover:border-amber-500/40 transition-all duration-300"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-500/30">
                    {ach.badge || "Championship"}
                  </span>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400">{ach.year}</span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                  {ach.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {ach.description}
                </p>

                <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-500/20 text-xs font-medium text-amber-800 dark:text-amber-300 flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>{ach.award}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400 font-mono text-[11px]">{ach.team}</span>
                <Link
                  to="/achievements"
                  className="font-bold text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
                >
                  <span>Read Story</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 9 — DISTINGUISHED FACULTY DIRECTORY               */}
      {/* ========================================================= */}
      <FacultySection />

      {/* ========================================================= */}
      {/* SECTION 10 — STUDENT LIFE, CLUBS AND ACTIVITIES           */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
          <div className="space-y-1.5">
            <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
              Technical Guilds &amp; Collaborative Communities
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Student Life &amp; Guilds
            </h2>
          </div>
          <Link
            to="/clubs-and-projects"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:underline"
          >
            <span>Explore All Student Guilds</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {clubs.map((club) => (
            <div
              key={club.id}
              className="glass-card p-6 flex flex-col justify-between space-y-4 hover:border-cyan-500/40 transition-all duration-300"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-500/10 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-500/30">
                    {club.badge || "Student Guild"}
                  </span>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400">{club.membersCount} Active Engineers</span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {club.name}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {club.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {club.tags?.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-mono text-slate-700 dark:text-slate-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-1">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                    <span>{club.schedule}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                    <span>{club.venue}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400 font-mono text-[11px]">{club.leads}</span>
                <Link
                  to="/clubs-and-projects"
                  className="px-3.5 py-1.5 rounded-xl bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 transition-colors shadow-sm"
                >
                  Join Guild &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 11 — INDUSTRY & CAREER DEVELOPMENT                */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-slate-200 dark:border-slate-800 relative overflow-hidden">
          
          <div className="max-w-3xl space-y-3 mb-10 text-left">
            <span className="text-xs font-mono font-bold tracking-wider text-cyan-600 dark:text-cyan-400 uppercase">
              Corporate &amp; Career Frameworks
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Bridging Academic Theory to Tier-1 Industry Standards
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Our students graduate with verified engineering portfolios. Through co-created corporate syllabi, faculty training for national bodies, and direct alumni recruitment pipelines, our outcomes are measurable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {careerHighlights.map((c, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 transition-all duration-300 space-y-3"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                  <c.icon className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-cyan-600 dark:text-cyan-400 uppercase block mb-1">
                    {c.org}
                  </span>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">
                    {c.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {c.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 12 — ALUMNI NETWORK & MENTORSHIP                  */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
          <div className="space-y-1.5">
            <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
              Graduates Shaping Global Technology
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
              className="glass-card p-5 flex flex-col justify-between space-y-4 hover:border-cyan-500/40 transition-all duration-300"
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
      {/* SECTION 13 — UPCOMING EVENTS & HACKATHONS                 */}
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
              className="glass-card p-6 flex flex-col justify-between space-y-4 hover:border-cyan-500/40 transition-all duration-300"
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
      {/* SECTION 14.1 — MEET FUTUREBOT 3D AI COMPANION             */}
      {/* ========================================================= */}
      <FutureBotShowcaseSection />

      {/* ========================================================= */}
      {/* SECTION 14.2 — STUDENT BUILDERS RECOGNITION               */}
      {/* ========================================================= */}
      <BuildersSection />

      {/* ========================================================= */}
      {/* SECTION 14.3 — FINAL INSTITUTIONAL ADMISSIONS CTA         */}
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
                  Explore Programmes
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="text-white border-white/40 hover:bg-white/10 font-bold">
                  Discover Department Leadership
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
