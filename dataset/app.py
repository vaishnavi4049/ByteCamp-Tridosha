# from flask import Flask,request,jsonify
# from flask_cors import CORS
# import pickle
# import pandas as pd
# import json
# import os
# from datetime import datetime
# import uuid

# from chronotherapy import medication_time

# app = Flask(__name__)
# CORS(app)

# # load trained ML model
# model = pickle.load(open("model/chronomed_model.pkl","rb"))

# SCHEDULE_FILE = 'doctor_schedule.json'
# REQUESTS_FILE = 'doctor_requests.json'

# def load_json(filepath, default_obj):
#     if not os.path.exists(filepath):
#         with open(filepath, 'w') as f:
#             json.dump(default_obj, f)
#         return default_obj
#     with open(filepath, 'r') as f:
#         try:
#             return json.load(f)
#         except:
#             return default_obj

# def save_json(filepath, data):
#     with open(filepath, 'w') as f:
#         json.dump(data, f, indent=4)

# @app.route("/schedules", methods=["GET"])
# def get_schedules():
#     schedules = load_json(SCHEDULE_FILE, {})
#     return jsonify(schedules)

# @app.route("/schedules", methods=["POST"])
# def update_schedule():
#     data = request.json
#     schedules = load_json(SCHEDULE_FILE, {})
#     condition_id = str(data.get("condition_id"))
#     schedules[condition_id] = {
#         "name": data.get("name"),
#         "recommended_hour": data.get("recommended_hour"),
#         "drug": data.get("drug"),
#         "dosage_range": data.get("dosage_range")
#     }
#     save_json(SCHEDULE_FILE, schedules)
#     return jsonify({"message": "Schedule updated successfully"})

# @app.route("/predict",methods=["POST"])
# def predict():
#     data = request.json

#     features = pd.DataFrame([[{
#         "Age": data["age"],
#         "Sleep Duration": data["sleep_duration"],
#         "Heart Rate": data["heart_rate"],
#         "Stress Level": data["stress"],
#         "blood_glucose_level": data["glucose"],
#         "Cholesterol": data["cholesterol"],
#         "Gender": data["gender"],
#         "Condition": data["condition"],
#         "Drug_Name": data["drug"],
#         "Dosage_mg": data["dosage"],
#         "Treatment_Duration_days": data["duration"]
#     }]])

#     try:
#         # We need to format the features correctly as per before
#         features = pd.DataFrame([[
#             data["age"], data["sleep_duration"], data["heart_rate"],
#             data["stress"], data["glucose"], data["cholesterol"],
#             data["gender"], data["condition"], data["drug"],
#             data["dosage"], data["duration"]
#         ]], columns=[
#             "Age", "Sleep Duration", "Heart Rate", "Stress Level",
#             "blood_glucose_level", "Cholesterol", "Gender", "Condition",
#             "Drug_Name", "Dosage_mg", "Treatment_Duration_days"
#         ])
#         predicted_hour = int(model.predict(features)[0])
#     except Exception as e:
#         improvement = 8.5 # fallback mock if ML fails

#     ai_med_time = predicted_hour
    
#     # Fetch from doctor JSON database
#     schedules = load_json(SCHEDULE_FILE, {})
#     condition_id = str(data.get("condition", "0"))
#     doctor_med_time = schedules.get(condition_id, {}).get("recommended_hour", 8)
        
#     time_diff = abs(ai_med_time - doctor_med_time)
#     if time_diff > 12:
#         time_diff = 24 - time_diff
        
#     # User specified "If there is a large difference, contact doctor"
#     verification_required = time_diff >= 2
#     status = "WARNING" if verification_required else "SAFE"

#     return jsonify({
#         "predicted_improvement_score": float(improvement),
#         "ai_recommended_time": ai_med_time,
#         "doctor_recommended_time": doctor_med_time,
#         "time_difference_hours": time_diff,
#         "doctor_verification_required": verification_required,
#         "status": status
#     })

# @app.route("/doctor-request", methods=["POST"])
# def create_doctor_request():
#     data = request.json
#     requests_db = load_json(REQUESTS_FILE, [])
    
#     new_request = {
#         "id": str(uuid.uuid4()),
#         "patient_id": data.get("patient_id"),
#         "condition": data.get("condition"),
#         "ai_time": data.get("ai_time"),
#         "doctor_time": data.get("doctor_time"),
#         "improvement_score": data.get("improvement_score"),
#         "patient_parameters": data.get("patient_parameters", {}),
#         "status": "pending",
#         "timestamp": datetime.now().isoformat()
#     }
    
#     requests_db.append(new_request)
#     save_json(REQUESTS_FILE, requests_db)
    
#     return jsonify({"message": "Request sent successfully", "request_id": new_request["id"]})

# @app.route("/doctor-requests", methods=["GET"])
# def get_doctor_requests():
#     requests_db = load_json(REQUESTS_FILE, [])
#     # Sort by pending first, then by timestamp DESC
#     requests_db.sort(key=lambda x: (x["status"] != "pending", x["timestamp"]), reverse=True)
#     return jsonify(requests_db)

# @app.route("/doctor-response", methods=["POST"])
# def handle_doctor_response():
#     data = request.json
#     request_id = data.get("request_id")
#     decision = data.get("decision") # "approved" or "rejected"
#     new_time = data.get("new_time")
    
#     requests_db = load_json(REQUESTS_FILE, [])
#     for req in requests_db:
#         if req["id"] == request_id:
#             req["status"] = decision
#             if decision == "rejected" and new_time is not None:
#                 req["final_time"] = new_time
#             else:
#                 req["final_time"] = req["ai_time"]
#             save_json(REQUESTS_FILE, requests_db)
#             return jsonify({"message": "Response recorded successfully", "request": req})
            
#     return jsonify({"error": "Request not found"}), 404

# @app.route("/patient-request-status/<patient_id>", methods=["GET"])
# def get_patient_status(patient_id):
#     requests_db = load_json(REQUESTS_FILE, [])
#     # Get the latest request for this patient
#     patient_reqs = [r for r in requests_db if r["patient_id"] == patient_id]
#     if not patient_reqs:
#         return jsonify({"status": "none"})
        
#     latest_req = max(patient_reqs, key=lambda x: x["timestamp"])
#     return jsonify(latest_req)

# if __name__ == "__main__":
#     app.run(debug=True, port=5000)

from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd
import json
import os
from datetime import datetime
import uuid

app = Flask(__name__)
CORS(app)

# Load ML model
model = pickle.load(open("model/chronomed_model.pkl", "rb"))

SCHEDULE_FILE = "doctor_schedule.json"
REQUESTS_FILE = "doctor_requests.json"


# ---------- JSON UTILS ----------

def load_json(filepath, default):
    if not os.path.exists(filepath):
        with open(filepath, "w") as f:
            json.dump(default, f)
        return default

    try:
        with open(filepath, "r") as f:
            return json.load(f)
    except:
        return default


def save_json(filepath, data):
    with open(filepath, "w") as f:
        json.dump(data, f, indent=4)


# ---------- DOCTOR SCHEDULE ----------

@app.route("/schedules", methods=["GET"])
def get_schedules():
    schedules = load_json(SCHEDULE_FILE, {})
    return jsonify(schedules)


@app.route("/schedules", methods=["POST"])
def update_schedule():
    data = request.json
    schedules = load_json(SCHEDULE_FILE, {})

    condition_id = str(data.get("condition_id"))

    schedules[condition_id] = {
        "name": data.get("name"),
        "recommended_hour": data.get("recommended_hour"),
        "drug": data.get("drug"),
        "dosage_range": data.get("dosage_range")
    }

    save_json(SCHEDULE_FILE, schedules)

    return jsonify({"message": "Schedule updated successfully"})


# ---------- AI PREDICTION ----------

@app.route("/predict", methods=["POST"])
def predict():

    data = request.json

    try:
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

        predicted_hour = int(model.predict(features)[0])

    except Exception as e:
        print("MODEL ERROR:", e)
        predicted_hour = 8

    ai_time = predicted_hour

    schedules = load_json(SCHEDULE_FILE, {})
    condition_id = str(data.get("condition", "0"))

    doctor_time = schedules.get(condition_id, {}).get("recommended_hour", 8)

    time_diff = abs(ai_time - doctor_time)

    if time_diff > 12:
        time_diff = 24 - time_diff

    verification_required = time_diff >= 2
    status = "WARNING" if verification_required else "SAFE"

    improvement_score = max(0, 100 - (time_diff * 10))

    return jsonify({
        "ai_recommended_time": ai_time,
        "doctor_recommended_time": doctor_time,
        "time_difference_hours": time_diff,
        "doctor_verification_required": verification_required,
        "status": status,
        "predicted_improvement_score": improvement_score
    })


# ---------- CREATE DOCTOR REQUEST ----------

@app.route("/doctor-request", methods=["POST"])
def create_doctor_request():

    data = request.json
    requests_db = load_json(REQUESTS_FILE, [])

    new_request = {
        "id": str(uuid.uuid4()),
        "patient_id": data.get("patient_id"),
        "condition": data.get("condition"),
        "ai_time": data.get("ai_time"),
        "doctor_time": data.get("doctor_time"),
        "improvement_score": data.get("improvement_score"),
        "patient_parameters": data.get("patient_parameters", {}),
        "status": "pending",
        "timestamp": datetime.now().isoformat()
    }

    requests_db.append(new_request)

    save_json(REQUESTS_FILE, requests_db)

    return jsonify({
        "message": "Request sent successfully",
        "request_id": new_request["id"]
    })


# ---------- GET DOCTOR REQUESTS ----------

@app.route("/doctor-requests", methods=["GET"])
def get_doctor_requests():

    requests_db = load_json(REQUESTS_FILE, [])

    requests_db.sort(
        key=lambda x: (x["status"] != "pending", x["timestamp"]),
        reverse=True
    )

    return jsonify(requests_db)


# ---------- DOCTOR RESPONSE ----------

@app.route("/doctor-response", methods=["POST"])
def doctor_response():

    data = request.json
    request_id = data.get("request_id")
    decision = data.get("decision")
    new_time = data.get("new_time")

    requests_db = load_json(REQUESTS_FILE, [])

    for req in requests_db:

        if req["id"] == request_id:

            req["status"] = decision

            if decision == "rejected" and new_time is not None:
                req["final_time"] = new_time
            else:
                req["final_time"] = req["ai_time"]

            save_json(REQUESTS_FILE, requests_db)

            return jsonify({
                "message": "Response recorded successfully",
                "request": req
            })

    return jsonify({"error": "Request not found"}), 404


# ---------- PATIENT STATUS ----------

@app.route("/patient-request-status/<patient_id>", methods=["GET"])
def get_patient_status(patient_id):

    requests_db = load_json(REQUESTS_FILE, [])

    patient_reqs = [r for r in requests_db if r["patient_id"] == patient_id]

    if not patient_reqs:
        return jsonify({"status": "none"})

    latest = max(patient_reqs, key=lambda x: x["timestamp"])

    return jsonify(latest)


# ---------- RUN SERVER ----------

if __name__ == "__main__":
    app.run(debug=True, port=5000)
