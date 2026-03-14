import React from "react";
import {
    Users,
    Calendar,
    FileWarning,
    Brain,
    PlusCircle,
    ClipboardList,
    ArrowLeft
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const DoctorDashboard = () => {

    const navigate = useNavigate();

    const appointments = [
        { patient: "John Doe", time: "10:00 AM", status: "Upcoming" },
        { patient: "Sarah Smith", time: "11:30 AM", status: "Upcoming" },
        { patient: "Michael Brown", time: "2:00 PM", status: "Completed" }
    ];

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
                    alignItems: "flex-start",
                    paddingBottom: "12px",
                    borderBottom: "1px solid rgba(255,255,255,0.06)"
                }}
            >

                {/* Left Side */}
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>

                    {/* Back Arrow */}
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
                        <h1 style={{ fontSize: "30px", fontWeight: "700", color: "white" }}>
                            Good Morning, Doctor
                        </h1>

                        <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
                            Here's your clinical overview for today
                        </p>
                    </div>

                </div>

                {/* Date */}
                <div style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
                    {new Date().toDateString()}
                </div>

            </div>


            {/* Analytics Cards */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))",
                    gap: "20px"
                }}
            >

                <DashboardCard
                    icon={<Users size={22} />}
                    title="Total Patients"
                    value="120"
                />

                <DashboardCard
                    icon={<Calendar size={22} />}
                    title="Appointments Today"
                    value="8"
                />

                <DashboardCard
                    icon={<FileWarning size={22} />}
                    title="Pending Reports"
                    value="3"
                />

            </div>


            {/* Main Section */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "2fr 1fr",
                    gap: "24px"
                }}
            >

                {/* Appointments */}
                <div className="glass-panel" style={{ padding: "24px" }}>

                    <h2
                        style={{
                            fontSize: "18px",
                            marginBottom: "18px",
                            color: "white"
                        }}
                    >
                        Recent Appointments
                    </h2>

                    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>

                        {appointments.map((appt, index) => (
                            <div
                                key={index}
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    padding: "14px 0",
                                    borderBottom: "1px solid rgba(255,255,255,0.05)"
                                }}
                            >

                                <div>
                                    <div style={{ color: "white", fontWeight: "500" }}>
                                        {appt.patient}
                                    </div>

                                    <div style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
                                        Appointment
                                    </div>
                                </div>

                                <div style={{ textAlign: "right" }}>
                                    <div style={{ color: "white", marginBottom: "4px" }}>
                                        {appt.time}
                                    </div>

                                    <StatusBadge status={appt.status} />
                                </div>

                            </div>
                        ))}

                    </div>

                </div>


                {/* AI Insights */}
                <div className="glass-panel" style={{ padding: "22px" }}>

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            marginBottom: "16px"
                        }}
                    >
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


            {/* Quick Actions */}
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "14px"
                }}
            >

                <ActionButton icon={<PlusCircle size={18} />} text="Add Prescription" />

                <ActionButton icon={<ClipboardList size={18} />} text="View Patients" />

                <ActionButton icon={<Calendar size={18} />} text="Schedule Appointment" />

            </div>

        </div>
    );
};



/* COMPONENTS */

const DashboardCard = ({ icon, title, value }) => (
    <div className="glass-panel" style={{ padding: "22px" }}>
        <div
            style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "8px",
                color: "var(--accent-color)"
            }}
        >
            {icon}
            <span style={{ fontSize: "14px" }}>{title}</span>
        </div>

        <div style={{ fontSize: "30px", fontWeight: "700", color: "white" }}>
            {value}
        </div>
    </div>
);


const InsightCard = ({ text }) => (
    <div
        style={{
            background: "rgba(255,255,255,0.04)",
            padding: "12px",
            borderRadius: "8px",
            fontSize: "13px",
            color: "var(--text-secondary)",
            lineHeight: "1.5"
        }}
    >
        {text}
    </div>
);


const ActionButton = ({ icon, text }) => (
    <button
        className="btn-primary"
        style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 16px"
        }}
    >
        {icon}
        {text}
    </button>
);


const StatusBadge = ({ status }) => {

    const color = status === "Completed" ? "#10b981" : "#f59e0b";

    return (
        <span
            style={{
                fontSize: "11px",
                padding: "4px 9px",
                borderRadius: "6px",
                background: `${color}20`,
                color: color
            }}
        >
            {status}
        </span>
    );
};

export default DoctorDashboard;
