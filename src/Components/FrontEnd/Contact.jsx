import React, { useRef } from "react";
import { BiLogoFacebook } from "react-icons/bi";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { NavLink } from "react-router";
import { motion, useInView } from "framer-motion";

const Contact = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

  return (
    <div className="relative w-full min-h-screen overflow-hidden"> 
    <motion.div
      ref={sectionRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-white text-blue-950 flex flex-col items-center justify-center px-4 py-10 my-15"
    >
      {/* Section Header */}
      <div className="text-center mb-25">
        <h2 className="text-7xl md:text-[120px] font-extrabold text-black leading-none opacity-20">
          Contact Us
        </h2>
        <h3 className="text-3xl font-semibold md:-mt-16 -mt-14 relative z-10">
          Get In Touch
          <div className="w-16 h-1 bg-blue-700 mx-auto mt-2"></div>
        </h3>
      </div>

      {/* Grid: Profile + Form */}
      <div className="grid md:grid-cols-2 gap-10 w-full max-w-6xl">
        {/* Profile Info */}
        <div className="bg-blue-950 rounded-xl p-6 shadow-lg">
          <img
            src="https://i.ibb.co.com/v6JRPnbG/istockphoto-1450058572-612x612.jpg"
            alt="Handshake"
            className="rounded-md mb-4"
          />
          <h3 className="text-2xl font-bold mb-1">WanderLust</h3>
          <p className="text-xl text-gray-400 mb-4">
            Where Every Journey Begins
          </p>
          <p className="text-sm text-gray-300 mb-4">
            At Wanderlust, we believe travel is more than a destination — it's a feeling.
            We're a community of explorers, storytellers, and dreamers dedicated to helping you discover
            the country's most breathtaking places. Whether you're chasing sunsets in Cox's Bazar,
            hiking the Chittagong Hill Tracts, or enjoying nature in Sylhet, we’re here to guide,
            inspire, and walk beside you on your adventure.
            <p>Let your soul roam. Let your story begin. #WanderWithUs.</p>
          </p>
          <p className="mb-2">
            <span className="font-semibold">Phone:</span> +880 1616447397, +880 1607906754
          </p>
          <p className="mb-4">
            <span className="font-semibold">Email:</span> wanderlust@Support.com
          </p>
        </div>

        {/* Contact Form */}
        <div className="bg-blue-950 text-white rounded-xl p-6 shadow-lg">
          <form className="grid gap-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="">Your Name</label>
                <br />
                <input
                  type="text"
                  placeholder="Your Name"
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label htmlFor="">Your Phone</label>
                <br />
                <input
                  type="text"
                  placeholder="Phone Number"
                  className="input input-bordered w-full"
                />
              </div>
            </div>
            <label htmlFor="">Your E-mail</label>
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
            />
            <label htmlFor="">Enter Subject</label>
            <input
              type="text"
              placeholder="Subject"
              className="input input-bordered w-full"
            />
            <label htmlFor="">Enter Your Message</label>
            <textarea
              className="textarea textarea-bordered w-full h-32"
              placeholder="Your Message"
            ></textarea>
            <button className="btn w-full h-15">Send Message</button>
          </form>
        </div>
      </div>
    </motion.div>
    </div>
  );
};

export default Contact;
