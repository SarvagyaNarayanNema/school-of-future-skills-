import React, { useState } from 'react';
import { websiteBuilders } from '../../data/builders';
import { Sparkles, Code2, Cpu, CheckCircle2, ChevronRight, X, ExternalLink } from 'lucide-react';

export const BuildersSection = () => {
  const [selectedBuilder, setSelectedBuilder] = useState(null);

  return (
    <section id="builders" className="relative py-16 bg-white dark:bg-[#0B0F19] border-b border-slate-200 dark:border-slate-800/60 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[300px] bg-gradient-to-r from-cyan-500/10 via-blue-600/10 to-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-5 left-10 w-72 h-72 bg-cyan-500/5 blur-[90px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900/90 border border-cyan-500/30 text-xs text-cyan-600 dark:text-cyan-300 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
            <span className="font-semibold tracking-wide">Website Builders &amp; Creators</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Meet the{' '}
            <span className="bg-gradient-to-r from-cyan-600 via-sky-500 to-blue-600 dark:from-cyan-400 dark:via-sky-300 dark:to-blue-400 bg-clip-text text-transparent">
              Website Builders
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            The student engineering team behind this academic platform.
          </p>
        </div>

        {/* Card Layout: 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {websiteBuilders.map((builder) => (
            <div
              key={builder.id}
              className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800/80 rounded-2xl overflow-hidden shadow-md dark:shadow-xl hover:border-cyan-500/40 hover:shadow-cyan-500/10 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group"
            >
              <div>
                {/* Portrait Image at the top of each card */}
                <div className="relative w-full h-64 overflow-hidden bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800/80">
                  <img
                    src={builder.image}
                    alt={builder.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Role Badge Overlay */}
                  {builder.roleBadge && (
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-0.5 rounded-md bg-slate-900/90 backdrop-blur-md text-[10px] font-mono font-bold text-cyan-300 border border-cyan-500/30 shadow-sm">
                        {builder.roleBadge}
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-5 pb-0">
                  {/* Name */}
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                    {builder.name}
                  </h3>

                  {/* Designation */}
                  <p className="text-sm font-semibold text-cyan-600 dark:text-[#00D2FF] mb-0.5 leading-snug">
                    {builder.designation}
                  </p>

                  {/* Department */}
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                    {builder.department}
                  </p>

                  {/* Metadata Boxes: EXPERIENCE & QUALIFICATION */}
                  <div className="space-y-2 mb-3.5">
                    <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800/80 text-[11px] text-slate-700 dark:text-slate-300 leading-tight">
                      <span className="text-slate-500 dark:text-slate-400 block text-[10px] font-mono font-medium">EXPERIENCE:</span>
                      <span className="font-semibold text-slate-900 dark:text-white">{builder.experience}</span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800/80 text-[11px] text-slate-700 dark:text-slate-300 leading-tight">
                      <span className="text-slate-500 dark:text-slate-400 block text-[10px] font-mono font-medium">QUALIFICATION:</span>
                      <span className="text-slate-800 dark:text-slate-200 line-clamp-1">{builder.qualification}</span>
                    </div>
                  </div>

                  {/* Bio Text */}
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3 mb-4">
                    {builder.bio}
                  </p>
                </div>
              </div>

              {/* Bottom Action Bar */}
              <div className="p-5 pt-3 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between gap-2">
                <button
                  onClick={() => setSelectedBuilder(builder)}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-700 dark:text-[#00D2FF] text-xs font-bold transition-all border border-cyan-500/30 group-hover:bg-[#00D2FF] group-hover:text-slate-950"
                >
                  <span>View Profile &gt;</span>
                </button>

                <button
                  onClick={() => setSelectedBuilder(builder)}
                  title={`View details for ${builder.name}`}
                  className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors border border-slate-200 dark:border-slate-700 shrink-0"
                  aria-label="Builder details"
                >
                  <Sparkles className="w-4 h-4 text-cyan-600 dark:text-[#00D2FF]" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Profile Detail Modal */}
      {selectedBuilder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div
            className="relative w-full max-w-2xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-cyan-500/10 overflow-hidden max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedBuilder(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors z-10"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Body */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 border-b border-slate-200 dark:border-slate-800 pb-6">
                <div className="w-32 h-40 sm:w-36 sm:h-48 rounded-2xl overflow-hidden border-2 border-cyan-500/40 shadow-lg shrink-0 bg-slate-100 dark:bg-slate-900">
                  <img
                    src={selectedBuilder.image}
                    alt={selectedBuilder.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="space-y-2 text-center sm:text-left min-w-0">
                  {selectedBuilder.roleBadge && (
                    <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-100 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-500/25">
                      {selectedBuilder.roleBadge}
                    </span>
                  )}
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white">{selectedBuilder.name}</h3>
                  <p className="text-sm font-semibold text-cyan-600 dark:text-[#00D2FF]">{selectedBuilder.designation}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{selectedBuilder.department}</p>
                </div>
              </div>

              {/* Bio */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-mono">
                  Role &amp; Contribution Overview
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                  {selectedBuilder.bio}
                </p>
              </div>

              {/* Credentials & Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                  <span className="text-slate-500 dark:text-slate-400 font-mono text-[10px]">QUALIFICATION</span>
                  <p className="font-semibold text-slate-900 dark:text-white">{selectedBuilder.qualification}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                  <span className="text-slate-500 dark:text-slate-400 font-mono text-[10px]">EXPERIENCE &amp; FOCUS</span>
                  <p className="font-semibold text-slate-900 dark:text-white">{selectedBuilder.experience}</p>
                </div>
              </div>

              {/* Skills / Key Competencies */}
              {selectedBuilder.skills && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 font-mono">
                    Key Competencies &amp; Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedBuilder.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/90 text-cyan-700 dark:text-cyan-300 text-xs font-medium border border-slate-300 dark:border-slate-700 flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Modal Footer */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
                <button
                  onClick={() => setSelectedBuilder(null)}
                  className="px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors border border-slate-300 dark:border-transparent"
                >
                  Close Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default BuildersSection;
