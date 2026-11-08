from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional

from backend.app.db.session import get_db
from backend.app.core.dependencies import require_roles
from backend.app.models.entities import TimetableEntry, User
from backend.app.schemas.domain import TimetableEntryOut

router = APIRouter(prefix="/timetable", tags=["Timetable"])

@router.get("", response_model=List[TimetableEntryOut])
def get_timetable(
    day: Optional[str] = None,
    batch: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(TimetableEntry)
    if day and day != "All":
        query = query.filter(TimetableEntry.day.ilike(f"%{day}%"))
    if batch:
        query = query.filter(TimetableEntry.batch.ilike(f"%{batch}%"))

    entries = query.all()
    return [TimetableEntryOut.model_validate(e) for e in entries]


@router.post("", response_model=TimetableEntryOut, status_code=status.HTTP_201_CREATED)
def create_timetable_entry(
    entry_data: TimetableEntryOut,
    current_user: User = Depends(require_roles(["faculty", "admin"])),
    db: Session = Depends(get_db)
):
    entry = TimetableEntry(
        day=entry_data.day,
        start_time=entry_data.start_time,
        end_time=entry_data.end_time,
        course_name=entry_data.course_name,
        course_code=entry_data.course_code,
        faculty_name=entry_data.faculty_name,
        room=entry_data.room,
        batch=entry_data.batch,
        department=entry_data.department
    )
    db.add(entry)
    db.commit()
    db.refresh(entry)
    return TimetableEntryOut.model_validate(entry)

