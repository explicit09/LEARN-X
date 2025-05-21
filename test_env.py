import os

print("DATABASE_URL:", os.environ.get("DATABASE_URL"))

# Try to directly read the .env file
with open(".env", "r") as f:
    content = f.read()
    print("\nContent of .env file:")
    print(content) 