import { initialProjects } from './projects';

export const studentClubs = [
  {
    id: "binary-battle-club",
    name: "Binary Battle Club",
    category: "Competitive Programming & Problem Solving",
    badge: "Algorithms & Code Competitions",
    membersCount: 350,
    activeMembers: 350,
    image: "/projects/binary-battle-club.png",
    description: "The premier competitive programming and algorithmic combat society. Dedicated to dynamic programming, data structures mastery, hackathons, and speed coding battles.",
    tags: ["C++", "Python", "Data Structures", "Algorithms", "Competitive Programming", "ICPC"],
    schedule: "Wednesdays & Saturdays @ 5:30 PM",
    meetingSchedule: "Wednesdays & Saturdays @ 5:30 PM",
    venue: "Advanced Coding Arena & Discord War Room",
    room: "Advanced Coding Arena & Discord War Room",
    leads: "Club Student Leads & Mentors",
    lead: "Club Student Leads & Mentors",
    isJoined: false,
    url: "https://binarybattleclub.vercel.app/"
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

// Synchronized real departmental projects
export const initialStudentProjects = initialProjects.map(p => ({
  id: p.id,
  name: p.name,
  studentTeam: p.creators || p.studentTeam,
  category: p.category,
  year: p.year,
  image: p.image,
  description: p.description,
  technologies: p.technologies,
  github: "",
  demo: p.url,
  url: p.url,
  likes: p.upvotes,
  upvotes: p.upvotes,
  linkVerificationStatus: p.linkVerificationStatus,
  publicationStatus: p.publicationStatus,
  isAvailable: p.isAvailable,
  highlights: p.highlights
}));
