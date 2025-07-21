import React from "react";
import { Bell, Menu, UserCircle, LogOut, Settings } from "lucide-react";

const Topbar = ({ toggleSidebar }) => {
  return (
    <header className="w-full bg-gradient-to-r from-white via-indigo-50 to-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50 backdrop-blur-md">
      {/* Left Section: Mobile Menu + Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="md:hidden text-indigo-700 hover:scale-110 transition"
        >
          <Menu size={26} />
        </button>
        <h1 className="text-2xl font-bold text-indigo-700 hidden md:block drop-shadow-sm">
          User Dashboard
        </h1>
      </div>

      {/* Right Section: Notifications + Profile */}
      <div className="flex items-center gap-6">
        {/* Notification Icon */}
        <div className="relative">
          <Bell className="text-gray-600 hover:text-indigo-700 transition cursor-pointer" size={24} />
          <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-xs font-semibold rounded-full px-1.5 py-0.5 shadow-md">
            3
          </span>
        </div>

        {/* Profile Dropdown */}
        <div className="relative group">
          <div className="flex items-center gap-2 cursor-pointer select-none">
            <UserCircle className="text-gray-700" size={28} />
            <span className="hidden md:block font-semibold text-gray-700">
              User
            </span>
          </div>

          {/* Dropdown Menu */}
          <div className="absolute right-0 mt-3 w-44 bg-white shadow-xl rounded-xl p-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-2 transform transition-all duration-300 z-30 pointer-events-none group-hover:pointer-events-auto">
            <button className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-indigo-100 rounded-lg gap-2">
              <Settings size={16} /> Settings
            </button>
            <button className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-red-100 rounded-lg gap-2">
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
