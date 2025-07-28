import React, { useEffect, useState } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import { NavLink } from "react-router";

const AllPackage = () => {
  const [packages, setPackages] = useState([]);

  // Fetch packages
  const fetchPackages = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/packages");
      setPackages(response.data);
    } catch (error) {
      console.error("❌ Error fetching packages:", error);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

// Delete package with SweetAlert confirmation
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
      await axios.delete(`http://localhost:3000/api/packages/${id}`);
      Swal.fire("Deleted!", "The package has been deleted.", "success");
      fetchPackages(); // Refresh list
    } catch (error) {
      console.error("❌ Error deleting package:", error);
      Swal.fire("Error", "Failed to delete the package.", "error");
    }
  }
};


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
                <th className="px-4 py-3">Sub Title</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {packages.map((pkg, index) => (
                <tr
                  key={pkg._id}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300"
                >
                  <td className="px-4 py-3 font-semibold text-gray-600">{index + 1}</td>
                  <td className="px-4 py-3 font-medium text-gray-800">{pkg.title}</td>
                  <td className="px-4 py-3 font-medium text-gray-800">{pkg.subtitle}</td>
                  <td className="px-4 py-3 flex justify-center gap-4 text-xl">
                    <NavLink to={`viewpackage/${pkg._id}`}
                      title="View"
                      className="text-blue-600 hover:text-blue-800 transition"
                    >
                      <FaEye />
                    </NavLink>
                    <NavLink to={`editpackage/${pkg._id}`}
                      title="Edit"
                      className="text-yellow-500 hover:text-yellow-600 transition"
                    >
                      <FaEdit />
                    </NavLink>
                    <button
                      title="Delete"
                      onClick={() => handleDelete(pkg._id)}
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
