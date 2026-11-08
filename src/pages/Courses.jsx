import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { initialCourses } from '../data/courses';
import { useApp } from '../context/AppContext';
import {
  BookOpen,
  Search,
  Clock,
  Bookmark,
  X,
  GraduationCap,
  Calendar,
  Building2,
  Check,
  Award,
  FileText,
  Sparkles,
  ArrowRight,
  Filter,
  ExternalLink
} from 'lucide-react';

export const Courses = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    enrolledCourses = [],
    bookmarkedCourses = [],
    toggleBookmarkCourse,
    showToast
  } = useApp();

  // Read URL query parameters
  const trackParam = searchParams.get('track') || '';
  const domainParam = searchParams.get('domain') || '';
  const subParam = searchParams.get('sub') || '';
  const filterParam = searchParams.get('filter') || '';
  const urlQuery = searchParams.get('q') || '';
  const urlDuration = searchParams.get('duration') || 'All';

  const [searchQuery, setSearchQuery] = useState(urlQuery);
  const [selectedDuration, setSelectedDuration] = useState(urlDuration);
  const [activeCourseModal, setActiveCourseModal] = useState(null);

  // Sync state when URL params change externally
  useEffect(() => {
    if (urlQuery !== searchQuery) {
      setSearchQuery(urlQuery);
    }
  }, [urlQuery]);

  useEffect(() => {
    if (urlDuration !== selectedDuration) {
      setSelectedDuration(urlDuration);
    }
  }, [urlDuration]);

  // Handle local search change and update URL params
  const handleSearchChange = (val) => {
    setSearchQuery(val);
    const newParams = new URLSearchParams(searchParams);
    if (val.trim()) {
      newParams.set('q', val.trim());
    } else {
      newParams.delete('q');
    }
    setSearchParams(newParams, { replace: true });
  };

  const handleDurationChange = (val) => {
    setSelectedDuration(val);
    const newParams = new URLSearchParams(searchParams);
    if (val !== 'All') {
      newParams.set('duration', val);
    } else {
      newParams.delete('duration');
    }
    setSearchParams(newParams, { replace: true });
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedDuration('All');
    setSearchParams({}, { replace: true });
  };

  // Submit inquiry
  const handleInquireProgramme = (course) => {
    if (showToast) {
      showToast(`Prospectus and details request submitted for ${course.school}! ✉️`, 'success');
    }
  };

  // Determine active human-readable tag from URL
  const activeUrlFilterLabel = (() => {
    if (domainParam === 'ai-ml') return 'Domain: Artificial Intelligence & ML';
    if (domainParam === 'cyber-defense') return 'Domain: Cyber Defense & Security';
    if (domainParam === 'cloud-architecture') return 'Domain: Cloud Architecture & DevOps';
    if (domainParam === 'web3') return 'Domain: Web3 Engineering';
    if (subParam === 'aws') return 'Track: AWS Solutions & Cloud Architecture';
    if (subParam === 'k8s') return 'Track: Docker & Kubernetes Infrastructure';
    if (subParam === 'serverless') return 'Track: Serverless Systems';
    if (trackParam === 'undergrad') return 'Curriculum: Undergraduate Degree Tracks';
    if (trackParam === 'bootcamps') return 'Curriculum: Industry Bootcamps';
    if (trackParam === 'certifications') return 'Curriculum: Industry Certifications';
    if (filterParam === 'specializations') return 'Category: Advanced Specializations';
    return null;
  })();

  // Live search and URL filter matching across courses
  const filteredCourses = initialCourses.filter(c => {
    const q = searchQuery.toLowerCase().trim();
    const pName = (c.programme || '').toLowerCase();
    const school = (c.school || '').toLowerCase();
    const deg = (c.degreeLevel || '').toLowerCase();
    const desc = (c.description || '').toLowerCase();

    // Query text match
    const matchesSearch = !q || pName.includes(q) || school.includes(q) || deg.includes(q) || desc.includes(q);

    // Duration match
    const matchesDuration = selectedDuration === 'All' || (c.duration || '').toLowerCase().includes(selectedDuration.toLowerCase());

    // URL parameter match
    let matchesUrlParam = true;
    if (domainParam === 'ai-ml') {
      matchesUrlParam = pName.includes('ai') || pName.includes('intelligence') || pName.includes('machine learning') || pName.includes('data science') || desc.includes('artificial intelligence');
    } else if (domainParam === 'cyber-defense') {
      matchesUrlParam = pName.includes('cyber') || pName.includes('security') || desc.includes('cyber') || desc.includes('security');
    } else if (domainParam === 'cloud-architecture') {
      matchesUrlParam = pName.includes('cloud') || pName.includes('computer science') || desc.includes('cloud') || desc.includes('systems');
    } else if (domainParam === 'web3') {
      matchesUrlParam = pName.includes('web') || pName.includes('software') || pName.includes('bca') || pName.includes('computer');
    } else if (subParam === 'aws' || subParam === 'k8s' || subParam === 'serverless') {
      matchesUrlParam = pName.includes('cloud') || pName.includes('computer') || pName.includes('information technology') || desc.includes('cloud');
    } else if (trackParam === 'undergrad') {
      matchesUrlParam = deg.includes('undergraduate') || (c.duration && (c.duration.includes('4') || c.duration.includes('3')));
    } else if (trackParam === 'bootcamps' || trackParam === 'certifications') {
      matchesUrlParam = (c.duration && c.duration.includes('2')) || deg.includes('diploma');
    } else if (filterParam === 'specializations') {
      matchesUrlParam = pName.includes('honors') || pName.includes('specialization') || pName.includes('ai') || pName.includes('data');
    }

    return matchesSearch && matchesDuration && matchesUrlParam;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Page Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-400">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Official Academic Session Directory • 45 Programmes</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Academic Programmes & Curricula
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
          Explore all 45 certified degree and diploma programmes offered across 17 academic schools, engineered for future technologies, modern sciences, industry excellence, and leadership.
        </p>
      </div>

      {/* Search & Duration Filter Toolbar */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
        {/* Active URL Filter Indicator Banner */}
        {activeUrlFilterLabel && (
          <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/25 text-xs text-cyan-700 dark:text-cyan-300">
            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span className="font-semibold">{activeUrlFilterLabel}</span>
            </div>
            <button
              onClick={clearAllFilters}
              className="text-[11px] font-mono hover:underline flex items-center gap-1 text-cyan-600 dark:text-cyan-400"
            >
              <X className="w-3 h-3" /> Clear Filter
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          
          {/* Live Search Box: Filter by Programme name or School */}
          <div className="md:col-span-9 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search 45 academic programmes by name (e.g. B.C.A., CSE, AI-ML, Pharmacy) or School..."
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-500 shadow-sm"
            />
          </div>

          {/* Duration Selector Dropdown */}
          <div className="md:col-span-3">
            <select
              value={selectedDuration}
              onChange={(e) => handleDurationChange(e.target.value)}
              className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-cyan-500 shadow-sm"
            >
              <option value="All">All Durations (45 Programmes)</option>
              <option value="4 Years">4 Years Degree</option>
              <option value="3 years">3 Years Degree</option>
              <option value="2 Years">2 Years Diploma</option>
            </select>
          </div>

        </div>
      </div>

      {/* Programme Count Metric */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1 -mt-2">
        <span>Showing <strong className="text-slate-900 dark:text-white font-mono">{filteredCourses.length}</strong> of {initialCourses.length} programmes</span>
        {(selectedDuration !== 'All' || searchQuery || activeUrlFilterLabel) && (
          <button
            onClick={clearAllFilters}
            className="text-cyan-600 dark:text-cyan-400 hover:underline font-medium"
          >
            Reset All Filters
          </button>
        )}
      </div>

      {/* Course Cards Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((c) => {
            const isBookmarked = bookmarkedCourses.includes(c.id);

            return (
              <div
                key={c.id}
                className="glass-panel rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-[0_4px_24px_rgba(0,210,255,0.08)] group"
              >
                <div>
                  
                  {/* Aspect Ratio Image Banner with School Tag & Bookmark */}
                  <div className="relative aspect-video rounded-xl overflow-hidden mb-4 bg-slate-900 border border-slate-800">
                    <img
                      src={c.image}
                      alt={c.programme}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 max-w-[78%]">
                      <span className="text-[10px] font-mono font-bold bg-white/95 dark:bg-[#0B0F19]/90 text-cyan-700 dark:text-cyan-300 px-2.5 py-0.5 rounded-full border border-cyan-300 dark:border-cyan-500/30 backdrop-blur-md truncate shadow-sm">
                        {c.school}
                      </span>
                    </div>
                    <button
                      onClick={() => toggleBookmarkCourse(c.id, c.programme)}
                      className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-white/90 dark:bg-[#0B0F19]/80 backdrop-blur-md text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white border border-slate-300 dark:border-slate-700/60 transition-colors shadow-sm"
                      aria-label="Bookmark Programme"
                      title={isBookmarked ? "Remove Bookmark" : "Save Bookmark"}
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-cyan-500 text-cyan-500' : ''}`} />
                    </button>
                  </div>

                  {/* Degree Badge & Programme Code */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60 font-medium">
                      {c.degreeLevel}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                      ID: #{String(c.id).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Programme Name (Title) */}
                  <h3
                    onClick={() => setActiveCourseModal(c)}
                    className="text-base font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors line-clamp-2 cursor-pointer mb-2 min-h-[3rem]"
                  >
                    {c.programme}
                  </h3>

                  {/* School & Description */}
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
                    {c.description}
                  </p>

                  {/* Duration Display with Clock Icon */}
                  <div className="py-2.5 border-t border-slate-200 dark:border-slate-800/80 text-xs text-slate-600 dark:text-slate-300 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 font-mono text-cyan-700 dark:text-cyan-400 font-semibold bg-cyan-100 dark:bg-cyan-950/40 px-2.5 py-1 rounded-lg border border-cyan-300 dark:border-cyan-500/20">
                      <Clock className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                      <span>{c.duration}</span>
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-[150px] flex items-center gap-1">
                      <Building2 className="w-3 h-3 text-slate-400 shrink-0" />
                      <span className="truncate">{c.school}</span>
                    </span>
                  </div>

                </div>

                {/* Card CTA Actions */}
                <div className="pt-3 border-t border-slate-200 dark:border-slate-800/80 mt-2 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setActiveCourseModal(c)}
                    className="py-2.5 px-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white text-xs font-semibold text-center transition-all duration-200 border border-slate-300 dark:border-slate-700 hover:border-cyan-500/40 flex items-center justify-center gap-1.5"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                    <span>Quick View</span>
                  </button>
                  <Link
                    to={`/courses/${c.id}`}
                    className="py-2.5 px-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 hover:text-cyan-800 dark:hover:text-cyan-200 text-xs font-semibold text-center transition-all duration-200 border border-cyan-500/30 hover:border-cyan-500/50 flex items-center justify-center gap-1.5"
                  >
                    <span>Full Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-12 text-center glass-panel rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
          <BookOpen className="w-10 h-10 text-slate-400 dark:text-slate-500 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">No programmes matched your filter</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400">Try adjusting your search query or select another academic school.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedDuration('All');
            }}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-colors border border-slate-300 dark:border-slate-700"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* ========================================================= */}
      {/* INTERACTIVE PROGRAMME DETAILS MODAL (WIDE IMMERSIVE)      */}
      {/* ========================================================= */}
      {activeCourseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/60 dark:bg-[#0B0F19]/85 backdrop-blur-md transition-opacity"
            onClick={() => setActiveCourseModal(null)}
          />

          {/* Wide Immersive Modal Canvas (max-w-6xl, min-h-[85vh]) */}
          <div
            className="relative w-full max-w-6xl min-h-[85vh] max-h-[92vh] rounded-2xl md:rounded-3xl bg-white dark:bg-[#0d1527] border border-slate-200 dark:border-slate-700/80 shadow-2xl z-10 p-6 sm:p-8 md:p-10 overflow-y-auto flex flex-col justify-between text-slate-900 dark:text-slate-100"
          >
            {/* Pinned Close Button in Top Right */}
            <button
              onClick={() => setActiveCourseModal(null)}
              className="absolute top-6 right-6 p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-900/80 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700/70 transition-all duration-200 z-20 group"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-90 transition-transform duration-200" />
            </button>

            <div>
              {/* 2-Column Responsive Desktop Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* --------------------------------------------------- */}
                {/* LEFT COLUMN: ~65% Width (lg:col-span-8)             */}
                {/* --------------------------------------------------- */}
                <div className="lg:col-span-8 space-y-6 pr-0 lg:pr-2">
                  
                  {/* Category Badges & Academic Year */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-mono uppercase px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-500/15 text-cyan-800 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-500/30 font-bold tracking-wide">
                      {activeCourseModal.school === "Future Skills & IT" ? "Future Skills & IT (FSIT)" : activeCourseModal.school}
                    </span>
                    <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 font-medium">
                      {activeCourseModal.level === "PG" ? "Postgraduate (PG)" : (activeCourseModal.level === "Diploma" ? "Diploma Track" : "Undergraduate (UG)")}
                    </span>
                    <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-500/20 font-medium">
                      Academic Year 2026-27
                    </span>
                  </div>

                  {/* Large Programme Title & Punchline */}
                  <div className="space-y-3">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                      {activeCourseModal.programme}
                    </h2>
                    
                    {/* Punchline Accent Badge */}
                    {activeCourseModal.punchline && (
                      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-cyan-50 dark:bg-gradient-to-r dark:from-cyan-500/20 dark:via-blue-500/10 dark:to-transparent border border-cyan-300 dark:border-cyan-500/35 text-cyan-800 dark:text-cyan-300 text-xs sm:text-sm font-semibold tracking-wide shadow-sm">
                        <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                        <span>"{activeCourseModal.punchline}"</span>
                      </div>
                    )}

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 flex items-center gap-2 pt-1">
                      <Building2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                      <span>
                        Offered by the <strong className="text-slate-800 dark:text-slate-200 font-semibold">{activeCourseModal.school === "Future Skills & IT" ? "School of Future Skills & Information Technology (FSIT)" : `School of ${activeCourseModal.school}`}</strong>
                      </span>
                    </p>
                  </div>

                  {/* Programme Overview */}
                  <div className="space-y-2 pt-4 border-t border-slate-200 dark:border-slate-800/80">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-mono flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> Programme Overview
                    </h3>
                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {activeCourseModal.overview || activeCourseModal.description}
                    </p>
                  </div>

                  {/* Eligibility & Who Can Apply Notice Box */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700/80 space-y-2 shadow-sm">
                    <div className="flex items-center gap-2 text-cyan-700 dark:text-cyan-300 text-xs font-bold uppercase font-mono">
                      <Award className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                      <span>Eligibility & Who Can Apply</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed pl-6">
                      {activeCourseModal.eligibility || activeCourseModal.prerequisites}
                    </p>
                  </div>

                  {/* Year-by-Year / Semester-wise Curriculum Cards */}
                  <div className="space-y-4 pt-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 font-mono flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                        <span>Curriculum Modules & Academic Roadmap</span>
                      </h3>
                      <span className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400 font-semibold">{activeCourseModal.syllabus.length}-Stage Roadmap</span>
                    </div>

                    <div className="grid grid-cols-1 gap-3.5">
                      {activeCourseModal.syllabus.map((mod, idx) => (
                        <div
                          key={idx}
                          className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 space-y-3 transition-colors"
                        >
                          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2.5">
                            <span className="font-bold text-sm text-cyan-700 dark:text-cyan-300 flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-cyan-400" />
                              {mod.module}
                            </span>
                            <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase">Stage 0{idx + 1}</span>
                          </div>
                          <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300 pl-4 list-disc marker:text-cyan-500">
                            {mod.lessons.map((les, lidx) => (
                              <li key={lidx} className="leading-relaxed">{les}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* --------------------------------------------------- */}
                {/* RIGHT COLUMN: ~35% Width (lg:col-span-4 Sticky)     */}
                {/* --------------------------------------------------- */}
                <div className="lg:col-span-4 space-y-5">
                  <div className="sticky top-0 space-y-5">
                    
                    {/* Visual Banner Thumbnail */}
                    <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-800 shadow-lg bg-slate-900">
                      <img
                        src={activeCourseModal.image}
                        alt={activeCourseModal.programme}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent dark:from-slate-950 dark:via-slate-950/30" />
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold bg-white/95 dark:bg-[#0B0F19]/90 text-cyan-700 dark:text-cyan-300 px-2.5 py-1 rounded-lg border border-cyan-300 dark:border-cyan-500/30 backdrop-blur-md">
                          {activeCourseModal.school}
                        </span>
                        <span className="text-[10px] font-mono bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded border border-emerald-300 dark:border-emerald-500/30 font-bold">
                          Verified Programme
                        </span>
                      </div>
                    </div>

                    {/* Industry Partner Badge (where applicable) */}
                    {activeCourseModal.industryPartner && (
                      <div className="p-3.5 rounded-2xl bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-950/80 dark:to-blue-950/50 border border-cyan-300 dark:border-cyan-500/35 flex items-center gap-2.5 text-xs text-cyan-800 dark:text-cyan-300 font-semibold shadow-sm">
                        <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                        <span>{activeCourseModal.industryPartner}</span>
                      </div>
                    )}

                    {/* Key Highlights Section with Checkmarks */}
                    <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700/80 p-5 space-y-3.5 shadow-md">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-300 font-mono border-b border-slate-200 dark:border-slate-800 pb-2">
                        Key Highlights
                      </h4>
                      <div className="space-y-2.5">
                        {activeCourseModal.highlights && activeCourseModal.highlights.map((hl, i) => (
                          <div key={i} className="flex items-start gap-2.5 text-xs text-slate-800 dark:text-slate-200">
                            <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                            <span className="leading-snug">{hl}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Metadata Card */}
                    <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700/80 p-5 space-y-4 shadow-md">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-300 font-mono border-b border-slate-200 dark:border-slate-800 pb-2">
                        Programme Metadata
                      </h4>

                      <div className="space-y-3 text-xs">
                        <div className="flex items-center justify-between py-1 border-b border-slate-200 dark:border-slate-800/60">
                          <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" /> Duration
                          </span>
                          <span className="font-bold text-slate-900 dark:text-white font-mono bg-cyan-100 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-300 px-2.5 py-0.5 rounded border border-cyan-300 dark:border-cyan-500/20">
                            {activeCourseModal.duration}
                          </span>
                        </div>

                        <div className="flex items-center justify-between py-1 border-b border-slate-200 dark:border-slate-800/60">
                          <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                            <GraduationCap className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" /> Level
                          </span>
                          <span className="font-semibold text-slate-800 dark:text-slate-200 text-right">
                            {activeCourseModal.level === "PG" ? "Postgraduate (PG)" : (activeCourseModal.level === "Diploma" ? "Diploma Track" : "Undergraduate (UG)")}
                          </span>
                        </div>

                        <div className="flex items-start justify-between py-1 border-b border-slate-200 dark:border-slate-800/60">
                          <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5 shrink-0">
                            <Building2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" /> Offered by
                          </span>
                          <span className="font-semibold text-cyan-700 dark:text-cyan-300 text-right text-[11px] leading-tight max-w-[180px]">
                            {activeCourseModal.school === "Future Skills & IT" 
                              ? "School of Future Skills & Information Technology" 
                              : `School of ${activeCourseModal.school}`}
                          </span>
                        </div>

                        <div className="flex items-center justify-between py-1 border-b border-slate-200 dark:border-slate-800/60">
                          <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" /> Mode
                          </span>
                          <span className="font-semibold text-slate-800 dark:text-slate-200">
                            Full-Time Campus &amp; Tech Labs
                          </span>
                        </div>

                        <div className="flex items-center justify-between py-1">
                          <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                            <Award className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Access &amp; Tuition
                          </span>
                          <span className="font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-300 dark:border-emerald-500/20">
                            100% Free Portal Access
                          </span>
                        </div>
                      </div>

                      {/* Quick Action in Sidebar */}
                      <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
                        <button
                          onClick={() => handleInquireProgramme(activeCourseModal)}
                          className="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs flex items-center justify-center gap-2 border border-slate-300 dark:border-slate-700 transition-colors"
                        >
                          <FileText className="w-4 h-4 text-cyan-400" />
                          <span>Request School Prospectus</span>
                        </button>
                      </div>

                    </div>

                  </div>
                </div>

              </div>
            </div>

            {/* Modal Bottom Actions Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleBookmarkCourse(activeCourseModal.id, activeCourseModal.programme)}
                  className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold border border-slate-300 dark:border-slate-700 transition-colors"
                >
                  <Bookmark className={`w-4 h-4 ${bookmarkedCourses.includes(activeCourseModal.id) ? 'fill-cyan-400 text-cyan-400' : 'text-slate-400'}`} />
                  <span>{bookmarkedCourses.includes(activeCourseModal.id) ? "Bookmarked" : "Bookmark Programme"}</span>
                </button>

                <Link
                  to={`/courses/${activeCourseModal.id}`}
                  className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors shadow-md shadow-cyan-500/20"
                >
                  <span>Open Dedicated Page</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>

              <button
                onClick={() => setActiveCourseModal(null)}
                className="px-6 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-colors border border-slate-300 dark:border-slate-700"
              >
                Close View
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Courses;
