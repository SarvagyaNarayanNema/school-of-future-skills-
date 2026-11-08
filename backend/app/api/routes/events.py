from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional

from backend.app.db.session import get_db
from backend.app.core.dependencies import get_current_user, get_optional_user, require_roles
from backend.app.models.entities import Event, EventRegistration, User
from backend.app.schemas.domain import EventOut, EventCreate, EventRegisterRequest
from backend.app.services.gamification_service import award_xp

router = APIRouter(prefix="/events", tags=["Events"])

@router.get("", response_model=List[EventOut])
def list_events(
    category: Optional[str] = None,
    current_user: Optional[User] = Depends(get_optional_user),
    db: Session = Depends(get_db)
):
    query = db.query(Event).filter(Event.is_active == True)
    if category and category != "All":
        query = query.filter(Event.category.ilike(f"%{category}%"))

    events = query.all()
    user_reg_ids = set()
    if current_user:
        regs = db.query(EventRegistration).filter(
            EventRegistration.user_id == current_user.id,
            EventRegistration.status == "confirmed"
        ).all()
        user_reg_ids = {r.event_id for r in regs}

    results = []
    for ev in events:
        out = EventOut.model_validate(ev)
        out.is_registered = (ev.id in user_reg_ids)
        results.append(out)
    return results


@router.get("/{event_id}", response_model=EventOut)
def get_event(
    event_id: int,
    current_user: Optional[User] = Depends(get_optional_user),
    db: Session = Depends(get_db)
):
    ev = db.query(Event).filter(Event.id == event_id).first()
    if not ev:
        raise HTTPException(status_code=404, detail="Event not found.")

    out = EventOut.model_validate(ev)
    if current_user:
        reg = db.query(EventRegistration).filter(
            EventRegistration.event_id == ev.id,
            EventRegistration.user_id == current_user.id,
            EventRegistration.status == "confirmed"
        ).first()
        out.is_registered = bool(reg)

    return out


@router.post("", response_model=EventOut, status_code=status.HTTP_201_CREATED)
def create_event(
    data: EventCreate,
    current_user: User = Depends(require_roles(["faculty", "admin"])),
    db: Session = Depends(get_db)
):
    ev = Event(
        title=data.title.strip(),
        category=data.category,
        description=data.description,
        event_date=data.event_date,
        time=data.time,
        venue=data.venue,
        organizer=data.organizer,
        capacity=data.capacity,
        image=data.image
    )
    db.add(ev)
    db.commit()
    db.refresh(ev)
    return EventOut.model_validate(ev)


@router.post("/{event_id}/register", response_model=EventOut)
def register_for_event(
    event_id: int,
    data: Optional[EventRegisterRequest] = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Registers a student for an event.
    Enforces maximum capacity limits and prevents duplicate registration.
    Awards +30 server-controlled XP.
    """
    ev = db.query(Event).filter(Event.id == event_id, Event.is_active == True).first()
    if not ev:
        raise HTTPException(status_code=404, detail="Event not found.")

    existing_reg = db.query(EventRegistration).filter(
        EventRegistration.event_id == event_id,
        EventRegistration.user_id == current_user.id
    ).first()

    if existing_reg and existing_reg.status == "confirmed":
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="You are already registered for this event."
        )

    # Check capacity limits
    if ev.registered_count >= ev.capacity:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Registration capacity reached for this event. No seats available."
        )

    if existing_reg:
        existing_reg.status = "confirmed"
        existing_reg.notes = data.notes if data else None
    else:
        reg = EventRegistration(
            event_id=event_id,
            user_id=current_user.id,
            status="confirmed",
            notes=data.notes if data else None
        )
        db.add(reg)

    ev.registered_count += 1
    db.commit()

    # Award XP with idempotency
    award_xp(
        db=db,
        student_id=current_user.id,
        amount=30,
        action_type="event_register",
        description=f"Registered for {ev.title}",
        idempotency_key=f"event_{current_user.id}_{ev.id}"
    )

    out = EventOut.model_validate(ev)
    out.is_registered = True
    return out


@router.delete("/{event_id}/register", response_model=EventOut)
def cancel_event_registration(
    event_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    ev = db.query(Event).filter(Event.id == event_id).first()
    if not ev:
        raise HTTPException(status_code=404, detail="Event not found.")

    reg = db.query(EventRegistration).filter(
        EventRegistration.event_id == event_id,
        EventRegistration.user_id == current_user.id,
        EventRegistration.status == "confirmed"
    ).first()

    if not reg:
        raise HTTPException(status_code=404, detail="No active registration found for this event.")

    reg.status = "cancelled"
    ev.registered_count = max(0, ev.registered_count - 1)
    db.commit()

    out = EventOut.model_validate(ev)
    out.is_registered = False
    return out

