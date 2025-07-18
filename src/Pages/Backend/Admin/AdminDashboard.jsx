import React, { useState } from 'react';
import Sidebar from '../../../Components/Backend/Admin/Common/Sidebar';
import Topbar from '../../../Components/Backend/Admin/Common/Topbar';
import { Outlet } from 'react-router';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className={`fixed z-40 inset-y-0 left-0 w-64 transition-transform duration-300 transform bg-white border-r shadow-xl
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 md:static md:inset-0`}>
        <Sidebar />
      </div>

      {/* Overlay for small screens */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        <Topbar toggleSidebar={toggleSidebar} />
        <main className="p-6 bg-gray-100 min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
