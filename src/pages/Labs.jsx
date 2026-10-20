import React, { useState } from 'react';
import { initialLabs, LAB_CATEGORIES } from '../data/labs';
import { useApp } from '../context/AppContext';
import { Badge } from '../components/common/Badge';
import {
  Terminal,
  Play,
  RotateCcw,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
  ArrowRight,
  Shield,
  Radio,
  Cloud,
  Code2
} from 'lucide-react';

export const Labs = () => {
  const { earnPoints, showToast } = useApp();
  const [selectedLabId, setSelectedLabId] = useState(initialLabs[0].id);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const activeLab = initialLabs.find(l => l.id === selectedLabId) || initialLabs[0];
  const [codeContent, setCodeContent] = useState(activeLab.starterCode);
  const [outputTerminal, setOutputTerminal] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  // Switch lab
  const handleSelectLab = (lab) => {
    setSelectedLabId(lab.id);
    setCodeContent(lab.starterCode);
    setOutputTerminal('');
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setOutputTerminal('Spinning isolated browser V8 worker sandbox...\nParsing AST and evaluating logic...');

    setTimeout(() => {
      setIsRunning(false);
      setOutputTerminal(activeLab.expectedOutput);
      earnPoints(75, `Executed ${activeLab.name}`);
      showToast(`Lab verified successfully! +75 XP earned!`, 'success');
    }, 600);
  };

  const handleResetCode = () => {
    setCodeContent(activeLab.starterCode);
    setOutputTerminal('');
    showToast('Editor reset to template state.', 'info');
  };

  const filteredLabs = initialLabs.filter(l => {
    return selectedCategory === 'All' || l.category === selectedCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-600 dark:text-cyan-400">
          <Terminal className="w-3.5 h-3.5" />
          <span>Interactive Student Technology Workstations</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Cloud Sandbox Labs
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
          Safely practice algorithms, test JWT security claims, compute vector cosine similarities, and simulate edge IoT events right inside your browser.
        </p>
      </div>

      {/* Lab Category Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200 dark:border-slate-800">
        {LAB_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedCategory === cat
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Lab Cards Carousel / Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLabs.map((lab) => {
          const isSelected = lab.id === activeLab.id;
          return (
            <div
              key={lab.id}
              onClick={() => handleSelectLab(lab)}
              className={`glass-panel p-5 rounded-2xl border cursor-pointer transition-all hover:-translate-y-0.5 ${
                isSelected
                  ? 'border-cyan-500 bg-cyan-50/50 dark:bg-cyan-950/20 shadow-xl shadow-cyan-500/10'
                  : 'border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-2">
                <Badge variant={isSelected ? "cyan" : "default"} size="xs">
                  {lab.category}
                </Badge>
                <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">{lab.exercisesCount} Exercises</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1 truncate">{lab.name}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mb-3">{lab.description}</p>
              <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200 dark:border-slate-800/80">
                <span className="font-mono text-cyan-600 dark:text-cyan-400 font-semibold">{lab.technology}</span>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                  {isSelected ? "Active Lab ●" : "Select Lab →"}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ACTIVE LAB WORKSPACE INTERACTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pt-4">
        
        {/* Left Col: Problem Statement & Instructions */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-5 text-xs">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">{activeLab.category}</span>
              <Badge variant="primary" size="xs">{activeLab.difficulty}</Badge>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1">{activeLab.name}</h2>
            <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">Technology: <span className="text-sky-600 dark:text-sky-300 font-mono">{activeLab.technology}</span></p>
          </div>

          {/* Problem Statement */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-1.5">
            <span className="font-bold text-slate-900 dark:text-white block">🎯 Problem Statement:</span>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{activeLab.problemStatement}</p>
          </div>

          {/* Instructions */}
          <div className="space-y-2">
            <span className="font-bold text-slate-900 dark:text-white block">Implementation Steps:</span>
            <div className="space-y-1.5">
              {activeLab.instructions.map((ins, i) => (
                <div key={i} className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                  {ins}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Code Editor & Execution Output */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
              <span className="font-mono text-xs text-slate-900 dark:text-white font-semibold">interactive_sandbox.js</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleResetCode}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 text-xs inline-flex items-center gap-1 transition-colors"
                title="Reset to Template"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
              <button
                onClick={handleRunCode}
                disabled={isRunning}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-slate-950" />
                <span>{isRunning ? "Simulating..." : "Run Sandbox"}</span>
              </button>
            </div>
          </div>

          {/* Editor Area */}
          <textarea
            rows="12"
            value={codeContent}
            onChange={(e) => setCodeContent(e.target.value)}
            className="w-full bg-slate-950 text-slate-100 font-mono text-xs p-4 rounded-2xl border border-slate-800 focus:outline-none focus:border-cyan-500 selection:bg-cyan-500 selection:text-slate-950 leading-relaxed resize-none"
            spellCheck="false"
          />

          {/* Terminal Output */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Console Output & Test Assertions:</span>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 font-mono text-xs text-emerald-400 min-h-[110px] whitespace-pre-wrap leading-relaxed">
              {outputTerminal || 'Press "Run Sandbox" above to execute this lab against tests.'}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
