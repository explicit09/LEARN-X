from setuptools import setup, find_packages

setup(
    name="learn-x-backend",
    version="0.1.0",
    packages=find_packages(),
    install_requires=[
        "fastapi",
        "uvicorn",
        "sqlalchemy",
        "python-dotenv",
    ],
)
