from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import datetime, timezone
from typing import List

from backend.app.db.session import get_db
from backend.app.core.dependencies import require_roles
from backend.app.models.entities import Submission, User, Notification, Course
from backend.app.schemas.domain import SubmissionOut, SubmissionGradeRequest, CourseOut

router = APIRouter(prefix="/faculty", tags=["Faculty Management"])

@router.post("/submissions/{submission_id}/grade", response_model=SubmissionOut)
def grade_student_submission(
    submission_id: int,
    data: SubmissionGradeRequest,
    current_user: User = Depends(require_roles(["faculty", "admin"])),
    db: Session = Depends(get_db)
):
    """
    Grades an assignment submission, providing marks and feedback.
    Sends notification to the student.
    """
    sub = db.query(Submission).filter(Submission.id == submission_id).first()
    if not sub:
        raise HTTPException(status_code=404, detail="Submission not found.")

    sub.marks_obtained = data.marks_obtained
    sub.feedback = data.feedback
    sub.status = "graded"
    sub.graded_by_id = current_user.id
    sub.graded_at = datetime.now(timezone.utc)

    # Notify student
    notif = Notification(
        user_id=sub.student_id,
        title="Assignment Graded",
        message=f"Your submission for '{sub.assignment.title if sub.assignment else 'Assignment'}' was evaluated: {data.marks_obtained} marks. Feedback: {data.feedback[:100]}...",
        category="assignment",
        action_link="/assignments"
    )
    db.add(notif)
    db.commit()
    db.refresh(sub)

    out = SubmissionOut.model_validate(sub)
    out.student_name = sub.student.full_name if sub.student else "Student"
    return out


@router.get("/pending-submissions", response_model=List[SubmissionOut])
def get_pending_submissions(
    current_user: User = Depends(require_roles(["faculty", "admin"])),
    db: Session = Depends(get_db)
):
    """
    Lists pending submissions awaiting grading.
    """
    subs = db.query(Submission).filter(Submission.status == "submitted").all()
    results = []
    for s in subs:
        out = SubmissionOut.model_validate(s)
        out.student_name = s.student.full_name if s.student else "Student"
        results.append(out)
    return results


@router.get("/courses", response_model=List[CourseOut])
def get_faculty_courses(
    current_user: User = Depends(require_roles(["faculty", "admin"])),
    db: Session = Depends(get_db)
):
    courses = db.query(Course).all()
    return [CourseOut.model_validate(c) for c in courses]

