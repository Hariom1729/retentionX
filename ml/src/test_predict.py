import joblib
import pandas as pd

# Load model
model = joblib.load("../models/model.pkl")

# 🔥 Load dataset
df = pd.read_csv("../data/PdM_telemetry.csv")

# Convert datetime (important)
df["datetime"] = pd.to_datetime(df["datetime"])

# Sort data
df = df.sort_values(["machineID", "datetime"])

# 🔥 Create rolling features (same as training)
df["volt_mean"] = df.groupby("machineID")["volt"].transform(lambda x: x.rolling(3).mean())
df["rotate_mean"] = df.groupby("machineID")["rotate"].transform(lambda x: x.rolling(3).mean())
df["pressure_mean"] = df.groupby("machineID")["pressure"].transform(lambda x: x.rolling(3).mean())
df["vibration_mean"] = df.groupby("machineID")["vibration"].transform(lambda x: x.rolling(3).mean())

# Drop NaN rows
df = df.dropna()

# 🔥 Pick one real sample (change index to test different cases)
row = df.iloc[1000]

# Prepare input
sample = pd.DataFrame([{
    "volt": row["volt"],
    "rotate": row["rotate"],
    "pressure": row["pressure"],
    "vibration": row["vibration"],
    "volt_mean": row["volt_mean"],
    "rotate_mean": row["rotate_mean"],
    "pressure_mean": row["pressure_mean"],
    "vibration_mean": row["vibration_mean"]
}])

# Predict
prob = model.predict_proba(sample)[0][1]

threshold = 0.4
prediction = 1 if prob > threshold else 0

# Output
print("Sample Index:", row.name)

if prediction == 1:
    print("⚠️ ALERT: Failure likely soon!")
else:
    print("✅ Machine is healthy")

print("Failure Probability:", prob)