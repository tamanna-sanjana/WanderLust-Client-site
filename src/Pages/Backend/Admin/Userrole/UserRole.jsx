import React, { useState } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';

const UserRole = () => {
  const [role, setRole] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();

  const newRole = {
    role,
    status: 1,
  };

  try {
    const { data } = await axios.post("https://wander-lust-server-site.vercel.app/api/roles", newRole);

    if (data.insertedId || data.acknowledged) {
      setRole("");

      // Show SweetAlert and wait for confirmation before reload
      Swal.fire("Success", "Role added successfully", "success").then(() => {
        window.location.reload();
      });
    }
  } catch (error) {
    console.error("Error adding role:", error);
    Swal.fire("Error", "Failed to add role", "error");
  }
};



  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-3xl w-full max-w-xl p-10 space-y-6">
        <h2 className="text-3xl font-bold text-center text-indigo-700">
          👤 Add User Role
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Role Name */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Role Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g., Admin, Editor, Customer"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
              required
            />
          </div>



          {/* Submit */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition transform hover:scale-105 duration-300"
            >
              ➕ Add Role
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserRole;
