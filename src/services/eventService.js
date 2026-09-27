import { initialEvents } from '../data/events';
import { storage } from '../utils/storage';

const STORAGE_KEY = 'events_list';
const REGISTRATIONS_KEY = 'user_event_registrations';

export const eventService = {
  getAll: () => {
    const stored = storage.get(STORAGE_KEY);
    const regs = storage.get(REGISTRATIONS_KEY, []);
    const base = stored || initialEvents;
    return base.map(ev => ({
      ...ev,
      registered: regs.includes(ev.id) || ev.registered
    }));
  },

  getById: (id) => {
    const list = eventService.getAll();
    return list.find(e => e.id === id) || null;
  },

  register: (eventId, registrantInfo = {}) => {
    const regs = storage.get(REGISTRATIONS_KEY, []);
    if (!regs.includes(eventId)) {
      regs.push(eventId);
      storage.set(REGISTRATIONS_KEY, regs);
    }

    const list = eventService.getAll();
    const updated = list.map(ev => {
      if (ev.id === eventId) {
        return {
          ...ev,
          registered: true,
          seatsRemaining: Math.max(0, (ev.seatsRemaining || 1) - 1)
        };
      }
      return ev;
    });
    storage.set(STORAGE_KEY, updated);

    // Save registration details
    const regRecords = storage.get('event_registration_records', []);
    regRecords.push({
      eventId,
      registeredAt: new Date().toISOString(),
      ...registrantInfo
    });
    storage.set('event_registration_records', regRecords);

    return true;
  }
};
