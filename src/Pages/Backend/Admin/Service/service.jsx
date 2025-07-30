import React, { useState, useContext, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../../../Components/Backend/Provider/AuthContext";

const Service = () => {
  const { user } = useContext(AuthContext);
  const [iconPreview, setIconPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    icon: null,
    title: "",
    subtitle: "",
  });

  const imageUploadUrl = useMemo(() => {
    return `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_UPLOAD_KEY}`;
  }, []);

  useEffect(() => {
    return () => {
      if (iconPreview) URL.revokeObjectURL(iconPreview);
    };
  }, [iconPreview]);

  const handleImageChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, icon: file }));
      setIconPreview(URL.createObjectURL(file));
    }
  }, []);

  const handleChange = useCallback((e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const uploadImage = async (image) => {
    try {
      const data = new FormData();
      data.append("image", image);
      const res = await axios.post(imageUploadUrl, data);
      return res.data.data.url;
    } catch (error) {
      console.error("❌ Image upload failed:", error);
      return null;
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  if (loading) return;

  const { icon, title, subtitle } = formData;

  if (!icon || !title || !subtitle || !user?.email) {
    return Swal.fire("Error", "All fields are required including user email", "error");
  }

  setLoading(true);

  try {
    const iconUrl = await uploadImage(icon);
    if (!iconUrl) throw new Error("Failed to upload image");

    const serviceData = {
      title,
      subtitle,
      iconUrl,
      email: user.email,
    };

    await axios.post("http://localhost:3000/api/services", serviceData);

    Swal.fire("✅ Success", "Service uploaded successfully", "success").then(() => {
      window.location.reload(); // ✅ Correct way to reload
    });

    // Clear form (optional if not reloading)
    setFormData({
      icon: null,
      title: "",
      subtitle: "",
    });
    setIconPreview(null);
  } catch (err) {
    console.error("❌ Service upload failed:", err);
    Swal.fire("Upload Failed", "Something went wrong. Try again.", "error");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-200 flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-3xl w-full max-w-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">Upload Your Service</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Upload Icon */}
          <div>
            <label className="block font-semibold text-gray-600 mb-2">Service Icon</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full bg-white border rounded-lg p-2"
              required
            />
            {iconPreview && (
              <img
                src={iconPreview}
                alt="Icon Preview"
                className="mt-4 h-24 w-24 object-cover rounded-full border-2 border-purple-400 shadow-md"
              />
            )}
          </div>

          {/* Title */}
          <div>
            <label className="block font-semibold text-gray-600 mb-2">Service Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter service title"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-400 focus:outline-none"
              required
            />
          </div>

          {/* Subtitle */}
          <div>
            <label className="block font-semibold text-gray-600 mb-2">Service Subtitle</label>
            <textarea
              name="subtitle"
              value={formData.subtitle}
              onChange={handleChange}
              placeholder="Write a short subtitle..."
              rows="3"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-400 focus:outline-none resize-none"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className={`bg-purple-600 text-white px-6 py-3 rounded-full font-semibold shadow-md transition-all ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-purple-700 hover:scale-105"
              }`}
            >
              {loading ? "Uploading..." : "Upload Service 🚀"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Service;
