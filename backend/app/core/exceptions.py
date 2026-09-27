from fastapi import HTTPException, status

class AEGISZError(HTTPException):
    def __init__(self, status_code: int, detail: str):
        super().__init__(status_code=status_code, detail=detail)

class AuthenticationError(AEGISZError):
    def __init__(self, detail: str = "Authentication failed"):
        super().__init__(status_code=status.HTTP_401_UNAUTHORIZED, detail=detail)

class AuthorizationError(AEGISZError):
    def __init__(self, detail: str = "Not authorized"):
        super().__init__(status_code=status.HTTP_403_FORBIDDEN, detail=detail)

class ExchangeError(AEGISZError):
    def __init__(self, detail: str = "EHR exchange failed"):
        super().__init__(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=detail)

class CryptoError(AEGISZError):
    def __init__(self, detail: str = "Cryptographic operation failed"):
        super().__init__(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=detail)

class AuditError(AEGISZError):
    def __init__(self, detail: str = "Audit logging failed"):
        super().__init__(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=detail)

class HospitalAccessError(AEGISZError):
    def __init__(self, detail: str = "Hospital access denied"):
        super().__init__(status_code=status.HTTP_403_FORBIDDEN, detail=detail)
