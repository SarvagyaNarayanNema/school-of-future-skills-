export const NOTICE_CATEGORIES = [
  "All",
  "Latest Announcements",
  "Circulars",
  "Exam Notices",
  "Workshop Updates",
  "Internship Opportunities",
  "Competitions/Hackathons"
];

export const initialNotices = [
  {
    id: "not-01",
    title: "Registration Open: Annual Future Skills National Hackathon 2026",
    category: "Competitions/Hackathons",
    date: "2026-09-26",
    author: "Hackathon Organizing Committee",
    isImportant: true,
    isUnread: true,
    summary: "Grand prizes worth $15,000, internship opportunities at leading AI labs, and hardware incubation grants for top 5 innovative student prototypes.",
    fullContent: "The Department of Future Skills invites all students to participate in the flagship 48-Hour National Hackathon. Tracks include Generative AI, Sustainable IoT, Cyber Defense, and Web3 Infrastructure. Mentors from global tech companies will guide teams throughout the event. Food, dedicated high-speed fiber internet, and sleep pods will be arranged.",
    attachmentName: "hackathon_guidelines_2026.pdf",
    attachmentSize: "2.4 MB"
  },
  {
    id: "not-02",
    title: "Google & Microsoft Summer Cloud & ML Internship Cohort Drive",
    category: "Internship Opportunities",
    date: "2026-09-25",
    author: "Industry Placement & Internship Cell",
    isImportant: true,
    isUnread: true,
    summary: "Pre-placement interviews and 12-week paid engineering internships for 3rd and 4th year undergraduate students across Systems & AI domains.",
    fullContent: "Eligible students with CGPA 7.5+ and demonstrated proficiency in Data Structures or Cloud/AI projects can register via the student portal. Shortlisting includes an algorithmic coding assessment followed by technical interviews. Last date to register is October 10.",
    attachmentName: "internship_role_specifications.pdf",
    attachmentSize: "1.1 MB"
  },
  {
    id: "not-03",
    title: "Mid-Semester Practical Examination Schedule: Systems & Lab Evaluations",
    category: "Exam Notices",
    date: "2026-09-24",
    author: "Academic Examination Section",
    isImportant: true,
    isUnread: false,
    summary: "Hands-on coding and lab practicals will commence from October 18. Detailed lab slots by roll number have been published.",
    fullContent: "All students must bring their institutional smart cards and verified lab journals. Practical examinations will consist of a 90-minute live coding challenge followed by an individual viva voce with the external evaluation panel.",
    attachmentName: "practical_exam_timetable_v2.pdf",
    attachmentSize: "840 KB"
  },
  {
    id: "not-04",
    title: "Hands-On Workshop: Deploying Local LLMs & Quantization with Ollama & PyTorch",
    category: "Workshop Updates",
    date: "2026-09-22",
    author: "AI Research Guild",
    isImportant: false,
    isUnread: false,
    summary: "Learn how to compress 70B parameter models onto edge laptops using llama.cpp and AWQ quantization techniques in Lab 304.",
    fullContent: "This weekend intensive hands-on lab takes students from naive float32 tensor weights down to 4-bit quantized GGUF matrices running with zero cloud latency. Seats are strictly limited to 60 participants.",
    attachmentName: "workshop_prerequisites_setup.pdf",
    attachmentSize: "620 KB"
  },
  {
    id: "not-05",
    title: "Official Academic Circular: Guidelines on Generative AI Usage in Coursework",
    category: "Circulars",
    date: "2026-09-20",
    author: "Academic Council",
    isImportant: false,
    isUnread: false,
    summary: "Transparent attribution guidelines for LLMs used in capstone assignments, research papers, and software architecture diagrams.",
    fullContent: "The Department embraces AI as an accelerator for learning. Students are encouraged to use LLMs for conceptual clarification and code debugging, provided that all prompts, synthetic outputs, and architectural decisions are properly documented in submitted appendix files.",
    attachmentName: "academic_integrity_ai_guidelines.pdf",
    attachmentSize: "490 KB"
  },
  {
    id: "not-06",
    title: "New High-Performance GPU Cluster (8x NVIDIA H100) Open for Student Research",
    category: "Latest Announcements",
    date: "2026-09-18",
    author: "Compute Infrastructure Group",
    isImportant: true,
    isUnread: false,
    summary: "Undergraduate and graduate researchers working on deep learning can now submit Slurm batch job requests for cluster compute time.",
    fullContent: "Our state-of-the-art compute cluster is now online. Students can authenticate via their institutional LDAP credentials, request Slurm allocations up to 48 GPU-hours per run, and monitor training loss telemetry directly via Weights & Biases.",
    attachmentName: "cluster_access_and_slurm_guide.pdf",
    attachmentSize: "1.8 MB"
  }
];
