import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../Components/Backend/Provider/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
import { NavLink } from "react-router";

const MyPackage = () => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch user's packages
  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = await user.getIdToken();
      const res = await axios.get("http://localhost:3000/api/mypost", {
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

  // Toggle status
  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 1 ? 0 : 1;

    try {
      await axios.put(`http://localhost:3000/api/packages/status/${id}`, {
        status: newStatus,
      });

      Swal.fire(
        "Updated!",
        `Status changed to ${newStatus === 1 ? "Active" : "Inactive"}.`,
        "success"
      );
      fetchPosts(); // <== Correct function name here
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
        await axios.delete(`http://localhost:3000/api/packages/${id}`);
        Swal.fire("Deleted!", "The package has been deleted.", "success");
        fetchPosts();
      } catch (error) {
        console.error("❌ Error deleting package:", error);
        Swal.fire("Error", "Failed to delete the package.", "error");
      }
    }
  };

  // Search filter
  const filteredPackages = posts.filter((pkg) =>
    pkg.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto bg-white shadow-2xl rounded-2xl p-6">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6">My Packages</h2>

        {error && <div className="text-red-500 mb-4">{error}</div>}
        {loading && <div className="text-gray-500 mb-4">Loading packages...</div>}

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search packages by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-sm px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 text-left">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="px-5 py-3">#</th>
                <th className="px-5 py-3">Title</th>
                <th className="px-5 py-3">Short Description</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Action</th>
              </tr>
            </thead>

            <tbody className="bg-white">
              {filteredPackages.length > 0 ? (
                filteredPackages.map((pkg, index) => (
                  <tr
                    key={pkg._id}
                    className="border-t border-gray-200 hover:bg-indigo-50 transition"
                  >
                    <td className="px-5 py-3">{index + 1}</td>
                    <td className="px-5 py-3 font-medium text-gray-700">
                      {pkg.title}
                    </td>
                    <td className="px-5 py-3 max-w-xl break-words">
                      {pkg.shortDescription}
                    </td>
                    <td className="px-5 py-3">
                      <button
                        onClick={() => handleToggleStatus(pkg._id, pkg.status)}
                        className={`px-3 py-1 text-sm rounded-full font-semibold transition duration-200 ${
                          pkg.status === 1
                            ? "bg-green-100 text-green-700 hover:bg-green-200"
                            : "bg-red-100 text-red-700 hover:bg-red-200"
                        }`}
                      >
                        {pkg.status === 1 ? "Active" : "Inactive"}
                      </button>
                    </td>

                    <td className="px-5 py-3 flex gap-3">
                      <NavLink to={`viewpackage/${pkg._id}`}
                        className="text-blue-600 hover:text-blue-800 font-semibold"
                      >
                        View
                      </NavLink>
                      <NavLink to={`editpackage/${pkg._id}`}
                        className="text-indigo-600 hover:text-indigo-800 font-semibold"
                      >
                        Edit
                      </NavLink>
                      <button
                        onClick={() => handleDelete(pkg._id)}
                        className="text-red-600 hover:text-red-800 font-semibold"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500">
                    No packages found.
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

export default MyPackage;
