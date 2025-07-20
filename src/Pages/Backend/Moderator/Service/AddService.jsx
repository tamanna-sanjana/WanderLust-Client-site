import React, { useState } from "react";

const AddService = () => {
  const [formData, setFormData] = useState({
    icon: null,
    title: "",
    subtitle: "",
  });
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "icon" && files.length > 0) {
      const file = files[0];
      setFormData({ ...formData, icon: file });

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 👉 You can send formData using FormData API to backend here
    console.log(formData);
    alert("Service added successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 to-purple-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-xl">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          Add New Service
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Icon Upload */}
          <div className="flex flex-col items-center gap-3">
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="w-24 h-24 object-cover rounded-full shadow-md"
              />
            ) : (
              <div className="w-24 h-24 flex items-center justify-center border border-dashed border-gray-400 rounded-full text-sm text-gray-500">
                No Icon
              </div>
            )}
            <input
              type="file"
              name="icon"
              accept="image/*"
              onChange={handleChange}
              className="text-sm text-gray-600"
            />
          </div>

          {/* Title */}
          <div>
            <label className="block font-semibold mb-1 text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Enter service title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Subtitle */}
          <div>
            <label className="block font-semibold mb-1 text-gray-700">
              Subtitle
            </label>
            <input
              type="text"
              name="subtitle"
              placeholder="Enter service subtitle"
              value={formData.subtitle}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition duration-300"
          >
            Add Service
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddService;
