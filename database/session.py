from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

#  Database Setup
server = "LIN-8KJBN13"
database = "POC"
driver = "ODBC Driver 17 for SQL Server"

connection_string = (
    f"mssql+pyodbc://@{server}/{database}?driver={driver}&trusted_connection=yes"
)
engine = create_engine(connection_string)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
Base.metadata.create_all(bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
