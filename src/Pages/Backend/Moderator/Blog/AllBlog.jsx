import React from "react";

const AllBlog = () => {
  const blogs = [
    {
      id: 1,
      title: "The Power of Simplicity",
      shortDescription: "Simplicity is the ultimate sophistication...",
      status: "Active",
    },
    {
      id: 2,
      title: "Exploring the Cosmos",
      shortDescription: "A journey into the vastness of space and time...",
      status: "Inactive",
    },
    {
      id: 3,
      title: "Minimalist Design Principles",
      shortDescription: "Understanding what makes design truly minimal...",
      status: "Active",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 p-6">
      <div className="bg-white shadow-lg rounded-xl p-6 overflow-x-auto">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center">
          All Blogs
        </h2>

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
            {blogs.map((blog, index) => (
              <tr
                key={blog.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3 font-medium text-gray-800">
                  {blog.title}
                </td>
                <td className="px-4 py-3 text-gray-600 max-w-xs whitespace-pre-wrap">
                  {blog.shortDescription}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      blog.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {blog.status}
                  </span>
                </td>
                <td className="px-4 py-3 space-x-2">
                  <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
                    View
                  </button>
                  <button className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600">
                    Edit
                  </button>
                  <button className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {blogs.length === 0 && (
          <div className="text-center text-gray-500 py-6">No blogs found.</div>
        )}
      </div>
    </div>
  );
};

export default AllBlog;
