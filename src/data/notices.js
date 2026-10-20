export const NOTICE_PRIORITIES = [
  "All",
  "Urgent",
  "Hackathons",
  "Examination",
  "Workshops"
];

export const initialNotices = [
  {
    id: "not-01",
    title: "Registration Live: Flagship 48-Hour National AI & Systems Hackathon 2026",
    priority: "Hackathons",
    date: "2026-09-26",
    author: "Department Hackathon Steering Committee",
    isUrgent: true,
    summary: "$18,000 cash prizes, venture acceleration fellowships, and direct interviews at top AI labs for top 5 collegiate teams.",
    fullContent: "The Department of Future Skills officially opens applications for the annual 48-Hour National Hackathon. Tracks include Autonomous Agent Workflows, Post-Quantum Cryptography, Zero-Knowledge Scaling, and Low-Power Edge IoT. High-speed gigabit fiber, dedicated cloud GPU compute clusters, and mentor guidance from Silicon Valley and Indian tech leads will be provided. Teams of 2 to 4 students may apply.",
    attachmentName: "future_skills_hackathon_rules_2026.pdf",
    attachmentSize: "2.8 MB",
    deadline: "October 18, 2026"
  },
  {
    id: "not-02",
    title: "Mandatory Circular: Mid-Semester Practical Examinations & Systems Lab Slots",
    priority: "Examination",
    date: "2026-09-24",
    author: "Academic Evaluation Cell",
    isUrgent: true,
    summary: "Evaluations for AI/ML, Cyber Security, and Cloud DevOps labs commence October 15. Verify lab roll number slot distributions.",
    fullContent: "All undergraduate students enrolled in practical laboratory courses must review their assigned machine terminals and viva voce slots. Students must bring verified lab journals, digital commit histories on their university Git repositories, and student smart IDs. Evaluations will feature a 60-minute unseen live debugging challenge followed by an individual panel review.",
    attachmentName: "practical_evaluation_slots_schedule.pdf",
    attachmentSize: "920 KB",
    deadline: "October 12, 2026"
  },
  {
    id: "not-03",
    title: "Hands-on Masterclass: Deploying Quantized Local LLMs on Edge Hardware with Ollama",
    priority: "Workshops",
    date: "2026-09-22",
    author: "AI Syndicate & Systems Research Club",
    isUrgent: false,
    summary: "Learn how to compress 70B parameter models onto laptop GPUs using 4-bit AWQ and GGUF quantization techniques.",
    fullContent: "Join visiting researchers for an intensive 4-hour weekend practicum in Lab 402. We will step through tensor quantization from scratch, optimize model weights with AWQ, benchmark inference throughput using llama.cpp and Ollama, and build a fully offline voice-activated agent. Free for all enrolled students.",
    attachmentName: "ollama_edge_workshop_setup.pdf",
    attachmentSize: "640 KB",
    deadline: "October 04, 2026"
  },
  {
    id: "not-04",
    title: "URGENT: Cloud GPU Cluster Compute Quotas Reset & Slurm Queue Guidelines",
    priority: "Urgent",
    date: "2026-09-21",
    author: "High-Performance Computing Infrastructure Group",
    isUrgent: true,
    summary: "Departmental 8x NVIDIA H100 GPU cluster allocations have been renewed for semester capstone projects. Apply for batch job quotas.",
    fullContent: "Students conducting research in generative modeling, reinforcement learning, or molecular simulations can now request batch GPU reservations up to 72 continuous node-hours. All scripts must be submitted through Slurm with resource boundaries defined. Idle allocations exceeding 15 minutes will be automatically preempted to ensure fair shared utilization.",
    attachmentName: "slurm_h100_cluster_access_guide.pdf",
    attachmentSize: "1.4 MB",
    deadline: "Immediate"
  },
  {
    id: "not-05",
    title: "Cyber Defense CTF War-Games: Inter-College Red vs Blue Team Qualifier",
    priority: "Hackathons",
    date: "2026-09-18",
    author: "Cyber Defense Guild",
    isUrgent: false,
    summary: "24-hour Capture The Flag qualifier tournament with challenges across binary exploitation, reverse engineering, and web defense.",
    fullContent: "Prepare your terminals for the departmental CTF qualifiers. Top 3 scoring squads will represent Future Skills at the National Cyber Defense Invitational with all registration and travel grants sponsored by the department. Sandboxed virtual networks and challenge flag submissions will be tracked live on our portal.",
    attachmentName: "ctf_qualifiers_infopack.pdf",
    attachmentSize: "1.1 MB",
    deadline: "October 08, 2026"
  },
  {
    id: "not-06",
    title: "Curriculum Update & Academic Guidelines: Generative AI Attribution Policy",
    priority: "Workshops",
    date: "2026-09-15",
    author: "Academic Ethics Committee",
    isUrgent: false,
    summary: "Official guidelines on ethical use, prompt documentation, and transparent attribution for AI tools used in coursework.",
    fullContent: "The Future Skills department encourages the responsible integration of generative code assistants and language models. When AI tools are leveraged for project code generation or paper drafting, students must append an architectural disclosure section detailing prompt methodology, synthetic code blocks, and human verification steps performed.",
    attachmentName: "academic_integrity_and_ai_standards.pdf",
    attachmentSize: "480 KB",
    deadline: "Ongoing"
  }
];
