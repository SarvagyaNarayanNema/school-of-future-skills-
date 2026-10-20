import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Badge } from '../components/common/Badge';
import { ProgressBar } from '../components/common/ProgressBar';
import {
  User,
  Mail,
  Award,
  Sparkles,
  BookOpen,
  Code2,
  Trophy,
  Edit3,
  Check,
  X,
  Flame,
  Plus
} from 'lucide-react';
import { Github, Linkedin } from '../components/common/BrandIcons';

export const Profile = () => {
  const { user, levelInfo, updateProfile, earnPoints } = useApp();
  const [isEditing, setIsEditing] = useState(false);

  // Edit fields
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio);
  const [skills, setSkills] = useState(user.skills);
  const [newSkill, setNewSkill] = useState('');
  const [github, setGithub] = useState(user.github || '');
  const [linkedin, setLinkedin] = useState(user.linkedin || '');

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile({
      name,
      bio,
      skills,
      github,
      linkedin
    });
    setIsEditing(false);
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Top Profile Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-sky-500/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-[90px] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-brand-600 via-sky-500 to-indigo-600 p-1 shadow-xl shadow-sky-500/20 shrink-0">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-white text-2xl font-black">
                {user.avatar}
              </div>
            </div>

            {/* Basic Info */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">{user.name}</h1>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/20 text-sky-600 dark:text-sky-400 border border-sky-500/30">
                  {user.rollNo}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">{user.department}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{user.year} • {user.email}</p>
            </div>
          </div>

          {/* Edit Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold border border-slate-300 dark:border-slate-700 transition-colors shadow-sm"
            >
              <Edit3 className="w-4 h-4" />
              <span>{isEditing ? "Close Editor" : "Edit Profile"}</span>
            </button>
          </div>
        </div>

        {/* Level & Progress Strip */}
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-3.5 bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase block">RANK TITLE</span>
            <span className="text-base font-bold text-slate-900 dark:text-white block">{levelInfo.title}</span>
            <span className="text-xs text-sky-600 dark:text-sky-400 font-mono">Level {levelInfo.levelNumber}</span>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase block">VERIFIED XP POINTS</span>
            <span className="text-xl font-black text-amber-600 dark:text-amber-400 block">{user.points} XP</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Earned through challenges & labs</span>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase block">NEXT LEVEL MILESTONE</span>
            <span className="text-sm font-bold text-slate-800 dark:text-slate-200 block">{levelInfo.nextLevelPoints} XP</span>
            <div className="mt-2">
              <ProgressBar progress={levelInfo.progressPercent} size="sm" />
            </div>
          </div>
        </div>
      </div>

      {/* EDIT FORM (Conditional) */}
      {isEditing && (
        <form onSubmit={handleSave} className="glass-panel p-6 sm:p-8 rounded-3xl border border-sky-500/50 space-y-5 animate-in fade-in duration-200">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Edit3 className="w-5 h-5 text-sky-400" /> Edit Student Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Student Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">GitHub Username / URL</label>
              <input
                type="text"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Bio / Research Interests</label>
            <textarea
              rows="3"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-sky-500 resize-none"
            />
          </div>

          {/* Add skill pills */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">Technical Skills & Stacks</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {skills.map((s, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-800 text-sky-300 border border-slate-700 text-xs">
                  <span>{s}</span>
                  <button type="button" onClick={() => handleRemoveSkill(s)} className="hover:text-rose-400">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2 max-w-sm">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add skill (e.g., Rust, GraphQL)..."
                className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-sky-500"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-3 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs font-semibold"
              >
                Add
              </button>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs shadow-lg shadow-sky-500/20"
            >
              <Check className="w-4 h-4" /> Save Changes
            </button>
          </div>
        </form>
      )}

      {/* Profile Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Col: Bio & Skills */}
        <div className="lg:col-span-6 space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3 text-xs leading-relaxed">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">About Student</h3>
            <p className="text-slate-600 dark:text-slate-300">{user.bio}</p>
          </div>

          {/* Skills Grid */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Verified Engineering Competencies</h3>
            <div className="flex flex-wrap gap-2 pt-1">
              {user.skills.map((s, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-mono font-medium shadow-sm"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Badges Wall */}
        <div className="lg:col-span-6 glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-500 dark:text-amber-400" /> Earned Skill Badges ({user.badges.length})
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">100% Verified</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {user.badges.map((b) => (
              <div key={b.id} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 flex items-start gap-3">
                <span className="text-2xl shrink-0">{b.icon}</span>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">{b.name}</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">{b.desc}</p>
                  <span className="text-[10px] text-sky-600 dark:text-sky-400 font-mono mt-1 block">{b.unlockedAt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
