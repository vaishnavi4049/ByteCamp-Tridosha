import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Bell, Menu, Search, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = ({ toggleSidebar }) => {
  const { user } = useAuth();

  return (
    <header className="h-16 bg-dark-panel border-b border-[rgba(255,255,255,0.08)] flex items-center justify-between px-6 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="md:hidden text-text-secondary hover:text-white transition-colors"
        >
          <Menu size={24} />
        </button>

        {/* Optional Search */}
        <div className="hidden lg:flex items-center bg-dark border border-[rgba(255,255,255,0.08)] rounded-full px-4 py-1.5 focus-within:border-brand-500/50 focus-within:ring-1 focus-within:ring-brand-500/50 transition-all">
          <Search size={16} className="text-text-secondary mr-2" />
          <input 
            type="text" 
            placeholder="Search patient records..." 
            className="bg-transparent border-none text-sm text-white placeholder-text-secondary focus:outline-none w-64 font-inter"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative text-text-secondary hover:text-white transition-colors">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-error-color rounded-full shadow-[0_0_8px_rgba(239,68,68,0.5)]"></span>
        </button>
        
        <div className="h-8 w-px bg-[rgba(255,255,255,0.1)]"></div>

        <Link to="/dashboard/profile" className="flex items-center gap-3 hover:bg-white/5 p-1 pr-3 rounded-full transition-colors border border-transparent hover:border-[rgba(255,255,255,0.05)] no-underline cursor-pointer group">
          <div className="w-8 h-8 rounded-full bg-brand-500/20 border border-brand-500/30 flex items-center justify-center overflow-hidden">
             <User size={16} className="text-brand-400" />
          </div>
          <div className="hidden sm:block text-left">
            <div className="text-sm font-medium text-white font-inter group-hover:text-brand-300 transition-colors leading-tight">{user?.name || 'Doctor'}</div>
            <div className="text-xs text-text-secondary font-inter leading-tight">{user?.email || 'Medical Admin'}</div>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
