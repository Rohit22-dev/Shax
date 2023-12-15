from fastapi import APIRouter, HTTPException
from models.auth import Group
from config.database import user_collection
from schema.schemas import check_user, get_password_hash, create_access_token
from datetime import timedelta
import secrets

group = APIRouter()

@group.post("/", response_model=Group)
def create_group(group: Group):
    try:
        # Generate a unique connection link
        group.connection_link = secrets.token_urlsafe(8)  # Adjust the length as needed

        # Your logic to create a group in the database
        # For example: db.execute("INSERT INTO groups (name, connection_link) VALUES (?, ?)", group.name, group.connection_link)
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Internal Server Error: {str(e)}")

    return group
