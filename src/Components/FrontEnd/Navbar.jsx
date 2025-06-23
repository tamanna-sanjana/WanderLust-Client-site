import React, { useEffect, useState } from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { NavLink } from "react-router";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-gray-900 shadow-lg" : "bg-transparent backdrop-blur-sm"
      }`}
    >
      <nav className="navbar px-4 md:px-10 py-3 text-white font-bold">
        {/* Navbar Start */}
        <div className="navbar-start flex items-center space-x-3">
          <div className="dropdown lg:hidden">
            <button tabIndex={0} className="btn btn-ghost p-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 text-white rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/packages">Packages</NavLink>
              </li>
              <li>
                <NavLink to="/blog">Blog</NavLink>
              </li>
              <li>
                <NavLink to="/about">About</NavLink>
              </li>
              <li>
                <NavLink to="/contact">Contact</NavLink>
              </li>
              <a className="btn bg-blue-950 rounded-2xl text-xl mt-2 px-3 py-4 border-1 border-blue-900 hover:bg-cyan-900 transition">
                Book Now
              </a>
            </ul>
          </div>

          <h1 className="text-2xl md:text-3xl font-semibold rancho">WanderLust</h1>
        </div>

        {/* Navbar Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-xl">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/packages">Packages</NavLink>
            </li>
            <li>
              <NavLink to="/blog">Blog</NavLink>
            </li>
            <li>
                <NavLink to="/about">About</NavLink>
              </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
          </ul>
        </div>

        {/* Navbar End - Button */}
        <div className="navbar-end hidden lg:flex">
          <a className="btn bg-blue-950 rounded-2xl text-xl px-5 py-6 border-1 border-blue-900 hover:bg-cyan-900 transition">
            Book Now
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
