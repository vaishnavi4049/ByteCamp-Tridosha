import { Outlet, Link, useLocation } from 'react-router-dom';
import { Activity, Clock, ShieldAlert, LayoutDashboard, Brain, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();

  const navItems = [
    { name: 'Patient Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'History & Analytics', path: '/history', icon: Activity },
    { name: 'AI Insights', path: '/insights', icon: Brain },
    { name: 'Doctor Panel', path: '/doctor', icon: ShieldAlert },
    { name: 'Doctor Setup', path: '/doctor/settings', icon: Settings },
  ];

  return (
    <div style={{
      width: '250px',
      backgroundColor: 'var(--bg-panel)',
      borderRight: '1px solid var(--border-dark)',
      height: '100vh',
      position: 'sticky',
      top: 0,
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{
        padding: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        borderBottom: '1px solid var(--border-dark)'
      }}>
        <div style={{
          padding: '0.5rem',
          backgroundColor: 'var(--color-healthcare-light)',
          borderRadius: '0.5rem',
          color: 'var(--color-healthcare-main)'
        }}>
          <Activity size={24} />
        </div>
        <h1 style={{
          fontSize: '1.25rem',
          fontWeight: '700',
          color: 'var(--color-healthcare-main)',
          margin: 0
        }}>
          ChronoMed
        </h1>
      </div>

      <nav style={{
        flex: 1,
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem'
      }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                borderRadius: '0.75rem',
                textDecoration: 'none',
                transition: 'all 0.3s',
                backgroundColor: isActive ? 'var(--color-healthcare-light)' : 'transparent',
                color: isActive ? 'var(--color-healthcare-main)' : 'var(--text-muted)',
                fontWeight: isActive ? '600' : '400'
              }}
              onMouseOver={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
                  e.currentTarget.style.color = 'var(--text-main)';
                }
              }}
              onMouseOut={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--text-muted)';
                }
              }}
            >
              <Icon size={20} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div style={{
        padding: '1rem',
        borderTop: '1px solid var(--border-dark)'
      }}>
        <button 
          onClick={logout}
          className="btn-outline-danger"
          style={{ border: 'none' }}
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
