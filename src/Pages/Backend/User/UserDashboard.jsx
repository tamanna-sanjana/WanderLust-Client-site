import React, { useState } from 'react';
import Sidebar from '../../../Components/Backend/User/Common/Sidebar';
import { Outlet } from 'react-router';
import Topbar from '../../../Components/Backend/User/Common/Topbar';

const UserDashboard = () => {
      const [sidebarOpen, setSidebarOpen] = useState(false);
    
      const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    return (
        <>
         <div className="flex h-screen overflow-hidden">
      <Sidebar isSidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex flex-col flex-1 overflow-y-auto">
        <Topbar toggleSidebar={toggleSidebar} />
        <main className="p-6 bg-gray-100 min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
            
        </>
    );
};

export default UserDashboard;