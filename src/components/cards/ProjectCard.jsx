import React, { useState } from 'react';
import { ExternalLink, ThumbsUp, Users, CheckCircle2, Clock, Eye } from 'lucide-react';
import { Badge } from '../common/Badge';
import { getAssetUrl } from '../../utils/assets';

export const ProjectCard = ({ project, onUpvote, onSelect }) => {
  const [imgError, setImgError] = useState(false);
  const isLive = project.isAvailable && Boolean(project.url);

  // Category badge colors
  const getCategoryVariant = (category) => {
    switch (category) {
      case '3D & Interactive Experiences':
        return 'purple';
      case 'Personal Portfolios':
        return 'cyan';
      case 'Web Applications':
        return 'emerald';
      case 'Technology Communities':
        return 'amber';
      case 'Education & Management':
        return 'indigo';
      case 'Commercial Websites':
        return 'pink';
      case 'Department Platforms':
        return 'blue';
      default:
        return 'default';
    }
  };

  return (
    <article className="group flex flex-col justify-between rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800/90 hover:border-cyan-500/50 dark:hover:border-cyan-500/40 shadow-sm hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300 hover:-translate-y-1.5 overflow-hidden">
      <div>
        {/* Visual Preview / Screenshot */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950 border-b border-slate-200 dark:border-slate-800/80">
          {!imgError && project.image ? (
            <img
              src={getAssetUrl(project.image)}
              alt={`${project.name} interface preview`}
              loading="lazy"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950/40 text-center">
              <span className="text-xl font-black text-white tracking-wider">{project.name}</span>
              <span className="text-xs text-cyan-400 mt-1 font-mono">{project.category}</span>
            </div>
          )}

          {/* Top Floating Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
            <span className="pointer-events-auto">
              <Badge variant={getCategoryVariant(project.category)} size="xs">
                {project.category}
              </Badge>
            </span>

            {/* Link Verification Status Pill */}
            <span
              className={`pointer-events-auto inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold backdrop-blur-md shadow-md border ${
                isLive
                  ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/30'
                  : 'bg-amber-950/80 text-amber-300 border-amber-500/30'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isLive ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                }`}
              />
              <span>{isLive ? 'Verified Live' : 'Verification Pending'}</span>
            </span>
          </div>

          {/* Quick Details Trigger Overlay on hover */}
          {onSelect && (
            <button
              onClick={() => onSelect(project)}
              type="button"
              className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-semibold backdrop-blur-[2px]"
              aria-label={`View full details of ${project.name}`}
            >
              <Eye className="w-4 h-4 text-cyan-300" />
              <span>Quick Inspect</span>
            </button>
          )}
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-3.5">
          {/* Project Title */}
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors leading-snug">
              {project.name}
            </h3>
            
            {/* Creator / Team Attribution */}
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-1.5">
              <Users className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400 shrink-0" />
              <span className="font-medium truncate text-slate-700 dark:text-slate-300">
                {project.creators || project.studentTeam}
              </span>
            </div>
          </div>

          {/* Verified Description (20–40 words) */}
          <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
            {project.description}
          </p>

          {/* Key Feature Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div className="space-y-1 pt-1">
              {project.highlights.slice(0, 2).map((item, i) => (
                <div key={i} className="flex items-start gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                  <CheckCircle2 className="w-3 h-3 text-cyan-500 dark:text-cyan-400 shrink-0 mt-0.5" />
                  <span className="line-clamp-1">{item}</span>
                </div>
              ))}
            </div>
          )}

          {/* Verified Tech Tags */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {project.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/80"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-5 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-3 bg-slate-50/50 dark:bg-slate-900/50">
        {/* Upvote Button */}
        {onUpvote ? (
          <button
            onClick={() => onUpvote(project.id)}
            type="button"
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              project.hasUpvoted
                ? 'bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border-cyan-500/40 shadow-sm'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-cyan-500/40 hover:text-cyan-600 dark:hover:text-cyan-400'
            }`}
            title="Applaud this project"
          >
            <ThumbsUp className={`w-3.5 h-3.5 ${project.hasUpvoted ? 'fill-cyan-500 text-cyan-500 dark:fill-cyan-400 dark:text-cyan-400' : ''}`} />
            <span>{project.upvotes || 0}</span>
          </button>
        ) : (
          <div className="text-xs text-slate-400 font-mono">
            {project.upvotes || 0} applauds
          </div>
        )}

        {/* Primary Action Button */}
        {isLive ? (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 dark:bg-cyan-500 dark:hover:bg-cyan-400 transition-all duration-200 shadow-md shadow-cyan-500/20 hover:shadow-lg hover:shadow-cyan-500/30 group-hover:translate-x-0.5"
          >
            <span>View Live Project</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        ) : (
          <span
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 cursor-not-allowed"
            title="Deployment undergoing departmental URL verification"
          >
            <Clock className="w-3.5 h-3.5 text-amber-500" />
            <span>Verification Pending</span>
          </span>
        )}
      </div>
    </article>
  );
};
