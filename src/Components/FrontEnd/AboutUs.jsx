import React from "react";
import { motion } from "framer-motion";

const owners = [
  {
    name: "Md. Jeshan Khan",
    title: "Chairman & Founder Of WanderLust",
    email: "jeshankhan02@gmail.com",
    phone: "+88013*******",
    city: "Sylhet, Bangladesh",
    photo:
      "https://i.ibb.co/TqLMb8d7/Whats-App-Image-2025-05-16-at-20-34-21-1b9e5920.jpg",
    bio: "With a visionary mindset and years of leadership, Jeshan leads the agency with dedication, ensuring long-term growth and trust.",
  },
  {
    name: "Tamanna Sanjana Toma",
    title: "Chief Executive Officer (CEO) & Co-Founder of WanderLust",
    email: "tamannasanjana01@gmail.com",
    phone: "+88016*******",
    city: "Sylhet, Bangladesh",
    photo:
      "https://i.ibb.co/38R3xYR/Whats-App-Image-2025-05-16-at-20-30-31-805befa7.jpg",
    bio: "Tamanna is the strategic brain behind our operations, ensuring every journey is perfectly planned and executed with care.",
  },
];

const headingVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 0.2, scale: 1, transition: { duration: 1 } },
};

const subheadingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.8 } },
};

const underlineVariants = {
  hidden: { scaleX: 0, opacity: 0, originX: 0 },
  visible: { scaleX: 1, opacity: 1, transition: { duration: 0.7, delay: 0.8 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

function AboutUs() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Foreground Content */}
      <div className="relative z-10 bg-white text-blue-950 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Heading Section */}
          <motion.div
            className="text-center mb-25"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.3 } },
            }}
          >
            <motion.h2
              className="text-7xl md:text-[120px] font-extrabold text-black leading-none opacity-20"
          variants={headingVariants}
            >
              About Us
            </motion.h2>

            <motion.h3
              className="text-3xl font-semibold md:-mt-16 -mt-14 relative z-10"
              variants={subheadingVariants}
            >
              Know Us More
              <motion.div
                className="w-16 h-1 bg-blue-800 mx-auto mt-2"
                variants={underlineVariants}
              />
            </motion.h3>
          </motion.div>

          {/* Owners Grid */}
          <div className="grid grid-cols-1 gap-12 mt-12">
            {owners.map((owner, index) => (
              <motion.div
                key={index}
                className="grid md:grid-cols-2 gap-8 items-center bg-indigo-100 p-6 rounded-xl shadow-3xl"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={cardVariants}
                transition={{ delay: index * 0.3 }}
              >
                {/* Image with border frame */}
                <div className="relative w-fit mx-auto">
                  <div className="relative border-[20px] border-accent-content">
                    <img
                      src={owner.photo}
                      alt={owner.name}
                      className="w-[300px] h-[400px] object-cover"
                    />
                    {/* Decorative Corners */}
                    <div className="absolute top-0 left-0 w-0 h-0 border-t-[30px] border-t-black border-l-[30px] border-l-blue-700" />
                    <div className="absolute top-0 right-0 w-0 h-0 border-t-[30px] border-t-black border-r-[30px] border-r-blue-700" />
                    <div className="absolute bottom-0 left-0 w-0 h-0 border-b-[30px] border-b-black border-l-[30px] border-l-blue-700" />
                    <div className="absolute bottom-0 right-0 w-0 h-0 border-b-[30px] border-b-black border-r-[30px] border-r-blue-700" />
                  </div>
                </div>

                {/* Owner Info */}
                <div>
                  <h3 className="text-2xl font-bold mb-2">{owner.name}</h3>
                  <h3 className="text-xl font-semibold mb-2">{owner.title}</h3>
                  <p className="mb-2">
                    <span className="font-semibold">Email:</span> {owner.email}
                  </p>
                  <p className="mb-2">
                    <span className="font-semibold">Phone:</span> {owner.phone}
                  </p>
                  <p className="mb-4">
                    <span className="font-semibold">City:</span> {owner.city}
                  </p>
                  <p className="text-sm">{owner.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
