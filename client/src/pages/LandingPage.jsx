import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Users, Activity, Clock, CheckCircle2, TrendingUp, TrendingDown,
  Calendar, Pill, Moon, Sun, Zap, ArrowUpRight, MoreHorizontal,
  HeartPulse, AlertTriangle, Shield, ChevronRight
} from 'lucide-react';

// ─── Mini Sparkline component ─────────────────────────────────────────────────
const Sparkline = ({ data, color = '#10b981', width = 80, height = 32 }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');
  return (
    <svg width={width} height={height} style={{ overflow: 'visible' }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={pts.split(' ').pop().split(',')[0]} cy={pts.split(' ').pop().split(',')[1]} r="3" fill={color} />
    </svg>
  );
};

// ─── Circadian Clock Ring ─────────────────────────────────────────────────────
const CircadianRing = () => {
  const hour = new Date().getHours();
  const progress = ((hour % 24) / 24) * 360;
  const r = 44;
  const circ = 2 * Math.PI * r;
  const dash = (progress / 360) * circ;

  return (
    <div style={{ position: 'relative', width: 120, height: 120 }}>
      <svg width="120" height="120" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="60" cy="60" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
        <circle
          cx="60" cy="60" r={r} fill="none"
          stroke="url(#clockGrad)" strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circ}`}
        />
        <defs>
          <linearGradient id="clockGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
      </svg>
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
      }}>
        {hour >= 6 && hour < 18
          ? <Sun size={18} color="#f59e0b" />
          : <Moon size={18} color="#818cf8" />}
        <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: 2 }}>
          {`${hour}:${String(new Date().getMinutes()).padStart(2, '0')}`}
        </span>
      </div>
    </div>
  );
};

// ─── Stat Card ────────────────────────────────────────────────────────────────
const StatCard = ({ title, value, icon, trend, trendUp, sparkData, accentColor = '#10b981' }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered
          ? 'rgba(30, 41, 59, 0.9)'
          : 'rgba(17, 24, 39, 0.6)',
        border: hovered
          ? `1px solid ${accentColor}33`
          : '1px solid rgba(255,255,255,0.08)',
        borderRadius: 20,
        padding: '1.75rem',
        transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? `0 12px 40px rgba(0,0,0,0.4), 0 0 20px ${accentColor}15` : '0 4px 20px rgba(0,0,0,0.2)',
        backdropFilter: 'blur(20px)',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle gradient overlay */}
      <div style={{
        position: 'absolute', top: 0, right: 0,
        width: '60%', height: '100%',
        background: `radial-gradient(circle at top right, ${accentColor}08 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 500, marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            {title}
          </p>
          <h3 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'white', fontFamily: 'Outfit, sans-serif', letterSpacing: '-0.03em', lineHeight: 1 }}>
            {value}
          </h3>
        </div>
        <div style={{
          width: 48, height: 48,
          background: `${accentColor}15`,
          border: `1px solid ${accentColor}25`,
          borderRadius: 14,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {icon}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          {trendUp !== undefined && (
            trendUp
              ? <TrendingUp size={14} color="#10b981" />
              : <TrendingDown size={14} color="#f43f5e" />
          )}
          <span style={{ fontSize: '0.78rem', color: trendUp ? '#10b981' : trendUp === false ? '#f43f5e' : 'var(--text-secondary)', fontWeight: 500 }}>
            {trend}
          </span>
        </div>
        {sparkData && <Sparkline data={sparkData} color={accentColor} />}
      </div>
    </div>
  );
};

// ─── Activity Item ────────────────────────────────────────────────────────────
const ActivityItem = ({ item, isLast }) => (
  <div style={{
    display: 'flex', alignItems: 'flex-start', gap: '1rem',
    padding: '1rem 1.5rem',
    borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,0.04)',
    transition: 'background 0.2s',
  }}
    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
  >
    <div style={{
      width: 36, height: 36, borderRadius: 10,
      background: `${item.color}15`,
      border: `1px solid ${item.color}25`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0, marginTop: 2,
    }}>
      {item.icon}
    </div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <p style={{ color: 'white', fontWeight: 600, fontSize: '0.88rem', marginBottom: '0.2rem' }}>{item.user}</p>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: 1.5 }}>{item.action}</p>
    </div>
    <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap', flexShrink: 0 }}>{item.time}</span>
  </div>
);

// ─── Medication Window Card ───────────────────────────────────────────────────
const MedWindowCard = ({ drug, window, efficacy, risk }) => (
  <div style={{
    padding: '1rem 1.25rem',
    background: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: 14,
    display: 'flex', alignItems: 'center', gap: '1rem',
  }}>
    <div style={{
      width: 40, height: 40, borderRadius: 10,
      background: 'rgba(16,185,129,0.1)',
      border: '1px solid rgba(16,185,129,0.2)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
    }}>
      <Pill size={18} color="#10b981" />
    </div>
    <div style={{ flex: 1 }}>
      <p style={{ color: 'white', fontWeight: 600, fontSize: '0.85rem' }}>{drug}</p>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', marginTop: 2 }}>Optimal: {window}</p>
    </div>
    <div style={{ textAlign: 'right' }}>
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: '4px',
        padding: '3px 10px', borderRadius: 20,
        background: efficacy > 85 ? 'rgba(16,185,129,0.12)' : 'rgba(245,158,11,0.12)',
        border: `1px solid ${efficacy > 85 ? 'rgba(16,185,129,0.25)' : 'rgba(245,158,11,0.25)'}`,
        fontSize: '0.72rem', fontWeight: 600,
        color: efficacy > 85 ? '#10b981' : '#f59e0b',
      }}>
        {efficacy}% efficacy
      </div>
    </div>
  </div>
);

// ─── Main Dashboard ───────────────────────────────────────────────────────────
const LandingPage = () => {
  const { user } = useAuth();
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const h = new Date().getHours();
    if (h < 12) setGreeting('Good morning');
    else if (h < 17) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  const stats = [
    {
      title: 'Total Patients',
      value: '1,248',
      icon: <Users size={22} color="#10b981" />,
      trend: '+12% this month',
      trendUp: true,
      sparkData: [30, 45, 40, 55, 60, 70, 80, 90, 85, 95],
      accentColor: '#10b981',
    },
    {
      title: 'Active Schedules',
      value: '842',
      icon: <Activity size={22} color="#3b82f6" />,
      trend: '+5% this week',
      trendUp: true,
      sparkData: [60, 55, 65, 70, 68, 75, 78, 80, 82, 85],
      accentColor: '#3b82f6',
    },
    {
      title: 'Pending Reviews',
      value: '38',
      icon: <Clock size={22} color="#f59e0b" />,
      trend: 'Needs attention',
      trendUp: undefined,
      sparkData: [10, 28, 35, 20, 30, 38, 25, 30, 35, 38],
      accentColor: '#f59e0b',
    },
    {
      title: 'Avg. Efficacy Score',
      value: '91.4%',
      icon: <Zap size={22} color="#a855f7" />,
      trend: '+3.2% vs last cycle',
      trendUp: true,
      sparkData: [78, 80, 82, 85, 84, 88, 89, 90, 91, 92],
      accentColor: '#a855f7',
    },
  ];

  const activities = [
    {
      id: 1, user: 'Sarah Jenkins', action: 'Circadian dosing schedule optimized for metoprolol — morning administration recommended.', time: '2h ago',
      icon: <CheckCircle2 size={16} color="#10b981" />, color: '#10b981',
    },
    {
      id: 2, user: 'Michael Chen', action: 'Uploaded new circadian baseline data — 14-day sleep cycle recorded via wearable.', time: '4h ago',
      icon: <Activity size={16} color="#3b82f6" />, color: '#3b82f6',
    },
    {
      id: 3, user: 'Dr. Emily Stone', action: 'Approved revised administration window for warfarin — peak absorption shifted to 21:00.', time: 'Yesterday',
      icon: <Shield size={16} color="#10b981" />, color: '#10b981',
    },
    {
      id: 4, user: "James O'Brien", action: "Alert: Cortisol trough detected at 14:30 — consider adjusting hydrocortisone timing.", time: 'Yesterday',
      icon: <AlertTriangle size={16} color="#f59e0b" />, color: '#f59e0b',
    },
    {
      id: 5, user: 'Dr. Priya Nair', action: 'New patient onboarded — chronotype questionnaire completed, night-owl profile assigned.', time: '2 days ago',
      icon: <Users size={16} color="#a855f7" />, color: '#a855f7',
    },
  ];

  const medWindows = [
    { drug: 'Metoprolol', window: '07:00 – 09:00', efficacy: 93 },
    { drug: 'Warfarin', window: '21:00 – 22:00', efficacy: 88 },
    { drug: 'Hydrocortisone', window: '06:00 – 07:30', efficacy: 96 },
    { drug: 'Atorvastatin', window: '22:00 – 23:00', efficacy: 82 },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

      {/* ── Header ── */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        flexWrap: 'wrap', gap: '1rem',
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }} />
            <span style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Live Monitoring</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 800, color: 'white', fontFamily: 'Outfit, sans-serif', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            {greeting}, {user?.name?.split(' ')[0] || 'Doctor'} 👋
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.4rem', fontSize: '1rem' }}>
            Here's your clinical overview — {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Circadian Clock */}
        <div style={{
          padding: '1rem 1.5rem',
          background: 'rgba(17,24,39,0.6)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 20,
          display: 'flex', alignItems: 'center', gap: '1.25rem',
          backdropFilter: 'blur(20px)',
        }}>
          <CircadianRing />
          <div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Circadian Phase</p>
            <p style={{ color: 'white', fontWeight: 700, fontSize: '1rem', fontFamily: 'Outfit, sans-serif', marginTop: '0.25rem' }}>
              {new Date().getHours() >= 6 && new Date().getHours() < 18 ? 'Active Phase ☀️' : 'Rest Phase 🌙'}
            </p>
            <p style={{ color: '#10b981', fontSize: '0.75rem', marginTop: '0.15rem' }}>Metabolism: Peak efficiency</p>
          </div>
        </div>
      </div>

      {/* ── Stats Grid ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
        {stats.map((s, i) => <StatCard key={i} {...s} />)}
      </div>

      {/* ── Main 2-col content ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '1.5rem', alignItems: 'start' }}>

        {/* Recent Activity */}
        <div style={{
          background: 'rgba(17,24,39,0.6)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 20,
          backdropFilter: 'blur(20px)',
          overflow: 'hidden',
        }}>
          <div style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <div>
              <h2 style={{ color: 'white', fontWeight: 700, fontSize: '1.05rem', fontFamily: 'Outfit, sans-serif' }}>Clinical Activity</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', marginTop: '0.15rem' }}>Real-time patient updates</p>
            </div>
            <button style={{
              display: 'flex', alignItems: 'center', gap: '0.4rem',
              padding: '6px 14px',
              background: 'rgba(16,185,129,0.08)',
              border: '1px solid rgba(16,185,129,0.2)',
              borderRadius: 10,
              color: '#10b981',
              fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer',
            }}>
              View All <ArrowUpRight size={13} />
            </button>
          </div>
          <div>
            {activities.map((item, i) => (
              <ActivityItem key={item.id} item={item} isLast={i === activities.length - 1} />
            ))}
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

          {/* Optimal Med Windows */}
          <div style={{
            background: 'rgba(17,24,39,0.6)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 20,
            backdropFilter: 'blur(20px)',
            overflow: 'hidden',
          }}>
            <div style={{
              padding: '1.25rem 1.5rem',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              display: 'flex', alignItems: 'center', gap: '0.75rem',
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: 9,
                background: 'rgba(16,185,129,0.12)',
                border: '1px solid rgba(16,185,129,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Pill size={16} color="#10b981" />
              </div>
              <div>
                <h2 style={{ color: 'white', fontWeight: 700, fontSize: '1rem', fontFamily: 'Outfit, sans-serif' }}>Today's Med Windows</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>Optimal administration times</p>
              </div>
            </div>
            <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {medWindows.map((m, i) => <MedWindowCard key={i} {...m} />)}
            </div>
          </div>

          {/* Quick Stats Panel */}
          <div style={{
            padding: '1.5rem',
            background: 'linear-gradient(135deg, rgba(16,185,129,0.08) 0%, rgba(17,24,39,0.8) 100%)',
            border: '1px solid rgba(16,185,129,0.15)',
            borderRadius: 20,
            backdropFilter: 'blur(20px)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <HeartPulse size={20} color="#f43f5e" />
              <h3 style={{ color: 'white', fontWeight: 700, fontSize: '0.95rem', fontFamily: 'Outfit, sans-serif' }}>System Health</h3>
            </div>
            {[
              { label: 'AI Model Accuracy', value: '97.3%', color: '#10b981' },
              { label: 'Data Sync Status', value: 'Live', color: '#3b82f6' },
              { label: 'Active Alerts', value: '3', color: '#f59e0b' },
            ].map((r, i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '0.6rem 0',
                borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.04)' : 'none',
              }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.82rem' }}>{r.label}</span>
                <span style={{ color: r.color, fontWeight: 700, fontSize: '0.85rem', fontFamily: 'Outfit, sans-serif' }}>{r.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom: Upcoming Schedule ── */}
      <div style={{
        background: 'rgba(17,24,39,0.6)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 20,
        backdropFilter: 'blur(20px)',
        overflow: 'hidden',
      }}>
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Calendar size={18} color="#3b82f6" />
            <h2 style={{ color: 'white', fontWeight: 700, fontSize: '1.05rem', fontFamily: 'Outfit, sans-serif' }}>Upcoming Reviews</h2>
          </div>
          <button style={{
            padding: '6px 14px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 10,
            color: 'var(--text-secondary)',
            fontSize: '0.78rem', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '0.4rem',
          }}>
            Schedule <ChevronRight size={13} />
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', padding: '1rem', gap: '0.75rem' }}>
          {[
            { patient: 'Sarah Jenkins', type: 'Dosing Review', time: 'Today, 2:00 PM', status: 'Upcoming' },
            { patient: 'Michael Chen', type: 'Baseline Assessment', time: 'Today, 4:30 PM', status: 'Urgent' },
            { patient: 'James O\'Brien', type: 'Cortisol Analysis', time: 'Tomorrow, 10:00 AM', status: 'Scheduled' },
            { patient: 'Dr. Priya Nair', type: 'New Patient Review', time: 'Tomorrow, 2:00 PM', status: 'Scheduled' },
          ].map((appt, i) => (
            <div key={i} style={{
              padding: '1rem 1.25rem',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: 14,
              display: 'flex', flexDirection: 'column', gap: '0.4rem',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p style={{ color: 'white', fontWeight: 600, fontSize: '0.85rem' }}>{appt.patient}</p>
                <span style={{
                  fontSize: '0.68rem', fontWeight: 600,
                  padding: '2px 8px', borderRadius: 20,
                  background: appt.status === 'Urgent' ? 'rgba(244,63,94,0.12)' : appt.status === 'Upcoming' ? 'rgba(16,185,129,0.12)' : 'rgba(59,130,246,0.12)',
                  color: appt.status === 'Urgent' ? '#f43f5e' : appt.status === 'Upcoming' ? '#10b981' : '#3b82f6',
                  border: `1px solid ${appt.status === 'Urgent' ? 'rgba(244,63,94,0.25)' : appt.status === 'Upcoming' ? 'rgba(16,185,129,0.25)' : 'rgba(59,130,246,0.25)'}`,
                }}>
                  {appt.status}
                </span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.78rem' }}>{appt.type}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.25rem' }}>
                <Clock size={12} color="var(--text-secondary)" />
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>{appt.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
