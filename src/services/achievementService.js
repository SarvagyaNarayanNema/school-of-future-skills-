import { initialAchievements } from '../data/achievements';
import { storage } from '../utils/storage';

const STORAGE_KEY = 'achievements_list';

export const achievementService = {
  getAll: () => {
    const stored = storage.get(STORAGE_KEY);
    if (!stored) {
      storage.set(STORAGE_KEY, initialAchievements);
      return initialAchievements;
    }
    return stored;
  }
};
