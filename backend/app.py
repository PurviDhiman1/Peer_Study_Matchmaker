from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import os

app = Flask(__name__)
CORS(app)

# --- Load model and scaler ---
model_path = os.path.join(os.path.dirname(__file__), "model/kmeans_model.pkl")
scaler_path = os.path.join(os.path.dirname(__file__), "model/scaler.pkl")

model = joblib.load(model_path)
scaler = joblib.load(scaler_path)

@app.route("/")
def home():
    return "Peer Study Matchmaker API is running ✅"

@app.route("/api/match", methods=["POST"])
def match():
    try:
        data = request.get_json()
        features = np.array(data["features"]).reshape(1, -1)
        scaled = scaler.transform(features)
        cluster = model.predict(scaled)[0]
        return jsonify({"cluster": int(cluster)})
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True, port=5001)

