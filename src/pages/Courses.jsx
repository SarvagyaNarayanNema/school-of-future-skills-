import React, { useState } from 'react';
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
  Sparkles
} from 'lucide-react';

export const Courses = () => {
  const {
    enrolledCourses = [],
    bookmarkedCourses = [],
    toggleBookmarkCourse,
    showToast
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('All');
  const [activeCourseModal, setActiveCourseModal] = useState(null);

  // Submit inquiry
  const handleInquireProgramme = (course) => {
    if (showToast) {
      showToast(`Prospectus and details request submitted for ${course.school}! ✉️`, 'success');
    }
  };

  // Live search across the 45 official programmes by name or school
  const filteredCourses = initialCourses.filter(c => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q ||
      c.programme.toLowerCase().includes(q) ||
      c.school.toLowerCase().includes(q) ||
      c.degreeLevel.toLowerCase().includes(q);

    const matchesDuration = selectedDuration === 'All' || c.duration.toLowerCase().includes(selectedDuration.toLowerCase());

    return matchesSearch && matchesDuration;
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
      <div className="glass-panel p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          
          {/* Live Search Box: Filter by Programme name or School */}
          <div className="md:col-span-9 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 45 academic programmes by name (e.g. B.C.A., CSE, AI-ML, Pharmacy) or School..."
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-500 shadow-sm"
            />
          </div>

          {/* Duration Selector Dropdown */}
          <div className="md:col-span-3">
            <select
              value={selectedDuration}
              onChange={(e) => setSelectedDuration(e.target.value)}
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
        {(selectedDuration !== 'All' || searchQuery) && (
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedDuration('All');
            }}
            className="text-cyan-600 dark:text-cyan-400 hover:underline font-medium"
          >
            Reset Search
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

                {/* Card CTA Action */}
                <div className="pt-3 border-t border-slate-200 dark:border-slate-800/80 mt-2">
                  <button
                    onClick={() => setActiveCourseModal(c)}
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white text-xs font-semibold text-center transition-all duration-200 border border-slate-300 dark:border-slate-700 hover:border-cyan-500/40 flex items-center justify-center gap-2 group-hover:bg-slate-200 dark:group-hover:bg-slate-800"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                    <span>View Curriculum & Details</span>
                  </button>
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
              setSelectedSchool('All');
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
            <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-800">
              <button
                onClick={() => toggleBookmarkCourse(activeCourseModal.id, activeCourseModal.programme)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
              >
                <Bookmark className={`w-4 h-4 ${bookmarkedCourses.includes(activeCourseModal.id) ? 'fill-cyan-400 text-cyan-400' : 'text-slate-400'}`} />
                <span>{bookmarkedCourses.includes(activeCourseModal.id) ? "Bookmarked in Your Portal" : "Bookmark Programme"}</span>
              </button>

              <button
                onClick={() => setActiveCourseModal(null)}
                className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors border border-slate-700"
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
