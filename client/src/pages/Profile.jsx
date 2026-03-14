import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Camera, Loader2 } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => setIsSaving(false), 1000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-outfit text-white tracking-tight">Profile Settings</h1>
        <p className="text-text-secondary mt-1">Manage your professional medical account details.</p>
      </div>

      <div className="bg-dark border border-[rgba(255,255,255,0.08)] rounded-2xl shadow-lg p-6 md:p-8">
        <form onSubmit={handleSave} className="space-y-8">
          {/* Avatar Section */}
          <div className="flex items-center gap-6">
            <div className="relative group cursor-pointer">
              <div className="w-24 h-24 rounded-full bg-brand-500/20 border-2 border-brand-500/30 flex items-center justify-center overflow-hidden">
                <User size={40} className="text-brand-400 group-hover:scale-110 transition-transform" />
              </div>
              <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera size={24} className="text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-white font-inter">Profile Picture</h3>
              <p className="text-sm text-text-secondary mt-1">PNG, JPG up to 5MB</p>
              <button type="button" className="mt-2 text-brand-400 text-sm font-medium hover:text-brand-300 transition-colors">
                Upload new picture
              </button>
            </div>
          </div>

          <div className="w-full h-px bg-[rgba(255,255,255,0.05)]"></div>

          {/* Form Fields Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-text-secondary">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-text-secondary/50" />
                </div>
                <input
                  type="text"
                  defaultValue={user?.name || ''}
                  className="w-full bg-dark-panel border border-[rgba(255,255,255,0.1)] rounded-xl pl-10 px-4 py-3 text-white focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/50 transition-all placeholder:text-text-secondary/50"
                  placeholder="Dr. Jane Doe"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-text-secondary">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-text-secondary/50" />
                </div>
                <input
                  type="email"
                  defaultValue={user?.email || ''}
                  className="w-full bg-dark-panel border border-[rgba(255,255,255,0.1)] rounded-xl pl-10 px-4 py-3 text-white focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/50 transition-all placeholder:text-text-secondary/50"
                  placeholder="doctor@hospital.com"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 flex justify-end gap-4">
            <button type="button" className="px-6 py-2.5 rounded-xl border border-[rgba(255,255,255,0.1)] text-white font-medium hover:bg-white/5 transition-colors">
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={isSaving}
              className="px-6 py-2.5 rounded-xl bg-brand-500 text-white font-medium hover:bg-brand-600 transition-colors flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(16,185,129,0.3)]"
            >
              {isSaving ? <Loader2 size={18} className="animate-spin" /> : null}
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
