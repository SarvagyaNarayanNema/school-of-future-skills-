import { initialNotices } from '../data/notices';
import { storage } from '../utils/storage';

const STORAGE_KEY = 'notices_list';

export const noticeService = {
  getAll: () => {
    const stored = storage.get(STORAGE_KEY);
    if (!stored) {
      storage.set(STORAGE_KEY, initialNotices);
      return initialNotices;
    }
    return stored;
  },

  getById: (id) => {
    const list = noticeService.getAll();
    return list.find(n => n.id === id) || null;
  },

  markAsRead: (id) => {
    const list = noticeService.getAll();
    const updated = list.map(n => (n.id === id ? { ...n, isUnread: false } : n));
    storage.set(STORAGE_KEY, updated);
    return updated;
  }
};
