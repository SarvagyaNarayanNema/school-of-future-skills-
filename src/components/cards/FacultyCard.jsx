import React from 'react';
import { Mail, UserCheck, BookOpen, MapPin } from 'lucide-react';
import { Linkedin } from '../common/BrandIcons';
import { Badge } from '../common/Badge';

export const FacultyCard = ({ faculty }) => {
  return (
    <div className="glass-panel rounded-2xl border border-slate-800/90 hover:border-sky-500/40 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-500/5 group">
      <div>
        {/* Top Header & Avatar Placeholder */}
        <div className="flex items-start gap-4 mb-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-slate-800 via-slate-700 to-sky-900/60 border border-slate-700 flex flex-col items-center justify-center text-slate-300 shrink-0 shadow-inner">
            <span className="text-xs font-mono font-bold text-sky-400">[Photo]</span>
            <span className="text-[9px] text-slate-400">Faculty</span>
          </div>

          <div className="min-w-0">
            <h3 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors truncate">
              {faculty.name}
            </h3>
            <p className="text-xs font-medium text-sky-400 leading-tight mb-1 truncate">
              {faculty.title}
            </p>
            <span className="text-[11px] text-slate-400 block truncate">
              {faculty.department}
            </span>
          </div>
        </div>

        {/* Specialization Pill */}
        <div className="mb-3.5">
          <span className="text-[11px] font-semibold text-slate-300 bg-slate-800/90 px-2.5 py-1 rounded-lg border border-slate-700/80 block leading-relaxed">
            🎯 Specialization: {faculty.specialization}
          </span>
        </div>

        {/* Short Bio */}
        <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-4">
          {faculty.bio}
        </p>

        {/* Location & Courses */}
        <div className="space-y-1.5 py-3 border-t border-slate-800/80 mb-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{faculty.office}</span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">Courses: {faculty.coursesTaught.join(', ')}</span>
          </div>
        </div>
      </div>

      {/* Contact CTAs */}
      <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80">
        {faculty.email && (
          <a
            href={`mailto:${faculty.email}`}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors border border-slate-700"
          >
            <Mail className="w-3.5 h-3.5 text-sky-400" />
            <span>Email</span>
          </a>
        )}
        {faculty.linkedin && (
          <a
            href={faculty.linkedin}
            target="_blank"
            rel="noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 text-xs font-semibold transition-colors border border-sky-500/30"
          >
            <Linkedin className="w-3.5 h-3.5" />
            <span>LinkedIn</span>
          </a>
        )}
      </div>
    </div>
  );
};
