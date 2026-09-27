export const PROJECT_CATEGORIES = [
  "All",
  "AI & Machine Learning",
  "Cybersecurity",
  "Web & Distributed Systems",
  "IoT & Embedded Hardware",
  "Cloud & DevOps"
];

export const initialProjects = [
  {
    id: "proj-01",
    name: "NeuralShield: Autonomous Edge Network Intrusion Defender",
    isProjectOfMonth: true,
    category: "Cybersecurity",
    studentTeam: "Aria Sharma (Lead), Ethan Chen, Liam Patel",
    year: "Final Year (2026)",
    status: "Production Ready / Deployed",
    technologies: ["Rust", "PyTorch", "eBPF", "WebAssembly", "Prometheus"],
    description: "An ultra-low latency intrusion detection engine running in kernel space using eBPF, analyzing 100Gbps network streams with an on-chip quantized neural network to detect zero-day DDoS and privilege escalation attempts in less than 2 milliseconds.",
    highlights: [
      "Sub-2ms anomaly inference at kernel layer",
      "99.4% detection rate across 2026 MITRE ATT&CK datasets",
      "Winner of National Cyber Innovation Award"
    ],
    github: "https://github.com/example/neural-shield-ebpf",
    demo: "https://neuralshield-demo.futureskills.internal",
    stars: 342,
    upvotes: 218
  },
  {
    id: "proj-02",
    name: "AuraDoc: Multimodal Clinical RAG Assistant",
    isProjectOfMonth: false,
    category: "AI & Machine Learning",
    studentTeam: "Zoe Martinez & Devang Kapoor",
    year: "3rd Year (2026)",
    status: "Beta Testing",
    technologies: ["FastAPI", "React", "Milvus", "BioGPT", "Docker"],
    description: "Assists medical researchers in cross-referencing complex pathology imaging reports with PubMed scientific literature using multimodal vision-language embeddings and source citation verification.",
    highlights: [
      "Zero-hallucination guardrails with verified DOI citations",
      "Interactive 3D anatomical viewer embedded in UI",
      "Published at Regional Student Research Symposium"
    ],
    github: "https://github.com/example/auradoc-clinical-rag",
    demo: "https://auradoc.futureskills.internal",
    stars: 189,
    upvotes: 145
  },
  {
    id: "proj-03",
    name: "SkySense: Autonomous Micro-Weather Mesh Network",
    isProjectOfMonth: false,
    category: "IoT & Embedded Hardware",
    studentTeam: "Tariq Mansoor, Priya Nair",
    year: "3rd Year (2026)",
    status: "Hardware Deployed (Campus Ground)",
    technologies: ["ESP32", "LoRaWAN", "Go", "InfluxDB", "Grafana"],
    description: "Decentralized battery-free solar-harvesting micro-weather nodes deployed across the department campus measuring microclimate indices, particulate PM2.5, and UV radiation over LoRa mesh topology.",
    highlights: [
      "2-year uninterrupted battery-free solar operation",
      "3.5km reliable LoRa mesh transmission range",
      "Open telemetry dashboard used by campus facility ops"
    ],
    github: "https://github.com/example/skysense-lora-mesh",
    demo: "https://skysense.futureskills.internal",
    stars: 204,
    upvotes: 167
  },
  {
    id: "proj-04",
    name: "ChronoSync: Distributed CRDT Collaborative Code Canvas",
    isProjectOfMonth: false,
    category: "Web & Distributed Systems",
    studentTeam: "Marcus Vance",
    year: "2nd Year (2026)",
    status: "Active Development",
    technologies: ["TypeScript", "WebSockets", "Yjs", "Monaco Editor", "Tailwind CSS"],
    description: "Conflict-free Replicated Data Type (CRDT) powered real-time peer-to-peer code pairing studio with sub-50ms peer state convergence and zero central server document storage requirements.",
    highlights: [
      "Deterministic state merge with zero conflict locks",
      "Built-in AST linting and syntax visualization",
      "Over 1,200 active student test sessions"
    ],
    github: "https://github.com/example/chronosync-crdt-editor",
    demo: "https://chronosync.futureskills.internal",
    stars: 278,
    upvotes: 194
  },
  {
    id: "proj-05",
    name: "KubeWeave: Serverless Event Mesh on MicroK8s",
    isProjectOfMonth: false,
    category: "Cloud & DevOps",
    studentTeam: "Sora Takahashi & Neil O'Connor",
    year: "Final Year (2026)",
    status: "Stable",
    technologies: ["Kubernetes", "Golang", "CloudEvents", "Helm", "Keda"],
    description: "A lightweight Kubernetes operator for scaling ephemeral student microservices to zero, cutting department cluster energy consumption by 43% during off-peak lab hours.",
    highlights: [
      "Auto-scale to zero with 150ms cold-start revival",
      "Custom Kubernetes CRD controller written in Go",
      "Adopted by departmental lab servers"
    ],
    github: "https://github.com/example/kubeweave-operator",
    demo: "https://kubeweave.futureskills.internal",
    stars: 165,
    upvotes: 112
  }
];
