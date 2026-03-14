import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const data = Array.from({ length: 24 }, (_, i) => {
  const effectiveness = 50 + 40 * Math.sin((i - 10) * Math.PI / 12) + Math.random() * 5;
  return {
    hour: `${i}:00`,
    score: i,
    effectiveness: Math.max(0, Math.min(100, effectiveness))
  }
});

const CircadianChart = ({ aiTime, doctorTime }) => {
  return (
    <div className="glass-panel" style={{ height: '320px', width: '100%', display: 'flex', flexDirection: 'column' }}>
      <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-healthcare-main)' }} />
        Circadian Rhythm Drug Effectiveness
      </h3>
      <div style={{ flex: 1, minHeight: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
            <XAxis dataKey="hour" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `${val}%`} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
              itemStyle={{ color: 'var(--color-healthcare-main)' }}
            />
            <Line 
              type="monotone" 
              dataKey="effectiveness" 
              stroke="var(--color-healthcare-main)" 
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, fill: 'var(--color-healthcare-main)', stroke: 'var(--bg-dark)', strokeWidth: 2 }}
            />
            {aiTime !== undefined && (
              <ReferenceLine x={`${aiTime}:00`} stroke="#3b82f6" strokeDasharray="3 3" label={{ position: 'top', value: 'AI Rec', fill: '#3b82f6', fontSize: 12 }} />
            )}
            {doctorTime !== undefined && (
              <ReferenceLine x={`${doctorTime}:00`} stroke="var(--color-warning)" strokeDasharray="3 3" label={{ position: 'top', value: 'Dr. Rec', fill: 'var(--color-warning)', fontSize: 12 }} />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CircadianChart;
