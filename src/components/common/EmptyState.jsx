import React from 'react';
import { SearchX, RotateCcw } from 'lucide-react';

export const EmptyState = ({
  title = "No results found",
  description = "Try adjusting your search criteria or filters to find what you're looking for.",
  onReset,
  resetLabel = "Clear filters"
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/30">
      <div className="w-14 h-14 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-slate-400 mb-4">
        <SearchX className="w-7 h-7" />
      </div>
      <h3 className="text-lg font-semibold text-slate-200 mb-1">{title}</h3>
      <p className="text-sm text-slate-400 max-w-sm mb-6">{description}</p>
      {onReset && (
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium transition-colors border border-slate-700"
        >
          <RotateCcw className="w-4 h-4" />
          {resetLabel}
        </button>
      )}
    </div>
  );
};
