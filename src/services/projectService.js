import { initialProjects } from '../data/projects';
import { storage } from '../utils/storage';

const STORAGE_KEY = 'projects_list';

export const projectService = {
  getAll: () => {
    const stored = storage.get(STORAGE_KEY);
    if (!stored) {
      storage.set(STORAGE_KEY, initialProjects);
      return initialProjects;
    }
    return stored;
  },

  getById: (id) => {
    const list = projectService.getAll();
    return list.find(p => p.id === id) || null;
  },

  upvote: (id) => {
    const list = projectService.getAll();
    const upvotedIds = storage.get('user_upvoted_projects', []);
    const hasUpvoted = upvotedIds.includes(id);

    const updated = list.map(p => {
      if (p.id === id) {
        return {
          ...p,
          upvotes: hasUpvoted ? p.upvotes - 1 : p.upvotes + 1,
          hasUpvoted: !hasUpvoted
        };
      }
      return p;
    });

    if (hasUpvoted) {
      storage.set('user_upvoted_projects', upvotedIds.filter(x => x !== id));
    } else {
      upvotedIds.push(id);
      storage.set('user_upvoted_projects', upvotedIds);
    }

    storage.set(STORAGE_KEY, updated);
    return updated.find(p => p.id === id);
  }
};
