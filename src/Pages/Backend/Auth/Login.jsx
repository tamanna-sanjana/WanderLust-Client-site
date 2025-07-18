import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router";
import Lottie from "lottie-react";
import animationData from "../../../../public/login.json";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleGoogleLogin = () => {
    // Google sign-in logic here
    console.log("Google Login");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log({ email, password });
    // handle login logic
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 to-purple-200 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl grid md:grid-cols-2 w-full max-w-5xl overflow-hidden">
        {/* Animation */}
        <div className="hidden md:flex items-center justify-center bg-gradient-to-r from-indigo-300 to-purple-400">
          <Lottie animationData={animationData} loop={true} className="w-96 h-96" />
        </div>

        {/* Login Form */}
        <div className="p-8 sm:p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Welcome Back 👋</h2>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-300"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-300"
                placeholder="Enter your password"
              />
              <div className="text-right mt-1">
                <Link to="/forgot-password" className="text-sm text-indigo-500 hover:underline">
                  Forgot password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 shadow-md"
            >
              Login
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-500 mb-3">Or continue with</p>
            <button
              onClick={handleGoogleLogin}
              className="flex items-center justify-center gap-2 w-full bg-white text-gray-700 border border-gray-300 py-2 px-4 rounded-lg shadow hover:shadow-md transition duration-300"
            >
              <FcGoogle size={24} />
              <span>Continue with Google</span>
            </button>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don’t have an account?
            <Link to="/register" className="text-indigo-500 hover:underline ml-1">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
