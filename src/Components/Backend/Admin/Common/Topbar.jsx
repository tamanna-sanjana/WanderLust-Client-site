import React, { useState, useEffect, useRef } from "react";
import { Menu, Bell, Search, UserCircle, LogOut, User } from "lucide-react";

const Topbar = ({ toggleSidebar }) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full h-20 bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-700 shadow-lg px-6 flex justify-between items-center sticky top-0 z-50 text-white font-[Poppins]">
      {/* Left: Menu & Title */}
      <div className="flex items-center gap-4">
        <button className="md:hidden text-white" onClick={toggleSidebar}>
          <Menu size={26} />
        </button>
        <h2 className="text-2xl font-semibold tracking-wide drop-shadow-sm">
          Welcome Admin
        </h2>
      </div>

      {/* Right: Search & Icons */}
      <div className="flex items-center gap-6 relative">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search anything..."
            className="bg-white/20 text-white placeholder-white/70 border border-white/30 rounded-full px-4 py-2 w-64 backdrop-blur-md shadow-inner focus:outline-none focus:ring-2 focus:ring-white"
          />
          <Search className="absolute right-3 top-2.5 text-white/80" size={18} />
        </div>

        {/* Notification */}
        <Bell
          size={22}
          className="text-white hover:text-yellow-300 transition cursor-pointer"
        />

        {/* Profile */}
        <div ref={dropdownRef} className="relative">
          <UserCircle
            size={32}
            className="text-white hover:text-cyan-300 transition cursor-pointer"
            onClick={() => setProfileOpen((open) => !open)}
          />

          {/* Dropdown */}
          {profileOpen && (
            <div className="absolute right-0 mt-3 w-40 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 text-gray-700 font-medium">
              <button
                type="button"
                className="flex items-center gap-2 px-4 py-2 hover:bg-indigo-100 w-full rounded-t-md"
                onClick={() => alert("Go to Profile")}
              >
                <User size={18} />
                Profile
              </button>
              <button
                type="button"
                className="flex items-center gap-2 px-4 py-2 hover:bg-red-100 text-red-600 w-full rounded-b-md"
                onClick={() => alert("Logging out")}
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
