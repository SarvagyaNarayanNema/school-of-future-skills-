import os
from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Form
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from datetime import datetime, timezone
from typing import List, Optional
from pathlib import Path

from backend.app.db.session import get_db
from backend.app.core.config import settings
from backend.app.core.dependencies import get_current_user, get_optional_user, require_roles
from backend.app.models.entities import Assignment, Submission, Course, User
from backend.app.schemas.domain import AssignmentOut, AssignmentCreate, SubmissionOut
from backend.app.services.storage_service import save_uploaded_file
from backend.app.services.gamification_service import award_xp

router = APIRouter(prefix="/assignments", tags=["Assignments"])

def is_overdue(due_date) -> bool:
    if not due_date:
        return False
    now = datetime.now(timezone.utc)
    if due_date.tzinfo is None:
        due_date = due_date.replace(tzinfo=timezone.utc)
    return due_date < now

@router.get("", response_model=List[AssignmentOut])
def list_assignments(
    current_user: Optional[User] = Depends(get_optional_user),
    db: Session = Depends(get_db)
):
    """
    Lists assignments. If student is authenticated, checks submission status, marks and feedback.
    """
    assignments = db.query(Assignment).all()
    results = []

    for a in assignments:
        out = AssignmentOut.model_validate(a)
        out.course_name = a.course.programme if a.course else "Future Skills Core"

        if current_user:
            sub = db.query(Submission).filter(
                Submission.assignment_id == a.id,
                Submission.student_id == current_user.id
            ).first()

            if sub:
                out.submission_status = sub.status
                out.submission_file = sub.file_name
                out.marks_obtained = sub.marks_obtained
                out.feedback = sub.feedback
            else:
                out.submission_status = "overdue" if is_overdue(a.due_date) else "pending"

        results.append(out)

    return results


@router.get("/{assignment_id}", response_model=AssignmentOut)
def get_assignment(
    assignment_id: int,
    current_user: Optional[User] = Depends(get_optional_user),
    db: Session = Depends(get_db)
):
    a = db.query(Assignment).filter(Assignment.id == assignment_id).first()
    if not a:
        raise HTTPException(status_code=404, detail="Assignment not found.")

    out = AssignmentOut.model_validate(a)
    out.course_name = a.course.programme if a.course else "Future Skills Core"

    if current_user:
        sub = db.query(Submission).filter(
            Submission.assignment_id == a.id,
            Submission.student_id == current_user.id
        ).first()
        if sub:
            out.submission_status = sub.status
            out.submission_file = sub.file_name
            out.marks_obtained = sub.marks_obtained
            out.feedback = sub.feedback

    return out


@router.post("", response_model=AssignmentOut, status_code=status.HTTP_201_CREATED)
def create_assignment(
    data: AssignmentCreate,
    current_user: User = Depends(require_roles(["faculty", "admin"])),
    db: Session = Depends(get_db)
):
    course = db.query(Course).filter(Course.id == data.course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course track does not exist.")

    a = Assignment(
        course_id=data.course_id,
        title=data.title.strip(),
        description=data.description,
        due_date=data.due_date,
        max_marks=data.max_marks,
        allowed_extensions=data.allowed_extensions
    )
    db.add(a)
    db.commit()
    db.refresh(a)

    out = AssignmentOut.model_validate(a)
    out.course_name = course.programme
    return out


@router.post("/{assignment_id}/submit", response_model=SubmissionOut, status_code=status.HTTP_201_CREATED)
async def submit_assignment_file(
    assignment_id: int,
    file: UploadFile = File(...),
    comments: Optional[str] = Form(None),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Real file upload for assignment submission.
    Validates file extensions, stores file on server storage, and awards +100 XP to the student.
    """
    assignment = db.query(Assignment).filter(Assignment.id == assignment_id).first()
    if not assignment:
        raise HTTPException(status_code=404, detail="Assignment not found.")

    # Save file to storage
    rel_path, orig_name, size_bytes = await save_uploaded_file(file, current_user.id)

    # Check existing submission or create new
    existing_sub = db.query(Submission).filter(
        Submission.assignment_id == assignment_id,
        Submission.student_id == current_user.id
    ).first()

    if existing_sub:
        existing_sub.file_path = rel_path
        existing_sub.file_name = orig_name
        existing_sub.file_size_bytes = size_bytes
        existing_sub.comments = comments
        existing_sub.submitted_at = datetime.now(timezone.utc)
        existing_sub.status = "submitted"
        submission = existing_sub
    else:
        submission = Submission(
            assignment_id=assignment_id,
            student_id=current_user.id,
            file_path=rel_path,
            file_name=orig_name,
            file_size_bytes=size_bytes,
            comments=comments,
            status="submitted"
        )
        db.add(submission)

    db.commit()
    db.refresh(submission)

    # Award +100 Server-Controlled XP with idempotency
    award_xp(
        db=db,
        student_id=current_user.id,
        amount=100,
        action_type="assignment_submit",
        description=f"Submitted deliverable for {assignment.title}",
        idempotency_key=f"sub_{current_user.id}_{assignment.id}"
    )

    out = SubmissionOut.model_validate(submission)
    out.student_name = current_user.full_name
    return out


@router.get("/{assignment_id}/submissions", response_model=List[SubmissionOut])
def get_assignment_submissions(
    assignment_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Faculty & Admins view all submissions. Students view only their own submission.
    """
    query = db.query(Submission).filter(Submission.assignment_id == assignment_id)
    if current_user.role not in ["faculty", "admin"]:
        query = query.filter(Submission.student_id == current_user.id)

    subs = query.all()
    results = []
    for s in subs:
        out = SubmissionOut.model_validate(s)
        out.student_name = s.student.full_name if s.student else "Student"
        results.append(out)
    return results


@router.get("/download/{submission_id}")
def download_submission_file(
    submission_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Streams the submitted file.
    Security Check: Students can only download their own submission.
    """
    sub = db.query(Submission).filter(Submission.id == submission_id).first()
    if not sub:
        raise HTTPException(status_code=404, detail="Submission record not found.")

    if current_user.role not in ["faculty", "admin"] and sub.student_id != current_user.id:
        raise HTTPException(status_code=403, detail="Unauthorized to access this submission file.")

    full_path = settings.UPLOAD_DIR.parent / sub.file_path
    if not full_path.exists():
        # check in uploads directly
        full_path = settings.UPLOAD_DIR / Path(sub.file_path).name
        if not full_path.exists():
            raise HTTPException(status_code=404, detail="File on storage server was not found.")

    return FileResponse(
        path=str(full_path),
        filename=sub.file_name,
        media_type="application/octet-stream"
    )
