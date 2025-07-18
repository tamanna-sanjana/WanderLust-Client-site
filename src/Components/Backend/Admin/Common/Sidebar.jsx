import React, { useState } from "react";
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
} from "lucide-react";
import { NavLink } from "react-router";

const Sidebar = () => {
  const [userOpen, setUserOpen] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);
  const [packageOpen, setPackageOpen] = useState(false);

  return (
    <aside className="h-screen w-64 bg-gradient-to-b from-purple-900 via-indigo-800 to-teal-700 text-white border-r border-indigo-700 shadow-xl fixed left-0 top-0 flex flex-col justify-between">
      {/* Logo */}
      <div>
        <div className="p-6 border-b border-indigo-600">
          <h1 className="text-3xl font-extrabold tracking-wide">AdminPanel 🚀</h1>
          <p className="text-sm text-indigo-300 mt-1">Creative Dashboard v1.0</p>
        </div>

        {/* Navigation */}
        <nav className="mt-6 space-y-2 px-4 font-medium text-sm">
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

          {/* User Dropdown */}
          <div>
            <button
              onClick={() => setUserOpen(!userOpen)}
              className="flex items-center justify-between w-full px-4 py-2 rounded-lg hover:bg-indigo-600 transition"
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
                  className="flex items-center gap-2 px-3 py-1 rounded hover:bg-indigo-700 text-sm"
                >
                  <UserPlus size={16} /> Add User
                </NavLink>
                <NavLink
                  to="/admin/users/all"
                  className="flex items-center gap-2 px-3 py-1 rounded hover:bg-indigo-700 text-sm"
                >
                  <UserCircle size={16} /> All Users
                </NavLink>
              </div>
            )}
          </div>

          {/* Service Dropdown */}
          <div>
            <button
              onClick={() => setServiceOpen(!serviceOpen)}
              className="flex items-center justify-between w-full px-4 py-2 rounded-lg hover:bg-indigo-600 transition"
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
                  to="/admin/services/add"
                  className="flex items-center gap-2 px-3 py-1 rounded hover:bg-indigo-700 text-sm"
                >
                  <Hammer size={16} /> Add Service
                </NavLink>
                <NavLink
                  to="/admin/services/all"
                  className="flex items-center gap-2 px-3 py-1 rounded hover:bg-indigo-700 text-sm"
                >
                  <Hammer size={16} /> All Services
                </NavLink>
              </div>
            )}
          </div>

          {/* Package Dropdown */}
          <div>
            <button
              onClick={() => setPackageOpen(!packageOpen)}
              className="flex items-center justify-between w-full px-4 py-2 rounded-lg hover:bg-indigo-600 transition"
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
                  to="/admin/packages/add"
                  className="flex items-center gap-2 px-3 py-1 rounded hover:bg-indigo-700 text-sm"
                >
                  <Package size={16} /> Add Package
                </NavLink>
                <NavLink
                  to="/admin/packages/all"
                  className="flex items-center gap-2 px-3 py-1 rounded hover:bg-indigo-700 text-sm"
                >
                  <Package size={16} /> All Packages
                </NavLink>
              </div>
            )}
          </div>

          {/* Settings */}
          <NavLink
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
          </NavLink>
        </nav>
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-indigo-600">
        <button className="w-full flex items-center gap-3 px-4 py-2 text-sm font-semibold text-red-300 hover:bg-red-100/10 rounded-lg transition">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
