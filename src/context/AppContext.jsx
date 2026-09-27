import React, { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import { initialNotifications } from '../data/notifications';
import { initialAssignments } from '../data/assignments';
import { initialLeaderboard } from '../data/quizzes';
import confetti from 'canvas-confetti';

const AppContext = createContext();

const DEFAULT_USER = {
  name: "Alex Morgan",
  rollNo: "FS24-088",
  department: "Future Skills & Emerging Technologies",
  year: "3rd Year (Class of 2026)",
  email: "alex.morgan@futureskills.student.edu",
  github: "github.com/alex-morgan",
  linkedin: "linkedin.com/in/alexmorgan-fs",
  bio: "Undergraduate researcher exploring low-latency systems, kernel security, and transformer foundation models.",
  avatar: "AM",
  skills: ["React 19", "Python", "PyTorch", "Docker", "eBPF", "TypeScript", "C++"],
  points: 1940,
  badges: [
    { id: "b1", name: "Code Explorer", icon: "🔥", desc: "Completed first algorithmic coding track", unlockedAt: "Sep 2026" },
    { id: "b2", name: "Cyber Guardian", icon: "🛡️", desc: "Scored 100% on Cyber Defense quiz", unlockedAt: "Sep 2026" },
    { id: "b3", name: "AI Pioneer", icon: "🤖", desc: "Trained and evaluated toy transformer", unlockedAt: "Aug 2026" },
    { id: "b4", name: "Web Creator", icon: "🌐", desc: "Built full-stack component library", unlockedAt: "Sep 2026" }
  ]
};

export const AppProvider = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState(() => storage.get('theme', 'dark'));

  // User & gamification state
  const [user, setUser] = useState(() => storage.get('user_profile', DEFAULT_USER));

  // Notifications state
  const [notifications, setNotifications] = useState(() => storage.get('notifications', initialNotifications));

  // Assignments state
  const [assignments, setAssignments] = useState(() => storage.get('assignments', initialAssignments));

  // Leaderboard state
  const [leaderboard, setLeaderboard] = useState(() => storage.get('leaderboard', initialLeaderboard));

  // Global UI modal states
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [futureBotOpen, setFutureBotOpen] = useState(false);

  // Toast system
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

  // Persist user changes
  useEffect(() => {
    storage.set('user_profile', user);
  }, [user]);

  // Persist notifications
  useEffect(() => {
    storage.set('notifications', notifications);
  }, [notifications]);

  // Persist assignments
  useEffect(() => {
    storage.set('assignments', assignments);
  }, [assignments]);

  // Persist leaderboard
  useEffect(() => {
    storage.set('leaderboard', leaderboard);
  }, [leaderboard]);

  // Keyboard shortcut Ctrl+K / Cmd+K for command palette
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
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Gamification: Earn points
  const earnPoints = (amount, reason = "Activity Completed") => {
    const newTotal = user.points + amount;
    setUser(prev => ({ ...prev, points: newTotal }));

    // Update leaderboard rank dynamically
    setLeaderboard(prev => {
      const updated = prev.map(item => {
        if (item.isUser) {
          return {
            ...item,
            points: newTotal,
            challengesCompleted: item.challengesCompleted + 1
          };
        }
        return item;
      });
      return updated.sort((a, b) => b.points - a.points).map((item, index) => ({
        ...item,
        rank: index + 1
      }));
    });

    // Add notification
    const newNotif = {
      id: "notif-" + Date.now(),
      title: `+${amount} XP Earned! 🚀`,
      description: reason,
      timestamp: "Just now",
      category: "badge",
      read: false,
      link: "/tech-zone"
    };
    setNotifications(prev => [newNotif, ...prev]);

    showToast(`+${amount} XP: ${reason}! 🎉`, 'success');

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 }
      });
    } catch (e) {
      // ignore if canvas not supported
    }
  };

  const unlockBadge = (badge) => {
    if (user.badges.some(b => b.name === badge.name)) return;
    const newBadges = [...user.badges, { ...badge, unlockedAt: "Just now" }];
    setUser(prev => ({ ...prev, badges: newBadges }));
    earnPoints(150, `Badge Unlocked: ${badge.name}`);
  };

  const updateProfile = (updatedFields) => {
    setUser(prev => ({ ...prev, ...updatedFields }));
    showToast("Profile information saved successfully!", "success");
  };

  // Notifications helpers
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

  // Submit assignment demo
  const submitAssignment = (asgId, submissionData) => {
    setAssignments(prev => prev.map(asg => {
      if (asg.id === asgId) {
        return {
          ...asg,
          status: "Submitted",
          submission: {
            submittedAt: new Date().toLocaleString(),
            fileName: submissionData.fileName || "assignment_solution.zip",
            fileSize: submissionData.fileSize || "1.4 MB",
            comments: submissionData.comments || "",
            status: "Submitted (Pending Review)"
          }
        };
      }
      return asg;
    }));
    earnPoints(75, "Assignment Submitted on Time");
    showToast("Assignment submitted successfully!", "success");
  };

  // Calculate Level and Rank title
  const calculateLevel = (points) => {
    const levelNumber = Math.floor(points / 300) + 1;
    let title = "Technology Novice";
    if (levelNumber >= 8) title = "Grandmaster Architect";
    else if (levelNumber >= 6) title = "Technology Explorer";
    else if (levelNumber >= 4) title = "Emerging Specialist";
    else if (levelNumber >= 2) title = "Curious Builder";

    const nextLevelPoints = levelNumber * 300;
    const currentLevelBase = (levelNumber - 1) * 300;
    const progressPercent = Math.min(100, Math.round(((points - currentLevelBase) / 300) * 100));

    return { levelNumber, title, progressPercent, nextLevelPoints };
  };

  const levelInfo = calculateLevel(user.points);
  const unreadNotifCount = notifications.filter(n => !n.read).length;

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        user,
        setUser,
        updateProfile,
        levelInfo,
        earnPoints,
        unlockBadge,
        notifications,
        unreadNotifCount,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        clearAllNotifications,
        assignments,
        submitAssignment,
        leaderboard,
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
