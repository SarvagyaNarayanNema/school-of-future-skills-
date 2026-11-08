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
    if (!id) return null;
    const list = noticeService.getAll();
    return list.find(n => String(n.id) === String(id)) || null;
  },

  markAsRead: (id) => {
    if (!id) return noticeService.getAll();
    const list = noticeService.getAll();
    const updated = list.map(n => (String(n.id) === String(id) ? { ...n, isUnread: false } : n));
    storage.set(STORAGE_KEY, updated);
    return updated;
  }
};
