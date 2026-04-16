import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import joblib
import os

# Paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_PATH = os.path.join(BASE_DIR, "data", "final_balanced_dataset.csv")
MODEL_PATH = os.path.join(BASE_DIR, "models", "model.pkl")

print("Loading dataset...")
df = pd.read_csv(DATA_PATH)

# Features and Target
# Using the 4 core telemetry features
features = ['volt', 'rotate', 'pressure', 'vibration']
X = df[features]

# Target: Convert Risk to binary (0 for Low, 1 for Medium/High)
# This allows us to use predict_proba for the 3-tier UI logic
y = df['risk'].apply(lambda x: 0 if x == 'Low' else 1)

print(f"Training on {len(X)} samples...")
model = RandomForestClassifier(n_estimators=100, max_depth=10, random_state=42)
model.fit(X, y)

print("Saving model...")
os.makedirs(os.path.dirname(MODEL_PATH), exist_ok=True)
joblib.dump(model, MODEL_PATH)

# Save feature names to ensure main.py knows what to use
model.feature_names_in_ = features

print("Training Complete. Model saved to:", MODEL_PATH)
