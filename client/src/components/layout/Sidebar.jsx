import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, User, Settings, LogOut, Activity } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
    { name: 'Profile', icon: <User size={20} />, path: '/dashboard/profile' },
    { name: 'Settings', icon: <Settings size={20} />, path: '/dashboard/settings' },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-dark-panel border-r border-[rgba(255,255,255,0.08)] h-screen sticky top-0">
      <div className="p-6 border-b border-[rgba(255,255,255,0.08)]">
        <NavLink to="/dashboard" className="flex items-center gap-3 no-underline">
          <div className="w-8 h-8 rounded-lg bg-brand-500/20 flex items-center justify-center border border-brand-500/30">
            <Activity size={18} className="text-brand-400" />
          </div>
          <span className="text-xl font-bold font-outfit text-white tracking-tight">ChronoMed<span className="text-brand-400">.AI</span></span>
        </NavLink>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === '/dashboard'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 no-underline ${
                isActive
                  ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]'
                  : 'text-text-secondary hover:text-white hover:bg-white/5 border border-transparent'
              }`
            }
          >
            {item.icon}
            <span className="font-medium font-inter">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-[rgba(255,255,255,0.08)]">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-text-secondary hover:text-error-color hover:bg-error-color/10 transition-colors border border-transparent font-medium font-inter"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
