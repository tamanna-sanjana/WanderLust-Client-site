import React, { useState } from "react";

const AddPackage = () => {
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    thumbnail: null,
    image1: null,
    image2: null,
    shortDescription: "",
    longDescription: "",
  });

  const [thumbPreview, setThumbPreview] = useState(null);
  const [image1Preview, setImage1Preview] = useState(null);
  const [image2Preview, setImage2Preview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e, fieldName, setPreview) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, [fieldName]: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Travel package submitted!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-pink-200 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl p-10 space-y-8">
        <h2 className="text-4xl font-bold text-center text-indigo-700">
          ✈️ Add New Travel Package
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Thumbnail */}
          <div>
            <label className="font-medium block mb-2 text-gray-700">Thumbnail</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, "thumbnail", setThumbPreview)}
              className="w-full p-2 border rounded-lg"
            />
            {thumbPreview && (
              <div className="mt-4 w-1/3">
                <img
                  src={thumbPreview}
                  alt="Thumbnail Preview"
                  className="w-full rounded-xl shadow-md border border-indigo-300"
                />
              </div>
            )}
          </div>

          {/* Image 1 */}
          <div>
            <label className="font-medium block mb-2 text-gray-700">Image 1</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, "image1", setImage1Preview)}
              className="w-full p-2 border rounded-lg"
            />
            {image1Preview && (
              <div className="mt-4 w-1/3">
                <img
                  src={image1Preview}
                  alt="Image 1 Preview"
                  className="w-full rounded-xl shadow-md border border-indigo-300"
                />
              </div>
            )}
          </div>

          {/* Image 2 */}
          <div>
            <label className="font-medium block mb-2 text-gray-700">Image 2</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, "image2", setImage2Preview)}
              className="w-full p-2 border rounded-lg"
            />
            {image2Preview && (
              <div className="mt-4 w-1/3">
                <img
                  src={image2Preview}
                  alt="Image 2 Preview"
                  className="w-full rounded-xl shadow-md border border-indigo-300"
                />
              </div>
            )}
          </div>

          {/* Title */}
          <div>
            <label className="font-medium block mb-2 text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter package title"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-indigo-400 focus:outline-none"
              required
            />
          </div>

          {/* Subtitle */}
          <div>
            <label className="font-medium block mb-2 text-gray-700">Subtitle</label>
            <input
              type="text"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleInputChange}
              placeholder="Enter package subtitle"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-indigo-400 focus:outline-none"
              required
            />
          </div>

          {/* Short Description */}
          <div>
            <label className="font-medium block mb-2 text-gray-700">Short Description</label>
            <textarea
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleInputChange}
              rows="3"
              placeholder="Enter a short description..."
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-indigo-400 focus:outline-none resize-none"
              required
            ></textarea>
          </div>

          {/* Long Description */}
          <div>
            <label className="font-medium block mb-2 text-gray-700">Long Description</label>
            <textarea
              name="longDescription"
              value={formData.longDescription}
              onChange={handleInputChange}
              rows="7"
              placeholder="Enter a detailed description..."
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-indigo-400 focus:outline-none resize-none"
              required
            ></textarea>
          </div>

          {/* Submit */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-indigo-600 text-white font-semibold py-3 px-6 rounded-full hover:bg-indigo-700 hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Submit Package 🚀
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPackage;
