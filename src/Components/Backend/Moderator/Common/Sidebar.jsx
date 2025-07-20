import React, { useState } from "react";
import {
  LayoutDashboard,
  ChevronDown,
  ChevronUp,
  PlusCircle,
  List,
  BookOpen,
  Layers,
  FileText,
  Box,
  X,
} from "lucide-react";
import { NavLink } from "react-router";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const menuItemClass =
    "flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-white/20 hover:text-white text-white transition duration-300";

  const dropdownClass = "pl-8 text-sm space-y-1";

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 z-40 transform transition-transform duration-300 md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:static md:block bg-gradient-to-b from-indigo-600 via-purple-600 to-teal-200 p-6 shadow-2xl`}
      >
        {/* Close Button (mobile only) */}
        <div className="md:hidden flex justify-end mb-4">
          <button onClick={toggleSidebar} className="text-white">
            <X size={24} />
          </button>
        </div>

        <h2 className="text-2xl font-bold text-white mb-8 text-center drop-shadow-lg">
          Moderator Panel
        </h2>

        <nav className="space-y-2">
          <NavLink to="/moderatordashboard" className={menuItemClass}>
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>

          {/* Service Dropdown */}
          <div>
            <button
              onClick={() => toggleDropdown("service")}
              className={`${menuItemClass} w-full justify-between`}
            >
              <span className="flex items-center gap-2">
                <Layers size={20} />
                Service
              </span>
              {openDropdown === "service" ? <ChevronUp /> : <ChevronDown />}
            </button>
            {openDropdown === "service" && (
              <div className={dropdownClass}>
                <NavLink to="service/add" className={menuItemClass}>
                  <PlusCircle size={16} />
                  Add Service
                </NavLink>
                <NavLink to="service/all" className={menuItemClass}>
                  <List size={16} />
                  All Services
                </NavLink>
              </div>
            )}
          </div>

          {/* Package Dropdown */}
          <div>
            <button
              onClick={() => toggleDropdown("package")}
              className={`${menuItemClass} w-full justify-between`}
            >
              <span className="flex items-center gap-2">
                <Box size={20} />
                Package
              </span>
              {openDropdown === "package" ? <ChevronUp /> : <ChevronDown />}
            </button>
            {openDropdown === "package" && (
              <div className={dropdownClass}>
                <NavLink to="package/add" className={menuItemClass}>
                  <PlusCircle size={16} />
                  Add Package
                </NavLink>
                <NavLink to="package/all" className={menuItemClass}>
                  <List size={16} />
                  All Packages
                </NavLink>
              </div>
            )}
          </div>

          {/* Blog Dropdown */}
          <div>
            <button
              onClick={() => toggleDropdown("blog")}
              className={`${menuItemClass} w-full justify-between`}
            >
              <span className="flex items-center gap-2">
                <FileText size={20} />
                Blog
              </span>
              {openDropdown === "blog" ? <ChevronUp /> : <ChevronDown />}
            </button>
            {openDropdown === "blog" && (
              <div className={dropdownClass}>
                <NavLink to="blog/add" className={menuItemClass}>
                  <PlusCircle size={16} />
                  Add Blog
                </NavLink>
                <NavLink to="/moderator/blog/all" className={menuItemClass}>
                  <List size={16} />
                  All Blogs
                </NavLink>
              </div>
            )}
          </div>

          <NavLink to="/moderator/book-history" className={menuItemClass}>
            <BookOpen size={20} />
            Book History
          </NavLink>
        </nav>
      </div>

      {/* Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;
