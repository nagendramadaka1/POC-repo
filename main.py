from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import employee, user
from database.session import Base, engine

# Create tables
Base.metadata.create_all(bind=engine)


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user.router)
app.include_router(employee.router)
