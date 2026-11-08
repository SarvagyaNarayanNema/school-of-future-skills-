import os
import re
import uuid
from pathlib import Path
from fastapi import UploadFile, HTTPException, status
from backend.app.core.config import settings

# Recognized magic byte headers for binary formats
MAGIC_HEADERS = {
    ".pdf": b"%PDF",
    ".png": b"\x89PNG\r\n\x1a\n",
    ".jpg": b"\xff\xd8\xff",
    ".jpeg": b"\xff\xd8\xff",
    ".zip": b"PK\x03\x04",
    ".docx": b"PK\x03\x04",
    ".tar.gz": b"\x1f\x8b",
}

def sanitize_filename(name: str) -> str:
    """Removes path traversal patterns and unsafe characters from filename."""
    # Strip null bytes and directory separators
    clean = name.replace("\x00", "").replace("/", "").replace("\\", "")
    clean = re.sub(r'[^a-zA-Z0-9_.-]', '_', clean)
    return clean.strip('_.') or 'upload'

def validate_magic_bytes(ext: str, content: bytes) -> bool:
    """Validates file signature against declared extension to prevent disguised malware."""
    if ext in MAGIC_HEADERS:
        magic = MAGIC_HEADERS[ext]
        return content.startswith(magic)
    
    # Text-based source files (.py, .ipynb) must be valid UTF-8
    if ext in {".py", ".ipynb"}:
        try:
            content[:2048].decode("utf-8")
            return True
        except UnicodeDecodeError:
            return False
            
    return True

async def save_uploaded_file(file: UploadFile, student_id: int) -> tuple[str, str, int]:
    """
    Validates and stores a file uploaded by a student into the server's storage.
    Enforces extension whitelist, magic bytes, file size limits, and path traversal protection.
    Returns (relative_file_path, original_file_name, file_size_bytes).
    """
    raw_name = file.filename or "submission"
    # Mitigate null byte injection
    if "\x00" in raw_name:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid filename containing null bytes."
        )

    ext = Path(raw_name).suffix.lower()

    if ext not in settings.ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"File extension '{ext}' is not permitted. Allowed: {', '.join(sorted(settings.ALLOWED_EXTENSIONS))}"
        )

    # Read content to measure size and validate magic bytes
    content = await file.read()
    size_bytes = len(content)

    if size_bytes == 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Uploaded file is empty (0 bytes)."
        )

    if size_bytes > settings.MAX_UPLOAD_SIZE_BYTES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"File exceeds maximum upload size of {settings.MAX_UPLOAD_SIZE_BYTES // (1024 * 1024)} MB."
        )

    if not validate_magic_bytes(ext, content):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"File header does not match declared extension '{ext}'."
        )

    safe_name = sanitize_filename(Path(raw_name).stem)
    unique_filename = f"user{student_id}_{uuid.uuid4().hex[:8]}_{safe_name}{ext}"
    target_path = (settings.UPLOAD_DIR / unique_filename).resolve()

    # Prevent directory traversal: verify target_path stays inside UPLOAD_DIR
    if not str(target_path).startswith(str(settings.UPLOAD_DIR.resolve())):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid target storage path."
        )

    with open(target_path, "wb") as f:
        f.write(content)

    return f"uploads/{unique_filename}", raw_name, size_bytes
