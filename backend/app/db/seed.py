import sys
from pathlib import Path

# Add project root and backend directory to sys.path
SCRIPT_PATH = Path(__file__).resolve()
# Traverse up until we find the folder containing 'backend'
PROJECT_ROOT = SCRIPT_PATH
while PROJECT_ROOT.parent != PROJECT_ROOT:
    if (PROJECT_ROOT / "backend").is_dir():
        break
    PROJECT_ROOT = PROJECT_ROOT.parent

if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))

from datetime import datetime, timezone, timedelta
from backend.app.db.session import engine, SessionLocal, Base
from backend.app.core.security import get_password_hash
from backend.app.models.entities import (
    User, StudentProfile, FacultyProfile, Course, CourseModule, Enrollment,
    Assignment, Submission, Event, EventRegistration, Project, ProjectUpvote,
    Club, ClubMembership, Achievement, StudentAchievement, XPTransaction,
    Notification, TimetableEntry, AlumniProfile, KnowledgeDocument, DocumentChunk
)

def run_seed():
    print("[*] Creating database tables...")
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()
    try:
        # Check if already seeded
        if db.query(User).filter(User.email == "student@sgsu.ac.in").first():
            print("[✓] Database is already seeded with verified demo accounts.")
            return

        print("[*] Seeding default institutional users...")

        # 1. USERS & PROFILES
        # Student 1: Sarvagya
        student_user = User(
            email="student@sgsu.ac.in",
            hashed_password=get_password_hash("Student@123"),
            full_name="Sarvagya Narayan Nema",
            role="student",
            is_active=True,
            avatar_url="/school-of-future-skills/builders/sarvagya.jpg"
        )
        db.add(student_user)
        db.flush()

        student_prof = StudentProfile(
            user_id=student_user.id,
            roll_no="SGSU-2024-BCA-001",
            enrollment_no="ENR-2024-FSIT-042",
            programme="BCA (Artificial Intelligence & Machine Learning)",
            semester="Semester IV",
            school="School of Future Skills & Information Technology",
            xp_points=450,
            level=3,
            streak_days=7,
            skills="React 19, Python, FastAPI, Docker, PyTorch, SQL",
            bio="Lead architect and student researcher exploring autonomous agent workflows and distributed computing.",
            github_url="https://github.com/SarvagyaNarayanNema",
            linkedin_url="https://linkedin.com/in/sarvagya-nema"
        )
        db.add(student_prof)

        # Faculty 1: Dr. Pooja Bijlani
        faculty_user = User(
            email="pooja.bijlani@sgsu.ac.in",
            hashed_password=get_password_hash("Faculty@123"),
            full_name="Dr. Pooja Bijlani",
            role="faculty",
            is_active=True,
            avatar_url="/school-of-future-skills/faculty/Dr%20Pooja%20Bijlani.png"
        )
        db.add(faculty_user)
        db.flush()

        faculty_prof = FacultyProfile(
            user_id=faculty_user.id,
            employee_id="FAC-FSIT-001",
            department="School of Future Skills & Information Technology",
            designation="Professor & Head of School",
            office_room="FSIT Deanery Room 401",
            qualification="Ph.D. in Computer Science | Specialised in Software Development (IIITB)",
            experience="20+ Years Academics | 6+ Years Research",
            publications="5+ International Publications",
            specialization="AI & Full Stack Systems, Executive Administration & Research"
        )
        db.add(faculty_prof)

        # Administrator
        admin_user = User(
            email="admin@sgsu.ac.in",
            hashed_password=get_password_hash("Admin@123"),
            full_name="FSIT Directorate",
            role="admin",
            is_active=True
        )
        db.add(admin_user)
        db.flush()

        # 2. COURSES
        print("[*] Seeding courses catalog...")
        courses_data = [
            {
                "code": "FSIT-BCA-AIML",
                "programme": "BCA (Artificial Intelligence & Machine Learning)",
                "school": "Future Skills & IT",
                "duration": "3 years",
                "degree_level": "Undergraduate",
                "credits": 140,
                "description": "Deep dive into artificial neural networks, computer vision, natural language processing, LLMs, and Python engineering pipelines.",
                "instructor_name": "Dr. Pooja Bijlani",
                "image": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80"
            },
            {
                "code": "FSIT-BCA-CYBER",
                "programme": "BCA (Cyber Security & Systems Defense)",
                "school": "Future Skills & IT",
                "duration": "3 years",
                "degree_level": "Undergraduate",
                "credits": 140,
                "description": "Comprehensive practical defense program covering red-teaming, incident response, reverse engineering, SOC analysis, and cloud security.",
                "instructor_name": "Mr. Dharmendra Mehra",
                "image": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80"
            },
            {
                "code": "FSIT-BCA-CLOUD",
                "programme": "BCA (Cloud Computing & DevOps Architecture)",
                "school": "Future Skills & IT",
                "duration": "3 years",
                "degree_level": "Undergraduate",
                "credits": 140,
                "description": "Enterprise cloud engineering: AWS solutions, Docker, Kubernetes container orchestration, CI/CD pipelines, and microservices resilience.",
                "instructor_name": "Mr. Hrishabh Dev Saini",
                "image": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80"
            },
            {
                "code": "FSIT-MCA-ADV",
                "programme": "Master of Computer Applications (MCA - Advanced AI & Cloud)",
                "school": "Future Skills & IT",
                "duration": "2 Years",
                "degree_level": "Postgraduate",
                "credits": 90,
                "description": "Advanced software engineering, distributed consensus, transformer models, scalable cloud databases, and systems capstones.",
                "instructor_name": "Dr. Pooja Bijlani",
                "image": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80"
            },
            {
                "code": "FSIT-BSC-DATA",
                "programme": "B.Sc. (Data Science & Analytics)",
                "school": "Future Skills & IT",
                "duration": "3 years",
                "degree_level": "Undergraduate",
                "credits": 130,
                "description": "Data wrangling, statistical inference, Power BI, distributed Big Data with Spark, and predictive intelligence modeling.",
                "instructor_name": "Mr. Surendra Prabhakar",
                "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
            }
        ]

        created_courses = []
        for cdata in courses_data:
            course = Course(**cdata)
            db.add(course)
            db.flush()
            created_courses.append(course)

            # Add modules
            db.add(CourseModule(course_id=course.id, title="Module 1: Foundations & Systems Architecture", module_order=1, duration_weeks=4))
            db.add(CourseModule(course_id=course.id, title="Module 2: Advanced Core Implementation & Algorithms", module_order=2, duration_weeks=5))
            db.add(CourseModule(course_id=course.id, title="Module 3: Industry Capstone & Production Deployment", module_order=3, duration_weeks=5))

        # Enroll student in Course 1 & Course 2
        db.add(Enrollment(student_id=student_user.id, course_id=created_courses[0].id, status="active", progress_percent=45))
        db.add(Enrollment(student_id=student_user.id, course_id=created_courses[1].id, status="active", progress_percent=20))

        # 3. ASSIGNMENTS
        print("[*] Seeding academic assignments...")
        now = datetime.now(timezone.utc)
        a1 = Assignment(
            course_id=created_courses[0].id,
            title="Convolutional Neural Network for Medical Imaging",
            description="Implement a PyTorch CNN to classify skin lesion images with >92% validation accuracy. Include tensorboard metrics and confusion matrix.",
            due_date=now + timedelta(days=5),
            max_marks=100,
            allowed_extensions=".pdf,.zip,.ipynb,.py"
        )
        a2 = Assignment(
            course_id=created_courses[1].id,
            title="Network Packet Analyzer & IDS Rule Engine",
            description="Build a Python scapy script to parse PCAP files, detect SYN floods and ARP spoofing, and export alert logs in JSON format.",
            due_date=now + timedelta(days=12),
            max_marks=100,
            allowed_extensions=".pdf,.zip,.py"
        )
        db.add(a1)
        db.add(a2)
        db.flush()

        # 4. EVENTS
        print("[*] Seeding events...")
        e1 = Event(
            title="National Hackathon 2026 — Future Skills & Systems",
            category="Hackathon",
            description="48-hour national collegiate hackathon with $18,000 in cash prizes, cloud GPU clusters, and mentorship from tech leaders.",
            event_date="October 24-26, 2026",
            venue="FSIT Innovation Center & Discord Virtual War Room",
            capacity=150,
            registered_count=82,
            image="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80"
        )
        e2 = Event(
            title="Advanced Cyber Defense CTF — Zero-Day Hunting",
            category="Workshops",
            description="Hands-on live cyber defense CTF covering memory corruption, binary exploitation, and cloud privilege escalation.",
            event_date="November 14, 2026",
            venue="FSIT Cyber Security War Room 204",
            capacity=80,
            registered_count=65,
            image="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80"
        )
        db.add(e1)
        db.add(e2)
        db.flush()

        db.add(EventRegistration(event_id=e1.id, user_id=student_user.id, status="confirmed"))

        # 5. CLUBS
        print("[*] Seeding student clubs...")
        cl1 = Club(
            slug="binary-battle-club",
            name="Binary Battle Club",
            category="Competitive Programming",
            description="Master algorithms, dynamic programming, tree data structures, and prepare for ICPC speed-coding rounds.",
            leads="Sarvagya Narayan Nema & Aryan Gupta",
            schedule="Every Wednesday & Saturday, 5:00 PM",
            venue="FSIT Algorithms Studio Room 306",
            active_members_count=48,
            tags="C++, Python, Data Structures, ICPC",
            image="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80"
        )
        cl2 = Club(
            slug="cyber-warriors-club",
            name="Cyber Warriors Club",
            category="Offensive & Defensive Security",
            description="Ethical hacking, penetration testing, malware analysis, and active CTF competition teams.",
            leads="Dimpy Rai & Tanishq Patel",
            schedule="Every Friday, 4:00 PM",
            venue="FSIT War Room 204",
            active_members_count=36,
            tags="CTF, Wireshark, Linux, Reverse Engineering",
            image="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80"
        )
        db.add(cl1)
        db.add(cl2)
        db.flush()

        db.add(ClubMembership(club_id=cl1.id, user_id=student_user.id, role="lead", status="active"))

        # 6. PROJECTS
        print("[*] Seeding student projects...")
        p1 = Project(
            title="NeuralShield — Distributed Zero-Day Intrusion Detection",
            description="Real-time eBPF packet monitor that feeds anomalous payload flows into a localized lightweight ONNX autoencoder.",
            category="Cyber Security",
            technologies="Python, eBPF, ONNX, React 19, FastAPI",
            student_team="Team ZeroKernel (Sarvagya, Dimpy, Hemant)",
            creator_id=student_user.id,
            github_url="https://github.com/SarvagyaNarayanNema/neuralshield",
            upvotes_count=42,
            image="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80"
        )
        p2 = Project(
            title="AuraDoc — Clinical Intelligence RAG with Verification",
            description="Medical literature query assistant synthesizing PubMed abstracts with doctor-in-the-loop audit logs.",
            category="AI & Machine Learning",
            technologies="LangChain, pgvector, FastAPI, React",
            student_team="Aura Labs Team",
            creator_id=student_user.id,
            github_url="https://github.com/SarvagyaNarayanNema/auradoc",
            upvotes_count=29,
            image="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80"
        )
        db.add(p1)
        db.add(p2)
        db.flush()

        db.add(ProjectUpvote(project_id=p1.id, user_id=student_user.id))

        # 7. ACHIEVEMENTS & WALL OF FAME
        print("[*] Seeding achievements...")
        ach1 = Achievement(
            title="1st Place Global Champions — International Cyber Siege 2026",
            category="Competitions",
            award="🏆 $25,000 Grand Prize & Defense Innovation Fellowship",
            organization="Global Cyber Defense Consortium, Geneva",
            award_badge="World Champion",
            year="2026",
            description="Neutralized multi-stage simulated zero-day industrial breach in under 11 minutes with student-built eBPF engine.",
            xp_reward=250,
            icon="Trophy"
        )
        ach2 = Achievement(
            title="IEEE Transactions Best Paper Award — Generative Memory Alignment",
            category="Academic",
            award="📜 Outstanding Academic Research Medal",
            organization="IEEE Computational Intelligence Society",
            award_badge="IEEE Best Paper",
            year="2026",
            description="Demonstrated a 3.4x reduction in catastrophic forgetting in edge vision transformers.",
            xp_reward=200,
            icon="Award"
        )
        db.add(ach1)
        db.add(ach2)
        db.flush()

        db.add(StudentAchievement(student_id=student_user.id, achievement_id=ach1.id))

        # 8. TIMETABLE ENTRIES
        print("[*] Seeding timetable entries...")
        tt_data = [
            ("Monday", "09:30 AM", "11:00 AM", "Deep Learning & Neural Networks", "FSIT-BCA-AIML", "Dr. Pooja Bijlani", "Lab 401"),
            ("Monday", "11:15 AM", "12:45 PM", "Cloud Architecture & Kubernetes", "FSIT-BCA-CLOUD", "Mr. Hrishabh Dev Saini", "Room 304"),
            ("Tuesday", "10:00 AM", "11:30 AM", "Offensive Cyber Security & Penetration Testing", "FSIT-BCA-CYBER", "Mr. Dharmendra Mehra", "Cyber War Room 204"),
            ("Wednesday", "09:30 AM", "11:00 AM", "Competitive Programming & Data Structures", "FSIT-BCA-AIML", "Mr. Surendra Prabhakar", "Lab 308"),
            ("Thursday", "11:15 AM", "12:45 PM", "Generative AI Systems & LLM Engineering", "FSIT-BCA-AIML", "Dr. Pooja Bijlani", "Innovation Hub"),
            ("Friday", "02:00 PM", "04:00 PM", "Full Stack Capstone Laboratory", "FSIT-BCA-AIML", "Mr. Hrishabh Dev Saini", "Software Lab 302")
        ]
        for day, st, et, cname, ccode, fname, room in tt_data:
            db.add(TimetableEntry(
                day=day,
                start_time=st,
                end_time=et,
                course_name=cname,
                course_code=ccode,
                faculty_name=fname,
                room=room,
                batch="BCA (AI-ML) Year 2",
                department="School of Future Skills & Information Technology"
            ))

        # 9. ALUMNI
        print("[*] Seeding alumni directory...")
        al1 = AlumniProfile(
            name="Rohit Verma",
            batch="Class of 2023",
            degree="B.C.A. (AI & Machine Learning)",
            company="Google DeepMind",
            role="Machine Learning Research Engineer",
            role_category="Machine Learning / AI",
            location="Bengaluru, India",
            bio="Focuses on multi-modal representation alignment and reasoning models.",
            skills="PyTorch, JAX, Distributed Training, Research",
            is_available_for_mentorship=True,
            image="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
        )
        al2 = AlumniProfile(
            name="Ananya Sen",
            batch="Class of 2022",
            degree="B.C.A. (Cyber Defense)",
            company="Amazon Web Services (AWS)",
            role="Cloud Security Architect",
            role_category="Cloud / DevOps",
            location="Seattle, WA / Remote",
            bio="Leading zero-trust IAM policy automation and container isolation.",
            skills="AWS IAM, Terraform, Kubernetes, Go",
            is_available_for_mentorship=True,
            image="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80"
        )
        db.add(al1)
        db.add(al2)

        # 10. NOTIFICATIONS
        print("[*] Seeding notifications...")
        db.add(Notification(
            user_id=student_user.id,
            title="Welcome to Future Skills Portal 🚀",
            message="Your student profile is active. Check out your enrolled tracks and the upcoming 48-hour National AI Hackathon.",
            category="system",
            action_link="/dashboard"
        ))
        db.add(Notification(
            user_id=student_user.id,
            title="Assignment Deadline Approaching ⏳",
            message="Convolutional Neural Network deliverable is due in 5 days.",
            category="assignment",
            action_link="/assignments"
        ))

        # 11. KNOWLEDGE DOCUMENTS (RAG)
        print("[*] Seeding RAG knowledge base...")
        doc1 = KnowledgeDocument(
            title="Scope Global Skills University (SGSU) Institutional Profile & Charter",
            source="SGSU Official Institutional Charter",
            source_type="official",
            authority_level=1,
            url="https://sgsuniversity.ac.in/about-us/",
            raw_content="Scope Global Skills University (SGSU) is Central India's premier skills-based university located in Bhopal, MP, established under the MP Private University Act and backed by AISECT's 38+ years legacy."
        )
        db.add(doc1)
        db.flush()

        db.add(DocumentChunk(
            document_id=doc1.id,
            chunk_index=0,
            content="Scope Global Skills University (SGSU) is Central India's premier skills-based university located in Bhopal, Madhya Pradesh. Established under the MP Niji Vishwavidyalaya Adhiniyam and recognized by UGC under Section 2(f). Sponsoring body is AISECT Group with 38+ years of excellence in skill education. Location: NH-12, Near Misrod, Hoshangabad Road, Bhopal."
        ))

        db.commit()
        print("[✓] Database seed successfully completed!")

    finally:
        db.close()

if __name__ == "__main__":
    run_seed()
