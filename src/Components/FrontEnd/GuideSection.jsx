import React, { useEffect, useRef, useState } from 'react';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa';
import { NavLink } from 'react-router';
import { motion, useInView } from 'framer-motion';
import axios from 'axios';

const GuideSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch guides where status === 1
  const fetchGuides = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/api/guides");
      const filtered = res.data.filter(guide => guide.status === 1);
      setGuides(filtered);
      setError(null);
    } catch (err) {
      console.error("❌ Failed to fetch guides:", err);
      setError("Failed to load guides.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGuides();
  }, []);

  return (
    <motion.div
      ref={sectionRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="py-12 px-4 bg-white text-blue-950"
    >
      
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-5xl md:text-[100px] font-extrabold text-black leading-none opacity-20">
          TRAVEL GUIDE
        </h2>
        <h3 className="text-3xl font-semibold md:-mt-16 -mt-12 text-blue-950 relative z-10">
          Meet Our Guides
          <div className="w-16 h-1 bg-blue-800 mx-auto mt-2 rounded-full"></div>
        </h3>
      </div>

      {/* Guide Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto pt-20">
        {guides.map((guide, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: index * 0.15 }}
            className="bg-indigo-300 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
          >
            <img
              src={guide.image}
              alt={guide.name}
              className="w-full h-72 object-cover"
            />
            <div className="p-4 text-center">
              {/* Social Icons */}
              <div className="flex justify-center space-x-3 mb-4">
                <NavLink
                  to={guide.fb_link}
                  target="_blank"
                  className="text-white bg-[#0e1d5c] p-2 rounded-full hover:bg-blue-700 transition"
                >
                  <FaFacebookF size={16} />
                </NavLink>
                <NavLink
                  to={guide.instagram_link}
                  target="_blank"
                  className="text-white bg-[#0e1d5c] p-2 rounded-full hover:bg-pink-600 transition"
                >
                  <FaInstagram size={16} />
                </NavLink>
              </div>

              {/* Guide Info */}
              <h3 className="text-lg font-bold text-gray-800">{guide.name}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Error & Loading States */}
      {loading && <p className="text-center text-gray-600 mt-8">Loading guides...</p>}
      {error && <p className="text-center text-red-500 mt-8">{error}</p>}
    </motion.div>
  );
};

export default GuideSection;
