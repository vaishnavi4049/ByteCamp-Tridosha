from flask import Flask,request,jsonify
import pickle
import numpy as np
from chronotherapy import medication_time

app = Flask(__name__)

model = pickle.load(open("model/chronomed_model.pkl","rb"))


@app.route("/predict",methods=["POST"])
def predict():

    data = request.json

    features = np.array([[

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

    ]])

    improvement = model.predict(features)[0]

    med_time = medication_time(data["condition_name"])

    return jsonify({

        "predicted_improvement_score": float(improvement),
        "recommended_medication_hour": med_time

    })


if __name__ == "__main__":
    app.run(debug=True)