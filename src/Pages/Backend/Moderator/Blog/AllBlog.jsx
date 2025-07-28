import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../../Components/Backend/Provider/AuthContext";

const AllBlog = () => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = await user.getIdToken();
      const res = await axios.get("http://localhost:3000/api/myblog", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(res.data);
    } catch (error) {
      console.error("❌ Fetch error:", error);
      setError("⚠️ Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchPosts();
  }, [user]);

  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 1 ? 0 : 1;

    try {
      await axios.put(`http://localhost:3000/api/blog/status/${id}`, {
        status: newStatus,
      });

      Swal.fire(
        "Updated!",
        `Status changed to ${newStatus === 1 ? "Active" : "Inactive"}.`,
        "success"
      );
      fetchPosts();
    } catch (error) {
      console.error("❌ Failed to update status:", error);
      Swal.fire("Error", "Could not update status", "error");
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:3000/api/blog/${id}`);
        Swal.fire("Deleted!", "The blog has been deleted.", "success");
        fetchPosts();
      } catch (error) {
        console.error("❌ Error deleting blog:", error);
        Swal.fire("Error", "Failed to delete the blog.", "error");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 p-6">
      <div className="bg-white shadow-lg rounded-xl p-6 overflow-x-auto">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center">
          All Blogs
        </h2>

        {loading ? (
          <p className="text-center text-blue-500">Loading blogs...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <>
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-indigo-100 text-indigo-700 text-left">
                  <th className="px-4 py-3 border-b">#</th>
                  <th className="px-4 py-3 border-b">Title</th>
                  <th className="px-4 py-3 border-b">Short Description</th>
                  <th className="px-4 py-3 border-b">Status</th>
                  <th className="px-4 py-3 border-b">Action</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((blog, index) => (
                  <tr
                    key={blog._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3 font-medium text-gray-800">
                      {blog.title}
                    </td>
                    <td className="px-4 py-3 text-gray-600 max-w-xs whitespace-pre-wrap">
                      {blog.shortDescription ||
                        blog.article.slice(0, 100) + "..."}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleToggleStatus(blog._id, blog.status)}
                        className={`px-3 py-1 rounded-full text-sm font-semibold focus:outline-none ${
                          blog.status === 1
                            ? "bg-green-100 text-green-700 hover:bg-green-200"
                            : "bg-red-100 text-red-700 hover:bg-red-200"
                        }`}
                        title="Click to toggle status"
                      >
                        {blog.status === 1 ? "Active" : "Inactive"}
                      </button>
                    </td>
                    <td className="px-4 py-3 space-x-2">
                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {posts.length === 0 && (
              <div className="text-center text-gray-500 py-6">No blogs found.</div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AllBlog;
