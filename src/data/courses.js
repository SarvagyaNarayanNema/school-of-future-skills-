export const COURSE_CATEGORIES = [
  "All",
  "Cyber Security",
  "AI / ML",
  "Data Science",
  "Programming",
  "Web Development",
  "Cloud Computing",
  "IoT",
  "Digital Marketing"
];

export const initialCourses = [
  {
    id: "cs-101",
    title: "Network Security & Cyber Defense Fundamentals",
    category: "Cyber Security",
    difficulty: "Intermediate",
    duration: "8 Weeks",
    instructor: "Dr. Elena Vance (Lead Cyber Researcher)",
    progress: 42,
    enrolled: true,
    technologies: ["Wireshark", "Linux", "Snort", "Firewalls", "Cryptology"],
    startDate: "Oct 15, 2026",
    rating: 4.9,
    enrolledCount: 384,
    description: "Master modern threat vectors, perimeter defense, encryption paradigms, and active defense counter-measures against zero-day attacks in enterprise topologies.",
    syllabus: [
      { module: "Module 1: Threat Models & Topology", lessons: ["Enterprise perimeter fundamentals", "Zero Trust Architecture basics", "Packet crafting and analysis"] },
      { module: "Module 2: Network Forensics & IDS", lessons: ["Configuring Snort rules", "Deep packet inspection", "Anomaly detection algorithms"] },
      { module: "Module 3: Offensive Defense Labs", lessons: ["Penetration vectors", "Privilege escalation vectors", "Incident reporting & mitigation"] }
    ],
    prerequisites: "Computer Networks & basic Linux CLI knowledge."
  },
  {
    id: "cs-102",
    title: "Ethical Hacking & Penetration Testing",
    category: "Cyber Security",
    difficulty: "Advanced",
    duration: "10 Weeks",
    instructor: "Prof. Marcus Thorne (CEH, OSCP Fellow)",
    progress: 0,
    enrolled: false,
    technologies: ["Kali Linux", "Metasploit", "Burp Suite", "Nmap", "OWASP Top 10"],
    startDate: "Nov 01, 2026",
    rating: 4.95,
    enrolledCount: 512,
    description: "Hands-on offensive security methodologies following NIST and OWASP standards. Practice exploit development, web app penetration, and ethical disclosures in sandboxed environments.",
    syllabus: [
      { module: "Module 1: Reconnaissance & Scanning", lessons: ["Passive OSINT collection", "Active network mapping", "Vulnerability scanners"] },
      { module: "Module 2: Exploitation & Payloads", lessons: ["Buffer overflows", "Web exploit chains", "Privilege escalation"] },
      { module: "Module 3: Reporting & Patch Remediation", lessons: ["Writing executive reports", "Remediation verification"] }
    ],
    prerequisites: "Network Security, Python scripting basics."
  },
  {
    id: "ai-201",
    title: "Deep Learning & Generative AI Architectures",
    category: "AI / ML",
    difficulty: "Advanced",
    duration: "12 Weeks",
    instructor: "Dr. Aris Thorne (Visiting AI Scientist)",
    progress: 31,
    enrolled: true,
    technologies: ["PyTorch", "Transformers", "LangChain", "Hugging Face", "CUDA"],
    startDate: "Oct 05, 2026",
    rating: 4.98,
    enrolledCount: 640,
    description: "Explore transformer backbones, self-attention mechanics, latent diffusion, and Retrieval-Augmented Generation (RAG) for high-performance generative models.",
    syllabus: [
      { module: "Module 1: Attention Mechanisms", lessons: ["Scaled dot-product attention", "Multi-head attention from scratch", "Transformer encoders & decoders"] },
      { module: "Module 2: Fine-Tuning & Quantization", lessons: ["LoRA and QLoRA", "PEFT fine-tuning", "Evaluation benchmarks"] },
      { module: "Module 3: RAG Pipelines & Agents", lessons: ["Vector databases", "Embedding models", "Multi-agent orchestration"] }
    ],
    prerequisites: "Linear Algebra, Calculus, Python, PyTorch foundations."
  },
  {
    id: "ai-202",
    title: "Computer Vision & Autonomous Systems",
    category: "AI / ML",
    difficulty: "Intermediate",
    duration: "8 Weeks",
    instructor: "Prof. Sarah Jenkins (Robotics & Vision Chair)",
    progress: 0,
    enrolled: false,
    technologies: ["OpenCV", "YOLOv9", "TensorFlow", "ROS2", "Python"],
    startDate: "Oct 20, 2026",
    rating: 4.88,
    enrolledCount: 290,
    description: "Build robust object tracking, semantic segmentation, 3D point cloud processing, and real-time vision pipelines for autonomous robotics and embedded vision cameras.",
    syllabus: [
      { module: "Module 1: Image Processing & Filtering", lessons: ["Spatial kernels and convolutions", "Edge detection & contours", "Color spaces"] },
      { module: "Module 2: Deep Object Detection", lessons: ["YOLO architectures", "Anchor boxes & NMS", "Real-time edge inference"] },
      { module: "Module 3: 3D Vision & Pose Tracking", lessons: ["Stereo cameras", "Pose estimation", "Tracking algorithms"] }
    ],
    prerequisites: "Python, Calculus, Basic neural network intuition."
  },
  {
    id: "ds-301",
    title: "Applied Data Science, Statistical Modeling & Analytics",
    category: "Data Science",
    difficulty: "Beginner",
    duration: "6 Weeks",
    instructor: "Prof. David K. Miller (Quantitative Fellow)",
    progress: 85,
    enrolled: true,
    technologies: ["Python", "Pandas", "NumPy", "Seaborn", "Scikit-Learn"],
    startDate: "Sep 10, 2026",
    rating: 4.86,
    enrolledCount: 710,
    description: "Master descriptive and inferential statistics, hypothesis testing, exploratory data workflows, and predictive machine learning models for decision-making.",
    syllabus: [
      { module: "Module 1: Data Wrangling & Cleaning", lessons: ["Pandas vectorization", "Imputation strategies", "Tidy data pipelines"] },
      { module: "Module 2: Statistical Inference", lessons: ["Hypothesis tests & p-values", "A/B testing methodology", "Confidence intervals"] },
      { module: "Module 3: Supervised Modeling", lessons: ["Regression and classification", "Cross validation", "Feature importance metrics"] }
    ],
    prerequisites: "High-school math and basic coding enthusiasm."
  },
  {
    id: "prg-401",
    title: "Advanced Data Structures & Algorithms Mastery",
    category: "Programming",
    difficulty: "Intermediate",
    duration: "10 Weeks",
    instructor: "Dr. Kimberly Zhao (Competitive Programming Lead)",
    progress: 78,
    enrolled: true,
    technologies: ["C++20", "Java", "Python", "Graph Theory", "Dynamic Programming"],
    startDate: "Sep 01, 2026",
    rating: 4.96,
    enrolledCount: 890,
    description: "Deep dive into trees, graphs, dynamic programming, segment trees, union-find, and asymptotic complexity to ace tier-1 engineering interviews and international ICPC contests.",
    syllabus: [
      { module: "Module 1: Complex Trees & Disjoint Sets", lessons: ["Tries and prefix querying", "Union-Find with path compression", "Segment Trees"] },
      { module: "Module 2: Advanced Graph Algorithms", lessons: ["Dijkstra, Bellman-Ford, Floyd-Warshall", "Tarjan's SCC & Bridges", "Max-Flow Min-Cut"] },
      { module: "Module 3: Dynamic Programming Patterns", lessons: ["Knapsack variations", "Bitmask DP", "Digit DP"] }
    ],
    prerequisites: "Solid grasp of at least one programming language (C++, Java, or Python)."
  },
  {
    id: "web-501",
    title: "Full-Stack Web Engineering with Modern React & Node",
    category: "Web Development",
    difficulty: "Intermediate",
    duration: "8 Weeks",
    instructor: "Devin Roy (Senior Solutions Architect)",
    progress: 64,
    enrolled: true,
    technologies: ["React 19", "Node.js", "Express", "PostgreSQL", "Tailwind CSS"],
    startDate: "Sep 15, 2026",
    rating: 4.92,
    enrolledCount: 940,
    description: "Build production-scale web applications from scratch featuring reactive state machines, REST/GraphQL APIs, relational database schemas, and micro-frontend design.",
    syllabus: [
      { module: "Module 1: Reactive UI Architectures", lessons: ["Custom hooks", "Context & state optimization", "Server components & hydration"] },
      { module: "Module 2: Scalable API & Backend", lessons: ["Express middleware", "Authentication & JWT tokens", "Database migrations & ORM"] },
      { module: "Module 3: Deployment & DevOps", lessons: ["Dockerizing full-stack apps", "CI/CD actions", "Edge caching"] }
    ],
    prerequisites: "HTML, CSS, and modern JavaScript ES6+."
  },
  {
    id: "cld-601",
    title: "Cloud Infrastructure, DevOps & Container Orchestration",
    category: "Cloud Computing",
    difficulty: "Intermediate",
    duration: "8 Weeks",
    instructor: "Rachel Nguyen (Cloud Solutions Specialist)",
    progress: 25,
    enrolled: false,
    technologies: ["AWS", "Docker", "Kubernetes", "Terraform", "GitHub Actions"],
    startDate: "Oct 25, 2026",
    rating: 4.89,
    enrolledCount: 420,
    description: "Learn infrastructure-as-code, multi-cloud deployments, high-availability clusters, Kubernetes orchestration, and automated CI/CD build pipelines.",
    syllabus: [
      { module: "Module 1: Containers & Virtualization", lessons: ["OCI standards & Dockerfiles", "Multi-stage builds", "Docker Compose microservices"] },
      { module: "Module 2: Kubernetes Fundamentals", lessons: ["Pods, Deployments, and Services", "ConfigMaps and Secrets", "Ingress controllers"] },
      { module: "Module 3: Infrastructure as Code", lessons: ["Terraform providers", "State locking & remote backends", "Immutable deployment patterns"] }
    ],
    prerequisites: "Basic Linux CLI & networking concepts."
  },
  {
    id: "iot-701",
    title: "Industrial IoT, Edge Computing & Smart Sensor Networks",
    category: "IoT",
    difficulty: "Beginner",
    duration: "6 Weeks",
    instructor: "Prof. Kenneth Meyer (Embedded Systems Lab)",
    progress: 15,
    enrolled: false,
    technologies: ["ESP32", "MQTT", "FreeRTOS", "Raspberry Pi", "Zigbee"],
    startDate: "Nov 05, 2026",
    rating: 4.81,
    enrolledCount: 235,
    description: "Build connected edge hardware devices, ingest sensor telemetry streams over lightweight MQTT brokers, and design low-power smart laboratory sensors.",
    syllabus: [
      { module: "Module 1: Embedded Microcontrollers", lessons: ["ESP32 GPIO & ADC", "I2C, SPI, and UART protocols", "FreeRTOS task scheduling"] },
      { module: "Module 2: Telemetry & Network Protocols", lessons: ["MQTT brokers and topics", "CoAP protocols", "Payload optimization"] },
      { module: "Module 3: Edge Inference", lessons: ["TinyML on ESP32", "Threshold alerting", "Cloud ingestion dashboard"] }
    ],
    prerequisites: "Basic C or C++ programming familiarity."
  },
  {
    id: "mkt-801",
    title: "Technical Product Marketing & Modern Digital Growth",
    category: "Digital Marketing",
    difficulty: "Beginner",
    duration: "5 Weeks",
    instructor: "Amanda Vance (VP Product Growth)",
    progress: 0,
    enrolled: false,
    technologies: ["Google Analytics 4", "SEO Tools", "Growth Experiments", "A/B Testing", "Content Strategy"],
    startDate: "Nov 12, 2026",
    rating: 4.78,
    enrolledCount: 310,
    description: "Discover data-backed acquisition strategies for tech startups, developer marketing, algorithmic SEO, conversion funnel analytics, and viral loop design.",
    syllabus: [
      { module: "Module 1: Technical SEO & Organic Discovery", lessons: ["Core Web Vitals", "Structured schema markup", "Keyword clustering"] },
      { module: "Module 2: Funnel Engineering & Tracking", lessons: ["Event instrumentation in GA4", "Cohort retention analysis", "UTM governance"] },
      { module: "Module 3: Viral Loops & Developer Relations", lessons: ["Open source traction strategies", "Developer onboarding funnel optimization"] }
    ],
    prerequisites: "No prior technical prerequisites required."
  }
];
