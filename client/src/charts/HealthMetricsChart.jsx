import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

const HealthMetricsChart = ({ patientData }) => {
  const data = [
    { subject: 'Heart Rate', A: Math.min(100, (patientData?.heart_rate || 72) / 1.5), fullMark: 100 },
    { subject: 'Stress', A: (patientData?.stress || 3) * 10, fullMark: 100 },
    { subject: 'Glucose', A: Math.min(100, (patientData?.glucose || 100) / 2), fullMark: 100 },
    { subject: 'Cholesterol', A: Math.min(100, (patientData?.cholesterol || 150) / 3), fullMark: 100 },
    { subject: 'Sleep', A: Math.min(100, (patientData?.sleep_duration || 8) * 10), fullMark: 100 },
  ];

  return (
    <div className="glass-panel" style={{ height: '320px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem', width: '100%', textAlign: 'left' }}>Vitals Radar</h3>
      <div style={{ flex: 1, width: '100%', minHeight: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid stroke="rgba(255,255,255,0.1)" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} 
              itemStyle={{ color: '#8b5cf6' }}
            />
            <Radar name="Patient" dataKey="A" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.4} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default HealthMetricsChart;
