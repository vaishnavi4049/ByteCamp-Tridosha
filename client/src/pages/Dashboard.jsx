import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Activity,
    Clock,
    CheckCircle2,
    CalendarClock,
    TrendingUp,
    ArrowLeft
} from "lucide-react";

import { modelService } from "../services/api";

const Dashboard = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        age: "",
        sleep_duration: "",
        heart_rate: "",
        stress: "",
        glucose: "",
        cholesterol: "",
        gender: "0",
        condition: "0",
        condition_name: "Hypertension",
        drug: "0",
        dosage: "",
        duration: ""
    });

    const [isLoading, setIsLoading] = useState(false);
    const [prediction, setPrediction] = useState(null);
    const [error, setError] = useState(null);

    const [activities] = useState([
        { id: 1, user: "John Doe", action: "Checked Blood Pressure", time: "2h ago" },
        { id: 2, user: "Jane Smith", action: "Updated Medication", time: "5h ago" }
    ]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleConditionChange = (e) => {
        const conditionValue = e.target.value;

        const conditionNames = {
            0: "Hypertension",
            1: "Diabetes",
            2: "Heart Disease",
            3: "Insomnia",
            4: "Anxiety"
        };

        setFormData((prev) => ({
            ...prev,
            condition: conditionValue,
            condition_name: conditionNames[conditionValue]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        setError(null);
        setPrediction(null);

        try {
            const payload = {
                age: Number(formData.age),
                sleep_duration: Number(formData.sleep_duration),
                heart_rate: Number(formData.heart_rate),
                stress: Number(formData.stress),
                glucose: Number(formData.glucose),
                cholesterol: Number(formData.cholesterol),
                gender: Number(formData.gender),
                condition: Number(formData.condition),
                condition_name: formData.condition_name,
                drug: Number(formData.drug),
                dosage: Number(formData.dosage),
                duration: Number(formData.duration)
            };

            const result = await modelService.predict(payload);

            setPrediction(result);

        } catch (err) {
            console.error(err);
            setError("Backend connection failed.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            style={{
                maxWidth: "1200px",
                margin: "40px auto",
                padding: "0 20px",
                display: "flex",
                flexDirection: "column",
                gap: "32px"
            }}
        >

            {/* Header */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                    paddingBottom: "14px"
                }}
            >

                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>

                    <button
                        onClick={() => navigate("/")}
                        style={{
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                            color: "white"
                        }}
                    >
                        <ArrowLeft size={22} />
                    </button>

                    <div>
                        <h1 style={{ fontSize: "28px", fontWeight: "700" }}>
                            Patient ML Predictor
                        </h1>

                        <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
                            Calculate chronotherapeutic medication timing
                        </p>
                    </div>

                </div>

            </div>


            {/* Main Section */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "2fr 1fr",
                    gap: "24px"
                }}
            >

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="glass-panel"
                    style={{
                        padding: "28px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px"
                    }}
                >

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
                            gap: "18px"
                        }}
                    >

                        <Input label="Age" name="age" value={formData.age} onChange={handleInputChange} />
                        <Input label="Sleep Duration" name="sleep_duration" value={formData.sleep_duration} onChange={handleInputChange} />
                        <Input label="Heart Rate" name="heart_rate" value={formData.heart_rate} onChange={handleInputChange} />
                        <Input label="Stress Level" name="stress" value={formData.stress} onChange={handleInputChange} />
                        <Input label="Blood Glucose" name="glucose" value={formData.glucose} onChange={handleInputChange} />
                        <Input label="Cholesterol" name="cholesterol" value={formData.cholesterol} onChange={handleInputChange} />
                        <Input label="Drug Code" name="drug" value={formData.drug} onChange={handleInputChange} />
                        <Input label="Dosage (mg)" name="dosage" value={formData.dosage} onChange={handleInputChange} />
                        <Input label="Duration (Days)" name="duration" value={formData.duration} onChange={handleInputChange} />

                        <div>
                            <label className="text-sm text-text-secondary">Condition</label>
                            <select
                                name="condition"
                                value={formData.condition}
                                onChange={handleConditionChange}
                                className="input-field"
                            >
                                <option value="0">Hypertension</option>
                                <option value="1">Diabetes</option>
                                <option value="2">Heart Disease</option>
                                <option value="3">Insomnia</option>
                                <option value="4">Anxiety</option>
                            </select>
                        </div>

                    </div>

                    <button
                        type="submit"
                        className="btn-primary"
                        style={{ padding: "12px" }}
                        disabled={isLoading}
                    >
                        {isLoading ? "Processing..." : "Calculate Prediction"}
                    </button>

                </form>


                {/* Prediction Panel */}
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

                    {error && (
                        <div style={{ padding: "14px", background: "rgba(239,68,68,0.1)" }}>
                            {error}
                        </div>
                    )}

                    {/* Score */}
                    <PredictionCard
                        icon={<Activity />}
                        title="Improvement Score"
                        value={
                            prediction
                                ? prediction.predicted_improvement_score.toFixed(1)
                                : "--"
                        }
                        unit="/10"
                    />

                    {/* Medication Time */}
                    <PredictionCard
                        icon={<CalendarClock />}
                        title="Optimal Medication Time"
                        value={
                            prediction
                                ? `${prediction.recommended_medication_hour}:00`
                                : "--:--"
                        }
                    />

                </div>

            </div>


            {/* Recent Activity */}
            <div className="glass-panel" style={{ padding: "24px" }}>

                <h2 style={{ marginBottom: "16px" }}>Recent Clinical Activity</h2>

                {activities.map((item) => (
                    <div
                        key={item.id}
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            padding: "12px 0",
                            borderBottom: "1px solid rgba(255,255,255,0.05)"
                        }}
                    >

                        <div style={{ display: "flex", gap: "10px" }}>
                            <CheckCircle2 size={18} />
                            <div>
                                <div style={{ fontWeight: "500" }}>{item.user}</div>
                                <div style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
                                    {item.action}
                                </div>
                            </div>
                        </div>

                        <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
                            {item.time}
                        </span>

                    </div>
                ))}

            </div>

        </div>
    );
};


/* Reusable Components */

const Input = ({ label, name, value, onChange }) => (
    <div>
        <label className="text-sm text-text-secondary">{label}</label>
        <input
            required
            type="number"
            name={name}
            value={value}
            onChange={onChange}
            className="input-field"
        />
    </div>
);


const PredictionCard = ({ icon, title, value, unit }) => (
    <div className="glass-panel" style={{ padding: "24px" }}>

        <div style={{ display: "flex", gap: "10px", marginBottom: "12px" }}>
            {icon}
            <strong>{title}</strong>
        </div>

        <div style={{ fontSize: "36px", fontWeight: "700" }}>
            {value} <span style={{ fontSize: "14px" }}>{unit}</span>
        </div>

    </div>
);

export default Dashboard;
