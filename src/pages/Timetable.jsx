import React, { useState } from 'react';
import { timetableSchedule, DAYS_OF_WEEK } from '../data/timetable';
import { Calendar, Clock, MapPin, User, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Badge } from '../components/common/Badge';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

export const Timetable = () => {
  const [activeDay, setActiveDay] = useState('Monday');

  const todaySlots = timetableSchedule[activeDay] || [];

  const handlePrevDay = () => {
    const currentIdx = DAYS_OF_WEEK.indexOf(activeDay);
    const prevIdx = (currentIdx - 1 + DAYS_OF_WEEK.length) % DAYS_OF_WEEK.length;
    setActiveDay(DAYS_OF_WEEK[prevIdx]);
  };

  const handleNextDay = () => {
    const currentIdx = DAYS_OF_WEEK.indexOf(activeDay);
    const nextIdx = (currentIdx + 1) % DAYS_OF_WEEK.length;
    setActiveDay(DAYS_OF_WEEK[nextIdx]);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'Academic Timetable' }]} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-600 dark:text-cyan-400">
            <Calendar className="w-3.5 h-3.5" />
            <span>Academic Schedule &amp; Room Allocations</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Class Schedule &amp; Lecture Halls
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Track daily classroom lectures, specialized cybersecurity war rooms, and code lab practicals.
          </p>
        </div>

        {/* Day Jump / Controls */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={handlePrevDay}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            aria-label="Previous day"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setActiveDay('Monday')}
            className="px-3 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-500/30 border border-indigo-300 dark:border-indigo-500/40 text-xs font-bold transition-colors"
          >
            Jump to Today
          </button>
          <button
            onClick={handleNextDay}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            aria-label="Next day"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Days of Week Tab Buttons */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200 dark:border-slate-800">
        {DAYS_OF_WEEK.map((day) => (
          <button
            key={day}
            onClick={() => setActiveDay(day)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
              activeDay === day
                ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/25'
                : 'bg-slate-100 dark:bg-slate-900/80 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Slots Card Grid (Mobile-friendly and Desktop responsive) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>Schedule for <span className="text-slate-900 dark:text-white font-bold">{activeDay}</span></span>
          <span>{todaySlots.length} sessions scheduled</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {todaySlots.map((slot, idx) => (
            <div
              key={slot.id}
              className={`glass-panel p-5 rounded-2xl border-l-4 transition-all hover:-translate-y-1 hover:shadow-lg ${slot.color}`}
            >
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-mono font-bold flex items-center gap-1.5 text-slate-900 dark:text-white">
                  <Clock className="w-3.5 h-3.5" />
                  {slot.time}
                </span>
                <span className="font-mono text-[10px] uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                  {slot.type}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 leading-snug">
                {slot.subject}
              </h3>

              <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 border-t border-slate-200 dark:border-slate-800/80 pt-3">
                <div className="flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{slot.faculty}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate font-medium text-slate-900 dark:text-white">{slot.room}</span>
                </div>
              </div>

              {idx === 0 && activeDay === 'Monday' && (
                <div className="mt-3 pt-2 border-t border-slate-800 flex items-center gap-1.5 text-[11px] text-emerald-400 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>Current Ongoing Session</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
