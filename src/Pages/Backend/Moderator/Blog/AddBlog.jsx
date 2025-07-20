import React, { useState } from "react";

const AddBlog = () => {
  const [formData, setFormData] = useState({
    thumbnail: null,
    title: "",
    article: "",
    videoUrl: "",
  });

  const [thumbnailPreview, setThumbnailPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData((prev) => ({ ...prev, thumbnail: file }));

    const reader = new FileReader();
    reader.onloadend = () => {
      setThumbnailPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your submit logic here
    console.log(formData);
    alert("Blog submitted!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-indigo-100 flex justify-center items-start p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-indigo-700 mb-8 text-center">
          Add New Blog
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Thumbnail Upload */}
          <div className="flex flex-col items-center gap-3">
            {thumbnailPreview ? (
              <img
                src={thumbnailPreview}
                alt="Thumbnail Preview"
                className="w-40 h-40 object-cover rounded-xl shadow-md"
              />
            ) : (
              <div className="w-40 h-40 border-2 border-dashed border-gray-400 rounded-xl flex items-center justify-center text-gray-400">
                No Thumbnail
              </div>
            )}
            <label
              htmlFor="thumbnail"
              className="cursor-pointer px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Upload Thumbnail
            </label>
            <input
              type="file"
              id="thumbnail"
              name="thumbnail"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block mb-2 font-semibold text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter blog title"
              required
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Article */}
          <div>
            <label
              htmlFor="article"
              className="block mb-2 font-semibold text-gray-700"
            >
              Article
            </label>
            <textarea
              id="article"
              name="article"
              value={formData.article}
              onChange={handleInputChange}
              placeholder="Write your article here..."
              required
              rows={6}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-y"
            />
          </div>

          {/* Video URL */}
          <div>
            <label
              htmlFor="videoUrl"
              className="block mb-2 font-semibold text-gray-700"
            >
              Video URL (optional)
            </label>
            <input
              type="url"
              id="videoUrl"
              name="videoUrl"
              value={formData.videoUrl}
              onChange={handleInputChange}
              placeholder="https://example.com/video"
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition"
          >
            Add Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
