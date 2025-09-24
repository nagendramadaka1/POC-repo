from sqlalchemy import Column, String, Integer
from database.session import Base


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


class UserModel(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
