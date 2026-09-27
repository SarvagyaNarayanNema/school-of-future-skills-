import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { UploadCloud, CheckCircle2, FileCode, Send } from 'lucide-react';

export const AssignmentSubmitModal = ({ isOpen, onClose, assignment }) => {
  const { submitAssignment, showToast } = useApp();
  const [fileName, setFileName] = useState('');
  const [comments, setComments] = useState('');
  const [fileAttached, setFileAttached] = useState(false);

  if (!assignment) return null;

  const handleSimulateFilePick = () => {
    const generatedName = `solution_${assignment.code.toLowerCase().replace('-', '_')}_submission.zip`;
    setFileName(generatedName);
    setFileAttached(true);
    showToast(`Attached file: ${generatedName}`, 'info');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fileName) {
      showToast("Please attach a submission file first", "warning");
      return;
    }

    submitAssignment(assignment.id, {
      fileName,
      fileSize: "2.1 MB",
      comments
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Submit: ${assignment.title}`} maxWidth="max-w-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-xs">
          <p className="font-semibold text-white">{assignment.subject} ({assignment.code})</p>
          <p className="text-slate-400 mt-0.5">Due: {assignment.dueDate} at {assignment.dueTime}</p>
          <p className="text-sky-400 mt-1">Deliverables: {assignment.deliverables}</p>
        </div>

        {/* File upload simulated dropzone */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Deliverable File</label>
          <div
            onClick={handleSimulateFilePick}
            className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-colors ${
              fileAttached
                ? 'border-emerald-500/50 bg-emerald-950/10'
                : 'border-slate-700 hover:border-sky-500/50 bg-slate-950/40'
            }`}
          >
            {fileAttached ? (
              <div className="space-y-1">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <p className="text-xs font-medium text-emerald-300">{fileName}</p>
                <p className="text-[11px] text-slate-400">2.1 MB • Ready for review (click to re-attach)</p>
              </div>
            ) : (
              <div className="space-y-1">
                <UploadCloud className="w-8 h-8 text-slate-400 mx-auto" />
                <p className="text-xs font-medium text-slate-300">Click to choose or attach project archive</p>
                <p className="text-[11px] text-slate-400">Supports .zip, .tar.gz, .cpp, .py, .pdf</p>
              </div>
            )}
          </div>
        </div>

        {/* Comments input */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Student Notes / Repository Link (Optional)</label>
          <textarea
            rows="3"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="Include any build steps, branch name, or test coverage notes for the evaluator..."
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-sky-500 resize-none"
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white"
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
