import pandas as pd
import random

rows = []

for i in range(10000):

    age = random.randint(20,80)
    sleep = random.uniform(5,9)
    heart_rate = random.randint(60,100)
    stress = random.randint(1,5)
    glucose = random.randint(80,180)
    cholesterol = random.randint(150,260)

    gender = random.randint(0,1)
    condition = random.randint(0,3)
    drug = random.randint(0,5)

    dosage = random.randint(10,500)
    duration = random.randint(5,60)

    # Chronotherapy logic
    if condition == 0:   # hypertension
        base_time = 22
    elif condition == 1: # diabetes
        base_time = 7
    elif condition == 2: # asthma
        base_time = 21
    else:
        base_time = 9

    circadian_shift = int((stress - 3) * 1.5)
    sleep_shift = int((sleep - 7) * 2)

    best_time = (base_time + circadian_shift + sleep_shift) % 24

    rows.append([
        age,sleep,heart_rate,stress,glucose,cholesterol,
        gender,condition,drug,dosage,duration,best_time
    ])

df = pd.DataFrame(rows,columns=[
"Age","Sleep Duration","Heart Rate","Stress Level",
"blood_glucose_level","Cholesterol",
"Gender","Condition","Drug_Name",
"Dosage_mg","Treatment_Duration_days",
"Best_Time"
])

df.to_csv("chronotherapy_dataset.csv",index=False)

print("Dataset created:",df.shape)