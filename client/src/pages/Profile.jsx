import React, { useState } from 'react';

const iconColor = {
  green: '#10b981',
  blue: '#3b82f6',
  purple: '#a855f7',
  amber: '#f59e0b',
  red: '#ef4444',
  indigo: '#818cf8',
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&family=DM+Serif+Display:ital@0;1&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --green: #10b981;
    --green-dim: rgba(16,185,129,0.08);
    --green-border: rgba(16,185,129,0.18);
    --blue: #3b82f6;
    --blue-dim: rgba(59,130,246,0.08);
    --purple: #a855f7;
    --purple-dim: rgba(168,85,247,0.08);
    --amber: #f59e0b;
    --amber-dim: rgba(245,158,11,0.08);
    --red: #ef4444;
    --indigo: #818cf8;
    --indigo-dim: rgba(129,140,248,0.08);
    --surface: rgba(255,255,255,0.03);
    --surface-hover: rgba(255,255,255,0.05);
    --border: rgba(255,255,255,0.07);
    --border-light: rgba(255,255,255,0.04);
    --text: #f1f5f9;
    --muted: #64748b;
    --muted-light: #94a3b8;
    --sans: 'DM Sans', sans-serif;
    --serif: 'DM Serif Display', serif;
  }

  body {
    background: #060b14;
    font-family: var(--sans);
    color: var(--text);
    -webkit-font-smoothing: antialiased;
  }

  .profile-root {
    max-width: 880px;
    margin: 0 auto;
    padding: 2.5rem 1.5rem 4rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  /* ─── Page header ─── */
  .page-header { display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 1rem; }
  .page-title { font-family: var(--serif); font-size: 2.2rem; font-weight: 400; color: var(--text); letter-spacing: -0.02em; line-height: 1.1; }
  .page-subtitle { color: var(--muted); font-size: 0.875rem; margin-top: 0.35rem; font-weight: 400; }

  .toast {
    display: flex; align-items: center; gap: 0.5rem;
    padding: 7px 14px;
    background: rgba(16,185,129,0.1);
    border: 1px solid var(--green-border);
    border-radius: 8px;
    color: var(--green);
    font-size: 0.8rem; font-weight: 500;
    animation: fadeSlide 0.3s ease;
  }
  @keyframes fadeSlide { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }

  /* ─── Hero card ─── */
  .hero-card {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 1.75rem;
    padding: 2rem 2.25rem;
    background: linear-gradient(135deg, rgba(16,185,129,0.05) 0%, rgba(6,11,20,0) 50%);
    border: 1px solid var(--green-border);
    border-radius: 20px;
  }
  @media (max-width: 640px) { .hero-card { grid-template-columns: 1fr; text-align: center; } }

  .avatar-wrap { position: relative; flex-shrink: 0; }
  .avatar-ring {
    width: 88px; height: 88px; border-radius: 50%;
    border: 1.5px solid var(--green-border);
    background: rgba(16,185,129,0.07);
    display: flex; align-items: center; justify-content: center;
    position: relative; overflow: hidden; cursor: pointer;
    transition: border-color 0.2s;
  }
  .avatar-ring:hover { border-color: rgba(16,185,129,0.4); }
  .avatar-ring:hover .cam-layer { opacity: 1; }
  .cam-layer {
    position: absolute; inset: 0; border-radius: 50%;
    background: rgba(0,0,0,0.55);
    display: flex; align-items: center; justify-content: center;
    opacity: 0; transition: opacity 0.2s;
  }
  .dot-online {
    position: absolute; bottom: 3px; right: 3px;
    width: 13px; height: 13px; border-radius: 50%;
    background: var(--green);
    border: 2px solid #060b14;
  }

  .hero-info .name { font-family: var(--serif); font-size: 1.5rem; font-weight: 400; margin-bottom: 0.3rem; color: var(--text); }
  .hero-info .role { font-size: 0.83rem; color: var(--muted-light); margin-bottom: 0.5rem; }
  .hero-info .location { display: flex; align-items: center; gap: 0.3rem; color: var(--muted); font-size: 0.78rem; }

  .hero-right { display: flex; flex-direction: column; align-items: flex-end; gap: 0.75rem; }
  .hero-quote {
    font-size: 0.8rem; color: var(--muted); line-height: 1.6;
    font-style: italic; max-width: 260px; text-align: right;
    border-right: 2px solid var(--green-border);
    padding-right: 0.75rem;
  }

  .btn-edit {
    display: inline-flex; align-items: center; gap: 0.4rem;
    padding: 7px 15px;
    border-radius: 9px;
    font-family: var(--sans); font-size: 0.78rem; font-weight: 500;
    cursor: pointer; transition: all 0.2s; border: 1px solid;
  }
  .btn-edit.on  { background: rgba(244,63,94,0.07); border-color: rgba(244,63,94,0.2); color: #f43f5e; }
  .btn-edit.off { background: var(--green-dim); border-color: var(--green-border); color: var(--green); }
  .btn-edit:hover { opacity: 0.8; }

  /* ─── Chronotype badge ─── */
  .chrono-badge {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 4px 11px;
    border-radius: 20px;
    font-size: 0.73rem; font-weight: 500;
  }

  /* ─── Divider ─── */
  .divider { height: 1px; background: var(--border); border: none; }

  /* ─── Section card ─── */
  .section {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 18px;
    overflow: hidden;
  }
  .section-head {
    display: flex; align-items: center; justify-content: space-between;
    padding: 1.1rem 1.6rem;
    border-bottom: 1px solid var(--border-light);
  }
  .section-head-left { display: flex; align-items: center; gap: 0.65rem; }
  .section-icon {
    width: 30px; height: 30px; border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .section-title { font-size: 0.88rem; font-weight: 600; color: var(--text); letter-spacing: 0.01em; }
  .section-body { padding: 1.6rem; }

  /* ─── Stats row ─── */
  .stats-row { display: flex; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 1.5rem; }
  .stat-chip {
    flex: 1; min-width: 90px;
    display: flex; flex-direction: column; align-items: center; gap: 0.35rem;
    padding: 1rem 0.75rem;
    border-radius: 12px;
    border: 1px solid;
    text-align: center;
  }
  .stat-chip .sv { font-size: 1rem; font-weight: 600; color: var(--text); }
  .stat-chip .sl { font-size: 0.68rem; color: var(--muted); line-height: 1.35; }

  /* ─── Biorhythm bar ─── */
  .bio-label { font-size: 0.75rem; color: var(--muted); margin-bottom: 0.6rem; letter-spacing: 0.04em; text-transform: uppercase; }
  .bio-bar {
    display: flex; border-radius: 10px; overflow: hidden;
    height: 44px;
    border: 1px solid var(--border);
    position: relative;
  }
  .bio-seg {
    display: flex; align-items: center; justify-content: center;
    font-size: 0.6rem; font-weight: 600;
  }
  .bio-now {
    position: absolute; top: 0; width: 2px; height: 100%;
    background: rgba(255,255,255,0.7);
    box-shadow: 0 0 6px rgba(255,255,255,0.4);
  }

  /* ─── Form fields ─── */
  .field-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem; margin-bottom: 1.25rem; }
  .field { display: flex; flex-direction: column; gap: 0.4rem; }
  .field label { font-size: 0.73rem; color: var(--muted); font-weight: 500; letter-spacing: 0.03em; }
  .field-inner { position: relative; }
  .field-inner svg { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); pointer-events: none; }
  .field input, .field textarea {
    width: 100%; padding: 10px 12px 10px 38px;
    border-radius: 10px;
    font-family: var(--sans); font-size: 0.85rem;
    outline: none; transition: all 0.2s;
  }
  .field textarea { padding-left: 12px; resize: vertical; }
  .field input[data-ro="true"], .field textarea[data-ro="true"] {
    background: rgba(255,255,255,0.01);
    border: 1px solid var(--border-light);
    color: var(--muted);
    cursor: default;
  }
  .field input[data-ro="false"], .field textarea[data-ro="false"] {
    background: rgba(255,255,255,0.04);
    border: 1px solid var(--border);
    color: var(--text);
  }
  .field input[data-ro="false"]:focus, .field textarea[data-ro="false"]:focus {
    border-color: var(--green-border);
    box-shadow: 0 0 0 3px rgba(16,185,129,0.07);
  }

  /* ─── Action row ─── */
  .action-row { display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 0.5rem; }
  .btn { padding: 9px 22px; border-radius: 10px; font-family: var(--sans); font-size: 0.83rem; font-weight: 500; cursor: pointer; transition: all 0.2s; display: inline-flex; align-items: center; gap: 0.4rem; }
  .btn-ghost { background: transparent; border: 1px solid var(--border); color: var(--muted); }
  .btn-ghost:hover { background: var(--surface-hover); color: var(--text); }
  .btn-primary { background: var(--green); border: 1px solid transparent; color: #fff; font-weight: 600; }
  .btn-primary:hover { opacity: 0.88; }
  .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }

  /* ─── Med items ─── */
  .med-list { display: flex; flex-direction: column; gap: 0.6rem; }
  .med-item {
    display: flex; align-items: center; gap: 1rem;
    padding: 0.9rem 1.1rem;
    background: rgba(255,255,255,0.015);
    border: 1px solid var(--border-light);
    border-radius: 12px;
    transition: background 0.2s;
  }
  .med-item:hover { background: var(--surface-hover); }
  .med-icon { width: 34px; height: 34px; border-radius: 9px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .med-info { flex: 1; }
  .med-name { font-size: 0.84rem; font-weight: 500; color: var(--text); margin-bottom: 0.2rem; }
  .med-sub { font-size: 0.73rem; color: var(--muted); line-height: 1.45; }
  .badge { padding: 3px 10px; border-radius: 20px; font-size: 0.68rem; font-weight: 600; flex-shrink: 0; }

  /* ─── Danger zone ─── */
  .danger-zone {
    display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;
    padding: 1.25rem 1.6rem;
    background: rgba(239,68,68,0.03);
    border: 1px solid rgba(239,68,68,0.12);
    border-radius: 16px;
  }
  .danger-left { display: flex; align-items: center; gap: 0.75rem; }
  .danger-label { font-size: 0.85rem; font-weight: 500; color: var(--text); }
  .danger-sub { font-size: 0.76rem; color: var(--muted); margin-top: 0.1rem; }
  .btn-danger { padding: 7px 18px; border-radius: 9px; background: transparent; border: 1px solid rgba(239,68,68,0.25); color: var(--red); font-family: var(--sans); font-size: 0.78rem; font-weight: 500; cursor: pointer; transition: all 0.2s; }
  .btn-danger:hover { background: rgba(239,68,68,0.08); }

  @keyframes spin { to { transform: rotate(360deg); } }
  .spin { animation: spin 0.8s linear infinite; }
`;

// ── Tiny SVG icons (inline, no deps) ──────────────────────────────────────────
const Icon = ({ name, size = 16, color = 'currentColor' }) => {
  const d = {
    user: 'M12 11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-3.34 0-10 1.68-10 5v2h20v-2c0-3.32-6.66-5-10-5z',
    mail: 'M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z',
    phone: 'M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z',
    map: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
    pill: 'M4.22 11.29l6.36-6.36a4.5 4.5 0 0 1 6.36 6.36l-6.36 6.36a4.5 4.5 0 0 1-6.36-6.36zm1.41 1.41a2.5 2.5 0 0 0 3.54 3.54l1.06-1.06-3.54-3.54-1.06 1.06zm2.12-2.12 3.54 3.54 2.83-2.83a2.5 2.5 0 0 0-3.54-3.54L7.75 10.58z',
    shield: 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z',
    activity: 'M22 12h-4l-3 9L9 3l-3 9H2',
    clock: 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z',
    award: 'M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z',
    trend: 'M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z',
    heart: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z',
    alert: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z',
    edit: 'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z',
    x: 'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z',
    save: 'M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z',
    cam: 'M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.65 0-3 1.35-3 3s1.35 3 3 3 3-1.35 3-3-1.35-3-3-3z',
    plus: 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z',
    spin: 'M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z',
  };
  const paths = d[name] || '';
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={name === 'activity' ? 'none' : color} stroke={name === 'activity' ? color : 'none'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {name === 'activity' ? <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /> : <path d={paths} />}
    </svg>
  );
};

const chronoConfig = {
  'Morning Lark': { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.2)', dot: '🌅' },
  'Night Owl': { color: '#818cf8', bg: 'rgba(129,140,248,0.1)', border: 'rgba(129,140,248,0.2)', dot: '🦉' },
  'Intermediate': { color: '#10b981', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.2)', dot: '☀️' },
};

const Field = ({ label, iconName, type = 'text', value, placeholder, readOnly, onChange }) => (
  <div className="field">
    <label>{label}</label>
    <div className="field-inner">
      {iconName && <Icon name={iconName} size={14} color="#475569" />}
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        readOnly={readOnly}
        data-ro={String(readOnly)}
        onChange={onChange}
        style={{ paddingLeft: iconName ? 38 : 12 }}
      />
    </div>
  </div>
);

export default function Profile() {
  const [editMode, setEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: 'Dr. Jane Doe',
    email: 'jane.doe@hospital.com',
    phone: '+1 (555) 024-8673',
    location: 'Boston, MA — Mass General Hospital',
    specialty: 'Chronobiology & Internal Medicine',
    licenseNo: 'MD-20234-BOS',
    bio: 'Board-certified internist with 8+ years specializing in circadian medicine. Pioneer of AI-assisted chronotherapy for hypertension and metabolic disorders.',
    chronotype: 'Morning Lark',
  });

  const up = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSave = e => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaved(true);
      setEditMode(false);
      setTimeout(() => setSaved(false), 3000);
    }, 1100);
  };

  const chrono = chronoConfig[form.chronotype] || chronoConfig['Intermediate'];
  const nowPct = (new Date().getHours() / 24) * 100;

  const meds = [
    { name: 'Metoprolol Succinate 50mg', schedule: 'Morning · 07:00', notes: 'Take with food. Circadian optimization active.', status: 'Optimized' },
    { name: 'Warfarin 5mg', schedule: 'Evening · 21:00', notes: 'INR monitoring weekly. Night dosing confirmed by AI.', status: 'Optimized' },
    { name: 'Vitamin D3 2000IU', schedule: 'Morning · 08:00', notes: 'Fat-soluble — take with breakfast for absorption.', status: 'Pending' },
  ];

  return (
    <>
      <style>{css}</style>
      <div className="profile-root">

        {/* Header */}
        <div className="page-header">
          <div>
            <h1 className="page-title">Profile</h1>
            <p className="page-subtitle">Manage your identity and chronobiological baseline.</p>
          </div>
          {saved && <div className="toast"><Icon name="save" size={13} color="#10b981" /> Saved successfully</div>}
        </div>

        {/* Hero */}
        <div className="hero-card">
          <div className="avatar-wrap">
            <div className="avatar-ring">
              <Icon name="user" size={38} color="#10b981" />
              <div className="cam-layer"><Icon name="cam" size={20} color="white" /></div>
            </div>
            <div className="dot-online" />
          </div>

          <div className="hero-info">
            <div className="name">{form.name}</div>
            <div className="role">{form.specialty}</div>
            <div className="location">
              <Icon name="map" size={12} color="#475569" />
              <span>{form.location}</span>
            </div>
            <div style={{ marginTop: '0.75rem' }}>
              <span className="chrono-badge" style={{ background: chrono.bg, border: `1px solid ${chrono.border}`, color: chrono.color }}>
                {chrono.dot}&nbsp;{form.chronotype}
              </span>
            </div>
          </div>

          <div className="hero-right">
            <p className="hero-quote">"{form.bio.slice(0, 90)}…"</p>
            <button
              className={`btn-edit ${editMode ? 'on' : 'off'}`}
              onClick={() => setEditMode(v => !v)}
            >
              <Icon name={editMode ? 'x' : 'edit'} size={13} color={editMode ? '#f43f5e' : '#10b981'} />
              {editMode ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>
        </div>

        {/* Chronobiological Baseline */}
        <div className="section">
          <div className="section-head">
            <div className="section-head-left">
              <div className="section-icon" style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.15)' }}>
                <Icon name="activity" size={15} color="#3b82f6" />
              </div>
              <span className="section-title">Chronobiological Baseline</span>
            </div>
            <span style={{ fontSize: '0.7rem', padding: '3px 10px', borderRadius: 20, background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.15)', color: '#3b82f6', fontWeight: 600 }}>AI-Analyzed</span>
          </div>
          <div className="section-body">
            <div className="stats-row">
              {[
                { l: 'Avg. Sleep', v: '7.2 h', icon: 'clock', c: '#3b82f6' },
                { l: 'Sleep Score', v: '88 / 100', icon: 'award', c: '#10b981' },
                { l: 'Peak Alertness', v: '08:00–14:00', icon: 'trend', c: '#a855f7' },
                { l: 'Chronotype', v: form.chronotype, icon: 'heart', c: '#f59e0b' },
              ].map(({ l, v, icon, c }) => (
                <div key={l} className="stat-chip" style={{ background: `${c}06`, borderColor: `${c}18` }}>
                  <Icon name={icon} size={16} color={c} />
                  <span className="sv">{v}</span>
                  <span className="sl">{l}</span>
                </div>
              ))}
            </div>

            <p className="bio-label">24-Hour Biorhythm</p>
            <div className="bio-bar">
              {[
                { w: '25%', bg: 'rgba(129,140,248,0.12)', color: '#818cf8', label: 'Sleep · 00–06' },
                { w: '37.5%', bg: 'rgba(16,185,129,0.1)', color: '#10b981', label: 'Peak · 06–15' },
                { w: '16.7%', bg: 'rgba(245,158,11,0.09)', color: '#f59e0b', label: 'Dip · 15–19' },
                { w: '20.83%', bg: 'rgba(59,130,246,0.07)', color: '#3b82f6', label: 'Wind · 19–24' },
              ].map(s => (
                <div key={s.label} className="bio-seg" style={{ width: s.w, background: s.bg, color: s.color }}>
                  {s.label}
                </div>
              ))}
              <div className="bio-now" style={{ left: `${nowPct}%` }} />
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="section">
          <div className="section-head">
            <div className="section-head-left">
              <div className="section-icon" style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.15)' }}>
                <Icon name="user" size={15} color="#10b981" />
              </div>
              <span className="section-title">Personal Information</span>
            </div>
          </div>
          <div className="section-body">
            <form onSubmit={handleSave}>
              <div className="field-grid">
                <Field label="Full Name" iconName="user" value={form.name} placeholder="Dr. Jane Doe" readOnly={!editMode} onChange={up('name')} />
                <Field label="Email" iconName="mail" type="email" value={form.email} placeholder="doctor@hospital.com" readOnly={!editMode} onChange={up('email')} />
                <Field label="Phone" iconName="phone" value={form.phone} placeholder="+1 (555) 000-0000" readOnly={!editMode} onChange={up('phone')} />
                <Field label="Location / Hospital" iconName="map" value={form.location} placeholder="City, Hospital" readOnly={!editMode} onChange={up('location')} />
                <Field label="Specialty" iconName="pill" value={form.specialty} placeholder="Specialty" readOnly={!editMode} onChange={up('specialty')} />
                <Field label="License No." iconName="shield" value={form.licenseNo} placeholder="MD-XXXXX" readOnly={true} />
              </div>

              <div className="field">
                <label>Professional Bio</label>
                <div className="field-inner">
                  <textarea
                    rows={3}
                    value={form.bio}
                    readOnly={!editMode}
                    data-ro={String(!editMode)}
                    onChange={up('bio')}
                    style={{ lineHeight: 1.65 }}
                  />
                </div>
              </div>

              {editMode && (
                <div className="action-row">
                  <button type="button" className="btn btn-ghost" onClick={() => setEditMode(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary" disabled={isSaving}>
                    {isSaving
                      ? <><Icon name="spin" size={14} color="white" /><span style={{ marginLeft: 4 }}>Saving…</span></>
                      : <><Icon name="save" size={14} color="white" />Save Changes</>
                    }
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Medications */}
        <div className="section">
          <div className="section-head">
            <div className="section-head-left">
              <div className="section-icon" style={{ background: 'rgba(168,85,247,0.08)', border: '1px solid rgba(168,85,247,0.15)' }}>
                <Icon name="pill" size={15} color="#a855f7" />
              </div>
              <span className="section-title">Active Medication Profile</span>
            </div>
            <button style={{ padding: '5px 13px', borderRadius: 8, background: 'rgba(168,85,247,0.07)', border: '1px solid rgba(168,85,247,0.18)', color: '#a855f7', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
              <Icon name="plus" size={13} color="#a855f7" /> Add
            </button>
          </div>
          <div className="section-body">
            <div className="med-list">
              {meds.map((m, i) => (
                <div key={i} className="med-item">
                  <div className="med-icon" style={{ background: 'rgba(168,85,247,0.08)', border: '1px solid rgba(168,85,247,0.15)' }}>
                    <Icon name="pill" size={15} color="#a855f7" />
                  </div>
                  <div className="med-info">
                    <div className="med-name">{m.name}</div>
                    <div className="med-sub"><b style={{ color: '#94a3b8', fontWeight: 500 }}>{m.schedule}</b> — {m.notes}</div>
                  </div>
                  <span className="badge" style={
                    m.status === 'Optimized'
                      ? { background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', color: '#10b981' }
                      : { background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)', color: '#f59e0b' }
                  }>
                    {m.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Danger zone */}
        <div className="danger-zone">
          <div className="danger-left">
            <Icon name="alert" size={18} color="#ef4444" />
            <div>
              <div className="danger-label">Delete Account</div>
              <div className="danger-sub">Permanently remove all your data and records.</div>
            </div>
          </div>
          <button className="btn-danger">Delete Account</button>
        </div>

      </div>
    </>
  );
}