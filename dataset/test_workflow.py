import requests

BASE_URL = "http://127.0.0.1:5000"

def test_workflow():
    print("1. Doctor configures Hypertension schedule (Recommended Hour: 18)")
    res = requests.post(f"{BASE_URL}/schedules", json={
        "condition_id": "0", "name": "Hypertension", 
        "recommended_hour": 18, "drug": "Beta Blocker", "dosage_range": "25-100mg"
    })
    print("Response:", res.json())
    print("\n-------------------\n")

    print("2. Patient requests AI chronotherapy schedule (AI should recommend ~22, difference = 4)")
    payload = {
        "age": 45, "sleep_duration": 7.5, "heart_rate": 72, "stress": 3,
        "glucose": 120, "cholesterol": 210, "gender": 1, "condition": 0,
        "condition_name": "Hypertension", "drug": 4, "dosage": 500, "duration": 30
    }
    res = requests.post(f"{BASE_URL}/predict", json=payload)
    pred_data = res.json()
    print("Response:", pred_data)
    print("\n-------------------\n")

    print("3. Patient decides to Consult Doctor (Sends doctor request)")
    req_payload = {
        "patient_id": "demo@example.com",
        "condition": "Hypertension",
        "ai_time": pred_data["ai_recommended_time"],
        "doctor_time": pred_data["doctor_recommended_time"],
        "improvement_score": pred_data["predicted_improvement_score"],
        "patient_parameters": payload
    }
    res = requests.post(f"{BASE_URL}/doctor-request", json=req_payload)
    req_data = res.json()
    print("Response:", req_data)
    req_id = req_data["request_id"]
    print("\n-------------------\n")

    print("4. Doctor views all requests")
    res = requests.get(f"{BASE_URL}/doctor-requests")
    print("Pending Requests:", len(res.json()))
    print("\n-------------------\n")

    print("5. Doctor Overrides the time (Rejects AI, sets final to 19)")
    res = requests.post(f"{BASE_URL}/doctor-response", json={
        "request_id": req_id,
        "decision": "rejected",
        "new_time": 19
    })
    print("Response:", res.json())
    print("\n-------------------\n")

    print("6. Patient Dashboard polls for latest status")
    res = requests.get(f"{BASE_URL}/patient-request-status/demo@example.com")
    print("Patient Status Notification:", res.json())

if __name__ == "__main__":
    test_workflow()
