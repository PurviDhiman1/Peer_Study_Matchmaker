from flask import Flask, request, jsonify
import pandas as pd
import os
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)

# --- Load your small CSV file ---
data_path = os.path.join(os.path.dirname(__file__), "data.csv")
df = pd.read_csv(data_path)

# Create a 'features' column
df['features'] = df['interests'] + " " + df['availability']

# TF-IDF vectorization
vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(df['features'])

@app.route("/api/match", methods=["POST"])
def match_students():
    data = request.get_json()

    if "name" not in data:
        return jsonify({"error": "Missing 'name' field"}), 400

    name = data["name"]

    # Ensure student exists
    if name not in df["name"].values:
        return jsonify({"error": f"Student '{name}' not found"}), 404

    # Compute cosine similarity
    idx = df[df["name"] == name].index[0]
    similarities = cosine_similarity(X[idx], X).flatten()

    df["similarity"] = similarities
    matches = df[df["name"] != name].sort_values(by="similarity", ascending=False).head(3)

    matches_list = matches[["name", "similarity"]].to_dict(orient="records")
    return jsonify({"matches": matches_list})

@app.route("/")
def home():
    return "✅ Peer Study Matchmaker API is running successfully!"

if __name__ == "__main__":
    app.run(debug=True)
