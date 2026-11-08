from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional

from backend.app.db.session import get_db
from backend.app.core.dependencies import get_current_user, get_optional_user
from backend.app.models.entities import Club, ClubMembership, User
from backend.app.schemas.domain import ClubOut, ClubJoinRequest
from backend.app.services.gamification_service import award_xp

router = APIRouter(prefix="/clubs", tags=["Clubs"])

@router.get("", response_model=List[ClubOut])
def list_clubs(
    current_user: Optional[User] = Depends(get_optional_user),
    db: Session = Depends(get_db)
):
    clubs = db.query(Club).all()
    user_memberships = set()

    if current_user:
        memberships = db.query(ClubMembership).filter(
            ClubMembership.user_id == current_user.id,
            ClubMembership.status == "active"
        ).all()
        user_memberships = {m.club_id for m in memberships}

    results = []
    for c in clubs:
        out = ClubOut.model_validate(c)
        out.is_member = (c.id in user_memberships)
        results.append(out)
    return results


@router.get("/{club_id}", response_model=ClubOut)
def get_club(
    club_id: int,
    current_user: Optional[User] = Depends(get_optional_user),
    db: Session = Depends(get_db)
):
    club = db.query(Club).filter(Club.id == club_id).first()
    if not club:
        raise HTTPException(status_code=404, detail="Club not found.")

    out = ClubOut.model_validate(club)
    if current_user:
        m = db.query(ClubMembership).filter(
            ClubMembership.club_id == club_id,
            ClubMembership.user_id == current_user.id,
            ClubMembership.status == "active"
        ).first()
        out.is_member = bool(m)

    return out


@router.post("/{club_id}/join", response_model=ClubOut)
def join_club(
    club_id: int,
    data: Optional[ClubJoinRequest] = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Registers student into club roster and awards +75 server-controlled XP.
    """
    club = db.query(Club).filter(Club.id == club_id).first()
    if not club:
        raise HTTPException(status_code=404, detail="Club not found.")

    existing = db.query(ClubMembership).filter(
        ClubMembership.club_id == club_id,
        ClubMembership.user_id == current_user.id
    ).first()

    if existing and existing.status == "active":
        out = ClubOut.model_validate(club)
        out.is_member = True
        return out

    if existing:
        existing.status = "active"
    else:
        membership = ClubMembership(
            club_id=club_id,
            user_id=current_user.id,
            role="member",
            status="active"
        )
        db.add(membership)
        club.active_members_count += 1

    db.commit()

    # Award XP
    award_xp(
        db=db,
        student_id=current_user.id,
        amount=75,
        action_type="club_join",
        description=f"Joined student society '{club.name}'",
        idempotency_key=f"club_{current_user.id}_{club.id}"
    )

    out = ClubOut.model_validate(club)
    out.is_member = True
    return out

