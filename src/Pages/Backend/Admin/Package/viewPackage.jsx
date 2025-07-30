import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

const ViewPackage = () => {
  const { id } = useParams();
  const [packageData, setPackageData] = useState(null);

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/packages/${id}`);
        setPackageData(response.data);
      } catch (error) {
        console.error("❌ Error fetching package:", error);
      }
    };
    fetchPackage();
  }, [id]);

  if (!packageData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold text-gray-600 animate-pulse">
        Loading package details...
      </div>
    );
  }

  const {
    title,
    subtitle,
    thumbnail,
    image1,
    image2,
    shortDescription,
    longDescription,
    createdAt,
    email,
    status,
  } = packageData;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Title and Subtitle */}
      <div className="text-center mb-10">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-700 to-cyan-400 text-transparent bg-clip-text mb-2">
          {title}
        </h1>
        <p className="text-xl text-gray-600">{subtitle}</p>
      </div>

      {/* Thumbnail */}
      <div className="relative mb-12 overflow-hidden rounded-2xl shadow-2xl hover:shadow-blue-200 transition-shadow duration-300">
        <img
          src={thumbnail}
          alt="Thumbnail"
          className="w-full h-[450px] object-cover transform hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black via-transparent to-transparent w-full h-24 rounded-b-2xl"></div>
      </div>

      {/* Extra Images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
        {[image1, image2].map((img, idx) => (
          <div
            key={idx}
            className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
          >
            <img
              src={img}
              alt={`Image ${idx + 1}`}
              className="w-full h-60 object-cover"
            />
          </div>
        ))}
      </div>

      {/* Descriptions */}
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-10 border border-gray-200">
        <h2 className="text-3xl font-semibold text-blue-800 mb-4">Overview</h2>
        <p className="text-gray-700 text-base mb-6">{shortDescription}</p>

        <h3 className="text-2xl font-medium text-blue-700 mb-3">Details</h3>
        <p className="text-gray-600 leading-relaxed whitespace-pre-line">{longDescription}</p>
      </div>

      {/* Additional Info */}
      <div className="bg-blue-50 border border-blue-100 p-6 rounded-xl text-sm text-blue-800 shadow">
        <p className="mb-2">
          <span className="font-semibold">📅 Created At:</span>{" "}
          {new Date(createdAt).toLocaleString()}
        </p>
        <p className="mb-2">
          <span className="font-semibold">✉️ Added By:</span> {email}
        </p>
        <p>
          <span className="font-semibold">📦 Status:</span> {status}
        </p>
      </div>
    </div>
  );
};

export default ViewPackage;
