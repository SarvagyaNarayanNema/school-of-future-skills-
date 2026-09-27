import React, { useState } from 'react';
import { initialAchievements, ACHIEVEMENT_CATEGORIES } from '../data/achievements';
import { AchievementCard } from '../components/cards/AchievementCard';
import { EmptyState } from '../components/common/EmptyState';
import { Trophy, Search, Award, Sparkles, Filter } from 'lucide-react';

export const Achievements = () => {
  const [achievements] = useState(initialAchievements);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');

  const filtered = achievements.filter(item => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = item.achievement.toLowerCase().includes(q) ||
                          item.studentTeam.toLowerCase().includes(q) ||
                          item.competitionOrg.toLowerCase().includes(q) ||
                          item.description.toLowerCase().includes(q);
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesYear = selectedYear === 'All' || item.year === selectedYear;

    return matchesSearch && matchesCategory && matchesYear;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-400">
          <Trophy className="w-3.5 h-3.5" />
          <span>Hall of Fame & Department Honors</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Student Achievements & Accolades
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
          Celebrating top-tier competition triumphs, international hackathon championships, industry research fellowships, and patent grants.
        </p>
      </div>

      {/* Filters Bar */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-8 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by student team, competition name, or certification..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="md:col-span-4">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
            >
              <option value="All">All Graduation Years</option>
              <option value="2026">2026 (Current Academic Year)</option>
              <option value="2025">2025 Archive</option>
            </select>
          </div>
        </div>

        {/* Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none pt-2 border-t border-slate-800/80">
          {ACHIEVEMENT_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <AchievementCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No achievements matched"
          description="Try broadening your search or resetting category filters."
          onReset={() => {
            setSearchQuery('');
            setSelectedCategory('All');
            setSelectedYear('All');
          }}
        />
      )}

    </div>
  );
};
