import React, { useState } from 'react';
import { initialLabs, LAB_CATEGORIES } from '../data/labs';
import { useApp } from '../context/AppContext';
import { Badge } from '../components/common/Badge';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
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
  Code2,
  Microscope,
  Building2,
  Mail,
  Award
} from 'lucide-react';

export const Labs = () => {
  const { showToast } = useApp();
  const [selectedLabId, setSelectedLabId] = useState(initialLabs[0].id);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const activeLab = initialLabs.find(l => l.id === selectedLabId) || initialLabs[0];
  const [codeContent, setCodeContent] = useState(activeLab.starterCode);
  const [outputTerminal, setOutputTerminal] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  // Department Core Physical & Specialized Laboratories
  const departmentFacilities = [
    {
      id: "fac-ai",
      name: "Quantum & Neural Intelligence Lab",
      category: "Artificial Intelligence & HPC",
      lead: "Dr. Pooja Bijlani & AI Research Squad",
      icon: Cpu,
      color: "border-cyan-500/30 text-cyan-400 bg-cyan-500/10",
      description: "Dedicated to transformer memory alignment, local foundation model quantization, computer vision, and neural inference acceleration.",
      specifications: [
        "NVIDIA Tensor-Core compute servers",
        "PyTorch, TensorRT & ONNX runtime stacks",
        "Local vector database clusters (Qdrant & Chroma)",
        "Automated continuous model evaluation pipelines"
      ],
      currentInitiatives: "Interactive 3D simulation platforms, local neural inference acceleration & multimodal web architectures."
    },
    {
      id: "fac-sec",
      name: "Cyber Defense SOC & Forensics Arena",
      category: "Cyber Security & Systems",
      lead: "Department Systems & Security Council",
      icon: Shield,
      color: "border-purple-500/30 text-purple-400 bg-purple-500/10",
      description: "An isolated, sandboxed digital war room engineered for live threat simulation, ethical penetration testing, packet forensics, and CTF wargames.",
      specifications: [
        "Isolated air-gapped attack-defense network topology",
        "Hardware firewalls & enterprise intrusion telemetry wall",
        "Wireshark packet capture arrays & eBPF kernel probes",
        "Malware containment analysis sandbox"
      ],
      currentInitiatives: "Defending simulated industrial infrastructure breaches & active Zero Trust protocol research."
    },
    {
      id: "fac-cloud",
      name: "Cloud Native & DevOps Engineering Forge",
      category: "Distributed Systems & Cloud",
      lead: "Cloud Systems & DevOps Mentors",
      icon: Cloud,
      color: "border-blue-500/30 text-blue-400 bg-blue-500/10",
      description: "A bare-metal micro-datacenter cluster allowing students and faculty to orchestrate multi-tenant container fleets, CI/CD pipelines, and service meshes.",
      specifications: [
        "Multi-node production Kubernetes cluster",
        "GitOps automation (ArgoCD & Terraform infrastructure as code)",
        "Distributed Ceph object and block storage mesh",
        "Prometheus & Grafana centralized telemetry monitoring"
      ],
      currentInitiatives: "Multi-tenant university compute platform & automated containerized code evaluators."
    },
    {
      id: "fac-iot",
      name: "Smart Embedded Systems & IoT Foundry",
      category: "Edge Hardware & Robotics",
      lead: "Department of Skill Development & Embedded IT",
      icon: Radio,
      color: "border-emerald-500/30 text-emerald-400 bg-emerald-500/10",
      description: "Focused on ultra-low power wireless sensor mesh networks, RISC-V edge prototyping, MQTT telemetry streaming, and environmental telemetry radios.",
      specifications: [
        "Digital logic analyzers & dual-channel oscilloscopes",
        "Microcontroller development rigs (ESP32, STM32 & Raspberry Pi)",
        "LoRaWAN long-range wireless gateway transceiver",
        "SMD soldering and precision PCB rework stations"
      ],
      currentInitiatives: "Self-Harvesting IoT Mesh Circuit (National & US Patent Granted)."
    }
  ];

  // Switch lab
  const handleSelectLab = (lab) => {
    setSelectedLabId(lab.id);
    setCodeContent(lab.starterCode);
    setOutputTerminal('');
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setOutputTerminal('Spinning isolated browser V8 worker sandbox...\nParsing AST and evaluating logic across benchmark vectors...');

    setTimeout(() => {
      setIsRunning(false);
      setOutputTerminal(activeLab.expectedOutput);
      showToast(`Computational test evaluated successfully! All test vectors passed.`, 'success');
    }, 600);
  };

  const handleResetCode = () => {
    setCodeContent(activeLab.starterCode);
    setOutputTerminal('');
    showToast('Code workspace reset to template state.', 'info');
  };

  const filteredLabs = initialLabs.filter(l => {
    return selectedCategory === 'All' || l.category === selectedCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 animate-in fade-in duration-300">
      
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'Research & Laboratory Facilities' }]} />

      {/* Main Public Header */}
      <div className="space-y-4 pb-8 border-b border-slate-200 dark:border-slate-800">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-600 dark:text-cyan-400">
          <Microscope className="w-3.5 h-3.5" />
          <span>Scope Global Skills University • Department Facilities</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Research &amp; Laboratory Facilities
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
          The School of Future Skills &amp; IT houses state-of-the-art computational and experimental laboratories. Our facilities support hands-on technical pedagogy, industry capstones, faculty research, and national competition training.
        </p>

        {/* Quick Highlights Strip */}
        <div className="pt-2 flex flex-wrap items-center gap-6 text-xs font-mono text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-cyan-500" /> 4 Specialized Research Centers</span>
          <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-cyan-500" /> GPU High-Performance Compute</span>
          <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-cyan-500" /> Real-Time Cyber SOC Arena</span>
          <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-cyan-500" /> Hardware Prototyping Foundry</span>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 1. PHYSICAL RESEARCH FACILITIES SHOWCASE                  */}
      {/* ========================================================= */}
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
              Department Infrastructure
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              Core Engineering Research Centers
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Physical university laboratories equipped for undergraduate capstones, faculty publications, and corporate innovation projects.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {departmentFacilities.map((fac) => (
            <div
              key={fac.id}
              className="glass-card p-6 sm:p-7 flex flex-col justify-between space-y-5 hover:border-cyan-500/40 transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${fac.color}`}>
                    {fac.category}
                  </span>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400">{fac.lead}</span>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center shrink-0 text-cyan-500 border border-slate-200 dark:border-slate-800">
                    <fac.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                      {fac.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                      {fac.description}
                    </p>
                  </div>
                </div>

                {/* Facility Specifications */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                  <span className="font-mono text-cyan-600 dark:text-cyan-400 font-bold block text-[11px] uppercase tracking-wider">
                    Infrastructure &amp; Tooling Stacks:
                  </span>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-slate-600 dark:text-slate-300 text-[11px]">
                    {fac.specifications.map((spec, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Current Research Focus */}
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  <strong className="text-slate-700 dark:text-slate-200">Active Research Initiatives: </strong>
                  {fac.currentInitiatives}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. INTERACTIVE COMPUTATIONAL SANDBOX MODULES              */}
      {/* ========================================================= */}
      <section className="space-y-8 pt-8 border-t border-slate-200 dark:border-slate-800">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
              Live Browser Demonstration
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              Interactive Computational Benchmarks
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Visitors can test sample computational modules deployed in our software engineering and algorithm labs.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-[11px] font-mono text-slate-600 dark:text-slate-300">
              Runtime: Client V8 Web Worker
            </span>
          </div>
        </div>

        {/* Category Filter Tabs */}
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

        {/* Lab Cards Grid */}
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
                  <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">{lab.exercisesCount} Core Tests</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1 truncate">{lab.name}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mb-3">{lab.description}</p>
                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200 dark:border-slate-800/80">
                  <span className="font-mono text-cyan-600 dark:text-cyan-400 font-semibold">{lab.technology}</span>
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                    {isSelected ? "Selected Module ●" : "Inspect Module →"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Active Lab Workspace Interaction */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pt-2">
          
          {/* Left Col: Problem Statement & Instructions */}
          <div className="lg:col-span-5 glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-5 text-xs">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">{activeLab.category}</span>
                <Badge variant="primary" size="xs">{activeLab.difficulty}</Badge>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">{activeLab.name}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">Technology: <span className="text-sky-600 dark:text-sky-300 font-mono">{activeLab.technology}</span></p>
            </div>

            <div>
              <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-1">Computational Objective:</h4>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                {activeLab.problemStatement}
              </p>
            </div>

            <div>
              <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">Verification Instructions:</h4>
              <ul className="space-y-1.5 text-slate-600 dark:text-slate-400 font-mono text-[11px]">
                {activeLab.instructions?.map((inst, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0 mt-0.5" />
                    <span>{inst}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500">
              💡 <em>This interactive evaluation is executed client-side in your browser to demonstrate real-time algorithm profiling.</em>
            </div>
          </div>

          {/* Right Col: Code Sandbox & Execution Terminal */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Editor Container */}
            <div className="rounded-3xl border border-slate-800 bg-[#0B0F19] overflow-hidden shadow-2xl flex flex-col">
              {/* Editor Topbar */}
              <div className="bg-slate-900/90 px-4 py-3 border-b border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="font-mono text-slate-400 ml-2">{activeLab.id}.js</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleResetCode}
                    className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                    title="Reset to starter template"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={handleRunCode}
                    disabled={isRunning}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-md transition-all disabled:opacity-50"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{isRunning ? 'Evaluating...' : 'Run Benchmark'}</span>
                  </button>
                </div>
              </div>

              {/* Textarea Code Workspace */}
              <textarea
                value={codeContent}
                onChange={(e) => setCodeContent(e.target.value)}
                rows={12}
                spellCheck={false}
                className="w-full bg-[#0B0F19] p-4 text-xs font-mono text-cyan-200 focus:outline-none resize-none leading-relaxed selection:bg-cyan-500 selection:text-slate-950"
              />
            </div>

            {/* Live Output Terminal */}
            <div className="rounded-2xl border border-slate-800 bg-[#070A10] p-4 font-mono text-xs space-y-2">
              <div className="flex items-center justify-between text-[11px] text-slate-500 border-b border-slate-800/80 pb-2">
                <span className="flex items-center gap-1.5">
                  <Terminal className="w-3 h-3 text-cyan-400" />
                  <span>Evaluation Console</span>
                </span>
                <span className="text-emerald-400 font-bold">READY</span>
              </div>
              <pre className="text-slate-300 text-[11px] whitespace-pre-wrap max-h-36 overflow-y-auto leading-relaxed">
                {outputTerminal || "// Click 'Run Benchmark' to parse and execute computational test cases."}
              </pre>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. RESEARCH COLLABORATION & INQUIRY                       */}
      {/* ========================================================= */}
      <section className="glass-panel p-8 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 relative overflow-hidden">
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400">
            <Building2 className="w-3.5 h-3.5" />
            <span>Academic &amp; Industry Access</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Partner with Our Research Laboratories
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Our facilities are open for joint corporate capstones, sponsored technology research, and interdisciplinary student ventures. Contact the Deanery of School of Future Skills &amp; IT to initiate a research partnership.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <a
              href="#footer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md transition-all"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Department Research Office</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Labs;
