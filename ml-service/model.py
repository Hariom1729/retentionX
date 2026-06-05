import os
import joblib
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier

MODEL_PATH = "churn_model.pkl"

def train_dummy_model():
    # Generate some dummy data
    np.random.seed(42)
    n_samples = 1000
    
    revenue = np.random.uniform(50, 5000, n_samples)
    purchase_count = np.random.randint(1, 100, n_samples)
    days_since_last_purchase = np.random.randint(1, 365, n_samples)
    customer_age_days = np.random.randint(30, 1000, n_samples)
    
    # Create target (churn = 1 if days_since_last_purchase > 90 and low revenue/purchase count)
    churn = np.where((days_since_last_purchase > 90) & (revenue < 1000) & (purchase_count < 10), 1, 0)
    
    # Add some noise
    flip_indices = np.random.choice(n_samples, size=int(n_samples * 0.1), replace=False)
    churn[flip_indices] = 1 - churn[flip_indices]
    
    X = pd.DataFrame({
        'revenue': revenue,
        'purchase_count': purchase_count,
        'days_since_last_purchase': days_since_last_purchase,
        'customer_age_days': customer_age_days
    })
    y = churn
    
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X, y)
    
    joblib.dump(model, MODEL_PATH)
    return model

def get_model():
    if os.path.exists(MODEL_PATH):
        return joblib.load(MODEL_PATH)
    else:
        return train_dummy_model()
