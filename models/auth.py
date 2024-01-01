from pydantic import BaseModel
from typing import Optional,List
from datetime import datetime


class User(BaseModel):
    _id: str | None
    username: str
    password: str
    email: str
    exp: datetime | None
    friends : Optional[List[str]] = None


class LoginSchema(BaseModel):
    email: str
    password: str


class OTPData(BaseModel):
    otp: str
    timestamp: datetime


class Token(BaseModel):
    access_token: str | None
    token_type: str


class TokenData(BaseModel):
    username: str | None = None


class Group(BaseModel):
    name: str
    description: Optional[str] = None
    members: Optional[List[str]] = None
    owner: Optional[str] = None
    connection_link: Optional[str] = None
    posts: Optional[List[str]] = None

