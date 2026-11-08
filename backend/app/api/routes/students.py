from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import datetime, timezone
from typing import List

from backend.app.db.session import get_db
from backend.app.core.dependencies import get_current_user, require_roles
from backend.app.models.entities import (
    User, StudentProfile, Enrollment, Assignment, Submission, Event, EventRegistration,
    Notification, TimetableEntry, StudentAchievement, Achievement
)
from backend.app.schemas.domain import (
    StudentDashboardResponse, StudentProfileOut, StudentProfileUpdate,
    EnrolledCourseSummary, AssignmentSummary, EventSummary,
    NotificationOut, TimetableEntryOut, AchievementOut, UserOut
)
from backend.app.services.gamification_service import calculate_level_info

router = APIRouter(prefix="/student", tags=["Student Portal"])

@router.get("/dashboard", response_model=StudentDashboardResponse)
def get_student_dashboard(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Returns authenticated dashboard data specifically for the current logged-in student.
    Never allows cross-student ID tampering.
    """
    profile = db.query(StudentProfile).filter(StudentProfile.user_id == current_user.id).first()
    if not profile:
        profile = StudentProfile(user_id=current_user.id, xp_points=100, level=1)
        db.add(profile)
        db.commit()
        db.refresh(profile)

    current_lvl, level_title, next_threshold = calculate_level_info(profile.xp_points or 0)

    # 1. Enrolled courses
    enrollments = db.query(Enrollment).filter(Enrollment.student_id == current_user.id).all()
    enrolled_courses = [
        EnrolledCourseSummary(
            id=e.course.id,
            code=e.course.code,
            programme=e.course.programme,
            school=e.course.school,
            progress_percent=e.progress_percent,
            status=e.status,
            image=e.course.image
        )
        for e in enrollments if e.course
    ]

    # 2. Upcoming assignments
    assignments = db.query(Assignment).all()
    upcoming_assignments = []
    for a in assignments[:6]:
        sub = db.query(Submission).filter(
            Submission.assignment_id == a.id,
            Submission.student_id == current_user.id
        ).first()

        due = a.due_date.replace(tzinfo=timezone.utc) if a.due_date.tzinfo is None else a.due_date
        sub_status = "submitted" if sub else ("overdue" if due < datetime.now(timezone.utc) else "pending")
        upcoming_assignments.append(
            AssignmentSummary(
                id=a.id,
                course_name=a.course.programme if a.course else "Core Technology",
                title=a.title,
                due_date=a.due_date,
                status=sub_status,
                max_marks=a.max_marks,
                marks_obtained=sub.marks_obtained if sub else None
            )
        )

    # 3. Upcoming events
    all_events = db.query(Event).filter(Event.is_active == True).all()
    registered_event_ids = {
        r.event_id for r in db.query(EventRegistration).filter(
            EventRegistration.user_id == current_user.id,
            EventRegistration.status == "confirmed"
        ).all()
    }
    upcoming_events = [
        EventSummary(
            id=ev.id,
            title=ev.title,
            event_date=ev.event_date,
            venue=ev.venue,
            is_registered=(ev.id in registered_event_ids)
        )
        for ev in all_events[:5]
    ]

    # 4. Unread notifications count
    unread_count = db.query(Notification).filter(
        Notification.user_id == current_user.id,
        Notification.is_read == False
    ).count()

    # 5. Today's classes count
    today_classes = db.query(TimetableEntry).count()

    return StudentDashboardResponse(
        user=UserOut.model_validate(current_user),
        profile=StudentProfileOut.model_validate(profile),
        level_title=level_title,
        next_level_xp=next_threshold,
        enrolled_courses=enrolled_courses,
        upcoming_assignments=upcoming_assignments,
        upcoming_events=upcoming_events,
        recent_notifications_count=unread_count,
        today_classes_count=today_classes
    )


@router.get("/profile", response_model=StudentProfileOut)
def get_student_profile(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    profile = db.query(StudentProfile).filter(StudentProfile.user_id == current_user.id).first()
    if not profile:
        profile = StudentProfile(user_id=current_user.id)
        db.add(profile)
        db.commit()
        db.refresh(profile)
    return StudentProfileOut.model_validate(profile)


@router.patch("/profile", response_model=StudentProfileOut)
def update_student_profile(
    update_data: StudentProfileUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    profile = db.query(StudentProfile).filter(StudentProfile.user_id == current_user.id).first()
    if not profile:
        profile = StudentProfile(user_id=current_user.id)
        db.add(profile)

    if update_data.full_name is not None:
        current_user.full_name = update_data.full_name.strip()
    if update_data.avatar_url is not None:
        current_user.avatar_url = update_data.avatar_url
    if update_data.skills is not None:
        profile.skills = update_data.skills
    if update_data.bio is not None:
        profile.bio = update_data.bio
    if update_data.github_url is not None:
        profile.github_url = update_data.github_url
    if update_data.linkedin_url is not None:
        profile.linkedin_url = update_data.linkedin_url

    db.commit()
    db.refresh(profile)
    return StudentProfileOut.model_validate(profile)


@router.get("/timetable", response_model=List[TimetableEntryOut])
def get_student_timetable(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    entries = db.query(TimetableEntry).all()
    return [TimetableEntryOut.model_validate(e) for e in entries]


@router.get("/achievements", response_model=List[AchievementOut])
def get_student_achievements(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    unlocked_ids = {
        sa.achievement_id for sa in db.query(StudentAchievement).filter(
            StudentAchievement.student_id == current_user.id
        ).all()
    }
    achievements = db.query(Achievement).all()
    res = []
    for a in achievements:
        data = AchievementOut.model_validate(a)
        data.is_unlocked = (a.id in unlocked_ids)
        res.append(data)
    return res
