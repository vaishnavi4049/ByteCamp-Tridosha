import pickle
from chronotherapy import medication_time


model = pickle.load(open("model/chronomed_model.pkl","rb"))

print("Model loaded")


import pandas as pd

user = pd.DataFrame([[
45,
7.5,
72,
3,
120,
210,
1,
2,
4,
500,
30
]], columns=[
    "Age",
    "Sleep Duration",
    "Heart Rate",
    "Stress Level",
    "blood_glucose_level",
    "Cholesterol",
    "Gender",
    "Condition",
    "Drug_Name",
    "Dosage_mg",
    "Treatment_Duration_days"
])


prediction = model.predict(user)[0]

print("Predicted improvement score:",prediction)


condition_name = "Hypertension"

med_hour = medication_time(condition_name)

print("Recommended medication hour:",med_hour)