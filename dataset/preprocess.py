import pandas as pd
from sklearn.preprocessing import LabelEncoder


def load_data():

    sleep = pd.read_csv("data/Sleep_health_and_lifestyle_dataset.csv")
    diabetes = pd.read_csv("data/diabetes_prediction_dataset.csv")
    heart = pd.read_csv("data/heart_attack_prediction_dataset.csv")
    drug = pd.read_csv("data/real_drug_dataset.csv")


    # select useful columns
    sleep = sleep[[
        "Age",
        "Sleep Duration",
        "Heart Rate",
        "Stress Level"
    ]]

    diabetes = diabetes[[
        "blood_glucose_level",
        "hypertension",
        "diabetes"
    ]]

    heart = heart[[
        "Cholesterol",
        "Heart Attack Risk"
    ]]

    drug = drug[[
        "Age",
        "Gender",
        "Condition",
        "Drug_Name",
        "Dosage_mg",
        "Treatment_Duration_days",
        "Improvement_Score"
    ]]

    # sample equal rows
    n = 5000

    sleep = sleep.sample(n, replace=True).reset_index(drop=True)
    diabetes = diabetes.sample(n, replace=True).reset_index(drop=True)
    heart = heart.sample(n, replace=True).reset_index(drop=True)
    drug = drug.sample(n, replace=True).reset_index(drop=True)

    # combine
    data = pd.DataFrame()

    data["Age"] = sleep["Age"]
    data["Sleep Duration"] = sleep["Sleep Duration"]
    data["Heart Rate"] = sleep["Heart Rate"]
    data["Stress Level"] = sleep["Stress Level"]

    data["blood_glucose_level"] = diabetes["blood_glucose_level"]
    data["hypertension"] = diabetes["hypertension"]
    data["diabetes"] = diabetes["diabetes"]

    data["Cholesterol"] = heart["Cholesterol"]
    data["heart_risk"] = heart["Heart Attack Risk"]

    data["Gender"] = drug["Gender"]
    data["Condition"] = drug["Condition"]
    data["Drug_Name"] = drug["Drug_Name"]
    data["Dosage_mg"] = drug["Dosage_mg"]
    data["Treatment_Duration_days"] = drug["Treatment_Duration_days"]

    data["Improvement_Score"] = drug["Improvement_Score"]

    # encode categorical columns
    le = LabelEncoder()

    data["Gender"] = le.fit_transform(data["Gender"])
    data["Condition"] = le.fit_transform(data["Condition"])
    data["Drug_Name"] = le.fit_transform(data["Drug_Name"])

    return data