import React from 'react';

export const ProgressBar = ({ progress = 0, color = "from-sky-500 to-indigo-500", showLabel = false, size = "md" }) => {
  const clamped = Math.min(100, Math.max(0, progress));
  
  const heightClass = size === "sm" ? "h-1.5" : size === "lg" ? "h-3" : "h-2";

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center text-xs text-slate-400 mb-1.5">
          <span>Progress</span>
          <span className="font-semibold text-slate-200">{clamped}%</span>
        </div>
      )}
      <div className={`w-full bg-slate-800 rounded-full overflow-hidden ${heightClass} p-[1px]`}>
        <div
          className={`h-full rounded-full bg-gradient-to-r ${color} transition-all duration-500 ease-out`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
};
