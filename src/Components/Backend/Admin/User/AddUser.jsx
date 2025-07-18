import React, { useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "../../../../../public/Login animation.json";

const AddUser = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userRole: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = "Full Name is required";
    if (!formData.email) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      errs.email = "Email is invalid";
    if (!formData.password) errs.password = "Password is required";
    else if (formData.password.length < 6)
      errs.password = "Password must be at least 6 characters";
    if (formData.confirmPassword !== formData.password)
      errs.confirmPassword = "Passwords do not match";
    if (!formData.userRole) errs.userRole = "User Role is required";
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      alert("✅ User Created Successfully!");
      console.log(formData);
      // Your backend POST logic here
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 to-indigo-200 p-6 pb-15">
      <Player
        autoplay
        loop
        src={animationData}
        style={{ height: 200, width: 200 }}
      />

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">
          Create New User
        </h2>

        {/* Full Name */}
        <label className="block mb-1 font-semibold text-indigo-600" htmlFor="fullName">
          Full Name
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          placeholder="John Doe"
          value={formData.fullName}
          onChange={handleChange}
          className={`w-full px-4 py-2 mb-2 border rounded-md focus:outline-none focus:ring-2 transition ${
            errors.fullName ? "border-red-500 focus:ring-red-400" : "border-indigo-300 focus:ring-indigo-400"
          }`}
        />
        {errors.fullName && (
          <p className="text-red-500 text-sm mb-2">{errors.fullName}</p>
        )}

        {/* Email */}
        <label className="block mb-1 font-semibold text-indigo-600" htmlFor="email">
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="john@example.com"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-2 mb-2 border rounded-md focus:outline-none focus:ring-2 transition ${
            errors.email ? "border-red-500 focus:ring-red-400" : "border-indigo-300 focus:ring-indigo-400"
          }`}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mb-2">{errors.email}</p>
        )}

        {/* Password */}
        <label className="block mb-1 font-semibold text-indigo-600" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
          className={`w-full px-4 py-2 mb-2 border rounded-md focus:outline-none focus:ring-2 transition ${
            errors.password ? "border-red-500 focus:ring-red-400" : "border-indigo-300 focus:ring-indigo-400"
          }`}
        />
        {errors.password && (
          <p className="text-red-500 text-sm mb-2">{errors.password}</p>
        )}

        {/* Confirm Password */}
        <label className="block mb-1 font-semibold text-indigo-600" htmlFor="confirmPassword">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="Re-enter password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className={`w-full px-4 py-2 mb-2 border rounded-md focus:outline-none focus:ring-2 transition ${
            errors.confirmPassword ? "border-red-500 focus:ring-red-400" : "border-indigo-300 focus:ring-indigo-400"
          }`}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mb-2">{errors.confirmPassword}</p>
        )}

        {/* User Role */}
        <label className="block mb-1 font-semibold text-indigo-600" htmlFor="userRole">
          Select Role
        </label>
        <select
          id="userRole"
          name="userRole"
          value={formData.userRole}
          onChange={handleChange}
          className={`w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 transition ${
            errors.userRole ? "border-red-500 focus:ring-red-400" : "border-indigo-300 focus:ring-indigo-400"
          }`}
        >
          <option value="">-- Select Role --</option>
          <option value="admin">Admin</option>
          <option value="moderator">Moderator</option>
          <option value="member">Member</option>
        </select>
        {errors.userRole && (
          <p className="text-red-500 text-sm mb-4">{errors.userRole}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          Create User
        </button>
      </form>
    </div>
  );
};

export default AddUser;
