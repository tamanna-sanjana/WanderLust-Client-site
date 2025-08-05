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
  FileText,
  Compass,
  ChartPie
} from "lucide-react";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../../Provider/AuthContext";
import Swal from "sweetalert2";

const Sidebar = () => {
  const [userOpen, setUserOpen] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);
  const [packageOpen, setPackageOpen] = useState(false);
  const [blogOpen, setBlogOpen] = useState(false);
  const [roleOpen, setRoleOpen] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const [PaymentOpen, setpaymentOpen] = useState(false);

  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

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

          {/* User Roles */}
          <Dropdown
            title="User Roles"
            icon={<ShieldCheck size={18} />}
            isOpen={roleOpen}
            setIsOpen={setRoleOpen}
            links={[
              { to: "roles/add", label: "Add Role", icon: <Shield size={16} /> },
              { to: "roles/all", label: "All Roles", icon: <ShieldCheck size={16} /> },
            ]}
          />

          {/* Users */}
          <Dropdown
            title="Users"
            icon={<Users size={18} />}
            isOpen={userOpen}
            setIsOpen={setUserOpen}
            links={[
              { to: "users/add", label: "Add User", icon: <UserPlus size={16} /> },
              { to: "users/all", label: "All Users", icon: <UserCircle size={16} /> },
            ]}
          />

          {/* Services */}
          <Dropdown
            title="Services"
            icon={<Hammer size={18} />}
            isOpen={serviceOpen}
            setIsOpen={setServiceOpen}
            links={[
              { to: "services/add", label: "Add Service", icon: <Hammer size={16} /> },
              { to: "services/all", label: "All Services", icon: <Hammer size={16} /> },
            ]}
          />

          {/* Packages */}
          <Dropdown
            title="Packages"
            icon={<Package size={18} />}
            isOpen={packageOpen}
            setIsOpen={setPackageOpen}
            links={[
              { to: "packages/add", label: "Add Package", icon: <Package size={16} /> },
              { to: "packages/all", label: "All Packages", icon: <Package size={16} /> },
            ]}
          />

          {/* Blog */}
          <Dropdown
            title="Blog"
            icon={<FileText size={18} />}
            isOpen={blogOpen}
            setIsOpen={setBlogOpen}
            links={[
              { to: "blog/add", label: "Add Blog", icon: <FileText size={16} /> },
              { to: "blog/all", label: "All Blogs", icon: <FileText size={16} /> },
            ]}
          />

          {/* Guides */}
          <Dropdown
            title="Guide"
            icon={<Compass size={18} />}
            isOpen={guideOpen}
            setIsOpen={setGuideOpen}
            links={[
              { to: "guide/add", label: "Add Guide", icon: <FileText size={16} /> },
              { to: "guide/all", label: "All Guides", icon: <FileText size={16} /> },
            ]}
          />
          {/* Booking and Payment Integration */}
          <Dropdown
            title="Booking & Payment"
            icon={<ChartPie size={18} />}
            isOpen={PaymentOpen}
            setIsOpen={setpaymentOpen}
            links={[
              { to: "booking", label: "Booking", icon: <FileText size={16} /> },
              { to: "payment", label: "Payment", icon: <FileText size={16} /> },
            ]}
          />
        </nav>
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-indigo-600">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2 text-sm font-semibold text-red-300 hover:bg-red-100/10 rounded-lg transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};

// ✅ Reusable Dropdown Component
const Dropdown = ({ title, icon, isOpen, setIsOpen, links }) => (
  <div>
    <button
      onClick={() => setIsOpen(!isOpen)}
      className={`flex items-center justify-between w-full px-4 py-2 rounded-lg transition ${
        isOpen ? "bg-indigo-700 text-white" : "hover:bg-indigo-600 text-indigo-200"
      }`}
    >
      <span className="flex items-center gap-3">{icon} {title}</span>
      {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
    </button>
    {isOpen && (
      <div className="ml-6 mt-2 space-y-1 text-indigo-200">
        {links.map(({ to, label, icon }, idx) => (
          <NavLink
            key={idx}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-1 rounded text-sm ${
                isActive ? "bg-indigo-700 text-white" : "hover:bg-indigo-700"
              }`
            }
          >
            {icon} {label}
          </NavLink>
        ))}
      </div>
    )}
  </div>
);

export default Sidebar;
