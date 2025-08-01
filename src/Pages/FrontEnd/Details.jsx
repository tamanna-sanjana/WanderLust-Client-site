import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router";

const Details = () => {
  const { id } = useParams();
  const [packageData, setPackageData] = useState(null);

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/packages/${id}`
        );
        setPackageData(response.data);
      } catch (error) {
        console.error("❌ Error fetching package:", error);
      }
    };
    fetchPackage();
  }, [id]);

  if (!packageData) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-500 text-xl">
        Loading package details...
      </div>
    );
  }

  return (
    <>
      <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] flex items-center justify-center text-center bg-blue-500">
        {/* Image with opacity ABOVE background */}
        <img
          src="https://i.ibb.co/60rYM9wZ/subscribe-img.jpg"
          alt="About Us"
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />

        {/* Text on top */}
        <div className="relative z-10 text-white">
          <h1 className="text-4xl font-bold">Package Details</h1>
          <a href="/" className="text-blue-800 hover:underline">
            Home
          </a>
        </div>
      </div>
      <div className="bg-gradient-to-r from-blue-50 via-white to-blue-50 min-h-screen py-16 px-6 md:px-20">
        {/* Heading Section */}
        <div className="text-center mb-16">
          <h2 className="text-8xl md:text-[140px] font-extrabold text-black opacity-10 leading-none select-none">
            Packages
          </h2>
          <h3 className="text-3xl md:text-5xl font-extrabold text-blue-900 -mt-24 relative z-10 tracking-wide">
            Your Selected Destinations
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-4 rounded-full shadow-lg"></div>
          </h3>
        </div>

        {/* Card Section */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200 hover:shadow-3xl transition-shadow duration-500">
          {/* Main Thumbnail */}
          <div className="relative group overflow-hidden rounded-t-3xl">
            <img
              src={
                packageData.thumbnail ||
                "https://i.ibb.co/R4Z4VYXD/sajekbanner.jpg"
              }
              alt={packageData.title}
              className="w-full h-96 object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute bottom-4 left-6 bg-gradient-to-r from-blue-700/70 to-blue-900/90 text-white rounded-lg px-4 py-2 font-semibold text-lg drop-shadow-lg">
              {packageData.location}
            </div>
          </div>

          {/* Secondary Images Gallery */}
          <div className="flex gap-6 p-6 px-10 bg-blue-50">
            {[packageData.image1, packageData.image2].map(
              (img, idx) =>
                img && (
                  <div
                    key={idx}
                    className="flex-1 overflow-hidden rounded-xl shadow-md group cursor-pointer"
                  >
                    <img
                      src={img}
                      alt={`${packageData.title} - image ${idx + 1}`}
                      className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                )
            )}
          </div>

          {/* Details Content */}
          <div className="p-10 space-y-6">
            <h1 className="text-4xl font-extrabold text-blue-900">
              {packageData.title}
            </h1>
            <p className="text-gray-700 text-lg font-medium">
              {packageData.subtitle}
            </p>

            <div className="flex flex-wrap gap-6 text-gray-800 font-semibold text-base">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500 uppercase tracking-wide">
                  Price
                </span>
                <span className="text-xl text-blue-700">
                  ৳{packageData.price} BDT per person
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-500 uppercase tracking-wide">
                  Duration
                </span>
                <span>{packageData.duration}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-500 uppercase tracking-wide">
                  Departure
                </span>
                <span>
                  {new Date(packageData.departureDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-500 uppercase tracking-wide">
                  Return
                </span>
                <span>
                  {new Date(packageData.returnDate).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div>
              <h4 className="text-blue-900 font-bold text-lg mb-2">Features</h4>
              <div className="flex flex-wrap gap-3">
                {packageData.features.map((feature, idx) => (
                  <span
                    key={idx}
                    className="bg-blue-100 text-blue-800 text-sm font-medium px-4 py-1 rounded-full shadow-sm"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex justify-center mt-4">
  <NavLink
    to={`/book/${packageData._id}`}
    className="bg-green-600 w-50 text-center text-lg text-white px-6 py-2 rounded-2xl hover:bg-green-700"
  >
    Book
  </NavLink>
</div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
