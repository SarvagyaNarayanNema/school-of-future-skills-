import React from 'react';

/**
 * Standardized High-Impact Stat Card
 */
export const StatCard = ({
  icon: Icon,
  label,
  value,
  subtext,
  trend,
  color = 'cyan',
  className = '',
  onClick
}) => {
  const colorMap = {
    cyan: {
      bg: 'bg-cyan-500/10 dark:bg-cyan-500/10',
      border: 'border-cyan-500/25',
      icon: 'text-cyan-600 dark:text-cyan-400',
      glow: 'hover:border-cyan-500/40 hover:shadow-[0_4px_24px_rgba(6,182,212,0.15)]',
    },
    blue: {
      bg: 'bg-blue-500/10 dark:bg-blue-500/10',
      border: 'border-blue-500/25',
      icon: 'text-blue-600 dark:text-blue-400',
      glow: 'hover:border-blue-500/40 hover:shadow-[0_4px_24px_rgba(59,130,246,0.15)]',
    },
    purple: {
      bg: 'bg-purple-500/10 dark:bg-purple-500/10',
      border: 'border-purple-500/25',
      icon: 'text-purple-600 dark:text-purple-400',
      glow: 'hover:border-purple-500/40 hover:shadow-[0_4px_24px_rgba(139,92,246,0.15)]',
    },
    amber: {
      bg: 'bg-amber-500/10 dark:bg-amber-500/10',
      border: 'border-amber-500/25',
      icon: 'text-amber-600 dark:text-amber-400',
      glow: 'hover:border-amber-500/40 hover:shadow-[0_4px_24px_rgba(245,158,11,0.15)]',
    },
    emerald: {
      bg: 'bg-emerald-500/10 dark:bg-emerald-500/10',
      border: 'border-emerald-500/25',
      icon: 'text-emerald-600 dark:text-emerald-400',
      glow: 'hover:border-emerald-500/40 hover:shadow-[0_4px_24px_rgba(16,185,129,0.15)]',
    },
  };

  const scheme = colorMap[color] || colorMap.cyan;

  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 p-5 transition-all duration-300 ${scheme.glow} ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono">
            {label}
          </p>
          <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {value}
          </div>
        </div>

        {Icon && (
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${scheme.bg} ${scheme.border} border shrink-0`}>
            <Icon className={`w-5 h-5 ${scheme.icon}`} />
          </div>
        )}
      </div>

      {(subtext || trend) && (
        <div className="mt-3.5 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
          {subtext && <span className="text-slate-500 dark:text-slate-400 truncate">{subtext}</span>}
          {trend && (
            <span className="font-mono font-semibold text-emerald-600 dark:text-emerald-400 ml-auto">
              {trend}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default StatCard;
