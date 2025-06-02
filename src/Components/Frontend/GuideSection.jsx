import React from 'react';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa';
import { NavLink } from 'react-router'; 
import { motion } from 'framer-motion';

const guides = [
  {
    name: 'Ihfaz Ahmed',
    location: "Cox's Bazar",
    photo: 'https://i.ibb.co/d0TyfNg6/F-56329.jpg',
  },
  {
    name: 'Kazi Tanim',
    location: 'Sunamganj',
    photo: 'https://i.ibb.co/dNd2rLV/B-33733.jpg',
  },
  {
    name: 'Aninda Paul Joy',
    location: 'Sylhet',
    photo: 'https://i.ibb.co/zqgJr8G/Q-60275.jpg',
  },
  {
    name: 'Dibya Sinha Chowdhury',
    location: 'Sajek',
    photo: 'https://i.ibb.co/W4hHDbf6/M-90454.jpg',
  },
];

const cardVariants = {
  offscreen: {
    y: 100,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      bounce: 0.3,
      duration: 0.8,
    },
  },
};

const GuideSection = () => {
  return (
    <div className="py-12 px-4 bg-blue-950">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-5xl md:text-[100px] font-extrabold text-blue-300 leading-none opacity-10">
          TRAVEL GUIDE
        </h2>
        <h3 className="text-3xl font-semibold md:-mt-16 -mt-12 text-white relative z-10">
          Meet Our Guides
          <div className="w-16 h-1 bg-blue-500 mx-auto mt-2 rounded-full"></div>
        </h3>
      </div>

      {/* Guide Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {guides.map((guide, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-xl overflow-hidden shadow-md"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.2 }}
            variants={cardVariants}
            whileHover={{ scale: 1.05, boxShadow: '0 15px 25px rgba(0,0,0,0.3)' }}
            transition={{ type: 'spring', stiffness: 300 }}
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
    </div>
  );
};

export default GuideSection;
