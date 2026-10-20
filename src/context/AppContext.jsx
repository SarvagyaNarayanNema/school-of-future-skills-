import React, { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import { initialCourses } from '../data/courses';
import { initialNotices } from '../data/notices';
import { initialStudentProjects } from '../data/clubsAndProjects';
import confetti from 'canvas-confetti';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Theme state: dark by default
  const [theme, setTheme] = useState(() => storage.get('theme', 'dark'));

  // Enrolled courses & bookmarked courses
  const [enrolledCourses, setEnrolledCourses] = useState(() => storage.get('enrolled_courses', ['course-aiml-1']));
  const [bookmarkedCourses, setBookmarkedCourses] = useState(() => storage.get('bookmarked_courses', ['course-cyber-1']));

  // Student Clubs: Joined clubs
  const [joinedClubs, setJoinedClubs] = useState(() => storage.get('joined_clubs', ['club-ai']));

  // Student Projects: Liked projects & user-submitted projects
  const [likedProjects, setLikedProjects] = useState(() => storage.get('liked_projects', ['proj-1']));
  const [projectLikes, setProjectLikes] = useState(() => {
    const defaultLikes = {};
    initialStudentProjects.forEach(p => { defaultLikes[p.id] = p.likes; });
    return storage.get('project_likes_map', defaultLikes);
  });
  const [customProjects, setCustomProjects] = useState(() => storage.get('custom_projects', []));

  // Alumni Mentorship Requests
  const [mentorshipRequests, setMentorshipRequests] = useState(() => storage.get('mentorship_requests', []));

  // Saved and read notices
  const [readNotices, setReadNotices] = useState(() => storage.get('read_notices', ['not-01']));
  const [savedNotices, setSavedNotices] = useState(() => storage.get('saved_notices', []));

  // UI Modals & Widgets
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [futureBotOpen, setFutureBotOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Apply theme to document element
  useEffect(() => {
    storage.set('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [theme]);

  // Persist state updates
  useEffect(() => { storage.set('enrolled_courses', enrolledCourses); }, [enrolledCourses]);
  useEffect(() => { storage.set('bookmarked_courses', bookmarkedCourses); }, [bookmarkedCourses]);
  useEffect(() => { storage.set('joined_clubs', joinedClubs); }, [joinedClubs]);
  useEffect(() => { storage.set('liked_projects', likedProjects); }, [likedProjects]);
  useEffect(() => { storage.set('project_likes_map', projectLikes); }, [projectLikes]);
  useEffect(() => { storage.set('custom_projects', customProjects); }, [customProjects]);
  useEffect(() => { storage.set('mentorship_requests', mentorshipRequests); }, [mentorshipRequests]);
  useEffect(() => { storage.set('read_notices', readNotices); }, [readNotices]);
  useEffect(() => { storage.set('saved_notices', savedNotices); }, [savedNotices]);

  // Ctrl + K keyboard shortcut for Command Palette
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setCommandPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const showToast = (message, type = 'info', duration = 3500) => {
    const id = Date.now() + Math.random().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 }
      });
    } catch (e) {
      // ignore in environments without canvas
    }
  };

  // Course actions
  const enrollCourse = (courseId, courseTitle = "Course") => {
    if (!enrolledCourses.includes(courseId)) {
      setEnrolledCourses(prev => [...prev, courseId]);
      showToast(`Successfully enrolled in "${courseTitle}"! 🎓`, 'success');
      triggerCelebration();
    } else {
      showToast(`Already enrolled in "${courseTitle}". Continuing learning track.`, 'info');
    }
  };

  const toggleBookmarkCourse = (courseId, courseTitle = "Course") => {
    if (bookmarkedCourses.includes(courseId)) {
      setBookmarkedCourses(prev => prev.filter(id => id !== courseId));
      showToast(`Removed "${courseTitle}" from saved courses.`, 'info');
    } else {
      setBookmarkedCourses(prev => [...prev, courseId]);
      showToast(`Saved "${courseTitle}" to your learning bookmarks! 🔖`, 'success');
    }
  };

  // Project Likes
  const toggleProjectLike = (projectId) => {
    const isLiked = likedProjects.includes(projectId);
    if (isLiked) {
      setLikedProjects(prev => prev.filter(id => id !== projectId));
      setProjectLikes(prev => ({
        ...prev,
        [projectId]: Math.max(0, (prev[projectId] || 1) - 1)
      }));
      showToast("Removed project upvote.", "info");
    } else {
      setLikedProjects(prev => [...prev, projectId]);
      setProjectLikes(prev => ({
        ...prev,
        [projectId]: (prev[projectId] || 0) + 1
      }));
      showToast("Upvoted student project! 🚀", "success");
      triggerCelebration();
    }
  };

  // Submit Project
  const submitProject = (projectData) => {
    const newProj = {
      id: "proj-user-" + Date.now(),
      name: projectData.name,
      studentTeam: projectData.team,
      category: projectData.category || "Student Innovation",
      year: "2026 Submission",
      image: projectData.image || "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
      description: projectData.description,
      technologies: projectData.technologies.split(',').map(t => t.trim()).filter(Boolean),
      github: projectData.github || "https://github.com",
      demo: projectData.demo || "",
      likes: 1
    };
    setCustomProjects(prev => [newProj, ...prev]);
    setLikedProjects(prev => [...prev, newProj.id]);
    setProjectLikes(prev => ({ ...prev, [newProj.id]: 1 }));
    showToast(`Project "${projectData.name}" submitted successfully to showcase! 🎉`, 'success');
    triggerCelebration();
  };

  // Join Club
  const joinClub = (clubId, clubName, applicationDetails) => {
    if (!joinedClubs.includes(clubId)) {
      setJoinedClubs(prev => [...prev, clubId]);
      showToast(`Welcome to ${clubName}! You have been added to the member roster. 🤝`, 'success');
      triggerCelebration();
    } else {
      showToast(`You are already an active member of ${clubName}.`, 'info');
    }
  };

  // Request Mentorship
  const requestMentorship = (alumniId, alumniName, requestData) => {
    const newReq = {
      id: "req-" + Date.now(),
      alumniId,
      alumniName,
      studentName: requestData.name,
      studentEmail: requestData.email,
      studentYear: requestData.year,
      topic: requestData.topic,
      notes: requestData.notes,
      requestedAt: new Date().toLocaleDateString(),
      status: "Pending Response"
    };
    setMentorshipRequests(prev => [newReq, ...prev]);
    showToast(`Mentorship request submitted to ${alumniName}! Check your email for scheduling. 📬`, 'success');
    triggerCelebration();
  };

  // Notice interactions
  const markNoticeRead = (noticeId) => {
    if (!readNotices.includes(noticeId)) {
      setReadNotices(prev => [...prev, noticeId]);
    }
  };

  const toggleSaveNotice = (noticeId, noticeTitle = "Notice") => {
    if (savedNotices.includes(noticeId)) {
      setSavedNotices(prev => prev.filter(id => id !== noticeId));
      showToast(`Removed from saved notices.`, 'info');
    } else {
      setSavedNotices(prev => [...prev, noticeId]);
      showToast(`Notice bookmarked for review! 📌`, 'success');
    }
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        enrolledCourses,
        bookmarkedCourses,
        enrollCourse,
        toggleBookmarkCourse,
        joinedClubs,
        joinClub,
        likedProjects,
        projectLikes,
        toggleProjectLike,
        customProjects,
        submitProject,
        mentorshipRequests,
        requestMentorship,
        readNotices,
        markNoticeRead,
        savedNotices,
        toggleSaveNotice,
        commandPaletteOpen,
        setCommandPaletteOpen,
        futureBotOpen,
        setFutureBotOpen,
        toasts,
        showToast,
        removeToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
