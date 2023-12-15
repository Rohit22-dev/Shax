from config.database import user_collection
from decouple import config
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from datetime import datetime,timedelta
from jose import JWTError, jwt


JWT_SECRET = config("secret")
JWT_ALGORITHM = config("algorithm")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)

def check_user(data):
    try:
        existing_user = user_collection.find_one({"email": data.email})
        existing_user['_id'] = str(existing_user['_id'])
        if not existing_user:
            raise Exception("User not found")
        if not verify_password(data.password, existing_user['password']):
            raise Exception("Invalid password")
        return existing_user
    except Exception as e:
        print(str(e))

# JWT token functions
def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, JWT_SECRET, algorithm=JWT_ALGORITHM)
    return encoded_jwt