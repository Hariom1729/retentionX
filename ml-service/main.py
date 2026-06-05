from fastapi import FastAPI
from pydantic import BaseModel
import datetime
import joblib
import pandas as pd
from model import get_model

app = FastAPI()

class CustomerData(BaseModel):
    revenue: float
    purchaseCount: int
    lastPurchaseDate: str
    joinDate: str

@app.post("/predict")
def predict_churn(data: CustomerData):
    # Calculate derived features
    last_purchase = datetime.datetime.fromisoformat(data.lastPurchaseDate.replace("Z", "+00:00"))
    join_date = datetime.datetime.fromisoformat(data.joinDate.replace("Z", "+00:00"))
    now = datetime.datetime.now(datetime.timezone.utc)
    
    days_since_last_purchase = (now - last_purchase).days
    customer_age_days = (now - join_date).days
    
    # Feature vector
    X = pd.DataFrame([{
        'revenue': data.revenue,
        'purchase_count': data.purchaseCount,
        'days_since_last_purchase': days_since_last_purchase,
        'customer_age_days': customer_age_days
    }])
    
    # Get model (loads or trains dummy)
    model = get_model()
    
    # Predict
    prob = model.predict_proba(X)[0][1] # Probability of churn (class 1)
    
    risk_level = "Low"
    if prob > 0.7:
        risk_level = "High"
    elif prob > 0.4:
        risk_level = "Medium"
        
    return {
        "churnProbability": float(prob),
        "riskLevel": risk_level
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
