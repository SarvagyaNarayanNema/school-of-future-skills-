import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { eventService } from '../services/eventService';
import { initialEvents } from '../data/events';
import { EventRegisterModal } from '../components/modals/EventRegisterModal';
import { Badge } from '../components/common/Badge';
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  User,
  CheckCircle2,
  Users,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(() => eventService.getById(id));
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  useEffect(() => {
    setEvent(eventService.getById(id));
  }, [id]);

  if (!event) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Event Not Found</h2>
        <p className="text-slate-400 text-sm">The event you are looking for is unavailable or has passed.</p>
        <Link
          to="/events"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-500 text-white font-semibold text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Events
        </Link>
      </div>
    );
  }

  const relatedEvents = initialEvents.filter(e => e.id !== event.id).slice(0, 2);

  const handleRegistered = (eventId, data) => {
    eventService.register(eventId, data);
    setEvent(eventService.getById(eventId));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      <div>
        <Link
          to="/events"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Events Catalog
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Content */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center gap-3">
            <Badge variant="purple" size="sm">{event.category}</Badge>
            {event.registered ? (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                <CheckCircle2 className="w-3.5 h-3.5" /> Registered Attendee
              </span>
            ) : (
              <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                {event.seatsRemaining} of {event.totalSeats} seats remaining
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            {event.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {event.description}
          </p>

          {/* Speaker Highlight Card */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
              <User className="w-4 h-4" /> Featured Speaker / Mentor
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">{event.speaker}</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{event.speakerBio}</p>
          </div>

          {/* Schedule Timeline */}
          {event.schedule && event.schedule.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Event Itinerary</h3>
              <div className="space-y-3">
                {event.schedule.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs">
                    <span className="font-mono font-bold text-sky-600 dark:text-sky-400 shrink-0 w-32">{item.time}</span>
                    <span className="text-slate-700 dark:text-slate-200">{item.item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Info */}
        <div className="lg:col-span-4 glass-panel p-6 rounded-3xl border border-purple-500/20 space-y-5">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Event Information</h3>
          
          <div className="space-y-3 text-xs text-slate-700 dark:text-slate-300">
            <div className="flex items-center gap-2.5">
              <Calendar className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
              <div>
                <span className="text-slate-500 dark:text-slate-400 block text-[10px]">Date</span>
                <span className="font-medium text-slate-900 dark:text-white">{event.date}</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
              <div>
                <span className="text-slate-500 dark:text-slate-400 block text-[10px]">Time</span>
                <span className="font-medium text-slate-900 dark:text-white">{event.time}</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
              <div>
                <span className="text-slate-500 dark:text-slate-400 block text-[10px]">Venue</span>
                <span className="font-medium text-slate-900 dark:text-white">{event.venue}</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Users className="w-4 h-4 text-purple-400 shrink-0" />
              <div>
                <span className="text-slate-400 block text-[10px]">Registration Deadline</span>
                <span className="font-medium text-amber-400">{event.registrationDeadline}</span>
              </div>
            </div>
          </div>

          <div className="pt-2">
            {event.registered ? (
              <button
                disabled
                className="w-full py-3 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold text-center flex items-center justify-center gap-2 cursor-default"
              >
                <CheckCircle2 className="w-4 h-4" /> Registration Confirmed
              </button>
            ) : (
              <button
                onClick={() => setIsRegisterModalOpen(true)}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-purple-500/25 transition-all"
              >
                <span>Reserve Free Student Seat</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      <EventRegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        event={event}
        onRegistered={handleRegistered}
      />

    </div>
  );
};
