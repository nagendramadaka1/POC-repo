from fastapi import FastAPI, APIRouter, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
from database.session import get_db
from models.models import EmployeeModel, UserModel
from routers.user import get_current_user
from schemas.schemas import Employee, EmployeeUpdate


router = APIRouter()


# GET: Read all employees
@router.get("/employees", response_model=List[Employee])
def get_employees(
    db: Session = Depends(get_db), current_user: UserModel = Depends(get_current_user)
):
    return db.query(EmployeeModel).all()


# POST: Create a new employee
@router.post("/employees", response_model=Employee)
def create_employee(employee: Employee, db: Session = Depends(get_db)):
    db_employee = EmployeeModel(
        id=employee.id,
        projectName=employee.projectName,
        client=employee.client,
        status=employee.status,
        priority=employee.priority,
        startDate=employee.startDate.strftime("%Y-%m-%d"),
        dueDate=employee.dueDate.strftime("%Y-%m-%d"),
        description=employee.description,
        manager=employee.manager,
        budget=employee.budget,
    )
    db.add(db_employee)
    db.commit()
    db.refresh(db_employee)
    return db_employee


@router.put("/employees/{employee_id}", response_model=Employee)
def update_employee(
    employee_id: str, updated_data: EmployeeUpdate, db: Session = Depends(get_db)
):
    employee = db.query(EmployeeModel).filter(EmployeeModel.id == employee_id).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    employee.projectName = updated_data.projectName
    employee.client = updated_data.client
    employee.status = updated_data.status
    employee.priority = updated_data.priority
    employee.startDate = updated_data.startDate.strftime("%Y-%m-%d")
    employee.dueDate = updated_data.dueDate.strftime("%Y-%m-%d")
    employee.description = updated_data.description
    employee.manager = updated_data.manager
    employee.budget = updated_data.budget

    db.commit()
    db.refresh(employee)
    return employee


# DELETE: Remove an employee by ID
@router.delete("/employees/{employee_id}", response_model=Employee)
def delete_employee(employee_id: str, db: Session = Depends(get_db)):
    employee = db.query(EmployeeModel).filter(EmployeeModel.id == employee_id).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    db.delete(employee)
    db.commit()
    return employee


# FastAPI App
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)
