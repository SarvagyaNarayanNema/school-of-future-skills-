export const studentClubs = [
  {
    id: "binary-battle-club",
    name: "Binary Battle Club",
    category: "Competitive Programming & Problem Solving",
    badge: "Algorithms & Code Competitions",
    membersCount: 350,
    activeMembers: 350,
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    description: "The premier competitive programming and algorithmic combat society. Dedicated to dynamic programming, data structures mastery, hackathons, and speed coding battles.",
    tags: ["C++", "Python", "Data Structures", "Algorithms", "Competitive Programming", "ICPC"],
    schedule: "Wednesdays & Saturdays @ 5:30 PM",
    meetingSchedule: "Wednesdays & Saturdays @ 5:30 PM",
    venue: "Advanced Coding Arena & Discord War Room",
    room: "Advanced Coding Arena & Discord War Room",
    leads: "Club Student Leads & Mentors",
    lead: "Club Student Leads & Mentors",
    isJoined: false
  },
  {
    id: "cyber-warriors-club",
    name: "Cyber Warriors Club",
    category: "Cyber Defense & Information Security",
    badge: "Ethical Hacking & Threat Defense",
    membersCount: 420,
    activeMembers: 420,
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
    description: "The elite cybersecurity strike team focused on ethical hacking, CTF (Capture The Flag) competitions, vulnerability assessment, digital forensics, and defending digital infrastructure.",
    tags: ["Ethical Hacking", "Network Defense", "Penetration Testing", "Digital Forensics", "Linux", "CTF"],
    schedule: "Thursdays @ 6:00 PM & Weekend CTFs",
    meetingSchedule: "Thursdays @ 6:00 PM & Weekend CTFs",
    venue: "Cyber Defense SOC Lab & Security Arena",
    room: "Cyber Defense SOC Lab & Security Arena",
    leads: "Security Operations Student Council",
    lead: "Security Operations Student Council",
    isJoined: false
  }
];

export const initialTechClubs = studentClubs;

export const initialStudentProjects = [
  {
    id: "proj-1",
    name: "NeuralShield: Kernel-Space Zero-Day Intrusion Mitigator",
    studentTeam: "Aria Sharma (Lead), Ethan Chen, Liam Patel",
    category: "Cyber Security & AI",
    year: "Final Year Capstone",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    description: "High-speed Linux kernel packet filter operating at eBPF bytecode layer. Employs on-chip quantized neural anomaly detection to intercept privilege escalations and malicious DDoS vectors in sub-2ms time.",
    technologies: ["Rust", "eBPF", "PyTorch", "Prometheus", "C"],
    github: "https://github.com/example/neural-shield-ebpf",
    demo: "https://neuralshield-demo.futureskills.internal",
    likes: 348
  },
  {
    id: "proj-2",
    name: "AuraDoc: Verified Multimodal Clinical RAG Engine",
    studentTeam: "Zoe Martinez & Devang Kapoor",
    category: "AI & Healthcare",
    year: "3rd Year Research",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
    description: "Clinical research assistant that cross-indexes CT scan visual embeddings with PubMed medical papers, enforcing mathematical citations to guarantee 0% hallucination in diagnostic summaries.",
    technologies: ["FastAPI", "React 19", "Milvus", "BioGPT", "Docker"],
    github: "https://github.com/example/auradoc-clinical-rag",
    demo: "https://auradoc.futureskills.internal",
    likes: 274
  },
  {
    id: "proj-3",
    name: "SkySense: Autonomous Ambient-Harvesting Weather Mesh",
    studentTeam: "Tariq Mansoor, Priya Nair",
    category: "IoT & CleanTech",
    year: "3rd Year Hardware",
    image: "https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=800&q=80",
    description: "Battery-free microclimate sensor nodes deployed across university campus grounds transmitting real-time air quality, PM2.5, and humidity over 4.2km decentralized LoRa mesh topology.",
    technologies: ["ESP32", "LoRaWAN", "Go", "InfluxDB", "Grafana"],
    github: "https://github.com/example/skysense-lora-mesh",
    demo: "https://skysense.futureskills.internal",
    likes: 242
  },
  {
    id: "proj-4",
    name: "ChronoSync: Peer-to-Peer CRDT Code Collaboration Studio",
    studentTeam: "Marcus Vance",
    category: "Web & Distributed Systems",
    year: "2nd Year Innovation",
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=800&q=80",
    description: "Decentralized real-time peer-to-peer coding workspace using Conflict-free Replicated Data Types (CRDTs) ensuring deterministic merge resolution and zero central database dependency.",
    technologies: ["TypeScript", "WebSockets", "Yjs", "Monaco Editor", "Tailwind CSS"],
    github: "https://github.com/example/chronosync-crdt-editor",
    demo: "https://chronosync.futureskills.internal",
    likes: 295
  },
  {
    id: "proj-5",
    name: "KubeWeave: Ephemeral Container Auto-Scaler for Campus Labs",
    studentTeam: "Sora Takahashi & Neil O'Connor",
    category: "Cloud & DevOps",
    year: "Final Year Capstone",
    image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=800&q=80",
    description: "Custom Kubernetes operator written in Golang that scales idle student development pods to zero with sub-180ms wake-on-request latency, slashing departmental lab server power by 42%.",
    technologies: ["Golang", "Kubernetes", "CRD", "Helm", "Docker"],
    github: "https://github.com/example/kubeweave-operator",
    demo: "https://kubeweave.futureskills.internal",
    likes: 218
  }
];
