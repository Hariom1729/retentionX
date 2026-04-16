from fastapi import FastAPI
import joblib
import pandas as pd
import os
import joblib


app = FastAPI()

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

model_path = os.path.join(BASE_DIR, "models", "model.pkl")

# Load model
model = joblib.load(model_path)

@app.get("/")
def home():
    return {"message": "ML API Running"}

@app.post("/predict")
def predict(data: dict):
    data["volt_mean"] = data.get("volt", 0)
    data["rotate_mean"] = data.get("rotate", 0)
    data["pressure_mean"] = data.get("pressure", 0)
    data["vibration_mean"] = data.get("vibration", 0)

    df = pd.DataFrame([data])

    prob = model.predict_proba(df)[0][1]
    threshold = 0.4
    prediction = 1 if prob > threshold else 0

    return {
        "prediction": prediction,
        "failure_probability": prob
    }