import React, { useState } from 'react';
import { initialAlumni, ALUMNI_ROLES, ALUMNI_BATCHES } from '../data/alumni';
import { useApp } from '../context/AppContext';
import {
  GraduationCap,
  Search,
  Briefcase,
  MapPin,
  Calendar,
  ExternalLink,
  MessageSquare,
  CheckCircle2,
  X,
  Send,
  Sparkles,
  BookOpen
} from 'lucide-react';

export const Alumni = () => {
  const { requestMentorship, mentorshipRequests, showToast } = useApp();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('All Roles');
  const [selectedBatch, setSelectedBatch] = useState('All Batches');

  // Modal State
  const [activeMentorshipAlumni, setActiveMentorshipAlumni] = useState(null);
  const [mentorshipForm, setMentorshipForm] = useState({
    name: '',
    email: '',
    year: 'Year 3 (Pre-final)',
    topic: 'Resume Review',
    notes: ''
  });

  const handleMentorshipSubmit = (e) => {
    e.preventDefault();
    if (!mentorshipForm.name || !mentorshipForm.email) {
      showToast("Please provide your name and university email.", "warning");
      return;
    }
    requestMentorship(activeMentorshipAlumni.id, activeMentorshipAlumni.name, mentorshipForm);
    setActiveMentorshipAlumni(null);
    setMentorshipForm({
      name: '',
      email: '',
      year: 'Year 3 (Pre-final)',
      topic: 'Resume Review',
      notes: ''
    });
  };

  const filteredAlumni = initialAlumni.filter(al => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = al.name.toLowerCase().includes(q) ||
                          al.company.toLowerCase().includes(q) ||
                          al.currentRole.toLowerCase().includes(q) ||
                          al.skills.some(s => s.toLowerCase().includes(q));
    const matchesRole = selectedRole === 'All Roles' || al.roleCategory === selectedRole;
    const matchesBatch = selectedBatch === 'All Batches' || al.batch === selectedBatch;

    return matchesSearch && matchesRole && matchesBatch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Page Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-600 dark:text-blue-400">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Global Senior Network & Career Guidance</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Alumni Directory & Mentorship
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
          Connect directly with Future Skills graduates now leading engineering teams at Google DeepMind, AWS, Stripe, Jane Street, and Boston Dynamics.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          
          {/* Search Box */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by company (e.g. DeepMind), role, tech stack or senior name..."
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Role Filter */}
          <div className="md:col-span-3">
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:border-blue-500"
            >
              {ALUMNI_ROLES.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>

          {/* Batch Filter */}
          <div className="md:col-span-3">
            <select
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
              className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:border-blue-500"
            >
              {ALUMNI_BATCHES.map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

        </div>

      </div>

      {/* Alumni Cards Grid */}
      {filteredAlumni.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAlumni.map((al) => {
            const hasRequested = mentorshipRequests.some(r => r.alumniId === al.id);

            return (
              <div
                key={al.id}
                className="glass-panel rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500/40 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_24px_rgba(59,130,246,0.08)] group"
              >
                <div>
                  
                  {/* Top Avatar & Company */}
                  <div className="flex items-start gap-4 mb-4">
                    <img
                      src={al.image}
                      alt={al.name}
                      className="w-14 h-14 rounded-2xl object-cover border border-slate-200 dark:border-slate-700 shadow-md shrink-0"
                      loading="lazy"
                    />
                    <div className="min-w-0">
                      <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors truncate">
                        {al.name}
                      </h3>
                      <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 truncate">
                        {al.currentRole}
                      </p>
                      <p className="text-[11px] text-slate-700 dark:text-slate-300 font-medium truncate flex items-center gap-1 mt-0.5">
                        <Briefcase className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
                        <span>{al.company}</span>
                      </p>
                    </div>
                  </div>

                  {/* Batch & Location Pill */}
                  <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pb-3 mb-3 border-b border-slate-200 dark:border-slate-800">
                    <span className="font-mono bg-slate-100 dark:bg-slate-900 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                      {al.batch}
                    </span>
                    <span className="flex items-center gap-1 truncate max-w-[150px]">
                      <MapPin className="w-3 h-3 text-slate-400 dark:text-slate-500" /> {al.location}
                    </span>
                  </div>

                  {/* Bio */}
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed mb-3">
                    {al.bio}
                  </p>

                  {/* Past University Capstone */}
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 mb-4 space-y-0.5">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono uppercase block">University Project:</span>
                    <p className="italic text-slate-700 dark:text-slate-300 text-[11px]">{al.pastUniversityProject}</p>
                  </div>

                  {/* Mentorship Topics Supported */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {al.mentorshipTopics.map((top, idx) => (
                      <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-300 border border-blue-500/20">
                        {top}
                      </span>
                    ))}
                  </div>

                </div>

                {/* Footer Mentorship CTA */}
                <div className="pt-3 border-t border-slate-200 dark:border-slate-800/80 flex items-center gap-2">
                  <button
                    onClick={() => setActiveMentorshipAlumni(al)}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 ${
                      hasRequested
                        ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30'
                        : 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-500/20'
                    }`}
                  >
                    {hasRequested ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                        <span>Mentorship Requested</span>
                      </>
                    ) : (
                      <>
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Request Mentorship</span>
                      </>
                    )}
                  </button>

                  <a
                    href={al.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800"
                    title="LinkedIn Profile"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-12 text-center glass-panel rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
          <GraduationCap className="w-10 h-10 text-slate-400 dark:text-slate-500 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">No alumni match your criteria</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Try broadening your search or resetting role and batch filters.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedRole('All Roles');
              setSelectedBatch('All Batches');
            }}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* ========================================================= */}
      {/* REQUEST MENTORSHIP MODAL                                  */}
      {/* ========================================================= */}
      {activeMentorshipAlumni && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div
            className="fixed inset-0 bg-[#0B0F19]/80 backdrop-blur-md"
            onClick={() => setActiveMentorshipAlumni(null)}
          />

          <div className="relative w-full max-w-lg bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-700 rounded-3xl shadow-2xl z-10 my-8 p-6 sm:p-8 space-y-5">
            
            <div className="flex items-start justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <img
                  src={activeMentorshipAlumni.image}
                  alt={activeMentorshipAlumni.name}
                  className="w-12 h-12 rounded-xl object-cover border border-slate-200 dark:border-slate-700"
                />
                <div>
                  <span className="text-[10px] font-mono uppercase text-blue-600 dark:text-blue-400 font-bold">1-on-1 Alumni Guidance</span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{activeMentorshipAlumni.name}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{activeMentorshipAlumni.currentRole} at {activeMentorshipAlumni.company}</p>
                </div>
              </div>
              <button
                onClick={() => setActiveMentorshipAlumni(null)}
                className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleMentorshipSubmit} className="space-y-4 text-xs">
              
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Student Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Morgan"
                  value={mentorshipForm.name}
                  onChange={(e) => setMentorshipForm({ ...mentorshipForm, name: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">University Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="student@futureskills.edu"
                    value={mentorshipForm.email}
                    onChange={(e) => setMentorshipForm({ ...mentorshipForm, email: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Year of Study</label>
                  <select
                    value={mentorshipForm.year}
                    onChange={(e) => setMentorshipForm({ ...mentorshipForm, year: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2 text-slate-900 dark:text-slate-200 focus:outline-none focus:border-blue-500"
                  >
                    <option value="Year 1 (Freshman)">Year 1 (Freshman)</option>
                    <option value="Year 2 (Sophomore)">Year 2 (Sophomore)</option>
                    <option value="Year 3 (Pre-final)">Year 3 (Pre-final)</option>
                    <option value="Year 4 (Senior)">Year 4 (Senior)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Mentorship Focus Topic *</label>
                <select
                  value={mentorshipForm.topic}
                  onChange={(e) => setMentorshipForm({ ...mentorshipForm, topic: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2 text-slate-900 dark:text-slate-200 focus:outline-none focus:border-blue-500"
                >
                  <option value="Resume Review">Resume & Portfolio Review</option>
                  <option value="Mock Interview">Technical Coding / System Design Mock Interview</option>
                  <option value="Career Advice">Career Advice & Grad School Strategy</option>
                  <option value="Open Source Mentorship">Open Source & Research Guidance</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">What would you like to discuss? (Questions/Context)</label>
                <textarea
                  rows="3"
                  placeholder="Share your background, target companies, or specific questions..."
                  value={mentorshipForm.notes}
                  onChange={(e) => setMentorshipForm({ ...mentorshipForm, notes: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setActiveMentorshipAlumni(null)}
                  className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-colors shadow-lg shadow-blue-500/20"
                >
                  Submit Mentorship Request
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
