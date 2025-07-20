import React, { useState } from "react";

const AddPackages = () => {
  const [formData, setFormData] = useState({
    thumbnail: null,
    image1: null,
    image2: null,
    title: "",
    subtitle: "",
    shortDescription: "",
    longDescription: "",
  });

  const [previews, setPreviews] = useState({
    thumbnail: null,
    image1: null,
    image2: null,
  });

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    if (files.length === 0) return;

    const file = files[0];
    setFormData((prev) => ({ ...prev, [name]: file }));

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviews((prev) => ({ ...prev, [name]: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Prepare form data to send to backend, e.g., with FormData API

    console.log(formData);
    alert("Package added successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 to-purple-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-indigo-700 mb-8 text-center">
          Add New Package
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Images Upload */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {["thumbnail", "image1", "image2"].map((name) => (
              <div key={name} className="flex flex-col items-center gap-2">
                {previews[name] ? (
                  <img
                    src={previews[name]}
                    alt={`${name} preview`}
                    className="w-28 h-28 rounded-lg object-cover shadow-md"
                  />
                ) : (
                  <div className="w-28 h-28 flex items-center justify-center border border-dashed border-gray-400 rounded-lg text-gray-400 text-sm">
                    No {name.charAt(0).toUpperCase() + name.slice(1)}
                  </div>
                )}
                <label
                  htmlFor={name}
                  className="cursor-pointer px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  Upload {name.charAt(0).toUpperCase() + name.slice(1)}
                </label>
                <input
                  type="file"
                  id={name}
                  name={name}
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            ))}
          </div>

          {/* Title */}
          <div>
            <label htmlFor="title" className="block font-semibold mb-1 text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter package title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Subtitle */}
          <div>
            <label htmlFor="subtitle" className="block font-semibold mb-1 text-gray-700">
              Subtitle
            </label>
            <input
              type="text"
              id="subtitle"
              name="subtitle"
              placeholder="Enter package subtitle"
              value={formData.subtitle}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Short Description */}
          <div>
            <label
              htmlFor="shortDescription"
              className="block font-semibold mb-1 text-gray-700"
            >
              Short Description
            </label>
            <textarea
              id="shortDescription"
              name="shortDescription"
              placeholder="Enter a brief description"
              value={formData.shortDescription}
              onChange={handleInputChange}
              required
              rows={3}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
            />
          </div>

          {/* Long Description */}
          <div>
            <label
              htmlFor="longDescription"
              className="block font-semibold mb-1 text-gray-700"
            >
              Long Description
            </label>
            <textarea
              id="longDescription"
              name="longDescription"
              placeholder="Enter a detailed description"
              value={formData.longDescription}
              onChange={handleInputChange}
              required
              rows={6}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-y"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition duration-300"
          >
            Add Package
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPackages;
