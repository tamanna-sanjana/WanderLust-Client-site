import React, { useContext, useState } from "react";
import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  ChevronDown,
  ChevronUp,
  UserPlus,
  UserCircle,
  Hammer,
  Package,
  Shield,
  ShieldCheck,
} from "lucide-react";
import {  NavLink, useNavigate } from "react-router";
import { AuthContext } from "../../Provider/AuthContext";
import Swal from "sweetalert2";

const Sidebar = () => {
  const [userOpen, setUserOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const [serviceOpen, setServiceOpen] = useState(false);
  const [packageOpen, setPackageOpen] = useState(false);
  const [roleOpen, setRoleOpen] = useState(false);
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
    <aside className="h-full w-64 bg-gradient-to-b from-purple-900 via-indigo-800 to-teal-700 text-white border-r border-indigo-700 shadow-xl md:relative fixed z-50">
      {/* Logo */}
      <div>
        <div className="p-6 pt-20 md:pt-0 border-b border-indigo-600">
          <h1 className="text-3xl font-extrabold tracking-wide">AdminPanel 🚀</h1>
          <p className="text-sm text-indigo-300 mt-1">Creative Dashboard v1.0</p>
        </div>

        {/* Navigation */}
        <nav className="mt-6 space-y-2 px-4 font-medium text-sm">
          {/* Dashboard */}
          <NavLink
            to="/admindashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${
                isActive
                  ? "bg-indigo-700 text-white shadow"
                  : "hover:bg-indigo-600 text-indigo-200"
              }`
            }
          >
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>
          {/* User Roles Dropdown */}
          <div>
            <button
              onClick={() => setRoleOpen(!roleOpen)}
              className={`flex items-center justify-between w-full px-4 py-2 rounded-lg transition ${
                roleOpen ? "bg-indigo-700 text-white" : "hover:bg-indigo-600"
              }`}
            >
              <span className="flex items-center gap-3">
                <ShieldCheck size={18} />
                User Roles
              </span>
              {roleOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            {roleOpen && (
              <div className="ml-6 mt-2 space-y-1 text-indigo-200">
                <NavLink
                  to="roles/add"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-1 rounded text-sm ${
                      isActive
                        ? "bg-indigo-700 text-white"
                        : "hover:bg-indigo-700"
                    }`
                  }
                >
                  <Shield size={16} /> Add Role
                </NavLink>
                <NavLink
                  to="roles/all"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-1 rounded text-sm ${
                      isActive
                        ? "bg-indigo-700 text-white"
                        : "hover:bg-indigo-700"
                    }`
                  }
                >
                  <ShieldCheck size={16} /> All Roles
                </NavLink>
              </div>
            )}
          </div>

          {/* Users Dropdown */}
          <div>
            <button
              onClick={() => setUserOpen(!userOpen)}
              className={`flex items-center justify-between w-full px-4 py-2 rounded-lg transition ${
                userOpen ? "bg-indigo-700 text-white" : "hover:bg-indigo-600"
              }`}
            >
              <span className="flex items-center gap-3">
                <Users size={18} />
                Users
              </span>
              {userOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            {userOpen && (
              <div className="ml-6 mt-2 space-y-1 text-indigo-200">
                <NavLink
                  to="users/add"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-1 rounded text-sm ${
                      isActive
                        ? "bg-indigo-700 text-white"
                        : "hover:bg-indigo-700"
                    }`
                  }
                >
                  <UserPlus size={16} /> Add User
                </NavLink>
                <NavLink
                  to="users/all"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-1 rounded text-sm ${
                      isActive
                        ? "bg-indigo-700 text-white"
                        : "hover:bg-indigo-700"
                    }`
                  }
                >
                  <UserCircle size={16} /> All Users
                </NavLink>
              </div>
            )}
          </div>

          {/* Services Dropdown */}
          <div>
            <button
              onClick={() => setServiceOpen(!serviceOpen)}
              className={`flex items-center justify-between w-full px-4 py-2 rounded-lg transition ${
                serviceOpen ? "bg-indigo-700 text-white" : "hover:bg-indigo-600"
              }`}
            >
              <span className="flex items-center gap-3">
                <Hammer size={18} />
                Services
              </span>
              {serviceOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            {serviceOpen && (
              <div className="ml-6 mt-2 space-y-1 text-indigo-200">
                <NavLink
                  to="services/add"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-1 rounded text-sm ${
                      isActive
                        ? "bg-indigo-700 text-white"
                        : "hover:bg-indigo-700"
                    }`
                  }
                >
                  <Hammer size={16} /> Add Service
                </NavLink>
                <NavLink
                  to="services/all"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-1 rounded text-sm ${
                      isActive
                        ? "bg-indigo-700 text-white"
                        : "hover:bg-indigo-700"
                    }`
                  }
                >
                  <Hammer size={16} /> All Services
                </NavLink>
              </div>
            )}
          </div>

          {/* Packages Dropdown */}
          <div>
            <button
              onClick={() => setPackageOpen(!packageOpen)}
              className={`flex items-center justify-between w-full px-4 py-2 rounded-lg transition ${
                packageOpen ? "bg-indigo-700 text-white" : "hover:bg-indigo-600"
              }`}
            >
              <span className="flex items-center gap-3">
                <Package size={18} />
                Packages
              </span>
              {packageOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            {packageOpen && (
              <div className="ml-6 mt-2 space-y-1 text-indigo-200">
                <NavLink
                  to="packages/add"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-1 rounded text-sm ${
                      isActive
                        ? "bg-indigo-700 text-white"
                        : "hover:bg-indigo-700"
                    }`
                  }
                >
                  <Package size={16} /> Add Package
                </NavLink>
                <NavLink
                  to="packages/all"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-1 rounded text-sm ${
                      isActive
                        ? "bg-indigo-700 text-white"
                        : "hover:bg-indigo-700"
                    }`
                  }
                >
                  <Package size={16} /> All Packages
                </NavLink>
              </div>
            )}
          </div>

          

          {/* Settings */}
          {/* <NavLink
            to="/admin/settings"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${
                isActive
                  ? "bg-indigo-700 text-white shadow"
                  : "hover:bg-indigo-600 text-indigo-200"
              }`
            }
          >
            <Settings size={18} />
            Settings
          </NavLink> */}
        </nav>
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-indigo-600">
        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2 text-sm font-semibold text-red-300 hover:bg-red-100/10 rounded-lg transition">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
