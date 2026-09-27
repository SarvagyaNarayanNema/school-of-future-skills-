import React, { useState } from 'react';
import { initialNotices, NOTICE_CATEGORIES } from '../data/notices';
import { NoticeCard } from '../components/cards/NoticeCard';
import { NoticeDetailModal } from '../components/modals/NoticeDetailModal';
import { EmptyState } from '../components/common/EmptyState';
import { noticeService } from '../services/noticeService';
import { Search, Bell, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';

export const Notices = () => {
  const [notices, setNotices] = useState(() => noticeService.getAll());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filterImportantOnly, setFilterImportantOnly] = useState(false);
  const [activeNotice, setActiveNotice] = useState(null);

  const handleOpenNotice = (notice) => {
    noticeService.markAsRead(notice.id);
    setNotices(noticeService.getAll());
    setActiveNotice(notice);
  };

  const filteredNotices = notices.filter(n => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = n.title.toLowerCase().includes(q) ||
                          n.summary.toLowerCase().includes(q) ||
                          n.fullContent.toLowerCase().includes(q) ||
                          n.author.toLowerCase().includes(q);
    const matchesCategory = selectedCategory === 'All' || n.category === selectedCategory;
    const matchesImportant = !filterImportantOnly || n.isImportant;

    return matchesSearch && matchesCategory && matchesImportant;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-400">
          <Bell className="w-3.5 h-3.5" />
          <span>Department Notices & Official Communications</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Official Notice Board
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
          Stay informed on academic circulars, exam rosters, industry internship drives, and departmental hackathon schedules.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search circulars, exams, hackathons..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-sky-500"
            />
          </div>

          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer self-start md:self-auto bg-slate-900 px-3 py-2 rounded-xl border border-slate-800">
            <input
              type="checkbox"
              checked={filterImportantOnly}
              onChange={(e) => setFilterImportantOnly(e.target.checked)}
              className="rounded bg-slate-950 border-slate-700 text-amber-500 focus:ring-0"
            />
            <span className="flex items-center gap-1.5 font-medium">
              <AlertCircle className="w-3.5 h-3.5 text-amber-400" /> Show High Priority Only
            </span>
          </label>
        </div>

        {/* Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none pt-2 border-t border-slate-800/80">
          {NOTICE_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Notice List */}
      {filteredNotices.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredNotices.map((notice) => (
            <NoticeCard
              key={notice.id}
              notice={notice}
              onOpenDetail={handleOpenNotice}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No notices found"
          description="There are currently no circulars matching your active keyword or category filter."
          onReset={() => {
            setSearchQuery('');
            setSelectedCategory('All');
            setFilterImportantOnly(false);
          }}
        />
      )}

      {/* Notice Detail Modal */}
      <NoticeDetailModal
        isOpen={!!activeNotice}
        onClose={() => setActiveNotice(null)}
        notice={activeNotice}
      />

    </div>
  );
};
