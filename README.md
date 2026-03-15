# 🧠 ChronoMed — AI-Based Chronotherapy Medication Scheduling System

ChronoMed AI is a full-stack healthcare application that uses **Machine Learning and Chronotherapy principles** to recommend the **optimal time for patients to take medications** based on their biological rhythm and health parameters.

The system integrates **AI prediction, doctor verification, and an AI-powered medical chatbot (via Featherless API)** to assist patients and doctors with medication insights and healthcare guidance.

---

# 🚀 Project Overview

Traditional medication schedules follow fixed times like **morning or night**, but research in **chronotherapy** shows that drug effectiveness depends on the **body's circadian rhythm**.

ChronoMed AI solves this problem by:

* Using **machine learning to predict the best medication time**
* Comparing the prediction with **doctor-recommended schedules**
* Requesting **doctor verification when differences are significant**
* Providing a **chatbot assistant for healthcare guidance**

This ensures **AI assistance while maintaining medical safety and professional oversight**.

---

# 🏗 System Architecture

```id="q6h7tb"
React Frontend
      ↓
Node.js + Express Backend
      ↓
MongoDB Database

      ↓

Flask AI Service
      ↓
Scikit-Learn Random Forest Model
      ↓
Chronotherapy Prediction

      ↓

Featherless AI API
      ↓
Healthcare Chatbot Assistant
```

---

# ✨ Key Features

### 🤖 AI Medication Prediction

Predicts the **optimal medication time** using a trained ML model based on patient health parameters.

### 👩‍⚕️ Doctor Verification Workflow

If the AI recommendation significantly differs from the doctor's schedule, the system sends a **verification request to a doctor**.

### 🧑‍⚕️ Doctor Dashboard

Doctors can:

* View patient AI requests
* Approve or modify medication schedules
* Configure recommended schedules

### 🧑‍💻 Patient Dashboard

Patients can:

* Enter health parameters
* Receive AI medication recommendations
* View AI insights and prediction history

### 💬 AI Chatbot Assistant

An AI-powered chatbot integrated using **Featherless API** helps users with:

* Medication questions
* Health guidance
* Chronotherapy explanations
* AI schedule understanding

### 📊 AI Insights

Displays predicted medication timing, safety status, and doctor verification needs.

### 📜 History Tracking

Tracks previous AI predictions and medication decisions.

---

# 🧰 Tech Stack

## Frontend

* React
* Vite
* React Router
* Axios
* TailwindCSS / CSS

## Backend

* Node.js
* Express.js
* JWT Authentication
* Cookie-based sessions

## Database

* MongoDB
* Mongoose

## AI / Machine Learning

* Python
* Flask
* Scikit-Learn
* Random Forest Regression
* Pandas

## AI Chatbot

* Featherless AI API

## Version Control

* Git
* GitHub

---

# 🧠 Machine Learning Model

The AI model predicts the **best medication hour (0–23)** using patient physiological and lifestyle data.

### Features used

| Feature            | Description                 |
| ------------------ | --------------------------- |
| Age                | Patient age                 |
| Sleep Duration     | Circadian rhythm indicator  |
| Heart Rate         | Physiological signal        |
| Stress Level       | Stress impact on metabolism |
| Blood Glucose      | Metabolic health            |
| Cholesterol        | Cardiovascular indicator    |
| Gender             | Biological variation        |
| Condition          | Disease type                |
| Drug Name          | Medication                  |
| Dosage             | Drug amount                 |
| Treatment Duration | Days of treatment           |

### Algorithm

Random Forest Regression implemented using **Scikit-Learn**.

---

# 💬 Chatbot Integration (Featherless API)

The system includes a **healthcare chatbot** powered by Featherless AI.

### Capabilities

* Medication guidance
* Chronotherapy explanation
* General healthcare assistance
* Patient support

### Example Flow

```id="n4m3af"
User Question
     ↓
Node.js Backend
     ↓
Featherless API
     ↓
AI Generated Response
     ↓
Displayed in Chat Interface
```

---

# 🔐 Authentication System

Authentication uses:

* JWT tokens
* HTTP cookies
* Protected routes

Users can:

* Register
* Login
* Access dashboards securely

---

# 📂 Project Structure

```id="fw1p2d"
ByteCamp-Tridosha
│
├── client/                # React frontend
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── services/
│
├── Backend/               # Node.js backend
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
│
├── dataset/               # AI service
│   ├── app.py
│   └── model/
│       └── chronomed_model.pkl
│
└── README.md
```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone Repository

```id="xk3d5p"
git clone https://github.com/your-username/chronomed-ai.git
cd chronomed-ai
```

---

# 2️⃣ Backend Setup

```id="y8r6mq"
cd Backend
npm install
```

Create `.env`

```id="m8c4ws"
MONGO_URI=mongodb://127.0.0.1:27017/bytecamp
JWT_SECRET=your_secret_key
FEATHERLESS_API_KEY=your_api_key
```

Run backend:

```id="x5svng"
npm run dev
```

Server runs on:

```id="j9r8da"
http://localhost:5001
```

---

# 3️⃣ Frontend Setup

```id="hr9d2v"
cd client
npm install
npm run dev
```

Frontend runs on:

```id="o7t9sm"
http://localhost:5173
```

---

# 4️⃣ AI Service Setup

```id="y6b0c5"
cd dataset
pip install flask pandas scikit-learn
python app.py
```

AI service runs on:

```id="z4n6sd"
http://127.0.0.1:5000
```

---

# 🧪 Example AI Prediction API

### Request

```id="l6x7tg"
POST /predict
```

Input:

```id="s7p3dn"
{
  "age": 45,
  "sleep_duration": 7,
  "heart_rate": 72,
  "stress": 3,
  "glucose": 120,
  "cholesterol": 180,
  "gender": 1,
  "condition": 1,
  "drug": 1,
  "dosage": 50,
  "duration": 30
}
```

### Response

```id="r2f9vb"
{
  "ai_recommended_time": 22,
  "doctor_recommended_time": 18,
  "time_difference_hours": 4,
  "doctor_verification_required": true,
  "status": "WARNING"
}
```

---

# 🌍 Real-World Impact

ChronoMed AI can help patients with:

* Hypertension
* Diabetes
* Cardiovascular diseases

Benefits include:

* Improved drug effectiveness
* Reduced side effects
* Personalized treatment plans

---

# 🏆 Innovation

ChronoMed AI combines:

```id="f6t1kp"
Chronotherapy
+
Machine Learning
+
Doctor Verification Workflow
+
AI Healthcare Chatbot
```

to build a **safe and intelligent medication scheduling system**.

---

# 📜 License

This project is developed for **educational and hackathon purposes**.

---

# 👩‍💻 Authors

Developed during the **ByteCamp Hackathon**.

Team: **ByteCamp-Tridosha**
