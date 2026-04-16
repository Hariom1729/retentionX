import joblib
import pandas as pd
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_PATH = os.path.join(BASE_DIR, "ml", "models", "model.pkl")

print(f"Loading model from {MODEL_PATH}...")
model = joblib.load(MODEL_PATH)

# Test with features usually seen in PdM models
test_data = {
    'volt': 170.5,
    'rotate': 440.2,
    'pressure': 100.1,
    'vibration': 45.3,
    'volt_mean': 170.5,
    'rotate_mean': 440.2,
    'pressure_mean': 100.1,
    'vibration_mean': 45.3
}

df = pd.DataFrame([test_data])
print("Attempting prediction...")
try:
    # Try all columns
    prob = model.predict_proba(df)[0][1]
    print(f"Success! Probability: {prob}")
except Exception as e:
    print(f"Failed with full data: {e}")
    # Try just the raw ones
    try:
        raw_only = df[['volt', 'rotate', 'pressure', 'vibration']]
        prob = model.predict_proba(raw_only)[0][1]
        print(f"Success with raw only! Probability: {prob}")
    except Exception as e2:
         print(f"Failed with raw only: {e2}")
         # Try just the mean ones
         try:
            mean_only = df[['volt_mean', 'rotate_mean', 'pressure_mean', 'vibration_mean']]
            prob = model.predict_proba(mean_only)[0][1]
            print(f"Success with mean only! Probability: {prob}")
         except Exception as e3:
            print(f"Failed with mean only: {e3}")
            print(f"Model keys: {model.feature_names_in_ if hasattr(model, 'feature_names_in_') else 'Unknown'}")
