import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, Calendar, MapPin, Sparkles, Send } from 'lucide-react';

export const EventRegisterModal = ({ isOpen, onClose, event, onRegistered }) => {
  const { user, earnPoints, showToast } = useApp();
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    rollNo: user.rollNo,
    trackInterest: 'Standard Attendee',
    agreeTerms: true
  });
  const [submitted, setSubmitted] = useState(false);

  if (!event) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      showToast("Please complete all required fields", "warning");
      return;
    }

    setSubmitted(true);
    earnPoints(100, `Registered for ${event.title}`);
    if (onRegistered) {
      onRegistered(event.id, formData);
    }
  };

  const handleClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={submitted ? "Registration Confirmed!" : `Register: ${event.title}`}>
      {submitted ? (
        <div className="py-6 text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h4 className="text-xl font-bold text-white">You're on the Guest List!</h4>
          <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
            Your seat for <span className="text-sky-400 font-semibold">{event.title}</span> has been confirmed. A calendar invitation has been prepared for <span className="font-mono text-slate-200">{formData.email}</span>.
          </p>

          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 text-left max-w-sm mx-auto space-y-2 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-sky-400" />
              <span>{event.date} • {event.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-sky-400" />
              <span>{event.venue}</span>
            </div>
            <div className="flex items-center gap-2 pt-1 border-t border-slate-800 text-emerald-400 font-semibold">
              <Sparkles className="w-4 h-4" />
              <span>+100 Student XP added to your profile!</span>
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={handleClose}
              className="px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-semibold text-sm transition-colors"
            >
              Done & Return
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-3 bg-sky-950/20 border border-sky-500/20 rounded-xl text-xs text-sky-300">
            <p className="font-medium">📅 {event.date} • {event.time}</p>
            <p className="text-slate-400">📍 {event.venue}</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Student Full Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-sky-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Student Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-sky-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Roll / ID Number</label>
              <input
                type="text"
                required
                value={formData.rollNo}
                onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Participation Track</label>
            <select
              value={formData.trackInterest}
              onChange={(e) => setFormData({ ...formData, trackInterest: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-sky-500"
            >
              <option value="Standard Attendee">In-Person Attendee</option>
              <option value="Virtual Livestream">Virtual Discord Stream</option>
              <option value="Team Captain">Competitive Team Participant</option>
            </select>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="agreeTerms"
              checked={formData.agreeTerms}
              onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
              className="rounded bg-slate-950 border-slate-700 text-sky-500 focus:ring-0"
            />
            <label htmlFor="agreeTerms" className="text-xs text-slate-400 cursor-pointer">
              I agree to abide by the Future Skills departmental code of conduct.
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-semibold text-xs transition-colors shadow-lg shadow-sky-500/20"
            >
              <Send className="w-3.5 h-3.5" />
              Confirm Registration
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};
