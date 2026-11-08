from datetime import datetime, timezone
from sqlalchemy import (
    Column, Integer, String, Boolean, Text, DateTime, ForeignKey, Float, UniqueConstraint, Index
)
from sqlalchemy.orm import relationship
from backend.app.db.session import Base

def utc_now():
    return datetime.now(timezone.utc)

# ============================================================================
# 1. USERS & PROFILES
# ============================================================================

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(255), nullable=False)
    role = Column(String(50), nullable=False, default="student") # "student" | "faculty" | "admin"
    is_active = Column(Boolean, default=True)
    avatar_url = Column(String(500), nullable=True)
    created_at = Column(DateTime(timezone=True), default=utc_now)
    updated_at = Column(DateTime(timezone=True), default=utc_now, onupdate=utc_now)

    # Relationships
    student_profile = relationship("StudentProfile", back_populates="user", uselist=False, cascade="all, delete-orphan")
    faculty_profile = relationship("FacultyProfile", back_populates="user", uselist=False, cascade="all, delete-orphan")
    enrollments = relationship("Enrollment", back_populates="student", cascade="all, delete-orphan")
    submissions = relationship("Submission", back_populates="student", foreign_keys="Submission.student_id", cascade="all, delete-orphan")
    event_registrations = relationship("EventRegistration", back_populates="user", cascade="all, delete-orphan")
    project_upvotes = relationship("ProjectUpvote", back_populates="user", cascade="all, delete-orphan")
    club_memberships = relationship("ClubMembership", back_populates="user", cascade="all, delete-orphan")
    xp_transactions = relationship("XPTransaction", back_populates="student", cascade="all, delete-orphan")
    notifications = relationship("Notification", back_populates="user", cascade="all, delete-orphan")


class StudentProfile(Base):
    __tablename__ = "student_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)
    roll_no = Column(String(100), unique=True, index=True, nullable=True)
    enrollment_no = Column(String(100), nullable=True)
    programme = Column(String(255), default="BCA (Artificial Intelligence & Machine Learning)")
    semester = Column(String(50), default="Semester IV")
    school = Column(String(255), default="School of Future Skills & Information Technology")
    xp_points = Column(Integer, default=450)
    level = Column(Integer, default=3)
    streak_days = Column(Integer, default=7)
    skills = Column(Text, default="Python,React,SQL,Docker,Machine Learning") # comma-separated
    bio = Column(Text, default="Future-skills engineer passionate about cloud and AI.")
    github_url = Column(String(255), nullable=True)
    linkedin_url = Column(String(255), nullable=True)

    user = relationship("User", back_populates="student_profile")


class FacultyProfile(Base):
    __tablename__ = "faculty_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)
    employee_id = Column(String(100), unique=True, nullable=True)
    department = Column(String(255), default="School of Future Skills & Information Technology")
    designation = Column(String(255), default="Assistant Professor")
    office_room = Column(String(100), default="FSIT Room 302")
    qualification = Column(String(255), default="Ph.D. / M.Tech in Computer Science")
    experience = Column(String(100), default="8+ Years Teaching")
    publications = Column(String(255), default="10+ International Papers")
    specialization = Column(String(255), default="AI, Full-Stack & Cyber Defense")

    user = relationship("User", back_populates="faculty_profile")


# ============================================================================
# 2. COURSES & ACADEMICS
# ============================================================================

class Course(Base):
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True, index=True)
    code = Column(String(50), unique=True, index=True, nullable=False)
    programme = Column(String(255), nullable=False)
    school = Column(String(255), nullable=False)
    duration = Column(String(50), default="3 Years")
    degree_level = Column(String(100), default="Undergraduate")
    credits = Column(Integer, default=120)
    description = Column(Text, nullable=True)
    image = Column(String(500), nullable=True)
    instructor_name = Column(String(255), default="Dr. Pooja Bijlani")
    is_published = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), default=utc_now)

    modules = relationship("CourseModule", back_populates="course", cascade="all, delete-orphan")
    enrollments = relationship("Enrollment", back_populates="course", cascade="all, delete-orphan")
    assignments = relationship("Assignment", back_populates="course", cascade="all, delete-orphan")


class CourseModule(Base):
    __tablename__ = "course_modules"

    id = Column(Integer, primary_key=True, index=True)
    course_id = Column(Integer, ForeignKey("courses.id", ondelete="CASCADE"), nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    module_order = Column(Integer, default=1)
    duration_weeks = Column(Integer, default=4)

    course = relationship("Course", back_populates="modules")


class Enrollment(Base):
    __tablename__ = "enrollments"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    course_id = Column(Integer, ForeignKey("courses.id", ondelete="CASCADE"), nullable=False)
    status = Column(String(50), default="active") # "active" | "completed" | "dropped"
    progress_percent = Column(Integer, default=0)
    enrolled_at = Column(DateTime(timezone=True), default=utc_now)
    completed_at = Column(DateTime(timezone=True), nullable=True)

    __table_args__ = (UniqueConstraint("student_id", "course_id", name="uq_student_course_enrollment"),)

    student = relationship("User", back_populates="enrollments")
    course = relationship("Course", back_populates="enrollments")


# ============================================================================
# 3. ASSIGNMENTS & SUBMISSIONS
# ============================================================================

class Assignment(Base):
    __tablename__ = "assignments"

    id = Column(Integer, primary_key=True, index=True)
    course_id = Column(Integer, ForeignKey("courses.id", ondelete="CASCADE"), nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    due_date = Column(DateTime(timezone=True), nullable=False)
    max_marks = Column(Integer, default=100)
    allowed_extensions = Column(String(100), default=".pdf,.zip,.py,.ipynb,.docx")
    created_at = Column(DateTime(timezone=True), default=utc_now)

    course = relationship("Course", back_populates="assignments")
    submissions = relationship("Submission", back_populates="assignment", cascade="all, delete-orphan")


class Submission(Base):
    __tablename__ = "submissions"

    id = Column(Integer, primary_key=True, index=True)
    assignment_id = Column(Integer, ForeignKey("assignments.id", ondelete="CASCADE"), nullable=False)
    student_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    file_path = Column(String(500), nullable=False)
    file_name = Column(String(255), nullable=False)
    file_size_bytes = Column(Integer, default=0)
    comments = Column(Text, nullable=True)
    submitted_at = Column(DateTime(timezone=True), default=utc_now)
    status = Column(String(50), default="submitted") # "submitted" | "graded" | "resubmission"
    marks_obtained = Column(Float, nullable=True)
    feedback = Column(Text, nullable=True)
    graded_by_id = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    graded_at = Column(DateTime(timezone=True), nullable=True)

    assignment = relationship("Assignment", back_populates="submissions")
    student = relationship("User", back_populates="submissions", foreign_keys=[student_id])
    graded_by = relationship("User", foreign_keys=[graded_by_id])


# ============================================================================
# 4. EVENTS & REGISTRATIONS
# ============================================================================

class Event(Base):
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    category = Column(String(100), default="Hackathon")
    description = Column(Text, nullable=False)
    event_date = Column(String(100), nullable=False)
    time = Column(String(100), default="10:00 AM - 5:00 PM")
    venue = Column(String(255), default="FSIT Innovation Auditorium & Virtual Stream")
    organizer = Column(String(255), default="School of Future Skills & IT")
    capacity = Column(Integer, default=200)
    registered_count = Column(Integer, default=0)
    image = Column(String(500), nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), default=utc_now)

    registrations = relationship("EventRegistration", back_populates="event", cascade="all, delete-orphan")


class EventRegistration(Base):
    __tablename__ = "event_registrations"

    id = Column(Integer, primary_key=True, index=True)
    event_id = Column(Integer, ForeignKey("events.id", ondelete="CASCADE"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    registered_at = Column(DateTime(timezone=True), default=utc_now)
    status = Column(String(50), default="confirmed") # "confirmed" | "cancelled"
    notes = Column(Text, nullable=True)

    __table_args__ = (UniqueConstraint("event_id", "user_id", name="uq_event_user_registration"),)

    event = relationship("Event", back_populates="registrations")
    user = relationship("User", back_populates="event_registrations")


# ============================================================================
# 5. PROJECTS & CLUBS
# ============================================================================

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    category = Column(String(100), default="AI & Machine Learning")
    technologies = Column(String(255), default="Python, React, FastAPI")
    student_team = Column(String(255), nullable=False)
    creator_id = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    github_url = Column(String(500), nullable=True)
    live_url = Column(String(500), nullable=True)
    image = Column(String(500), nullable=True)
    upvotes_count = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), default=utc_now)

    upvotes = relationship("ProjectUpvote", back_populates="project", cascade="all, delete-orphan")


class ProjectUpvote(Base):
    __tablename__ = "project_upvotes"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id", ondelete="CASCADE"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    created_at = Column(DateTime(timezone=True), default=utc_now)

    __table_args__ = (UniqueConstraint("project_id", "user_id", name="uq_project_user_upvote"),)

    project = relationship("Project", back_populates="upvotes")
    user = relationship("User", back_populates="project_upvotes")


class Club(Base):
    __tablename__ = "clubs"

    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String(100), unique=True, index=True, nullable=False)
    name = Column(String(255), nullable=False)
    category = Column(String(100), default="Technical Society")
    description = Column(Text, nullable=False)
    leads = Column(String(255), default="Student Lead")
    schedule = Column(String(255), default="Every Friday 4:00 PM")
    venue = Column(String(255), default="FSIT Lab 304")
    active_members_count = Column(Integer, default=25)
    tags = Column(String(255), default="Coding, AI, Systems")
    image = Column(String(500), nullable=True)
    created_at = Column(DateTime(timezone=True), default=utc_now)

    memberships = relationship("ClubMembership", back_populates="club", cascade="all, delete-orphan")


class ClubMembership(Base):
    __tablename__ = "club_memberships"

    id = Column(Integer, primary_key=True, index=True)
    club_id = Column(Integer, ForeignKey("clubs.id", ondelete="CASCADE"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    role = Column(String(50), default="member") # "member" | "core" | "lead"
    status = Column(String(50), default="active") # "active" | "pending" | "rejected"
    joined_at = Column(DateTime(timezone=True), default=utc_now)

    __table_args__ = (UniqueConstraint("club_id", "user_id", name="uq_club_user_membership"),)

    club = relationship("Club", back_populates="memberships")
    user = relationship("User", back_populates="club_memberships")


# ============================================================================
# 6. XP, LEVELS & ACHIEVEMENTS (SERVER-AUTHORITATIVE)
# ============================================================================

class Achievement(Base):
    __tablename__ = "achievements"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    category = Column(String(100), default="Competitions") # Competitions, Academic, Open Source, Startup
    award = Column(String(255), nullable=False)
    organization = Column(String(255), nullable=False)
    award_badge = Column(String(100), default="Winner")
    year = Column(String(10), default="2026")
    description = Column(Text, nullable=False)
    xp_reward = Column(Integer, default=150)
    icon = Column(String(100), default="Trophy")

    student_achievements = relationship("StudentAchievement", back_populates="achievement", cascade="all, delete-orphan")


class StudentAchievement(Base):
    __tablename__ = "student_achievements"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    achievement_id = Column(Integer, ForeignKey("achievements.id", ondelete="CASCADE"), nullable=False)
    unlocked_at = Column(DateTime(timezone=True), default=utc_now)

    __table_args__ = (UniqueConstraint("student_id", "achievement_id", name="uq_student_achievement"),)

    achievement = relationship("Achievement", back_populates="student_achievements")


class XPTransaction(Base):
    __tablename__ = "xp_transactions"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    amount = Column(Integer, nullable=False)
    action_type = Column(String(100), nullable=False) # "assignment_submit", "lab_complete", "event_attend", "club_join"
    description = Column(String(255), nullable=False)
    idempotency_key = Column(String(150), unique=True, index=True, nullable=True)
    created_at = Column(DateTime(timezone=True), default=utc_now)

    student = relationship("User", back_populates="xp_transactions")


# ============================================================================
# 7. NOTIFICATIONS & TIMETABLE
# ============================================================================

class Notification(Base):
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    title = Column(String(255), nullable=False)
    message = Column(Text, nullable=False)
    category = Column(String(50), default="academic") # "academic" | "assignment" | "event" | "system"
    is_read = Column(Boolean, default=False)
    action_link = Column(String(255), nullable=True)
    created_at = Column(DateTime(timezone=True), default=utc_now)

    user = relationship("User", back_populates="notifications")


class TimetableEntry(Base):
    __tablename__ = "timetable_entries"

    id = Column(Integer, primary_key=True, index=True)
    day = Column(String(50), nullable=False) # Monday - Friday
    start_time = Column(String(50), nullable=False) # e.g. "09:30 AM"
    end_time = Column(String(50), nullable=False)   # e.g. "11:00 AM"
    course_name = Column(String(255), nullable=False)
    course_code = Column(String(50), nullable=False)
    faculty_name = Column(String(255), nullable=False)
    room = Column(String(100), default="Room 304, Lab Block")
    batch = Column(String(100), default="BCA (AI-ML) Year 2")
    department = Column(String(255), default="School of Future Skills & Information Technology")


# ============================================================================
# 8. ALUMNI & MENTORSHIP
# ============================================================================

class AlumniProfile(Base):
    __tablename__ = "alumni_profiles"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    batch = Column(String(50), default="Class of 2024")
    degree = Column(String(255), default="B.C.A. (AI & Machine Learning)")
    company = Column(String(255), nullable=False)
    role = Column(String(255), nullable=False)
    role_category = Column(String(100), default="Software Engineering")
    location = Column(String(255), default="Bengaluru, India")
    bio = Column(Text, nullable=True)
    skills = Column(String(255), default="System Design, Python, Distributed Systems")
    is_available_for_mentorship = Column(Boolean, default=True)
    image = Column(String(500), nullable=True)
    created_at = Column(DateTime(timezone=True), default=utc_now)

    mentorship_requests = relationship("MentorshipRequest", back_populates="alumni", cascade="all, delete-orphan")


class MentorshipRequest(Base):
    __tablename__ = "mentorship_requests"

    id = Column(Integer, primary_key=True, index=True)
    alumni_id = Column(Integer, ForeignKey("alumni_profiles.id", ondelete="CASCADE"), nullable=False)
    student_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    topic = Column(String(255), default="Resume Review") # "Resume Review" | "Mock Technical Interview" | "Career Guidance"
    notes = Column(Text, nullable=True)
    status = Column(String(50), default="pending") # "pending" | "accepted" | "declined"
    created_at = Column(DateTime(timezone=True), default=utc_now)

    alumni = relationship("AlumniProfile", back_populates="mentorship_requests")
    student = relationship("User")


# ============================================================================
# 9. AI KNOWLEDGE DOCUMENTS & FUTUREBOT CONVERSATIONS
# ============================================================================

class KnowledgeDocument(Base):
    __tablename__ = "knowledge_documents"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    source = Column(String(255), nullable=False)
    source_type = Column(String(50), default="official")
    authority_level = Column(Integer, default=1)
    url = Column(String(500), nullable=True)
    content_type = Column(String(100), default="institutional_profile")
    raw_content = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), default=utc_now)

    chunks = relationship("DocumentChunk", back_populates="document", cascade="all, delete-orphan")


class DocumentChunk(Base):
    __tablename__ = "document_chunks"

    id = Column(Integer, primary_key=True, index=True)
    document_id = Column(Integer, ForeignKey("knowledge_documents.id", ondelete="CASCADE"), nullable=False)
    chunk_index = Column(Integer, default=0)
    content = Column(Text, nullable=False)
    metadata_json = Column(Text, nullable=True)

    document = relationship("KnowledgeDocument", back_populates="chunks")


class ChatConversation(Base):
    __tablename__ = "chat_conversations"

    id = Column(String(100), primary_key=True) # UUID or session_id
    user_id = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    title = Column(String(255), default="New SGSU Inquiry")
    created_at = Column(DateTime(timezone=True), default=utc_now)
    updated_at = Column(DateTime(timezone=True), default=utc_now, onupdate=utc_now)

    messages = relationship("ChatMessage", back_populates="conversation", cascade="all, delete-orphan")


class ChatMessage(Base):
    __tablename__ = "chat_messages"

    id = Column(Integer, primary_key=True, index=True)
    conversation_id = Column(String(100), ForeignKey("chat_conversations.id", ondelete="CASCADE"), nullable=False)
    sender = Column(String(50), nullable=False) # "user" | "bot"
    content = Column(Text, nullable=False)
    intent = Column(String(100), nullable=True)
    confidence = Column(String(50), nullable=True)
    citations_json = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), default=utc_now)

    conversation = relationship("ChatConversation", back_populates="messages")

