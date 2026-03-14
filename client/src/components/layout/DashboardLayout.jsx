import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex bg-dark min-h-screen text-text-primary font-inter">
      {/* Sidebar - Desktop */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.03),transparent_50%)]">
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        {/* Scrollable Content */}
        <main className="flex-1 p-6 lg:p-10 overflow-auto">
          <div className="max-w-6xl mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay (Simplified for this exercise) */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 md:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
