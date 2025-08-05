import React, { useEffect, useState } from "react";
import { useParams } from "react-router"; // use 'react-router-dom' in newer versions
import axios from "axios";

const BlogDetails = () => {
  const { id } = useParams();
  const [blogData, setBlogData] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `https://wander-lust-server-site.vercel.app/api/blog/${id}`
        );
        setBlogData(response.data);
      } catch (error) {
        console.error("❌ Error fetching blog:", error);
      }
    };
    fetchBlog();
  }, [id]);

  if (!blogData) {
    return (
      <div className="text-center mt-20 text-blue-900 font-semibold text-lg">
        Loading blog details...
      </div>
    );
  }

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
          <h1 className="text-4xl font-bold">Blog Details</h1>
          <a href="/" className="text-blue-800 hover:underline">
            Home
          </a>
        </div>
      </div>
      <div className="bg-white text-blue-950 min-h-screen py-24 px-4">
        {/* Heading Section */}
        <div className="text-center mb-20">
          <h2 className="text-7xl md:text-[120px] font-extrabold text-black leading-none opacity-25">
            Blogs
          </h2>
          <h3 className="text-lg md:text-4xl font-bold -mt-16 relative z-10">
            Your Selected Blog
            <div className="w-20 h-1 bg-blue-500 mx-auto mt-3"></div>
          </h3>
        </div>

        {/* Blog Card */}
        <div className="flex justify-center items-start">
          <div className="bg-indigo-200 w-full max-w-3xl shadow-3xl rounded-lg overflow-hidden">
            <figure className="w-full">
              <img
                src={blogData.thumbnail}
                alt={blogData.name}
                className="w-full h-80 object-cover"
              />
            </figure>
            <div className="p-8">
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                {blogData.title}
              </h2>
              <p className="text-gray-600 mb-4 text-base">{blogData.article}</p>

              {/* ✅ Show video if videoUrl exists */}
              {blogData.videoUrl && (
                <div className="mt-6">
                  <video
                    controls
                    className="w-full rounded-md shadow-md"
                    src={blogData.videoUrl}
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetails;
