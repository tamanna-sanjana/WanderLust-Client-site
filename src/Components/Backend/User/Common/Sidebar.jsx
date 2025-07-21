import React from "react";
import {
  BookOpen,
  CreditCard,
  X,
  LayoutDashboard,
} from "lucide-react";
import { NavLink } from "react-router"; // Use 'react-router-dom' if needed

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const navItem =
    "group flex items-center gap-3 px-5 py-3 rounded-xl text-white font-medium transition-all duration-300 hover:bg-white/10 hover:scale-[1.02] hover:shadow-lg";

  const activeStyle = ({ isActive }) =>
    `${navItem} ${isActive ? "bg-white/20 shadow-inner" : ""}`;

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 z-40 transform transition-transform duration-300 md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:static md:block bg-gradient-to-br from-[#1e3a8a] via-[#7c3aed] to-[#14b8a6] p-7 shadow-[8px_0_30px_rgba(0,0,0,0.25)] rounded-tr-[2rem] rounded-br-[2rem] overflow-y-auto`}
      >
        {/* Close Button */}
        <div className="md:hidden flex justify-end mb-6">
          <button onClick={toggleSidebar} className="text-white hover:scale-110 transition">
            <X size={28} />
          </button>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-extrabold text-white mb-12 text-center tracking-wide drop-shadow-md">
        User Dashboard
        </h2>

        {/* Navigation */}
        <nav className="flex flex-col gap-5">
          <NavLink to="/userdashboard" className={activeStyle}>
            <LayoutDashboard size={22} className="group-hover:text-yellow-300 transition" />
            <span className="group-hover:text-yellow-300 transition">Dashboard</span>
          </NavLink>

          <NavLink to="book-history" className={activeStyle}>
            <BookOpen size={22} className="group-hover:text-pink-300 transition" />
            <span className="group-hover:text-pink-300 transition">Book History</span>
          </NavLink>

          <NavLink to="payment-history" className={activeStyle}>
            <CreditCard size={22} className="group-hover:text-lime-300 transition" />
            <span className="group-hover:text-lime-300 transition">Payment History</span>
          </NavLink>
        </nav>
      </aside>

      {/* Backdrop for Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;
