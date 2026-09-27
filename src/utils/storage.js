// Safe LocalStorage utility wrapper with error handling and default fallbacks

const STORAGE_PREFIX = 'future_skills_';

export const storage = {
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(STORAGE_PREFIX + key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (err) {
      console.warn(`Error reading localStorage key "${key}":`, err);
      return defaultValue;
    }
  },

  set: (key, value) => {
    try {
      localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
      return true;
    } catch (err) {
      console.warn(`Error writing localStorage key "${key}":`, err);
      return false;
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(STORAGE_PREFIX + key);
      return true;
    } catch (err) {
      console.warn(`Error removing localStorage key "${key}":`, err);
      return false;
    }
  },

  clearAll: () => {
    try {
      Object.keys(localStorage).forEach((k) => {
        if (k.startsWith(STORAGE_PREFIX)) {
          localStorage.removeItem(k);
        }
      });
      return true;
    } catch (err) {
      console.warn('Error clearing platform localStorage:', err);
      return false;
    }
  }
};
