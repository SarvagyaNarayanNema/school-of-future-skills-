import React from 'react';
import { Calendar, User, FileText, AlertCircle, ArrowRight } from 'lucide-react';
import { Badge } from '../common/Badge';

export const NoticeCard = ({ notice, onOpenDetail }) => {
  const getCategoryVariant = (cat) => {
    switch (cat) {
      case 'Competitions/Hackathons': return 'purple';
      case 'Internship Opportunities': return 'emerald';
      case 'Exam Notices': return 'amber';
      case 'Workshop Updates': return 'cyan';
      default: return 'primary';
    }
  };

  return (
    <div
      onClick={() => onOpenDetail(notice)}
      className={`glass-panel rounded-2xl p-5 border cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${
        notice.isImportant
          ? 'border-amber-500/40 bg-amber-950/10 hover:border-amber-400'
          : 'border-slate-800/90 hover:border-sky-500/40'
      }`}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <div className="flex items-center gap-2">
          <Badge variant={getCategoryVariant(notice.category)} size="xs">
            {notice.category}
          </Badge>
          {notice.isImportant && (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/30">
              <AlertCircle className="w-3 h-3 text-amber-400" /> Urgent
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {notice.isUnread && (
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" title="Unread Notice" />
          )}
          <span className="text-xs text-slate-400 font-mono">{notice.date}</span>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-base font-bold text-white hover:text-sky-300 transition-colors mb-2 leading-snug">
        {notice.title}
      </h3>

      {/* Summary */}
      <p className="text-xs text-slate-400 line-clamp-2 mb-3.5 leading-relaxed">
        {notice.summary}
      </p>

      {/* Footer Info */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs">
        <div className="flex items-center gap-1.5 text-slate-400">
          <User className="w-3.5 h-3.5 text-slate-400" />
          <span className="truncate max-w-[200px]">{notice.author}</span>
        </div>
        {notice.attachmentName ? (
          <span className="inline-flex items-center gap-1 text-[11px] text-sky-400 font-medium bg-sky-500/10 px-2 py-0.5 rounded-lg border border-sky-500/20">
            <FileText className="w-3 h-3" /> {notice.attachmentName.split('.').pop().toUpperCase()}
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-slate-400 hover:text-sky-400">
            Read circular <ArrowRight className="w-3 h-3" />
          </span>
        )}
      </div>
    </div>
  );
};
