import React from "react";
import { FaUser, FaLock } from "react-icons/fa";

const Login = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: "url('https://i.ibb.co/tTy9JG8G/photo-1507525428034-b723cf961d3e.jpg')", // Place the image in /public
      }}
    >
      <div className="bg-white/20 backdrop-blur-md border border-white/30 shadow-xl p-8 rounded-2xl w-full max-w-sm text-center">
        <h2 className="text-3xl font-semibold text-black mb-6">Login Form</h2>

        <form className="space-y-4">
          {/* Username */}
          <div className="relative">
            <FaUser className="absolute top-3.5 left-3 text-gray-600" />
            <input
              type="text"
              placeholder="Username"
              className="w-full pl-10 pr-3 py-2 rounded-lg bg-white/80 text-black placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute top-3.5 left-3 text-gray-600" />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-3 py-2 rounded-lg bg-white/80 text-black placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-900 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg mt-2"
          >
            login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
