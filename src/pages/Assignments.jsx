import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ASSIGNMENT_STATUSES } from '../data/assignments';
import { AssignmentSubmitModal } from '../components/modals/AssignmentSubmitModal';
import { Badge } from '../components/common/Badge';
import { EmptyState } from '../components/common/EmptyState';
import { Tabs } from '../components/common/Tabs';
import { StatCard } from '../components/common/StatCard';
import {
  Code2,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileCode,
  UploadCloud,
  Search,
  Filter,
  Check,
  Send,
  Layers,
  Sparkles
} from 'lucide-react';

export const Assignments = () => {
  const { assignments = [] } = useApp();
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedPriority, setSelectedPriority] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSubmitModalAsg, setActiveSubmitModalAsg] = useState(null);

  const pendingCount = assignments.filter(a => a.status === 'Pending' || a.status === 'Overdue').length;
  const submittedCount = assignments.filter(a => a.status === 'Submitted').length;
  const completedCount = assignments.filter(a => a.status === 'Completed' || a.status === 'Graded').length;

  const statusTabs = [
    { id: 'All', label: 'All Tasks', count: assignments.length },
    { id: 'Pending', label: 'Pending', count: pendingCount },
    { id: 'Submitted', label: 'Submitted', count: submittedCount },
    { id: 'Completed', label: 'Completed', count: completedCount },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
      case 'Graded':
        return <Badge variant="emerald" size="xs">✓ Completed</Badge>;
      case 'Submitted':
        return <Badge variant="cyan" size="xs">⏳ Submitted</Badge>;
      case 'Late':
      case 'Overdue':
        return <Badge variant="rose" size="xs">⚠️ Overdue</Badge>;
      default:
        return <Badge variant="amber" size="xs">● Pending</Badge>;
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'High':
        return <span className="text-[10px] font-bold text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20 font-mono">High Priority</span>;
      case 'Medium':
        return <span className="text-[10px] font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 font-mono">Medium</span>;
      default:
        return <span className="text-[10px] font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-300 dark:border-slate-700 font-mono">Standard</span>;
    }
  };

  const filtered = (assignments || []).filter(asg => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = asg.title?.toLowerCase().includes(q) ||
                          asg.subject?.toLowerCase().includes(q) ||
                          asg.code?.toLowerCase().includes(q) ||
                          asg.description?.toLowerCase().includes(q);
    const matchesStatus = selectedStatus === 'All' || asg.status === selectedStatus;
    const matchesPriority = selectedPriority === 'All' || asg.priority === selectedPriority;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-600 dark:text-cyan-400">
            <Code2 className="w-3.5 h-3.5" />
            <span>Curriculum Deliverables &amp; Code Assessments</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Assignment Manager
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Submit solution zip files, review automated test results, and collect instructor grades.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-mono font-bold">
            ⚡ +100 XP per Submission
          </div>
        </div>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          icon={FileCode}
          label="Pending Submissions"
          value={pendingCount.toString()}
          subtext="Action required before due dates"
          color={pendingCount > 0 ? "amber" : "emerald"}
        />
        <StatCard
          icon={UploadCloud}
          label="Submitted Under Review"
          value={submittedCount.toString()}
          subtext="Waiting for faculty evaluation"
          color="cyan"
        />
        <StatCard
          icon={CheckCircle2}
          label="Graded &amp; Finished"
          value={completedCount.toString()}
          subtext="Recorded to academic transcript"
          color="blue"
        />
      </div>

      {/* Interactive Tabs & Search Filter Bar */}
      <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <Tabs
            tabs={statusTabs}
            activeTab={selectedStatus}
            onChange={setSelectedStatus}
          />

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search assignments..."
                className="w-full pl-9 pr-3.5 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-500 shadow-sm"
              />
            </div>

            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="w-full sm:w-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-700 dark:text-slate-300 focus:outline-none focus:border-cyan-500"
            >
              <option value="All">All Priorities</option>
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>
          </div>
        </div>
      </div>

      {/* Assignment Deliverables List */}
      {filtered.length > 0 ? (
        <div className="space-y-4">
          {filtered.map((asg) => (
            <div
              key={asg.id}
              className="glass-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-3 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-bold text-cyan-600 dark:text-cyan-400">{asg.code}</span>
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
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    Due: <span className="font-semibold">{asg.dueDate}</span> at {asg.dueTime}
                  </span>
                  <span>Deliverables: {asg.deliverables}</span>
                </div>

                {/* Grade and feedback */}
                {asg.grade && (
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-800 dark:text-emerald-300">
                    <span className="font-bold">Evaluation Score: {asg.grade}</span> — "{asg.feedback}"
                  </div>
                )}

                {/* Current submission metadata */}
                {asg.submission && (
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 flex items-center justify-between">
                    <span>Submitted file: <span className="font-mono text-cyan-500 font-semibold">{asg.submission.fileName}</span></span>
                    <span className="text-slate-400 text-[11px] font-mono">{asg.submission.submittedAt}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="shrink-0 flex flex-col sm:flex-row md:flex-col gap-2">
                {asg.status === 'Completed' || asg.status === 'Graded' ? (
                  <button
                    disabled
                    className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 text-xs font-semibold cursor-default"
                  >
                    Graded &amp; Recorded
                  </button>
                ) : (
                  <button
                    onClick={() => setActiveSubmitModalAsg(asg)}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 transition-all hover:scale-[1.02]"
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
          title="No assignments match your filter"
          description="Try switching the status tabs or clearing search criteria."
          onReset={() => {
            setSearchQuery('');
            setSelectedPriority('All');
            setSelectedStatus('All');
          }}
        />
      )}

      {/* Assignment Submission Modal */}
      {activeSubmitModalAsg && (
        <AssignmentSubmitModal
          isOpen={!!activeSubmitModalAsg}
          onClose={() => setActiveSubmitModalAsg(null)}
          assignment={activeSubmitModalAsg}
        />
      )}

    </div>
  );
};

export default Assignments;
