import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";

const EditPackage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    thumbnail: "",
    image1: "",
    image2: "",
    shortDescription: "",
    longDescription: "",
    createdAt: "",
    email: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/packages/${id}`);
        setFormData(res.data);
      } catch (error) {
        console.error("Failed to fetch package:", error.response?.data || error.message);
        Swal.fire("Error", "Could not load package data.", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchPackage();
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `http://localhost:3000/api/update/packages/${id}`,
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
      Swal.fire("Success", "Package updated successfully", "success");
      navigate(-1);
    } catch (error) {
      console.error("Failed to update package:", error.response?.data || error.message);
      Swal.fire("Error", error.response?.data?.message || "Update failed", "error");
    }
  };

  const handleImgError = (e) => {
    e.target.src = "https://via.placeholder.com/250x150?text=No+Image";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        <div className="text-white text-2xl font-semibold animate-pulse">
          Loading package...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white rounded-xl shadow-2xl mt-10 border border-indigo-300">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-indigo-700 tracking-wide">
        ✨ Edit Package ✨
      </h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Text fields */}
        {["title", "subtitle", "shortDescription", "longDescription"].map((field) => (
          <div key={field}>
            <label
              htmlFor={field}
              className="block text-indigo-900 font-semibold mb-2 text-lg capitalize"
            >
              {field.replace(/([A-Z])/g, " $1")}
            </label>
            {field.includes("Description") ? (
              <textarea
                id={field}
                name={field}
                rows="5"
                value={formData[field]}
                onChange={handleChange}
                className="w-full border border-indigo-400 rounded-lg px-4 py-3 shadow-md focus:outline-none focus:ring-4 focus:ring-indigo-300 transition"
                required
                placeholder={`Enter ${field}`}
              />
            ) : (
              <input
                id={field}
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full border border-indigo-400 rounded-lg px-4 py-3 shadow-md focus:outline-none focus:ring-4 focus:ring-indigo-300 transition"
                required
                placeholder={`Enter ${field}`}
              />
            )}
          </div>
        ))}

        {/* Image URL inputs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {["thumbnail", "image1", "image2"].map((field) => (
            <div key={field}>
              <label
                htmlFor={field}
                className="block text-indigo-900 font-semibold mb-2 text-lg capitalize"
              >
                {field.charAt(0).toUpperCase() + field.slice(1)} URL
              </label>
              <input
                id={field}
                type="url"
                name={field}
                placeholder={`Enter ${field} image URL`}
                value={formData[field]}
                onChange={handleChange}
                className="w-full border border-indigo-400 rounded-lg px-4 py-2 mb-3 shadow-md focus:outline-none focus:ring-4 focus:ring-indigo-300 transition"
                required
              />
              {formData[field] && (
                <img
                  src={formData[field]}
                  alt={`${field} preview`}
                  onError={handleImgError}
                  className="rounded-lg shadow-lg border border-indigo-300 object-cover"
                  style={{ width: "250px", height: "150px" }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Read-only fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-indigo-900 font-semibold mb-2 text-lg">
              Created At
            </label>
            <input
              type="text"
              value={new Date(formData.createdAt).toLocaleString()}
              readOnly
              className="w-full bg-gray-100 border border-indigo-300 rounded-lg px-4 py-2 shadow"
            />
          </div>
          <div>
            <label className="block text-indigo-900 font-semibold mb-2 text-lg">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              readOnly
              className="w-full bg-gray-100 border border-indigo-300 rounded-lg px-4 py-2 shadow"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
        >
          ✅ Update Package
        </button>
      </form>
    </div>
  );
};

export default EditPackage;
