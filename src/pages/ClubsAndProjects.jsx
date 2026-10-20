import React, { useState } from 'react';
import { studentClubs, initialTechClubs, initialStudentProjects } from '../data/clubsAndProjects';
import { useApp } from '../context/AppContext';
import {
  Users,
  Code2,
  ThumbsUp,
  ExternalLink,
  GitBranch,
  Plus,
  Calendar,
  MapPin,
  CheckCircle2,
  X,
  Search,
  Sparkles,
  Layers,
  Send,
  UserPlus
} from 'lucide-react';

export const ClubsAndProjects = () => {
  const {
    joinedClubs,
    joinClub,
    likedProjects,
    projectLikes,
    toggleProjectLike,
    customProjects,
    submitProject,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState('clubs'); // 'clubs' | 'projects'
  const [searchQuery, setSearchQuery] = useState('');

  // Modal states
  const [activeJoinClubModal, setActiveJoinClubModal] = useState(null);
  const [isSubmitProjectModalOpen, setIsSubmitProjectModalOpen] = useState(false);

  // Join Club Form State
  const [joinForm, setJoinForm] = useState({
    name: '',
    email: '',
    rollNo: '',
    year: 'Year 2 (Undergrad)',
    experience: '',
    agreeToContribute: true
  });

  // Submit Project Form State
  const [projectForm, setProjectForm] = useState({
    name: '',
    team: '',
    category: 'AI & Machine Learning',
    technologies: '',
    description: '',
    github: '',
    demo: ''
  });

  // Combine initial projects + user-submitted projects
  const allProjects = [...customProjects, ...initialStudentProjects];

  // Filter tech clubs
  const clubsList = studentClubs || initialTechClubs;
  const filteredClubs = clubsList.filter(club => {
    const q = searchQuery.toLowerCase();
    return club.name.toLowerCase().includes(q) ||
           club.description.toLowerCase().includes(q) ||
           club.tags.some(t => t.toLowerCase().includes(q)) ||
           (club.category && club.category.toLowerCase().includes(q)) ||
           (club.badge && club.badge.toLowerCase().includes(q)) ||
           (club.leads && club.leads.toLowerCase().includes(q)) ||
           (club.lead && club.lead.toLowerCase().includes(q));
  });

  // Filter student projects
  const filteredProjects = allProjects.filter(p => {
    const q = searchQuery.toLowerCase();
    return p.name.toLowerCase().includes(q) ||
           p.description.toLowerCase().includes(q) ||
           p.studentTeam.toLowerCase().includes(q) ||
           p.technologies.some(t => t.toLowerCase().includes(q));
  });

  const handleJoinSubmit = (e) => {
    e.preventDefault();
    if (!joinForm.name || !joinForm.email || !joinForm.rollNo) {
      showToast("Please fill in your name, email, and roll number.", "warning");
      return;
    }
    joinClub(activeJoinClubModal.id, activeJoinClubModal.name, joinForm);
    setActiveJoinClubModal(null);
    setJoinForm({
      name: '',
      email: '',
      rollNo: '',
      year: 'Year 2 (Undergrad)',
      experience: '',
      agreeToContribute: true
    });
  };

  const handleProjectSubmit = (e) => {
    e.preventDefault();
    if (!projectForm.name || !projectForm.team || !projectForm.description || !projectForm.technologies) {
      showToast("Please complete the required project fields.", "warning");
      return;
    }
    submitProject(projectForm);
    setIsSubmitProjectModalOpen(false);
    setProjectForm({
      name: '',
      team: '',
      category: 'AI & Machine Learning',
      technologies: '',
      description: '',
      github: '',
      demo: ''
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-semibold text-purple-600 dark:text-purple-400">
            <Users className="w-3.5 h-3.5" />
            <span>Student Innovation Ecosystem</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Student Clubs & Projects
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
            Collaborate in university technical guilds, build open-source software, deploy physical hardware, and showcase capstone projects to peers and recruiters.
          </p>
        </div>

        {/* Submit Project Button CTA */}
        <button
          onClick={() => setIsSubmitProjectModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-purple-500/25 transition-all self-start md:self-auto shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Submit a Project</span>
        </button>
      </div>

      {/* Tabs & Search Controls */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          {/* Tab Selector */}
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800 self-start">
            <button
              onClick={() => setActiveTab('clubs')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
                activeTab === 'clubs'
                  ? 'bg-purple-600 dark:bg-purple-500 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Technical Clubs ({clubsList.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
                activeTab === 'projects'
                  ? 'bg-cyan-500 text-slate-950 shadow-md font-extrabold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Project Showcase ({allProjects.length})</span>
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={activeTab === 'clubs' ? "Search tech clubs, leads, stacks..." : "Search project repositories..."}
              className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-purple-500"
            />
          </div>

        </div>

      </div>

      {/* ========================================================= */}
      {/* TAB 1: TECH CLUBS DIRECTORY                               */}
      {/* ========================================================= */}
      {activeTab === 'clubs' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 max-w-5xl mx-auto">
            <span>Showing <span className="text-slate-900 dark:text-white font-bold">{filteredClubs.length}</span> departmental guilds</span>
            <span>You have joined <span className="text-purple-600 dark:text-purple-400 font-bold">{joinedClubs.length}</span> clubs</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {filteredClubs.map((club) => {
              const isJoined = joinedClubs.includes(club.id);

              return (
                <div
                  key={club.id}
                  className="glass-panel rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-purple-500/40 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(168,85,247,0.12)] group"
                >
                  <div>
                    
                    {/* Club Cover Image with Category overlay badge and live Member counter pill */}
                    <div className="relative aspect-video rounded-2xl overflow-hidden mb-5 bg-slate-900 border border-slate-800">
                      <img
                        src={club.image}
                        alt={club.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="text-[11px] font-mono font-bold bg-[#0B0F19]/90 text-purple-300 px-3 py-1 rounded-full border border-purple-500/30 backdrop-blur-md shadow-md">
                          {club.badge || club.category}
                        </span>
                      </div>
                      <div className="absolute bottom-3 right-3 bg-[#0B0F19]/90 px-3 py-1 rounded-lg text-xs font-mono font-semibold text-slate-200 border border-slate-700/80 backdrop-blur-md shadow-md">
                        {club.membersCount || club.activeMembers} Members
                      </div>
                    </div>

                    {/* Club Title and Category */}
                    <div className="mb-2.5">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
                        {club.name}
                      </h3>
                      {club.category && (
                        <p className="text-xs text-purple-600 dark:text-purple-400 font-medium mt-0.5">{club.category}</p>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                      {club.description}
                    </p>

                    {/* Tech/Skill Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {club.tags.map((t, idx) => (
                        <span key={idx} className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/70">
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Schedule & Venue info rows with Lucide icons (Calendar, MapPin) */}
                    <div className="py-3 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 space-y-2 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-purple-500 dark:text-purple-400 shrink-0" />
                        <span className="truncate">{club.schedule || club.meetingSchedule}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-cyan-500 dark:text-cyan-400 shrink-0" />
                        <span className="truncate">{club.venue || club.room}</span>
                      </div>
                    </div>

                  </div>

                  {/* Functional "Join Club" modal button with toggle state / confirmation */}
                  <div className="pt-3 border-t border-slate-200 dark:border-slate-800/80">
                    <button
                      onClick={() => setActiveJoinClubModal(club)}
                      className={`w-full py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                        isJoined
                          ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30'
                          : 'bg-purple-600 hover:bg-purple-500 dark:bg-purple-500 dark:hover:bg-purple-400 text-white shadow-md shadow-purple-500/25 hover:scale-[1.01]'
                      }`}
                    >
                      {isJoined ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                          <span>Member (Active Roster)</span>
                        </>
                      ) : (
                        <>
                          <UserPlus className="w-4 h-4" />
                          <span>Join Club</span>
                        </>
                      )}
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 2: STUDENT PROJECTS SHOWCASE                         */}
      {/* ========================================================= */}
      {activeTab === 'projects' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Showing <span className="text-slate-900 dark:text-white font-bold">{filteredProjects.length}</span> student repositories & live prototypes</span>
            <span>Upvoted: <span className="text-cyan-600 dark:text-cyan-400 font-bold">{likedProjects.length}</span> projects</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((p) => {
              const likesCount = projectLikes[p.id] ?? p.likes;
              const isLiked = likedProjects.includes(p.id);

              return (
                <div
                  key={p.id}
                  className="glass-panel rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_24px_rgba(0,210,255,0.08)] group"
                >
                  <div>
                    
                    {/* Project Image */}
                    <div className="relative aspect-video rounded-xl overflow-hidden mb-4 bg-slate-900 border border-slate-800">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute top-2.5 left-2.5">
                        <span className="text-[10px] font-mono font-bold bg-[#0B0F19]/90 text-cyan-300 px-2.5 py-0.5 rounded-full border border-cyan-500/30 backdrop-blur-md">
                          {p.category}
                        </span>
                      </div>
                      <div className="absolute bottom-2.5 left-2.5 bg-[#0B0F19]/90 px-2 py-0.5 rounded-md text-[10px] font-mono text-slate-300 border border-slate-700">
                        {p.year}
                      </div>
                    </div>

                    {/* Name */}
                    <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors mb-1.5 leading-snug">
                      {p.name}
                    </h3>

                    {/* Team */}
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                      <span className="text-slate-800 dark:text-slate-300 font-semibold">Team:</span> {p.studentTeam}
                    </p>

                    {/* Description */}
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-3">
                      {p.description}
                    </p>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {p.technologies.map((t, idx) => (
                        <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60">
                          {t}
                        </span>
                      ))}
                    </div>

                  </div>

                  {/* Actions & Upvote */}
                  <div className="pt-3 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between gap-2">
                    
                    {/* Like / Upvote Button */}
                    <button
                      onClick={() => toggleProjectLike(p.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors ${
                        isLiked
                          ? 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-300 border-cyan-500/40 shadow-sm shadow-cyan-500/10'
                          : 'bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
                      }`}
                    >
                      <ThumbsUp className={`w-3.5 h-3.5 ${isLiked ? 'fill-cyan-500 text-cyan-500' : ''}`} />
                      <span>{likesCount}</span>
                    </button>

                    {/* Links */}
                    <div className="flex items-center gap-2">
                      {p.github && (
                        <a
                          href={p.github}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-xl bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-300 dark:border-slate-700"
                          title="View Git Repository"
                        >
                          <GitBranch className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {p.demo && (
                        <a
                          href={p.demo}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20"
                        >
                          <span>Live Demo</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 1: JOIN TECH CLUB                                   */}
      {/* ========================================================= */}
      {activeJoinClubModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div
            className="fixed inset-0 bg-[#0B0F19]/80 backdrop-blur-md"
            onClick={() => setActiveJoinClubModal(null)}
          />

          <div className="relative w-full max-w-lg bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-700 rounded-3xl shadow-2xl z-10 my-8 p-6 sm:p-8 space-y-5">
            
            <div className="flex items-start justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div>
                <span className="text-[10px] font-mono uppercase text-purple-600 dark:text-purple-400 font-bold">Club Membership Application</span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{activeJoinClubModal.name}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Coordinated by: {activeJoinClubModal.leads || activeJoinClubModal.lead}</p>
              </div>
              <button
                onClick={() => setActiveJoinClubModal(null)}
                className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleJoinSubmit} className="space-y-4 text-xs">
              
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Student Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Morgan"
                  value={joinForm.name}
                  onChange={(e) => setJoinForm({ ...joinForm, name: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Student Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="student@futureskills.edu"
                    value={joinForm.email}
                    onChange={(e) => setJoinForm({ ...joinForm, email: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Roll / Student ID *</label>
                  <input
                    type="text"
                    required
                    placeholder="FS26-088"
                    value={joinForm.rollNo}
                    onChange={(e) => setJoinForm({ ...joinForm, rollNo: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Current Year of Study</label>
                <select
                  value={joinForm.year}
                  onChange={(e) => setJoinForm({ ...joinForm, year: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2 text-slate-900 dark:text-slate-200 focus:outline-none focus:border-purple-500"
                >
                  <option value="Year 1 (Freshman)">Year 1 (Freshman)</option>
                  <option value="Year 2 (Sophomore)">Year 2 (Sophomore)</option>
                  <option value="Year 3 (Pre-final)">Year 3 (Pre-final)</option>
                  <option value="Year 4 (Senior)">Year 4 (Senior)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Why do you want to join this club?</label>
                <textarea
                  rows="2"
                  placeholder="Share your interest, previous tech projects, or what you'd like to learn..."
                  value={joinForm.experience}
                  onChange={(e) => setJoinForm({ ...joinForm, experience: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-purple-500 resize-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="agreeContribute"
                  checked={joinForm.agreeToContribute}
                  onChange={(e) => setJoinForm({ ...joinForm, agreeToContribute: e.target.checked })}
                  className="rounded bg-slate-100 dark:bg-slate-950 border-slate-300 dark:border-slate-700 text-purple-600 focus:ring-0"
                />
                <label htmlFor="agreeContribute" className="text-slate-600 dark:text-slate-400 cursor-pointer">
                  I commit to attending weekly technical sessions and guild hackathons.
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setActiveJoinClubModal(null)}
                  className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-purple-600 dark:bg-purple-500 hover:bg-purple-500 dark:hover:bg-purple-400 text-white font-bold transition-colors shadow-lg shadow-purple-500/20"
                >
                  Confirm & Join Roster
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 2: SUBMIT A PROJECT FORM                            */}
      {/* ========================================================= */}
      {isSubmitProjectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div
            className="fixed inset-0 bg-[#0B0F19]/80 backdrop-blur-md"
            onClick={() => setIsSubmitProjectModalOpen(false)}
          />

          <div className="relative w-full max-w-lg bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-700 rounded-3xl shadow-2xl z-10 my-8 p-6 sm:p-8 space-y-5">
            
            <div className="flex items-start justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div>
                <span className="text-[10px] font-mono uppercase text-cyan-600 dark:text-cyan-400 font-bold">Innovation Showcase Submission</span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Publish Student Project</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Share your repository with the department.</p>
              </div>
              <button
                onClick={() => setIsSubmitProjectModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleProjectSubmit} className="space-y-4 text-xs">
              
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Project Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. eBPF Network Visualizer"
                  value={projectForm.name}
                  onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Student / Team Members *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Morgan, Zoe Martinez"
                  value={projectForm.team}
                  onChange={(e) => setProjectForm({ ...projectForm, team: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Primary Domain</label>
                  <select
                    value={projectForm.category}
                    onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-slate-200 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="AI & Machine Learning">AI & Machine Learning</option>
                    <option value="Cyber Security">Cyber Security</option>
                    <option value="Cloud & DevOps">Cloud & DevOps</option>
                    <option value="Web & Distributed">Web & Distributed</option>
                    <option value="IoT & Hardware">IoT & Hardware</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Tech Stack (comma-separated) *</label>
                  <input
                    type="text"
                    required
                    placeholder="React, PyTorch, Docker"
                    value={projectForm.technologies}
                    onChange={(e) => setProjectForm({ ...projectForm, technologies: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Brief Description *</label>
                <textarea
                  rows="3"
                  required
                  placeholder="Explain the problem statement, architecture, and results..."
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">GitHub Repo URL</label>
                  <input
                    type="url"
                    placeholder="https://github.com/..."
                    value={projectForm.github}
                    onChange={(e) => setProjectForm({ ...projectForm, github: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Live Demo URL</label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={projectForm.demo}
                    onChange={(e) => setProjectForm({ ...projectForm, demo: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsSubmitProjectModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-colors shadow-lg shadow-cyan-500/20"
                >
                  Publish to Showcase
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
