import React, { useState } from 'react';
import { ExternalLink, ThumbsUp, Users, CheckCircle2, Clock } from 'lucide-react';
import { LiveWebsiteThumbnail } from './LiveWebsiteThumbnail';
import { getAssetUrl } from '../../utils/assets';

export const ProjectCard = ({ project, onUpvote, onSelect }) => {
  const isLive = project.isAvailable && Boolean(project.url);

  return (
    <article className="group flex flex-col justify-between rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800/90 hover:border-cyan-500/50 dark:hover:border-cyan-500/40 shadow-sm hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300 hover:-translate-y-1.5 overflow-hidden">
      <div>
        {/* Interactive Live Website Hover Preview Thumbnail */}
        <LiveWebsiteThumbnail
          project={project}
          aspectRatio="aspect-[16/10]"
          onSelect={onSelect}
          showCategoryBadge={true}
          showStatusBadge={true}
        />

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
