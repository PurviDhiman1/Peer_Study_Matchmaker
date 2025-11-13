# backend/model/preprocess.py
import os
import json
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
import joblib

ROOT = os.path.dirname(__file__)
INPUT_CSV = os.path.join(ROOT, r"D:\sem 3(AI)\peer_study_dataset_final.csv")

  # put your CSV here
X_OUT = os.path.join(ROOT, "X.csv")
META_OUT = os.path.join(ROOT, "students_meta.csv")
FEATURE_MAP_OUT = os.path.join(ROOT, "feature_map.json")
SCALER_OUT = os.path.join(ROOT, "scaler.pkl")

# --- Configuration: list categorical columns to one-hot encode ---
# Edit these names to match your CSV column names exactly
CATEGORICAL_COLS = [
    "Year_of_Study",
    "Branch",
    "Preferred_Study_Style",
    "Preferred_Study_Location",
    "Session_Preference",
    "Branch_Preference",
    "Available_Time_Slot",
    "Preferred_Group_Size"
]

# Columns to treat as meta (not features)
META_COLS = ["student_id", "Name", "first_name", "last_name"]  # remove names not present in your CSV

def main():
    if not os.path.exists(INPUT_CSV):
        raise FileNotFoundError(f"Input CSV not found: {INPUT_CSV}")

    print("Loading CSV:", INPUT_CSV)
    df = pd.read_csv(INPUT_CSV)
    df_original = df.copy()

    # --- 1) separate meta ---
    meta_cols_present = [c for c in META_COLS if c in df.columns]
    meta_df = df[meta_cols_present].copy() if meta_cols_present else pd.DataFrame({"row_index": range(len(df))})
    # Keep an index column to link back
    meta_df = meta_df.reset_index().rename(columns={"index": "row_index"})

    # --- 2) select subject numeric columns (assume 0/1) ---
    # We'll assume any column whose name matches this pattern and is numeric is a subject.
    # If you want explicit list, create SUBJECT_COLS = [...]
    # Auto-detect: numeric columns that are only 0/1 and not in meta or categorical
    non_feature_cols = set(meta_cols_present + CATEGORICAL_COLS)
    numeric_cols = df.select_dtypes(include=[np.number]).columns.tolist()
    binary_candidates = []
    for c in numeric_cols:
        if c in non_feature_cols:
            continue
        vals = df[c].dropna().unique()
        if set(vals).issubset({0,1,0.0,1.0}):
            binary_candidates.append(c)

    SUBJECT_COLS = binary_candidates
    print(f"Detected {len(SUBJECT_COLS)} subject-like binary columns (examples): {SUBJECT_COLS[:10]}")

    # --- 3) prepare dataframe for features: keep subject cols + categorical encode others ---
    features_df = df[SUBJECT_COLS].copy()

    # For categorical columns: only use those that are present
    cat_present = [c for c in CATEGORICAL_COLS if c in df.columns]
    print("Categorical columns present:", cat_present)

    if cat_present:
        cat_df = pd.get_dummies(df[cat_present].fillna("MISSING").astype(str), prefix=cat_present, prefix_sep="__")
        features_df = pd.concat([features_df, cat_df], axis=1)

    # If there are any remaining numeric columns that are not meta or subject, include them
    remaining_numeric = [c for c in df.select_dtypes(include=[np.number]).columns if c not in SUBJECT_COLS and c not in meta_cols_present]
    if remaining_numeric:
        print("Including additional numeric columns:", remaining_numeric)
        features_df = pd.concat([features_df, df[remaining_numeric]], axis=1)

    # Fill NaNs
    features_df = features_df.fillna(0)

    # --- 4) save feature map (ordered columns) ---
    columns_order = features_df.columns.tolist()
    feature_map = {
        "columns_order": columns_order,
        "subject_columns": SUBJECT_COLS,
        "categorical_columns_used": cat_present
    }
    with open(FEATURE_MAP_OUT, "w") as f:
        json.dump(feature_map, f, indent=2)
    print("Saved feature map:", FEATURE_MAP_OUT)

    # --- 5) scale features ---
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(features_df.values)

    # Save scaled matrix as CSV (column order preserved)
    X_df = pd.DataFrame(X_scaled, columns=columns_order)
    X_df.to_csv(X_OUT, index=False)
    print("Saved scaled feature matrix to:", X_OUT)

    # Save meta and mapping
    meta_df.to_csv(META_OUT, index=False)
    print("Saved meta file to:", META_OUT)

    joblib.dump(scaler, SCALER_OUT)
    print("Saved scaler to:", SCALER_OUT)

    print("Preprocessing completed. Rows:", X_df.shape[0], "Features:", X_df.shape[1])

if __name__ == "__main__":
    main()
