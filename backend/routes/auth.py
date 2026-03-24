from fastapi import APIRouter, HTTPException
from models.schemas import AuthPayload

router = APIRouter()


@router.post('/login')
def login(payload: AuthPayload):
    if payload.password and payload.email:
        return {"token": "mock-jwt-token", "user": {"name": payload.name or "Demo User", "email": payload.email}}
    raise HTTPException(status_code=400, detail="Invalid credentials")


@router.post('/signup')
def signup(payload: AuthPayload):
    return {"token": "mock-jwt-token", "user": {"name": payload.name or "New User", "email": payload.email}}
