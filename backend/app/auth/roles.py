"""User Roles."""
from enum import Enum

class UserRole(str, Enum):
    """Roles available in the system."""
    DOCTOR = "DOCTOR"
    HOSPITAL_ADMIN = "HOSPITAL_ADMIN"
    AUDITOR = "AUDITOR"
    SECURITY_ADMIN = "SECURITY_ADMIN"
    SYSTEM_AGENT = "SYSTEM_AGENT"
