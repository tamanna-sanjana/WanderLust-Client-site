import React, { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { motion } from "framer-motion";
import axios from "axios";

const Packages = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/packages");
        setPackages(res.data);
      } catch (err) {
        console.error("Failed to fetch packages:", err);
      }
    };
    fetchPackages();
  }, []);

  return (
    <>
      <div className="w-full min-h-screen bg-white text-blue-950 py-12 px-4 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-7xl md:text-[120px] font-extrabold text-black leading-none opacity-25">
            Our Packages
          </h2>
          <h3 className="text-3xl font-semibold md:-mt-16 -mt-14 relative z-10">
            Choose Your Next Destinations
            <div className="w-16 h-1 bg-blue-700 mx-auto mt-2"></div>
          </h3>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg._id || index}
              className="bg-blue-200 rounded-lg shadow-2xl overflow-hidden border-none hover:shadow-xl transition duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.03 }}
            >
              <img
                src={pkg.thumbnail || "https://via.placeholder.com/300x200"}
                alt={pkg.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-5 text-left">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Package Name: {pkg.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {pkg.shortDescription || "No description available."}
                </p>
                <NavLink
                  to={`/details/${pkg._id}`}
                  className="bg-blue-900 text-white px-4 py-2 rounded-2xl hover:bg-blue-700 inline-block"
                >
                  Read More
                </NavLink>
                <NavLink
                  to={`/book/${pkg._id}`}
                  className="bg-green-600 text-white px-4 py-2 ml-4 rounded-2xl hover:bg-green-700 inline-block"
                >
                  Book
                </NavLink>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Packages;
