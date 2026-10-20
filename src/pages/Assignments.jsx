import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ASSIGNMENT_STATUSES } from '../data/assignments';
import { AssignmentSubmitModal } from '../components/modals/AssignmentSubmitModal';
import { Badge } from '../components/common/Badge';
import { EmptyState } from '../components/common/EmptyState';
import {
  Code2,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileCode,
  UploadCloud,
  Search,
  Filter
} from 'lucide-react';

export const Assignments = () => {
  const { assignments } = useApp();
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedPriority, setSelectedPriority] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSubmitModalAsg, setActiveSubmitModalAsg] = useState(null);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed': return <Badge variant="emerald" size="xs">✓ Completed</Badge>;
      case 'Submitted': return <Badge variant="cyan" size="xs">⏳ Submitted</Badge>;
      case 'Late': return <Badge variant="rose" size="xs">⚠️ Late</Badge>;
      default: return <Badge variant="amber" size="xs">● Pending</Badge>;
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'High': return <span className="text-[10px] font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">High Priority</span>;
      case 'Medium': return <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">Medium Priority</span>;
      default: return <span className="text-[10px] font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">Normal</span>;
    }
  };

  const filtered = assignments.filter(asg => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = asg.title.toLowerCase().includes(q) ||
                          asg.subject.toLowerCase().includes(q) ||
                          asg.code.toLowerCase().includes(q) ||
                          asg.description.toLowerCase().includes(q);
    const matchesStatus = selectedStatus === 'All' || asg.status === selectedStatus;
    const matchesPriority = selectedPriority === 'All' || asg.priority === selectedPriority;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          <Code2 className="w-3.5 h-3.5" />
          <span>Curriculum Deliverables & Code Assessments</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Student Assignment Manager
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
          Manage homework problems, submit code repositories, and review grading rubrics with automatic XP rewards.
        </p>
      </div>

      {/* Filters Bar */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search assignments by code, title, subject..."
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-emerald-500 shadow-sm"
            />
          </div>

          <div className="md:col-span-3">
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-emerald-500 shadow-sm"
            >
              <option value="All">All Priorities</option>
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>
          </div>

          <div className="md:col-span-3">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-emerald-500 shadow-sm"
            >
              {ASSIGNMENT_STATUSES.map(s => (
                <option key={s} value={s}>{s === 'All' ? 'All Statuses' : s}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Assignment Cards List */}
      {filtered.length > 0 ? (
        <div className="space-y-4">
          {filtered.map((asg) => (
            <div
              key={asg.id}
              className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-2.5 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs text-sky-600 dark:text-sky-400 font-semibold">{asg.code}</span>
                  <span className="text-slate-400">•</span>
                  <span className="text-xs text-slate-700 dark:text-slate-300 font-medium">{asg.subject}</span>
                  {getStatusBadge(asg.status)}
                  {getPriorityBadge(asg.priority)}
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                  {asg.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {asg.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-1">
                  <span className="flex items-center gap-1.5 font-mono text-slate-700 dark:text-slate-300">
                    <Clock className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                    Due: {asg.dueDate} at {asg.dueTime}
                  </span>
                  <span>Deliverables: {asg.deliverables}</span>
                </div>

                {/* Graded feedback badge if completed */}
                {asg.grade && (
                  <div className="p-2.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-xs text-emerald-300">
                    <span className="font-bold">Score: {asg.grade}</span> — "{asg.feedback}"
                  </div>
                )}

                {/* Existing submission pill */}
                {asg.submission && (
                  <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
                    <span>Submitted archive: <span className="font-mono text-sky-400">{asg.submission.fileName}</span></span>
                    <span className="text-slate-400 text-[11px]">{asg.submission.submittedAt}</span>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="shrink-0 flex flex-col sm:flex-row md:flex-col gap-2">
                {asg.status === 'Completed' ? (
                  <button
                    disabled
                    className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-400 text-xs font-semibold cursor-default"
                  >
                    Graded & Archived
                  </button>
                ) : (
                  <button
                    onClick={() => setActiveSubmitModalAsg(asg)}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs shadow-lg shadow-emerald-500/20 transition-colors"
                  >
                    <UploadCloud className="w-4 h-4" />
                    <span>{asg.status === 'Submitted' ? 'Resubmit Solution' : 'Submit Solution'}</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No assignments found"
          description="Try changing status filters or searching with different terms."
          onReset={() => {
            setSearchQuery('');
            setSelectedPriority('All');
            setSelectedStatus('All');
          }}
        />
      )}

      {/* Assignment Submission Modal */}
      <AssignmentSubmitModal
        isOpen={!!activeSubmitModalAsg}
        onClose={() => setActiveSubmitModalAsg(null)}
        assignment={activeSubmitModalAsg}
      />

    </div>
  );
};
