import React, { useMemo, useState, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../../../Components/Backend/Provider/AuthContext";

const AddPackage = () => {
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    thumbnail: null,
    image1: null,
    image2: null,
    shortDescription: "",
    longDescription: "",
  });

  const imageUploadUrl = useMemo(() => {
    return `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_UPLOAD_KEY}`;
  }, []);

  const [thumbPreview, setThumbPreview] = useState(null);
  const [image1Preview, setImage1Preview] = useState(null);
  const [image2Preview, setImage2Preview] = useState(null);

  // Loading state to disable submit during upload
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e, fieldName, setPreview) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, [fieldName]: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const uploadImage = async (image) => {
    if (!image) return null;

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
    if (isLoading) return; // Prevent multiple submissions

    setIsLoading(true);

    try {
      Swal.fire({
        title: "Uploading...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      const [thumbUrl, image1Url, image2Url] = await Promise.all([
        uploadImage(formData.thumbnail),
        uploadImage(formData.image1),
        uploadImage(formData.image2),
      ]);

      if (!thumbUrl || !image1Url || !image2Url) {
        Swal.close();
        Swal.fire("Upload Failed", "One or more images failed to upload.", "error");
        setIsLoading(false);
        return;
      }

      const packageData = {
        title: formData.title,
        subtitle: formData.subtitle,
        thumbnail: thumbUrl,
        image1: image1Url,
        image2: image2Url,
        shortDescription: formData.shortDescription,
        longDescription: formData.longDescription,
        createdAt: new Date(),
        email: user?.email || "no-reply@example.com",
        status: 1,
      };

      await axios.post("http://localhost:3000/packageCollection", packageData);

      Swal.close();
      Swal.fire({
        icon: "success",
        title: "✅ Package Added!",
        showConfirmButton: false,
        timer: 1500,
      });

      // Reset form & previews
      setFormData({
        title: "",
        subtitle: "",
        thumbnail: null,
        image1: null,
        image2: null,
        shortDescription: "",
        longDescription: "",
      });
      setThumbPreview(null);
      setImage1Preview(null);
      setImage2Preview(null);
    } catch (err) {
      Swal.close();
      console.error("❌ Submission failed:", err);
      Swal.fire("Error", "Something went wrong while saving the package.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-pink-200 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl p-10 space-y-8">
        <h2 className="text-4xl font-bold text-center text-indigo-700">
          ✈️ Add New Travel Package
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <InputImage
            label="Thumbnail"
            preview={thumbPreview}
            onChange={(e) => handleImageChange(e, "thumbnail", setThumbPreview)}
          />

          <InputImage
            label="Image 1"
            preview={image1Preview}
            onChange={(e) => handleImageChange(e, "image1", setImage1Preview)}
          />

          <InputImage
            label="Image 2"
            preview={image2Preview}
            onChange={(e) => handleImageChange(e, "image2", setImage2Preview)}
          />

          <InputText
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter package title"
          />

          <InputText
            label="Subtitle"
            name="subtitle"
            value={formData.subtitle}
            onChange={handleInputChange}
            placeholder="Enter package subtitle"
          />

          <InputTextarea
            label="Short Description"
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleInputChange}
            rows={3}
            placeholder="Enter a short description..."
          />

          <InputTextarea
            label="Long Description"
            name="longDescription"
            value={formData.longDescription}
            onChange={handleInputChange}
            rows={7}
            placeholder="Enter a detailed description..."
          />

          <div className="text-center">
            <button
              type="submit"
              disabled={isLoading}
              className={`bg-indigo-600 text-white font-semibold py-3 px-6 rounded-full 
                hover:bg-indigo-700 hover:scale-105 transition-all duration-300 shadow-lg 
                ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {isLoading ? "Saving..." : "Submit Package 🚀"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Reusable Components
const InputImage = ({ label, preview, onChange }) => (
  <div>
    <label className="font-medium block mb-2 text-gray-700">{label}</label>
    <input
      type="file"
      accept="image/*"
      onChange={onChange}
      className="w-full p-2 border rounded-lg"
      required
    />
    {preview && (
      <div className="mt-4 w-1/3">
        <img
          src={preview}
          alt={`${label} Preview`}
          className="w-full rounded-xl shadow-md border border-indigo-300"
        />
      </div>
    )}
  </div>
);

const InputText = ({ label, name, value, onChange, placeholder }) => (
  <div>
    <label className="font-medium block mb-2 text-gray-700">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-indigo-400 focus:outline-none"
      required
    />
  </div>
);

const InputTextarea = ({ label, name, value, onChange, rows, placeholder }) => (
  <div>
    <label className="font-medium block mb-2 text-gray-700">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows={rows}
      placeholder={placeholder}
      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-indigo-400 focus:outline-none resize-none"
      required
    ></textarea>
  </div>
);

export default AddPackage;
