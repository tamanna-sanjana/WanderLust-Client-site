import React, { useState } from 'react';
import Sidebar from '../../../Components/Backend/Admin/Common/Sidebar';
import Topbar from '../../../Components/Backend/Admin/Common/Topbar';
import { Outlet } from 'react-router';

const AdminDashboard = () => {
     const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    return (
        <>
        <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      {sidebarOpen && (
        <div className="hidden md:block">
          <Sidebar />
        </div>
      )}

      {/* Content Area */}
      <div className={`flex-1 md:ml-64`}>
        <Topbar toggleSidebar={toggleSidebar} />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
            
        </>
    );
};

export default AdminDashboard;