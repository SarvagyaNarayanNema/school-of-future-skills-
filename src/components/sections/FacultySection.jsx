import React, { useState } from 'react';
import { facultyMembers } from '../../data/faculty';
import {
  GraduationCap,
  Award,
  BookOpen,
  Briefcase,
  Mail,
  MapPin,
  Sparkles,
  ChevronRight,
  X,
  FileText,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

export const FacultySection = () => {
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [expandedHeadBio, setExpandedHeadBio] = useState(false);

  const headOfSchool = facultyMembers[0];
  const facultyTeam = facultyMembers.slice(1);

  return (
    <section id="faculty" className="relative py-16 bg-slate-50 dark:bg-[#080C16] border-b border-slate-200 dark:border-slate-800/60 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[300px] bg-gradient-to-r from-cyan-500/10 via-blue-600/10 to-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900/90 border border-cyan-500/30 text-xs text-cyan-700 dark:text-cyan-300 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span className="font-semibold tracking-wide">School of Future Skills &amp; IT (FSIT)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Meet Our{' '}
            <span className="bg-gradient-to-r from-cyan-600 via-sky-500 to-blue-600 dark:from-cyan-400 dark:via-sky-300 dark:to-blue-400 bg-clip-text text-transparent">
              Distinguished Faculty
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            A Team of Scholars and Innovators Committed to Academic Excellence.
          </p>
        </div>

        {/* ========================================================= */}
        {/* TOP SPOTLIGHT CARD (FULL WIDTH) - Dr. Pooja Bijlani       */}
        {/* ========================================================= */}
        <div className="relative group rounded-3xl p-1 bg-gradient-to-r from-cyan-500/40 via-blue-500/20 to-purple-500/30 shadow-xl">
          <div className="relative rounded-[22px] bg-white/95 dark:bg-[#0F172A]/95 backdrop-blur-xl border border-slate-200 dark:border-cyan-500/25 p-6 md:p-8 lg:p-10 shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Photo Column */}
              <div className="lg:col-span-4 flex flex-col items-center">
                <div className="relative w-56 h-64 sm:w-64 sm:h-72 md:w-72 md:h-80 rounded-2xl overflow-hidden p-1 bg-gradient-to-b from-cyan-400/40 via-blue-600/20 to-slate-800 border-2 border-cyan-400/60 shadow-[0_0_25px_rgba(0,210,255,0.25)]">
                  <img
                    src={headOfSchool.image}
                    alt={headOfSchool.name}
                    className="w-full h-full object-cover object-top rounded-xl group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none rounded-xl" />
                  <div className="absolute bottom-3 left-3 right-3 text-center">
                    <span className="inline-block px-3 py-1 rounded-full bg-cyan-500/90 text-slate-950 text-xs font-bold shadow-md">
                      Head of School
                    </span>
                  </div>
                </div>
              </div>

              {/* Information Column */}
              <div className="lg:col-span-8 space-y-5 text-left">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    {headOfSchool.badges.map((badge, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-cyan-100 dark:bg-cyan-500/10 text-cyan-800 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-500/25 flex items-center gap-1.5"
                      >
                        <Award className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                        {badge}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                    {headOfSchool.name}
                  </h3>
                  <p className="text-sm sm:text-base font-semibold text-cyan-600 dark:text-cyan-400">
                    {headOfSchool.designation} • <span className="text-slate-600 dark:text-slate-300">{headOfSchool.department}</span>
                  </p>
                </div>

                {/* Bio text */}
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {headOfSchool.bio}
                </p>

                {/* Credentials Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                    <div className="flex items-center gap-1.5 text-cyan-600 dark:text-cyan-400 font-semibold">
                      <GraduationCap className="w-4 h-4" />
                      <span>Qualification</span>
                    </div>
                    <p className="text-slate-800 dark:text-slate-200 leading-tight font-medium">{headOfSchool.qualification}</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                    <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                      <Briefcase className="w-4 h-4" />
                      <span>Experience</span>
                    </div>
                    <p className="text-slate-800 dark:text-slate-200 leading-tight font-medium">{headOfSchool.experience}</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                    <div className="flex items-center gap-1.5 text-purple-600 dark:text-purple-400 font-semibold">
                      <FileText className="w-4 h-4" />
                      <span>Research &amp; Publications</span>
                    </div>
                    <p className="text-slate-800 dark:text-slate-200 leading-tight font-medium">{headOfSchool.publications}</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                    <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-semibold">
                      <MapPin className="w-4 h-4" />
                      <span>Office &amp; Contact</span>
                    </div>
                    <p className="text-slate-800 dark:text-slate-200 leading-tight font-medium">{headOfSchool.office}</p>
                  </div>
                </div>

                {/* CTAs */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setSelectedFaculty(headOfSchool)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all shadow-[0_0_15px_rgba(0,210,255,0.3)] hover:scale-[1.02]"
                  >
                    <span>View Complete Profile &amp; Dossier</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <a
                    href={`mailto:${headOfSchool.email}`}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/90 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white font-semibold text-xs border border-slate-300 dark:border-slate-700 transition-colors"
                  >
                    <Mail className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                    <span>Contact Head of School</span>
                  </a>
                </div>

              </div>

            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 4-GRID CARDS ROW - Faculty & Technical Mentors            */}
        {/* ========================================================= */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800/80 pb-3">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 dark:bg-cyan-400" />
              Department Faculty &amp; Mentors
            </h3>
            <span className="text-xs font-mono text-cyan-700 dark:text-cyan-400 bg-cyan-100 dark:bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-300 dark:border-cyan-500/20">
              4 Technical Leads
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {facultyTeam.map((fac) => (
              <div
                key={fac.id}
                className="group relative rounded-2xl bg-white dark:bg-[#0F172A] hover:bg-slate-50 dark:hover:bg-[#1E293B] border border-slate-200 dark:border-slate-800/80 hover:border-cyan-500/40 p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-md dark:shadow-xl hover:shadow-cyan-500/10"
              >
                <div>
                  {/* Photo Container */}
                  <div className="relative aspect-[4/5] rounded-xl overflow-hidden mb-4 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 group-hover:border-cyan-500/40 transition-colors">
                    <img
                      src={fac.image}
                      alt={fac.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                    
                    {/* Primary Badge on Card Photo */}
                    <div className="absolute top-2.5 left-2.5">
                      <span className="px-2 py-0.5 rounded-md bg-slate-900/90 backdrop-blur-md text-[10px] font-mono font-bold text-cyan-300 border border-cyan-500/30 shadow-sm">
                        {fac.badges[0]}
                      </span>
                    </div>
                  </div>

                  {/* Faculty Details */}
                  <div className="space-y-1.5 mb-3">
                    <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                      {fac.name}
                    </h4>
                    <p className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 leading-tight">
                      {fac.designation}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                      {fac.department}
                    </p>
                  </div>

                  {/* Credentials / Badges */}
                  <div className="space-y-2 mb-3.5">
                    <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800/80 text-[11px] text-slate-700 dark:text-slate-300 leading-tight">
                      <span className="text-slate-500 dark:text-slate-400 block text-[10px] font-mono">EXPERIENCE:</span>
                      <span className="font-semibold text-slate-900 dark:text-white">{fac.experience}</span>
                    </div>

                    <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800/80 text-[11px] text-slate-700 dark:text-slate-300 leading-tight">
                      <span className="text-slate-500 dark:text-slate-400 block text-[10px] font-mono">QUALIFICATION:</span>
                      <span className="text-slate-800 dark:text-slate-200 line-clamp-1">{fac.qualification}</span>
                    </div>
                  </div>

                  {/* Brief Bio Snippet */}
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed mb-4">
                    {fac.bio}
                  </p>
                </div>

                {/* Bottom Action */}
                <div className="pt-3 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedFaculty(fac)}
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 text-xs font-bold transition-all border border-cyan-500/30 group-hover:bg-cyan-500 group-hover:text-slate-950"
                  >
                    <span>View Profile</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={`mailto:${fac.email}`}
                    title={`Email ${fac.name}`}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors border border-slate-200 dark:border-slate-700 shrink-0"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ========================================================= */}
      {/* FACULTY PROFILE DETAIL MODAL                              */}
      {/* ========================================================= */}
      {selectedFaculty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div
            className="relative w-full max-w-2xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-cyan-500/10 overflow-hidden max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedFaculty(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors z-10"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Body */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 border-b border-slate-200 dark:border-slate-800 pb-6">
                <div className="w-32 h-36 sm:w-36 sm:h-44 rounded-2xl overflow-hidden border-2 border-cyan-500/40 shadow-lg shrink-0 bg-slate-100 dark:bg-slate-900">
                  <img
                    src={selectedFaculty.image}
                    alt={selectedFaculty.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="space-y-2 text-center sm:text-left min-w-0">
                  <div className="flex flex-wrap justify-center sm:justify-start gap-1.5">
                    {selectedFaculty.badges?.map((badge, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-100 dark:bg-cyan-500/10 text-cyan-800 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-500/25"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white">{selectedFaculty.name}</h3>
                  <p className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">{selectedFaculty.designation}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{selectedFaculty.department}</p>
                  
                  <div className="pt-2 flex items-center justify-center sm:justify-start gap-2">
                    <a
                      href={`mailto:${selectedFaculty.email}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold border border-slate-300 dark:border-slate-700 transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                      <span>{selectedFaculty.email}</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-mono">
                  Biography &amp; Academic Leadership
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                  {selectedFaculty.bio}
                </p>
              </div>

              {/* Credentials & Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                  <span className="text-slate-500 dark:text-slate-400 font-mono text-[10px]">QUALIFICATION</span>
                  <p className="font-semibold text-slate-900 dark:text-white">{selectedFaculty.qualification}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                  <span className="text-slate-500 dark:text-slate-400 font-mono text-[10px]">EXPERIENCE</span>
                  <p className="font-semibold text-slate-900 dark:text-white">{selectedFaculty.experience}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                  <span className="text-slate-500 dark:text-slate-400 font-mono text-[10px]">PUBLICATIONS / CURRICULUM</span>
                  <p className="font-semibold text-slate-900 dark:text-white">{selectedFaculty.publications}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                  <span className="text-slate-500 dark:text-slate-400 font-mono text-[10px]">CAMPUS OFFICE</span>
                  <p className="font-semibold text-slate-900 dark:text-white">{selectedFaculty.office}</p>
                </div>
              </div>

              {/* Courses Taught */}
              {selectedFaculty.coursesTaught && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 font-mono">
                    Courses &amp; Labs Mentored
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedFaculty.coursesTaught.map((course, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/90 text-cyan-800 dark:text-cyan-300 text-xs font-medium border border-slate-300 dark:border-slate-700"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Modal Footer */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
                <button
                  onClick={() => setSelectedFaculty(null)}
                  className="px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-colors border border-slate-300 dark:border-transparent"
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

export default FacultySection;
