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
    if (!id) return null;
    const list = projectService.getAll();
    return list.find(p => String(p.id) === String(id)) || null;
  },

  upvote: (id) => {
    if (!id) return null;
    const list = projectService.getAll();
    const upvotedIds = storage.get('user_upvoted_projects', []);
    const strId = String(id);
    const hasUpvoted = upvotedIds.map(String).includes(strId);

    const updated = list.map(p => {
      if (String(p.id) === strId) {
        return {
          ...p,
          upvotes: hasUpvoted ? Math.max(0, (p.upvotes || 1) - 1) : (p.upvotes || 0) + 1,
          hasUpvoted: !hasUpvoted
        };
      }
      return p;
    });

    if (hasUpvoted) {
      storage.set('user_upvoted_projects', upvotedIds.filter(x => String(x) !== strId));
    } else {
      upvotedIds.push(id);
      storage.set('user_upvoted_projects', upvotedIds);
    }

    storage.set(STORAGE_KEY, updated);
    return updated.find(p => String(p.id) === strId);
  }
};
