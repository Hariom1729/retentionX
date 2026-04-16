# model.py

import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import joblib

# ✅ Load dataset from local data folder
telemetry = pd.read_csv("../data/PdM_telemetry.csv")
failures = pd.read_csv("../data/PdM_failures.csv")

# Convert datetime
telemetry['datetime'] = pd.to_datetime(telemetry['datetime'])
failures['datetime'] = pd.to_datetime(failures['datetime'])

# Sort data
telemetry = telemetry.sort_values(['machineID', 'datetime'])

# 🔥 Create target: failure in next 24 hours
telemetry['failure_next_24h'] = 0

for i in range(len(failures)):
    mid = failures.iloc[i]['machineID']
    time = failures.iloc[i]['datetime']

    mask = (
        (telemetry['machineID'] == mid) &
        (telemetry['datetime'] >= time - pd.Timedelta(hours=24)) &
        (telemetry['datetime'] < time)
    )

    telemetry.loc[mask, 'failure_next_24h'] = 1

# 🔥 Feature Engineering (rolling trends)
telemetry['volt_mean'] = telemetry.groupby('machineID')['volt'].transform(lambda x: x.rolling(3).mean())
telemetry['rotate_mean'] = telemetry.groupby('machineID')['rotate'].transform(lambda x: x.rolling(3).mean())
telemetry['pressure_mean'] = telemetry.groupby('machineID')['pressure'].transform(lambda x: x.rolling(3).mean())
telemetry['vibration_mean'] = telemetry.groupby('machineID')['vibration'].transform(lambda x: x.rolling(3).mean())

# Drop NaN values
telemetry = telemetry.dropna()

# Features
features = [
    'volt', 'rotate', 'pressure', 'vibration',
    'volt_mean', 'rotate_mean', 'pressure_mean', 'vibration_mean'
]

X = telemetry[features]
y = telemetry['failure_next_24h']

# 🚨 Better split (time-based instead of random)
telemetry = telemetry.sort_values('datetime')

split_index = int(len(telemetry) * 0.8)

X_train = X.iloc[:split_index]
X_test = X.iloc[split_index:]
y_train = y.iloc[:split_index]
y_test = y.iloc[split_index:]

# Train model
model = RandomForestClassifier(
    n_estimators=100,
    max_depth=10,
    class_weight="balanced",  # 🔥 important
    random_state=42
)

model.fit(X_train, y_train)

# Evaluate
from sklearn.metrics import classification_report, confusion_matrix

y_pred = model.predict(X_test)

print("\nModel Performance:\n")
print(classification_report(y_test, y_pred))

print("Confusion Matrix:\n")
print(confusion_matrix(y_test, y_pred))

# Save model
joblib.dump(model, "../models/model.pkl")

print("✅ Model trained and saved successfully!")