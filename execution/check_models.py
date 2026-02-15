import os
import subprocess
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

cmd = [
    "curl",
    f"https://generativelanguage.googleapis.com/v1beta/models?key={api_key}"
]

print("Running curl to list models...")
result = subprocess.run(cmd, capture_output=True, text=True)
print(result.stdout)
print(result.stderr)
