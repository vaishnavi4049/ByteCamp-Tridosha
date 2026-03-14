import React from "react";

const DoctorDashboard = () => {

    const appointments = [
        { patient: "John Doe", time: "10:00 AM", status: "Upcoming" },
        { patient: "Sarah Smith", time: "11:30 AM", status: "Upcoming" },
        { patient: "Michael Brown", time: "2:00 PM", status: "Completed" },
    ];

    return (
        <div style={{ padding: "30px" }}>

            <h1 style={{ fontSize: "28px", marginBottom: "10px" }}>
                Doctor Dashboard
            </h1>

            <p style={{ color: "#64748b", marginBottom: "30px" }}>
                Welcome back, Doctor 👨‍⚕️
            </p>

            {/* Stats */}
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
                gap: "20px",
                marginBottom: "40px"
            }}>

                <div className="glass-panel">
                    <h3>Total Patients</h3>
                    <p style={{ fontSize: "22px", fontWeight: "bold" }}>120</p>
                </div>

                <div className="glass-panel">
                    <h3>Today's Appointments</h3>
                    <p style={{ fontSize: "22px", fontWeight: "bold" }}>8</p>
                </div>

                <div className="glass-panel">
                    <h3>Pending Reports</h3>
                    <p style={{ fontSize: "22px", fontWeight: "bold" }}>3</p>
                </div>

            </div>

            {/* Appointments Table */}
            <div className="glass-panel" style={{ padding: "20px" }}>
                <h2 style={{ marginBottom: "20px" }}>Today's Appointments</h2>

                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr style={{ textAlign: "left", borderBottom: "1px solid #eee" }}>
                            <th>Patient</th>
                            <th>Time</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {appointments.map((appt, index) => (
                            <tr key={index} style={{ borderBottom: "1px solid #f1f5f9" }}>
                                <td style={{ padding: "10px 0" }}>{appt.patient}</td>
                                <td>{appt.time}</td>
                                <td>{appt.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>

            {/* Quick Actions */}
            <div style={{ marginTop: "40px" }}>
                <h2 style={{ marginBottom: "15px" }}>Quick Actions</h2>

                <div style={{ display: "flex", gap: "15px" }}>
                    <button className="btn-primary">View Patients</button>
                    <button className="btn-primary">Add Prescription</button>
                    <button className="btn-primary">Schedule Appointment</button>
                </div>
            </div>

        </div>
    );
};

export default DoctorDashboard;