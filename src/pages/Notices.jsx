import React, { useState } from 'react';
import { initialNotices, NOTICE_PRIORITIES } from '../data/notices';
import { useApp } from '../context/AppContext';
import {
  Bell,
  Search,
  AlertCircle,
  FileText,
  Calendar,
  Download,
  Bookmark,
  CheckCircle2,
  X,
  Clock,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

export const Notices = () => {
  const { savedNotices, toggleSaveNotice, markNoticeRead, showToast } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('All');
  const [activeModalNotice, setActiveModalNotice] = useState(null);

  const getPriorityBadge = (prio) => {
    switch (prio) {
      case 'Urgent':
        return <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-400 border border-rose-500/30 font-bold flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Urgent Circular</span>;
      case 'Hackathons':
        return <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-400 border border-purple-500/30 font-bold">Hackathon</span>;
      case 'Examination':
        return <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30 font-bold">Examination</span>;
      case 'Workshops':
        return <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 font-bold">Workshop</span>;
      default:
        return null;
    }
  };

  const handleOpenNotice = (notice) => {
    markNoticeRead(notice.id);
    setActiveModalNotice(notice);
  };

  const handleDownloadAttachment = (notice) => {
    showToast(`Downloading official verified circular: ${notice.attachmentName}`, 'info');
  };

  const filteredNotices = initialNotices.filter(n => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = n.title.toLowerCase().includes(q) ||
                          n.summary.toLowerCase().includes(q) ||
                          n.fullContent.toLowerCase().includes(q) ||
                          n.author.toLowerCase().includes(q);
    const matchesPrio = selectedPriority === 'All' || n.priority === selectedPriority;
    return matchesSearch && matchesPrio;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-600 dark:text-amber-400">
          <Bell className="w-3.5 h-3.5" />
          <span>Official Department Announcements & Circulars</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Centralized Notice Board
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
          Stay updated on upcoming hackathons, practical examination schedules, compute cluster quotas, and curriculum masterclasses.
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
        
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search circulars by keyword, exam code, hackathon or author..."
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-amber-500"
          />
        </div>

        {/* Priority Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none pt-2 border-t border-slate-200 dark:border-slate-800/80">
          {NOTICE_PRIORITIES.map((prio) => (
            <button
              key={prio}
              onClick={() => setSelectedPriority(prio)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedPriority === prio
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
              }`}
            >
              {prio}
            </button>
          ))}
        </div>

      </div>

      {/* Notices Grid */}
      {filteredNotices.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredNotices.map((n) => {
            const isSaved = savedNotices.includes(n.id);

            return (
              <div
                key={n.id}
                onClick={() => handleOpenNotice(n)}
                className={`glass-panel p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-0.5 cursor-pointer flex flex-col justify-between group ${
                  n.isUrgent
                    ? 'border-amber-500/40 bg-amber-500/5 dark:bg-amber-950/10 hover:border-amber-400/80 shadow-[0_2px_20px_rgba(245,158,11,0.08)]'
                    : 'border-slate-200 dark:border-slate-800 hover:border-cyan-500/40'
                }`}
              >
                <div>
                  
                  {/* Top Bar */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      {getPriorityBadge(n.priority)}
                      {n.deadline && (
                        <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> Deadline: {n.deadline}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSaveNotice(n.id, n.title);
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                      title={isSaved ? "Remove Bookmark" : "Save Notice"}
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-amber-400 text-amber-400' : ''}`} />
                    </button>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors mb-2 leading-snug">
                    {n.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
                    {n.summary}
                  </p>

                </div>

                {/* Footer Meta & Attachment Pill */}
                <div className="pt-3 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                    <span className="font-mono text-[11px]">{n.date}</span>
                    <span>•</span>
                    <span className="truncate max-w-[140px] text-slate-700 dark:text-slate-300">{n.author}</span>
                  </div>

                  {n.attachmentName ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                      <FileText className="w-3 h-3" /> PDF ({n.attachmentSize})
                    </span>
                  ) : (
                    <span className="text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white flex items-center gap-1">
                      Read <ArrowRight className="w-3 h-3" />
                    </span>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-12 text-center glass-panel rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
          <Bell className="w-10 h-10 text-slate-400 dark:text-slate-500 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">No notices matched your criteria</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Try changing your search terms or selecting another priority category.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedPriority('All');
            }}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* ========================================================= */}
      {/* DETAILED NOTICE MODAL                                     */}
      {/* ========================================================= */}
      {activeModalNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[#0B0F19]/80 backdrop-blur-md"
            onClick={() => setActiveModalNotice(null)}
          />

          <div className="relative w-full max-w-2xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-700 rounded-3xl shadow-2xl z-10 my-8 p-6 sm:p-8 space-y-6 max-h-[85vh] overflow-y-auto">
            
            {/* Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  {getPriorityBadge(activeModalNotice.priority)}
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">Published {activeModalNotice.date}</span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white pt-1">
                  {activeModalNotice.title}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">Issuing Body: <span className="text-slate-800 dark:text-slate-200 font-semibold">{activeModalNotice.author}</span></p>
              </div>
              <button
                onClick={() => setActiveModalNotice(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Summary Callout */}
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-200 leading-relaxed font-medium">
              📌 {activeModalNotice.summary}
            </div>

            {/* Full Content */}
            <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-3 whitespace-pre-line">
              {activeModalNotice.fullContent}
            </div>

            {/* Deadline Pill */}
            {activeModalNotice.deadline && (
              <div className="p-3 bg-slate-50 dark:bg-slate-950/80 rounded-xl border border-slate-200 dark:border-slate-800 text-xs flex items-center justify-between text-slate-700 dark:text-slate-300">
                <span className="text-slate-500 dark:text-slate-400">Action / Registration Deadline:</span>
                <span className="font-mono font-bold text-rose-500 dark:text-rose-400">{activeModalNotice.deadline}</span>
              </div>
            )}

            {/* Download Attachment Box */}
            {activeModalNotice.attachmentName && (
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">{activeModalNotice.attachmentName}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">{activeModalNotice.attachmentSize} • Official Signed PDF Document</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDownloadAttachment(activeModalNotice)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 transition-colors shrink-0"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            )}

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={() => toggleSaveNotice(activeModalNotice.id, activeModalNotice.title)}
                className="inline-flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                <Bookmark className={`w-3.5 h-3.5 ${savedNotices.includes(activeModalNotice.id) ? 'fill-amber-400 text-amber-400' : ''}`} />
                <span>{savedNotices.includes(activeModalNotice.id) ? "Saved in Bookmarks" : "Save Notice"}</span>
              </button>

              <button
                onClick={() => setActiveModalNotice(null)}
                className="px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold"
              >
                Close Notice
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
