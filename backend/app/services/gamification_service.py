from typing import Tuple, Optional
from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from backend.app.models.entities import StudentProfile, XPTransaction, Notification, StudentAchievement, Achievement

LEVEL_THRESHOLDS = [
    (0, 1, "Novice Explorer"),
    (200, 2, "Code Pioneer"),
    (400, 3, "Algorithms Specialist"),
    (700, 4, "Full-Stack Engineer"),
    (1100, 5, "Intelligence Architect"),
    (1600, 6, "Systems Grandmaster"),
    (2200, 7, "Distinguished Tech Fellow")
]

def calculate_level_info(xp: int) -> Tuple[int, str, int]:
    """
    Computes level number, level title, and next level XP threshold from total XP.
    """
    current_level = 1
    current_title = "Novice Explorer"
    next_threshold = 200

    for idx, (threshold, lvl, title) in enumerate(LEVEL_THRESHOLDS):
        if xp >= threshold:
            current_level = lvl
            current_title = title
            if idx + 1 < len(LEVEL_THRESHOLDS):
                next_threshold = LEVEL_THRESHOLDS[idx + 1][0]
            else:
                next_threshold = threshold + 1000

    return current_level, current_title, next_threshold

def award_xp(
    db: Session,
    student_id: int,
    amount: int,
    action_type: str,
    description: str,
    idempotency_key: Optional[str] = None
) -> Optional[XPTransaction]:
    """
    Authoritatively awards XP on the server.
    Guarantees idempotency (prevents duplicate awards for same action).
    Updates student level and logs transaction + student notification.
    """
    if amount <= 0:
        return None

    # Check for idempotency to prevent duplicate farming
    if idempotency_key:
        existing = db.query(XPTransaction).filter(
            XPTransaction.student_id == student_id,
            XPTransaction.idempotency_key == idempotency_key
        ).first()
        if existing:
            return existing

    profile = db.query(StudentProfile).filter(StudentProfile.user_id == student_id).first()
    if not profile:
        profile = StudentProfile(user_id=student_id, xp_points=0, level=1)
        db.add(profile)
        db.flush()

    # Record ledger transaction
    tx = XPTransaction(
        student_id=student_id,
        amount=amount,
        action_type=action_type,
        description=description,
        idempotency_key=idempotency_key
    )
    db.add(tx)

    # Update profile XP and Level
    profile.xp_points = (profile.xp_points or 0) + amount
    new_lvl, new_title, _ = calculate_level_info(profile.xp_points)
    
    level_up = new_lvl > (profile.level or 1)
    profile.level = new_lvl

    # Create notification
    notif_msg = f"+{amount} XP earned: {description} ⚡"
    if level_up:
        notif_msg += f" Congratulations! You promoted to Level {new_lvl} ({new_title})! 🚀"

    notif = Notification(
        user_id=student_id,
        title="XP Earned" if not level_up else "Level Promoted! 🏆",
        message=notif_msg,
        category="system",
        action_link="/dashboard"
    )
    db.add(notif)
    db.commit()
    db.refresh(tx)
    return tx

def unlock_achievement(
    db: Session,
    student_id: int,
    achievement_id: int
) -> bool:
    """
    Unlocks an achievement for a student and awards its associated XP.
    """
    existing = db.query(StudentAchievement).filter(
        StudentAchievement.student_id == student_id,
        StudentAchievement.achievement_id == achievement_id
    ).first()
    if existing:
        return False # Already unlocked

    ach = db.query(Achievement).filter(Achievement.id == achievement_id).first()
    if not ach:
        return False

    link = StudentAchievement(student_id=student_id, achievement_id=achievement_id)
    db.add(link)

    # Award XP
    if ach.xp_reward:
        award_xp(
            db=db,
            student_id=student_id,
            amount=ach.xp_reward,
            action_type="achievement_unlock",
            description=f"Unlocked Achievement: {ach.title}",
            idempotency_key=f"ach_{student_id}_{achievement_id}"
        )

    db.commit()
    return True

