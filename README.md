# Future Skills — Interactive Student Technology Platform

An advanced, modern, production-grade student technology platform built for university departments focusing on emerging technologies. Combines a university technology portal, student dashboard, interactive learning sandboxes, tech community showcase, event registration platform, and gamified coding hub.

---

## 🚀 Key Features & Capabilities

### 1. Global Navigation & Layout
- **Branding**: Future Skills — *"Learn. Build. Innovate. Lead."*
- **Global Search**: Command Palette triggered via `Ctrl + K` or search bar across Courses, Notices, Events, Projects, Achievements, and Faculty.
- **Theme Switcher**: Dark Mode and Light Mode hybrid support with smooth CSS transition variables.
- **Notification Drawer**: Real-time notifications with unread counts, mark all as read, and clear actions.
- **Responsive Navigation**: Desktop sticky header, mobile drawer menu, and mobile card conversions.

### 2. Homepage & Interactive Student Hub
- **Hero Section**: Futuristic tech aesthetic with glowing gradients, particle-style badges, live terminal telemetry snippet, and quick CTAs.
- **Quick Access Dashboard**: Shortcuts to Courses, Timetable, Notices, Assignments, Labs, and Events.
- **Upcoming Highlights**: Dynamic cards spotlighting the Project of the Month, Urgent Notice, Flagship Hackathon, and Featured Course.
- **Floating AI Assistant (FutureBot 🤖)**: Interactive student assistant with quick actions ("Find a Course", "Check Notices", "Upcoming Events", "Find Assignments", "Open Tech Zone") and intelligent keyword question answering.

### 3. Courses & Curriculum
- **8 Core Specialization Tracks**:
  1. Cyber Security (Network Security, Ethical Hacking, Cyber Defense)
  2. AI / ML (Deep Learning, Generative AI, Computer Vision)
  3. Data Science (Statistical Modeling, Analytics, Visualizations)
  4. Programming (Data Structures, Algorithms, C++, Python)
  5. Web Development (Full-Stack React, Node.js, REST/GraphQL)
  6. Cloud Computing (Kubernetes, Docker, DevOps, Terraform)
  7. IoT (Microcontrollers, ESP32, MQTT Telemetry)
  8. Digital Marketing (Technical Product Marketing, Growth Analytics)
- **Course Detail Pages**: Interactive lesson checklists that increment course progress bars and award student XP upon completion.

### 4. Interactive Notice Board
- **Categorized Circulars**: Latest Announcements, Circulars, Exam Notices, Workshop Updates, Internship Opportunities, Competitions/Hackathons.
- **Notice Details Modal**: Full text circular viewing, priority tagging, and PDF attachment download simulators.

### 5. Event Discovery & Registration
- **Event Types**: Hackathons (InnovateX 48h), Technical Workshops, Colloquiums, Tech Fests, Competitions, Guest Lectures.
- **Registration Flow**: Functional registration form with live seat availability counters, validation, confirmation state, and +100 XP rewards.

### 6. Student Projects Showcase
- **Heading**: *"Built by Students. Powered by Ideas."*
- **Project of the Month**: Large featured spotlight card with architectural highlights.
- **Interactive Upvoting**: Persistent upvote counters stored in `localStorage`.
- **Filters**: Category filters, technology tags, and GitHub / Live Demo direct links.

### 7. Hall of Fame & Achievements
- **Categories**: Hackathon Winners, Professional Certifications, Internships, Competition Achievements, and Student Innovations.
- **Filters**: Category and graduation year filtering.

### 8. Tech Zone (Gamified Arena)
- **Daily Tech Challenge**: Daily question with instant scoring, architectural explanation, and XP reward.
- **Interactive Coding Challenges**: Code editor simulator with problem statement, test cases, and in-browser evaluation against test vectors.
- **Cybersecurity & AI/ML Quizzes**: Interactive 5-question quizzes with instant answer feedback and badge unlocks.
- **Binary Breaker Mini-Game**: Interactive bit-toggling game translating 4-bit binary values to target decimals.
- **Live Leaderboard**: Real-time ranks, roll numbers, points, and challenges completed, updating dynamically as the user completes activities.

### 9. Timetable & Schedule
- **Interactive Schedule**: Monday through Saturday time slots with color-coded subjects, faculty names, room codes, and current class indicator.
- **Mobile Card Transformation**: Optimized cards layout on mobile devices.

### 10. Student Assignments & Labs
- **Assignment Manager**: Filter by status (Pending, Submitted, Late, Completed) and priority. Includes modal file upload simulator and submission state persistence.
- **Cloud Sandbox Labs**: Interactive browser workstations across 6 tracks (Programming, Web Dev, AI/ML, Cyber, IoT, Cloud) with problem statements, starter code, and test runners.

### 11. Student Profile & Dashboard
- **Profile Dashboard**: Displays level title (e.g., Level 7 — Technology Explorer), verified XP points, technical skill tags, and badge showcase.
- **Editable Mode**: Allows modifying student name, bio, social links, and adding/removing technical skills with persistent `localStorage` storage.

---

## 🛠 Technology Stack

- **Framework**: React 18+ (Vite)
- **Routing**: React Router v6
- **Styling**: Tailwind CSS with custom cyber palette & glassmorphism
- **Icons**: Lucide React + Custom SVG Brand Vectors
- **Gamification**: Canvas Confetti for unlocks and XP celebrations
- **State & Storage**: React Context API + Safe LocalStorage utility wrapper
- **Service Layer**: Clean data service abstraction (`src/services/`) ready for Supabase or backend REST API integration

---

## 💻 Getting Started

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

---

## 🔌 Future Backend Integration (Supabase Ready)

The application is structured with a dedicated service layer in `src/services/` that mirrors database queries:
- `courseService.js` ➔ `supabase.from('courses')`
- `eventService.js` ➔ `supabase.from('events')` and `supabase.from('event_registrations')`
- `noticeService.js` ➔ `supabase.from('notices')`
- `projectService.js` ➔ `supabase.from('projects')`
- `achievementService.js` ➔ `supabase.from('achievements')`

Authentication and PostgreSQL Row-Level Security (RLS) can be enabled by connecting `@supabase/supabase-js` without refactoring UI components.
