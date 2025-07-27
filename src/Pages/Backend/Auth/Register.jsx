import React, { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router"; // Fixed import
import Lottie from "lottie-react";
import animationData from "../../../../public/login.json";
import { AuthContext } from "../../../Components/Backend/Provider/AuthContext";
import { signInWithPopup, updateProfile } from "firebase/auth";
import axios from "axios";
import { auth } from "../../../Components/Backend/Provider/firebase.init";
import Swal from "sweetalert2";

export default function Register() {
  const { GoogleProvider, register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    thumbnail: null,
  });

  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "thumbnail" && files && files.length > 0) {
      const file = files[0];
      setForm((prev) => ({ ...prev, thumbnail: file }));
      setPreview(URL.createObjectURL(file));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Full name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";

    const passwordErrors = [];
    if (form.password.length < 8) passwordErrors.push("At least 8 characters.");
    if (!/[A-Z]/.test(form.password)) passwordErrors.push("Include an uppercase letter.");
    if (!/[a-z]/.test(form.password)) passwordErrors.push("Include a lowercase letter.");
    if (!/[0-9]/.test(form.password)) passwordErrors.push("Include a number.");
    if (!/[!@#$%^&*]/.test(form.password)) passwordErrors.push("Include a special character.");
    if (passwordErrors.length > 0) newErrors.password = passwordErrors.join(" ");

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const uploadImage = async (image) => {
    try {
      const formData = new FormData();
      formData.append("image", image);
      const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_UPLOAD_KEY}`;
      const response = await axios.post(imageUploadUrl, formData);
      return response.data.data.url;
    } catch (err) {
      console.error("Image upload failed:", err);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    try {
      const result = await register(form.email, form.password);
      const user = result.user;

      let uploadedImageUrl = "https://i.ibb.co/2M4C3BJ/default-avatar.png";
      if (form.thumbnail) {
        const uploadedUrl = await uploadImage(form.thumbnail);
        if (uploadedUrl) uploadedImageUrl = uploadedUrl;
      }

      await Promise.all([
        updateProfile(user, {
          displayName: form.name,
          photoURL: uploadedImageUrl,
        }),
        fetch("http://localhost:3000/adduser", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            photoURL: uploadedImageUrl,
            role: "user",
          }),
        }),
      ]);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Registration Successful!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.message || "Something went wrong!",
      });
    }
  };

const handleGoogleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, GoogleProvider);
    const user = result.user;

    const userData = {
      name: user.displayName,
      email: user.email,
      role: "user",
      photoURL: user?.photoURL || "https://i.ibb.co/2M4C3BJ/default-avatar.png",
    };

    // Upsert user info to backend
    await axios.post("http://localhost:3000/adduser", userData);

    // Get Firebase token and check role
    const token = await user.getIdToken();
    const roleResponse = await axios.post(
      "http://localhost:3000/check-role",
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const role = roleResponse.data?.role || "user";
    localStorage.setItem("role", role);

    Swal.fire({
      icon: "success",
      title: "Google Registration Successful",
      timer: 1500,
      showConfirmButton: false,
    }).then(() => navigate("/")  );
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Google Login Failed",
      text: error.message,
    });
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-3xl grid md:grid-cols-2 w-full max-w-6xl overflow-hidden">
        <div className="hidden md:flex items-center justify-center bg-gradient-to-r from-indigo-300 to-purple-400 p-8">
          <Lottie animationData={animationData} loop={true} className="w-96 h-96" />
        </div>

        <div className="p-8 sm:p-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Create an Account 🎉</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                placeholder="Your full name"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                placeholder="Email address"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                placeholder="Create password"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                placeholder="Confirm password"
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Upload Profile Photo</label>
              <input
                type="file"
                accept="image/*"
                name="thumbnail"
                onChange={handleChange}
                className="mb-2"
              />
              {preview && (
                <img
                  src={preview}
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
              onClick={handleGoogleLogin}
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