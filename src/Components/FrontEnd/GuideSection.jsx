import React, { useRef } from 'react';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa';
import { NavLink } from 'react-router';
import { motion, useInView } from 'framer-motion';

const guides = [
  {
    name: 'Naju Moni',
    location: "Cox's Bazar",
    photo: 'https://i.ibb.co/Xk4XJnkw/Whats-App-Image-2025-06-27-at-12-51-44-37463e13.jpg',
  },
  {
    name: 'Kawsar Ahmed',
    location: 'Sunamganj',
    photo: 'https://i.ibb.co/Wpy1M8QG/Whats-App-Image-2025-05-24-at-16-10-22-536e3d5b.jpg',
  },
  {
    name: 'Md. Tuhin Ahmed',
    location: 'Sylhet',
    photo: 'https://i.ibb.co/wk9CPpd/Whats-App-Image-2025-06-23-at-14-08-45-9380cb4a.jpg',
  },
  {
    name: 'Dibya Sinha Chowdhury',
    location: 'Sajek',
    photo: 'https://i.ibb.co/TWxDPxv/dibya.jpg',
  },
];

const GuideSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

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
              src={guide.photo}
              alt={guide.name}
              className="w-full h-72 object-cover"
            />
            <div className="p-4 text-center">
              {/* Social Icons */}
              <div className="flex justify-center space-x-3 mb-4">
                <NavLink
                  to="https://www.facebook.com/"
                  target="_blank"
                  className="text-white bg-[#0e1d5c] p-2 rounded-full hover:bg-blue-700 transition"
                >
                  <FaFacebookF size={16} />
                </NavLink>
                <NavLink
                  to="https://www.twitter.com/"
                  target="_blank"
                  className="text-white bg-[#0e1d5c] p-2 rounded-full hover:bg-sky-500 transition"
                >
                  <FaTwitter size={16} />
                </NavLink>
                <NavLink
                  to="https://www.instagram.com/"
                  target="_blank"
                  className="text-white bg-[#0e1d5c] p-2 rounded-full hover:bg-pink-600 transition"
                >
                  <FaInstagram size={16} />
                </NavLink>
                <NavLink
                  to="https://www.linkedin.com/"
                  target="_blank"
                  className="text-white bg-[#0e1d5c] p-2 rounded-full hover:bg-blue-900 transition"
                >
                  <FaLinkedinIn size={16} />
                </NavLink>
              </div>

              {/* Guide Info */}
              <h3 className="text-lg font-bold text-gray-800">{guide.name}</h3>
              <p className="text-sm text-gray-600">Location : {guide.location}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default GuideSection;
