import uvicorn
from fastapi import FastAPI
from routes.auth import auth
from routes.group import group


app = FastAPI()

app.include_router(auth, prefix="/auth")
app.include_router(group, prefix="/group")

if __name__ == "__main__":
    uvicorn.run("main:app", host="localhost", port=8000, reload=True)