import pandas as pd

def load_and_merge_data():
    telemetry = pd.read_csv("../data/PdM_telemetry.csv")
    failures = pd.read_csv("../data/PdM_failures.csv")
    machines = pd.read_csv("../data/PdM_machines.csv")

    # Convert datetime
    telemetry["datetime"] = pd.to_datetime(telemetry["datetime"])
    failures["datetime"] = pd.to_datetime(failures["datetime"])

    # Merge telemetry + machines
    df = telemetry.merge(machines, on="machineID", how="left")

    # Create failure label (1 if failure happened)
    failures["failure"] = 1
    df = df.merge(
        failures[["machineID", "datetime", "failure"]],
        on=["machineID", "datetime"],
        how="left"
    )

    df["failure"] = df["failure"].fillna(0)

    return df


def feature_engineering(df):
    df = df.sort_values(by=["machineID", "datetime"])

    # Rolling features
    df["volt_mean_3"] = df.groupby("machineID")["volt"].rolling(3).mean().reset_index(0, drop=True)
    df["rotate_mean_3"] = df.groupby("machineID")["rotate"].rolling(3).mean().reset_index(0, drop=True)
    df["pressure_mean_3"] = df.groupby("machineID")["pressure"].rolling(3).mean().reset_index(0, drop=True)
    df["vibration_mean_3"] = df.groupby("machineID")["vibration"].rolling(3).mean().reset_index(0, drop=True)

    # 🔥 FIXED HERE
    df = df.bfill()

    # Drop datetime
    df = df.drop(columns=["datetime"])

    # Encode categorical
    df = pd.get_dummies(df, columns=["model"], drop_first=True)

    return df