from pydantic import BaseModel
from typing import Optional


class User(BaseModel):
    username: str
    password: str
    email: str


class Login(BaseModel):
    username: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: Optional[str] = None


class Group(BaseModel):
    name: str
    description: str or None
    members: list[str]
    owner: str
    connection_link: str 
    posts: list[str]