import React from 'react';
import { ExternalLink, ThumbsUp, Code2, Users, Star } from 'lucide-react';
import { Github } from '../common/BrandIcons';
import { Badge } from '../common/Badge';

export const ProjectCard = ({ project, onUpvote }) => {
  return (
    <div className="glass-panel rounded-2xl border border-slate-800/90 hover:border-sky-500/40 p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-500/5 group">
      <div>
        {/* Header Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <Badge variant="purple" size="xs">
            {project.category}
          </Badge>
          <span className="text-[11px] font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
            {project.status}
          </span>
        </div>

        {/* Project Name */}
        <h3 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors mb-1.5 leading-snug">
          {project.name}
        </h3>

        {/* Student Team & Year */}
        <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-3">
          <Users className="w-3.5 h-3.5 text-sky-400 shrink-0" />
          <span className="text-slate-300 font-medium truncate">{project.studentTeam}</span>
          <span>•</span>
          <span className="text-slate-400 shrink-0">{project.year}</span>
        </div>

        {/* Description */}
        <p className="text-xs text-slate-400 line-clamp-3 mb-4 leading-relaxed">
          {project.description}
        </p>

        {/* Highlights */}
        {project.highlights && project.highlights.length > 0 && (
          <div className="space-y-1 mb-4 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/60 text-[11px] text-slate-300">
            {project.highlights.slice(0, 2).map((hl, i) => (
              <div key={i} className="flex items-center gap-1.5 truncate">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                <span className="truncate">{hl}</span>
              </div>
            ))}
          </div>
        )}

        {/* Tech Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.technologies.map((tech, idx) => (
            <span
              key={idx}
              className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700/60"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 gap-2">
        <button
          onClick={() => onUpvote(project.id)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
            project.hasUpvoted
              ? 'bg-sky-500/20 text-sky-300 border-sky-500/40'
              : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 border-slate-700'
          }`}
          title="Upvote project"
        >
          <ThumbsUp className={`w-3.5 h-3.5 ${project.hasUpvoted ? 'fill-sky-400 text-sky-400' : ''}`} />
          <span>{project.upvotes}</span>
        </button>

        <div className="flex items-center gap-2">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
              title="View Source on GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs font-semibold transition-colors shadow-sm shadow-sky-500/20"
            >
              <span>Live Demo</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
