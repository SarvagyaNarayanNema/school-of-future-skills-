import { initialCourses } from '../data/courses';
import { storage } from '../utils/storage';

const STORAGE_KEY = 'courses_list';

export const courseService = {
  getAll: () => {
    const stored = storage.get(STORAGE_KEY);
    if (!stored) {
      storage.set(STORAGE_KEY, initialCourses);
      return initialCourses;
    }
    return stored;
  },

  getById: (id) => {
    if (!id) return null;
    const list = courseService.getAll();
    return list.find(c => String(c.id) === String(id)) || null;
  },

  enroll: (courseId) => {
    if (!courseId) return null;
    const list = courseService.getAll();
    const updated = list.map(c => {
      if (String(c.id) === String(courseId)) {
        return { ...c, enrolled: true, enrolledCount: (c.enrolledCount || 0) + 1, progress: c.progress || 5 };
      }
      return c;
    });
    storage.set(STORAGE_KEY, updated);
    return updated.find(c => String(c.id) === String(courseId)) || null;
  },

  updateProgress: (courseId, newProgress) => {
    if (!courseId) return null;
    const list = courseService.getAll();
    const updated = list.map(c => {
      if (String(c.id) === String(courseId)) {
        return { ...c, progress: Math.min(100, Math.max(0, newProgress)) };
      }
      return c;
    });
    storage.set(STORAGE_KEY, updated);
    return updated.find(c => String(c.id) === String(courseId)) || null;
  }
};
