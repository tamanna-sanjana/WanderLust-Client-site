import React, { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { motion, AnimatePresence } from "framer-motion";

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
    <AnimatePresence>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -80, opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className={` top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "shadow-lg"
            : "bg-transparent backdrop-blur-md"
        }`}
      >
        <nav className="navbar px-4 md:px-10 py-3 text-white">
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
                className="menu menu-sm dropdown-content bg-gray-800 text-white rounded-box z-10 mt-3 w-52 p-2 shadow-lg"
              >
                <li>
                  <NavLink to="/">Home</NavLink>
                </li>
                <li>
                  <NavLink to="/About">About</NavLink>
                </li>
                <li>
                  <NavLink to="/Service">Services</NavLink>
                </li>
                <li>
                  <a>Packages</a>
                </li>
                <li>
                  <a>Blog</a>
                </li>
                <li>
                  <a>Contact</a>
                </li>
              </ul>
            </div>
            <h1 className="text-2xl md:text-3xl font-semibold rancho tracking-wide">
              WanderLust
            </h1>
          </div>

          {/* Navbar Center */}
          <motion.div
            className="navbar-center hidden lg:flex"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <ul className="menu menu-horizontal px-1 text-lg space-x-3">
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/About">About</NavLink>
              </li>
              <li>
                <NavLink to="/Service">Services</NavLink>
              </li>
              <li>
                <a>Packages</a>
              </li>
              <li>
                <a>Blog</a>
              </li>
              <li>
                <a>Contact</a>
              </li>
            </ul>
          </motion.div>

          {/* Navbar End - Book Now Button with heart animation */}
          <motion.div
            className="navbar-end"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <a className="btn bg-blue-950 rounded-2xl text-lg px-6 py-2 border border-blue-900 hover:bg-cyan-900 transition-all duration-300 flex items-center gap-2">
                <span>Book Now</span>✈️
              </a>
            </motion.span>
          </motion.div>
        </nav>
      </motion.header>
    </AnimatePresence>
  );
};

export default Navbar;
