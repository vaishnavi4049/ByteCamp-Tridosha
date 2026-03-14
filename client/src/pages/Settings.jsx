import React, { useState } from 'react';

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&family=DM+Serif+Display:ital@0;1&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --green: #10b981;
    --green-dim: rgba(16,185,129,0.08);
    --green-border: rgba(16,185,129,0.18);
    --blue: #3b82f6;
    --blue-dim: rgba(59,130,246,0.08);
    --blue-border: rgba(59,130,246,0.18);
    --purple: #a855f7;
    --purple-dim: rgba(168,85,247,0.08);
    --purple-border: rgba(168,85,247,0.18);
    --amber: #f59e0b;
    --amber-dim: rgba(245,158,11,0.08);
    --red: #ef4444;
    --red-dim: rgba(239,68,68,0.06);
    --red-border: rgba(239,68,68,0.18);
    --indigo: #818cf8;
    --surface: rgba(255,255,255,0.025);
    --surface-hover: rgba(255,255,255,0.04);
    --border: rgba(255,255,255,0.07);
    --border-light: rgba(255,255,255,0.04);
    --text: #f1f5f9;
    --muted: #64748b;
    --muted-light: #94a3b8;
    --sans: 'DM Sans', sans-serif;
    --serif: 'DM Serif Display', serif;
  }

  body { background: #060b14; font-family: var(--sans); color: var(--text); -webkit-font-smoothing: antialiased; }

  .settings-root { max-width: 900px; margin: 0 auto; padding: 2.5rem 1.5rem 4rem; display: flex; flex-direction: column; gap: 1.5rem; }

  .page-title { font-family: var(--serif); font-size: 2.2rem; font-weight: 400; color: var(--text); letter-spacing: -0.02em; line-height: 1.1; }
  .page-subtitle { color: var(--muted); font-size: 0.875rem; margin-top: 0.35rem; font-weight: 400; }

  /* ─── Layout ─── */
  .layout { display: grid; grid-template-columns: 188px 1fr; gap: 1.25rem; align-items: start; }
  @media (max-width: 620px) { .layout { grid-template-columns: 1fr; } }

  /* ─── Side nav ─── */
  .sidenav {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    overflow: hidden;
    padding: 0.375rem;
    position: sticky; top: 80px;
  }
  .nav-btn {
    width: 100%;
    display: flex; align-items: center; gap: 0.55rem;
    padding: 0.6rem 0.85rem;
    border-radius: 10px;
    background: transparent;
    border: 1px solid transparent;
    color: var(--muted);
    font-family: var(--sans); font-weight: 500; font-size: 0.82rem;
    cursor: pointer; transition: all 0.18s; text-align: left;
  }
  .nav-btn:hover { color: var(--text); background: var(--surface-hover); }
  .nav-btn.active { background: var(--green-dim); border-color: var(--green-border); color: var(--green); }
  .nav-icon { font-size: 0.95rem; width: 18px; text-align: center; }

  /* ─── Panel stack ─── */
  .panel-stack { display: flex; flex-direction: column; gap: 1rem; }

  /* ─── Section card ─── */
  .section { background: var(--surface); border: 1px solid var(--border); border-radius: 18px; overflow: hidden; }
  .section-head { display: flex; align-items: center; gap: 0.65rem; padding: 1rem 1.5rem; border-bottom: 1px solid var(--border-light); }
  .section-icon { width: 28px; height: 28px; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .section-title { font-size: 0.85rem; font-weight: 600; color: var(--text); }

  /* ─── Setting row ─── */
  .setting-row {
    display: flex; align-items: center; gap: 1rem;
    padding: 0.95rem 1.5rem;
    border-bottom: 1px solid var(--border-light);
    transition: background 0.15s;
  }
  .setting-row:last-child { border-bottom: none; }
  .setting-row:hover { background: var(--surface-hover); }
  .row-icon { width: 34px; height: 34px; border-radius: 9px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .row-text { flex: 1; }
  .row-title { color: var(--text); font-size: 0.84rem; font-weight: 500; }
  .row-desc { color: var(--muted); font-size: 0.75rem; margin-top: 0.15rem; line-height: 1.45; }
  .row-ctrl { flex-shrink: 0; }

  /* ─── Toggle ─── */
  .toggle { position: relative; width: 40px; height: 22px; border-radius: 11px; border: none; cursor: pointer; padding: 0; transition: background 0.25s; }
  .toggle-thumb { position: absolute; top: 3px; width: 16px; height: 16px; border-radius: 50%; background: white; transition: left 0.22s; box-shadow: 0 1px 3px rgba(0,0,0,0.3); }

  /* ─── Password fields ─── */
  .pw-grid { display: flex; flex-direction: column; gap: 0.9rem; }
  .field { display: flex; flex-direction: column; gap: 0.4rem; }
  .field label { font-size: 0.72rem; color: var(--muted); font-weight: 500; letter-spacing: 0.03em; }
  .field-inner { position: relative; }
  .field-inner svg { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); pointer-events: none; }
  .field input {
    width: 100%; padding: 10px 38px 10px 38px;
    background: rgba(255,255,255,0.03);
    border: 1px solid var(--border);
    border-radius: 10px; color: var(--text);
    font-family: var(--sans); font-size: 0.84rem;
    outline: none; transition: all 0.2s;
  }
  .field input:focus { border-color: var(--green-border); box-shadow: 0 0 0 3px rgba(16,185,129,0.07); }
  .pw-eye { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: var(--muted); padding: 0; display: flex; }

  /* ─── Strength bar ─── */
  .strength-row { display: flex; gap: 3px; }
  .strength-seg { flex: 1; height: 3px; border-radius: 2px; transition: background 0.25s; }
  .strength-label { font-size: 0.7rem; font-weight: 600; margin-top: 3px; }

  /* ─── Select options ─── */
  .opt-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.6rem; }
  .opt-grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.6rem; }
  .sel-opt {
    padding: 0.8rem 1rem; border-radius: 12px;
    background: rgba(255,255,255,0.02);
    border: 1px solid var(--border-light);
    cursor: pointer; text-align: left;
    transition: all 0.2s;
    display: flex; align-items: center; gap: 0.6rem;
  }
  .sel-opt:hover { border-color: var(--border); }
  .sel-opt.selected { background: var(--green-dim); border-color: var(--green-border); }
  .sel-opt-label { font-size: 0.82rem; font-weight: 500; }
  .sel-opt-desc { font-size: 0.71rem; color: var(--muted); margin-top: 0.1rem; }

  /* ─── Accent swatches ─── */
  .accents { display: flex; gap: 0.6rem; }
  .swatch { width: 32px; height: 32px; border-radius: 50%; cursor: pointer; border: 3px solid transparent; transition: all 0.18s; }
  .swatch.selected { border-color: white; box-shadow: 0 0 0 2px var(--swatch-c); }

  /* ─── Native select ─── */
  .native-select {
    width: 100%; padding: 10px 12px;
    background: rgba(255,255,255,0.03);
    border: 1px solid var(--border);
    border-radius: 10px; color: var(--text);
    font-family: var(--sans); font-size: 0.84rem;
    outline: none; cursor: pointer; appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='%2364748b'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;
    padding-right: 32px;
  }

  /* ─── Sessions ─── */
  .badge-active { padding: 3px 10px; border-radius: 20px; font-size: 0.68rem; font-weight: 600; background: var(--green-dim); border: 1px solid var(--green-border); color: var(--green); }
  .btn-revoke { padding: 5px 13px; border-radius: 8px; background: rgba(239,68,68,0.07); border: 1px solid var(--red-border); color: var(--red); font-family: var(--sans); font-size: 0.73rem; font-weight: 600; cursor: pointer; transition: all 0.2s; }
  .btn-revoke:hover { background: rgba(239,68,68,0.14); }

  /* ─── 2FA notice ─── */
  .twofa-notice { margin: 0 1.5rem 1.25rem; padding: 0.9rem 1.1rem; background: var(--blue-dim); border: 1px solid var(--blue-border); border-radius: 12px; }
  .twofa-title { font-size: 0.78rem; font-weight: 600; color: var(--blue); margin-bottom: 0.25rem; }
  .twofa-body { font-size: 0.74rem; color: var(--muted); line-height: 1.5; }

  /* ─── Data export btn ─── */
  .btn-export { padding: 6px 14px; border-radius: 8px; background: var(--blue-dim); border: 1px solid var(--blue-border); color: var(--blue); font-family: var(--sans); font-size: 0.75rem; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 4px; transition: opacity 0.2s; }
  .btn-export:hover { opacity: 0.8; }

  /* ─── Danger zone ─── */
  .danger-card { padding: 1.4rem 1.5rem; background: var(--red-dim); border: 1px solid var(--red-border); border-radius: 18px; }
  .danger-header { display: flex; align-items: center; gap: 0.55rem; margin-bottom: 1rem; }
  .danger-header-label { font-size: 0.83rem; font-weight: 600; color: var(--red); }
  .danger-items { display: flex; flex-direction: column; gap: 0.55rem; }
  .danger-item { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.75rem; padding: 0.85rem 1rem; background: rgba(255,255,255,0.01); border: 1px solid rgba(239,68,68,0.08); border-radius: 11px; }
  .danger-item-label { font-size: 0.82rem; font-weight: 500; color: var(--text); }
  .danger-item-desc { font-size: 0.72rem; color: var(--muted); margin-top: 0.1rem; }
  .btn-danger { padding: 6px 14px; border-radius: 8px; background: transparent; border: 1px solid rgba(239,68,68,0.22); color: var(--red); font-family: var(--sans); font-size: 0.73rem; font-weight: 600; cursor: pointer; flex-shrink: 0; transition: background 0.2s; }
  .btn-danger:hover { background: rgba(239,68,68,0.1); }

  /* ─── pw save button ─── */
  .btn-primary { padding: 9px 22px; border-radius: 10px; background: var(--green); border: none; color: white; font-family: var(--sans); font-weight: 600; font-size: 0.83rem; cursor: pointer; display: inline-flex; align-items: center; gap: 0.4rem; transition: opacity 0.2s; }
  .btn-primary:disabled { opacity: 0.4; cursor: not-allowed; }
  .btn-primary:not(:disabled):hover { opacity: 0.88; }

  /* ─── Toast ─── */
  .toast { display: flex; align-items: center; gap: 0.45rem; padding: 8px 14px; background: var(--green-dim); border: 1px solid var(--green-border); border-radius: 9px; color: var(--green); font-size: 0.77rem; font-weight: 500; margin-bottom: 1rem; animation: fadeSlide 0.3s ease; }
  @keyframes fadeSlide { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }

  /* ─── sub-label ─── */
  .sub-label { font-size: 0.72rem; color: var(--muted); font-weight: 500; letter-spacing: 0.04em; text-transform: uppercase; margin-bottom: 0.6rem; }

  /* ─── padding wrapper ─── */
  .padded { padding: 1.4rem 1.5rem; display: flex; flex-direction: column; gap: 1.25rem; }

  @keyframes spin { to { transform: rotate(360deg); } }
  .spin { animation: spin 0.8s linear infinite; }
`;

// ── Tiny inline icons ────────────────────────────────────────────────────────
const paths = {
    bell: 'M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z',
    lock: 'M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z',
    palette: 'M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z',
    shield: 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z',
    database: 'M12 2C6.48 2 2 4.48 2 7.5v9C2 19.52 6.48 22 12 22s10-2.48 10-5.5v-9C22 4.48 17.52 2 12 2zm0 3c4.42 0 8 1.57 8 3.5S16.42 12 12 12s-8-1.57-8-3.5S7.58 5 12 5zm0 14c-4.42 0-8-1.57-8-3.5v-2.86c1.77 1.45 4.71 2.36 8 2.36s6.23-.91 8-2.36v2.86c0 1.93-3.58 3.5-8 3.5z',
    mail: 'M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z',
    phone: 'M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z',
    zap: 'M7 2v11h3v9l7-12h-4l4-8z',
    alert: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z',
    monitor: 'M20 18c1.1 0 1.99-.9 1.99-2L22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zm-8-1c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm8-3H4V6h16v8z',
    globe: 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2s.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2s.07-1.35.16-2h4.68c.09.65.16 1.32.16 2s-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2s-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z',
    download: 'M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z',
    check: 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z',
    eye: 'M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z',
    eyeoff: 'M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78 3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z',
    key: 'M12.65 10A6 6 0 0 0 7 4a6 6 0 0 0-6 6 6 6 0 0 0 6 6 6 6 0 0 0 5.65-4H17v4h4v-4h2v-4H12.65zM7 14a4 4 0 0 1-4-4 4 4 0 0 1 4-4 4 4 0 0 1 4 4 4 4 0 0 1-4 4z',
    activity: 'M22 12h-4l-3 9L9 3l-3 9H2',
    spin: 'M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z',
};

const Icon = ({ name, size = 16, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24"
        fill={name === 'activity' ? 'none' : color}
        stroke={name === 'activity' ? color : 'none'}
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    >
        {name === 'activity'
            ? <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            : <path d={paths[name] || ''} />}
    </svg>
);

// ── Toggle ───────────────────────────────────────────────────────────────────
const Toggle = ({ on, onToggle, color = '#10b981' }) => (
    <button
        className="toggle"
        onClick={onToggle}
        style={{ background: on ? color : 'rgba(255,255,255,0.1)', boxShadow: on ? `0 0 10px ${color}35` : 'none' }}
    >
        <span className="toggle-thumb" style={{ left: on ? 21 : 3 }} />
    </button>
);

// ── Setting row ──────────────────────────────────────────────────────────────
const Row = ({ iconName, iconBg, iconBorder, iconColor, title, desc, children }) => (
    <div className="setting-row">
        <div className="row-icon" style={{ background: iconBg, border: `1px solid ${iconBorder}` }}>
            <Icon name={iconName} size={15} color={iconColor} />
        </div>
        <div className="row-text">
            <div className="row-title">{title}</div>
            {desc && <div className="row-desc">{desc}</div>}
        </div>
        <div className="row-ctrl">{children}</div>
    </div>
);

// ── Section card ─────────────────────────────────────────────────────────────
const Sect = ({ title, iconName, iconBg, iconBorder, iconColor, children }) => (
    <div className="section">
        <div className="section-head">
            <div className="section-icon" style={{ background: iconBg, border: `1px solid ${iconBorder}` }}>
                <Icon name={iconName} size={14} color={iconColor} />
            </div>
            <span className="section-title">{title}</span>
        </div>
        {children}
    </div>
);

// ── Password field ───────────────────────────────────────────────────────────
const PwField = ({ label, value, onChange }) => {
    const [show, setShow] = useState(false);
    return (
        <div className="field">
            <label>{label}</label>
            <div className="field-inner">
                <Icon name="lock" size={14} color="#475569" />
                <input
                    type={show ? 'text' : 'password'}
                    value={value}
                    onChange={onChange}
                    placeholder="••••••••"
                    style={{ paddingRight: 38 }}
                />
                <button className="pw-eye" type="button" onClick={() => setShow(s => !s)}>
                    <Icon name={show ? 'eyeoff' : 'eye'} size={14} color="#475569" />
                </button>
            </div>
        </div>
    );
};

// ── Strength bar ─────────────────────────────────────────────────────────────
const Strength = ({ pw }) => {
    const s = pw.length === 0 ? 0 : pw.length < 6 ? 1 : pw.length < 10 ? 2 : pw.match(/[A-Z]/) && pw.match(/[0-9]/) ? 4 : 3;
    const labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
    const colors = ['', '#ef4444', '#f59e0b', '#3b82f6', '#10b981'];
    if (!s) return null;
    return (
        <div>
            <div className="strength-row">
                {[1, 2, 3, 4].map(i => <div key={i} className="strength-seg" style={{ background: i <= s ? colors[s] : 'rgba(255,255,255,0.08)' }} />)}
            </div>
            <div className="strength-label" style={{ color: colors[s] }}>{labels[s]}</div>
        </div>
    );
};

// ── Select option ────────────────────────────────────────────────────────────
const Opt = ({ emoji, label, desc, selected, onClick }) => (
    <button className={`sel-opt${selected ? ' selected' : ''}`} onClick={onClick}>
        {emoji && <span style={{ fontSize: '1rem' }}>{emoji}</span>}
        <div style={{ flex: 1 }}>
            <div className="sel-opt-label" style={{ color: selected ? '#10b981' : 'var(--text)' }}>{label}</div>
            {desc && <div className="sel-opt-desc">{desc}</div>}
        </div>
        {selected && <Icon name="check" size={14} color="#10b981" />}
    </button>
);

// ── Main ─────────────────────────────────────────────────────────────────────
export default function Settings() {
    const [section, setSection] = useState('notifications');

    // Notifications
    const [notifs, setNotifs] = useState({ email: true, push: false, sms: true, urgentOnly: false, weeklyDigest: true });
    const tog = k => setNotifs(p => ({ ...p, [k]: !p[k] }));

    // Security
    const [pw, setPw] = useState({ cur: '', next: '', conf: '' });
    const [twoFA, setTwoFA] = useState(false);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const handlePwSave = e => {
        e.preventDefault();
        setSaving(true);
        setTimeout(() => { setSaving(false); setSaved(true); setPw({ cur: '', next: '', conf: '' }); setTimeout(() => setSaved(false), 3000); }, 1100);
    };

    // Appearance
    const [theme, setTheme] = useState('dark');
    const [accent, setAccent] = useState('emerald');
    const [lang, setLang] = useState('en');
    const [tz, setTz] = useState('auto');
    const [density, setDensity] = useState('comfortable');
    const accents = [
        { k: 'emerald', c: '#10b981' }, { k: 'blue', c: '#3b82f6' },
        { k: 'purple', c: '#a855f7' }, { k: 'rose', c: '#f43f5e' }, { k: 'amber', c: '#f59e0b' },
    ];

    // Privacy toggles
    const [analytics, setAnalytics] = useState(true);
    const [research, setResearch] = useState(false);

    const nav = [
        { k: 'notifications', label: 'Notifications', icon: '🔔' },
        { k: 'security', label: 'Security', icon: '🔒' },
        { k: 'appearance', label: 'Appearance', icon: '🎨' },
        { k: 'data', label: 'Data & Privacy', icon: '🛡️' },
    ];

    return (
        <>
            <style>{css}</style>
            <div className="settings-root">

                <div>
                    <h1 className="page-title">Settings</h1>
                    <p className="page-subtitle">Security, notifications, and application preferences.</p>
                </div>

                <div className="layout">

                    {/* Side nav */}
                    <nav className="sidenav">
                        {nav.map(n => (
                            <button key={n.k} className={`nav-btn${section === n.k ? ' active' : ''}`} onClick={() => setSection(n.k)}>
                                <span className="nav-icon">{n.icon}</span>
                                {n.label}
                            </button>
                        ))}
                    </nav>

                    <div className="panel-stack">

                        {/* ══ NOTIFICATIONS ══ */}
                        {section === 'notifications' && <>
                            <Sect title="Channels" iconName="bell" iconBg="rgba(245,158,11,0.08)" iconBorder="rgba(245,158,11,0.18)" iconColor="#f59e0b">
                                <Row iconName="mail" iconBg="var(--green-dim)" iconBorder="var(--green-border)" iconColor="var(--green)" title="Email Notifications" desc="Daily patient summaries and dosing alerts.">
                                    <Toggle on={notifs.email} onToggle={() => tog('email')} />
                                </Row>
                                <Row iconName="phone" iconBg="var(--blue-dim)" iconBorder="var(--blue-border)" iconColor="var(--blue)" title="Push Notifications" desc="Urgent schedule alerts and system warnings.">
                                    <Toggle on={notifs.push} onToggle={() => tog('push')} color="#3b82f6" />
                                </Row>
                                <Row iconName="bell" iconBg="var(--purple-dim)" iconBorder="var(--purple-border)" iconColor="var(--purple)" title="SMS Alerts" desc="Critical medication timing reminders.">
                                    <Toggle on={notifs.sms} onToggle={() => tog('sms')} color="#a855f7" />
                                </Row>
                            </Sect>

                            <Sect title="Preferences" iconName="zap" iconBg="rgba(245,158,11,0.08)" iconBorder="rgba(245,158,11,0.18)" iconColor="#f59e0b">
                                <Row iconName="alert" iconBg="rgba(239,68,68,0.07)" iconBorder="rgba(239,68,68,0.18)" iconColor="var(--red)" title="Urgent Alerts Only" desc="Only receive notifications for critical patient events.">
                                    <Toggle on={notifs.urgentOnly} onToggle={() => tog('urgentOnly')} color="#ef4444" />
                                </Row>
                                <Row iconName="activity" iconBg="var(--green-dim)" iconBorder="var(--green-border)" iconColor="var(--green)" title="Weekly Digest" desc="A summary of your clinical activity every Monday.">
                                    <Toggle on={notifs.weeklyDigest} onToggle={() => tog('weeklyDigest')} />
                                </Row>
                            </Sect>
                        </>}

                        {/* ══ SECURITY ══ */}
                        {section === 'security' && <>
                            <Sect title="Change Password" iconName="shield" iconBg="var(--green-dim)" iconBorder="var(--green-border)" iconColor="var(--green)">
                                <div className="padded" style={{ gap: '1rem' }}>
                                    <p style={{ fontSize: '0.78rem', color: 'var(--muted)', lineHeight: 1.55 }}>
                                        Use at least 12 characters with mixed case, numbers, and symbols for a strong password.
                                    </p>
                                    <form onSubmit={handlePwSave}>
                                        <div className="pw-grid" style={{ marginBottom: '1rem' }}>
                                            <PwField label="Current Password" value={pw.cur} onChange={e => setPw(p => ({ ...p, cur: e.target.value }))} />
                                            <PwField label="New Password" value={pw.next} onChange={e => setPw(p => ({ ...p, next: e.target.value }))} />
                                            {pw.next && <Strength pw={pw.next} />}
                                            <PwField label="Confirm New Password" value={pw.conf} onChange={e => setPw(p => ({ ...p, conf: e.target.value }))} />
                                        </div>
                                        {saved && <div className="toast"><Icon name="check" size={13} color="#10b981" /> Password updated successfully</div>}
                                        <button type="submit" className="btn-primary" disabled={saving || !pw.cur || !pw.next || !pw.conf}>
                                            {saving
                                                ? <><Icon name="spin" size={14} color="white" /><span style={{ marginLeft: 4 }}>Updating…</span></>
                                                : <><Icon name="key" size={14} color="white" />Update Password</>}
                                        </button>
                                    </form>
                                </div>
                            </Sect>

                            <Sect title="Two-Factor Authentication" iconName="shield" iconBg="var(--blue-dim)" iconBorder="var(--blue-border)" iconColor="var(--blue)">
                                <Row iconName="phone" iconBg="var(--blue-dim)" iconBorder="var(--blue-border)" iconColor="var(--blue)" title="Authenticator App" desc="Use Google Authenticator or Authy for secure login.">
                                    <Toggle on={twoFA} onToggle={() => setTwoFA(v => !v)} color="#3b82f6" />
                                </Row>
                                {twoFA && (
                                    <div className="twofa-notice">
                                        <div className="twofa-title">2FA Enabled ✓</div>
                                        <div className="twofa-body">Your account is protected. Scan the QR code in your authenticator app to add a new device.</div>
                                    </div>
                                )}
                            </Sect>

                            <Sect title="Active Sessions" iconName="monitor" iconBg="var(--purple-dim)" iconBorder="var(--purple-border)" iconColor="var(--purple)">
                                {[
                                    { device: 'MacBook Pro — Chrome', loc: 'Boston, MA', time: 'Current session', current: true },
                                    { device: 'iPhone 15 Pro — Safari', loc: 'Boston, MA', time: '2 hours ago', current: false },
                                ].map((s, i) => (
                                    <Row key={i}
                                        iconName="monitor"
                                        iconBg={s.current ? 'var(--green-dim)' : 'rgba(255,255,255,0.03)'}
                                        iconBorder={s.current ? 'var(--green-border)' : 'var(--border-light)'}
                                        iconColor={s.current ? 'var(--green)' : 'var(--muted)'}
                                        title={s.device}
                                        desc={`${s.loc} · ${s.time}`}
                                    >
                                        {s.current
                                            ? <span className="badge-active">Active</span>
                                            : <button className="btn-revoke">Revoke</button>}
                                    </Row>
                                ))}
                            </Sect>
                        </>}

                        {/* ══ APPEARANCE ══ */}
                        {section === 'appearance' && <>
                            <Sect title="Theme" iconName="palette" iconBg="var(--purple-dim)" iconBorder="var(--purple-border)" iconColor="var(--purple)">
                                <div className="padded">
                                    <div>
                                        <div className="sub-label">Color mode</div>
                                        <div className="opt-grid-3">
                                            <Opt emoji="🌑" label="Dark" desc="Default" selected={theme === 'dark'} onClick={() => setTheme('dark')} />
                                            <Opt emoji="☀️" label="Light" desc="Light UI" selected={theme === 'light'} onClick={() => setTheme('light')} />
                                            <Opt emoji="⚙️" label="System" desc="Match OS" selected={theme === 'system'} onClick={() => setTheme('system')} />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="sub-label">Accent color</div>
                                        <div className="accents">
                                            {accents.map(a => (
                                                <button
                                                    key={a.k}
                                                    className={`swatch${accent === a.k ? ' selected' : ''}`}
                                                    style={{ background: a.c, '--swatch-c': a.c }}
                                                    onClick={() => setAccent(a.k)}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="sub-label">Density</div>
                                        <div className="opt-grid-3">
                                            <Opt emoji="📦" label="Compact" desc="More content" selected={density === 'compact'} onClick={() => setDensity('compact')} />
                                            <Opt emoji="⬛" label="Comfortable" desc="Balanced" selected={density === 'comfortable'} onClick={() => setDensity('comfortable')} />
                                            <Opt emoji="🔲" label="Spacious" desc="More space" selected={density === 'spacious'} onClick={() => setDensity('spacious')} />
                                        </div>
                                    </div>
                                </div>
                            </Sect>

                            <Sect title="Localization" iconName="globe" iconBg="var(--blue-dim)" iconBorder="var(--blue-border)" iconColor="var(--blue)">
                                <div className="padded">
                                    <div className="opt-grid-2">
                                        {[
                                            { label: 'Language', val: lang, opts: [['en', '🇺🇸 English'], ['es', '🇪🇸 Español'], ['fr', '🇫🇷 Français'], ['de', '🇩🇪 Deutsch']], set: setLang },
                                            { label: 'Time Zone', val: tz, opts: [['auto', '🌍 Auto-detect'], ['est', '🕐 EST (UTC-5)'], ['pst', '🕔 PST (UTC-8)'], ['ist', '🕡 IST (UTC+5:30)']], set: setTz },
                                        ].map((s, i) => (
                                            <div key={i} className="field">
                                                <label>{s.label}</label>
                                                <select className="native-select" value={s.val} onChange={e => s.set(e.target.value)}>
                                                    {s.opts.map(([v, l]) => <option key={v} value={v} style={{ background: '#0f172a' }}>{l}</option>)}
                                                </select>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Sect>
                        </>}

                        {/* ══ DATA & PRIVACY ══ */}
                        {section === 'data' && <>
                            <Sect title="Your Data" iconName="database" iconBg="var(--blue-dim)" iconBorder="var(--blue-border)" iconColor="var(--blue)">
                                <Row iconName="download" iconBg="var(--blue-dim)" iconBorder="var(--blue-border)" iconColor="var(--blue)" title="Export All Data" desc="Download a complete copy of your patient records and settings.">
                                    <button className="btn-export"><Icon name="download" size={13} color="var(--blue)" /> Export</button>
                                </Row>
                            </Sect>

                            <Sect title="Privacy Controls" iconName="shield" iconBg="var(--green-dim)" iconBorder="var(--green-border)" iconColor="var(--green)">
                                <Row iconName="shield" iconBg="var(--green-dim)" iconBorder="var(--green-border)" iconColor="var(--green)" title="Analytics Data" desc="Share anonymous usage data to help improve ChronoMed AI.">
                                    <Toggle on={analytics} onToggle={() => setAnalytics(v => !v)} />
                                </Row>
                                <Row iconName="shield" iconBg="var(--green-dim)" iconBorder="var(--green-border)" iconColor="var(--green)" title="Research Participation" desc="Contribute de-identified data to chronobiology research.">
                                    <Toggle on={research} onToggle={() => setResearch(v => !v)} />
                                </Row>
                            </Sect>

                            <div className="danger-card">
                                <div className="danger-header">
                                    <Icon name="alert" size={16} color="var(--red)" />
                                    <span className="danger-header-label">Danger Zone</span>
                                </div>
                                <div className="danger-items">
                                    {[
                                        { label: 'Deactivate Account', desc: 'Temporarily disable — reactivate anytime.' },
                                        { label: 'Delete All Patient Data', desc: 'Permanently delete all patient records. Irreversible.' },
                                        { label: 'Delete Account', desc: 'Permanently remove your account and all data.' },
                                    ].map((item, i) => (
                                        <div key={i} className="danger-item">
                                            <div>
                                                <div className="danger-item-label">{item.label}</div>
                                                <div className="danger-item-desc">{item.desc}</div>
                                            </div>
                                            <button className="btn-danger">{item.label}</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>}

                    </div>
                </div>
            </div>
        </>
    );
}