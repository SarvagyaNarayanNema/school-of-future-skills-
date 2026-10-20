import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bot,
  X,
  Send,
  Sparkles,
  BookOpen,
  Trophy,
  Bell,
  Users,
  GraduationCap,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Check,
  Copy,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  Sliders,
  HelpCircle,
  Calendar,
  Building2,
  Compass,
  FileText,
  Mic,
  MicOff,
  Volume2,
  VolumeX
} from 'lucide-react';
import { askFutureBot, getBotConfig, saveBotConfig } from '../../services/rag/futureBotService';

/**
 * SGSU FutureBot 🤖 - Official AI University Intelligence Assistant
 * 
 * Features:
 * - Two-Way Interactive Voice Chat (Web Speech STT & TTS)
 * - Animated 3D Robot Avatar with Bobbing/Floating & Active Soundwaves
 * - Context-Aware Smart Auto-Redirect & Section Smooth Scrolling
 * - Real RAG Architecture querying verified SGSU knowledge base & website dataset
 * - Source Citation Chips & Authority Level Indicators
 * - Configurable Multi-Provider AI (Autonomous Local Engine, Gemini, OpenAI)
 */
export const FutureBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "bot-welcome",
      sender: "bot",
      text: `### Hi! I'm SGSU FutureBot 🤖

I am your official digital university intelligence assistant for **Scope Global Skills University (SGSU)** and the **School of Future Skills & IT (FSIT)**.

I can help you with:
• **University & Campus:** Vision, NEP 2020 skills model, labs, hostels, and location.
• **Admissions & Fees:** Application steps, document checklists, and Samavesh scholarships.
• **Academic Programmes:** BCA (AI-ML, Cyber Security, IT), MCA, M.Sc., and 45 official courses.
• **Faculty & Mentors:** Verified profiles, Ph.D. leadership, and technical trainers.
• **Student Support:** Binary Battle Club, Cyber Warriors Club, capstone repositories, and circulars.

*Every answer is grounded in official SGSU institutional documentation with verified source citations.*`,
      citations: [
        {
          title: "SGSU Official Institutional Charter",
          source: "sgsuniversity.ac.in",
          authority: "Official SGSU Portal (Level 1)",
          url: "https://sgsuniversity.ac.in/"
        }
      ],
      actions: [
        { label: "Explore 45 Courses", route: "/courses", type: "internal" },
        { label: "Meet FSIT Faculty", route: "/#faculty", type: "internal" },
        { label: "Tech Clubs & Projects", route: "/clubs-and-projects", type: "internal" }
      ],
      confidence: "HIGH"
    }
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [feedbackState, setFeedbackState] = useState({});
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [config, setConfig] = useState(getBotConfig());

  // Voice Chat States (STT & TTS)
  const [isListening, setIsListening] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isVoiceMuted, setIsVoiceMuted] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [availableVoices, setAvailableVoices] = useState([]);

  // Draggable 3D Robot Avatar States & Physics
  const [robotPos, setRobotPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragInfoRef = useRef({
    startX: 0,
    startY: 0,
    originX: 0,
    originY: 0,
    hasMoved: false,
    pointerId: null
  });

  const chatEndRef = useRef(null);
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);
  const toastTimerRef = useRef(null);
  const navigate = useNavigate();

  // Web Speech API references
  const SpeechRecognition = typeof window !== 'undefined'
    ? (window.SpeechRecognition || window.webkitSpeechRecognition)
    : null;

  // Suggested prompt chips
  const STARTER_PROMPTS = [
    { label: "🎓 About SGSU", query: "What is SGSU and its skills-based education model?" },
    { label: "📚 BCA AI-ML & Cyber", query: "Tell me about BCA AI-ML and BCA Cyber Security courses" },
    { label: "📝 Admission Steps", query: "What is the admission process and eligibility criteria?" },
    { label: "⚖️ Compare Courses", query: "Compare BCA AI-ML and BCA Cyber Security" },
    { label: "💵 Fees & Scholarships", query: "What are the fees and scholarships available at SGSU?" },
    { label: "👨‍🏫 FSIT Faculty", query: "Who are the faculty members in Future Skills & IT?" },
    { label: "⚡ Tech Clubs", query: "What student clubs and societies can I join?" }
  ];

  // Dynamic voice detection and caching
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    const loadVoices = () => {
      const v = window.speechSynthesis.getVoices();
      if (v && v.length > 0) {
        setAvailableVoices(v);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, interimTranscript]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen]);

  // Clean up speech recognition & synthesis when component unmounts
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch (e) {}
      }
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  // Helper to show temporary toast
  const showToast = (msg) => {
    setToastMessage(msg);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Detect Smart Auto-Redirect / Page Navigation Intent (Gemini Style)
  const detectNavigationIntent = (query) => {
    if (!query) return null;
    const q = query.toLowerCase().trim();

    // 1. Courses / BCA / Syllabus -> #courses
    if (
      q.includes('course') || 
      q.includes('bca') || 
      q.includes('syllabus') || 
      q.includes('programme') || 
      q.includes('program') || 
      q.includes('curriculum') || 
      q.includes('mca') || 
      q.includes('m.sc') || 
      q.includes('data science') || 
      q.includes('cyber security') || 
      q.includes('ai-ml') ||
      q.includes('degrees')
    ) {
      return {
        type: 'scroll',
        target: '/#courses',
        scrollId: 'courses',
        label: 'Academic Programmes & Courses',
        announcement: 'Scrolling to the Academic Programmes and Curricula section right now!'
      };
    }

    // 2. Faculty / Teachers / Professors -> #faculty
    if (
      q.includes('faculty') || 
      q.includes('teacher') || 
      q.includes('professor') || 
      q.includes('mentor') || 
      q.includes('pooja bijlani') || 
      q.includes('head of school') || 
      q.includes('dean') ||
      q.includes('dharmendra') ||
      q.includes('harish karma') ||
      q.includes('surendra') ||
      q.includes('hrishabh')
    ) {
      return {
        type: 'scroll',
        target: '/#faculty',
        scrollId: 'faculty',
        label: 'Meet Our Distinguished Faculty',
        announcement: 'Navigating you to Meet Our Faculty & Mentors section!'
      };
    }

    // 3. Clubs / Binary Battle / Cyber Warriors -> #clubs
    if (
      q.includes('club') || 
      q.includes('binary battle') || 
      q.includes('cyber warrior') || 
      q.includes('project') || 
      q.includes('syndicate') || 
      q.includes('capstone') ||
      q.includes('hackathon')
    ) {
      return {
        type: 'scroll',
        target: '/#clubs',
        scrollId: 'clubs',
        label: 'Student Clubs & Projects',
        announcement: 'Scrolling down to the Student Clubs and Projects section!'
      };
    }

    // 4. Builders / Who made this -> #builders
    if (
      q.includes('builder') || 
      q.includes('creator') || 
      q.includes('who made this') || 
      q.includes('who made') || 
      q.includes('who built') || 
      q.includes('who developed') || 
      q.includes('sarvagya') || 
      q.includes('dimpy') || 
      q.includes('hemant') || 
      q.includes('soumya') || 
      q.includes('developer')
    ) {
      return {
        type: 'scroll',
        target: '/#builders',
        scrollId: 'builders',
        label: 'Website Builders & Creators',
        announcement: 'Taking you down to Meet the Website Builders and Creators section!'
      };
    }

    // 5. Admissions & Eligibility
    if (
      q.includes('admission') || 
      q.includes('fee') || 
      q.includes('eligibility') || 
      q.includes('scholarship') || 
      q.includes('samavesh') || 
      q.includes('apply') ||
      q.includes('application')
    ) {
      return {
        type: 'scroll',
        target: '/#courses',
        scrollId: 'courses',
        label: 'Admissions & Course Guidelines',
        announcement: 'Guiding you to Admissions and Eligibility details right now!'
      };
    }

    return null;
  };

  // Perform Page Navigation & Smooth Scrolling
  const executeNavigation = (navIntent) => {
    if (!navIntent) return;

    showToast(`🚀 Navigating to ${navIntent.label}...`);

    if (navIntent.scrollId) {
      if (window.location.pathname !== '/') {
        navigate('/#' + navIntent.scrollId);
        setTimeout(() => {
          const el = document.getElementById(navIntent.scrollId);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 350);
      } else {
        const el = document.getElementById(navIntent.scrollId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    } else if (navIntent.type === 'route') {
      navigate(navIntent.target);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Natural Human Voice Selector (Gemini Style - No robotic tone)
  const getNaturalVoice = (voicesList) => {
    const list = (voicesList && voicesList.length > 0)
      ? voicesList
      : (typeof window !== 'undefined' && 'speechSynthesis' in window ? window.speechSynthesis.getVoices() : []);

    if (!list || list.length === 0) return null;

    // Prioritized voice criteria:
    // Natural / Online / Google UK English Female / Google US English / Samantha / Karen / Microsoft Jenny, Guy, Aria
    const matchers = [
      v => (v.name.includes('Natural') || v.name.includes('Online')) && v.lang.startsWith('en'),
      v => v.name.includes('Google UK English Female'),
      v => v.name.includes('Google US English'),
      v => (v.name.includes('Samantha') || v.name.includes('Karen')) && v.lang.startsWith('en'),
      v => (v.name.includes('Jenny') || v.name.includes('Guy') || v.name.includes('Aria')) && v.lang.startsWith('en'),
      v => v.name.includes('Google') && v.lang.startsWith('en'),
      v => (v.name.includes('Zira') || v.name.includes('David')) && v.lang.startsWith('en'),
      v => v.lang.startsWith('en') && !v.name.includes('eSpeak'),
      v => v.lang.startsWith('en'),
      v => v.default
    ];

    for (const match of matchers) {
      const found = list.find(match);
      if (found) return found;
    }

    return list[0] || null;
  };

  // Text-To-Speech (TTS) - Voice-Optimized Gemini Style (Concise spoken response)
  const speakText = (text, voiceText = null, navigationAnnouncement = null) => {
    if (isVoiceMuted || typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();

    // 1. Determine spoken text: prioritize specialized voiceText summary
    let spokenScript = '';
    if (voiceText && typeof voiceText === 'string' && voiceText.trim().length > 0) {
      spokenScript = voiceText.trim();
    } else {
      // Clean formatting and markdown symbols for natural voice output
      let clean = (text || '')
        .replace(/```[\s\S]*?```/g, '')
        .replace(/\|.*?\|/g, '')
        .replace(/\|/g, ', ')
        .replace(/[#*`_~]/g, '')
        .replace(/^[•\-]\s*/gm, '')
        .replace(/https?:\/\/\S+/g, '')
        .replace(/\s+/g, ' ')
        .trim();

      const sentences = clean.split(/(?<=[.?!])\s+/).filter(Boolean);
      if (sentences.length > 2) {
        spokenScript = `Here are the complete details for you on the screen! ${sentences[0]}`;
      } else {
        spokenScript = sentences.slice(0, 2).join(' ');
      }
    }

    if (!spokenScript) return;

    const fullSpeech = navigationAnnouncement ? `${navigationAnnouncement} ${spokenScript}` : spokenScript;

    const utterance = new SpeechSynthesisUtterance(fullSpeech);
    utterance.rate = 1.02; // Natural cadence
    utterance.pitch = 1.0;  // Warm neutral pitch

    const naturalVoice = getNaturalVoice(availableVoices);
    if (naturalVoice) utterance.voice = naturalVoice;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  // Real-Time Voice STT with Barge-In Capability
  const startVoiceListening = () => {
    stopSpeaking(); // Immediate halt of bot speech

    if (!SpeechRecognition) {
      showToast("Microphone speech recognition is not supported in this browser. Please type your message.");
      return;
    }

    try {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch (e) {}
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      // Real-time audio barge-in triggers: interrupt bot speech as soon as user makes sound
      recognition.onsoundstart = () => {
        stopSpeaking();
        setIsListening(true);
      };

      recognition.onspeechstart = () => {
        stopSpeaking();
        setIsListening(true);
      };

      recognition.onstart = () => {
        stopSpeaking();
        setIsListening(true);
        setInterimTranscript('');
        showToast("🎙️ Listening... Speak naturally!");
      };

      recognition.onresult = (event) => {
        stopSpeaking(); // Barge-in interrupt on interim speech

        let currentInterim = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const item = event.results[i];
          if (item.isFinal) {
            const finalSpeech = item[0].transcript;
            setIsListening(false);
            setInterimTranscript('');
            handleSendMessage(finalSpeech, true);
            return;
          } else {
            currentInterim += item[0].transcript;
          }
        }
        setInterimTranscript(currentInterim);
      };

      recognition.onerror = (event) => {
        console.warn("Speech recognition error:", event.error);
        setIsListening(false);
        setInterimTranscript('');
        if (event.error === 'not-allowed') {
          showToast("Microphone access denied. Please allow microphone permissions in your browser.");
        } else if (event.error === 'no-speech') {
          showToast("No speech detected. Tap the robot to try again.");
        } else if (event.error !== 'aborted') {
          showToast("Voice input error: " + event.error);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
        setInterimTranscript('');
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error("Speech Recognition error:", err);
      setIsListening(false);
      showToast("Could not start microphone: " + err.message);
    }
  };

  // Speech-To-Text (STT) Toggle (Instant interrupt & listen if speaking)
  const toggleVoiceRecognition = () => {
    // REAL-TIME BARGE-IN: If bot is currently speaking, clicking immediately stops speech and starts listening
    if (isSpeaking) {
      stopSpeaking();
      startVoiceListening();
      return;
    }

    // If currently listening, stop
    if (isListening) {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch (e) {}
      }
      setIsListening(false);
      setInterimTranscript('');
      return;
    }

    startVoiceListening();
  };

  // Draggable 3D Robot Avatar Pointer Event Handlers
  const handlePointerDown = (e) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;

    dragInfoRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      originX: robotPos.x,
      originY: robotPos.y,
      hasMoved: false,
      pointerId: e.pointerId
    };

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch (err) {}
  };

  const handlePointerMove = (e) => {
    if (dragInfoRef.current.pointerId !== e.pointerId) return;

    const dx = e.clientX - dragInfoRef.current.startX;
    const dy = e.clientY - dragInfoRef.current.startY;
    const dist = Math.hypot(dx, dy);

    if (dist >= 6) {
      if (!isDragging) setIsDragging(true);
      dragInfoRef.current.hasMoved = true;

      // Bound within reasonable offsets inside chat window
      const nextX = Math.max(-280, Math.min(120, dragInfoRef.current.originX + dx));
      const nextY = Math.max(-100, Math.min(300, dragInfoRef.current.originY + dy));

      setRobotPos({ x: nextX, y: nextY });
    }
  };

  const handlePointerUp = (e) => {
    if (dragInfoRef.current.pointerId !== e.pointerId) return;

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch (err) {}

    dragInfoRef.current.pointerId = null;

    if (dragInfoRef.current.hasMoved) {
      setIsDragging(false);
    } else {
      setIsDragging(false);
      toggleVoiceRecognition();
    }
  };

  const handlePointerCancel = (e) => {
    if (dragInfoRef.current.pointerId === e.pointerId) {
      dragInfoRef.current.pointerId = null;
      setIsDragging(false);
    }
  };

  const handleSendMessage = async (queryText, fromVoice = false) => {
    const query = (queryText || inputVal).trim();
    if (!query || isTyping) return;

    // Detect navigation intent
    const navIntent = detectNavigationIntent(query);

    const userMessageId = "usr-" + Date.now();
    const newHistory = [...messages, { id: userMessageId, sender: "user", text: query }];
    setMessages(newHistory);
    setInputVal('');
    setIsTyping(true);

    // Execute auto-navigation if detected
    if (navIntent) {
      executeNavigation(navIntent);
    }

    try {
      const response = await askFutureBot(query, newHistory);
      setMessages(prev => [
        ...prev,
        {
          id: "bot-" + Date.now(),
          sender: "bot",
          text: response.text,
          voiceText: response.voiceText,
          citations: response.citations,
          actions: response.actions,
          confidence: response.confidence,
          navNotice: navIntent ? `Navigated to ${navIntent.label}` : null
        }
      ]);

      // Speak response if query came from voice or if speech is enabled
      if (fromVoice || !isVoiceMuted) {
        speakText(response.text, response.voiceText, navIntent ? navIntent.announcement : null);
      }
    } catch (err) {
      const errText = "I encountered a temporary connection issue. Please consult official SGSU guidelines directly at https://sgsuniversity.ac.in/ or call admissions at +91-755-6766100.";
      setMessages(prev => [
        ...prev,
        {
          id: "bot-" + Date.now(),
          sender: "bot",
          text: errText,
          confidence: "INSUFFICIENT"
        }
      ]);
      if (fromVoice || !isVoiceMuted) {
        speakText(errText);
      }
    } finally {
      setIsTyping(false);
    }
  };

  const handleActionClick = (action) => {
    if (action.type === 'internal') {
      navigate(action.route);
      setIsOpen(false);
      stopSpeaking();
    } else if (action.type === 'external') {
      window.open(action.url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleFeedback = (id, isPositive) => {
    setFeedbackState(prev => ({ ...prev, [id]: isPositive ? 'up' : 'down' }));
  };

  const handleClearChat = () => {
    stopSpeaking();
    setMessages([messages[0]]);
  };

  const handleCloseModal = () => {
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch (e) {}
    }
    stopSpeaking();
    setIsListening(false);
    setIsOpen(false);
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    saveBotConfig(config);
    setIsSettingsOpen(false);
  };

  // Helper to render markdown text with tables, headers, and bullet points
  const renderFormattedContent = (content) => {
    if (!content) return null;

    // Check if content has markdown table
    if (content.includes('|') && content.includes('\n|')) {
      const lines = content.split('\n');
      const tableLines = [];
      const nonTableLines = [];
      let inTable = false;

      lines.forEach(line => {
        if (line.trim().startsWith('|')) {
          inTable = true;
          tableLines.push(line);
        } else {
          if (inTable && line.trim() === '') {
            inTable = false;
          }
          if (!inTable) {
            nonTableLines.push(line);
          }
        }
      });

      if (tableLines.length >= 3) {
        const headers = tableLines[0].split('|').map(s => s.trim()).filter(Boolean);
        const rows = tableLines.slice(2).map(line => line.split('|').map(s => s.trim()).filter(Boolean));

        return (
          <div className="space-y-3">
            <div className="whitespace-pre-line text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200">
              {renderSimpleMarkdown(nonTableLines.join('\n'))}
            </div>
            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950/80 my-2">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-900/90 text-cyan-800 dark:text-cyan-300 font-mono">
                    {headers.map((h, i) => (
                      <th key={i} className="p-2.5 font-bold border-r border-slate-200 dark:border-slate-800 last:border-r-0">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, rIdx) => (
                    <tr key={rIdx} className="border-b border-slate-200 dark:border-slate-800/80 last:border-b-0 hover:bg-slate-100 dark:hover:bg-slate-900/50">
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className="p-2.5 text-slate-700 dark:text-slate-300 border-r border-slate-200 dark:border-slate-800 last:border-r-0 font-medium">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      }
    }

    return (
      <div className="text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200 space-y-2">
        {renderSimpleMarkdown(content)}
      </div>
    );
  };

  const renderSimpleMarkdown = (text) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      // Header 3
      if (line.startsWith('### ')) {
        return (
          <h4 key={idx} className="text-sm sm:text-base font-bold text-cyan-700 dark:text-cyan-300 pt-1 flex items-center gap-1.5">
            {line.replace('### ', '')}
          </h4>
        );
      }
      // Bullet point
      if (line.trim().startsWith('• ') || line.trim().startsWith('- ')) {
        const bulletText = line.replace(/^[•\-]\s*/, '');
        return (
          <div key={idx} className="flex items-start gap-2 pl-1 my-1">
            <span className="text-cyan-600 dark:text-cyan-400 mt-1 shrink-0 text-xs">◆</span>
            <span>{parseInlineBoldAndLinks(bulletText)}</span>
          </div>
        );
      }
      // Empty line
      if (!line.trim()) {
        return <div key={idx} className="h-1.5" />;
      }
      return <p key={idx}>{parseInlineBoldAndLinks(line)}</p>;
    });
  };

  const parseInlineBoldAndLinks = (str) => {
    const parts = str.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-bold text-slate-900 dark:text-white">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        return <em key={i} className="text-cyan-700 dark:text-cyan-200 not-italic font-medium">{part.slice(1, -1)}</em>;
      }
      return part;
    });
  };

  return (
    <>
      {/* ========================================================= */}
      {/* 1. FLOATING CIRCULAR BOT LAUNCHER BUTTON (FAB)             */}
      {/* ========================================================= */}
      <button
        onClick={() => {
          if (isOpen) {
            handleCloseModal();
          } else {
            setIsOpen(true);
          }
        }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-slate-900 border-2 border-cyan-500/50 shadow-2xl hover:shadow-[0_0_25px_rgba(0,210,255,0.6)] flex items-center justify-center overflow-hidden cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300 p-1 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
        aria-label="Toggle SGSU FutureBot AI Assistant"
      >
        <div className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center">
          <img
            src="/bot-avatar.png"
            alt="SGSU FutureBot"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-slate-900 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
      </button>

      {/* ========================================================= */}
      {/* 2. CHAT WINDOW / MODAL CONTAINER                          */}
      {/* ========================================================= */}
      {isOpen && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-24 sm:right-6 z-50 w-full sm:w-[520px] md:w-[580px] h-full sm:h-[640px] sm:max-h-[86vh] bg-white dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 sm:border sm:border-slate-200 dark:sm:border-slate-700/80 sm:rounded-3xl shadow-[0_12px_50px_rgba(0,0,0,0.25)] dark:shadow-[0_12px_50px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          
          {/* Header */}
          <div className="p-3.5 sm:p-4 bg-slate-100/95 dark:bg-slate-900/95 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative shrink-0">
                <div className="w-10 h-10 rounded-full bg-slate-900 border border-cyan-500/40 overflow-hidden flex items-center justify-center p-0.5 shadow-inner">
                  <img
                    src="/bot-avatar.png"
                    alt="SGSU FutureBot Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-slate-900 shadow-sm ${
                  isListening ? 'bg-rose-500 animate-ping' : isSpeaking ? 'bg-cyan-400 animate-pulse' : 'bg-emerald-400'
                }`} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-sm text-slate-900 dark:text-white tracking-wide flex items-center gap-1">
                    SGSU FutureBot <span className="text-xs">🤖</span>
                  </h3>
                  <span className="inline-flex items-center gap-1 text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 font-semibold">
                    <ShieldCheck className="w-3 h-3 text-emerald-500 dark:text-emerald-400" />
                    Verified RAG
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  Scope Global Skills University • Official Voice & AI Assistant
                </p>
              </div>
            </div>

            {/* Header Action Icons */}
            <div className="flex items-center gap-1">
              {/* Voice Mute/Unmute Toggle */}
              <button
                type="button"
                onClick={() => {
                  if (isSpeaking) stopSpeaking();
                  setIsVoiceMuted(prev => !prev);
                  showToast(!isVoiceMuted ? "🔇 Voice speech output muted" : "🔊 Voice speech output enabled");
                }}
                title={isVoiceMuted ? "Unmute Bot Voice Speech" : "Mute Bot Voice Speech"}
                className={`p-2 rounded-xl transition-colors ${
                  isVoiceMuted
                    ? 'text-rose-500 hover:bg-rose-500/10'
                    : 'text-cyan-600 dark:text-cyan-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                {isVoiceMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={() => setIsSettingsOpen(true)}
                title="AI Settings & Provider"
                className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
              >
                <Sliders className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleClearChat}
                title="Restart Conversation"
                className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleCloseModal}
                title="Close Assistant"
                className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Toast Notification Banner */}
          {toastMessage && (
            <div className="bg-gradient-to-r from-cyan-900/95 to-slate-900/95 border-b border-cyan-500/40 text-cyan-200 px-4 py-2 text-xs flex items-center justify-between gap-2 animate-in slide-in-from-top-2 duration-200 shrink-0">
              <div className="flex items-center gap-2 min-w-0">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="truncate font-medium">{toastMessage}</span>
              </div>
              <button
                type="button"
                onClick={() => setToastMessage(null)}
                className="p-0.5 text-slate-400 hover:text-white shrink-0"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-800">
            {messages.map((m) => {
              const isBot = m.sender === 'bot';
              const isWelcome = m.id === 'bot-welcome';

              return (
                <div
                  key={m.id}
                  className={`flex flex-col ${isBot ? 'items-start' : 'items-end'} animate-in fade-in-50 duration-200`}
                >
                  {/* Sender label */}
                  <div className="flex items-center gap-1.5 mb-1 px-1">
                    {isBot && (
                      <div className="w-4 h-4 rounded-full bg-slate-900 border border-cyan-500/40 overflow-hidden flex items-center justify-center shrink-0">
                        <img src="/bot-avatar.png" alt="FutureBot" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                      {isBot ? "SGSU FutureBot" : "You"}
                    </span>
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`relative max-w-[95%] sm:max-w-[92%] rounded-2xl p-4 sm:p-5 shadow-md ${
                      isBot
                        ? 'bg-slate-100 dark:bg-[#0F172A]/90 border border-slate-200 dark:border-slate-700/80 text-slate-800 dark:text-slate-200 backdrop-blur-sm'
                        : 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium rounded-tr-sm'
                    }`}
                  >
                    {/* Confidence Pill & Navigation Notice (Bot Only) */}
                    {isBot && (
                      <div className="flex flex-wrap items-center justify-between border-b border-slate-200 dark:border-slate-800/80 pb-2 mb-3 gap-2">
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold text-cyan-700 dark:text-cyan-300">
                          <Sparkles className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
                          Grounded Intelligence
                        </span>

                        <div className="flex items-center gap-2">
                          {m.navNotice && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30 text-[9px] font-mono font-bold">
                              <Compass className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
                              {m.navNotice}
                            </span>
                          )}

                          {m.confidence && (
                            <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full font-bold uppercase ${
                              m.confidence === 'HIGH' ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30' :
                              m.confidence === 'MEDIUM' ? 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30' :
                              'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-300 dark:border-slate-700'
                            }`}>
                              {m.confidence} CONFIDENCE
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Content Rendering: Special Welcome Card with Interactive 3D Robot Avatar on the right */}
                    {isWelcome ? (
                      <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-5">
                        
                        {/* Left Side: Greeting text */}
                        <div className="flex-1 space-y-2 order-2 md:order-1 text-left">
                          {renderFormattedContent(m.text)}
                        </div>

                        {/* Right Side: Draggable 3D Robot Avatar Interactive Voice Hub */}
                        <div
                          onPointerDown={handlePointerDown}
                          onPointerMove={handlePointerMove}
                          onPointerUp={handlePointerUp}
                          onPointerCancel={handlePointerCancel}
                          onDoubleClick={() => setRobotPos({ x: 0, y: 0 })}
                          style={{
                            transform: `translate3d(${robotPos.x}px, ${robotPos.y}px, 0) scale(${isDragging ? 1.08 : 1}) rotate(${isDragging ? '5deg' : '0deg'})`,
                            transition: isDragging ? 'none' : 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
                            touchAction: 'none'
                          }}
                          className={`flex flex-col items-center shrink-0 order-1 md:order-2 self-center md:self-start pt-1 select-none ${
                            isDragging ? 'cursor-grabbing z-30' : 'cursor-grab'
                          }`}
                          title="Tap to Voice Chat • Drag to Move • Double click to Reset"
                        >
                          {/* Floating Pill Badge */}
                          <div
                            className={`mb-2 px-3 py-1 rounded-full text-[10px] font-mono font-bold transition-all duration-300 shadow-md flex items-center gap-1.5 whitespace-nowrap select-none pointer-events-none ${
                              isDragging
                                ? 'bg-cyan-500 text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.8)] scale-105'
                                : isListening
                                ? 'bg-rose-500 text-white animate-pulse shadow-[0_0_15px_rgba(244,63,94,0.6)]'
                                : isSpeaking
                                ? 'bg-cyan-500 text-slate-950 animate-bounce shadow-[0_0_15px_rgba(6,182,212,0.6)]'
                                : 'bg-gradient-to-r from-cyan-500/20 via-sky-500/20 to-blue-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30'
                            }`}
                          >
                            {isDragging ? (
                              <>
                                <Sparkles className="w-3 h-3 text-slate-950" />
                                <span>Dragging Avatar...</span>
                              </>
                            ) : isListening ? (
                              <>
                                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                                <span>Listening... Tap to Interrupt</span>
                              </>
                            ) : isSpeaking ? (
                              <>
                                <Volume2 className="w-3 h-3 text-slate-950" />
                                <span>Speaking... Tap to Interrupt</span>
                              </>
                            ) : (
                              <>
                                <Mic className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
                                <span>🎙️ Tap to Voice Chat</span>
                              </>
                            )}
                          </div>

                          {/* 3D Robot Avatar with subtle bobbing float & ripple effect */}
                          <div className="relative group flex items-center justify-center">
                            
                            {/* Active Soundwave Ripple Effect Rings when listening */}
                            {isListening && (
                              <>
                                <span className="absolute w-28 h-28 sm:w-32 sm:h-32 rounded-full border-2 border-cyan-400 opacity-75 animate-ping pointer-events-none" />
                                <span className="absolute w-36 h-36 rounded-full border border-cyan-300 opacity-50 animate-pulse pointer-events-none" />
                                <span className="absolute inset-0 bg-cyan-400/20 rounded-full blur-xl pointer-events-none" />
                              </>
                            )}

                            {/* Ambient glow when hovering or active */}
                            <div
                              className={`absolute -inset-2 rounded-full blur-xl transition-opacity duration-500 pointer-events-none ${
                                isDragging
                                  ? 'bg-cyan-400/60 opacity-100'
                                  : isListening
                                  ? 'bg-rose-500/40 opacity-100'
                                  : isSpeaking
                                  ? 'bg-cyan-400/50 opacity-100'
                                  : 'bg-gradient-to-tr from-cyan-500/30 via-sky-400/30 to-purple-500/30 opacity-70 group-hover:opacity-100'
                              }`}
                            />

                            <div
                              className={`relative z-10 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-3xl flex items-center justify-center transition-transform duration-300 ${
                                isDragging ? '' : 'animate-bot-float hover:scale-105 active:scale-95'
                              } ${
                                isListening
                                  ? 'ring-4 ring-cyan-400 ring-offset-2 ring-offset-slate-900 rounded-full'
                                  : ''
                              }`}
                              style={{
                                filter: isDragging
                                  ? 'drop-shadow(0 0 30px rgba(6,182,212,0.95))'
                                  : isListening
                                  ? 'drop-shadow(0 0 25px rgba(6,182,212,0.95))'
                                  : 'drop-shadow(0 0 15px rgba(6,182,212,0.6))'
                              }}
                            >
                              <img
                                src="/bot-avatar.png"
                                alt="3D SGSU FutureBot Robot Avatar"
                                draggable={false}
                                className="w-full h-full object-contain select-none pointer-events-none transition-transform duration-300 group-hover:scale-110"
                              />
                            </div>
                          </div>

                          {/* Dynamic Audio Waveform indicator below robot when listening or speaking */}
                          {(isListening || isSpeaking) && (
                            <div className="flex items-center gap-1 mt-2.5 px-3 py-1 rounded-full bg-slate-900/90 border border-cyan-500/40 shadow-inner">
                              <span className="w-1 bg-cyan-400 rounded-full animate-soundwave-1" />
                              <span className="w-1 bg-cyan-400 rounded-full animate-soundwave-2" />
                              <span className="w-1 bg-cyan-400 rounded-full animate-soundwave-3" />
                              <span className="w-1 bg-cyan-400 rounded-full animate-soundwave-4" />
                              <span className="w-1 bg-cyan-400 rounded-full animate-soundwave-5" />
                              <span className="text-[9px] font-mono font-bold text-cyan-300 ml-1.5 uppercase">
                                {isListening ? 'Listening' : 'Speaking'}
                              </span>
                            </div>
                          )}

                          {/* Position Reset Hint if dragged */}
                          {(robotPos.x !== 0 || robotPos.y !== 0) && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setRobotPos({ x: 0, y: 0 });
                              }}
                              className="mt-1.5 text-[9px] font-mono text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20"
                            >
                              <RotateCcw className="w-2.5 h-2.5" />
                              <span>Reset avatar position</span>
                            </button>
                          )}

                        </div>
                      </div>
                    ) : (
                      <div>
                        {isBot ? renderFormattedContent(m.text) : <p className="text-xs sm:text-sm whitespace-pre-line">{m.text}</p>}
                      </div>
                    )}

                    {/* Citations Box (Bot Only) */}
                    {isBot && m.citations && m.citations.length > 0 && (
                      <div className="mt-3.5 pt-2.5 border-t border-slate-200 dark:border-slate-800/90 space-y-1.5">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1">
                          <Building2 className="w-3 h-3 text-cyan-600 dark:text-cyan-400" /> Verified Sources:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {m.citations.map((c, idx) => (
                            <a
                              key={idx}
                              href={c.url}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-[10px] font-mono text-cyan-700 dark:text-cyan-300 border border-slate-200 dark:border-cyan-500/25 transition-colors group"
                            >
                              <FileText className="w-3 h-3 text-cyan-600 dark:text-cyan-400 shrink-0" />
                              <span className="truncate max-w-[200px]">{c.title}</span>
                              <ExternalLink className="w-2.5 h-2.5 opacity-60 group-hover:opacity-100" />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Action Deep Links (Bot Only) */}
                    {isBot && m.actions && m.actions.length > 0 && (
                      <div className="mt-3 pt-2.5 border-t border-slate-200 dark:border-slate-800/80 flex flex-wrap gap-2">
                        {m.actions.map((act, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleActionClick(act)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-700 dark:text-cyan-300 text-xs font-bold border border-cyan-500/35 transition-all hover:scale-[1.02]"
                          >
                            <span>{act.label}</span>
                            <ArrowRight className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Message Utilities (Copy, Speak & Feedback) */}
                    {isBot && (
                      <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleCopy(m.id, m.text)}
                            className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-white transition-colors"
                            title="Copy response"
                          >
                            {copiedId === m.id ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                                <span className="text-emerald-600 dark:text-emerald-400">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>

                          <button
                            onClick={() => {
                              if (isSpeaking) {
                                stopSpeaking();
                              } else {
                                speakText(m.text, m.voiceText);
                              }
                            }}
                            className="flex items-center gap-1 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                            title="Speak this response aloud"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>Read aloud</span>
                          </button>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleFeedback(m.id, true)}
                            className={`p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors ${feedbackState[m.id] === 'up' ? 'text-emerald-500 dark:text-emerald-400' : 'hover:text-slate-900 dark:hover:text-white'}`}
                            title="Helpful response"
                          >
                            <ThumbsUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleFeedback(m.id, false)}
                            className={`p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors ${feedbackState[m.id] === 'down' ? 'text-rose-500 dark:text-rose-400' : 'hover:text-slate-900 dark:hover:text-white'}`}
                            title="Not helpful"
                          >
                            <ThumbsDown className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex flex-col items-start animate-in fade-in-50 duration-200">
                <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 mb-1 px-1">
                  FutureBot is synthesizing verified SGSU knowledge...
                </span>
                <div className="bg-slate-100 dark:bg-[#0F172A] border border-cyan-500/30 rounded-2xl p-4 shadow-md flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" />
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">Querying RAG vectors & official sources</span>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Active Voice Listening Overlay Banner */}
          {isListening && (
            <div className="p-3 bg-gradient-to-r from-cyan-950/95 via-slate-900/95 to-slate-950/95 border-t border-cyan-500/40 flex items-center justify-between gap-3 animate-in slide-in-from-bottom duration-200 shrink-0">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rose-500/20 border border-rose-500/30">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  <span className="text-[10px] font-mono font-bold text-rose-300 uppercase">Listening</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-1 bg-cyan-400 rounded-full animate-soundwave-1" />
                  <span className="w-1 bg-cyan-400 rounded-full animate-soundwave-2" />
                  <span className="w-1 bg-cyan-400 rounded-full animate-soundwave-3" />
                  <span className="w-1 bg-cyan-400 rounded-full animate-soundwave-4" />
                  <span className="w-1 bg-cyan-400 rounded-full animate-soundwave-5" />
                </div>
                <p className="text-xs text-cyan-200 font-medium truncate">
                  {interimTranscript || "Listening to your question... Speak now"}
                </p>
              </div>
              <button
                type="button"
                onClick={toggleVoiceRecognition}
                className="px-3 py-1 rounded-lg bg-rose-500 hover:bg-rose-400 text-white font-bold text-xs transition-colors shrink-0 shadow-sm"
              >
                Stop
              </button>
            </div>
          )}

          {/* Starter Chips Bar */}
          <div className="px-4 py-2 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-200 dark:border-slate-800/80 overflow-x-auto flex items-center gap-2 scrollbar-none shrink-0">
            {STARTER_PROMPTS.map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(chip.query)}
                className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-[11px] font-medium border border-slate-200 dark:border-slate-700/60 whitespace-nowrap transition-colors shrink-0"
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Input Form Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 sm:p-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 shrink-0"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => {
                if (isSpeaking) stopSpeaking();
                setInputVal(e.target.value);
              }}
              placeholder="Ask anything about SGSU, courses, admissions, fees, faculty..."
              className="flex-1 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700/90 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />

            {/* Microphone Toggle Button */}
            <button
              type="button"
              onClick={toggleVoiceRecognition}
              title={isListening ? "Stop listening" : "Voice input (Speak to FutureBot)"}
              className={`p-2.5 rounded-xl transition-all shrink-0 ${
                isListening
                  ? 'bg-rose-500 text-white animate-pulse shadow-md shadow-rose-500/30'
                  : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 border border-slate-300 dark:border-slate-700'
              }`}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            {/* Send Button */}
            <button
              type="submit"
              disabled={!inputVal.trim() || isTyping}
              className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-40 text-slate-950 font-bold transition-all shadow-md shadow-cyan-500/20 shrink-0"
              aria-label="Send query"
            >
              <Send className="w-4 h-4 text-slate-950" />
            </button>
          </form>

        </div>
      )}

      {/* ========================================================= */}
      {/* 3. AI SETTINGS & LLM PROVIDER MODAL                       */}
      {/* ========================================================= */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-cyan-500/30 rounded-3xl p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">FutureBot Intelligence Settings</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsSettingsOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Intelligence Engine Provider</label>
                <select
                  value={config.provider}
                  onChange={(e) => setConfig({ ...config, provider: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-slate-200 focus:outline-none focus:border-cyan-500"
                >
                  <option value="autonomous">⚡ Autonomous University Engine (Zero Latency, Built-in)</option>
                  <option value="gemini">✨ Google Gemini 1.5 Flash (Generative API)</option>
                  <option value="openai">🤖 OpenAI GPT-4o-mini (API Key)</option>
                </select>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  The Autonomous Engine runs locally without requiring API keys or external credits.
                </p>
              </div>

              {config.provider !== 'autonomous' && (
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    {config.provider === 'gemini' ? 'Google AI Studio Key' : 'OpenAI API Key'}
                  </label>
                  <input
                    type="password"
                    placeholder="Enter your API key..."
                    value={config.apiKey}
                    onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 font-mono"
                  />
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    Your key is stored securely in your local browser storage and never uploaded to third parties.
                  </p>
                </div>
              )}

              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsSettingsOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-colors"
                >
                  Save Configuration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default FutureBot;
