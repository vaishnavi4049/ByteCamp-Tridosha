import { useState, useEffect } from 'react';
import { Activity, Calendar, Clock, TrendingUp, AlertTriangle, CheckCircle, PieChart as PieChartIcon, BarChart3 } from 'lucide-react';
import { modelService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

const UserHistory = () => {
  const { user } = useAuth();
  const currentUserId = user?.email || 'Anonymous';
  
  const [history, setHistory] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const historyData = await modelService.getHistory(currentUserId);
        const analyticsData = await modelService.getAnalytics(currentUserId);
        
        setHistory(historyData);
        setAnalytics(analyticsData);
      } catch (err) {
        console.error("Failed to fetch history data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUserId]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <Activity size={48} className="animate-pulse" style={{ color: 'var(--color-healthcare-main)' }} />
      </div>
    );
  }

  // Format data for Recharts PieChart (SAFE vs WARNING)
  const pieData = analytics ? [
    { name: 'SAFE', value: analytics.statusCounts.SAFE || 0 },
    { name: 'WARNING', value: analytics.statusCounts.WARNING || 0 }
  ] : [];
  
  const COLORS = ['#10b981', '#f59e0b']; // Success Green and Warning Amber

  // Format data for Disease Distribution Bar Chart
  const barData = analytics ? Object.keys(analytics.diseaseDistribution).map(key => ({
    name: key,
    count: analytics.diseaseDistribution[key]
  })) : [];

  return (
    <div style={{ minHeight: '100vh', width: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div className="bg-grid"></div>

      {/* Background glow effects */}
      <div style={{
        position: 'absolute', top: '10%', right: '10%', width: '40vw', height: '40vw',
        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.05) 0%, transparent 60%)',
        borderRadius: '50%', zIndex: -1, pointerEvents: 'none'
      }}></div>

      <div style={{
        position: 'absolute', bottom: '10%', left: '5%', width: '50vw', height: '50vw',
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.05) 0%, transparent 60%)',
        borderRadius: '50%', zIndex: -1, pointerEvents: 'none'
      }}></div>

      <div style={{ padding: '2rem 5%', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
        <div style={{ marginBottom: '2.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', paddingBottom: '1.5rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'white', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', letterSpacing: '-0.02em' }}>
            <Calendar className="pulse-glow" color="var(--accent-color)" size={32} style={{ borderRadius: '50%' }} />
            History & Analytics
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Track your AI chronotherapy predictions and view aggregated health insights over time.</p>
        </div>

      {history.length === 0 ? (
        <div className="glass-panel" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <PieChartIcon size={48} style={{ color: 'var(--text-muted)', margin: '0 auto 1rem', opacity: 0.5 }} />
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>No History Available</h3>
          <p style={{ color: 'var(--text-muted)' }}>You haven't generated any AI predictions yet. Visit the Dashboard to create one.</p>
        </div>
      ) : (
        <>
          {/* Analytics Overview Cards */}
          <div className="grid-2" style={{ marginBottom: '2rem', gap: '1rem' }}>
             <div className="glass-panel metric-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div className="metric-icon blue"><Activity size={24} /></div>
                <div className="metric-value">{analytics?.totalPredictions || 0}</div>
                <div className="metric-label">Total Predictions Made</div>
             </div>
             <div className="glass-panel metric-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div className="metric-icon teal"><TrendingUp size={24} /></div>
                <div className="metric-value teal">{analytics?.averageImprovement || 0}</div>
                <div className="metric-label">Avg Improvement Score</div>
             </div>
          </div>

          {/* Charts Section */}
          <div className="grid-2" style={{ gap: '1.5rem', marginBottom: '2rem' }}>
            <div className="glass-panel">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <PieChartIcon color="var(--color-healthcare-main)" />
                <h2 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Prediction Safety Ratio</h2>
              </div>
              <div style={{ height: '300px', width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip contentStyle={{ backgroundColor: 'var(--bg-panel)', borderColor: 'var(--border-dark)', color: 'var(--text-main)' }} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="glass-panel">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <BarChart3 color="var(--color-healthcare-main)" />
                <h2 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Conditions Analyzed</h2>
              </div>
              <div style={{ height: '300px', width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border-dark)" />
                    <XAxis dataKey="name" stroke="var(--text-muted)" />
                    <YAxis stroke="var(--text-muted)" allowDecimals={false} />
                    <RechartsTooltip cursor={{fill: 'var(--bg-app)', opacity: 0.4}} contentStyle={{ backgroundColor: 'var(--bg-panel)', borderColor: 'var(--border-dark)', color: 'var(--text-main)' }} />
                    <Bar dataKey="count" fill="var(--color-healthcare-main)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* History Table */}
          <div className="glass-panel">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <Calendar color="var(--color-healthcare-main)" />
              <h2 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Recent Predictions</h2>
            </div>
            
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-dark)', color: 'var(--text-muted)' }}>
                    <th style={{ padding: '1rem', fontWeight: '500' }}>Date</th>
                    <th style={{ padding: '1rem', fontWeight: '500' }}>Condition</th>
                    <th style={{ padding: '1rem', fontWeight: '500' }}>AI Time</th>
                    <th style={{ padding: '1rem', fontWeight: '500' }}>Doctor time</th>
                    <th style={{ padding: '1rem', fontWeight: '500' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((record) => (
                    <tr key={record._id} style={{ borderBottom: '1px solid var(--border-dark)', transition: 'background-color 0.2s ease', ':hover': { backgroundColor: 'rgba(255,255,255,0.02)' } }}>
                      <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>
                        {new Date(record.timestamp).toLocaleDateString()} {new Date(record.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </td>
                      <td style={{ padding: '1rem', fontWeight: '500' }}>{record.disease_condition}</td>
                      <td style={{ padding: '1rem' }}><span style={{ color: 'var(--color-healthcare-teal)', fontWeight: '600' }}>{record.ai_recommended_time}:00</span></td>
                      <td style={{ padding: '1rem' }}>{record.doctor_recommended_time}:00</td>
                      <td style={{ padding: '1rem' }}>
                        {record.status === 'SAFE' ? (
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', color: 'var(--color-success)', fontSize: '0.875rem', backgroundColor: 'rgba(16, 185, 129, 0.1)', padding: '0.25rem 0.5rem', borderRadius: '1rem' }}>
                            <CheckCircle size={14} /> Safe
                          </span>
                        ) : (
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', color: 'var(--color-error)', fontSize: '0.875rem', backgroundColor: 'rgba(245, 158, 11, 0.1)', padding: '0.25rem 0.5rem', borderRadius: '1rem' }}>
                            <AlertTriangle size={14} /> Warning
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
      </div>
    </div>
  );
};

export default UserHistory;
