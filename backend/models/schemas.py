from pydantic import BaseModel, EmailStr


class AuthPayload(BaseModel):
    name: str | None = None
    email: EmailStr
    password: str


class TransactionIn(BaseModel):
    date: str
    description: str
    category: str
    type: str
    amount: float
