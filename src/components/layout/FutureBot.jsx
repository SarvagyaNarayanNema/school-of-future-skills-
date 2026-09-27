import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Bot,
  X,
  Send,
  Sparkles,
  BookOpen,
  Bell,
  Calendar,
  Code2,
  Terminal,
  FileText,
  ChevronDown
} from 'lucide-react';

export const FutureBot = () => {
  const { futureBotOpen, setFutureBotOpen, earnPoints } = useApp();
  const [messages, setMessages] = useState([
    {
      id: "bot-init",
      sender: "bot",
      text: "Hey! 👋 I'm FutureBot, your AI campus guide. What would you like to explore today?",
      options: [
        { label: "Find a Course", action: "courses" },
        { label: "Check Notices", action: "notices" },
        { label: "Upcoming Events", action: "events" },
        { label: "Find Assignments", action: "assignments" },
        { label: "Explore Projects", action: "projects" },
        { label: "Open Tech Zone", action: "techzone" }
      ]
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleAction = (actionKey) => {
    let reply = "";
    let targetUrl = "";

    switch (actionKey) {
      case "courses":
        reply = "We offer 8 emerging tech specializations including Cyber Security, Generative AI, Cloud Infrastructure, and Data Science. Redirecting to Courses...";
        targetUrl = "/courses";
        break;
      case "notices":
        reply = "Here are the latest departmental circulars, hackathon registrations, and internship notifications. Opening Notice Board...";
        targetUrl = "/notices";
        break;
      case "events":
        reply = "Check out InnovateX 48h Hackathon and the Quantum Cryptography workshop! Opening Events...";
        targetUrl = "/events";
        break;
      case "assignments":
        reply = "You have Lab Assessment 3 (Snort Rules) due soon. Opening Assignment Manager...";
        targetUrl = "/assignments";
        break;
      case "projects":
        reply = "Take a look at NeuralShield and student-built LoRa mesh networks! Opening Projects...";
        targetUrl = "/projects";
        break;
      case "techzone":
        reply = "Ready for the Daily Tech Question, Cyber Quiz, or algorithmic coding challenge? Opening Tech Zone...";
        targetUrl = "/tech-zone";
        break;
      default:
        reply = "Let me show you that right away!";
    }

    setMessages(prev => [
      ...prev,
      { id: "usr-" + Date.now(), sender: "user", text: `I'd like to check ${actionKey}.` },
      { id: "bot-" + (Date.now() + 1), sender: "bot", text: reply }
    ]);

    if (targetUrl) {
      setTimeout(() => {
        navigate(targetUrl);
        setFutureBotOpen(false);
      }, 1200);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    const query = inputVal.trim();
    if (!query) return;

    setMessages(prev => [...prev, { id: "usr-" + Date.now(), sender: "user", text: query }]);
    setInputVal('');
    setIsTyping(true);

    // Simulated Intelligent Assistant Knowledge Base
    setTimeout(() => {
      let botResponse = "";
      const lower = query.toLowerCase();

      if (lower.includes("ai") || lower.includes("machine learning") || lower.includes("deep learning")) {
        botResponse = "Our AI/ML track covers Transformers, PyTorch, LoRA fine-tuning, and Computer Vision. You can explore course AI-201 or try our AI Quiz in the Tech Zone!";
      } else if (lower.includes("cyber") || lower.includes("security") || lower.includes("hack")) {
        botResponse = "The Cyber Security curriculum features Zero Trust Defense, Ethical Hacking, and eBPF network telemetry. Check out our course CS-101 or the Cybersecurity Quiz!";
      } else if (lower.includes("exam") || lower.includes("test") || lower.includes("date")) {
        botResponse = "Mid-Semester Practical Examinations begin on October 18, 2026. Review notice 'not-03' in the Notice Board for slot schedules.";
      } else if (lower.includes("points") || lower.includes("xp") || lower.includes("leaderboard")) {
        botResponse = "You earn XP points by solving coding challenges, taking tech quizzes, submitting assignments, and registering for events. Check your rank on the Tech Zone Leaderboard!";
      } else if (lower.includes("timetable") || lower.includes("class") || lower.includes("schedule")) {
        botResponse = "Your weekly class and lab timetable is available at /timetable with daily slot indicators!";
      } else if (lower.includes("faculty") || lower.includes("professor") || lower.includes("teacher")) {
        botResponse = "You can view the full faculty directory on the About page, covering leads in AI, Cyber Security, Cloud, and Software Engineering.";
      } else {
        botResponse = `Thanks for asking about "${query}". I'm designed to help you navigate courses, notices, lab exercises, events, and student projects. Try one of the quick shortcuts below!`;
      }

      setMessages(prev => [
        ...prev,
        {
          id: "bot-" + Date.now(),
          sender: "bot",
          text: botResponse,
          options: [
            { label: "Explore Courses", action: "courses" },
            { label: "Tech Zone", action: "techzone" },
            { label: "Notices", action: "notices" }
          ]
        }
      ]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!futureBotOpen && (
        <button
          onClick={() => setFutureBotOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-sky-500 via-brand-600 to-indigo-600 text-white font-semibold shadow-xl shadow-sky-500/25 hover:shadow-sky-500/40 hover:scale-105 transition-all duration-200 border border-sky-400/40 group"
          aria-label="Open FutureBot AI Assistant"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-white animate-bounce" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <span className="text-sm font-bold tracking-tight">FutureBot</span>
          <span className="text-xs px-1.5 py-0.5 rounded-full bg-white/20 text-white font-mono">
            AI
          </span>
        </button>
      )}

      {/* Floating Chat Window */}
      {futureBotOpen && (
        <div className="fixed bottom-6 right-4 sm:right-6 z-50 w-[92vw] sm:w-[400px] h-[550px] max-h-[85vh] bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-white">FutureBot</h4>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                    Online
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">Campus Intelligence Assistant</p>
              </div>
            </div>
            <button
              onClick={() => setFutureBotOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-900/60">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-sky-600 text-white rounded-tr-none shadow-md'
                      : 'bg-slate-800 border border-slate-700/80 text-slate-200 rounded-tl-none shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>

                {/* Quick Action Chips */}
                {msg.options && (
                  <div className="flex flex-wrap gap-1.5 mt-2.5 max-w-[90%]">
                    {msg.options.map((opt) => (
                      <button
                        key={opt.action}
                        onClick={() => handleAction(opt.action)}
                        className="px-2.5 py-1 text-[11px] rounded-lg bg-slate-800/90 hover:bg-sky-500/20 text-sky-300 border border-sky-500/30 hover:border-sky-400/60 transition-all font-medium text-left"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-slate-800 text-slate-400 text-xs w-20">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-bounce [animation-delay:0.4s]" />
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleSendMessage} className="p-3 bg-slate-950/80 border-t border-slate-800 flex items-center gap-2">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask about courses, exams, labs, tech..."
              className="flex-1 bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-sky-500"
            />
            <button
              type="submit"
              disabled={!inputVal.trim()}
              className="p-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white disabled:opacity-40 disabled:pointer-events-none transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
