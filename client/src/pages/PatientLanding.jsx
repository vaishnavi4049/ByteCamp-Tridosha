import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Activity, Brain, History, User, HeartPulse, Clock, PlayCircle } from 'lucide-react';

const PatientLanding = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', width: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div className="bg-grid"></div>

      {/* Navigation Bar */}
      <nav style={{
        padding: '1.25rem 5%',
        background: 'rgba(3, 7, 18, 0.7)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        position: 'sticky', top: 0, zIndex: 50
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }} onClick={() => navigate('/patient-landing')}>
          <div className="pulse-glow" style={{
            background: 'rgba(16, 185, 129, 0.1)',
            padding: '8px',
            borderRadius: '12px',
            border: '1px solid rgba(16, 185, 129, 0.2)'
          }}>
            <Activity color="var(--accent-color)" size={24} />
          </div>
          <span style={{ fontWeight: '800', fontSize: '1.5rem', letterSpacing: '-0.02em', color: 'white' }}>
            Chrono<span style={{ color: 'var(--accent-color)' }}>Med</span>
          </span>
        </div>

        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
            <User size={18} />
            <span style={{ fontWeight: '500' }}>{user?.name || 'Patient'}</span>
          </div>

          <button
            onClick={async () => {
              try {
                await logout();
                window.location.href = "/";
              } catch (err) {
                console.error("Logout failed", err);
              }
            }}
            style={{
              color: 'white',
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.2)',
              padding: '8px 16px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.95rem',
              fontWeight: '500',
              transition: 'all 0.2s',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '3rem 5%', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        
        {/* Welcome Section */}
        <div style={{ marginBottom: '3rem' }} className="animate-fade-in">
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'white', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
            Welcome back, <span className="text-gradient-light">{user?.name?.split(' ')[0] || 'Patient'}</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
            Manage your chronotherapy schedule and view your personalized health insights.
          </p>
        </div>

        {/* Dashboard Grid Options */}
        <div className="grid-3 animate-fade-in delay-100">
          
          {/* Card 1: Check Time Slot */}
          <Link to="/generate-schedule" style={{ textDecoration: 'none' }}>
            <div className="glass-panel" style={{
              padding: '2rem', height: '100%',
              display: 'flex', flexDirection: 'column', 
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              background: 'linear-gradient(145deg, rgba(30, 41, 59, 0.6) 0%, rgba(15, 23, 42, 0.6) 100%)',
              border: '1px solid rgba(16, 185, 129, 0.2)',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px)';
              e.currentTarget.style.background = 'rgba(30, 41, 59, 0.9)';
              e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 0 20px rgba(16, 185, 129, 0.1)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.background = 'linear-gradient(145deg, rgba(30, 41, 59, 0.6) 0%, rgba(15, 23, 42, 0.6) 100%)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.2)';
            }}
            >
              <div style={{
                width: '64px', height: '64px', borderRadius: '16px',
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(16, 185, 129, 0.05) 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '1.5rem', border: '1px solid rgba(16, 185, 129, 0.3)'
              }}>
                <Clock color="#10b981" size={32} />
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'white', marginBottom: '1rem' }}>Generate Schedule</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '0.95rem', flex: 1 }}>
                Enter your physical parameters to calculate your personalized AI-recommended medication window.
              </p>
              
              <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10b981', fontWeight: '600' }}>
                Check Time Slot <PlayCircle size={18} />
              </div>
            </div>
          </Link>

          {/* Card 2: AI Insights */}
          <Link to="/ai-insights" style={{ textDecoration: 'none' }}>
            <div className="glass-panel" style={{
              padding: '2rem', height: '100%',
              display: 'flex', flexDirection: 'column', 
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              background: 'linear-gradient(145deg, rgba(30, 41, 59, 0.6) 0%, rgba(15, 23, 42, 0.6) 100%)',
              border: '1px solid rgba(59, 130, 246, 0.2)',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px)';
              e.currentTarget.style.background = 'rgba(30, 41, 59, 0.9)';
              e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 0 20px rgba(59, 130, 246, 0.1)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.background = 'linear-gradient(145deg, rgba(30, 41, 59, 0.6) 0%, rgba(15, 23, 42, 0.6) 100%)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.2)';
            }}
            >
              <div style={{
                width: '64px', height: '64px', borderRadius: '16px',
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(59, 130, 246, 0.05) 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '1.5rem', border: '1px solid rgba(59, 130, 246, 0.3)'
              }}>
                <Brain color="#3b82f6" size={32} />
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'white', marginBottom: '1rem' }}>AI Insights</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '0.95rem', flex: 1 }}>
                Deep dive visualizer for your chronobiological rhythms and health metric radar maps.
              </p>
              
              <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#3b82f6', fontWeight: '600' }}>
                View Analytics <PlayCircle size={18} />
              </div>
            </div>
          </Link>

          {/* Card 3: User History */}
          <Link to="/history" style={{ textDecoration: 'none' }}>
            <div className="glass-panel" style={{
              padding: '2rem', height: '100%',
              display: 'flex', flexDirection: 'column', 
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              background: 'linear-gradient(145deg, rgba(30, 41, 59, 0.6) 0%, rgba(15, 23, 42, 0.6) 100%)',
              border: '1px solid rgba(245, 158, 11, 0.2)',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px)';
              e.currentTarget.style.background = 'rgba(30, 41, 59, 0.9)';
              e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 0 20px rgba(245, 158, 11, 0.1)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.background = 'linear-gradient(145deg, rgba(30, 41, 59, 0.6) 0%, rgba(15, 23, 42, 0.6) 100%)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.2)';
            }}
            >
              <div style={{
                width: '64px', height: '64px', borderRadius: '16px',
                background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(245, 158, 11, 0.05) 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '1.5rem', border: '1px solid rgba(245, 158, 11, 0.3)'
              }}>
                <History color="#f59e0b" size={32} />
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'white', marginBottom: '1rem' }}>Prediction History</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '0.95rem', flex: 1 }}>
                View your previous AI schedule generations and track changes in your optimal therapy timing.
              </p>
              
              <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#f59e0b', fontWeight: '600' }}>
                Review Logs <PlayCircle size={18} />
              </div>
            </div>
          </Link>

        </div>
        
        {/* Supplementary Section */}
        <div className="glass-panel animate-fade-in delay-200" style={{ 
          marginTop: '3rem', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '1.5rem',
          background: 'rgba(15, 23, 42, 0.8)'
        }}>
          <div style={{
            minWidth: '48px', height: '48px', borderRadius: '50%',
            background: 'var(--color-healthcare-light)', display: 'flex',
            alignItems: 'center', justifyContent: 'center'
          }}>
            <HeartPulse color="var(--color-success)" size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'white', marginBottom: '0.25rem' }}>System Health check</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>ChronoMed biological predictive engine is online and fully synchronized with standard doctor guidelines.</p>
          </div>
        </div>
      </main>

    </div>
  );
};

export default PatientLanding;
