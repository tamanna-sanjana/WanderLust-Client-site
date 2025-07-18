import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router";
import Lottie from "lottie-react";
import animationData from "../../../../public/login.json";

export default function Register() {
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPhotoPreview(null);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    console.log({ ...formData, photo });
    // handle your register logic here
  };

  const handleGoogleRegister = () => {
    // Google register logic
    console.log("Google Register");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-3xl grid md:grid-cols-2 w-full max-w-6xl overflow-hidden">
        {/* Lottie Animation */}
        <div className="hidden md:flex items-center justify-center bg-gradient-to-r from-indigo-300 to-purple-400 p-8">
          <Lottie animationData={animationData} loop={true} className="w-96 h-96" />
        </div>

        {/* Registration Form */}
        <div className="p-8 sm:p-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Create an Account 🎉</h2>

          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                placeholder="Email address"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                placeholder="Create password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                placeholder="Confirm password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Upload Profile Photo</label>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="mb-2"
              />
              {photoPreview && (
                <img
                  src={photoPreview}
                  alt="Preview"
                  className="w-24 h-24 rounded-full object-cover border border-gray-300 shadow-md"
                />
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 shadow-md"
            >
              Register
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-500 mb-3">Or register with</p>
            <button
              onClick={handleGoogleRegister}
              className="flex items-center justify-center gap-2 w-full bg-white text-gray-700 border border-gray-300 py-2 px-4 rounded-lg shadow hover:shadow-md transition duration-300"
            >
              <FcGoogle size={24} />
              <span>Continue with Google</span>
            </button>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?
            <Link to="/login" className="text-indigo-500 hover:underline ml-1">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
