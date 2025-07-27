import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router";
import { AuthContext } from "../../Components/Backend/Provider/AuthContext";
import { useNavigate } from "react-router";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAvatarClick = () => {
    setShowLogout((prev) => !prev);
  };
 // Redirect based on user role
  const handleDashboardRedirect = () => {
    const role = localStorage.getItem("role");
    if (role === "admin") {
      navigate("/adminDashboard");
    } else if(role === "member") {
      navigate("/moderatordashboard");
    }
    else{
      navigate("/userdashboard");
    }
  };
  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-gray-900 shadow-lg" : "bg-transparent backdrop-blur-sm"
      }`}
    >
      <nav className="navbar px-4 md:px-10 py-3 text-white font-bold flex justify-between items-center">
        {/* Logo and Mobile Menu */}
        <div className="flex items-center space-x-3">
          <div className="dropdown lg:hidden">
            <button tabIndex={0} className="btn btn-ghost p-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 text-white rounded-box z-10 mt-3 w-52 p-2 shadow"
            >
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/packages">Packages</NavLink></li>
              <li><NavLink to="/blog">Blog</NavLink></li>
              <li><NavLink to="/about">About</NavLink></li>
              <li><NavLink to="/contact">Contact</NavLink></li>
              <li>
                <NavLink
                  to="/booking"
                  className="btn bg-blue-950 rounded-2xl text-xl mt-2 px-3 py-2 hover:bg-cyan-900 transition"
                >
                  Book Now
                </NavLink>
              </li>
            </ul>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold">WanderLust</h1>
        </div>

        {/* Center Nav Menu */}
        <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2">
          <ul className="menu menu-horizontal px-1 text-xl">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/packages">Packages</NavLink></li>
            <li><NavLink to="/blog">Blog</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
          </ul>
        </div>

        {/* Right Side: Avatar or Login/Register */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="relative group">
              <div
                tabIndex={0}
                className="avatar cursor-pointer"
                onClick={handleAvatarClick}
              >
                <div className="w-10 rounded-full ring ring-blue-700 ring-offset-2 ring-offset-green-100">
                  <img
                    alt="User Avatar"
                    src={user?.photoURL}
                  />
                </div>
              </div>

              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-blue-900 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20 whitespace-nowrap">
                {user.displayName || "User"}
              </div>

              {showLogout && (
                <ul className="absolute top-14 right-0 bg-white text-blue-950 text-sm rounded shadow-lg z-30 w-40">
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleDashboardRedirect}>
                    Dashboard
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleLogout}>
                    Logout
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <div className="flex gap-2">
              <NavLink
                to="/login"
                className="bg-white text-blue-800 px-4 py-1.5 rounded-xl font-semibold hover:bg-gray-100 transition"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="bg-blue-700 text-white px-4 py-1.5 rounded-xl font-semibold hover:bg-blue-800 transition"
              >
                Register
              </NavLink>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
