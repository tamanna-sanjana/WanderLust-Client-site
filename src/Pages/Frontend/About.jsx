import React from 'react';
import { NavLink } from 'react-router'; 
import { motion } from 'framer-motion';

const owners = [
  {
    name: 'Md. Jeshan Khan',
    title: 'Chairman & Founder Of WanderLust',
    email: 'jeshankhan02@gmail.com',
    phone: '+88013*******',
    city: 'Sylhet, Bangladesh',
    photo: 'https://i.ibb.co/TqLMb8d7/Whats-App-Image-2025-05-16-at-20-34-21-1b9e5920.jpg',
    bio: 'With a visionary mindset and years of leadership, Jeshan leads the agency with dedication, ensuring long-term growth and trust.',
  },
  {
    name: 'Tamanna Sanjana Toma',
    title: 'Chief Executive Officer (CEO) & Co-Founder of WanderLust',
    email: 'tamannasanjana01@gmail.com',
    phone: '+88016*******',
    city: 'Sylhet, Bangladesh',
    photo: 'https://i.ibb.co/38R3xYR/Whats-App-Image-2025-05-16-at-20-30-31-805befa7.jpg',
    bio: 'Tamanna is the strategic brain behind our operations, ensuring every journey is perfectly planned and executed with care.',
  },
  {
    name: 'Rifha Tasniya',
    title: 'Tour Manager',
    email: 'rifhatasniya@gmail.com',
    phone: '+88017*******',
    city: 'Sylhet, Bangladesh',
    photo: 'https://i.ibb.co/HTckLtnZ/Whats-App-Image-2025-05-17-at-14-59-44-d37b9203.jpg',
    bio: 'Rifha is the heart of our tours — managing every detail so travelers can relax and enjoy unforgettable experiences.',
  },
];

// Variants for the sections (Hero and About Content)
const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

// Variants for the owner cards
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.3,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

export default function About() {
  return (
    <div className="relative w-full overflow-hidden">
      
      {/* Hero Section */}
      <motion.div
        className="relative w-full h-[70vh]"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        custom={0} // no delay
      >
        <img
          src="https://i.ibb.co/R1xtqL7/Travel-Banner.jpg"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-60" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4 pt-30">
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-2">About Us</h1>
          <NavLink
            to="/"
            className="text-white text-base md:text-lg hover:underline mt-2"
          >
            Home
          </NavLink>
        </div>
      </motion.div>

      {/* About Content Section */}
      <motion.div
        className="relative z-10 bg-blue-950 text-white py-16 px-4"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        custom={0.7} // delayed after Hero
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Welcome to <span className="text-indigo-300">WanderLust</span>
          </h2>
          <p className="text-center text-lg md:text-xl mb-12">
            We are committed to making your travel dreams come true. Our experienced team ensures every journey is unforgettable.
          </p>

          <div className="grid grid-cols-1 gap-12">
                      {owners.map((owner, index) => (
                        <motion.div
                          key={index}
                          className="grid md:grid-cols-2 gap-8 items-center bg-gray-900 p-6 rounded-xl shadow-lg"
                          initial={{ opacity: 0, y: 50 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.3 }}
                          transition={{ delay: index * 0.3, duration: 0.8 }}
                        >
                          {/* Image Section */}
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
          
                          {/* Info Section */}
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
      </motion.div>
    </div>
  );
}
