import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Users, Activity, Clock, CheckCircle2 } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  const stats = [
    { title: 'Total Patients', value: '1,248', icon: <Users className="text-brand-400" size={24} />, trend: '+12% this month' },
    { title: 'Active Schedules', value: '842', icon: <Activity className="text-secondary-accent" size={24} />, trend: '+5% this week' },
    { title: 'Pending Reviews', value: '38', icon: <Clock className="text-amber-500" size={24} />, trend: 'Needs attention' },
  ];

  const activities = [
    { id: 1, user: 'Sarah Jenkins', action: 'Optimized dosing schedule for hypertension', time: '2 hours ago' },
    { id: 2, user: 'Michael Chen', action: 'Uploaded new circadian baseline data', time: '4 hours ago' },
    { id: 3, user: 'Dr. Emily Stone', action: 'Approved revised administration window', time: 'Yesterday' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold font-outfit text-white tracking-tight">
          Welcome back, {user?.name || 'Doctor'}
        </h1>
        <p className="text-text-secondary mt-1 text-lg">Here's your clinical overview for today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-dark border border-[rgba(255,255,255,0.08)] p-6 rounded-2xl shadow-lg hover:border-[rgba(255,255,255,0.15)] transition-all group">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-text-secondary text-sm font-medium mb-1">{stat.title}</p>
                <h3 className="text-3xl font-bold text-white font-outfit">{stat.value}</h3>
              </div>
              <div className="p-3 bg-white/5 rounded-xl border border-white/10 group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
            </div>
            <div className="mt-4 text-sm text-text-secondary/80 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500"></span>
              {stat.trend}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-dark border border-[rgba(255,255,255,0.08)] rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-[rgba(255,255,255,0.05)]">
          <h2 className="text-xl font-bold font-outfit text-white">Recent Clinical Activity</h2>
        </div>
        <div className="divide-y divide-[rgba(255,255,255,0.05)]">
          {activities.map((item) => (
            <div key={item.id} className="p-6 flex items-start gap-4 hover:bg-white/[0.02] transition-colors">
              <div className="mt-1 flex-shrink-0">
                <CheckCircle2 size={20} className="text-brand-400" />
              </div>
              <div className="flex-1">
                <p className="text-white font-medium">{item.user}</p>
                <p className="text-text-secondary text-sm mt-0.5">{item.action}</p>
              </div>
              <span className="text-xs text-text-secondary whitespace-nowrap">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
