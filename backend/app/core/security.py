import bcrypt
import jwt
import uuid
from datetime import datetime, timedelta, timezone
from typing import Optional, Dict, Any, Set
from backend.app.core.config import settings

# Thread-safe in-memory token blacklist for session invalidation on logout
# In multi-instance enterprise deployments, this can be backed by Redis.
_REVOKED_TOKENS: Set[str] = set()

def revoke_token(token: str) -> None:
    """Adds a token to the revoked blacklist."""
    if token:
        _REVOKED_TOKENS.add(token.strip())

def is_token_revoked(token: str) -> bool:
    """Checks whether a token has been revoked."""
    return token.strip() in _REVOKED_TOKENS if token else True

def get_password_hash(password: str) -> str:
    """Hashes a plaintext password using bcrypt."""
    salt = bcrypt.gensalt(rounds=12)
    hashed = bcrypt.hashpw(password.encode("utf-8"), salt)
    return hashed.decode("utf-8")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verifies a plaintext password against a bcrypt hash."""
    try:
        return bcrypt.checkpw(plain_password.encode("utf-8"), hashed_password.encode("utf-8"))
    except Exception:
        return False

def create_access_token(data: Dict[str, Any], expires_delta: Optional[timedelta] = None) -> str:
    """Generates a signed JWT access token with unique jti identifier."""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode.update({
        "exp": expire,
        "iat": datetime.now(timezone.utc),
        "jti": uuid.uuid4().hex
    })
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt

def decode_access_token(token: str) -> Optional[Dict[str, Any]]:
    """Decodes and validates a JWT access token, verifying it is not revoked."""
    if is_token_revoked(token):
        return None
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        return payload
    except jwt.PyJWTError:
        return None
