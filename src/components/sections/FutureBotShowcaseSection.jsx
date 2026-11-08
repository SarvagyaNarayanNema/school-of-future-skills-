import React, { useState } from 'react';
import { FutureBotScene } from '../futurebot';
import { Button } from '../common/Button';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  Bot,
  MessageSquare,
  Mic,
  Brain,
  ShieldCheck,
  ArrowRight,
  Flame,
  CheckCircle2,
  Terminal,
  Zap
} from 'lucide-react';

/**
 * FutureBotShowcaseSection
 * 
 * Interactive 3D robotic mascot spotlight on the public Homepage.
 * Demonstrates FutureBot's real-time emotional states, RAG capabilities,
 * and allows instant one-click launch of the conversation companion.
 */
export const FutureBotShowcaseSection = () => {
  const { setFutureBotOpen } = useApp();
  const [previewState, setPreviewState] = useState('idle');

  const capabilities = [
    { title: "Grounded RAG Intelligence", desc: "Trained on official SGSU charters, verified course syllabi, and faculty dossiers.", icon: ShieldCheck },
    { title: "Two-Way Voice Chat", desc: "Real-time speech-to-text recognition and natural speech synthesis playback.", icon: Mic },
    { title: "Curriculum Navigation", desc: "Instant answers for BCA (AI-ML), MCA, Cyber Defense, fee structures, and scholarship criteria.", icon: Terminal },
    { title: "Zero Hallucination", desc: "Every response includes verified institutional citations and authoritative links.", icon: Zap },
  ];

  const quickPrompts = [
    "What are the BCA (AI-ML) eligibility requirements?",
    "Who is the Head of School of Future Skills?",
    "Tell me about the Binary Battle Club hackathons.",
    "Where is the SGSU campus and robotics lab located?"
  ];

  const handleLaunchBot = (prompt) => {
    if (setFutureBotOpen) {
      setFutureBotOpen(true);
    }
    // Also dispatch a custom event if prompt is provided
    if (prompt) {
      window.dispatchEvent(new CustomEvent('futurebot-query', { detail: { query: prompt } }));
    }
  };

  return (
    <section className="relative py-20 bg-slate-50 dark:bg-[#070B14] border-y border-slate-200 dark:border-slate-800/80 overflow-hidden">
      {/* Cinematic Ambient Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[650px] h-[350px] bg-gradient-to-r from-cyan-500/15 via-blue-600/15 to-purple-600/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-80 h-80 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 dark:bg-slate-900/90 border border-cyan-500/30 text-xs text-cyan-700 dark:text-cyan-300 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
            <span className="font-semibold tracking-wide uppercase font-mono">Autonomous AI Mascot</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Meet{' '}
            <span className="bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-500 bg-clip-text text-transparent">
              FutureBot
            </span>
            , Your 3D AI Campus Companion
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Engineered specifically for Scope Global Skills University. Ask questions about syllabi, faculty, laboratory equipment, or campus events in natural spoken or written language.
          </p>
        </div>

        {/* 2-Column Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Interactive 3D Mascot Viewport */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-md aspect-square rounded-3xl bg-gradient-to-b from-white/90 via-slate-100/60 to-white/90 dark:from-[#0E1526]/90 dark:via-[#090D1A]/95 dark:to-[#0B0F1E] border border-slate-200 dark:border-cyan-500/30 shadow-2xl p-4 flex flex-col items-center justify-between group overflow-hidden">
              
              {/* Status Header Overlay */}
              <div className="w-full flex items-center justify-between z-10 px-2 pt-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                  <span className="text-[11px] font-mono font-bold text-slate-700 dark:text-cyan-300">
                    STATUS: {previewState.toUpperCase()}
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 font-bold">
                  WebGL 3D
                </span>
              </div>

              {/* 3D Mascot Interactive Canvas */}
              <div className="relative w-full flex-1 flex items-center justify-center">
                <FutureBotScene
                  state={previewState}
                  size="hero"
                  className="w-full h-full max-h-[340px]"
                  cameraDistance={4.4}
                  cameraY={0.3}
                  interactive={true}
                />
              </div>

              {/* Interactive State Triggers Toolbar */}
              <div className="w-full z-10 pt-2 border-t border-slate-200/80 dark:border-slate-800/80">
                <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 block text-center mb-2">
                  Interact with FutureBot's emotions:
                </span>
                <div className="grid grid-cols-4 gap-1.5">
                  {[
                    { id: 'idle', label: 'Idle' },
                    { id: 'greeting', label: 'Wave' },
                    { id: 'thinking', label: 'Think' },
                    { id: 'listening', label: 'Listen' },
                  ].map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setPreviewState(s.id)}
                      className={`px-2 py-1 rounded-xl text-[10px] font-mono font-semibold transition-all ${
                        previewState === s.id
                          ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                          : 'bg-slate-200/80 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-cyan-400 border border-slate-300 dark:border-slate-800'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Capabilities & Action Controls */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 4 Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {capabilities.map((c, idx) => {
                const Icon = c.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white dark:bg-[#0B0F19] border border-slate-200 dark:border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300 space-y-2 shadow-sm"
                  >
                    <div className="w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">{c.title}</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{c.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Quick Prompts Box */}
            <div className="p-5 rounded-2xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-3">
              <span className="text-xs font-mono font-bold text-slate-700 dark:text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-cyan-500" /> Click any prompt to ask FutureBot:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {quickPrompts.map((p, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleLaunchBot(p)}
                    className="text-left p-2.5 rounded-xl bg-white dark:bg-[#0B0F19] hover:bg-cyan-500/10 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 text-xs text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-300 transition-all flex items-center justify-between group"
                  >
                    <span className="truncate pr-2">{p}</span>
                    <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-cyan-400 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                ))}
              </div>
            </div>

            {/* Primary Action Button */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <Button
                size="lg"
                variant="primary"
                icon={Bot}
                onClick={() => handleLaunchBot()}
                className="w-full sm:w-auto shadow-lg shadow-cyan-500/20"
              >
                Launch FutureBot Chatbot
              </Button>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                ⚡ Powered by Grounded RAG &amp; Multi-turn Dialogue
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default FutureBotShowcaseSection;

