from fastapi import FastAPI, APIRouter, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import Column, String, Integer, create_engine
from sqlalchemy.orm import sessionmaker, declarative_base, Session
from typing import List
from datetime import datetime

#  Database Setup 
server = 'LIN-5CG134B1QB'
database = 'ProjectManagement'
driver = 'ODBC Driver 17 for SQL Server'

connection_string = f"mssql+pyodbc://@{server}/{database}?driver={driver}&trusted_connection=yes"
engine = create_engine(connection_string)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

#  SQLAlchemy Model 
class EmployeeModel(Base):
    __tablename__ = "sample_project_data"

    id = Column(String, primary_key=True, index=True)
    projectName = Column(String)
    client = Column(String)
    status = Column(String)
    priority = Column(Integer)
    startDate = Column(String)
    dueDate = Column(String)
    description = Column(String)
    manager = Column(String)
    budget = Column(Integer)

#  Pydantic Schema 
class Employee(BaseModel):
    id: str
    projectName: str
    client: str
    status: str
    priority: str
    startDate: datetime
    dueDate: datetime
    description: str
    manager: str
    budget: int

    class Config:
        from_attributes = True

#  FastAPI Router 
router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/employees", response_model=List[Employee])
def get_employees(db: Session = Depends(get_db)):
    return db.query(EmployeeModel).all()

#  FastAPI App 
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)
