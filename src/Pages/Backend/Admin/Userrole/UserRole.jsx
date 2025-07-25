import React, { useState } from "react";

const UserRole = () => {
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("active");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRole = {
      role,
      status,
    };
    console.log("User Role Added:", newRole);
    // Reset form
    setRole("");
    setStatus("active");
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

          {/* Status */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Status
            </label>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 text-gray-600">
                <input
                  type="radio"
                  value="active"
                  checked={status === "active"}
                  onChange={() => setStatus("active")}
                  className="accent-indigo-600"
                />
                Active
              </label>
              <label className="flex items-center gap-2 text-gray-600">
                <input
                  type="radio"
                  value="inactive"
                  checked={status === "inactive"}
                  onChange={() => setStatus("inactive")}
                  className="accent-red-500"
                />
                Inactive
              </label>
            </div>
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
