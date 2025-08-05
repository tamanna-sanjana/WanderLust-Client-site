import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";

const UpdateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoURL: "",
  });
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`https://wander-lust-server-site.vercel.app/adduser/${id}`);
        setFormData({
          name: data.name,
          email: data.email,
          photoURL: data.photoURL || "",
        });
        setPreview(data.photoURL);
      } catch (err) {
        console.error("❌ Failed to fetch user:", err);
      }
    };
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photoURL" && files?.length > 0) {
      const file = files[0];
      setPreview(URL.createObjectURL(file));
      setFormData((prev) => ({ ...prev, photoURL: file }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const uploadImage = async (image) => {
    const imgData = new FormData();
    imgData.append("image", image);
    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_UPLOAD_KEY}`,
      imgData
    );
    return res.data.data.url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = formData.photoURL;
      if (formData.photoURL instanceof File) {
        imageUrl = await uploadImage(formData.photoURL);
      }

      await axios.patch(`https://wander-lust-server-site.vercel.app/adduser/${id}`, {
        name: formData.name,
        email: formData.email,
        photoURL: imageUrl,
      });

      Swal.fire({
        icon: "success",
        title: "User Updated",
        text: "User details updated successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/admindashboard/users/all");
    } catch (err) {
      console.error("❌ Failed to update user:", err.message);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: err.message,
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 to-indigo-200 p-6">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">Update User</h2>

        <label className="block mb-1 font-semibold text-indigo-600">Name</label>
        <input
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 border border-indigo-300 rounded-md"
        />

        <label className="block mb-1 font-semibold text-indigo-600">Email</label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 border border-indigo-300 rounded-md"
        />

        <label className="block mb-1 font-semibold text-indigo-600">Photo</label>
        <div className="flex items-center gap-4 mb-4">
          <label
            htmlFor="photoURL"
            className="cursor-pointer w-24 h-24 border-2 border-dashed border-teal-600 rounded-full flex justify-center items-center overflow-hidden"
          >
            {preview ? (
              <img src={preview} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <span className="text-xs text-center text-teal-800">Upload Image</span>
            )}
            <input
              id="photoURL"
              name="photoURL"
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
            />
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          Update User
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;
