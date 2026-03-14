import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const ImprovementGauge = ({ score }) => {
  const normalizedScore = score ? (score / 10) * 100 : 0;
  const data = [
    { name: 'Score', value: normalizedScore },
    { name: 'Remaining', value: 100 - normalizedScore },
  ];

  const COLORS = ['var(--color-success)', 'rgba(255,255,255,0.05)'];

  return (
    <div style={{ height: '192px', width: '100%', position: 'relative' }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="100%"
            startAngle={180}
            endAngle={0}
            innerRadius="75%"
            outerRadius="100%"
            paddingAngle={0}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', textAlign: 'center', paddingBottom: '0.5rem' }}>
        <span style={{ fontSize: '1.875rem', fontWeight: '700', color: 'var(--color-success)' }}>{score ? score.toFixed(1) : '--'}</span>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginLeft: '0.25rem' }}>/ 10</span>
      </div>
    </div>
  );
};

export default ImprovementGauge;
