import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, User, CheckCircle2, ArrowRight } from 'lucide-react';
import { Badge } from '../common/Badge';

export const EventCard = ({ event, onRegisterClick }) => {
  const getCategoryVariant = (cat) => {
    switch (cat) {
      case 'Hackathons': return 'purple';
      case 'Workshops': return 'cyan';
      case 'Competitions': return 'amber';
      case 'Guest Lectures': return 'emerald';
      default: return 'primary';
    }
  };

  return (
    <div className="glass-panel rounded-2xl border border-slate-800/90 hover:border-sky-500/40 p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-500/5 group">
      <div>
        {/* Category & Status */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <Badge variant={getCategoryVariant(event.category)} size="xs">
            {event.category}
          </Badge>
          {event.registered ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              <CheckCircle2 className="w-3 h-3" /> Registered
            </span>
          ) : (
            <span className="text-[11px] text-amber-400 font-mono">
              {event.seatsRemaining} seats left
            </span>
          )}
        </div>

        {/* Title */}
        <Link to={`/events/${event.id}`}>
          <h3 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors line-clamp-2 mb-2 leading-snug">
            {event.title}
          </h3>
        </Link>

        {/* Short description */}
        <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
          {event.description}
        </p>

        {/* Event Logistics */}
        <div className="space-y-2 py-3 border-t border-b border-slate-800/80 mb-4 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-sky-400 shrink-0" />
            <span className="font-medium text-slate-200">{event.date}</span>
            <span className="text-slate-400">• {event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{event.venue}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{event.speaker}</span>
          </div>
        </div>
      </div>

      {/* Card CTA */}
      <div className="flex items-center gap-2 pt-2">
        <Link
          to={`/events/${event.id}`}
          className="flex-1 py-2 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-semibold text-center transition-colors border border-slate-700"
        >
          View Details
        </Link>
        {event.registered ? (
          <button
            disabled
            className="flex-1 py-2 px-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold text-center flex items-center justify-center gap-1.5 opacity-80 cursor-default"
          >
            <CheckCircle2 className="w-3.5 h-3.5" /> Registered
          </button>
        ) : (
          <button
            onClick={() => onRegisterClick(event)}
            className="flex-1 py-2 px-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs font-semibold text-center flex items-center justify-center gap-1.5 transition-colors shadow-sm shadow-sky-500/20"
          >
            Register Now <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
