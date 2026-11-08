from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List, Optional

from backend.app.db.session import get_db
from backend.app.core.dependencies import get_current_user, get_optional_user, require_roles
from backend.app.models.entities import Course, CourseModule, Enrollment, User
from backend.app.schemas.domain import CourseOut, CourseDetailOut, CourseCreate
from backend.app.services.gamification_service import award_xp

router = APIRouter(prefix="/courses", tags=["Courses"])

@router.get("", response_model=List[CourseOut])
def list_courses(
    q: Optional[str] = None,
    school: Optional[str] = None,
    degree_level: Optional[str] = None,
    current_user: Optional[User] = Depends(get_optional_user),
    db: Session = Depends(get_db)
):
    """
    Lists courses with optional live search and category filters.
    If authenticated, indicates user enrollment status and progress.
    """
    query = db.query(Course).filter(Course.is_published == True)

    if q:
        search_term = f"%{q.strip()}%"
        query = query.filter(
            (Course.programme.ilike(search_term)) |
            (Course.school.ilike(search_term)) |
            (Course.description.ilike(search_term)) |
            (Course.code.ilike(search_term))
        )

    if school and school != "All":
        query = query.filter(Course.school.ilike(f"%{school}%"))

    if degree_level and degree_level != "All":
        query = query.filter(Course.degree_level.ilike(f"%{degree_level}%"))

    courses = query.all()

    enrolled_map = {}
    if current_user:
        enrollments = db.query(Enrollment).filter(Enrollment.student_id == current_user.id).all()
        enrolled_map = {e.course_id: e.progress_percent for e in enrollments}

    result = []
    for c in courses:
        out = CourseOut.model_validate(c)
        out.is_enrolled = c.id in enrolled_map
        out.progress_percent = enrolled_map.get(c.id, 0)
        result.append(out)

    return result


@router.get("/{course_id}", response_model=CourseDetailOut)
def get_course_detail(
    course_id: int,
    current_user: Optional[User] = Depends(get_optional_user),
    db: Session = Depends(get_db)
):
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course track not found.")

    out = CourseDetailOut.model_validate(course)
    if current_user:
        enrollment = db.query(Enrollment).filter(
            Enrollment.student_id == current_user.id,
            Enrollment.course_id == course.id
        ).first()
        if enrollment:
            out.is_enrolled = True
            out.progress_percent = enrollment.progress_percent

    return out


@router.post("/{course_id}/enroll", response_model=CourseOut)
def enroll_in_course(
    course_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course track not found.")

    existing = db.query(Enrollment).filter(
        Enrollment.student_id == current_user.id,
        Enrollment.course_id == course.id
    ).first()

    if not existing:
        enrollment = Enrollment(
            student_id=current_user.id,
            course_id=course.id,
            status="active",
            progress_percent=5
        )
        db.add(enrollment)
        db.commit()

        # Award Server-Side XP for enrollment
        award_xp(
            db=db,
            student_id=current_user.id,
            amount=50,
            action_type="course_enroll",
            description=f"Enrolled in {course.programme}",
            idempotency_key=f"enroll_{current_user.id}_{course.id}"
        )

    out = CourseOut.model_validate(course)
    out.is_enrolled = True
    out.progress_percent = 5
    return out


@router.post("", response_model=CourseOut, status_code=status.HTTP_201_CREATED)
def create_course(
    course_data: CourseCreate,
    current_user: User = Depends(require_roles(["faculty", "admin"])),
    db: Session = Depends(get_db)
):
    """
    Creates a new course track. Authorized for Faculty & Admins only.
    """
    course = Course(
        code=course_data.code.strip().upper(),
        programme=course_data.programme.strip(),
        school=course_data.school.strip(),
        duration=course_data.duration,
        degree_level=course_data.degree_level,
        credits=course_data.credits,
        description=course_data.description,
        instructor_name=course_data.instructor_name or current_user.full_name,
        image=course_data.image
    )
    db.add(course)
    db.commit()
    db.refresh(course)
    return CourseOut.model_validate(course)

