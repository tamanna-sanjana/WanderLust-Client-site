import React, { useState } from "react";

const Service = () => {
  const [iconPreview, setIconPreview] = useState(null);
  const [formData, setFormData] = useState({
    icon: null,
    title: "",
    subtitle: "",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, icon: file });
      setIconPreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Submit logic here
    console.log(formData);
    alert("Service Uploaded!");
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
              className="bg-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-purple-700 hover:scale-105 transition-all shadow-md"
            >
              Upload Service 🚀
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Service;
