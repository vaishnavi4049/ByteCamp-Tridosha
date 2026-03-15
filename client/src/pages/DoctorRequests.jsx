import React, { useState, useEffect } from "react";
import {
    Users, Calendar, FileWarning, Brain, PlusCircle,
    ClipboardList, ArrowLeft, CheckCircle, FileText, Check, X
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { modelService } from "../services/api";
import MedicalReport from "../components/MedicalReport";

const DoctorRequests = () => {
    const navigate = useNavigate();
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPDF, setSelectedPDF] = useState(null);

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const data = await modelService.getDoctorRequests();
            setRequests(data);
        } catch (err) {
            console.error("Failed to fetch doctor requests", err);
        } finally {
            setLoading(false);
        }
    };

    const handleAction = async (requestId, decision, newTime = null) => {
        try {
            await modelService.respondToDoctorRequest({
                request_id: requestId,
                decision,
                new_time: newTime
            });
            fetchRequests(); // Refresh list immediately
        } catch (err) {
            console.error("Action failed", err);
        }
    };

    const pendingRequests = requests.filter(r => r.status === "pending").length;

    return (
        <div style={{ maxWidth: "1200px", margin: "40px auto", padding: "0 20px", display: "flex", flexDirection: "column", gap: "32px", position: "relative" }}>
            
            {/* Modal for PDF Rendering */}
            {selectedPDF && (
                <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
                    <div style={{ backgroundColor: 'white', borderRadius: '12px', width: '100%', maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto', position: 'relative', color: '#0f172a' }}>
                        <button onClick={() => setSelectedPDF(null)} className="btn-secondary" style={{ position: 'absolute', top: '16px', right: '16px', color: 'black', background: '#e2e8f0', zIndex: 10 }}>Close Viewer</button>
                        <MedicalReport 
                            prediction={{
                                predicted_improvement_score: selectedPDF.improvement_score,
                                ai_recommended_time: selectedPDF.ai_time,
                                doctor_recommended_time: selectedPDF.doctor_time,
                                time_difference_hours: Math.abs(selectedPDF.ai_time - selectedPDF.doctor_time)
                            }}
                            formData={selectedPDF.patient_parameters}
                            patientId={selectedPDF.patient_id}
                        />
                    </div>
                </div>
            )}

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", paddingBottom: "12px", borderBottom: "1px solid rgba(255,255,255,0.06)", marginBottom: "24px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                    <button onClick={() => navigate("/doctor-dashboard")} style={{ background: "transparent", border: "none", cursor: "pointer", color: "white" }}>
                        <ArrowLeft size={22} />
                    </button>
                    <div>
                        <h1 style={{ fontSize: "30px", fontWeight: "700", color: "white" }}>AI Alignments & Overrides</h1>
                        <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>Manage patient requests and AI recommended timings</p>
                    </div>
                </div>
            </div>

            {/* Main Section */}
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px" }}>
                
                {/* Real Pending Doctor Requests */}
                <div className="glass-panel" style={{ padding: "24px" }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "18px" }}>
                        <h2 style={{ fontSize: "18px", color: "white" }}>Pending AI Alignments</h2>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                        {loading && <p style={{ color: 'var(--text-muted)' }}>Loading records...</p>}
                        {!loading && requests.length === 0 && <p style={{ color: 'var(--text-muted)' }}>No requests available.</p>}
                        
                        {!loading && requests.map((req, index) => (
                            <div key={index} style={{
                                display: "flex", justifyContent: "space-between", alignItems: "center",
                                padding: "16px", borderRadius: "8px",
                                background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)"
                            }}>
                                <div>
                                    <div style={{ color: "white", fontWeight: "600", fontSize: '1.1rem', marginBottom: '4px' }}>
                                        {req.patient_id}
                                    </div>
                                    <div style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: '8px' }}>
                                        Condition: <span style={{ color: "var(--text-main)" }}>{req.condition}</span> | Current AI Suggestion: {req.ai_time}:00
                                    </div>
                                    
                                    {req.has_pdf_attached && (
                                        <button 
                                            onClick={() => setSelectedPDF(req)}
                                            style={{ color: '#3b82f6', background: 'transparent', border: '1px solid #3b82f6', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                                        >
                                            <FileText size={14} /> View Attached Medical PDF
                                        </button>
                                    )}
                                </div>

                                <div style={{ textAlign: "right" }}>
                                    <StatusBadge status={req.status === "pending" ? "Action Required" : (req.status === "approved" ? "Approved" : "Overridden")} />
                                    
                                    {req.status === "pending" && (
                                        <div style={{ display: 'flex', gap: '8px', marginTop: '12px', justifyContent: 'flex-end' }}>
                                            <button onClick={() => handleAction(req.id, "approved")} className="btn-success" style={{ padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px' }}>
                                                <Check size={14} /> Approve AI
                                            </button>
                                            <button onClick={() => {
                                                const time = prompt(`Enter your overridden medication time for ${req.patient_id} (0-23):`, req.doctor_time);
                                                if (time !== null) handleAction(req.id, "rejected", parseInt(time));
                                            }} className="btn-outline-danger" style={{ padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px' }}>
                                                <X size={14} /> Override
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* AI Insights Sidebar */}
                <div className="glass-panel" style={{ padding: "22px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                        <Brain size={18} color="#10b981" />
                        <strong style={{ color: "white" }}>AI Insights</strong>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        <InsightCard text="Patient John Doe may experience BP spike at 6 AM." />
                        <InsightCard text="Optimal statin intake window detected: 9 PM." />
                        <InsightCard text="2 patients missed medication logs today." />
                    </div>
                </div>
            </div>

           
        </div>
    );
};

/* COMPONENTS */
const DashboardCard = ({ icon, title, value }) => (
    <div className="glass-panel" style={{ padding: "22px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px", color: "var(--accent-color)" }}>
            {icon}
            <span style={{ fontSize: "14px" }}>{title}</span>
        </div>
        <div style={{ fontSize: "30px", fontWeight: "700", color: "white" }}>
            {value}
        </div>
    </div>
);

const InsightCard = ({ text }) => (
    <div style={{ background: "rgba(255,255,255,0.04)", padding: "12px", borderRadius: "8px", fontSize: "13px", color: "var(--text-secondary)", lineHeight: "1.5" }}>
        {text}
    </div>
);

const ActionButton = ({ icon, text }) => (
    <button className="btn-primary" style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 16px" }}>
        {icon} {text}
    </button>
);

const StatusBadge = ({ status }) => {
    let color = "#3b82f6";
    if (status === "Approved") color = "#10b981";
    if (status === "Overridden") color = "#ef4444";
    if (status === "Action Required") color = "#f59e0b";

    return (
        <span style={{ fontSize: "12px", padding: "6px 12px", borderRadius: "6px", background: `${color}20`, color: color, fontWeight: '600' }}>
            {status}
        </span>
    );
};

export default DoctorRequests;
