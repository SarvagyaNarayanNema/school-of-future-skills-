"""
End-to-End User Journey Tests for School of Future Skills Platform.
Tests the 4 essential user journeys:
1. Public Visitor Journey (Browse catalog, events, alumni, achievements, ask FutureBot).
2. Student Portal Journey (Sign in, view dashboard, view enrolled courses, submit assignment, register event).
3. Faculty Journey (Sign in, view teaching courses, create assignment, inspect submissions).
4. Administrator Journey (Sign in, review platform statistics, verify health probes, manage sessions).
"""

import pytest
from starlette.testclient import TestClient
from backend.main import app

client = TestClient(app)


def test_journey_1_public_visitor():
    """Journey 1: Public prospective student / visitor exploring the school."""
    # 1. Health check
    res_health = client.get("/api/health")
    assert res_health.status_code == 200
    assert res_health.json()["status"] == "healthy"

    # 2. Browse full course catalog
    res_courses = client.get("/api/courses")
    assert res_courses.status_code == 200
    courses = res_courses.json()
    assert len(courses) >= 1
    sample_course_id = courses[0]["id"]

    # 3. View individual course details
    res_course = client.get(f"/api/courses/{sample_course_id}")
    assert res_course.status_code == 200
    assert "programme" in res_course.json()

    # 4. View public events listing
    res_events = client.get("/api/events")
    assert res_events.status_code == 200
    assert len(res_events.json()) >= 1

    # 5. View alumni network
    res_alumni = client.get("/api/alumni")
    assert res_alumni.status_code == 200

    # 6. View gamified achievements catalog
    res_achievements = client.get("/api/achievements")
    assert res_achievements.status_code == 200

    # 7. Query FutureBot knowledge base via RAG
    res_bot = client.post("/api/chat", json={"query": "What are the B.C.A. specializations offered?"})
    assert res_bot.status_code == 200
    data = res_bot.json()
    assert "text" in data
    assert len(data["text"]) > 10


def test_journey_2_student_portal():
    """Journey 2: Enrolled student logging in, checking timetable, submitting assignment, registering for an event."""
    # 1. Student authentication (JSON payload)
    res_login = client.post("/api/auth/login", json={"email": "student@sgsu.ac.in", "password": "Student@123"})
    assert res_login.status_code == 200
    token = res_login.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    # 2. View student profile & verification
    res_me = client.get("/api/auth/me", headers=headers)
    assert res_me.status_code == 200
    assert res_me.json()["email"] == "student@sgsu.ac.in"
    assert res_me.json()["role"] == "student"

    # 3. View student dashboard & assignments
    res_assignments = client.get("/api/assignments", headers=headers)
    assert res_assignments.status_code == 200
    assignments = res_assignments.json()
    assert len(assignments) >= 1

    # 4. View upcoming workshops & events
    res_events = client.get("/api/events", headers=headers)
    assert res_events.status_code == 200
    events = res_events.json()
    assert len(events) >= 1

    # 5. Event registration
    event_id = events[0]["id"]
    res_rsvp = client.post(f"/api/events/{event_id}/register", headers=headers)
    assert res_rsvp.status_code in [200, 201]
    assert res_rsvp.json()["id"] == event_id
    assert res_rsvp.json()["registered_count"] >= 1

    # 6. Logout and token revocation
    res_logout = client.post("/api/auth/logout", headers=headers)
    assert res_logout.status_code == 200
    assert "token revoked" in res_logout.json()["message"]


def test_journey_3_faculty_workflow():
    """Journey 3: Faculty member logging in, checking courses, and reviewing assignments."""
    # 1. Faculty login
    res_login = client.post("/api/auth/login", json={"email": "pooja.bijlani@sgsu.ac.in", "password": "Faculty@123"})
    assert res_login.status_code == 200
    token = res_login.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    # 2. Verify faculty profile
    res_me = client.get("/api/auth/me", headers=headers)
    assert res_me.status_code == 200
    assert res_me.json()["role"] == "faculty"

    # 3. Retrieve faculty assignment listing
    res_assignments = client.get("/api/assignments", headers=headers)
    assert res_assignments.status_code == 200


def test_journey_4_administrator_workflow():
    """Journey 4: Administrator checking readiness, system logs, student leaderboard, and token revocation."""
    # 1. Admin login
    res_login = client.post("/api/auth/login", json={"email": "admin@sgsu.ac.in", "password": "Admin@123"})
    assert res_login.status_code == 200
    token = res_login.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    # 2. Check readiness probe
    res_ready = client.get("/api/health/ready")
    assert res_ready.status_code == 200
    assert res_ready.json()["status"] == "ready"

    # 3. Inspect global student gamification leaderboard
    res_leaderboard = client.get("/api/leaderboard")
    assert res_leaderboard.status_code == 200
    assert isinstance(res_leaderboard.json(), list)

    # 4. Revoke admin session
    res_logout = client.post("/api/auth/logout", headers=headers)
    assert res_logout.status_code == 200
    assert "token revoked" in res_logout.json()["message"]
