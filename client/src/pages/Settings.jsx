import React, { useState } from 'react';
import { Lock, Bell, Moon, Smartphone, ShieldCheck, Mail } from 'lucide-react';

const Settings = () => {
    const [notifications, setNotifications] = useState({
        email: true,
        push: false,
        sms: true,
    });

    const toggleNotification = (type) => {
        setNotifications(prev => ({...prev, [type]: !prev[type]}));
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold font-outfit text-white tracking-tight">Account Settings</h1>
                <p className="text-text-secondary mt-1">Manage your security and application preferences.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* Left Navigation col (Simulated) */}
                <div className="space-y-2 hidden md:block">
                    {['General', 'Security', 'Notifications', 'Integrations'].map((item, i) => (
                        <div key={item} className={`px-4 py-2.5 rounded-lg text-sm font-medium cursor-pointer transition-colors ${i === 0 ? 'bg-brand-500/10 text-brand-400' : 'text-text-secondary hover:text-white hover:bg-white/5'}`}>
                            {item}
                        </div>
                    ))}
                </div>

                {/* Main Settings Content */}
                <div className="md:col-span-2 space-y-8">
                    
                    {/* Security Section (Change Password) */}
                    <div className="bg-dark border border-[rgba(255,255,255,0.08)] rounded-2xl shadow-lg overflow-hidden">
                        <div className="p-6 border-b border-[rgba(255,255,255,0.05)] flex items-center gap-3">
                            <ShieldCheck className="text-brand-400" size={22} />
                            <h2 className="text-xl font-bold font-outfit text-white">Security</h2>
                        </div>
                        
                        <div className="p-6 space-y-4">
                            <p className="text-sm text-text-secondary mb-4">Update your password to keep your account secure.</p>
                            
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-text-secondary">Current Password</label>
                                    <div className="relative">
                                        <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary/50" />
                                        <input type="password" placeholder="••••••••" className="w-full bg-dark-panel border border-[rgba(255,255,255,0.1)] rounded-xl pl-10 px-4 py-2.5 text-white focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/50 outline-none" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-text-secondary">New Password</label>
                                    <div className="relative">
                                        <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary/50" />
                                        <input type="password" placeholder="••••••••" className="w-full bg-dark-panel border border-[rgba(255,255,255,0.1)] rounded-xl pl-10 px-4 py-2.5 text-white focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/50 outline-none" />
                                    </div>
                                </div>
                                
                                <button className="mt-4 px-5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium text-sm transition-colors border border-[rgba(255,255,255,0.1)]">
                                    Update Password
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Notifications Section */}
                    <div className="bg-dark border border-[rgba(255,255,255,0.08)] rounded-2xl shadow-lg overflow-hidden">
                        <div className="p-6 border-b border-[rgba(255,255,255,0.05)] flex items-center gap-3">
                            <Bell className="text-amber-500" size={22} />
                            <h2 className="text-xl font-bold font-outfit text-white">Notifications</h2>
                        </div>
                        
                        <div className="divide-y divide-[rgba(255,255,255,0.05)]">
                            {/* Email Toggle */}
                            <div className="p-6 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-white/5 rounded-lg border border-[rgba(255,255,255,0.05)]">
                                        <Mail size={18} className="text-text-secondary" />
                                    </div>
                                    <div>
                                        <p className="text-white font-medium text-sm">Email Notifications</p>
                                        <p className="text-text-secondary text-xs mt-0.5">Receive daily patient summaries.</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => toggleNotification('email')}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notifications.email ? 'bg-brand-500' : 'bg-[rgba(255,255,255,0.1)]'}`}
                                >
                                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notifications.email ? 'translate-x-6' : 'translate-x-1'}`} />
                                </button>
                            </div>

                            {/* Push Toggle */}
                            <div className="p-6 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-white/5 rounded-lg border border-[rgba(255,255,255,0.05)]">
                                        <Smartphone size={18} className="text-text-secondary" />
                                    </div>
                                    <div>
                                        <p className="text-white font-medium text-sm">Push Notifications</p>
                                        <p className="text-text-secondary text-xs mt-0.5">Urgent schedule alerts.</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => toggleNotification('push')}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notifications.push ? 'bg-brand-500' : 'bg-[rgba(255,255,255,0.1)]'}`}
                                >
                                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notifications.push ? 'translate-x-6' : 'translate-x-1'}`} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
