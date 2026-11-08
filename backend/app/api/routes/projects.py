from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional

from backend.app.db.session import get_db
from backend.app.core.dependencies import get_current_user, get_optional_user
from backend.app.models.entities import Project, ProjectUpvote, User
from backend.app.schemas.domain import ProjectOut, ProjectCreate
from backend.app.services.gamification_service import award_xp

router = APIRouter(prefix="/projects", tags=["Projects"])

@router.get("", response_model=List[ProjectOut])
def list_projects(
    category: Optional[str] = None,
    current_user: Optional[User] = Depends(get_optional_user),
    db: Session = Depends(get_db)
):
    query = db.query(Project)
    if category and category != "All":
        query = query.filter(Project.category.ilike(f"%{category}%"))

    projects = query.order_by(Project.upvotes_count.desc()).all()
    user_upvoted_ids = set()

    if current_user:
        upvotes = db.query(ProjectUpvote).filter(ProjectUpvote.user_id == current_user.id).all()
        user_upvoted_ids = {u.project_id for u in upvotes}

    results = []
    for p in projects:
        out = ProjectOut.model_validate(p)
        out.has_upvoted = (p.id in user_upvoted_ids)
        results.append(out)
    return results


@router.post("", response_model=ProjectOut, status_code=status.HTTP_201_CREATED)
def submit_project(
    data: ProjectCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    project = Project(
        title=data.title.strip(),
        description=data.description,
        category=data.category,
        technologies=data.technologies,
        student_team=data.student_team,
        creator_id=current_user.id,
        github_url=data.github_url,
        live_url=data.live_url,
        image=data.image or "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80"
    )
    db.add(project)
    db.commit()
    db.refresh(project)

    # Award +50 XP for publishing capstone project
    award_xp(
        db=db,
        student_id=current_user.id,
        amount=50,
        action_type="project_publish",
        description=f"Published project '{project.title}'",
        idempotency_key=f"proj_{current_user.id}_{project.id}"
    )

    out = ProjectOut.model_validate(project)
    out.has_upvoted = False
    return out


@router.post("/{project_id}/upvote", response_model=ProjectOut)
def toggle_project_upvote(
    project_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Toggles upvote on a project.
    Database relationship prevents multiple upvotes from the same user.
    """
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found.")

    existing_upvote = db.query(ProjectUpvote).filter(
        ProjectUpvote.project_id == project_id,
        ProjectUpvote.user_id == current_user.id
    ).first()

    if existing_upvote:
        db.delete(existing_upvote)
        project.upvotes_count = max(0, project.upvotes_count - 1)
        has_upvoted = False
    else:
        upvote = ProjectUpvote(project_id=project_id, user_id=current_user.id)
        db.add(upvote)
        project.upvotes_count += 1
        has_upvoted = True

    db.commit()
    out = ProjectOut.model_validate(project)
    out.has_upvoted = has_upvoted
    return out

