import React, { useState, useMemo } from 'react';
import { initialProjects, PROJECT_CATEGORIES } from '../data/projects';
import { ProjectCard } from '../components/cards/ProjectCard';
import { LiveWebsiteThumbnail } from '../components/cards/LiveWebsiteThumbnail';
import { InfiniteProjectShowcase } from '../components/showcase/InfiniteProjectShowcase';
import { EmptyState } from '../components/common/EmptyState';
import { projectService } from '../services/projectService';
import { useApp } from '../context/AppContext';
import {
  Code2,
  Sparkles,
  Search,
  ExternalLink,
  ThumbsUp,
  X,
  CheckCircle2,
  Users,
  Compass,
  Layers,
  ArrowRight,
  ShieldCheck,
  Clock
} from 'lucide-react';
import { Badge } from '../components/common/Badge';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { getAssetUrl } from '../utils/assets';

export const Projects = () => {
  const [projects, setProjects] = useState(() => projectService.getAll());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Projects');
  const [selectedProjectModal, setSelectedProjectModal] = useState(null);
  const { earnPoints } = useApp();

  const handleUpvote = (id) => {
    const updated = projectService.upvote(id);
    setProjects(projectService.getAll());
    if (updated?.hasUpvoted && earnPoints) {
      earnPoints(10, 'Applauded department innovation showcase');
    }
  };

  // Filter projects by search and category
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.creators && p.creators.toLowerCase().includes(q)) ||
        (p.studentTeam && p.studentTeam.toLowerCase().includes(q)) ||
        (p.technologies && p.technologies.some((t) => t.toLowerCase().includes(q)));

      const matchesCategory =
        selectedCategory === 'All Projects' || p.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [projects, searchQuery, selectedCategory]);


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Breadcrumb Navigation */}
      <Breadcrumbs items={[{ label: 'Department Showcase', path: '/projects' }, { label: 'Projects & Digital Creations' }]} />

      {/* Main Section Header */}
      <header className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-600 dark:text-cyan-400">
          <Code2 className="w-3.5 h-3.5" />
          <span>Department Engineering &amp; Creative Portfolio</span>
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
          Built With Vision.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-sky-400 to-indigo-500">
            Created With Technology.
          </span>
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
          Explore digital experiences, creative applications, interactive 3D simulations, and community platforms developed by the students, innovators, and engineering cohorts of the School of Future Skills at Scope Global Skills University.
        </p>
      </header>

      {/* 3D INFINITE PROJECT EXHIBITION SHOWCASE */}
      {selectedCategory === 'All Projects' && !searchQuery && (
        <InfiniteProjectShowcase
          projects={projects}
          onUpvote={handleUpvote}
          onSelectProject={setSelectedProjectModal}
        />
      )}

      {/* FILTER & SEARCH CONTROL BAR */}
      <section className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by project name, creator, or tech stack..."
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-500 transition-colors shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Showing <span className="font-bold text-slate-900 dark:text-white">{filteredProjects.length}</span> verified department {filteredProjects.length === 1 ? 'project' : 'projects'}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none pt-2 border-t border-slate-200 dark:border-slate-800/80">
          {PROJECT_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              type="button"
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* PROJECTS GALLERY GRID */}
      {filteredProjects.length > 0 ? (
        <section aria-label="Department Projects Gallery" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((p) => (
            <ProjectCard
              key={p.id}
              project={p}
              onUpvote={handleUpvote}
              onSelect={setSelectedProjectModal}
            />
          ))}
        </section>
      ) : (
        <EmptyState
          title="No projects match your filter"
          description="Try selecting another category or searching for another keyword like '3D', 'AI', or 'React'."
          onReset={() => {
            setSearchQuery('');
            setSelectedCategory('All Projects');
          }}
        />
      )}

      {/* LIGHTWEIGHT PROJECT DETAIL MODAL */}
      {selectedProjectModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedProjectModal(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProjectModal(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image Preview */}
            <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-200 dark:border-slate-800">
              <img
                src={getAssetUrl(selectedProjectModal.image)}
                alt={selectedProjectModal.name}
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Title & Badges */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="cyan" size="sm">{selectedProjectModal.category}</Badge>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                  selectedProjectModal.isAvailable ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${selectedProjectModal.isAvailable ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                  {selectedProjectModal.linkVerificationStatus}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {selectedProjectModal.name}
              </h2>
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <Users className="w-3.5 h-3.5 text-cyan-400" />
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  {selectedProjectModal.creators}
                </span>
                <span>•</span>
                <span>{selectedProjectModal.year}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {selectedProjectModal.description}
            </p>

            {/* Verified Highlights */}
            {selectedProjectModal.highlights && (
              <div className="space-y-2 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Verified Engineering Attributes
                </h4>
                <div className="space-y-1.5">
                  {selectedProjectModal.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech Tags */}
            {selectedProjectModal.technologies && (
              <div className="space-y-1.5">
                <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">Technology Stack:</span>
                <div className="flex flex-wrap gap-2">
                  {selectedProjectModal.technologies.map((t, idx) => (
                    <span key={idx} className="text-xs font-mono px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={() => {
                  handleUpvote(selectedProjectModal.id);
                  setSelectedProjectModal((prev) => ({
                    ...prev,
                    upvotes: (prev.upvotes || 0) + 1,
                    hasUpvoted: true
                  }));
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                <ThumbsUp className="w-3.5 h-3.5 text-cyan-400" />
                <span>{selectedProjectModal.upvotes || 0} Applauds</span>
              </button>

              {selectedProjectModal.isAvailable && selectedProjectModal.url ? (
                <a
                  href={selectedProjectModal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 transition-all hover:scale-105"
                >
                  <span>View Live Project</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <span className="text-xs text-amber-400 font-medium flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  <span>Deployment undergoing departmental verification</span>
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
