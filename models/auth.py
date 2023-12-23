from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class User(BaseModel):
    _id: str | None
    username: str
    password: str
    email: str
    exp: datetime | None


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
    description: str or None
    members: list[str]
    owner: str
    connection_link: str
    posts: list[str]
