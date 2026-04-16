import joblib
import numpy as np

# Load model
model = joblib.load("../models/model.pkl")
scaler = joblib.load("../models/scaler.pkl")

def predict(data):
    """
    data = [volt, rotate, pressure, vibration, age, model_2, model_3, model_4]
    """

    data = np.array(data).reshape(1, -1)
    data = scaler.transform(data)

    prediction = model.predict(data)
    probability = model.predict_proba(data)

    return {
        "prediction": int(prediction[0]),
        "failure_probability": float(probability[0][1])
    }


# Example test
if __name__ == "__main__":
    sample = [170, 450, 100, 40, 10, 0, 1, 0]
    result = predict(sample)
    print(result)