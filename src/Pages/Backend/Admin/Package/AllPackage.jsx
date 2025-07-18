import React, { useState } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

const AllPackage = () => {
  const [packages, setPackages] = useState([
    { id: 1, title: "Discover Maldives", status: "Active" },
    { id: 2, title: "Explore Japan", status: "Inactive" },
    { id: 3, title: "Europe Highlights", status: "Active" },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-teal-100 to-indigo-100 py-10 px-6">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-3xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-8">
          📦 All Travel Packages
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-separate border-spacing-y-4">
            <thead>
              <tr className="text-left text-gray-700 bg-indigo-50 rounded-lg">
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {packages.map((pkg, index) => (
                <tr
                  key={pkg.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300"
                >
                  <td className="px-4 py-3 font-semibold text-gray-600">
                    {index + 1}
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {pkg.title}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        pkg.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {pkg.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 flex justify-center gap-4 text-xl">
                    <button
                      title="View"
                      className="text-blue-600 hover:text-blue-800 transition"
                    >
                      <FaEye />
                    </button>
                    <button
                      title="Edit"
                      className="text-yellow-500 hover:text-yellow-600 transition"
                    >
                      <FaEdit />
                    </button>
                    <button
                      title="Delete"
                      className="text-red-500 hover:text-red-700 transition"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
              {packages.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-10 text-gray-500 font-semibold"
                  >
                    No Packages Available 🚫
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllPackage;
