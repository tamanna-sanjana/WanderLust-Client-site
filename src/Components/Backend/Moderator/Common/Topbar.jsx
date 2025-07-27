import React, { useContext } from "react";
import { Bell, Menu, UserCircle, LogOut, Settings } from "lucide-react";
import { AuthContext } from "../../Provider/AuthContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router"; // or "react-router-dom"

const Topbar = ({ toggleSidebar }) => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

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
      navigate("/"); // <-- Correct navigation
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
    <header className="w-full bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <button
          onClick={toggleSidebar}
          className="md:hidden text-indigo-600 cursor-pointer"
        >
          <Menu size={24} />
        </button>
        <h1 className="text-xl font-semibold text-indigo-700 hidden md:block">
          Moderator Dashboard
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <Bell
            className="text-gray-600 cursor-pointer hover:text-indigo-600 transition"
            size={22}
          />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5">
            3
          </span>
        </div>

        <div className="relative group">
          <div className="flex items-center gap-2 cursor-pointer">
            <UserCircle className="text-gray-600" size={26} />
            <span className="hidden md:block font-medium text-gray-700">
              Moderator
            </span>
          </div>
          <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-xl p-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-1 transform transition-all duration-300 z-20">
            <button className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-indigo-100 rounded-lg gap-2">
              <Settings size={16} /> Settings
            </button>
            <button
              className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-red-100 rounded-lg gap-2"
              onClick={handleLogout}
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
