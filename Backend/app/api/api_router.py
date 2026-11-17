
from fastapi import APIRouter

api_router = APIRouter()


@api_router.get("/health")
def health_check():
    return {
        "status": "success",
        "message": "REHABPOSE API is running",
        "service": "backend"
    }
