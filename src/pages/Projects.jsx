import React, { useState } from 'react';
import { initialProjects, PROJECT_CATEGORIES } from '../data/projects';
import { ProjectCard } from '../components/cards/ProjectCard';
import { EmptyState } from '../components/common/EmptyState';
import { projectService } from '../services/projectService';
import { useApp } from '../context/AppContext';
import {
  Code2,
  Sparkles,
  Search,
  ExternalLink,
  ThumbsUp,
  Star,
  Users,
  Flame
} from 'lucide-react';
import { Github } from '../components/common/BrandIcons';
import { Badge } from '../components/common/Badge';

export const Projects = () => {
  const [projects, setProjects] = useState(() => projectService.getAll());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('upvotes');
  const { earnPoints } = useApp();

  const handleUpvote = (id) => {
    const updated = projectService.upvote(id);
    setProjects(projectService.getAll());
    if (updated?.hasUpvoted) {
      earnPoints(10, "Upvoted innovative student project");
    }
  };

  const projectOfMonth = projects.find(p => p.isProjectOfMonth) || projects[0];

  const filteredProjects = projects.filter(p => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = p.name.toLowerCase().includes(q) ||
                          p.description.toLowerCase().includes(q) ||
                          p.studentTeam.toLowerCase().includes(q) ||
                          p.technologies.some(t => t.toLowerCase().includes(q));
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    if (sortBy === 'upvotes') return b.upvotes - a.upvotes;
    return b.stars - a.stars;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-600 dark:text-cyan-400">
          <Code2 className="w-3.5 h-3.5" />
          <span>Student Engineering Incubator</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Built by Students. Powered by Ideas.
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
          Explore production-grade open-source tools, kernel monitors, multimodal AI systems, and hardware sensors developed by students in the department.
        </p>
      </div>

      {/* FEATURED: PROJECT OF THE MONTH */}
      {projectOfMonth && (
        <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-white via-slate-50 to-cyan-50/40 dark:from-slate-900 dark:via-slate-900/90 dark:to-cyan-950/40 border border-cyan-500/30 shadow-2xl overflow-hidden group">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30 text-xs font-bold uppercase tracking-wider">
                  <Flame className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                  Project of the Month
                </span>
                <Badge variant="cyan" size="xs">{projectOfMonth.category}</Badge>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">{projectOfMonth.status}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                {projectOfMonth.name}
              </h2>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
                {projectOfMonth.description}
              </p>

              {/* Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 text-xs">
                {projectOfMonth.highlights.map((hl, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-white/90 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400 shrink-0" />
                    <span className="truncate font-medium">{hl}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {projectOfMonth.technologies.map((t, idx) => (
                  <span key={idx} className="text-xs font-mono px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/90 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-4 bg-white/90 dark:bg-slate-950/80 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
              <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 pb-4 border-b border-slate-200 dark:border-slate-800">
                <p className="text-slate-500 dark:text-slate-400">Team Contributors:</p>
                <p className="font-semibold text-slate-900 dark:text-white text-sm">{projectOfMonth.studentTeam}</p>
                <p className="text-slate-500 dark:text-slate-400">{projectOfMonth.year}</p>
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={() => handleUpvote(projectOfMonth.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold border transition-colors ${
                    projectOfMonth.hasUpvoted
                      ? 'bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border-cyan-500/40'
                      : 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800'
                  }`}
                >
                  <ThumbsUp className={`w-4 h-4 ${projectOfMonth.hasUpvoted ? 'fill-cyan-500 text-cyan-500 dark:fill-cyan-400 dark:text-cyan-400' : ''}`} />
                  <span>{projectOfMonth.upvotes} Upvotes</span>
                </button>

                <div className="flex items-center gap-2">
                  {projectOfMonth.github && (
                    <a
                      href={projectOfMonth.github}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-300 dark:border-slate-700 transition-colors"
                      title="GitHub"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {projectOfMonth.demo && (
                    <a
                      href={projectOfMonth.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs inline-flex items-center gap-1.5 transition-colors shadow-lg shadow-cyan-500/25"
                    >
                      <span>Live App</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search student projects, technologies, authors..."
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-500 shadow-sm"
            />
          </div>

          <div className="w-full md:w-56">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-cyan-500 shadow-sm"
            >
              <option value="upvotes">Sort by: Most Upvoted</option>
              <option value="stars">Sort by: GitHub Stars</option>
            </select>
          </div>
        </div>

        {/* Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none pt-2 border-t border-slate-800/80">
          {PROJECT_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((p) => (
            <ProjectCard
              key={p.id}
              project={p}
              onUpvote={handleUpvote}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No projects matched"
          description="Try selecting another category or searching for different stack keywords."
          onReset={() => {
            setSearchQuery('');
            setSelectedCategory('All');
          }}
        />
      )}

    </div>
  );
};
