import requests
import numpy as np

# API endpoint (same as the one running on your Flask app)
url = "http://127.0.0.1:5001/api/match"

# Generate 62 random numbers (since your model expects 62 features)
features = np.random.rand(62).tolist()

data = {"features": features}

print("\nRequest Data:\n", data)
response = requests.post(url, json=data)

try:
    print("\nAPI Response (JSON):\n", response.json())
except Exception as e:
    print("\nFailed to parse JSON. Response text:\n", response.text)
    print("\nError:", e)
