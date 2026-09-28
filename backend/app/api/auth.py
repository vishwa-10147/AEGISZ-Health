from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from app.core.database import get_control_db
from app.auth.authentication import verify_password, create_access_token

router = APIRouter()

@router.post("/token", tags=["Authentication"])
async def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: AsyncSession = Depends(get_control_db)
):
    query = text("SELECT id, username, role, hospital_id, hashed_password FROM users WHERE username = :username")
    result = await db.execute(query, {"username": form_data.username})
    row = result.fetchone()
    
    if not row or not verify_password(form_data.password, row[4]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = create_access_token(
        data={"sub": row[1], "role": row[2], "hospital_id": row[3]}
    )
    return {"access_token": access_token, "token_type": "bearer", "role": row[2], "hospital_id": row[3]}
