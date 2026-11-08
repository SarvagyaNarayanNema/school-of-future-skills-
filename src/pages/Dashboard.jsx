import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { timetableSchedule } from '../data/timetable';
import { ProgressBar } from '../components/common/ProgressBar';
import { StatCard } from '../components/common/StatCard';
import { Button } from '../components/common/Button';
import { AssignmentSubmitModal } from '../components/modals/AssignmentSubmitModal';
import { FutureBotScene } from '../components/futurebot';
import {
  Sparkles,
  Bot,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Trophy,
  Flame,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  Code2,
  Terminal,
  Cpu,
  Layers,
  ArrowUpRight,
  Send,
  Award,
  Bell,
  Play
} from 'lucide-react';

export const Dashboard = () => {
  const {
    user = { name: 'Alex Morgan', department: 'School of Future Skills & IT', rollNo: 'FS24-088', points: 1940 },
    levelInfo = { levelNumber: 4, title: 'Neural Pioneer', progressPercent: 72 },
    assignments = [],
    leaderboard = [],
    enrolledCourses = ['bca-aiml-2026', 'cyber-war-2026'],
    setFutureBotOpen
  } = useApp();

  const [activeSubmitAssignment, setActiveSubmitAssignment] = useState(null);

  const userLeaderboardItem = leaderboard.find(l => l.isUser) || { rank: 6, points: user?.points || 1940 };
  const pendingAssignments = assignments.filter(a => a.status === 'Pending' || a.status === 'Overdue');
  const submittedAssignments = assignments.filter(a => a.status === 'Submitted' || a.status === 'Graded');

  // Format today's date
  const today = new Date();
  const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = today.toLocaleDateString('en-US', dateOptions);

  const todayClasses = timetableSchedule["Monday"] || [
    { time: "09:00 - 10:30 AM", subject: "Advanced AI & Neural Networks", faculty: "Dr. Pooja Bijlani", room: "Studio 401" },
    { time: "11:00 - 12:30 PM", subject: "Network Defense & Threat Analysis", faculty: "Mr. Dharmendra Mehra", room: "War Room 204" },
    { time: "02:00 - 04:00 PM", subject: "Modern Web Systems Lab", faculty: "Mr. Hrishabh Dev Saini", room: "Lab 105" },
  ];

  const activeRoadmaps = [
    {
      id: 'c1',
      title: "Advanced Data Structures & Algorithms",
      module: "Module 4: Graph Theory & Shortest Path",
      progress: 78,
      code: "CS-301",
      color: "from-cyan-500 to-blue-600"
    },
    {
      id: 'c2',
      title: "Full-Stack Web Engineering (React/Node)",
      module: "Module 3: REST & GraphQL Microservices",
      progress: 64,
      code: "FS-204",
      color: "from-blue-500 to-purple-600"
    },
    {
      id: 'c3',
      title: "Network Defense & Cyber Security",
      module: "Module 2: Penetration Testing Protocols",
      progress: 42,
      code: "CY-108",
      color: "from-purple-500 to-indigo-600"
    },
  ];

  const badges = [
    { label: "RAG Innovator", xp: "+250 XP", icon: Sparkles, color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30" },
    { label: "Bug Hunter", xp: "+150 XP", icon: Code2, color: "text-purple-400 bg-purple-500/10 border-purple-500/30" },
    { label: "Hackathon Silver", xp: "+500 XP", icon: Trophy, color: "text-amber-400 bg-amber-500/10 border-amber-500/30" },
    { label: "Cyber Sentinel", xp: "+300 XP", icon: Award, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* ========================================================= */}
      {/* 1. TOP COCKPIT WELCOME BANNER                             */}
      {/* ========================================================= */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-[#0F172A] border border-cyan-500/30 p-6 sm:p-8 shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold border border-cyan-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Student Learning Terminal</span>
              <span className="text-slate-500 dark:text-slate-400 hidden sm:inline">• {formattedDate}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Welcome back, {user?.name || 'Alex Morgan'}! 👋
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              {user?.department || 'School of Future Skills & IT'} • Roll No:{' '}
              <span className="font-mono text-cyan-400 font-bold">{user?.rollNo || 'FS24-088'}</span> • Academic Semester V
            </p>
          </div>

          {/* Gamification Level Ribbon */}
          <div className="flex items-center gap-5 bg-[#080C16]/80 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-cyan-500/25 shrink-0 shadow-lg">
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono uppercase text-slate-400 block tracking-wider">LEVEL TIER</span>
              <span className="text-base sm:text-lg font-bold text-white block">{levelInfo?.title || 'Neural Pioneer'}</span>
              <span className="text-xs font-mono text-cyan-400">
                Level {levelInfo?.levelNumber || 4} ({levelInfo?.progressPercent || 72}%)
              </span>
            </div>
            <div className="h-10 w-[1px] bg-slate-800" />
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono uppercase text-slate-400 block tracking-wider">TOTAL SCORE</span>
              <span className="text-lg sm:text-xl font-black text-amber-400 block font-mono">
                {user?.points || 1940} XP
              </span>
              <span className="text-xs font-mono text-slate-400">Class Rank #{userLeaderboardItem.rank}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. STATS SUMMARY ROW                                      */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <StatCard
          icon={BookOpen}
          label="Enrolled Courses"
          value="4 Active"
          subtext="62% Avg. Syllabus Completed"
          color="cyan"
        />
        <StatCard
          icon={Code2}
          label="Pending Assignments"
          value={pendingAssignments.length.toString()}
          subtext={`${submittedAssignments.length} Delivered on schedule`}
          color={pendingAssignments.length > 0 ? "amber" : "emerald"}
        />
        <StatCard
          icon={Calendar}
          label="Today's Classes"
          value={`${todayClasses.length} Sessions`}
          subtext="Next: Advanced AI at 09:00 AM"
          color="purple"
        />
        <StatCard
          icon={Trophy}
          label="Class Leaderboard"
          value={`Rank #${userLeaderboardItem.rank}`}
          subtext="Top 5% University Rank"
          color="blue"
        />
      </div>

      {/* ========================================================= */}
      {/* 3. MAIN DASHBOARD CONTENT GRID                            */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Learning Roadmaps & Assignments (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Active Learning Progress Roadmaps */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="space-y-0.5">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-cyan-500" />
                  <span>Curriculum Progress &amp; Active Roadmaps</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Track module completions and continue coursework.</p>
              </div>
              <Link to="/courses" className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline">
                Course Catalog &rarr;
              </Link>
            </div>

            <div className="space-y-5">
              {activeRoadmaps.map((r) => (
                <div key={r.id} className="p-4 rounded-xl bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-slate-800/80 space-y-2.5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold">
                          {r.code}
                        </span>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                          {r.title}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{r.module}</p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-sm font-black font-mono text-cyan-600 dark:text-cyan-400">{r.progress}%</span>
                    </div>
                  </div>

                  <ProgressBar progress={r.progress} color={r.color} />

                  <div className="pt-1 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">4 of 6 Modules Finished</span>
                    <Link
                      to="/labs"
                      className="font-semibold text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
                    >
                      <span>Launch Code Lab</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pending & Urgent Assignments */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="space-y-0.5">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-emerald-500" />
                  <span>Pending Assignments &amp; Code Reviews</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Submit solution zip files or view faculty feedback.</p>
              </div>
              <Link to="/assignments" className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline">
                All Deliverables &rarr;
              </Link>
            </div>

            <div className="space-y-3">
              {pendingAssignments.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-500 dark:text-slate-400">
                  🎉 Great job! No pending assignments are due right now.
                </div>
              ) : (
                pendingAssignments.map((asg) => (
                  <div
                    key={asg.id}
                    className="p-4 rounded-xl bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs hover:border-cyan-500/30 transition-all"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20">
                          {asg.status || 'Pending'}
                        </span>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">{asg.title}</h4>
                      </div>
                      <p className="text-slate-500 dark:text-slate-400">
                        {asg.subject} • Due Date: <span className="text-slate-800 dark:text-slate-200 font-semibold">{asg.dueDate}</span>
                      </p>
                    </div>

                    <button
                      onClick={() => setActiveSubmitAssignment(asg)}
                      className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all shadow-sm shrink-0 flex items-center justify-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Solution</span>
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

        {/* Right Column: Schedule & Quick Hubs (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* FutureBot AI Academic Assistant Card */}
          <div className="glass-panel p-5 rounded-2xl border border-cyan-500/30 bg-gradient-to-b from-cyan-500/5 to-transparent relative overflow-hidden space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-cyan-500/40 p-1 flex items-center justify-center shrink-0 shadow-inner">
                <FutureBotScene
                  size="sm"
                  cameraDistance={4.2}
                  cameraY={0.65}
                  interactive={true}
                />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                    AI Study Companion
                  </h3>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                  FutureBot Assistant
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                  Ready to assist with homework &amp; labs
                </p>
              </div>
            </div>

            <Button
              size="sm"
              variant="primary"
              icon={Bot}
              className="w-full text-xs shadow-md shadow-cyan-500/10"
              onClick={() => setFutureBotOpen && setFutureBotOpen(true)}
            >
              Ask FutureBot
            </Button>
          </div>

          {/* Today's Schedule Card */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-purple-500" />
                <span>Today's Class Schedule</span>
              </h3>
              <Link to="/timetable" className="text-xs text-cyan-600 dark:text-cyan-400 hover:underline font-semibold">
                Full Week
              </Link>
            </div>

            <div className="space-y-3">
              {todayClasses.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-slate-800/80 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-cyan-600 dark:text-cyan-400 font-bold">{item.time}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {item.room}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">{item.subject}</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">{item.faculty}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Learning Accelerators */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
              <Cpu className="w-4 h-4 text-cyan-500" />
              <span>Interactive Learning Tools</span>
            </h3>

            <div className="space-y-2 pt-1">
              <Link
                to="/labs"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-slate-800/80 hover:border-cyan-500/40 transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                    <Terminal className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-xs text-slate-900 dark:text-white block group-hover:text-cyan-400 transition-colors">
                      Virtual Code Sandbox
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">Python, Node, Docker labs</span>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-400" />
              </Link>

              <Link
                to="/tech-zone"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-slate-800/80 hover:border-cyan-500/40 transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-xs text-slate-900 dark:text-white block group-hover:text-cyan-400 transition-colors">
                      Emerging Tech Zone
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">RAG, LLM &amp; Cloud playgrounds</span>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-400" />
              </Link>
            </div>
          </div>

          {/* Unlocked Gamification Badges */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-500" />
                <span>Earned Skill Badges</span>
              </h3>
              <Link to="/profile" className="text-xs text-cyan-600 dark:text-cyan-400 hover:underline font-semibold">
                View All
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {badges.map((b, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border flex flex-col items-center text-center space-y-1 ${b.color}`}
                >
                  <b.icon className="w-5 h-5" />
                  <span className="font-bold text-xs leading-tight">{b.label}</span>
                  <span className="font-mono text-[10px] opacity-80">{b.xp}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Assignment Submit Modal */}
      {activeSubmitAssignment && (
        <AssignmentSubmitModal
          assignment={activeSubmitAssignment}
          onClose={() => setActiveSubmitAssignment(null)}
        />
      )}

    </div>
  );
};

export default Dashboard;
