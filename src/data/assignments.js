export const ASSIGNMENT_STATUSES = ["All", "Pending", "Submitted", "Completed", "Late"];

export const initialAssignments = [
  {
    id: "asg-01",
    title: "Lab Assessment 3: Zero Trust Snort Rule Formulation",
    subject: "Network Security & Cyber Defense",
    code: "CS-101",
    dueDate: "2026-10-02",
    dueTime: "11:59 PM",
    priority: "High",
    status: "Pending",
    points: 100,
    description: "Formulate custom Snort IDS detection rules to intercept SYN floods, directory traversal payloads, and malicious shellcode payloads in simulated PCAP captures.",
    deliverables: "Snort rules configuration file (.rules) + Execution screenshot report with mitigation analysis.",
    submission: null
  },
  {
    id: "asg-02",
    title: "Milestone 2: Attention Head Inspection in PyTorch",
    subject: "Generative AI Architectures",
    code: "AI-201",
    dueDate: "2026-10-05",
    dueTime: "05:00 PM",
    priority: "High",
    status: "Pending",
    points: 150,
    description: "Extract and plot heatmaps of scaled dot-product attention matrices across a 6-layer toy transformer encoder processing English sentiment sentences.",
    deliverables: "Jupyter Notebook (.ipynb) with inline visualization figures and analysis.",
    submission: null
  },
  {
    id: "asg-03",
    title: "Problem Set 4: Dynamic Programming & Suffix Structures",
    subject: "Advanced Data Structures & Algorithms",
    code: "PRG-401",
    dueDate: "2026-09-29",
    dueTime: "11:59 PM",
    priority: "Medium",
    status: "Submitted",
    points: 100,
    description: "Implement solutions to 5 classic algorithmic problems with strict time limit O(N log N) and space constraints.",
    deliverables: "Source files (.cpp or .py) passing all hidden test suites.",
    submission: {
      submittedAt: "2026-09-26 14:22",
      fileName: "solution_ps4_alex_morgan.cpp",
      fileSize: "14.2 KB",
      status: "Submitted (Under Review)"
    }
  },
  {
    id: "asg-04",
    title: "Sprint Project: Responsive UI Component Library in Tailwind",
    subject: "Full-Stack Web Engineering",
    code: "WEB-501",
    dueDate: "2026-09-22",
    dueTime: "11:59 PM",
    priority: "Medium",
    status: "Completed",
    points: 120,
    grade: "98/100",
    feedback: "Exceptional visual hierarchy and accessible keyboard navigation.",
    description: "Build an accessible component system including accessible modal dialogs, tabbars, responsive cards, and dark theme support.",
    deliverables: "GitHub repository link + Live deployed preview URL.",
    submission: {
      submittedAt: "2026-09-21 20:15",
      fileName: "github.com/alex-morgan/ui-primitives",
      fileSize: "URL",
      status: "Graded"
    }
  },
  {
    id: "asg-05",
    title: "Docker Compose Microservices Mesh Orchestration",
    subject: "Cloud Infrastructure & DevOps",
    code: "CLD-601",
    dueDate: "2026-09-15",
    dueTime: "11:59 PM",
    priority: "Low",
    status: "Completed",
    points: 100,
    grade: "92/100",
    feedback: "Good health checks configured. Recommend adding resource limits in future iterations.",
    description: "Write a multi-container docker-compose.yml running frontend, reverse proxy, API backend, and Redis cache with isolated bridge networks.",
    deliverables: "docker-compose.yml + Architecture diagram.",
    submission: {
      submittedAt: "2026-09-14 18:30",
      fileName: "docker_mesh_submission.zip",
      fileSize: "1.2 MB",
      status: "Graded"
    }
  }
];
