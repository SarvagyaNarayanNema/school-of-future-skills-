import React from 'react';

/**
 * Universal Accessible Tabs Switcher
 */
export const Tabs = ({
  tabs = [],
  activeTab,
  onChange,
  className = '',
  size = 'md',
  fullWidth = false,
}) => {
  const sizeStyles = {
    sm: 'text-xs py-1.5 px-3',
    md: 'text-xs sm:text-sm py-2 px-4',
    lg: 'text-sm sm:text-base py-2.5 px-5',
  };

  return (
    <div
      role="tablist"
      className={`inline-flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 ${
        fullWidth ? 'w-full grid grid-flow-col auto-cols-fr' : 'overflow-x-auto max-w-full'
      } ${className}`}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={`flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 ${
              sizeStyles[size]
            } ${
              isActive
                ? 'bg-white dark:bg-[#0F172A] text-cyan-700 dark:text-cyan-300 shadow-sm border border-slate-200 dark:border-cyan-500/30'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/40'
            }`}
          >
            {tab.icon && <tab.icon className="w-4 h-4 shrink-0" />}
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                  isActive
                    ? 'bg-cyan-100 dark:bg-cyan-500/20 text-cyan-800 dark:text-cyan-300 font-bold'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;

