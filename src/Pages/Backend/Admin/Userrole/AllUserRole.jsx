import React, { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import axios from "axios";
import Swal from "sweetalert2";

const AllUserRole = () => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const { data } = await axios.get("https://wander-lust-server-site.vercel.app/api/roles");
        setRoles(data);
      } catch (error) {
        console.error("❌ Failed to fetch roles:", error);
      }
    };

    fetchRoles();
  }, []);

  const handleDelete = async (id) => {
  const confirmResult = await Swal.fire({
    title: "Are you sure?",
    text: "Do you really want to delete this role?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  });

  if (confirmResult.isConfirmed) {
    try {
      const { data } = await axios.delete(`https://wander-lust-server-site.vercel.app/api/roles/${id}`);

      if (data.deletedCount > 0) {
        setRoles((prev) => prev.filter((role) => role._id !== id)); // Adjusted for MongoDB _id
        Swal.fire("Deleted!", "The role has been deleted.", "success");
      } else {
        Swal.fire("Not Found", "Role not found or already deleted.", "info");
      }
    } catch (error) {
      console.error("❌ Delete Error:", error);
      Swal.fire("Error", "Failed to delete role.", "error");
    }
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-3xl p-6 overflow-x-auto">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          👥 All User Roles
        </h2>

        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-indigo-100 text-indigo-700 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3">User Role</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {roles.map((role, index) => (
              <tr
                key={role.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4 font-medium">{index + 1}</td>
                <td className="px-6 py-4">{role.role}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      role.status === 1
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {role.status === 1 ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-6 py-4 text-center flex gap-4 justify-center">
                  <button
                    onClick={() => handleDelete(role._id)}
                    className="text-red-600 hover:text-red-800 transition"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {roles.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-8 text-gray-500">
                  No roles available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUserRole;
