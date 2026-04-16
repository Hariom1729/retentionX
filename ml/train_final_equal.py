import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import joblib
import os

# Paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_PATH = os.path.join(BASE_DIR, "data", "final_balanced_equal.csv")
MODEL_PATH = os.path.join(BASE_DIR, "models", "model.pkl")

print("Loading final balanced equal dataset...")
df = pd.read_csv(DATA_PATH)

# Features
features = ['volt', 'rotate', 'pressure', 'vibration']
X = df[features]

# Target: 3-Class Granular Target
# Low -> 0 (Safe)
# Medium -> 1 (Warning)
# High -> 2 (Danger)
def map_risk(x):
    label = str(x).strip().capitalize()
    if label == 'High': return 2
    if label == 'Medium': return 1
    return 0

y = df['risk'].apply(map_risk)

print(f"Training 3-WAY NEURAL model on {len(X)} samples...")
# Increase depth and estimators for finer class separation
model = RandomForestClassifier(n_estimators=150, max_depth=15, random_state=42)
model.fit(X, y)

print("Saving 3-Way model...")
os.makedirs(os.path.dirname(MODEL_PATH), exist_ok=True)
joblib.dump(model, MODEL_PATH)

# Metadata for backend
model.feature_names_in_ = features
model.risk_classes = ['Safe', 'Warning', 'Danger']

print("SUCCESS: 3-WAY NEURAL Calibration Complete.")
