from flask import Flask,request,jsonify
from flask_cors import CORS
import pickle
import pandas as pd
from chronotherapy import medication_time

app = Flask(__name__)
CORS(app)

model = pickle.load(open("model/chronomed_model.pkl","rb"))


@app.route("/predict",methods=["POST"])
def predict():

    data = request.json

    features = pd.DataFrame([[
        data["age"],
        data["sleep_duration"],
        data["heart_rate"],
        data["stress"],
        data["glucose"],
        data["cholesterol"],
        data["gender"],
        data["condition"],
        data["drug"],
        data["dosage"],
        data["duration"]
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

    improvement = model.predict(features)[0]

    med_time = medication_time(data["condition_name"])

    return jsonify({

        "predicted_improvement_score": float(improvement),
        "recommended_medication_hour": med_time

    })


if __name__ == "__main__":
    app.run(debug=True)