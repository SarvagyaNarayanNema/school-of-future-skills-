import React, { useState } from 'react';
import { initialAchievements, wallOfFameSpotlights, ACHIEVEMENT_CATEGORIES, ACHIEVEMENT_YEARS } from '../data/achievements';
import {
  Trophy,
  Search,
  Award,
  Calendar,
  Sparkles,
  ExternalLink,
  Flame,
  CheckCircle2,
  Users,
  Building2
} from 'lucide-react';

export const Achievements = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');

  const filteredAchievements = initialAchievements.filter(a => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = a.title.toLowerCase().includes(q) ||
                          a.team.toLowerCase().includes(q) ||
                          a.organization.toLowerCase().includes(q) ||
                          a.description.toLowerCase().includes(q);
    const matchesCat = selectedCategory === 'All' || a.category === selectedCategory;
    const matchesYear = selectedYear === 'All' || a.year === selectedYear;

    return matchesSearch && matchesCat && matchesYear;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-xs font-semibold text-yellow-600 dark:text-yellow-400">
          <Trophy className="w-3.5 h-3.5" />
          <span>Department Honors & Student Milestones</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Achievements & Wall of Fame
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
          Celebrating student triumphs in global hackathons, prestigious academic journal publications, patent grants, and competitive programming championships.
        </p>
      </div>

      {/* ========================================================= */}
      {/* WALL OF FAME SPOTLIGHT BANNER                             */}
      {/* ========================================================= */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-yellow-600 dark:text-yellow-400">
          <Sparkles className="w-4 h-4 text-yellow-500 dark:text-yellow-400" />
          <span>Wall of Fame — Top University Performers</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {wallOfFameSpotlights.map((spotlight) => (
            <div
              key={spotlight.id}
              className="glass-panel rounded-3xl border border-yellow-500/30 overflow-hidden relative shadow-[0_4px_30px_rgba(234,179,8,0.1)] flex flex-col justify-between"
            >
              <div className="relative aspect-[21/9] sm:aspect-[16/7] w-full overflow-hidden bg-slate-900 border-b border-slate-800">
                <img
                  src={spotlight.image}
                  alt={spotlight.title}
                  className="w-full h-full object-cover opacity-90 dark:opacity-80"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 dark:from-[#0B0F19] via-slate-900/20 dark:via-[#0B0F19]/40 to-transparent" />
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold bg-yellow-500 text-slate-950 px-2.5 py-0.5 rounded-full uppercase">
                    {spotlight.badge}
                  </span>
                  <span className="text-[10px] font-mono text-slate-200 bg-[#0B0F19]/80 px-2 py-0.5 rounded-full border border-slate-700">
                    {spotlight.year}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                  {spotlight.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-yellow-600 dark:text-yellow-300 font-medium">
                  <Award className="w-4 h-4 text-yellow-500 dark:text-yellow-400 shrink-0" />
                  <span>{spotlight.award}</span>
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                  <p><span className="text-slate-800 dark:text-slate-200 font-semibold">Team:</span> {spotlight.team}</p>
                  <p><span className="text-slate-800 dark:text-slate-200 font-semibold">Conferred By:</span> {spotlight.organization}</p>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
                  {spotlight.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          <div className="md:col-span-8 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by student team, competition name, patent or keywords..."
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-yellow-500"
            />
          </div>

          <div className="md:col-span-4">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:border-yellow-500"
            >
              {ACHIEVEMENT_YEARS.map(yr => (
                <option key={yr} value={yr}>{yr === 'All' ? 'All Academic Years' : `Academic Year ${yr}`}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none pt-2 border-t border-slate-200 dark:border-slate-800/80">
          {ACHIEVEMENT_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-yellow-500 text-slate-950 font-bold shadow-md shadow-yellow-500/20'
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Showcase Cards Grid */}
      {filteredAchievements.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAchievements.map((item) => (
            <div
              key={item.id}
              className="glass-panel rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-yellow-500/40 p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_24px_rgba(234,179,8,0.08)] group"
            >
              <div>
                
                {/* Header Badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border border-yellow-500/30 font-bold">
                    {item.awardBadge}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-mono flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400 dark:text-slate-500" /> {item.date}
                  </span>
                </div>

                {/* Milestone Title */}
                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-yellow-600 dark:group-hover:text-yellow-300 transition-colors mb-2 leading-snug">
                  {item.title}
                </h3>

                {/* Organizing Body */}
                <div className="flex items-center gap-1.5 text-xs text-cyan-600 dark:text-cyan-400 font-medium mb-3">
                  <Building2 className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{item.organization}</span>
                </div>

                {/* Student Team */}
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 mb-3 space-y-0.5">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono uppercase block">Student Innovator(s):</span>
                  <p className="font-semibold text-slate-900 dark:text-white">{item.team}</p>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  {item.description}
                </p>

              </div>

              {/* Footer Metrics & Verification */}
              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="font-mono text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">{item.metrics}</span>
                <a
                  href={item.proofLink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-500 dark:text-slate-400 hover:text-yellow-600 dark:hover:text-yellow-400 flex items-center gap-1 text-[11px] font-medium"
                >
                  <span>Verification</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center glass-panel rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
          <Trophy className="w-10 h-10 text-slate-400 dark:text-slate-500 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">No achievements match your filters</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Try switching graduation years or category classifications.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setSelectedYear('All');
            }}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold"
          >
            Reset Filters
          </button>
        </div>
      )}

    </div>
  );
};
