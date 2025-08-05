import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router'; // Fixed import
import { motion, useInView } from 'framer-motion';

const Blogs = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch Blogs
  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://wander-lust-server-site.vercel.app/api/blogs");
      setBlogs(res.data);
      setError(null);
    } catch (err) {
      console.error("❌ Failed to fetch blogs:", err);
      setError("Failed to load blogs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <>
      <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] flex items-center justify-center text-center bg-blue-500">
  {/* Image with opacity ABOVE background */}
  <img
    src="https://i.ibb.co/60rYM9wZ/subscribe-img.jpg"
    alt="About Us"
    className="absolute inset-0 w-full h-full object-cover opacity-70"
  />

  {/* Text on top */}
  <div className="relative z-10 text-white">
    <h1 className="text-4xl font-bold">Blog</h1>
    <a href="/" className="text-blue-800 hover:underline">Home</a>
  </div>
</div>

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

          {/* Loading and Error States */}
          {loading && <p className="text-center text-gray-600 mt-6">Loading blogs...</p>}
          {error && <p className="text-center text-red-500 mt-6">{error}</p>}

          {/* Blog Cards */}
          <div className="grid gap-8 md:grid-cols-3 mt-12">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white rounded-lg shadow-2xl overflow-hidden border-none hover:shadow-2xl transition duration-300"
              >
                <img
                  src={blog.thumbnail}
                  alt={blog.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-5 text-left">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Blog Title: {blog.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{blog.description}</p>
                  <NavLink
                    to={`/blogdetails/${blog._id}`}
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
    </>
  );
};

export default Blogs;
