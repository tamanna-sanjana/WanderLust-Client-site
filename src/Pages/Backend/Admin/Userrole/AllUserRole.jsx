import React, { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

const AllUserRole = () => {
  const [roles, setRoles] = useState([
    { id: 1, name: "Admin", status: "active" },
    { id: 2, name: "Editor", status: "inactive" },
    { id: 3, name: "Customer", status: "active" },
  ]);

  const handleEdit = (id) => {
    alert(`Edit Role ID: ${id}`);
  };

  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure you want to delete this role?");
    if (confirm) {
      setRoles(roles.filter((role) => role.id !== id));
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
              <tr key={role.id} className="border-b hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-medium">{index + 1}</td>
                <td className="px-6 py-4">{role.name}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      role.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {role.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-center flex gap-4 justify-center">
                  <button
                    onClick={() => handleEdit(role.id)}
                    className="text-blue-600 hover:text-blue-800 transition"
                    title="Edit"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(role.id)}
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
