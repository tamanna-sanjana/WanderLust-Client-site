import axios from "axios";
import React, { useContext, useMemo, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../../Components/Backend/Provider/AuthContext";

const AddPackages = () => {
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

  const previews = useMemo(() => {
    return {
      thumbnail: thumbPreview,
      image1: image1Preview,
      image2: image2Preview,
    };
  }, [thumbPreview, image1Preview, image2Preview]);

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const { name } = e.target;
    if (file) {
      setFormData((prev) => ({ ...prev, [name]: file }));
      const previewUrl = URL.createObjectURL(file);
      if (name === "thumbnail") setThumbPreview(previewUrl);
      else if (name === "image1") setImage1Preview(previewUrl);
      else if (name === "image2") setImage2Preview(previewUrl);
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
    if (isLoading) return;
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
        email: user?.email,
        status: 1,
      };

      await axios.post("https://wander-lust-server-site.vercel.app/packageCollection", packageData);

      Swal.close();
      Swal.fire({
        icon: "success",
        title: "✅ Package Added!",
        showConfirmButton: false,
        timer: 1500,
      });

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
            disabled={isLoading}
          >
            {isLoading ? "Uploading..." : "Add Package"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPackages;
