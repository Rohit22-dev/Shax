from fastapi import APIRouter, HTTPException
from models.auth import User
from config.database import user_collection
from schema.schemas import check_user, get_password_hash, create_access_token
from datetime import timedelta

auth = APIRouter()
ACCESS_TOKEN_EXPIRE_MINUTES = 30


@auth.post("/login")
async def login(user: User):
    try:
        existing_user = check_user(user)
        if not existing_user:
            raise HTTPException(status_code=401, detail="Invalid credentials")
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data=existing_user, expires_delta=access_token_expires)
        return {"access_token": access_token, "token_type": "bearer"}
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Internal Server Error: {str(e)}")


@auth.post("/signup")
async def signup(user: User):
    try:
        existing_user = user_collection.find_one({"email": user.email})
        if existing_user:
            raise HTTPException(status_code=400, detail="User already exists")

        user.password = get_password_hash(user.password)
        # If the user doesn't exist, create a new one
        user_collection.insert_one(dict(user))
        return {"message": "User created successfully"}
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Internal Server Error: {str(e)}")
