import React from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, BookOpen, Clock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CourseEnrollModal = ({ isOpen, onClose, course, onConfirmed }) => {
  const { earnPoints } = useApp();
  const navigate = useNavigate();

  if (!course) return null;

  const handleConfirmEnrollment = () => {
    earnPoints(100, `Enrolled in ${course.title}`);
    if (onConfirmed) {
      onConfirmed(course.id);
    }
    onClose();
    navigate(`/courses/${course.id}`);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Enroll in Course Track" maxWidth="max-w-md">
      <div className="space-y-4 text-center py-2">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-sky-500/10 text-sky-400 border border-sky-500/20 flex items-center justify-center">
          <BookOpen className="w-7 h-7" />
        </div>

        <div>
          <span className="text-xs font-semibold text-sky-400 uppercase tracking-wider">{course.category}</span>
          <h4 className="text-base font-bold text-white mt-1">{course.title}</h4>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto">
          Enrollment grants full access to interactive problem sets, lab workstations, faculty mentor hours, and verification certificates.
        </p>

        <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800 text-left">
          <div>
            <span className="text-slate-400 block text-[10px]">Duration</span>
            <span className="font-semibold">{course.duration}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">Difficulty</span>
            <span className="font-semibold">{course.difficulty}</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 pt-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmEnrollment}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold transition-colors shadow-lg shadow-sky-500/25"
          >
            <span>Confirm & Start Learning</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </Modal>
  );
};
