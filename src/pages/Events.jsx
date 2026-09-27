import React, { useState } from 'react';
import { initialEvents, EVENT_CATEGORIES } from '../data/events';
import { EventCard } from '../components/cards/EventCard';
import { EventRegisterModal } from '../components/modals/EventRegisterModal';
import { EmptyState } from '../components/common/EmptyState';
import { eventService } from '../services/eventService';
import { Calendar, Search, Zap, CheckCircle2 } from 'lucide-react';

export const Events = () => {
  const [events, setEvents] = useState(() => eventService.getAll());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeRegisterEvent, setActiveRegisterEvent] = useState(null);

  const handleRegistered = (eventId, formData) => {
    eventService.register(eventId, formData);
    setEvents(eventService.getAll());
  };

  const filteredEvents = events.filter(e => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = e.title.toLowerCase().includes(q) ||
                          e.description.toLowerCase().includes(q) ||
                          e.speaker.toLowerCase().includes(q) ||
                          e.venue.toLowerCase().includes(q);
    const matchesCategory = selectedCategory === 'All' || e.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-semibold text-purple-400">
          <Calendar className="w-3.5 h-3.5" />
          <span>Hackathons, Workshops & Tech Summits</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Campus Tech Events & Competitions
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
          Participate in national coding blitzes, high-performance computing workshops, and guest lectures from industry veterans.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by event title, guest speaker, or venue..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-sky-500"
          />
        </div>

        {/* Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none pt-2 border-t border-slate-800/80">
          {EVENT_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-purple-500 text-white shadow-md shadow-purple-500/20'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Events Grid */}
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((evt) => (
            <EventCard
              key={evt.id}
              event={evt}
              onRegisterClick={(event) => setActiveRegisterEvent(event)}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No events found"
          description="Try selecting another event category or modifying your search terms."
          onReset={() => {
            setSearchQuery('');
            setSelectedCategory('All');
          }}
        />
      )}

      {/* Event Register Modal */}
      <EventRegisterModal
        isOpen={!!activeRegisterEvent}
        onClose={() => setActiveRegisterEvent(null)}
        event={activeRegisterEvent}
        onRegistered={handleRegistered}
      />

    </div>
  );
};
