import React, { useContext, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../../../Components/Backend/Provider/AuthContext";

const AddGuide = () => {
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    fb_link: "",
    instagram_link: "",
    image: null,
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Upload image to imgbb
  const uploadImage = async (image) => {
    try {
      const formData = new FormData();
      formData.append("image", image);
      const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_UPLOAD_KEY}`;
      const response = await axios.post(imageUploadUrl, formData, { timeout: 10000 });
      return response.data.data.url;
    } catch (err) {
      console.error("Image upload failed:", err);
      return null;
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const imageFile = files[0];
      setFormData((prev) => ({ ...prev, image: imageFile }));
      setPreviewImage(URL.createObjectURL(imageFile));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.image) {
      Swal.fire("Error", "Name and Image are required", "error");
      return;
    }

    setIsSubmitting(true);

    const imageUrl = await uploadImage(formData.image);
    if (!imageUrl) {
      setIsSubmitting(false);
      Swal.fire("Error", "Image upload failed", "error");
      return;
    }

    const guideData = {
      name: formData.name,
      image: imageUrl,
      email: user?.email || "unknown",
      fb_link: formData.fb_link || "",
      instagram_link: formData.instagram_link || "",
      status: 1,
    };

    try {
      await axios.post("http://localhost:3000/api/guides", guideData);
      Swal.fire({
        icon: "success",
        title: "Guide Added Successfully!",
        showConfirmButton: false,
        timer: 2000,
      }).then(() => window.location.reload());
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Something went wrong", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-xl rounded-xl mt-10">
      <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">Add New Guide</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 font-medium text-gray-700">Guide Name <span className="text-red-500">*</span></label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter guide's full name"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Facebook Link</label>
          <input
            type="url"
            name="fb_link"
            value={formData.fb_link}
            onChange={handleChange}
            placeholder="https://facebook.com/..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Instagram Link</label>
          <input
            type="url"
            name="instagram_link"
            value={formData.instagram_link}
            onChange={handleChange}
            placeholder="https://instagram.com/..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Guide Image <span className="text-red-500">*</span></label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        {previewImage && (
          <div className="mt-4">
            <p className="text-gray-600 mb-2 font-medium">Image Preview:</p>
            <img src={previewImage} alt="Preview" className="w-40 h-40 object-cover rounded-lg border shadow" />
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full font-semibold py-2 rounded-lg transition duration-300 ${
            isSubmitting
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800"
          }`}
        >
          {isSubmitting ? (
            <div className="flex justify-center items-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
              Submitting...
            </div>
          ) : (
            "Submit Guide"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddGuide;
