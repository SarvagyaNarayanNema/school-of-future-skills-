import React from 'react';
import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';
import { Calendar, User, Download, FileText, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const NoticeDetailModal = ({ isOpen, onClose, notice }) => {
  const { showToast } = useApp();

  if (!notice) return null;

  const handleDownload = () => {
    showToast(`Downloading official circular: ${notice.attachmentName}`, 'info');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={notice.title} maxWidth="max-w-3xl">
      <div className="space-y-4">
        {/* Meta Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800 text-xs">
          <div className="flex items-center gap-2">
            <Badge variant="cyan" size="xs">{notice.category}</Badge>
            {notice.isImportant && (
              <Badge variant="amber" size="xs">High Priority</Badge>
            )}
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1.5 font-mono">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              {notice.date}
            </span>
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-slate-400" />
              {notice.author}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="text-sm text-slate-200 leading-relaxed space-y-3 pt-2">
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 font-medium text-sky-200">
            {notice.summary}
          </div>
          <div className="text-slate-300 whitespace-pre-line leading-relaxed text-sm">
            {notice.fullContent}
          </div>
        </div>

        {/* Attachment Card if available */}
        {notice.attachmentName && (
          <div className="mt-4 p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-200">{notice.attachmentName}</p>
                <p className="text-[11px] text-slate-400">{notice.attachmentSize} • PDF Document</p>
              </div>
            </div>
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 text-xs font-semibold border border-sky-500/40 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Download
            </button>
          </div>
        )}

        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
          >
            Close Notice
          </button>
        </div>
      </div>
    </Modal>
  );
};
