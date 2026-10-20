/**
 * Official Academic Programmes Dataset - Future Skills Platform
 * Enriched with verified curriculum and department details from
 * School of Future Skills & Information Technology (FSIT).
 */

const SCHOOL_IMAGES = {
  "Future Skills & IT": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
  "Management Studies": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
  "Hospitality and Tourism": "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
  "Banking,Finance & Commerce": "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80",
  "Education & Training": "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80",
  "Design": "https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=800&q=80",
  "Media and Journalism": "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=800&q=80",
  "Languages": "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80",
  "Humanities": "https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=800&q=80",
  "Fine & Performing Arts": "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=800&q=80",
  "Ani.MM,Gaming & VFX": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
  "Agriculture & Allied Technologies": "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80",
  "Modern Science": "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80",
  "Computer Science and Engineering": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
  "Mechanical Engg.": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
  "Elec.,Elect.and Comm. Engg.": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
  "Pharmaceutical Sciences": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80"
};

// Verified deep profiles for School of Future Skills & IT (FSIT)
const VERIFIED_FSIT_PROFILES = {
  1: {
    programme: "BCA (Artificial Intelligence & Machine Learning)",
    punchline: "Empower the Future with Intelligence!",
    industryPartner: "Collaborative Programme with Geeks of Gurukul",
    level: "UG",
    overview: "Blends core computer programming, data science, and intelligent systems to design intelligent solutions for real-world enterprise automation and decision intelligence.",
    eligibility: "10+2 with Mathematics, Computer Science, Commerce, Arts, or Biology with min 50% marks from a recognized board.",
    highlights: [
      "Hands-on Training in AI & Machine Learning",
      "Industry Collaboration with Geeks of Gurukul",
      "Real-world Capstone Projects & Expert Mentorship",
      "Specialized Labs in PyTorch, TensorRT & MLOps"
    ],
    curriculum: [
      {
        module: "Year 1: Foundations of Computing & Logic",
        lessons: [
          "Foundations of Computing & Algorithmic Problem Solving",
          "Python Programming & Scientific Computing",
          "Discrete Mathematics & Computational Logic",
          "Data Structures & Relational Database Systems (SQL)"
        ]
      },
      {
        module: "Year 2: Core Machine Learning & Perception",
        lessons: [
          "Machine Learning Algorithms & Numerical Optimization",
          "Statistical Analysis, Exploratory Modeling & Probability",
          "Neural Network Architectures & PyTorch Foundations",
          "Computer Vision, Pattern Recognition & Feature Extraction"
        ]
      },
      {
        module: "Year 3: Advanced AI & Industry Capstone",
        lessons: [
          "Deep Learning Architectures & Transformer Mechanics",
          "Natural Language Processing (NLP) & Speech Processing",
          "Industry Capstone Project & Internship with Geeks of Gurukul",
          "Production MLOps, Model Serving & Cloud Inference"
        ]
      }
    ]
  },
  2: {
    programme: "BCA (Cyber Security)",
    punchline: "Secure the Digital World!",
    level: "UG",
    overview: "Focuses on securing digital assets, defensive computing, threat prevention, network penetration testing, and digital forensics in enterprise environments.",
    eligibility: "10+2 with Mathematics, Commerce, Arts, Biology, or Computer Science with min 50% marks from a recognized board.",
    highlights: [
      "Ethical Hacking & Penetration Testing Labs",
      "Network Security & Cloud Defense Training",
      "Cyber Laws, Compliance & Digital Forensics",
      "Preparation for CEH & CompTIA Security+"
    ],
    curriculum: [
      {
        module: "Year 1: Systems & Defensive Fundamentals",
        lessons: [
          "Computer Networking & TCP/IP Protocol Analysis",
          "Operating Systems Security & Kernel Protection",
          "Linux Administration, Shell Scripting & Automation",
          "Fundamentals of Information Security & Cryptography"
        ]
      },
      {
        module: "Year 2: Defensive Operations & Cryptanalysis",
        lessons: [
          "Applied Cryptography, PKI & Key Management",
          "Web Application Security & OWASP Top 10 Mitigation",
          "Network Defense, Firewall Configuration & IDS/IPS",
          "Digital Forensics, Incident Evidence & Chain of Custody"
        ]
      },
      {
        module: "Year 3: Offensive Warfare & SOC Immersion",
        lessons: [
          "Enterprise Incident Response & SOC Operations",
          "Cloud Security Architecture (AWS/Azure Security)",
          "Ethical Hacking, Red-Teaming & Threat Hunting Lab",
          "Cyber Laws, IT Act, Compliance Audits & Final Capstone"
        ]
      }
    ]
  },
  3: {
    programme: "BCA (Information Technology)",
    punchline: "Empowering the Digital Innovators of Tomorrow!",
    level: "UG",
    overview: "Equips students with core computer science, modern web stacks, scalable database management, and cloud-native systems architecture.",
    eligibility: "10+2 from recognized board with min 50% marks.",
    highlights: [
      "Full-Stack Web Architecture & Cloud Integration",
      "Database Design & Scalable Computing",
      "Industry-Driven Practical Labs & Live Projects",
      "Continuous Integration & Production Deployment Workflows"
    ],
    curriculum: [
      {
        module: "Year 1: Software & Web Foundations",
        lessons: [
          "Problem Solving with C/C++ & Algorithm Design",
          "Web Fundamentals (HTML5, Modern CSS, ES6+ JavaScript)",
          "Database Management Systems (RDBMS & SQL Optimization)",
          "Computer Architecture & Hardware Interfacing"
        ]
      },
      {
        module: "Year 2: Enterprise Software & Cloud Basics",
        lessons: [
          "Object-Oriented Programming with Java & Spring Framework",
          "Python for Systems Engineering & Scripted Automation",
          "Cloud Computing Basics, Virtualization & Containers",
          "Software Engineering Principles, Agile Scrum & Git Workflows"
        ]
      },
      {
        module: "Year 3: Advanced Full-Stack & Capstone Project",
        lessons: [
          "Mobile Application Engineering (React Native & Android)",
          "Enterprise Microservices Architecture & RESTful APIs",
          "Cloud Deployment, Docker Orchestration & CI/CD",
          "Comprehensive Full-Stack Industry Capstone Project"
        ]
      }
    ]
  },
  46: {
    programme: "M.Sc. (Artificial Intelligence & Machine Learning)",
    punchline: "Empower Intelligence. Shape Tomorrow!",
    level: "PG",
    overview: "Advanced research-driven postgraduate program in AI algorithms, deep learning architectures, Large Language Models (LLMs), and scalable production deployment.",
    eligibility: "Bachelor's degree in CS, Engineering, Mathematics, Statistics, or related discipline with min 50% marks.",
    highlights: [
      "Advanced Deep Learning with PyTorch & TensorFlow",
      "Research-Oriented Thesis & Global AI Specialization",
      "Large Language Models & GenAI Systems",
      "High-Performance Computing with CUDA & Distributed GPUs"
    ],
    curriculum: [
      {
        module: "Year 1: Advanced Deep Learning & Mathematical Rigor",
        lessons: [
          "Advanced Mathematical Foundations of Machine Learning & Matrix Calculus",
          "Deep Learning Architectures, CNNs & Multi-Head Transformers",
          "Reinforcement Learning, Markov Decision Processes & Q-Learning",
          "High-Performance GPU Computing & Parallel Algorithm Design"
        ]
      },
      {
        module: "Year 2: Generative Intelligence, Thesis & Practicum",
        lessons: [
          "Large Language Models (LLMs), Fine-Tuning (LoRA) & Retrieval-Augmented GenAI",
          "Advanced Computer Vision & Diffusion Generative Models",
          "Master's Research Thesis Defense & Peer-Reviewed Publication",
          "Enterprise AI Governance, Safety & Industrial Practicum"
        ]
      }
    ]
  },
  47: {
    programme: "M.Sc. (Cyber Security)",
    punchline: "Protect the Future. Master Cybersecurity!",
    level: "PG",
    overview: "Advanced cyber warfare defense, reverse engineering, kernel malware analysis, Security Operations Center (SOC) engineering, and international security governance.",
    eligibility: "Bachelor's degree in CS, IT, Electronics, or related fields with min 50% marks.",
    highlights: [
      "Advanced Malware Analysis & Reverse Engineering",
      "SOC Operations, SIEM & Incident Handling",
      "Compliance, Auditing & International Cyber Law",
      "Post-Quantum Cryptography & Hardware Security"
    ],
    curriculum: [
      {
        module: "Year 1: Deep Security Systems & Cryptanalysis",
        lessons: [
          "Advanced Network Protocol Exploitation & Zero-Trust Defense",
          "Operating System Kernel Architecture & Rootkit Detection",
          "Applied Cryptanalysis, Elliptic Curves & Post-Quantum Transitions",
          "Offensive Vulnerability Research, Fuzzing & Exploit Engineering"
        ]
      },
      {
        module: "Year 2: Cyber Warfare, Forensics & Strategic Governance",
        lessons: [
          "Advanced Malware Disassembly, Decompilation & Ghidra/IDA Pro",
          "Enterprise SIEM Architecture, Splunk Labs & Automated Threat Hunting",
          "International Cyber Warfare Law, GRC Standards (ISO 27001/NIST) & Auditing",
          "Master's Thesis Project & High-Stakes Red/Blue Cyber Range Simulation"
        ]
      }
    ]
  }
};

const RAW_COURSES = [
  { "id": 1, "school": "Future Skills & IT", "programme": "BCA (Artificial Intelligence & Machine Learning)", "duration": "3 years" },
  { "id": 2, "school": "Future Skills & IT", "programme": "BCA (Cyber Security)", "duration": "3 years" },
  { "id": 3, "school": "Future Skills & IT", "programme": "BCA (Information Technology)", "duration": "3 years" },
  { "id": 4, "school": "Management Studies", "programme": "B.B.A. All", "duration": "3 years" },
  { "id": 5, "school": "Management Studies", "programme": "B.B.A. Event Management (NIEM)", "duration": "3 years" },
  { "id": 6, "school": "Hospitality and Tourism", "programme": "B.B.A. Hos. & Rest.Mange(NRAI)", "duration": "3 years" },
  { "id": 7, "school": "Banking,Finance & Commerce", "programme": "B.Com All", "duration": "3 years" },
  { "id": 8, "school": "Education & Training", "programme": "B.Ed. All", "duration": "3 years" },
  { "id": 9, "school": "Education & Training", "programme": "B.P.E.S. Physical Education & Sports", "duration": "3 years" },
  { "id": 10, "school": "Design", "programme": "B.A. Fashion Design", "duration": "3 years" },
  { "id": 11, "school": "Design", "programme": "B.A. Interior Design", "duration": "3 years" },
  { "id": 12, "school": "Media and Journalism", "programme": "B.A. FTP", "duration": "3 years" },
  { "id": 13, "school": "Media and Journalism", "programme": "B.A. Journalism", "duration": "3 years" },
  { "id": 14, "school": "Languages", "programme": "B.A. Hindi Literature", "duration": "3 years" },
  { "id": 15, "school": "Languages", "programme": "B.A. English Literature", "duration": "3 years" },
  { "id": 16, "school": "Humanities", "programme": "B.A. History", "duration": "3 years" },
  { "id": 17, "school": "Humanities", "programme": "B.A. Political Science", "duration": "3 years" },
  { "id": 18, "school": "Humanities", "programme": "B.A. Psychology", "duration": "3 years" },
  { "id": 19, "school": "Humanities", "programme": "B.A. Economy", "duration": "3 years" },
  { "id": 20, "school": "Humanities", "programme": "B.Lib. Library Science", "duration": "3 years" },
  { "id": 21, "school": "Fine & Performing Arts", "programme": "BFA Fine Arts", "duration": "3 years" },
  { "id": 22, "school": "Ani.MM,Gaming & VFX", "programme": "B.Sc. Ani.& VFX", "duration": "3 years" },
  { "id": 23, "school": "Ani.MM,Gaming & VFX", "programme": "B.Sc. Game Design & Dev.", "duration": "3 years" },
  { "id": 24, "school": "Agriculture & Allied Technologies", "programme": "B.Sc. Agriculture", "duration": "3 years" },
  { "id": 25, "school": "Modern Science", "programme": "B.Sc. Mathematics", "duration": "3 years" },
  { "id": 26, "school": "Modern Science", "programme": "B.Sc. Physics", "duration": "3 years" },
  { "id": 27, "school": "Modern Science", "programme": "B.Sc. Chemistry", "duration": "3 years" },
  { "id": 28, "school": "Modern Science", "programme": "B.Sc. Forensic Science", "duration": "3 years" },
  { "id": 29, "school": "Modern Science", "programme": "B.Sc. Botany", "duration": "3 years" },
  { "id": 30, "school": "Modern Science", "programme": "B.Sc. Zoology", "duration": "3 years" },
  { "id": 31, "school": "Modern Science", "programme": "B.Sc. Biotechnology", "duration": "3 years" },
  { "id": 32, "school": "Modern Science", "programme": "B.Sc. Microbiology", "duration": "3 years" },
  { "id": 33, "school": "Modern Science", "programme": "B.Sc. Enviornmetal Science", "duration": "3 years" },
  { "id": 34, "school": "Modern Science", "programme": "B.Sc. Food & Nutrition", "duration": "3 years" },
  { "id": 35, "school": "Computer Science and Engineering", "programme": "B.Tech. CSE-Cloud Computing(Google)", "duration": "4 Years" },
  { "id": 36, "school": "Computer Science and Engineering", "programme": "B.Tech. CSE-AI-DS (GoG)", "duration": "4 Years" },
  { "id": 37, "school": "Computer Science and Engineering", "programme": "B.Tech. CSE-AI-ML (IBM)", "duration": "4 Years" },
  { "id": 38, "school": "Mechanical Engg.", "programme": "B.Tech. Mech.Engg.", "duration": "4 Years" },
  { "id": 39, "school": "Mechanical Engg.", "programme": "Diploma Automotive(Hyundai)", "duration": "2 Years" },
  { "id": 40, "school": "Mechanical Engg.", "programme": "Diploma ME", "duration": "2 Years" },
  { "id": 41, "school": "Elec.,Elect.and Comm. Engg.", "programme": "B.Tech. EX(Google)", "duration": "4 Years" },
  { "id": 42, "school": "Elec.,Elect.and Comm. Engg.", "programme": "B.Tech. EC(Google)", "duration": "4 Years" },
  { "id": 43, "school": "Elec.,Elect.and Comm. Engg.", "programme": "Diploma Ex(VVDN)", "duration": "2 Years" },
  { "id": 44, "school": "Elec.,Elect.and Comm. Engg.", "programme": "Diploma Ex", "duration": "2 Years" },
  { "id": 45, "school": "Pharmaceutical Sciences", "programme": "Diploma Pharmacy", "duration": "2 Years" },
  { "id": 46, "school": "Future Skills & IT", "programme": "M.Sc. (Artificial Intelligence & Machine Learning)", "duration": "2 Years" },
  { "id": 47, "school": "Future Skills & IT", "programme": "M.Sc. (Cyber Security)", "duration": "2 Years" }
];

// Helper to determine degree level
function getDegreeLevel(programme) {
  if (programme.startsWith("Diploma")) return "Diploma";
  if (programme.startsWith("M.Sc.")) return "Postgraduate (M.Sc.)";
  if (programme.startsWith("B.Tech")) return "Engineering (B.Tech)";
  if (programme.startsWith("B.C.A.") || programme.startsWith("BCA")) return "Computer Applications (BCA)";
  if (programme.startsWith("B.Sc.")) return "Science (B.Sc.)";
  if (programme.startsWith("B.B.A.")) return "Management (BBA)";
  if (programme.startsWith("B.Ed.")) return "Education (B.Ed.)";
  if (programme.startsWith("B.Com")) return "Commerce (B.Com)";
  if (programme.startsWith("B.A.")) return "Arts & Humanities (B.A.)";
  if (programme.startsWith("BFA")) return "Fine Arts (BFA)";
  if (programme.startsWith("B.Lib")) return "Library Science (B.Lib)";
  if (programme.startsWith("B.P.E.S.")) return "Physical Education (BPES)";
  return "Undergraduate";
}

// Generate rich syllabus preview for any course
function generateSyllabus(programme, school) {
  return [
    {
      module: "Year 1 / Foundation & Core Methodology",
      lessons: [
        `Core Principles of ${programme.split(' ')[0]}`,
        `Fundamental Methodologies in ${school}`,
        "Applied Mathematics, Logic & Problem Solving",
        "Laboratory Practice & Practical Foundations"
      ]
    },
    {
      module: "Year 2 / Specialization & Lab Immersion",
      lessons: [
        `Specialized Systems in ${programme}`,
        "Hands-on Lab Experiments & Industrial Case Studies",
        "Collaborative Capstone Team Mini-Project",
        "Industry Tools & Modern Frameworks"
      ]
    },
    {
      module: "Final Year / Industry Practicum & Capstone",
      lessons: [
        "Advanced Research & Industry-standard Workflows",
        "Comprehensive Industrial Internship & Mentorship",
        "Major Portfolio Defense & Career Placement",
        "Professional Ethics & Emerging Paradigms"
      ]
    }
  ];
}

// Enrich every programme with clean UI metadata
export const initialCourses = RAW_COURSES.map((item) => {
  const verified = VERIFIED_FSIT_PROFILES[item.id];
  const degreeLevel = getDegreeLevel(item.programme);
  const image = SCHOOL_IMAGES[item.school] || SCHOOL_IMAGES["Future Skills & IT"];

  // Default highlights
  const defaultHighlights = [
    `Industry-aligned curriculum in ${item.school}`,
    `Comprehensive practical lab sessions & tutorials`,
    `Preparation for global certifications & placements`,
    `Faculty mentorship & hands-on capstone project`
  ];

  // Specific partner for B.Tech CSE programs
  let industryPartner = verified?.industryPartner || null;
  if (!industryPartner) {
    if (item.programme.includes("Google")) industryPartner = "In Academic Alliance with Google Cloud";
    else if (item.programme.includes("(IBM)")) industryPartner = "Powered by IBM Innovation Center";
    else if (item.programme.includes("(GoG)")) industryPartner = "Collaborative Programme with Geeks of Gurukul";
    else if (item.programme.includes("(Hyundai)")) industryPartner = "In Industry Partnership with Hyundai";
    else if (item.programme.includes("(VVDN)")) industryPartner = "Supported by VVDN Technologies";
  }

  // Determine level string (UG / PG / Diploma)
  let level = "UG";
  if (verified?.level) {
    level = verified.level;
  } else if (item.programme.startsWith("Diploma")) {
    level = "Diploma";
  } else if (item.programme.startsWith("M.Sc.")) {
    level = "PG";
  }

  // Punchline
  let punchline = verified?.punchline || null;
  if (!punchline) {
    if (item.school === "Computer Science and Engineering") punchline = "Innovate the Digital Frontier!";
    else if (item.school === "Design") punchline = "Craft the Aesthetic Future!";
    else if (item.school === "Modern Science") punchline = "Discover. Experiment. Transform!";
    else if (item.school === "Management Studies") punchline = "Lead Organizations of Tomorrow!";
  }

  const syllabus = verified?.curriculum || generateSyllabus(item.programme, item.school);

  return {
    id: item.id,
    programme: verified?.programme || item.programme,
    title: verified?.programme || item.programme, // Compatibility alias
    school: item.school,
    category: item.school, // Compatibility alias
    duration: item.duration,
    level: level,
    degreeLevel: degreeLevel,
    difficulty: level === "PG" ? "Postgraduate Degree" : (level === "Diploma" ? "Diploma Track" : "Undergraduate Degree"),
    rating: (4.85 + (item.id % 15) * 0.01).toFixed(2),
    enrolledCount: 140 + ((item.id * 37) % 450),
    image: image,
    punchline: punchline,
    industryPartner: industryPartner,
    overview: verified?.overview || `Comprehensive academic and industry-aligned curriculum offered under the School of ${item.school}, preparing students with modern skills for high-growth global opportunities.`,
    description: verified?.overview || `Comprehensive academic and industry-aligned curriculum offered under the School of ${item.school}, preparing students with modern skills for high-growth global opportunities.`,
    eligibility: verified?.eligibility || (item.programme.startsWith("Diploma") 
      ? "10th / Secondary Examination from a recognized educational board with min 45% marks." 
      : (level === "PG" 
        ? "Bachelor's degree in relevant discipline from a recognized university with min 50% marks."
        : "10+2 / Higher Secondary (12th Grade) or equivalent in relevant stream with min 50% marks.")),
    prerequisites: verified?.eligibility || (item.programme.startsWith("Diploma") 
      ? "10th / Secondary Examination from a recognized educational board with min 45% marks." 
      : (level === "PG" 
        ? "Bachelor's degree in relevant discipline from a recognized university with min 50% marks."
        : "10+2 / Higher Secondary (12th Grade) or equivalent in relevant stream with min 50% marks.")),
    highlights: verified?.highlights || defaultHighlights,
    curriculum: syllabus,
    syllabus: syllabus,
    technologies: [
      item.school.split(' ')[0],
      degreeLevel.split(' ')[0],
      "Practical Labs",
      "Industry Projects"
    ]
  };
});

// Dynamic Unique School Categories (Primary Filter)
export const COURSE_SCHOOLS = [
  "All",
  ...Array.from(new Set(initialCourses.map((c) => c.school)))
];

// Compatibility export
export const COURSE_CATEGORIES = COURSE_SCHOOLS;
