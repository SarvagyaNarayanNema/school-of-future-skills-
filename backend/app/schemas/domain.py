from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional, Dict, Any
from datetime import datetime, timezone

# ============================================================================
# AUTH & USER SCHEMAS
# ============================================================================

class LoginRequest(BaseModel):
    email: str
    password: str

class RegisterRequest(BaseModel):
    email: str
    password: str
    full_name: str
    role: Optional[str] = "student" # "student" | "faculty" | "admin"
    roll_no: Optional[str] = None
    programme: Optional[str] = None

class PasswordResetRequest(BaseModel):
    email: str
    new_password: str

class UserOut(BaseModel):
    id: int
    email: str
    full_name: str
    role: str
    is_active: bool
    avatar_url: Optional[str] = None
    created_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserOut

# ============================================================================
# STUDENT PROFILE & DASHBOARD SCHEMAS
# ============================================================================

class StudentProfileOut(BaseModel):
    id: int
    user_id: int
    roll_no: Optional[str] = None
    enrollment_no: Optional[str] = None
    programme: str
    semester: str
    school: str
    xp_points: int
    level: int
    streak_days: int
    skills: str
    bio: str
    github_url: Optional[str] = None
    linkedin_url: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)

class StudentProfileUpdate(BaseModel):
    full_name: Optional[str] = None
    skills: Optional[str] = None
    bio: Optional[str] = None
    github_url: Optional[str] = None
    linkedin_url: Optional[str] = None
    avatar_url: Optional[str] = None

class EnrolledCourseSummary(BaseModel):
    id: int
    code: str
    programme: str
    school: str
    progress_percent: int
    status: str
    image: Optional[str] = None

class AssignmentSummary(BaseModel):
    id: int
    course_name: str
    title: str
    due_date: datetime
    status: str # "pending" | "submitted" | "graded" | "overdue"
    max_marks: int
    marks_obtained: Optional[float] = None

class EventSummary(BaseModel):
    id: int
    title: str
    event_date: str
    venue: str
    is_registered: bool = False

class StudentDashboardResponse(BaseModel):
    user: UserOut
    profile: StudentProfileOut
    level_title: str
    next_level_xp: int
    enrolled_courses: List[EnrolledCourseSummary] = []
    upcoming_assignments: List[AssignmentSummary] = []
    upcoming_events: List[EventSummary] = []
    recent_notifications_count: int = 0
    today_classes_count: int = 0

# ============================================================================
# COURSE SCHEMAS
# ============================================================================

class CourseModuleOut(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    module_order: int
    duration_weeks: int

    model_config = ConfigDict(from_attributes=True)

class CourseOut(BaseModel):
    id: int
    code: str
    programme: str
    school: str
    duration: str
    degree_level: str
    credits: int
    description: Optional[str] = None
    image: Optional[str] = None
    instructor_name: str
    is_enrolled: Optional[bool] = False
    progress_percent: Optional[int] = 0

    model_config = ConfigDict(from_attributes=True)

class CourseDetailOut(CourseOut):
    modules: List[CourseModuleOut] = []

class CourseCreate(BaseModel):
    code: str
    programme: str
    school: str
    duration: str = "3 Years"
    degree_level: str = "Undergraduate"
    credits: int = 120
    description: str
    instructor_name: Optional[str] = "Dr. Pooja Bijlani"
    image: Optional[str] = None

# ============================================================================
# ASSIGNMENT & SUBMISSION SCHEMAS
# ============================================================================

class AssignmentOut(BaseModel):
    id: int
    course_id: int
    course_name: Optional[str] = None
    title: str
    description: str
    due_date: datetime
    max_marks: int
    allowed_extensions: str
    submission_status: Optional[str] = "pending" # "pending" | "submitted" | "graded" | "overdue"
    submission_file: Optional[str] = None
    marks_obtained: Optional[float] = None
    feedback: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)

class AssignmentCreate(BaseModel):
    course_id: int
    title: str
    description: str
    due_date: datetime
    max_marks: int = 100
    allowed_extensions: Optional[str] = ".pdf,.zip,.py,.ipynb,.docx"

class SubmissionOut(BaseModel):
    id: int
    assignment_id: int
    student_id: int
    student_name: Optional[str] = None
    file_name: str
    file_size_bytes: int
    comments: Optional[str] = None
    submitted_at: datetime
    status: str
    marks_obtained: Optional[float] = None
    feedback: Optional[str] = None
    graded_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)

class SubmissionGradeRequest(BaseModel):
    marks_obtained: float
    feedback: str

# ============================================================================
# EVENT SCHEMAS
# ============================================================================

class EventOut(BaseModel):
    id: int
    title: str
    category: str
    description: str
    event_date: str
    time: str
    venue: str
    organizer: str
    capacity: int
    registered_count: int
    image: Optional[str] = None
    is_registered: Optional[bool] = False

    model_config = ConfigDict(from_attributes=True)

class EventCreate(BaseModel):
    title: str
    category: str = "Hackathon"
    description: str
    event_date: str
    time: str = "10:00 AM - 5:00 PM"
    venue: str = "FSIT Innovation Hub"
    organizer: str = "School of Future Skills & IT"
    capacity: int = 200
    image: Optional[str] = None

class EventRegisterRequest(BaseModel):
    notes: Optional[str] = None

# ============================================================================
# PROJECT & CLUB SCHEMAS
# ============================================================================

class ProjectOut(BaseModel):
    id: int
    title: str
    description: str
    category: str
    technologies: str
    student_team: str
    github_url: Optional[str] = None
    live_url: Optional[str] = None
    image: Optional[str] = None
    upvotes_count: int
    has_upvoted: Optional[bool] = False
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

class ProjectCreate(BaseModel):
    title: str
    description: str
    category: str = "AI & Machine Learning"
    technologies: str
    student_team: str
    github_url: Optional[str] = None
    live_url: Optional[str] = None
    image: Optional[str] = None

class ClubOut(BaseModel):
    id: int
    slug: str
    name: str
    category: str
    description: str
    leads: str
    schedule: str
    venue: str
    active_members_count: int
    tags: str
    image: Optional[str] = None
    is_member: Optional[bool] = False

    model_config = ConfigDict(from_attributes=True)

class ClubJoinRequest(BaseModel):
    notes: Optional[str] = None

# ============================================================================
# GAMIFICATION & LEADERBOARD SCHEMAS
# ============================================================================

class XPTransactionOut(BaseModel):
    id: int
    amount: int
    action_type: str
    description: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

class AwardXPRequest(BaseModel):
    amount: int
    action_type: str
    description: str
    idempotency_key: Optional[str] = None

class AchievementOut(BaseModel):
    id: int
    title: str
    category: str
    award: str
    organization: str
    award_badge: str
    year: str
    description: str
    xp_reward: int
    icon: str
    is_unlocked: Optional[bool] = False

    model_config = ConfigDict(from_attributes=True)

class LeaderboardEntryOut(BaseModel):
    rank: int
    student_id: int
    name: str
    programme: str
    xp_points: int
    level: int
    badges_count: int
    avatar_url: Optional[str] = None
    is_current_user: Optional[bool] = False

# ============================================================================
# NOTIFICATIONS & TIMETABLE SCHEMAS
# ============================================================================

class NotificationOut(BaseModel):
    id: int
    title: str
    message: str
    category: str
    is_read: bool
    action_link: Optional[str] = None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

class TimetableEntryOut(BaseModel):
    id: int
    day: str
    start_time: str
    end_time: str
    course_name: str
    course_code: str
    faculty_name: str
    room: str
    batch: str
    department: str

    model_config = ConfigDict(from_attributes=True)

# ============================================================================
# ALUMNI & MENTORSHIP SCHEMAS
# ============================================================================

class AlumniProfileOut(BaseModel):
    id: int
    name: str
    batch: str
    degree: str
    company: str
    role: str
    role_category: str
    location: str
    bio: Optional[str] = None
    skills: str
    is_available_for_mentorship: bool
    image: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)

class MentorshipRequestCreate(BaseModel):
    topic: str = "Resume Review" # "Resume Review" | "Mock Technical Interview" | "Career Guidance"
    notes: Optional[str] = None

class MentorshipRequestOut(BaseModel):
    id: int
    alumni_id: int
    alumni_name: Optional[str] = None
    student_id: int
    topic: str
    notes: Optional[str] = None
    status: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

# ============================================================================
# FUTUREBOT AI & RAG SCHEMAS
# ============================================================================

class CitationModel(BaseModel):
    title: str
    source: str
    authority: str
    url: Optional[str] = None
    page: Optional[int] = None

class ActionLink(BaseModel):
    label: str
    route: Optional[str] = None
    url: Optional[str] = None
    type: str = "internal" # "internal" | "external"

class QueryRequest(BaseModel):
    query: str
    session_id: Optional[str] = "session-guest"
    history: Optional[List[Dict[str, Any]]] = []
    provider: Optional[str] = "autonomous"

class ChatResponse(BaseModel):
    text: str
    citations: List[CitationModel] = []
    actions: List[ActionLink] = []
    confidence: str = "HIGH"
    intent: str = "GENERAL"
    timestamp: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

