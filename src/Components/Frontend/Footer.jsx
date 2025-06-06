import React from 'react';
import { FaHome, FaEnvelope, FaPhoneAlt, FaShare } from 'react-icons/fa';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">
        
        {/* Contact Section */}
        <motion.div
          className="flex-1"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <h3 className="text-2xl font-bold mb-4 text-gray-500">Get In Touch</h3>
          <p className="flex items-start gap-3 text-lg mb-3">
            <FaHome className="mt-1" /> Pirer Bazar, Sylhet - Tamabil Hwy, Bateshwar
          </p>
          <p className="flex items-center gap-3 text-lg mb-3">
            <FaEnvelope /> wanderlust@gmail.com
          </p>
          <p className="flex items-center gap-3 text-lg mb-5">
            <FaPhoneAlt /> 01313-050066
          </p>
          <div className="flex items-center gap-4 text-2xl rounded-full">
            <FaShare />
            <a href="#" className="bg-[#003b78] p-3 rounded-full hover:bg-[#0056b3] cursor-pointer" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="#" className="bg-pink-500 p-3 rounded-full hover:bg-pink-600 cursor-pointer" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="#" className="bg-blue-400 p-3 rounded-full hover:bg-[#0056b3] cursor-pointer" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
          </div>
        </motion.div>

        {/* Company Section */}
        <motion.div
          className="flex-1"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <h3 className="text-2xl font-bold mb-4 text-gray-500">Company</h3>
          <ul className="space-y-2 text-lg">
            {['About', 'Blog', 'Package', 'Services', 'Contact'].map((item, idx) => (
              <li
                key={idx}
                className="cursor-pointer hover:text-cyan-900 transition-colors duration-300"
              >
                &gt; {item}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Support Section */}
        <motion.div
          className="flex-1"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <h3 className="text-2xl font-bold mb-4 text-gray-500">Support</h3>
          <ul className="space-y-2 text-lg">
            {['Contact', 'Legal Notice', 'Privacy Policy', 'Terms and Conditions'].map((item, idx) => (
              <li
                key={idx}
                className="cursor-pointer hover:text-cyan-900 transition-colors duration-300"
              >
                &gt; {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Bottom copyright */}
      <motion.div
        className="text-center mt-10 text-sm text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        © {new Date().getFullYear()} Wanderlust Travel Agency. All rights reserved.
      </motion.div>
    </footer>
  );
};

export default Footer;
