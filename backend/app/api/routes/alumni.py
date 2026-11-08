from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional

from backend.app.db.session import get_db
from backend.app.core.dependencies import get_current_user, get_optional_user
from backend.app.models.entities import AlumniProfile, MentorshipRequest, User, Notification
from backend.app.schemas.domain import AlumniProfileOut, MentorshipRequestCreate, MentorshipRequestOut
from backend.app.services.gamification_service import award_xp

router = APIRouter(prefix="/alumni", tags=["Alumni & Mentorship"])

@router.get("", response_model=List[AlumniProfileOut])
def list_alumni(
    q: Optional[str] = None,
    role_category: Optional[str] = None,
    batch: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(AlumniProfile)

    if q:
        search_term = f"%{q.strip()}%"
        query = query.filter(
            (AlumniProfile.name.ilike(search_term)) |
            (AlumniProfile.company.ilike(search_term)) |
            (AlumniProfile.role.ilike(search_term)) |
            (AlumniProfile.skills.ilike(search_term))
        )

    if role_category and role_category != "All Roles":
        query = query.filter(AlumniProfile.role_category.ilike(f"%{role_category}%"))

    if batch and batch != "All Batches":
        query = query.filter(AlumniProfile.batch.ilike(f"%{batch}%"))

    alumni_list = query.all()
    return [AlumniProfileOut.model_validate(al) for al in alumni_list]


@router.post("/{alumni_id}/mentorship", response_model=MentorshipRequestOut, status_code=status.HTTP_201_CREATED)
def request_mentorship(
    alumni_id: int,
    data: MentorshipRequestCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    alumni = db.query(AlumniProfile).filter(AlumniProfile.id == alumni_id).first()
    if not alumni:
        raise HTTPException(status_code=404, detail="Alumni profile not found.")

    if not alumni.is_available_for_mentorship:
        raise HTTPException(status_code=400, detail="This senior is currently not accepting mentorship slots.")

    req = MentorshipRequest(
        alumni_id=alumni_id,
        student_id=current_user.id,
        topic=data.topic,
        notes=data.notes,
        status="pending"
    )
    db.add(req)
    db.commit()
    db.refresh(req)

    # Award +30 XP for seeking professional mentorship
    award_xp(
        db=db,
        student_id=current_user.id,
        amount=30,
        action_type="mentorship_request",
        description=f"Requested mentorship with {alumni.name} ({alumni.company})",
        idempotency_key=f"mentor_{current_user.id}_{alumni.id}_{datetime.now().strftime('%Y%m')}"
    )

    out = MentorshipRequestOut.model_validate(req)
    out.alumni_name = alumni.name
    return out


@router.get("/mentorship-requests", response_model=List[MentorshipRequestOut])
def list_student_mentorship_requests(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    reqs = db.query(MentorshipRequest).filter(
        MentorshipRequest.student_id == current_user.id
    ).order_by(MentorshipRequest.created_at.desc()).all()

    results = []
    for r in reqs:
        out = MentorshipRequestOut.model_validate(r)
        out.alumni_name = r.alumni.name if r.alumni else "Alumni Mentor"
        results.append(out)
    return results

