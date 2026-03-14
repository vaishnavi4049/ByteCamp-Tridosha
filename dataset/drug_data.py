import pandas as pd

def get_drug_data():

    drug_data = pd.DataFrame({

        "disease": [
            "diabetes",
            "heart",
            "hypertension",
            "normal"
        ],

        "drug": [
            "metformin",
            "aspirin",
            "amlodipine",
            "vitamin"
        ],

        "drug_peak": [
            3,
            2,
            6,
            1
        ]

    })

    return drug_data