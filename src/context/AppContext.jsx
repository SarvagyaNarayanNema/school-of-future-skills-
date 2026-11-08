import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { storage } from '../utils/storage';
import { initialCourses } from '../data/courses';
import { initialNotices } from '../data/notices';
import { initialStudentProjects } from '../data/clubsAndProjects';
import { initialAssignments } from '../data/assignments';
import { initialLeaderboard } from '../data/quizzes';
import { initialNotifications } from '../data/notifications';
import confetti from 'canvas-confetti';

const AppContext = createContext();

const DEFAULT_USER = {
  name: "Alex Morgan",
  email: "alex.morgan@sgsu.ac.in",
  rollNo: "FS24-088",
  department: "School of Future Skills & Information Technology",
  degree: "B.C.A. (Artificial Intelligence & Machine Learning)",
  year: "3rd Year (Batch 2024-27)",
  points: 1940,
  avatar: "AM",
  bio: "Junior Systems & AI Researcher specializing in transformer attention optimizations and kernel-space cyber defense.",
  skills: ["Python", "PyTorch", "React 19", "C++", "FastAPI", "Docker", "eBPF", "Tailwind CSS"],
  github: "https://github.com/alex-morgan",
  linkedin: "https://linkedin.com/in/alex-morgan-sgsu",
  badges: ["badge-1", "badge-2", "badge-3", "badge-4"]
};

// Calculate level tier dynamically from current XP
const calculateLevel = (xp = 0) => {
  if (xp < 500) {
    return {
      levelNumber: 1,
      title: "Digital Novice",
      progressPercent: Math.min(100, Math.round((xp / 500) * 100)),
      nextThreshold: 500
    };
  }
  if (xp < 1000) {
    return {
      levelNumber: 2,
      title: "Code Initiate",
      progressPercent: Math.min(100, Math.round(((xp - 500) / 500) * 100)),
      nextThreshold: 1000
    };
  }
  if (xp < 1500) {
    return {
      levelNumber: 3,
      title: "System Tinkerer",
      progressPercent: Math.min(100, Math.round(((xp - 1000) / 500) * 100)),
      nextThreshold: 1500
    };
  }
  if (xp < 2200) {
    return {
      levelNumber: 4,
      title: "Neural Pioneer",
      progressPercent: Math.min(100, Math.round(((xp - 1500) / 700) * 100)),
      nextThreshold: 2200
    };
  }
  if (xp < 3000) {
    return {
      levelNumber: 5,
      title: "Cyber Architect",
      progressPercent: Math.min(100, Math.round(((xp - 2200) / 800) * 100)),
      nextThreshold: 3000
    };
  }
  return {
    levelNumber: 6,
    title: "Grandmaster Hacker",
    progressPercent: 100,
    nextThreshold: 5000
  };
};

export const AppProvider = ({ children }) => {
  // Theme state: dark by default
  const [theme, setTheme] = useState(() => storage.get('theme', 'dark'));

  // User Profile
  const [user, setUser] = useState(() => storage.get('user_profile', DEFAULT_USER));

  // Dynamic Level Info based on XP
  const levelInfo = useMemo(() => calculateLevel(user?.points || 0), [user?.points]);

  // Assignments
  const [assignments, setAssignments] = useState(() => storage.get('assignments_list', initialAssignments));

  // Leaderboard
  const [leaderboard, setLeaderboard] = useState(() => storage.get('leaderboard_list', initialLeaderboard));

  // Notifications
  const [notifications, setNotifications] = useState(() => storage.get('notifications_list', initialNotifications));
  const unreadNotifCount = useMemo(() => notifications.filter(n => !n.read).length, [notifications]);

  // Enrolled courses & bookmarked courses
  const [enrolledCourses, setEnrolledCourses] = useState(() => storage.get('enrolled_courses', ['course-aiml-1', 1, 2]));
  const [bookmarkedCourses, setBookmarkedCourses] = useState(() => storage.get('bookmarked_courses', ['course-cyber-1', 3]));

  // Student Clubs: Joined clubs
  const [joinedClubs, setJoinedClubs] = useState(() => storage.get('joined_clubs', ['binary-battle-club']));

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
  const [notificationDrawerOpen, setNotificationDrawerOpen] = useState(false);
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
  useEffect(() => { storage.set('user_profile', user); }, [user]);
  useEffect(() => { storage.set('assignments_list', assignments); }, [assignments]);
  useEffect(() => { storage.set('leaderboard_list', leaderboard); }, [leaderboard]);
  useEffect(() => { storage.set('notifications_list', notifications); }, [notifications]);
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

  // Gamification: Earn XP points
  const earnPoints = (points = 0, reason = "") => {
    if (points <= 0) return;
    setUser(prev => {
      const nextPoints = (prev.points || 0) + points;
      const updatedUser = { ...prev, points: nextPoints };

      // Synchronize in leaderboard
      setLeaderboard(lPrev => {
        const updatedL = lPrev.map(item => {
          if (item.isUser) {
            return { ...item, points: nextPoints };
          }
          return item;
        });
        // Re-rank leaderboard
        return updatedL
          .sort((a, b) => b.points - a.points)
          .map((item, idx) => ({ ...item, rank: idx + 1 }));
      });

      return updatedUser;
    });

    if (reason) {
      showToast(`+${points} XP: ${reason}`, 'success');
    }
  };

  // Gamification: Unlock Badge
  const unlockBadge = (badgeId, badgeTitle = "New Achievement") => {
    if (!user.badges.includes(badgeId)) {
      setUser(prev => ({
        ...prev,
        badges: [...(prev.badges || []), badgeId]
      }));
      showToast(`🏆 Badge Unlocked: ${badgeTitle}!`, 'success');
      triggerCelebration();
    }
  };

  // Student Profile: Update Profile
  const updateProfile = (newProfileData) => {
    setUser(prev => {
      const updated = { ...prev, ...newProfileData };
      // Sync user name in leaderboard if changed
      if (newProfileData.name && newProfileData.name !== prev.name) {
        setLeaderboard(lPrev =>
          lPrev.map(item => item.isUser ? { ...item, name: `${newProfileData.name} (You)` } : item)
        );
      }
      return updated;
    });
    showToast("Profile information updated successfully! ✨", "success");
  };

  // Assignments: Submit Assignment
  const submitAssignment = (assignmentId, submissionData) => {
    setAssignments(prev => {
      const updated = prev.map(asg => {
        if (String(asg.id) === String(assignmentId)) {
          return {
            ...asg,
            status: 'Submitted',
            submission: {
              submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
              fileName: submissionData.fileName || "solution_submission.zip",
              fileSize: submissionData.fileSize || "2.1 MB",
              status: "Submitted (Under Review)",
              comments: submissionData.comments || ""
            }
          };
        }
        return asg;
      });
      return updated;
    });

    earnPoints(100, "Submitted assignment deliverable");
    showToast("Assignment submitted for faculty review! 🚀", "success");
    triggerCelebration();
  };

  // Notifications
  const markNotificationAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast("All notifications marked as read.", "info");
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    showToast("Notifications cleared.", "info");
  };

  // Course actions
  const enrollCourse = (courseId, courseTitle = "Course") => {
    const strId = String(courseId);
    if (!enrolledCourses.map(String).includes(strId)) {
      setEnrolledCourses(prev => [...prev, courseId]);
      showToast(`Successfully enrolled in "${courseTitle}"! 🎓`, 'success');
      earnPoints(50, `Enrolled in ${courseTitle}`);
      triggerCelebration();
    } else {
      showToast(`Already enrolled in "${courseTitle}". Continuing learning track.`, 'info');
    }
  };

  const toggleBookmarkCourse = (courseId, courseTitle = "Course") => {
    const strId = String(courseId);
    if (bookmarkedCourses.map(String).includes(strId)) {
      setBookmarkedCourses(prev => prev.filter(id => String(id) !== strId));
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
      earnPoints(10, "Upvoted student project");
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
      technologies: Array.isArray(projectData.technologies)
        ? projectData.technologies
        : (typeof projectData.technologies === 'string'
            ? projectData.technologies.split(',').map(t => t.trim()).filter(Boolean)
            : []),
      github: projectData.github || "https://github.com",
      demo: projectData.demo || "",
      likes: 1
    };
    setCustomProjects(prev => [newProj, ...prev]);
    setLikedProjects(prev => [...prev, newProj.id]);
    setProjectLikes(prev => ({ ...prev, [newProj.id]: 1 }));
    earnPoints(150, `Published project: ${projectData.name}`);
    showToast(`Project "${projectData.name}" submitted successfully to showcase! 🎉`, 'success');
    triggerCelebration();
  };

  // Join Club
  const joinClub = (clubId, clubName) => {
    if (!joinedClubs.includes(clubId)) {
      setJoinedClubs(prev => [...prev, clubId]);
      earnPoints(75, `Joined ${clubName}`);
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
    earnPoints(30, `Scheduled mentorship with ${alumniName}`);
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
        user,
        levelInfo,
        assignments,
        submitAssignment,
        leaderboard,
        earnPoints,
        unlockBadge,
        updateProfile,
        notifications,
        unreadNotifCount,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        clearAllNotifications,
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
        notificationDrawerOpen,
        setNotificationDrawerOpen,
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

export default AppContext;
