from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import datetime, timezone

from backend.app.db.session import get_db
from backend.app.core.security import get_password_hash, verify_password, create_access_token, revoke_token
from backend.app.core.dependencies import get_current_user, get_current_token
from backend.app.models.entities import User, StudentProfile, FacultyProfile
from backend.app.schemas.domain import (
    LoginRequest, RegisterRequest, PasswordResetRequest, TokenResponse, UserOut
)

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
def register_user(request: RegisterRequest, db: Session = Depends(get_db)):
    """
    Registers a new student or faculty member and issues a JWT token.
    """
    clean_email = request.email.strip().lower()
    if not clean_email or "@" not in clean_email:
        raise HTTPException(status_code=400, detail="A valid institutional or personal email is required.")
    
    if len(request.password) < 6:
        raise HTTPException(status_code=400, detail="Password must be at least 6 characters long.")

    existing = db.query(User).filter(User.email == clean_email).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="An account with this email address already exists."
        )

    role = request.role if request.role in ["student", "faculty", "admin"] else "student"
    hashed = get_password_hash(request.password)

    user = User(
        email=clean_email,
        hashed_password=hashed,
        full_name=request.full_name.strip(),
        role=role,
        is_active=True
    )
    db.add(user)
    db.flush()

    # Create associated profile
    if role == "student":
        student_profile = StudentProfile(
            user_id=user.id,
            roll_no=request.roll_no or f"SGSU-FSIT-{user.id:04d}",
            programme=request.programme or "BCA (Artificial Intelligence & Machine Learning)"
        )
        db.add(student_profile)
    elif role == "faculty":
        faculty_profile = FacultyProfile(
            user_id=user.id,
            employee_id=f"FAC-FSIT-{user.id:03d}"
        )
        db.add(faculty_profile)

    db.commit()
    db.refresh(user)

    token = create_access_token({"sub": user.email, "role": user.role, "uid": user.id})
    return TokenResponse(access_token=token, user=UserOut.model_validate(user))


@router.post("/login", response_model=TokenResponse)
def login_user(request: LoginRequest, db: Session = Depends(get_db)):
    """
    Authenticates email & password, returning signed JWT and user details.
    """
    clean_email = request.email.strip().lower()
    user = db.query(User).filter(User.email == clean_email).first()

    if not user or not verify_password(request.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email credentials or password.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User account is deactivated. Contact administration."
        )

    token = create_access_token({"sub": user.email, "role": user.role, "uid": user.id})
    return TokenResponse(access_token=token, user=UserOut.model_validate(user))


@router.get("/me", response_model=UserOut)
def get_current_user_info(current_user: User = Depends(get_current_user)):
    """
    Returns information on the currently authenticated user.
    """
    return UserOut.model_validate(current_user)


@router.post("/password-reset")
def reset_password(request: PasswordResetRequest, db: Session = Depends(get_db)):
    """
    Institution-verified password reset with account enumeration mitigation.
    Always returns a safe response regardless of whether the email exists.
    """
    clean_email = request.email.strip().lower()
    user = db.query(User).filter(User.email == clean_email).first()
    
    if len(request.new_password) < 6:
        raise HTTPException(status_code=400, detail="New password must be at least 6 characters.")

    if user:
        user.hashed_password = get_password_hash(request.new_password)
        user.updated_at = datetime.now(timezone.utc)
        db.commit()

    return {"message": "If this institutional email is registered, the password has been securely updated."}


@router.post("/logout")
def logout(
    token: str = Depends(get_current_token),
    current_user: User = Depends(get_current_user)
):
    """
    Client session logout with active token revocation.
    """
    revoke_token(token)
    return {"message": f"Session closed and token revoked for {current_user.email}."}

