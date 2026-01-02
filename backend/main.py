import logging
from sqlalchemy import text
from sqlalchemy.exc import OperationalError

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from api import auth, cart, dashboards, messaging, orders, policies, products, users
from core.config import settings
from db.base import Base
from db.session import engine

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

app = FastAPI(title=settings.app_name, debug=settings.debug)


@app.on_event("startup")
async def startup_event():
    """Create database tables on startup."""
    try:
        # Test connection first
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))
        logger.info("Database connection successful")
        
        # Create tables
        Base.metadata.create_all(bind=engine)
        logger.info("Database tables created/verified successfully")
    except OperationalError as e:
        error_msg = str(e)
        logger.error(f"Database connection failed: {error_msg}")
        logger.error("=" * 60)
        logger.error("DATABASE CONNECTION ERROR")
        logger.error("=" * 60)
        logger.error("The server will start, but database operations will fail.")
        logger.error("")
        logger.error("To fix this:")
        logger.error("1. Ensure PostgreSQL is running")
        logger.error("2. Verify database credentials in core/config.py")
        logger.error("3. Create the database if it doesn't exist:")
        logger.error("   CREATE DATABASE kissanconnect;")
        logger.error("=" * 60)
    except Exception as e:
        logger.error(f"Unexpected error during startup: {e}")
        logger.warning("Server will continue, but database operations may fail")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tighten in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(users.router, prefix="/users", tags=["users"])
app.include_router(products.router, prefix="/products", tags=["products"])
app.include_router(cart.router, prefix="/cart", tags=["cart"])
app.include_router(orders.router, prefix="/orders", tags=["orders"])
app.include_router(messaging.router, prefix="/messaging", tags=["messaging"])
app.include_router(policies.router, prefix="/policies", tags=["policies"])
app.include_router(dashboards.router, prefix="/dashboard", tags=["dashboards"])


@app.get("/health")
def health_check():
    """Health check endpoint."""
    try:
        # Test database connection
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))
        return {
            "status": "ok",
            "database": "connected"
        }
    except Exception as e:
        return {
            "status": "ok",
            "database": "disconnected",
            "error": str(e)
        }


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)


