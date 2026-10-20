import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { initialCourses } from '../data/courses';
import { timetableSchedule, DAYS_OF_WEEK } from '../data/timetable';
import { ProgressBar } from '../components/common/ProgressBar';
import { Badge } from '../components/common/Badge';
import {
  Sparkles,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Trophy,
  Flame,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  Code2
} from 'lucide-react';

export const Dashboard = () => {
  const { user, levelInfo, assignments, leaderboard } = useApp();

  const userLeaderboardItem = leaderboard.find(l => l.isUser) || { rank: 6, points: user.points };
  const pendingAssignments = assignments.filter(a => a.status === 'Pending');
  const todayClasses = timetableSchedule["Monday"] || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Top Welcome Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-sky-500/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-sky-500/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 text-xs font-semibold border border-sky-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Student Learning Terminal</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Welcome back, {user.name}! 👋
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              {user.department} • Roll No: <span className="font-mono text-sky-600 dark:text-sky-400">{user.rollNo}</span>
            </p>
          </div>

          {/* Gamification Stats Ribbon */}
          <div className="flex items-center gap-4 bg-white/90 dark:bg-slate-950/70 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shrink-0 shadow-sm">
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-500 dark:text-slate-400 block">LEVEL STATUS</span>
              <span className="text-lg font-bold text-slate-900 dark:text-white block">{levelInfo.title}</span>
              <span className="text-xs text-sky-600 dark:text-sky-400 font-mono">Level {levelInfo.levelNumber} ({levelInfo.progressPercent}%)</span>
            </div>
            <div className="h-10 w-[1px] bg-slate-200 dark:bg-slate-800" />
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-500 dark:text-slate-400 block">TOTAL SCORE</span>
              <span className="text-xl font-black text-amber-600 dark:text-amber-400 block">{user.points} XP</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">Rank #{userLeaderboardItem.rank}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Learning Progress & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Col: Learning Progress */}
        <div className="lg:col-span-8 space-y-6">
          {/* Progress Tracker Card */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-sky-600 dark:text-sky-400" /> Your Learning Progress
              </h3>
              <Link to="/courses" className="text-xs text-sky-600 dark:text-sky-400 hover:underline font-semibold">
                Course Catalog →
              </Link>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs text-slate-700 dark:text-slate-300 mb-1.5 font-medium">
                  <span>Advanced Programming & Data Structures</span>
                  <span className="font-mono text-purple-600 dark:text-purple-400 font-bold">78%</span>
                </div>
                <ProgressBar progress={78} color="from-purple-500 to-indigo-500" />
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-700 dark:text-slate-300 mb-1.5 font-medium">
                  <span>Full-Stack Web Engineering (React/Node)</span>
                  <span className="font-mono text-cyan-600 dark:text-cyan-400 font-bold">64%</span>
                </div>
                <ProgressBar progress={64} color="from-cyan-500 to-blue-500" />
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-700 dark:text-slate-300 mb-1.5 font-medium">
                  <span>Network Security & Cyber Defense</span>
                  <span className="font-mono text-sky-600 dark:text-sky-400 font-bold">42%</span>
                </div>
                <ProgressBar progress={42} color="from-sky-500 to-cyan-500" />
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-700 dark:text-slate-300 mb-1.5 font-medium">
                  <span>Generative AI & Transformer Models</span>
                  <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">31%</span>
                </div>
                <ProgressBar progress={31} color="from-emerald-500 to-teal-500" />
              </div>
            </div>
          </div>

          {/* Pending Assignments */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Code2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Pending Assignments ({pendingAssignments.length})
              </h3>
              <Link to="/assignments" className="text-xs text-sky-600 dark:text-sky-400 hover:underline font-semibold">
                View All Deliverables →
              </Link>
            </div>

            <div className="space-y-3">
              {pendingAssignments.map((asg) => (
                <div key={asg.id} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 text-xs">
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white mb-0.5">{asg.title}</h4>
                    <p className="text-slate-500 dark:text-slate-400">{asg.subject} • Due {asg.dueDate}</p>
                  </div>
                  <Link
                    to="/assignments"
                    className="px-3 py-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-600 dark:text-sky-400 border border-sky-500/30 font-semibold shrink-0"
                  >
                    Submit Code
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Timetable & Badges */}
        <div className="lg:col-span-4 space-y-6">
          {/* Today's Schedule Card */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-500 dark:text-indigo-400" /> Today's Classes
              </h3>
              <Link to="/timetable" className="text-[11px] text-sky-600 dark:text-sky-400 hover:underline font-semibold">
                Full Week →
              </Link>
            </div>

            <div className="space-y-2.5 text-xs">
              {todayClasses.slice(0, 3).map((slot) => (
                <div key={slot.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                    <span className="font-mono text-sky-600 dark:text-sky-400 font-semibold">{slot.time}</span>
                    <span className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-[10px] text-slate-700 dark:text-slate-300 font-medium">{slot.type}</span>
                  </div>
                  <p className="font-bold text-slate-900 dark:text-white truncate">{slot.subject}</p>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px] truncate">📍 {slot.room}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Achievement Badges Showcase */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-500 dark:text-amber-400" /> Earned Skill Badges
              </h3>
              <Link to="/profile" className="text-[11px] text-sky-600 dark:text-sky-400 hover:underline font-semibold">
                Profile →
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              {user.badges.map((b) => (
                <div key={b.id} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-1">
                  <span className="text-2xl block">{b.icon}</span>
                  <span className="font-bold text-slate-900 dark:text-white text-[11px] block truncate">{b.name}</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block">{b.unlockedAt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
