import React, { useState, useRef } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { UploadCloud, CheckCircle2, FileCode, Send, Paperclip } from 'lucide-react';

export const AssignmentSubmitModal = ({ isOpen, onClose, assignment }) => {
  const { submitAssignment, showToast } = useApp();
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState('');
  const [comments, setComments] = useState('');
  const [fileAttached, setFileAttached] = useState(false);
  const fileInputRef = useRef(null);

  if (!assignment) return null;

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const sizeStr = file.size > 1024 * 1024
        ? `${(file.size / (1024 * 1024)).toFixed(2)} MB`
        : `${(file.size / 1024).toFixed(1)} KB`;
      setFileSize(sizeStr);
      setFileAttached(true);
      showToast(`Selected file: ${file.name} (${sizeStr})`, 'info');
    }
  };

  const handleSimulateFilePick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fileName) {
      showToast("Please attach a submission file first", "warning");
      return;
    }

    submitAssignment(assignment.id, {
      fileName,
      fileSize: fileSize || "1.8 MB",
      comments
    });
    setFileName('');
    setFileSize('');
    setComments('');
    setFileAttached(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Submit: ${assignment.title}`} maxWidth="max-w-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="p-3 bg-slate-100 dark:bg-slate-950/60 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
          <p className="font-semibold text-slate-900 dark:text-white">{assignment.subject} ({assignment.code})</p>
          <p className="text-slate-500 dark:text-slate-400 mt-0.5">Due: {assignment.dueDate} at {assignment.dueTime}</p>
          <p className="text-sky-600 dark:text-sky-400 mt-1">Deliverables: {assignment.deliverables}</p>
        </div>

        {/* Real File Input (Hidden) */}
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileChange}
          accept=".zip,.tar.gz,.pdf,.cpp,.py,.ipynb,.js,.jsx,.ts,.tsx,.json,.txt"
        />

        {/* File upload dropzone */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Deliverable File</label>
          <div
            onClick={handleSimulateFilePick}
            className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-colors ${
              fileAttached
                ? 'border-emerald-500/50 bg-emerald-500/10'
                : 'border-slate-300 dark:border-slate-700 hover:border-sky-500/50 bg-slate-50 dark:bg-slate-950/40'
            }`}
          >
            {fileAttached ? (
              <div className="space-y-1">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 dark:text-emerald-400 mx-auto" />
                <p className="text-xs font-medium text-emerald-600 dark:text-emerald-300">{fileName}</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">{fileSize || "Ready for review"} • Click to change file</p>
              </div>
            ) : (
              <div className="space-y-1">
                <UploadCloud className="w-8 h-8 text-slate-400 mx-auto" />
                <p className="text-xs font-medium text-slate-700 dark:text-slate-300">Click to browse or drop project archive</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Supports .zip, .tar.gz, .ipynb, .cpp, .py, .pdf</p>
              </div>
            )}
          </div>
        </div>

        {/* Comments input */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Student Notes / Repository Link (Optional)</label>
          <textarea
            rows="3"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="Include any build steps, branch name, or test coverage notes for the evaluator..."
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-sky-500 resize-none"
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs shadow-lg shadow-emerald-500/20 transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
            Turn In Assignment
          </button>
        </div>
      </form>
    </Modal>
  );
};
