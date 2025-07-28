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
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold text-gray-600">
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
  } = packageData;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Title and Subtitle */}
      <div className="mb-6 text-center">
        <h1 className="text-4xl font-bold text-blue-900">{title}</h1>
        <h2 className="text-xl text-gray-600 mt-2">{subtitle}</h2>
      </div>

      {/* Thumbnail */}
      <div className="rounded-xl overflow-hidden shadow-lg mb-8">
        <img
          src={thumbnail}
          alt="Thumbnail"
          className="w-full h-[400px] object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* Extra Images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        {[image1, image2].map((img, idx) => (
          <div
            key={idx}
            className="overflow-hidden rounded-lg shadow hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={img}
              alt={`Image ${idx + 1}`}
              className="w-full h-56 object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        ))}
      </div>

      {/* Descriptions */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-2xl font-semibold mb-2 text-gray-800">Overview</h3>
        <p className="text-md text-gray-700 mb-4">{shortDescription}</p>

        <h3 className="text-xl font-medium mt-6 mb-2 text-gray-800">Details</h3>
        <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{longDescription}</p>
      </div>
    </div>
  );
};

export default ViewPackage;
