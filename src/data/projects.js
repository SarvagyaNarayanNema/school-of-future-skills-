/**
 * School of Future Skills — Department Projects & Digital Creations Catalog
 * Single Source of Truth for verified student & departmental projects.
 *
 * All descriptions are verified against live deployments (20–40 words).
 * Real browser screenshots captured from live URLs in /projects/
 */

export const PROJECT_CATEGORIES = [
  "All Projects",
  "Personal Portfolios",
  "Web Applications",
  "3D & Interactive Experiences",
  "Technology Communities",
  "Education & Management",
  "Commercial Websites",
  "Department Platforms"
];

export const initialProjects = [
  {
    id: "proj-dimpy-cosmos",
    name: "Dimpy's COSMOS",
    category: "3D & Interactive Experiences",
    url: "https://dimpycosmos.lovable.app/",
    isAvailable: true,
    linkVerificationStatus: "Verified Active (HTTP 200)",
    publicationStatus: "Production Live",
    creators: "Dimpy (Student Innovator)",
    studentTeam: "Dimpy (Student Innovator)",
    year: "Academic Year 2025–2026",
    status: "Production Live",
    featured: true,
    isProjectOfMonth: true,
    image: "/projects/dimpy-cosmos.png",
    description: "An interactive 3D solar system exploration platform where users fly through the cosmos to discover planets, orbiting moons, celestial rings, and deep-space missions with dynamic orbital physics and interactive gesture navigation.",
    technologies: ["Three.js", "WebXR", "React", "Tailwind CSS", "Vite"],
    highlights: [
      "Interactive 3D celestial rendering & orbital physics",
      "Full eight-planet planetary system & planetary moon telemetry",
      "Dynamic gesture controls and smooth camera orbits"
    ],
    upvotes: 428,
    stars: 312
  },
  {
    id: "proj-pixel-me-faizan",
    name: "PixelMeFaizan",
    category: "Personal Portfolios",
    url: "https://pixelmefaizan.vercel.app/",
    isAvailable: true,
    linkVerificationStatus: "Verified Active (HTTP 200)",
    publicationStatus: "Production Live",
    creators: "Syed Faizan Ali (BCA AI & ML, SGSU Bhopal)",
    studentTeam: "Syed Faizan Ali (BCA AI & ML)",
    year: "3rd Year Specialization",
    status: "Production Live",
    featured: true,
    isProjectOfMonth: false,
    image: "/projects/pixelmefaizan.png",
    description: "Official digital portfolio of Syed Faizan Ali, BCA student specializing in AI & Machine Learning at SGSU Bhopal, showcasing interactive 3D web experiences, machine learning applications, and competitive hackathon engineering capstones.",
    technologies: ["React", "Three.js", "Vite", "Tailwind CSS", "AI/ML"],
    highlights: [
      "Dark-mode 3D interactive hero experience",
      "Curated AI & ML experimental model showcase",
      "Demonstrated competitive hackathon engineering awards"
    ],
    upvotes: 384,
    stars: 247
  },
  {
    id: "proj-sarvagya-portfolio",
    name: "Sarvagya's Portfolio",
    category: "Personal Portfolios",
    url: "https://sarvagyanarayannema.netlify.app/",
    isAvailable: true,
    linkVerificationStatus: "Verified Active (HTTP 200)",
    publicationStatus: "Production Live",
    creators: "Sarvagya Narayan Nema (Student Technologist)",
    studentTeam: "Sarvagya Narayan Nema",
    year: "Academic Year 2025–2026",
    status: "Production Live",
    featured: true,
    isProjectOfMonth: false,
    image: "/projects/sarvagya-portfolio.png",
    description: "Cinematic developer portfolio of Sarvagya Narayan Nema, creative technologist and AI student builder, presenting engineering capstones, digital interface innovations, and full-stack software architectures with modern typography and motion design.",
    technologies: ["React", "Vite", "Tailwind CSS", "JavaScript", "Motion UI"],
    highlights: [
      "Cinematic dark aesthetic with custom typography",
      "Interactive technical project case studies",
      "Fluid responsive transitions and micro-interactions"
    ],
    upvotes: 412,
    stars: 289
  },
  {
    id: "proj-binary-battle-club",
    name: "Binary Battle Club",
    category: "Technology Communities",
    url: "https://binarybattleclub.vercel.app/",
    isAvailable: true,
    linkVerificationStatus: "Verified Active (HTTP 200)",
    publicationStatus: "Production Live",
    creators: "Binary Battle Student Council (SGSU)",
    studentTeam: "Binary Battle Club Student Leads",
    year: "Ecosystem Initiative",
    status: "Production Live",
    featured: true,
    isProjectOfMonth: false,
    image: "/projects/binary-battle-club.png",
    description: "The official AI coding and competitive programming club platform of Scope Global Skills University, Bhopal. Run by students for students, featuring live coding workshops, AI toolkits, hackathon teams, and algorithmic battles.",
    technologies: ["React", "Next.js", "Tailwind CSS", "Competitive Programming"],
    highlights: [
      "Official coding society portal of SGSU Bhopal",
      "Live algorithmic contests & problem solving arenas",
      "Student mentorship workshops and AI resource hub"
    ],
    upvotes: 465,
    stars: 356
  },
  {
    id: "proj-spendwise",
    name: "SpendWise",
    category: "Web Applications",
    url: "https://magenta-flan-77eae8.netlify.app/",
    isAvailable: true,
    linkVerificationStatus: "Verified Active (HTTP 200)",
    publicationStatus: "Production Live",
    creators: "Department Student Builders",
    studentTeam: "FinTech Innovation Team",
    year: "Capstone Innovation",
    status: "Production Live",
    featured: false,
    isProjectOfMonth: false,
    image: "/projects/spendwise.png",
    description: "Personal financial intelligence and expense management web application featuring automated expense tracking, categorical budget visualization, spending analytics, and specialized festival budget planning tools with responsive dark-mode styling.",
    technologies: ["React", "Vite", "Chart.js", "Tailwind CSS"],
    highlights: [
      "Interactive categorical expense visualizer",
      "Dedicated festival & seasonal budget planner",
      "Zero-latency client-side persistence and export"
    ],
    upvotes: 298,
    stars: 184
  },
  {
    id: "proj-edutrack-pro",
    name: "EduTrack Pro",
    category: "Education & Management",
    url: "https://project-cpp.netlify.app/",
    isAvailable: true,
    linkVerificationStatus: "Verified Active (HTTP 200)",
    publicationStatus: "Production Live",
    creators: "Department Student Builders",
    studentTeam: "EdTech Engineering Group",
    year: "Academic Software Capstone",
    status: "Production Live",
    featured: false,
    isProjectOfMonth: false,
    image: "/projects/edutrack-pro.png",
    description: "Academic administration and attendance tracking web portal engineered with interactive Chart.js analytics, student roster visualization, attendance percentage monitoring, and automated performance reporting for modern educational workflows.",
    technologies: ["HTML5", "CSS3 Glassmorphism", "Chart.js", "JavaScript"],
    highlights: [
      "Interactive Chart.js student attendance telemetry",
      "Cohort analytics and low-attendance alert triggers",
      "Clean glassmorphism UI with calendar scheduling"
    ],
    upvotes: 276,
    stars: 162
  },
  {
    id: "proj-aashima-mall",
    name: "Aashima Mall",
    category: "Commercial Websites",
    url: "https://aashima-mall.netlify.app/",
    isAvailable: true,
    linkVerificationStatus: "Verified Active (HTTP 200)",
    publicationStatus: "Production Live",
    creators: "Student Web Studio (Commercial Client Project)",
    studentTeam: "Digital Media & Web Studio",
    year: "Commercial Practice Capstone",
    status: "Production Live",
    featured: false,
    isProjectOfMonth: false,
    image: "/projects/aashima-mall.png",
    description: "Commercial digital portal for Aashima Mall on Hoshangabad Road, Bhopal, showcasing premium retail store directories, multi-cuisine dining options, Cinépolis multiplex entertainment listings, and brand partner leasing inquiries.",
    technologies: ["React", "Tailwind CSS", "Vite", "Responsive Design"],
    highlights: [
      "Comprehensive retail brand & store directory",
      "Cinépolis movie showtime & dining venue guides",
      "Responsive commercial layout designed for Bhopal shoppers"
    ],
    upvotes: 315,
    stars: 198
  },
  {
    id: "proj-school-of-future-skills",
    name: "School of Future Skills (V1 Platform)",
    category: "Department Platforms",
    url: "https://schooloffutureskills.netlify.app/",
    isAvailable: true,
    linkVerificationStatus: "Verified Active (HTTP 200)",
    publicationStatus: "Production Live (Historical V1 Platform)",
    creators: "Department Engineering Team",
    studentTeam: "FSIT Digital Systems Core",
    year: "Institutional Deployment",
    status: "Production Live",
    featured: false,
    isProjectOfMonth: false,
    image: "/projects/school-of-future-skills.png",
    description: "Departmental digital platform and student learning ecosystem featuring emerging curriculum pathways, hackathon arenas, laboratory challenges, project catalogs, and campus technical initiatives for Scope Global Skills University.",
    technologies: ["React", "Vite", "Tailwind CSS", "FastAPI"],
    highlights: [
      "Core historical student portal deployment on Netlify",
      "Hackathon challenge arena and syllabus explorer",
      "Modular responsive departmental digital portal"
    ],
    upvotes: 489,
    stars: 342
  },
  {
    id: "proj-aegis-3d",
    name: "Aegis 3D",
    category: "3D & Interactive Experiences",
    url: "",
    isAvailable: false,
    linkVerificationStatus: "Verification Pending / Offline",
    publicationStatus: "In Development / Verification Required",
    creators: "Department WebXR Research Lab",
    studentTeam: "WebXR Research Cohort",
    year: "Research Initiative",
    status: "Verification Pending",
    featured: false,
    isProjectOfMonth: false,
    image: "/projects/aegis-3d.svg",
    description: "Experimental 3D visualization and WebXR architectural engine for procedural graphics and spatial simulation. Currently undergoing internal performance benchmarking and departmental verification prior to public URL deployment.",
    technologies: ["Three.js", "WebXR", "GLSL"],
    highlights: [
      "Spatial WebXR simulation and real-time shader pipelines",
      "Hardware-accelerated procedural geometry rendering",
      "Internal departmental verification currently in progress"
    ],
    upvotes: 192,
    stars: 87
  }
];
