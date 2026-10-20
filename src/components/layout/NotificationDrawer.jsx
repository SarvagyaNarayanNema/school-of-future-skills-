import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { X, CheckCheck, Trash2, Bell, ExternalLink } from 'lucide-react';

export const NotificationDrawer = ({ isOpen, onClose }) => {
  const {
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    clearAllNotifications,
    unreadNotifCount
  } = useApp();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleNotificationClick = (notif) => {
    markNotificationAsRead(notif.id);
    onClose();
    if (notif.link) {
      navigate(notif.link);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-sky-500/10 text-sky-500 dark:text-sky-400 border border-sky-500/20">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">Notifications</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">{unreadNotifCount} unread notices</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Action buttons */}
          <div className="px-5 py-2.5 bg-slate-50 dark:bg-slate-950/50 border-b border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-xs">
            <button
              onClick={markAllNotificationsAsRead}
              disabled={unreadNotifCount === 0}
              className="inline-flex items-center gap-1.5 text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 disabled:opacity-40 disabled:pointer-events-none transition-colors"
            >
              <CheckCheck className="w-4 h-4" />
              Mark all read
            </button>
            <button
              onClick={clearAllNotifications}
              disabled={notifications.length === 0}
              className="inline-flex items-center gap-1.5 text-slate-500 dark:text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 disabled:opacity-40 disabled:pointer-events-none transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear all
            </button>
          </div>

          {/* Notification List */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60 p-2">
            {notifications.length > 0 ? (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => handleNotificationClick(notif)}
                  className={`p-3.5 rounded-xl cursor-pointer transition-colors relative group ${
                    notif.read ? 'hover:bg-slate-100 dark:hover:bg-slate-800/50 opacity-80' : 'bg-sky-500/5 border border-sky-500/20 hover:bg-sky-500/10'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className={`text-sm font-semibold ${notif.read ? 'text-slate-700 dark:text-slate-300' : 'text-sky-600 dark:text-sky-300 font-bold'}`}>
                      {notif.title}
                    </h4>
                    {!notif.read && (
                      <span className="w-2 h-2 rounded-full bg-sky-500 dark:bg-sky-400 shrink-0 mt-1.5 animate-pulse" />
                    )}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                    {notif.description}
                  </p>
                  <div className="flex items-center justify-between mt-2.5 text-[11px] text-slate-500 dark:text-slate-400">
                    <span>{notif.timestamp}</span>
                    <span className="inline-flex items-center gap-1 text-sky-600 dark:text-sky-400 group-hover:underline">
                      View details <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-16 text-center text-slate-500 dark:text-slate-400 text-sm">
                No notifications right now.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
