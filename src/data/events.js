export const EVENT_CATEGORIES = [
  "All",
  "Hackathons",
  "Workshops",
  "Seminars",
  "Tech Fests",
  "Competitions",
  "Guest Lectures"
];

export const initialEvents = [
  {
    id: "evt-01",
    title: "InnovateX: 48-Hour National AI & Systems Hackathon",
    category: "Hackathons",
    date: "Oct 24-26, 2026",
    time: "09:00 AM onwards",
    venue: "Future Skills Innovation Atrium & Virtual Discord",
    speaker: "Keynote: Dr. Liam Sterling (Lead Systems Architect)",
    speakerBio: "Dr. Liam Sterling has designed hyperscale distributed storage engines and mentors collegiate engineering teams worldwide.",
    description: "Build groundbreaking solutions across autonomous agents, zero-knowledge proofs, climate telemetry, and decentralized compute. 48 hours of rapid prototyping, mentorship, and high-impact demos.",
    totalSeats: 250,
    seatsRemaining: 42,
    registered: false,
    registrationDeadline: "Oct 20, 2026",
    schedule: [
      { time: "Day 1 - 09:00 AM", item: "Opening Keynote & Problem Statement Release" },
      { time: "Day 1 - 01:00 PM", item: "First Mentorship Review & Architecture Signoff" },
      { time: "Day 2 - 10:00 AM", item: "Midway Checkpoint & Lightning Tech Talks" },
      { time: "Day 3 - 12:00 PM", item: "Final Code Freeze & Jury Demos" }
    ]
  },
  {
    id: "evt-02",
    title: "Quantum Computing & Cryptographic Transition Workshop",
    category: "Workshops",
    date: "Nov 04, 2026",
    time: "02:00 PM - 05:30 PM",
    venue: "Advanced Computing Lab 402",
    speaker: "Dr. Evelyn Wu (Quantum Algorithms Specialist)",
    speakerBio: "Dr. Evelyn Wu specializes in post-quantum lattice cryptography and quantum circuit simulation.",
    description: "Hands-on exploration of Qiskit quantum circuits, superposition, entanglement, and post-quantum cryptographic primitives replacing RSA.",
    totalSeats: 60,
    seatsRemaining: 14,
    registered: true,
    registrationDeadline: "Nov 01, 2026",
    schedule: [
      { time: "02:00 PM", item: "Quantum state vectors and Bloch spheres" },
      { time: "03:15 PM", item: "Simulating Bell states and Grover search in Python" },
      { time: "04:30 PM", item: "Post-quantum lattice signatures & NIST standards" }
    ]
  },
  {
    id: "evt-03",
    title: "Keynote Seminar: The Next Decade in Distributed Cloud & Edge AI",
    category: "Seminars",
    date: "Nov 12, 2026",
    time: "10:30 AM - 12:30 PM",
    venue: "Auditorium Hall B",
    speaker: "Siddharth Rao (Principal Cloud Architect)",
    speakerBio: "Siddharth oversees low-latency edge orchestration for global media streaming services.",
    description: "An architectural deep-dive into how 5G, edge micro-datacenters, and specialized tensor accelerators are eliminating central cloud round-trip bottlenecks.",
    totalSeats: 300,
    seatsRemaining: 88,
    registered: false,
    registrationDeadline: "Nov 10, 2026",
    schedule: [
      { time: "10:30 AM", item: "Welcome Address & State of Cloud Infrastructure" },
      { time: "11:15 AM", item: "Case studies: Sub-10ms edge model serving" },
      { time: "12:00 PM", item: "Open Q&A with Engineering Students" }
    ]
  },
  {
    id: "evt-04",
    title: "Nexus 2026: Annual Inter-Collegiate Technology Festival",
    category: "Tech Fests",
    date: "Nov 20-22, 2026",
    time: "All Day",
    venue: "Department Grounds & Exhibition Complex",
    speaker: "Multiple Industry Mentors & Alumni Panelists",
    speakerBio: "Featuring 20+ prominent technology leaders, open-source maintainers, and visionary student innovators.",
    description: "Three action-packed days featuring hardware robotics battles, Capture The Flag (CTF) cyber war-games, UI/UX design sprints, and paper presentations.",
    totalSeats: 1000,
    seatsRemaining: 340,
    registered: false,
    registrationDeadline: "Nov 18, 2026",
    schedule: [
      { time: "Nov 20", item: "Robo-Sumo, Line Follower & Hardware Arena Battles" },
      { time: "Nov 21", item: "24-Hour Capture The Flag (CTF) Cyber Defense Siege" },
      { time: "Nov 22", item: "Project Exhibition, Tech Expo & Award Gala" }
    ]
  },
  {
    id: "evt-05",
    title: "Algorithmic Code Blitz: Speed Programming Tournament",
    category: "Competitions",
    date: "Oct 18, 2026",
    time: "04:00 PM - 07:00 PM",
    venue: "Virtual Contest Platform & Lab 101",
    speaker: "Future Skills Competitive Programming Chapter",
    speakerBio: "Organized by ICPC regional finalists and algorithm problem setters.",
    description: "Solve 6 algorithmic challenges of escalating difficulty under tight runtime and memory bounds. Top scorers receive sponsored certificates and badge honors.",
    totalSeats: 150,
    seatsRemaining: 21,
    registered: false,
    registrationDeadline: "Oct 17, 2026",
    schedule: [
      { time: "04:00 PM", item: "Warmup problem & environment test" },
      { time: "04:30 PM", item: "Contest begins (6 algorithm problems)" },
      { time: "06:30 PM", item: "Leaderboard unfreeze & live editorial" }
    ]
  },
  {
    id: "evt-06",
    title: "Guest Lecture: Building Scalable Vector Search Engines from Zero",
    category: "Guest Lectures",
    date: "Nov 28, 2026",
    time: "11:00 AM - 01:00 PM",
    venue: "Seminar Hall 3",
    speaker: "Dr. Maya Hansen (Database Research Scientist)",
    speakerBio: "Dr. Maya Hansen holds patents in high-dimensional HNSW index graph navigation and vector database indexing.",
    description: "Understand the mathematical intuition and memory layout behind HNSW (Hierarchical Navigable Small World) graphs and product quantization for fast approximate nearest neighbor search.",
    totalSeats: 120,
    seatsRemaining: 45,
    registered: false,
    registrationDeadline: "Nov 26, 2026",
    schedule: [
      { time: "11:00 AM", item: "The curse of dimensionality in vector search" },
      { time: "11:45 AM", item: "HNSW graph traversal & trade-offs" },
      { time: "12:30 PM", item: "Live benchmark demos with 10M embeddings" }
    ]
  }
];
