import React, { useRef } from 'react';
import { NavLink } from 'react-router';
import { motion, useInView } from 'framer-motion';

const packages = [
  {
    id: 1,
    name: 'Green Escapes',
    description: "Welcome to WanderLust's Green Escapes Package.",
    image: 'https://i.ibb.co/qs1N4M4/green-escapes.jpg',
  },
  {
    id: 2,
    name: 'Destination Vacation',
    description: "Welcome to WanderLust's Destination Vacation Package.",
    image: 'https://i.ibb.co/0qmg6DQ/sajek-package.jpg',
  },
  {
    id: 3,
    name: 'Sylhet Tea Garden',
    description:
      'Nestled in the northeastern region of Bangladesh, the Sylhet Tea Gardens are a breathtaking expanse of lush greenery and rolling hills that captivate visitors with their natural beauty.',
    image: 'https://i.ibb.co/4FQX5nD/sylhet-tea.jpg',
  },
];

const Packages = () => {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true });

  return (
    <div className="relative w-full min-h-screen overflow-hidden"> 
    <section className="py-12 px-4 md:px-12 bg-white text-blue-950 mt-10">
      {/* Animated Title */}
      <motion.div
        ref={titleRef}
        className="text-center mb-25"
        initial={{ opacity: 0.2, y: 60 }}
        animate={titleInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-7xl md:text-[120px] font-extrabold text-black leading-none opacity-25">
          Our Packages
        </h2>
        <h3 className="text-3xl font-semibold md:-mt-16 -mt-14 relative z-10">
          Choose Your Next Destinations
          <div className="w-16 h-1 bg-blue-700 mx-auto mt-2"></div>
        </h3>
      </motion.div>

      {/* Animated Cards */}
      <div className="grid gap-8 md:grid-cols-3">
        {packages.map((pkg, index) => {
          const cardRef = useRef(null);
          const isCardInView = useInView(cardRef, { once: true });

          return (
            <motion.div
              ref={cardRef}
              key={pkg.id}
              className="bg-indigo-300 rounded-lg shadow-md overflow-hidden border hover:shadow-xl transition duration-300"
              initial={{ opacity: 0, y: 50 }}
              animate={isCardInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.03 }}
            >
              <img
                src={pkg.image}
                alt={pkg.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-5 text-left">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Package Name : {pkg.name}
                </h3>
                <p className="text-gray-600 mb-4">{pkg.description}</p>
                <NavLink
                  to="/details"
                  className="bg-blue-900 text-white px-4 py-2 rounded-2xl hover:bg-blue-700"
                >
                  Read More
                </NavLink>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
    </div>
  );
};

export default Packages;
