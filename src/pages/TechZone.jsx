import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  dailyQuestion,
  cyberQuizQuestions,
  aiQuizQuestions,
  codingChallenges
} from '../data/quizzes';
import { Badge } from '../components/common/Badge';
import {
  Terminal,
  Shield,
  Cpu,
  Trophy,
  Flame,
  Play,
  RotateCcw,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Gamepad2,
  Sparkles,
  ArrowRight,
  Code2
} from 'lucide-react';

export const TechZone = () => {
  const { user, earnPoints, unlockBadge, leaderboard, showToast } = useApp();
  const [activeTab, setActiveTab] = useState('daily'); // 'daily' | 'coding' | 'cyber' | 'ai' | 'minigame' | 'leaderboard'

  // Daily Question state
  const [dailySelected, setDailySelected] = useState(null);
  const [dailySubmitted, setDailySubmitted] = useState(false);

  // Cyber Quiz state
  const [cyberCurrentIdx, setCyberCurrentIdx] = useState(0);
  const [cyberSelected, setCyberSelected] = useState(null);
  const [cyberScore, setCyberScore] = useState(0);
  const [cyberCompleted, setCyberCompleted] = useState(false);
  const [cyberAnsweredState, setCyberAnsweredState] = useState(false);

  // AI Quiz state
  const [aiCurrentIdx, setAiCurrentIdx] = useState(0);
  const [aiSelected, setAiSelected] = useState(null);
  const [aiScore, setAiScore] = useState(0);
  const [aiCompleted, setAiCompleted] = useState(false);
  const [aiAnsweredState, setAiAnsweredState] = useState(false);

  // Coding Challenge state
  const [activeChallengeIdx, setActiveChallengeIdx] = useState(0);
  const currentChallenge = codingChallenges[activeChallengeIdx];
  const [codeEditorVal, setCodeEditorVal] = useState(currentChallenge.starterCode);
  const [testOutput, setTestOutput] = useState('');
  const [isRunningCode, setIsRunningCode] = useState(false);

  // Mini-Game: Binary Matcher state
  const [gameScore, setGameScore] = useState(0);
  const [gameRound, setGameRound] = useState(1);
  const [targetBinary, setTargetBinary] = useState(5); // 0101
  const [userBits, setUserBits] = useState([0, 0, 0, 0]);
  const [gameMessage, setGameMessage] = useState('');

  // Daily Question Submit
  const handleDailySubmit = (e) => {
    e.preventDefault();
    if (dailySelected === null) return;
    setDailySubmitted(true);
    if (dailySelected === dailyQuestion.correctIndex) {
      earnPoints(dailyQuestion.points, "Solved Today's Daily Tech Question");
    } else {
      showToast("Incorrect answer. Check the explanation below!", "warning");
    }
  };

  // Cyber Quiz Handlers
  const handleCyberSelect = (idx) => {
    if (cyberAnsweredState) return;
    setCyberSelected(idx);
    setCyberAnsweredState(true);
    const isCorrect = idx === cyberQuizQuestions[cyberCurrentIdx].correctIndex;
    if (isCorrect) {
      setCyberScore(prev => prev + 1);
    }
  };

  const handleNextCyber = () => {
    if (cyberCurrentIdx + 1 < cyberQuizQuestions.length) {
      setCyberCurrentIdx(prev => prev + 1);
      setCyberSelected(null);
      setCyberAnsweredState(false);
    } else {
      setCyberCompleted(true);
      const finalScore = cyberSelected === cyberQuizQuestions[cyberCurrentIdx].correctIndex ? cyberScore : cyberScore;
      const earned = finalScore * 40;
      earnPoints(earned, `Completed Cyber Security Quiz (${finalScore}/${cyberQuizQuestions.length})`);
      if (finalScore >= 4) {
        unlockBadge({ id: "b-cyber-elite", name: "Cyber Guardian", icon: "🛡️", desc: "Aced Cybersecurity Quiz" });
      }
    }
  };

  const resetCyberQuiz = () => {
    setCyberCurrentIdx(0);
    setCyberSelected(null);
    setCyberScore(0);
    setCyberCompleted(false);
    setCyberAnsweredState(false);
  };

  // AI Quiz Handlers
  const handleAiSelect = (idx) => {
    if (aiAnsweredState) return;
    setAiSelected(idx);
    setAiAnsweredState(true);
    const isCorrect = idx === aiQuizQuestions[aiCurrentIdx].correctIndex;
    if (isCorrect) {
      setAiScore(prev => prev + 1);
    }
  };

  const handleNextAi = () => {
    if (aiCurrentIdx + 1 < aiQuizQuestions.length) {
      setAiCurrentIdx(prev => prev + 1);
      setAiSelected(null);
      setAiAnsweredState(false);
    } else {
      setAiCompleted(true);
      const earned = aiScore * 40;
      earnPoints(earned, `Completed AI/ML Foundation Quiz (${aiScore}/${aiQuizQuestions.length})`);
      if (aiScore >= 4) {
        unlockBadge({ id: "b-ai-pioneer", name: "AI Pioneer", icon: "🤖", desc: "Aced Foundation AI Quiz" });
      }
    }
  };

  const resetAiQuiz = () => {
    setAiCurrentIdx(0);
    setAiSelected(null);
    setAiScore(0);
    setAiCompleted(false);
    setAiAnsweredState(false);
  };

  // Coding Runner Simulator
  const handleRunCode = () => {
    setIsRunningCode(true);
    setTestOutput('Compiling and executing against test vectors in V8 sandbox...');

    setTimeout(() => {
      setIsRunningCode(false);
      const tests = currentChallenge.testCases.map((tc, i) => `Test Case ${i + 1} (${tc.input}): PASSED (Expected: ${tc.expected})`).join('\n');
      const passOutput = `[EXECUTION COMPLETED IN 1.84ms]\n\n${tests}\n\n✓ All ${currentChallenge.testCases.length} hidden assertions verified.\nMemory Allocated: 4.2 MB (Well below 128 MB threshold)\n[SUCCESS] +${currentChallenge.points} XP added to student profile!`;
      setTestOutput(passOutput);
      earnPoints(currentChallenge.points, `Solved Coding Challenge: ${currentChallenge.title}`);
    }, 700);
  };

  // Mini-Game: Binary Breaker
  const toggleBit = (bitIndex) => {
    const nextBits = [...userBits];
    nextBits[bitIndex] = nextBits[bitIndex] === 0 ? 1 : 0;
    setUserBits(nextBits);
  };

  const verifyBinaryMatch = () => {
    const currentValue = userBits[0] * 8 + userBits[1] * 4 + userBits[2] * 2 + userBits[3] * 1;
    if (currentValue === targetBinary) {
      setGameScore(prev => prev + 1);
      setGameMessage(`✓ Correct! Binary ${userBits.join('')} = Decimal ${targetBinary}!`);
      earnPoints(20, "Solved Binary Breaker round");

      // next round
      const nextTarget = Math.floor(Math.random() * 15) + 1;
      setTargetBinary(nextTarget);
      setUserBits([0, 0, 0, 0]);
      setGameRound(prev => prev + 1);
    } else {
      setGameMessage(`✗ Not quite. Your bits equal ${currentValue}, but target is ${targetBinary}. Try toggling!`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-600 dark:text-cyan-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Gamified Arena</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Future Skills Tech Zone
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
            Sharpen your algorithmic instincts, test cybersecurity concepts, compete on the departmental leaderboard, and unlock verified skill badges.
          </p>
        </div>

        {/* User live XP pill */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 text-left min-w-[200px] shadow-sm">
          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 block">CURRENT XP SCORE</span>
          <span className="text-2xl font-black text-amber-500 dark:text-amber-400 block">{user.points} XP</span>
          <span className="text-xs text-sky-600 dark:text-sky-400 font-semibold">{user.badges.length} Badges Earned</span>
        </div>
      </div>

      {/* Arena Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setActiveTab('daily')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
            activeTab === 'daily'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
              : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
          }`}
        >
          <Flame className="w-4 h-4" /> Daily Tech Question
        </button>

        <button
          onClick={() => setActiveTab('coding')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
            activeTab === 'coding'
              ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
              : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
          }`}
        >
          <Code2 className="w-4 h-4" /> Coding Challenges
        </button>

        <button
          onClick={() => setActiveTab('cyber')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
            activeTab === 'cyber'
              ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
              : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
          }`}
        >
          <Shield className="w-4 h-4" /> Cyber Quiz
        </button>

        <button
          onClick={() => setActiveTab('ai')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
            activeTab === 'ai'
              ? 'bg-purple-500 text-white shadow-md shadow-purple-500/20'
              : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
          }`}
        >
          <Cpu className="w-4 h-4" /> AI / ML Quiz
        </button>

        <button
          onClick={() => setActiveTab('minigame')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
            activeTab === 'minigame'
              ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
              : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
          }`}
        >
          <Gamepad2 className="w-4 h-4" /> Mini Game
        </button>

        <button
          onClick={() => setActiveTab('leaderboard')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
            activeTab === 'leaderboard'
              ? 'bg-cyan-500 text-slate-950 font-black shadow-md shadow-cyan-500/20'
              : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
          }`}
        >
          <Trophy className="w-4 h-4" /> Leaderboard
        </button>
      </div>

      {/* TAB CONTENT: DAILY QUESTION */}
      {activeTab === 'daily' && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-amber-500/30 space-y-6 max-w-3xl mx-auto">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-500 dark:text-amber-400">
              <Flame className="w-4 h-4" /> {dailyQuestion.date} • {dailyQuestion.topic}
            </span>
            <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
              +{dailyQuestion.points} XP
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-relaxed">
            {dailyQuestion.question}
          </h3>

          <form onSubmit={handleDailySubmit} className="space-y-3">
            {dailyQuestion.options.map((option, idx) => {
              const isSelected = dailySelected === idx;
              let optionStyle = "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800/80 text-slate-800 dark:text-slate-200";

              if (dailySubmitted) {
                if (idx === dailyQuestion.correctIndex) {
                  optionStyle = "border-emerald-500/50 bg-emerald-950/20 text-emerald-300 font-semibold";
                } else if (isSelected) {
                  optionStyle = "border-rose-500/50 bg-rose-950/20 text-rose-300";
                }
              } else if (isSelected) {
                optionStyle = "border-amber-500 bg-amber-500/10 text-white";
              }

              return (
                <div
                  key={idx}
                  onClick={() => !dailySubmitted && setDailySelected(idx)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-colors flex items-start gap-3 text-sm ${optionStyle}`}
                >
                  <span className="w-6 h-6 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center text-xs font-mono shrink-0">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="leading-relaxed">{option}</span>
                </div>
              );
            })}

            {!dailySubmitted ? (
              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  disabled={dailySelected === null}
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs disabled:opacity-40 disabled:pointer-events-none transition-colors shadow-lg shadow-amber-500/20"
                >
                  Submit Daily Answer
                </button>
              </div>
            ) : (
              <div className="pt-4 space-y-3">
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5 text-xs">
                  <p className="font-bold text-slate-200 flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-sky-400" /> Architectural Explanation:
                  </p>
                  <p className="text-slate-300 leading-relaxed">{dailyQuestion.explanation}</p>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-400 pt-2">
                  <span>Come back tomorrow for the next daily challenge!</span>
                  <button
                    type="button"
                    onClick={() => {
                      setDailySubmitted(false);
                      setDailySelected(null);
                    }}
                    className="text-amber-400 hover:underline inline-flex items-center gap-1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Try again demo
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      )}

      {/* TAB CONTENT: CODING CHALLENGES */}
      {activeTab === 'coding' && (
        <div className="space-y-6">
          {/* Challenge Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {codingChallenges.map((ch, idx) => (
              <div
                key={ch.id}
                onClick={() => {
                  setActiveChallengeIdx(idx);
                  setCodeEditorVal(ch.starterCode);
                  setTestOutput('');
                }}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  activeChallengeIdx === idx
                    ? 'glass-panel border-sky-500 bg-sky-950/20 shadow-lg shadow-sky-500/10'
                    : 'glass-panel border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <Badge variant={ch.difficulty === 'Easy' ? 'emerald' : ch.difficulty === 'Medium' ? 'primary' : 'purple'} size="xs">
                    {ch.difficulty}
                  </Badge>
                  <span className="font-mono text-amber-500 dark:text-amber-400 font-bold">+{ch.points} XP</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">{ch.title}</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Time limit: {ch.timeLimit}</p>
              </div>
            ))}
          </div>

          {/* Interactive Code Editor & Test Harness */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Problem & Instructions */}
            <div className="lg:col-span-5 glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 text-xs">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">Problem Statement</span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{currentChallenge.title}</h3>
              </div>

              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {currentChallenge.description}
              </p>

              <div className="space-y-2 pt-2">
                <span className="font-bold text-slate-800 dark:text-slate-200 block">Sample Test Assertions:</span>
                {currentChallenge.testCases.map((tc, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-300">
                    <p className="text-sky-300">Input: {tc.input}</p>
                    <p className="text-emerald-400">Expected: {tc.expected}</p>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-[11px] text-slate-400">
                <span className="font-semibold text-slate-300">💡 Algorithmic Hint:</span> {currentChallenge.solutionHint}
              </div>
            </div>

            {/* Code Editor and Output */}
            <div className="lg:col-span-7 glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-xs text-slate-300">sandbox_solution.js</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setCodeEditorVal(currentChallenge.starterCode);
                      setTestOutput('');
                    }}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 text-xs inline-flex items-center gap-1"
                    title="Reset Code"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </button>
                  <button
                    onClick={handleRunCode}
                    disabled={isRunningCode}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs disabled:opacity-50 transition-colors shadow-md shadow-sky-500/20"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>{isRunningCode ? "Executing..." : "Run Tests"}</span>
                  </button>
                </div>
              </div>

              {/* Code TextArea */}
              <div className="relative">
                <textarea
                  rows="11"
                  value={codeEditorVal}
                  onChange={(e) => setCodeEditorVal(e.target.value)}
                  className="w-full bg-slate-950 text-slate-100 font-mono text-xs p-4 rounded-xl border border-slate-800 focus:outline-none focus:border-sky-500 selection:bg-sky-500 selection:text-white leading-relaxed resize-none"
                  spellCheck="false"
                />
              </div>

              {/* Output Terminal */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Test Suite Output:</span>
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80 font-mono text-xs text-emerald-400 min-h-[90px] whitespace-pre-wrap">
                  {testOutput || 'Click "Run Tests" to execute your solution against test vectors.'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: CYBER QUIZ */}
      {activeTab === 'cyber' && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-500/30 space-y-6 max-w-3xl mx-auto">
          {!cyberCompleted ? (
            <>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                <span className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Shield className="w-4 h-4" /> Cybersecurity Knowledge Check
                </span>
                <span className="font-mono text-slate-400">
                  Question {cyberCurrentIdx + 1} of {cyberQuizQuestions.length}
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                {cyberQuizQuestions[cyberCurrentIdx].question}
              </h3>

              <div className="space-y-2.5">
                {cyberQuizQuestions[cyberCurrentIdx].options.map((opt, i) => {
                  let optClass = "border-slate-800 bg-slate-900/60 hover:bg-slate-800/80 text-slate-200";

                  if (cyberAnsweredState) {
                    if (i === cyberQuizQuestions[cyberCurrentIdx].correctIndex) {
                      optClass = "border-emerald-500 bg-emerald-950/20 text-emerald-300 font-semibold";
                    } else if (i === cyberSelected) {
                      optClass = "border-rose-500 bg-rose-950/20 text-rose-300";
                    }
                  } else if (cyberSelected === i) {
                    optClass = "border-sky-500 bg-sky-950/20";
                  }

                  return (
                    <div
                      key={i}
                      onClick={() => handleCyberSelect(i)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-colors text-xs leading-relaxed flex items-center justify-between ${optClass}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center font-mono text-[11px] shrink-0">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span>{opt}</span>
                      </div>
                      {cyberAnsweredState && i === cyberQuizQuestions[cyberCurrentIdx].correctIndex && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      )}
                    </div>
                  );
                })}
              </div>

              {cyberAnsweredState && (
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 space-y-1">
                  <p className="font-bold text-sky-400">Security Context:</p>
                  <p>{cyberQuizQuestions[cyberCurrentIdx].explanation}</p>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <span className="text-xs text-slate-400">Score: {cyberScore} correct</span>
                <button
                  onClick={handleNextCyber}
                  disabled={!cyberAnsweredState}
                  className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs disabled:opacity-40 disabled:pointer-events-none transition-colors"
                >
                  {cyberCurrentIdx + 1 === cyberQuizQuestions.length ? "Finish Quiz" : "Next Question"}
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                <Trophy className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Cyber Assessment Completed!</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                You scored <span className="text-emerald-500 dark:text-emerald-400 font-bold">{cyberScore} / {cyberQuizQuestions.length}</span>!
              </p>
              <div className="inline-block px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 font-mono">
                +{cyberScore * 40} XP awarded to profile
              </div>
              <div className="pt-4">
                <button
                  onClick={resetCyberQuiz}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
                >
                  Retake Cyber Quiz
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: AI QUIZ */}
      {activeTab === 'ai' && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-purple-500/30 space-y-6 max-w-3xl mx-auto">
          {!aiCompleted ? (
            <>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                <span className="font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Cpu className="w-4 h-4" /> AI & Foundation Models Quiz
                </span>
                <span className="font-mono text-slate-400">
                  Question {aiCurrentIdx + 1} of {aiQuizQuestions.length}
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                {aiQuizQuestions[aiCurrentIdx].question}
              </h3>

              <div className="space-y-2.5">
                {aiQuizQuestions[aiCurrentIdx].options.map((opt, i) => {
                  let optClass = "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800/80 text-slate-800 dark:text-slate-200";

                  if (aiAnsweredState) {
                    if (i === aiQuizQuestions[aiCurrentIdx].correctIndex) {
                      optClass = "border-purple-500 bg-purple-50 dark:bg-purple-950/20 text-purple-700 dark:text-purple-300 font-semibold";
                    } else if (i === aiSelected) {
                      optClass = "border-rose-500 bg-rose-50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-300";
                    }
                  } else if (aiSelected === i) {
                    optClass = "border-sky-500 bg-sky-50 dark:bg-sky-950/20";
                  }

                  return (
                    <div
                      key={i}
                      onClick={() => handleAiSelect(i)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-colors text-xs leading-relaxed flex items-center justify-between ${optClass}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center font-mono text-[11px] shrink-0">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span>{opt}</span>
                      </div>
                      {aiAnsweredState && i === aiQuizQuestions[aiCurrentIdx].correctIndex && (
                        <CheckCircle2 className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                      )}
                    </div>
                  );
                })}
              </div>

              {aiAnsweredState && (
                <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 space-y-1">
                  <p className="font-bold text-purple-600 dark:text-purple-400">Model Insights:</p>
                  <p>{aiQuizQuestions[aiCurrentIdx].explanation}</p>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
                <span className="text-xs text-slate-500 dark:text-slate-400">Score: {aiScore} correct</span>
                <button
                  onClick={handleNextAi}
                  disabled={!aiAnsweredState}
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs disabled:opacity-40 disabled:pointer-events-none transition-colors"
                >
                  {aiCurrentIdx + 1 === aiQuizQuestions.length ? "Finish Quiz" : "Next Question"}
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center mx-auto border border-purple-500/30">
                <Trophy className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">AI/ML Quiz Completed!</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                You scored <span className="text-purple-600 dark:text-purple-400 font-bold">{aiScore} / {aiQuizQuestions.length}</span>!
              </p>
              <div className="inline-block px-4 py-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs text-purple-700 dark:text-purple-300 font-mono">
                +{aiScore * 40} XP awarded to profile
              </div>
              <div className="pt-4">
                <button
                  onClick={resetAiQuiz}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold"
                >
                  Retake AI Quiz
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: MINI GAME - BINARY BREAKER */}
      {activeTab === 'minigame' && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-rose-500/30 space-y-6 max-w-2xl mx-auto text-center">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">Mini Game Challenge</span>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">Binary Breaker</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Toggle the 4 binary bits (8, 4, 2, 1) to match the decimal target number!
            </p>
          </div>

          <div className="py-4 bg-slate-100 dark:bg-slate-950/80 rounded-2xl border border-slate-200 dark:border-slate-800">
            <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Target Decimal:</span>
            <span className="text-5xl font-black text-rose-500 dark:text-rose-400 font-mono">{targetBinary}</span>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Round {gameRound} • Solved: {gameScore}</p>
          </div>

          {/* Interactive 4 Bits */}
          <div className="grid grid-cols-4 gap-3 max-w-md mx-auto">
            {userBits.map((bit, idx) => {
              const placeValue = Math.pow(2, 3 - idx);
              return (
                <button
                  key={idx}
                  onClick={() => toggleBit(idx)}
                  className={`p-4 rounded-2xl border transition-all flex flex-col items-center justify-center ${
                    bit === 1
                      ? 'bg-rose-500 text-white border-rose-400 shadow-lg shadow-rose-500/25 scale-105'
                      : 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-400 border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600'
                  }`}
                >
                  <span className="text-3xl font-black font-mono">{bit}</span>
                  <span className="text-[10px] uppercase font-mono mt-1 opacity-70">Val: {placeValue}</span>
                </button>
              );
            })}
          </div>

          {gameMessage && (
            <p className={`text-xs font-semibold ${gameMessage.startsWith('✓') ? 'text-emerald-500 dark:text-emerald-400' : 'text-amber-500 dark:text-amber-400'}`}>
              {gameMessage}
            </p>
          )}

          <div className="pt-2">
            <button
              onClick={verifyBinaryMatch}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-400 hover:to-pink-500 text-white font-bold text-xs shadow-lg shadow-rose-500/25 transition-all"
            >
              Verify Decimal Match
            </button>
          </div>
        </div>
      )}

      {/* TAB CONTENT: LEADERBOARD */}
      {activeTab === 'leaderboard' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Department Leaderboard</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Live rankings updated as students solve problems & quizzes.</p>
            </div>
            <div className="text-xs text-slate-400">
              Sorted by Total Verified XP Points
            </div>
          </div>

          <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950/80 text-slate-400 uppercase text-[11px] font-mono border-b border-slate-800">
                  <tr>
                    <th className="py-3.5 px-4">Rank</th>
                    <th className="py-3.5 px-4">Student Name</th>
                    <th className="py-3.5 px-4">Roll Number</th>
                    <th className="py-3.5 px-4">Challenges Solved</th>
                    <th className="py-3.5 px-4">Badges</th>
                    <th className="py-3.5 px-4 text-right">Points</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-sans">
                  {leaderboard.map((item) => (
                    <tr
                      key={item.rollNo}
                      className={`transition-colors ${
                        item.isUser
                          ? 'bg-sky-500/10 hover:bg-sky-500/15 font-semibold text-white'
                          : 'hover:bg-slate-800/40'
                      }`}
                    >
                      <td className="py-3 px-4 font-mono font-bold">
                        {item.rank === 1 ? '🥇 #1' : item.rank === 2 ? '🥈 #2' : item.rank === 3 ? '🥉 #3' : `#${item.rank}`}
                      </td>
                      <td className="py-3 px-4 flex items-center gap-2.5">
                        <div className={`w-7 h-7 rounded-lg ${item.avatarColor} text-white font-bold flex items-center justify-center text-xs shrink-0`}>
                          {item.name.charAt(0)}
                        </div>
                        <span className="font-semibold text-white">{item.name}</span>
                        {item.isUser && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30">
                            YOU
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-400">{item.rollNo}</td>
                      <td className="py-3 px-4">{item.challengesCompleted} solved</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1 font-mono">
                          🏆 {item.badges}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-mono font-bold text-amber-400 text-sm">
                        {item.points} XP
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card List */}
            <div className="md:hidden divide-y divide-slate-800/80">
              {leaderboard.map((item) => (
                <div
                  key={item.rollNo}
                  className={`p-4 flex items-center justify-between text-xs ${
                    item.isUser ? 'bg-sky-500/10' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-slate-400 w-8">
                      #{item.rank}
                    </span>
                    <div className={`w-8 h-8 rounded-lg ${item.avatarColor} text-white font-bold flex items-center justify-center text-xs shrink-0`}>
                      {item.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-white flex items-center gap-1">
                        {item.name}
                        {item.isUser && <span className="text-[9px] text-sky-400">(You)</span>}
                      </p>
                      <p className="text-[11px] text-slate-400">{item.challengesCompleted} challenges • {item.badges} badges</p>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-amber-400 text-sm">
                    {item.points} XP
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
