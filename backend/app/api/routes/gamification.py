from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional

from backend.app.db.session import get_db
from backend.app.core.dependencies import get_current_user, get_optional_user, require_roles
from backend.app.models.entities import Achievement, StudentAchievement, StudentProfile, User
from backend.app.schemas.domain import AchievementOut, LeaderboardEntryOut, AwardXPRequest, XPTransactionOut
from backend.app.services.gamification_service import award_xp, unlock_achievement

router = APIRouter(tags=["Gamification & Leaderboard"])

@router.get("/achievements", response_model=List[AchievementOut])
def list_achievements(
    current_user: Optional[User] = Depends(get_optional_user),
    db: Session = Depends(get_db)
):
    unlocked_ids = set()
    if current_user:
        unlocked = db.query(StudentAchievement).filter(
            StudentAchievement.student_id == current_user.id
        ).all()
        unlocked_ids = {u.achievement_id for u in unlocked}

    achievements = db.query(Achievement).all()
    results = []
    for a in achievements:
        out = AchievementOut.model_validate(a)
        out.is_unlocked = (a.id in unlocked_ids)
        results.append(out)
    return results


@router.get("/leaderboard", response_model=List[LeaderboardEntryOut])
def get_leaderboard(
    limit: int = 15,
    current_user: Optional[User] = Depends(get_optional_user),
    db: Session = Depends(get_db)
):
    """
    Returns server-ranked student leaderboard computed from verified database XP balances.
    """
    profiles = (
        db.query(StudentProfile)
        .join(User)
        .filter(User.is_active == True)
        .order_by(StudentProfile.xp_points.desc())
        .limit(limit)
        .all()
    )

    results = []
    for idx, p in enumerate(profiles):
        badges_count = db.query(StudentAchievement).filter(
            StudentAchievement.student_id == p.user_id
        ).count()

        results.append(
            LeaderboardEntryOut(
                rank=idx + 1,
                student_id=p.user_id,
                name=p.user.full_name if p.user else "Scholar",
                programme=p.programme,
                xp_points=p.xp_points or 0,
                level=p.level or 1,
                badges_count=badges_count,
                avatar_url=p.user.avatar_url if p.user else None,
                is_current_user=bool(current_user and current_user.id == p.user_id)
            )
        )
    return results


@router.post("/gamification/award-xp", response_model=XPTransactionOut)
def award_points_endpoint(
    data: AwardXPRequest,
    current_user: User = Depends(require_roles(["faculty", "admin"])),
    db: Session = Depends(get_db)
):
    """
    Authoritative server-side XP award endpoint for authorized faculty & administrators.
    """
    tx = award_xp(
        db=db,
        student_id=current_user.id,
        amount=data.amount,
        action_type=data.action_type,
        description=data.description,
        idempotency_key=data.idempotency_key
    )
    if not tx:
        raise HTTPException(status_code=400, detail="Unable to process XP transaction.")
    return XPTransactionOut.model_validate(tx)

