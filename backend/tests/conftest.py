import os
import sys
from pathlib import Path
import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

os.environ["TESTING"] = "1"

PROJECT_ROOT = Path(__file__).resolve().parent.parent.parent
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))

from backend.main import app
from backend.app.db.session import Base, get_db
from backend.app.core.security import get_password_hash
from backend.app.models.entities import User, Course, Assignment, Event, StudentProfile, FacultyProfile, Notification
from datetime import datetime, timezone, timedelta

TEST_DB_URL = "sqlite:///./test_futureskills.db"
test_engine = create_engine(TEST_DB_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=test_engine)

def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

@pytest.fixture(scope="session", autouse=True)
def initialize_test_database():
    Base.metadata.create_all(bind=test_engine)
    db = TestingSessionLocal()

    # Seed Student if not present
    if not db.query(User).filter(User.email == "student@sgsu.ac.in").first():
        stu = User(
            email="student@sgsu.ac.in",
            hashed_password=get_password_hash("Student@123"),
            full_name="Sarvagya Narayan Nema",
            role="student",
            is_active=True
        )
        db.add(stu)
        db.flush()
        db.add(StudentProfile(user_id=stu.id, roll_no="SGSU-TEST-001", xp_points=450, level=3))

    # Seed Faculty if not present
    if not db.query(User).filter(User.email == "pooja.bijlani@sgsu.ac.in").first():
        fac = User(
            email="pooja.bijlani@sgsu.ac.in",
            hashed_password=get_password_hash("Faculty@123"),
            full_name="Dr. Pooja Bijlani",
            role="faculty",
            is_active=True
        )
        db.add(fac)
        db.flush()
        db.add(FacultyProfile(user_id=fac.id, employee_id="FAC-001"))

    # Seed Admin if not present
    if not db.query(User).filter(User.email == "admin@sgsu.ac.in").first():
        adm = User(
            email="admin@sgsu.ac.in",
            hashed_password=get_password_hash("Admin@123"),
            full_name="System Administrator",
            role="admin",
            is_active=True
        )
        db.add(adm)
        db.flush()

    # Seed Course if not present
    if not db.query(Course).first():
        c = Course(
            code="TEST-CS-101",
            programme="BCA Artificial Intelligence",
            school="School of Future Skills & IT",
            duration="3 years",
            degree_level="Undergraduate",
            credits=120,
            description="Foundations of AI and intelligent systems.",
            is_published=True
        )
        db.add(c)
        db.flush()

        a = Assignment(
            course_id=c.id,
            title="Neural Network Lab",
            description="Implement forward and backprop.",
            due_date=datetime.now(timezone.utc) + timedelta(days=7),
            max_marks=100
        )
        db.add(a)

        ev = Event(
            title="SGSU National AI Hackathon",
            category="Hackathon",
            description="48 hour innovation challenge.",
            event_date=datetime.now(timezone.utc) + timedelta(days=14),
            venue="Tech Innovation Hub Studio 1",
            capacity=100,
            registered_count=10
        )
        db.add(ev)

        notc = Notification(
            user_id=stu.id,
            title="Welcome to Semester Orientation 2026",
            message="Orientation begins this Monday for all students.",
            category="academic",
            is_read=False
        )
        db.add(notc)

    db.commit()
    db.close()
    yield
    # Session teardown
    Base.metadata.drop_all(bind=test_engine)
    test_engine.dispose()
    try:
        Path("./test_futureskills.db").unlink(missing_ok=True)
    except Exception:
        pass
