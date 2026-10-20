import {
  GraduationCap,
  Sparkles,
  Flame,
  Award,
  Brain,
  ShieldCheck,
  Cloud,
  Blocks,
  Server,
  Package,
  Zap,
  Trophy,
  Medal,
  Lightbulb,
  TrendingUp,
  FileText,
  FileCheck,
  Globe,
  AlertCircle,
  BookOpen,
  Calendar,
  Briefcase,
  Users,
  Code2,
  Send,
  Crown,
  Terminal,
  Shield,
  Cpu,
  Contact,
  Handshake,
  MessageSquare,
  Video,
  Share2
} from 'lucide-react';

/**
 * Multi-Level Cascading Navigation Data Structure
 * Supports arbitrary levels (Level 1, Level 2, Level 3, etc.)
 * Each node can contain:
 * - id: unique identifier
 * - title: display label
 * - path: route destination
 * - icon: Lucide React icon component
 * - badge: optional badge chip (e.g. 'New', 'Active', '4 Years')
 * - description: optional subtitle
 * - children: nested items (triggers cascading flyout on desktop / accordion on mobile)
 */
export const NAVIGATION_ITEMS = [
  // ==========================================
  // 1. COURSES
  // ==========================================
  {
    id: 'courses',
    title: 'COURSES',
    path: '/courses',
    icon: BookOpen,
    children: [
      {
        id: 'undergrad-tracks',
        title: 'Undergraduate Tracks',
        path: '/courses?track=undergrad',
        icon: GraduationCap,
        description: 'Comprehensive 4-year degree-aligned curricula',
        badge: 'Core'
      },
      {
        id: 'advanced-specializations',
        title: 'Advanced Specializations',
        path: '/courses?filter=specializations',
        icon: Sparkles,
        description: 'Cutting-edge domain tracks with deep specialization',
        children: [
          {
            id: 'ai-ml',
            title: 'Artificial Intelligence & ML',
            path: '/courses?domain=ai-ml',
            icon: Brain,
            description: 'Deep Learning, LLMs, Computer Vision'
          },
          {
            id: 'cyber-defense',
            title: 'Cyber Defense',
            path: '/courses?domain=cyber-defense',
            icon: ShieldCheck,
            description: 'Offensive Security, Threat Hunting, SOC'
          },
          {
            id: 'cloud-architecture',
            title: 'Cloud Architecture',
            path: '/courses?domain=cloud-architecture',
            icon: Cloud,
            description: 'Enterprise Scalability, DevOps & Distributed Systems',
            children: [
              {
                id: 'aws-solutions',
                title: 'AWS Solutions',
                path: '/courses?sub=aws',
                icon: Server,
                description: 'Solutions Architect & SysOps tracks'
              },
              {
                id: 'docker-k8s',
                title: 'Docker & Kubernetes',
                path: '/courses?sub=k8s',
                icon: Package,
                description: 'Container orchestration at scale',
                badge: 'Popular'
              },
              {
                id: 'serverless-systems',
                title: 'Serverless Systems',
                path: '/courses?sub=serverless',
                icon: Zap,
                description: 'Event-driven Lambda & Edge Compute'
              }
            ]
          },
          {
            id: 'web3-engineering',
            title: 'Web3 Engineering',
            path: '/courses?domain=web3',
            icon: Blocks,
            description: 'Smart contracts, Zero-Knowledge & DApps'
          }
        ]
      },
      {
        id: 'industry-bootcamps',
        title: 'Industry Bootcamps',
        path: '/courses?track=bootcamps',
        icon: Flame,
        description: 'High-intensity 12-week project immersion',
        badge: 'Intensive'
      },
      {
        id: 'certifications',
        title: 'Certifications',
        path: '/courses?track=certifications',
        icon: Award,
        description: 'Industry-recognized credentials & vouchers'
      }
    ]
  },

  // ==========================================
  // 2. ACHIEVEMENTS
  // ==========================================
  {
    id: 'achievements',
    title: 'ACHIEVEMENTS',
    path: '/achievements',
    icon: Trophy,
    children: [
      {
        id: 'hall-of-fame',
        title: 'Hall of Fame',
        path: '/achievements?tab=fame',
        icon: Trophy,
        description: 'Top student champions & historic university milestones',
        badge: 'Spotlight'
      },
      {
        id: 'hackathon-victories',
        title: 'Hackathon Victories',
        path: '/achievements?tab=hackathons',
        icon: Medal,
        description: 'Global & national hackathon champion teams',
        badge: '18+ Wins'
      },
      {
        id: 'research-innovation',
        title: 'Research & Innovation',
        path: '/achievements?tab=research',
        icon: Lightbulb,
        description: 'Student-led R&D and intellectual discoveries',
        children: [
          {
            id: 'published-papers',
            title: 'Published Papers',
            path: '/achievements?cat=papers',
            icon: FileText,
            description: 'IEEE, ACM, and NeurIPS peer-reviewed publications'
          },
          {
            id: 'patent-filings',
            title: 'Patent Filings',
            path: '/achievements?cat=patents',
            icon: FileCheck,
            description: 'Published and awarded technological patents'
          },
          {
            id: 'global-conferences',
            title: 'Global Conferences',
            path: '/achievements?cat=conferences',
            icon: Globe,
            description: 'Keynotes & paper presentations worldwide'
          }
        ]
      },
      {
        id: 'startup-grants',
        title: 'Startup Grants',
        path: '/achievements?tab=grants',
        icon: TrendingUp,
        description: 'Venture funding & incubation grants won by student founders',
        badge: '$250K+'
      }
    ]
  },

  // ==========================================
  // 3. NOTICE
  // ==========================================
  {
    id: 'notice',
    title: 'NOTICE',
    path: '/notices',
    icon: AlertCircle,
    children: [
      {
        id: 'urgent-circulars',
        title: 'Urgent Circulars',
        path: '/notices?filter=urgent',
        icon: AlertCircle,
        description: 'Critical deadlines, mandatory instructions & emergency alerts',
        badge: 'Urgent'
      },
      {
        id: 'academic-updates',
        title: 'Academic Updates',
        path: '/notices?filter=academic',
        icon: BookOpen,
        description: 'Curriculum schedules, lab slots & examination notices'
      },
      {
        id: 'hackathon-events',
        title: 'Hackathon & Events',
        path: '/notices?filter=events',
        icon: Calendar,
        description: 'Upcoming hackathons, bootcamps & tech conferences',
        badge: 'Active'
      },
      {
        id: 'placement-drives',
        title: 'Placement Drives',
        path: '/notices?filter=placements',
        icon: Briefcase,
        description: 'On-campus recruitment, internship calls & tech drives'
      }
    ]
  },

  // ==========================================
  // 4. STUDENT CLUBS & PROJECTS
  // ==========================================
  {
    id: 'clubs-and-projects',
    title: 'STUDENT CLUBS & PROJECTS',
    path: '/clubs-and-projects',
    icon: Users,
    children: [
      {
        id: 'student-clubs',
        title: 'Student Clubs',
        path: '/clubs-and-projects?view=clubs',
        icon: Users,
        description: 'Student-run technical communities and innovation cells',
        children: [
          {
            id: 'binary-battle-club',
            title: 'Binary Battle Club',
            path: '/clubs-and-projects?club=binary-battle-club',
            icon: Terminal,
            description: 'Competitive programming, dynamic programming & ICPC speed coding'
          },
          {
            id: 'cyber-warriors-club',
            title: 'Cyber Warriors Club',
            path: '/clubs-and-projects?club=cyber-warriors-club',
            icon: Shield,
            description: 'Capture-The-Flag (CTF), ethical hacking & cyber defense'
          }
        ]
      },
      {
        id: 'live-projects-showcase',
        title: 'Live Projects Showcase',
        path: '/clubs-and-projects?view=projects',
        icon: Code2,
        description: 'Explore live web apps, hardware prototypes & open-source tools',
        badge: 'Featured'
      },
      {
        id: 'submit-your-project',
        title: 'Submit Your Project',
        path: '/clubs-and-projects?action=submit',
        icon: Send,
        description: 'Get your build reviewed and featured on the wall of projects',
        badge: 'Open'
      },
      {
        id: 'club-council',
        title: 'Club Council',
        path: '/clubs-and-projects?view=council',
        icon: Crown,
        description: 'Executive committee, election updates & charter guidelines'
      }
    ]
  },

  // ==========================================
  // 5. ALUMNI
  // ==========================================
  {
    id: 'alumni',
    title: 'ALUMNI',
    path: '/alumni',
    icon: Contact,
    children: [
      {
        id: 'alumni-directory',
        title: 'Alumni Directory',
        path: '/alumni',
        icon: Contact,
        description: 'Connect with 1,200+ graduates across global tech leaders'
      },
      {
        id: 'mentorship-network',
        title: 'Mentorship Network',
        path: '/alumni?tab=mentorship',
        icon: Handshake,
        description: 'Book 1-on-1 career guidance with senior engineering leads',
        children: [
          {
            id: 'resume-reviews',
            title: 'Resume Reviews',
            path: '/alumni?service=resume',
            icon: FileCheck,
            description: 'Get ATS-ready feedback from FAANG engineers'
          },
          {
            id: 'mock-interviews',
            title: 'Mock Interviews',
            path: '/alumni?service=interview',
            icon: Video,
            description: 'Realistic technical system design & coding interviews'
          },
          {
            id: 'referral-exchange',
            title: 'Referral Exchange',
            path: '/alumni?service=referral',
            icon: Share2,
            description: 'Direct employee referral requests for verified alumni'
          }
        ]
      },
      {
        id: 'alumni-stories',
        title: 'Alumni Stories',
        path: '/alumni?tab=stories',
        icon: MessageSquare,
        description: 'Inspiring career journeys, pivot stories & industry insights'
      },
      {
        id: 'guest-lectures',
        title: 'Guest Lectures',
        path: '/alumni?tab=lectures',
        icon: Video,
        description: 'Monthly masterclasses by alumni tech leads & founders',
        badge: 'Monthly'
      }
    ]
  }
];
