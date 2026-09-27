import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Terminal } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full glass-panel p-8 rounded-3xl border border-sky-500/20 text-center space-y-4 shadow-2xl">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-sky-500/10 text-sky-400 border border-sky-500/20 flex items-center justify-center font-mono font-black text-2xl">
          404
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Route Not Found</h1>
        <p className="text-xs text-slate-400 leading-relaxed">
          The requested page endpoint does not exist on the Future Skills platform or has moved to another sector.
        </p>
        <div className="flex items-center justify-center gap-3 pt-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-semibold text-xs shadow-lg shadow-sky-500/20 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
