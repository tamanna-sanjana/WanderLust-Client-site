import React, { useState, useEffect, useContext } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "../../../../../public/Login animation.json";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthContext";
import { auth } from "../../Provider/firebase.init";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const AddUser = () => {
  const { createUserWithEmailAndPassword: createCustomUser } = useContext(AuthContext);
  const [roles, setRoles] = useState([]);
  const [preview, setPreview] = useState({});
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userRole: "",
    thumbnail: null,
  });

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const { data } = await axios.get("https://wander-lust-server-site.vercel.app/api/roles");
        setRoles(data);
      } catch (error) {
        console.error("❌ Failed to fetch roles:", error);
      }
    };
    fetchRoles();
  }, []);

  const validateForm = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = "Full Name is required";
    if (!formData.email) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = "Email is invalid";
    if (!formData.password) errs.password = "Password is required";
    else if (formData.password.length < 6) errs.password = "Password must be at least 6 characters";
    if (formData.confirmPassword !== formData.password) errs.confirmPassword = "Passwords do not match";
    if (!formData.userRole) errs.userRole = "User Role is required";
    return errs;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "thumbnail" && files?.length > 0) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, thumbnail: file }));
      setPreview({ thumbnail: URL.createObjectURL(file) });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const uploadImage = async (image) => {
    try {
      const imgData = new FormData();
      imgData.append("image", image);
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_UPLOAD_KEY}`,
        imgData
      );
      return res.data.data.url;
    } catch (err) {
      console.error("❌ Image upload failed:", err);
      return null;
    }
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    try {
      // Step 1: Register user in Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      // Step 2: Upload profile picture (optional)
      let uploadedImageUrl = "https://i.ibb.co/2M4C3BJ/default-avatar.png";
      if (formData.thumbnail) {
        const imgUrl = await uploadImage(formData.thumbnail);
        if (imgUrl) uploadedImageUrl = imgUrl;
      }

      // Step 3: Update Firebase user profile
      await updateProfile(user, {
        displayName: formData.fullName,
        photoURL: uploadedImageUrl,
      });

      // Step 4: Save user to backend
      await axios.post("https://wander-lust-server-site.vercel.app/adduser", {
        name: formData.fullName,
        email: formData.email,
        photoURL: uploadedImageUrl,
        role: formData.userRole,
      });

      // Step 5: Show success message
      Swal.fire({
        icon: "success",
        title: "User Created!",
        text: "User registered successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      // Step 6: Reload the page
      window.location.reload();
    } catch (error) {
      console.error("❌ Registration Error:", error.message);
      Swal.fire({
        icon: "error",
        title: "Failed to Register",
        text: error.message,
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 to-indigo-200 p-6 pb-15">
      <Player autoplay loop src={animationData} style={{ height: 200, width: 200 }} />
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">Create New User</h2>

        {/* Full Name */}
        <label className="block mb-1 font-semibold text-indigo-600">Full Name</label>
        <input
          name="fullName"
          type="text"
          placeholder="John Doe"
          value={formData.fullName}
          onChange={handleChange}
          className={`w-full px-4 py-2 mb-2 border rounded-md ${
            errors.fullName ? "border-red-500" : "border-indigo-300"
          }`}
        />
        {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}

        {/* Email */}
        <label className="block mb-1 font-semibold text-indigo-600">Email</label>
        <input
          name="email"
          type="email"
          placeholder="john@example.com"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-2 mb-2 border rounded-md ${
            errors.email ? "border-red-500" : "border-indigo-300"
          }`}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

        {/* Password */}
        <label className="block mb-1 font-semibold text-indigo-600">Password</label>
        <input
          name="password"
          type="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
          className={`w-full px-4 py-2 mb-2 border rounded-md ${
            errors.password ? "border-red-500" : "border-indigo-300"
          }`}
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

        {/* Confirm Password */}
        <label className="block mb-1 font-semibold text-indigo-600">Confirm Password</label>
        <input
          name="confirmPassword"
          type="password"
          placeholder="Re-enter password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className={`w-full px-4 py-2 mb-2 border rounded-md ${
            errors.confirmPassword ? "border-red-500" : "border-indigo-300"
          }`}
        />
        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}

        {/* Profile Picture */}
        <label className="block text-sm font-semibold text-indigo-600">Profile Picture</label>
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
          <label
            htmlFor="thumbnail"
            className="cursor-pointer w-32 h-32 border-2 border-dashed border-teal-600 rounded-full flex justify-center items-center overflow-hidden"
          >
            {preview.thumbnail ? (
              <img src={preview.thumbnail} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <span className="text-sm text-teal-800 text-center p-2">Click to Upload</span>
            )}
            <input
              type="file"
              id="thumbnail"
              name="thumbnail"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
            />
          </label>
          {formData.thumbnail && <p className="text-sm text-gray-500">{formData.thumbnail.name}</p>}
        </div>

        {/* User Role */}
        <label className="block mb-1 font-semibold text-indigo-600">Select Role</label>
        <select
          name="userRole"
          value={formData.userRole}
          onChange={handleChange}
          className={`w-full px-4 py-2 mb-4 border rounded-md ${
            errors.userRole ? "border-red-500" : "border-indigo-300"
          }`}
        >
          <option value="">-- Select Role --</option>
          {roles.length > 0 ? (
            roles.map((item, i) => (
              <option key={i} value={item.role}>
                {item.role}
              </option>
            ))
          ) : (
            <option disabled>Loading roles...</option>
          )}
        </select>
        {errors.userRole && <p className="text-red-500 text-sm mb-2">{errors.userRole}</p>}

        {/* Submit */}
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
