import React from 'react';
import { Mail, BookOpen, MapPin, Award, GraduationCap } from 'lucide-react';
import { Linkedin } from '../common/BrandIcons';

export const FacultyCard = ({ faculty }) => {
  return (
    <div className="glass-panel rounded-2xl bg-[#0F172A] border border-slate-800/80 hover:border-cyan-500/40 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/5 group">
      <div>
        {/* Top Header & Avatar */}
        <div className="flex items-start gap-4 mb-4">
          <div className="w-16 h-20 rounded-xl overflow-hidden bg-slate-900 border border-slate-800/80 shrink-0 shadow-md relative">
            {faculty.image ? (
              <img
                src={faculty.image}
                alt={faculty.name}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-slate-200 dark:bg-slate-800 text-cyan-600 dark:text-cyan-400">
                <span className="text-xs font-mono font-bold">FSIT</span>
              </div>
            )}
          </div>

          <div className="min-w-0">
            <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors truncate">
              {faculty.name}
            </h3>
            <p className="text-xs font-medium text-cyan-600 dark:text-cyan-400 leading-tight mb-1 truncate">
              {faculty.designation || faculty.title}
            </p>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block truncate">
              {faculty.department}
            </span>

            {faculty.badges && faculty.badges.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1.5">
                {faculty.badges.slice(0, 2).map((badge, idx) => (
                  <span
                    key={idx}
                    className="px-1.5 py-0.5 rounded bg-cyan-100 dark:bg-cyan-500/10 text-cyan-800 dark:text-cyan-300 text-[10px] font-mono border border-cyan-200 dark:border-cyan-500/20"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Specialization Pill */}
        {faculty.specialization && (
          <div className="mb-3">
            <span className="text-[11px] font-semibold text-slate-300 bg-slate-800/90 px-2.5 py-1 rounded-lg border border-slate-700/80 block leading-relaxed line-clamp-1">
              🎯 {faculty.specialization}
            </span>
          </div>
        )}

        {/* Short Bio */}
        <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-4">
          {faculty.bio}
        </p>

        {/* Location & Courses */}
        <div className="space-y-1.5 py-3 border-t border-slate-800/80 mb-4 text-xs text-slate-400">
          {faculty.office && (
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{faculty.office}</span>
            </div>
          )}
          {faculty.coursesTaught && faculty.coursesTaught.length > 0 && (
            <div className="flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">Courses: {faculty.coursesTaught.join(', ')}</span>
            </div>
          )}
          {faculty.experience && (
            <div className="flex items-center gap-2">
              <Award className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{faculty.experience}</span>
            </div>
          )}
        </div>
      </div>

      {/* Contact CTAs */}
      <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80">
        {faculty.email && (
          <a
            href={`mailto:${faculty.email}`}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors border border-slate-700"
          >
            <Mail className="w-3.5 h-3.5 text-cyan-400" />
            <span>Email</span>
          </a>
        )}
        {faculty.linkedin && (
          <a
            href={faculty.linkedin}
            target="_blank"
            rel="noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 text-xs font-semibold transition-colors border border-cyan-500/30"
          >
            <Linkedin className="w-3.5 h-3.5" />
            <span>LinkedIn</span>
          </a>
        )}
      </div>
    </div>
  );
};

export default FacultyCard;
