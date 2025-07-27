import React, { useContext, useEffect, useRef, useState } from "react";
import { Bell, Menu, UserCircle, LogOut, Settings,User } from "lucide-react";
import { AuthContext } from "../../Provider/AuthContext";
import { Navigate, useNavigate } from "react-router";
import Swal from "sweetalert2";

const Topbar = ({ toggleSidebar }) => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

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

const handleLogout = async () => {
  try {
    await logout();
    Swal.fire({
      icon: "success",
      title: "Logged out successfully",
      timer: 1500,
      showConfirmButton: false,
      position: "top-end",
      toast: true,
    });
    navigate("/");
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Logout failed",
      text: error.message || "Please try again",
      confirmButtonText: "OK",
    });
  }
};
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
          <Bell
            className="text-gray-600 hover:text-indigo-700 transition cursor-pointer"
            size={24}
          />
          <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-xs font-semibold rounded-full px-1.5 py-0.5 shadow-md">
            3
          </span>
        </div>
 {/* Profile */}
        <div ref={dropdownRef} className="relative">
          <UserCircle
            size={32}
            className="text-gray-600 hover:text-indigo-700 transition cursor-pointer"
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
                onClick={handleLogout}
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
