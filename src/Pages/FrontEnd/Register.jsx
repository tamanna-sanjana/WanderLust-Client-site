import React from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import Lottie from "lottie-react";
import travelAnimation from "../../../public/travel-lottie.json"; // Update path if needed
import { NavLink } from "react-router";

const Register = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col md:flex-row items-center justify-center px-4"
      style={{
        backgroundImage:
          "url('https://i.ibb.co/tTy9JG8G/photo-1507525428034-b723cf961d3e.jpg')",
      }}
    >
     {/* Overlay for blur and color filter */}
      <div className="absolute inset-0 bg-opacity-40 backdrop-blur-sm z-0" />
      {/* Register Form */}
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-xl p-8 w-full max-w-sm  text-center z-10">
        <h2 className="text-3xl font-bold mb-6 text-blue-950 drop-shadow-md">
          Join WanderLust
        </h2>

        <form className="space-y-4 text-left">
          {/* Full Name */}
          <div className="relative">
            <FaUser className="absolute top-3.5 left-3 text-gray/70" />
            <input
              type="text"
              placeholder="Full Name"
              className="w-full pl-10 pr-3 py-2 rounded-lg bg-white/20 text-blue-950 placeholder-gray/80 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Email */}
          <div className="relative">
            <FaEnvelope className="absolute top-3.5 left-3 text-gray/70" />
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-10 pr-3 py-2 rounded-lg bg-white/20 text-blue-950 placeholder-gray/80 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute top-3.5 left-3 text-gray/70" />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-3 py-2 rounded-lg bg-white/20 text-blue-950 placeholder-gray/80 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <FaLock className="absolute top-3.5 left-3 text-gray/70" />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full pl-10 pr-3 py-2 rounded-lg bg-white/20 text-blue-950 placeholder-gray/80 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-900 hover:bg-blue-700 transition-all text-white font-semibold py-2 rounded-lg mt-4"
          >
            Register
          </button>
        </form>
        <p className="text-center text-sm text-gray mt-4">
          Already have an account?{" "}
          <NavLink
            to="/login"
            className="text-blue-950 font-semibold hover:underline"
          >
            Login here
          </NavLink>
        </p>
      </div>

      {/* Lottie Animation */}
      <div className="hidden md:flex md:w-1/2 justify-center items-center z-10 mt-10 md:mt-0">
        <Lottie animationData={travelAnimation} loop={true} className="w-[90%] max-w-md" />
      </div>
    </div>
  );
};

export default Register;
