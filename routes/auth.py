from fastapi import APIRouter, HTTPException, Response
from models.auth import User, LoginSchema
from config.database import user_collection
from utils.helper import check_user, get_password_hash, create_access_token, send_otp_email, is_otp_valid
from datetime import timedelta


auth = APIRouter()
ACCESS_TOKEN_EXPIRE_MINUTES = 30


@auth.post("/login")
async def login(user: LoginSchema):
    try:
        existing_user = check_user(user)
        if not existing_user:
            raise HTTPException(status_code=401, detail="Invalid credentials")
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        token_data = dict(existing_user)
        token_data.pop("password", None)
        access_token = create_access_token(
            data=token_data, expires_delta=access_token_expires)
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


@auth.post("/forgot-password")
async def forgot_password(data: dict):
    try:
        email = data['email']
        existing_user = user_collection.find_one({"email": email})
        if not existing_user:
            raise HTTPException(status_code=400, detail="User does not exist")

        user_id = str(existing_user['_id'])
        await send_otp_email(email, user_id)

        return {"message": "Otp sent successfully", "user_id": user_id}
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Internal Server Error: {str(e)}")


@auth.post("/verify-otp/{user_id}")
async def verify_otp(data: dict, user_id: str):
    try:
        otp = data['otp']

        if is_otp_valid(otp, user_id):
            return Response(status_code=200,content="OTP verified successfully")
        else:
            raise HTTPException(
                status_code=400, detail="Invalid OTP / OTP expired")
        # return {"message": "OTP verified successfully",}
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Internal Server Error: {str(e)}")


@auth.patch("/reset-password/{user_id}")
async def reset_password(data: dict, user_id: str):
    try:
        password = data['password']
        existing_user = user_collection.find_one({"_id": user_id})
        if not existing_user:
            raise HTTPException(status_code=400, detail="User does not exist")

        user_collection.update_one({"_id": user_id}, {
                                   "$set": {"password": get_password_hash(password)}})
        return {"message": "Password updated successfully"}
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Internal Server Error: {str(e)}")