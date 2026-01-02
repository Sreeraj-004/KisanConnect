from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_name: str = "KissanConnect API"
    debug: bool = True

    database_url: str = "postgresql+psycopg2://postgres:admin1969@localhost:5432/kissanconnect"
    secret_key: str = "CHANGE_THIS_SECRET"
    access_token_expire_minutes: int = 60
    algorithm: str = "HS256"

    class Config:
        env_file = ".env"


settings = Settings()


