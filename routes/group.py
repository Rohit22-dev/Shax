from fastapi import APIRouter, HTTPException
from models.auth import Group
from config.database import group_collection
from utils.helper import check_user, get_password_hash, create_access_token
from datetime import timedelta
import secrets
from utils.error import handle_errors

group = APIRouter()


@handle_errors
@group.post("/{user_id}")
def create_group(group: Group, user_id: str):
    # Generate a unique connection link
    link = secrets.token_urlsafe(
        8)  # Adjust the length as needed
    
    # Convert the Pydantic model to a dictionary
    group_data = group.dict()

    # Set additional values
    group_data["members"] = [user_id]
    group_data["owner"] = user_id
    group_data["connection_link"] = link

    # Insert the dictionary into the MongoDB collection
    group_collection.insert_one(group_data)

    return {"message": "Group created successfully", "link": link}

