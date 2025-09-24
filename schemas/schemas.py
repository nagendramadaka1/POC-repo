from pydantic import BaseModel
from datetime import datetime


class Employee(BaseModel):
    id: str
    projectName: str
    client: str
    status: str
    priority: int
    startDate: datetime
    dueDate: datetime
    description: str
    manager: str
    budget: int

    class Config:
        from_attributes = True


class EmployeeUpdate(BaseModel):
    projectName: str
    client: str
    status: str
    priority: int
    startDate: datetime
    dueDate: datetime
    description: str
    manager: str
    budget: int


class userRegister(BaseModel):
    username: str
    hashed_password: str
