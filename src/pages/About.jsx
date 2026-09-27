import React, { useState } from 'react';
import { initialFaculty, FACULTY_DEPARTMENTS } from '../data/faculty';
import { FacultyCard } from '../components/cards/FacultyCard';
import { EmptyState } from '../components/common/EmptyState';
import {
  Sparkles,
  Target,
  Compass,
  CheckCircle,
  Terminal,
  Shield,
  Cpu,
  Cloud,
  Database,
  Globe,
  Radio,
  BarChart,
  Search,
  Users
} from 'lucide-react';

export const About = () => {
  const [facultySearch, setFacultySearch] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');

  const learningPillars = [
    { title: "Programming Mastery", desc: "Algorithmic thinking, memory models, clean architecture, and low-level optimization.", icon: Terminal, color: "text-purple-400 bg-purple-500/10 border-purple-500/20" },
    { title: "Artificial Intelligence", desc: "Foundation transformers, deep reinforcement learning, computer vision, and neural inference.", icon: Cpu, color: "text-sky-400 bg-sky-500/10 border-sky-500/20" },
    { title: "Cyber Defense", desc: "Zero Trust, packet inspection, kernel eBPF monitoring, ethical hacking, and threat mitigation.", icon: Shield, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
    { title: "Data Science & Analytics", desc: "High-dimensional statistical modeling, inferential hypotheses, and predictive pipelines.", icon: Database, color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20" },
    { title: "Cloud & Kubernetes DevOps", desc: "Multi-cluster orchestration, infrastructure as code, serverless operators, and CI/CD.", icon: Cloud, color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
    { title: "Edge & Industrial IoT", desc: "Low-power microcontroller systems, MQTT telemetry streaming, and environmental mesh radios.", icon: Radio, color: "text-teal-400 bg-teal-500/10 border-teal-500/20" },
    { title: "Full-Stack Web Systems", desc: "Modern reactive single-page frontends, resilient REST/GraphQL APIs, and micro-frontends.", icon: Globe, color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20" },
    { title: "Technical Product Growth", desc: "Algorithmic SEO, telemetry analytics, developer relations, and product experimentation.", icon: BarChart, color: "text-rose-400 bg-rose-500/10 border-rose-500/20" }
  ];

  const technologies = [
    "Python", "PyTorch", "Rust", "Go", "C++20", "TypeScript", "React 19", "Node.js",
    "Docker", "Kubernetes", "AWS", "Terraform", "eBPF", "Wireshark", "Kafka",
    "PostgreSQL", "Redis", "ESP32", "LoRaWAN", "Prometheus", "FastAPI"
  ];

  const filteredFaculty = initialFaculty.filter(fac => {
    const matchesSearch = fac.name.toLowerCase().includes(facultySearch.toLowerCase()) ||
                          fac.specialization.toLowerCase().includes(facultySearch.toLowerCase()) ||
                          fac.bio.toLowerCase().includes(facultySearch.toLowerCase());
    const matchesDept = selectedDept === 'All' || fac.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="space-y-16 pb-16">
      
      {/* Header Banner */}
      <section className="relative overflow-hidden py-12 md:py-16 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-semibold text-sky-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Future Skills Department Overview</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Preparing Engineers for Emerging Frontiers
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            The Future Skills department bridges academic rigor with rapid industry evolution, enabling students to design, prototype, and defend real-world software and hardware systems.
          </p>
        </div>
      </section>

      {/* Vision & Mission Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Vision */}
          <div className="glass-panel p-8 rounded-3xl border border-sky-500/30 space-y-4 relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-400 flex items-center justify-center border border-sky-500/20">
              <Compass className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-white">Department Vision</h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              [Editable Placeholder]: To be an internationally recognized center of undergraduate excellence in emerging computing paradigms—producing ethical technologists capable of architecting resilient systems, leading breakthrough research, and solving high-impact global challenges.
            </p>
            <ul className="text-xs text-slate-400 space-y-2 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Pioneer experiential lab-first pedagogy across computer science tracks</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Foster inclusive student participation in open source and international competitions</span>
              </li>
            </ul>
          </div>

          {/* Mission */}
          <div className="glass-panel p-8 rounded-3xl border border-purple-500/30 space-y-4 relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-white">Department Mission</h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              [Editable Placeholder]: To provide hands-on curriculum, high-performance computing infrastructure, and active mentorship that transforms motivated students into production-ready engineers, security researchers, and innovators.
            </p>
            <ul className="text-xs text-slate-400 space-y-2 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Ensure 100% of students author open-source capstones and technical papers</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Bridge academia with active industry engineering fellowships and mentorship</span>
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* What Students Learn (8 Domains) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Curriculum Breadth</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">What Students Master</h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            Practical skills engineered to match current production standards in technology enterprises.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {learningPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="glass-panel p-6 rounded-2xl border border-slate-800/80 hover:border-slate-700 transition-all duration-300 hover:-translate-y-1 space-y-3"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${pillar.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">{pillar.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{pillar.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Animated Technologies Covered */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 rounded-3xl border border-slate-800/80 text-center space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Toolchains & Stacks</span>
            <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">Technologies Covered In Departmental Labs</h3>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
            {technologies.map((tech, i) => (
              <span
                key={i}
                className="px-3.5 py-1.5 rounded-xl bg-slate-900/90 text-slate-200 text-xs font-mono font-medium border border-slate-700 hover:border-sky-400 hover:text-sky-300 transition-colors shadow-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FACULTY SECTION (Section 9) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-400">Department Directory</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">Faculty & Lab Mentors</h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              [Editable Sample Directory]: Research advisors and instructional fellows guiding student projects.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={facultySearch}
              onChange={(e) => setFacultySearch(e.target.value)}
              placeholder="Search faculty or specialization..."
              className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-sky-500"
            />
          </div>
        </div>

        {/* Department filter tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {FACULTY_DEPARTMENTS.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedDept === dept
                  ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>

        {/* Faculty Grid */}
        {filteredFaculty.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFaculty.map((fac) => (
              <FacultyCard key={fac.id} faculty={fac} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No faculty members matched"
            description="Try changing your department filter or searching with different keywords."
            onReset={() => {
              setFacultySearch('');
              setSelectedDept('All');
            }}
          />
        )}
      </section>

    </div>
  );
};
