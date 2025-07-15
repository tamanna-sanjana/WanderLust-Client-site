import React, { useRef } from 'react';
import { NavLink } from 'react-router';
import { motion, useInView } from 'framer-motion';
import { div } from 'framer-motion/client';

const Blog = [
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

const Blogs = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

  return (
    <div className="relative w-full min-h-screen overflow-hidden"> 
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 1.0, ease: 'easeOut' }}
      className="py-12 px-4 md:px-12 bg-white text-blue-950 mt-10"
    >
      <div className="text-center mb-25">
        <h2 className="text-7xl md:text-[120px] font-extrabold text-black leading-none opacity-25">
          Our Blogs
        </h2>

        <h3 className="text-3xl font-semibold md:-mt-16 -mt-14 relative z-10">
          Wander. Discover. Inspire.
          <div className="w-16 h-1 bg-blue-800 mx-auto mt-2"></div>
        </h3>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {Blog.map((blog) => (
          <div
            key={blog.id}
            className="bg-white rounded-lg shadow-md overflow-hidden border hover:shadow-xl transition duration-300"
          >
            <img
              src={blog.image}
              alt={blog.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-5 text-left">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Package Name : {blog.name}
              </h3>
              <p className="text-gray-600 mb-4">{blog.description}</p>
              <NavLink
                to="/blogdetails"
                className="bg-blue-900 text-white px-4 py-2 rounded-2xl hover:bg-blue-700"
              >
                Read More
              </NavLink>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
    </div>
  );
};

export default Blogs;
