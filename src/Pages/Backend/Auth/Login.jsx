import React, { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import Lottie from "lottie-react";
import animationData from "../../../../public/login.json";
import Swal from "sweetalert2";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { AuthContext } from "../../../Components/Backend/Provider/AuthContext";
import { auth } from "../../../Components/Backend/Provider/firebase.init";

export default function Login() {
  const { login ,GoogleProvider} = useContext(AuthContext);
  const navigate = useNavigate();

  // ✅ Email/Password Login
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const result = await login(email, password);
      const user = result.user;
      const token = await user.getIdToken();

      // ✅ Get role
      const roleResponse = await axios.post(
        "http://localhost:3000/check-role",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const userRole = roleResponse.data?.role || "user";
      localStorage.setItem("role", userRole);

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        navigate(
  userRole === "admin"
    ? "/adminDashboard"
    : userRole === "member"
    ? "/memberDashboard"
    : "/userDashboard"
);

      });
    } catch (error) {
      console.error("Login Failed:", error);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.response?.data?.message || error.message,
      });
    }
  };

const handleGoogleLogin = async () => {

  try {
    const result = await signInWithPopup(auth, GoogleProvider);
    const user = result.user;
    const token = await user.getIdToken();

    // ✅ Save or update user in DB
    await axios.post(
      "http://localhost:3000/adduser",
      {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL || "https://i.ibb.co/2M4C3BJ/default-avatar.png",
        role: "user", // default role
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // ✅ Fetch user role
    const roleRes = await axios.post(
      "http://localhost:3000/check-role",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const role = roleRes.data?.role || "user";
    localStorage.setItem("role", role);

    Swal.fire({
      icon: "success",
      title: "Login Successful",
      timer: 1500,
      showConfirmButton: false,
    }).then(() => {
      if (role === "admin") navigate("/adminDashboard");
      else if (role === "member") navigate("/moderatordashboard");
      else navigate("/userdashboard");
    });
  } catch (error) {
    console.error("Login failed", error);
    Swal.fire({
      icon: "error",
      title: "Login Failed",
      text: error.message,
    });
  }
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

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-300"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
              <input
                type="password"
                name="password"
                required
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
