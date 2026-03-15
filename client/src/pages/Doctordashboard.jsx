import React, { useState, useEffect } from "react";
import { Users, Calendar, FileWarning, Settings, ClipboardList, ArrowRight, Activity, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { modelService } from "../services/api";

const DoctorDashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({ pendingRequests: 0, loading: true });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const requests = await modelService.getDoctorRequests();
                const pendingCount = requests.filter(r => r.status === "pending").length;
                setStats({ pendingRequests: pendingCount, loading: false });
            } catch (err) {
                console.error("Failed to fetch dashboard stats", err);
                setStats(prev => ({ ...prev, loading: false }));
            }
        };
        fetchStats();
    }, []);

    return (
        <div style={{ maxWidth: "1200px", margin: "40px auto", padding: "0 20px", display: "flex", flexDirection: "column", gap: "32px" }}>
            
            {/* Header Area */}
            <div style={{ paddingBottom: "24px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                <div>
                    <div style={{ display: 'inline-block', padding: '6px 16px', background: 'rgba(59, 130, 246, 0.1)', color: '#60a5fa', borderRadius: '20px', fontSize: '13px', fontWeight: '600', marginBottom: '16px', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                        Doctor Portal Active
                    </div>
                    <h1 style={{ fontSize: "36px", fontWeight: "700", color: "white", marginBottom: "8px", letterSpacing: "-0.5px" }}>
                        Good Morning, <span style={{ color: "var(--color-healthcare-main)" }}>Doctor</span>
                    </h1>
                    <p style={{ color: "var(--text-secondary)", fontSize: "16px", maxWidth: "600px" }}>
                        Welcome to your ChronoCare command center. Access settings, review AI alignments, and manage patient care.
                    </p>
                </div>
                <div style={{ textAlign: "right", color: "var(--text-secondary)", fontSize: "14px", fontWeight: "500" }}>
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
            </div>

            {/* Quick Metrics */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: "20px" }}>
                <MetricCard icon={<Users size={24} />} title="Total Patients Under Care" value="120" trend="+12% this month" trendUp={true} color="#3b82f6" />
                <MetricCard icon={<Calendar size={24} />} title="Appointments Today" value="8" trend="3 upcoming" trendUp={null} color="#10b981" />
                <MetricCard 
                    icon={<FileWarning size={24} color={stats.pendingRequests > 0 ? "#f59e0b" : "#10b981"} />} 
                    title="Pending AI Approvals" 
                    value={stats.loading ? "..." : stats.pendingRequests} 
                    trend={stats.pendingRequests > 0 ? "Requires your attention" : "All caught up!"}
                    trendUp={stats.pendingRequests === 0}
                    color={stats.pendingRequests > 0 ? "#f59e0b" : "#10b981"}
                    highlight={stats.pendingRequests > 0}
                />
            </div>

            {/* Main Navigation Cards */}
            <h2 style={{ fontSize: "22px", fontWeight: "600", color: "white", marginTop: "16px", marginBottom: "-8px" }}>Portal Access</h2>
            
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(400px,1fr))", gap: "24px" }}>
                
                {/* Pending Requests Card */}
                <div 
                    onClick={() => navigate("/doctor-requests")}
                    className="glass-panel" 
                    style={{ 
                        padding: "32px", 
                        cursor: "pointer", 
                        transition: "all 0.3s ease",
                        border: "1px solid rgba(255,255,255,0.08)",
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                        position: "relative",
                        overflow: "hidden"
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-4px)";
                        e.currentTarget.style.border = "1px solid var(--color-healthcare-main)";
                        e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.4)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.border = "1px solid rgba(255,255,255,0.08)";
                        e.currentTarget.style.boxShadow = "none";
                    }}
                >
                    <div style={{ position: "absolute", top: "-20px", right: "-20px", opacity: 0.05, transform: "rotate(15deg)" }}>
                        <ClipboardList size={180} />
                    </div>
                    
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "56px", height: "56px", borderRadius: "16px", background: "rgba(59, 130, 246, 0.15)", color: "#60a5fa" }}>
                        <ClipboardList size={28} />
                    </div>
                    
                    <div>
                        <h3 style={{ fontSize: "24px", fontWeight: "700", color: "white", marginBottom: "8px", display: "flex", alignItems: "center", gap: "12px" }}>
                            AI Alignments & Overrides
                            {stats.pendingRequests > 0 && (
                                <span style={{ background: "#ef4444", color: "white", fontSize: "12px", padding: "4px 10px", borderRadius: "12px", fontWeight: "600" }}>
                                    {stats.pendingRequests} New
                                </span>
                            )}
                        </h3>
                        <p style={{ color: "var(--text-secondary)", fontSize: "15px", lineHeight: "1.6" }}>
                            Review prediction models generated by the AI that deviate from standard medical guidelines. Provide your expert approval or override recommended timings.
                        </p>
                    </div>

                    <div style={{ marginTop: "auto", display: "flex", alignItems: "center", color: "var(--color-healthcare-main)", fontWeight: "600", fontSize: "15px", gap: "8px" }}>
                        Review Pending Models <ArrowRight size={18} />
                    </div>
                </div>

                {/* Settings Card */}
                <div 
                    onClick={() => navigate("/doctor-settings")}
                    className="glass-panel" 
                    style={{ 
                        padding: "32px", 
                        cursor: "pointer", 
                        transition: "all 0.3s ease",
                        border: "1px solid rgba(255,255,255,0.08)",
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                        position: "relative",
                        overflow: "hidden"
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-4px)";
                        e.currentTarget.style.border = "1px solid var(--color-healthcare-main)";
                        e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.4)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.border = "1px solid rgba(255,255,255,0.08)";
                        e.currentTarget.style.boxShadow = "none";
                    }}
                >
                    <div style={{ position: "absolute", top: "-20px", right: "-20px", opacity: 0.05, transform: "rotate(-15deg)" }}>
                        <Settings size={180} />
                    </div>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "56px", height: "56px", borderRadius: "16px", background: "rgba(16, 185, 129, 0.15)", color: "#34d399" }}>
                        <Settings size={28} />
                    </div>
                    
                    <div>
                        <h3 style={{ fontSize: "24px", fontWeight: "700", color: "white", marginBottom: "8px" }}>
                            Doctor Guidelines Setup
                        </h3>
                        <p style={{ color: "var(--text-secondary)", fontSize: "15px", lineHeight: "1.6" }}>
                            Configure standard baseline medication algorithms for different conditions. These base rules are used by the AI to detect when a personalized timing deviates significantly.
                        </p>
                    </div>

                    <div style={{ marginTop: "auto", display: "flex", alignItems: "center", color: "var(--color-healthcare-main)", fontWeight: "600", fontSize: "15px", gap: "8px" }}>
                        Configure Guidelines <ArrowRight size={18} />
                    </div>
                </div>

            </div>
        </div>
    );
};

// Components
const MetricCard = ({ icon, title, value, trend, trendUp, color, highlight }) => (
    <div className="glass-panel" style={{ 
        padding: "24px", 
        borderLeft: highlight ? `4px solid ${color}` : "none",
        position: "relative",
        overflow: "hidden"
    }}>
        {highlight && (
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: `${color}`, opacity: 0.03, pointerEvents: "none" }} />
        )}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
            <div style={{ color: color, background: `${color}15`, padding: "10px", borderRadius: "12px" }}>
                {icon}
            </div>
            {trend && (
                <div style={{ 
                    display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", fontWeight: "600",
                    color: trendUp === true ? "#10b981" : trendUp === false ? "#ef4444" : "var(--text-secondary)",
                    background: trendUp === true ? "rgba(16, 185, 129, 0.1)" : trendUp === false ? "rgba(239, 68, 68, 0.1)" : "rgba(255,255,255,0.05)",
                    padding: "4px 10px", borderRadius: "20px"
                }}>
                    {trendUp === true && <TrendingUp size={12} />}
                    {trendUp === false && <TrendingUp size={12} style={{ transform: "rotate(180deg)" }} />}
                    {trend}
                </div>
            )}
        </div>
        <div>
            <h4 style={{ color: "var(--text-secondary)", fontSize: "14px", fontWeight: "500", marginBottom: "4px" }}>{title}</h4>
            <div style={{ fontSize: "32px", fontWeight: "700", color: "white", letterSpacing: "-1px" }}>{value}</div>
        </div>
    </div>
);

export default DoctorDashboard;
