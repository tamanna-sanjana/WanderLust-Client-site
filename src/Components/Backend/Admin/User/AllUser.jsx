import React, { useEffect, useState } from "react";
import { Search, User, Mail } from "lucide-react";
import axios from "axios";
import Swal from "sweetalert2";
import { NavLink } from "react-router";

const AllUser = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

const handleDelete = async (id) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  });

  if (result.isConfirmed) {
    try {
      await axios.delete(`https://wander-lust-server-site.vercel.app/adduser/${id}`);
      Swal.fire("Deleted!", "The user has been deleted.", "success").then(() => {
        window.location.reload();
      });
    } catch (error) {
      console.error("❌ Failed to delete user:", error);
      Swal.fire("Error", "Failed to delete the user. Try again.", "error");
    }
  }
};

  // Fetch all users on mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get("https://wander-lust-server-site.vercel.app/adduser");
        setUsers(data);
      } catch (error) {
        console.error("❌ Failed to fetch users:", error);
      }
    };
    fetchUsers();
  }, []);

  // Search users by name, email, or role with debounce
  useEffect(() => {
    if (searchQuery.trim() === "") {
      // Reset to all users if search is empty
      axios
        .get("https://wander-lust-server-site.vercel.app/adduser")
        .then((res) => setUsers(res.data))
        .catch((err) => console.error("❌ Failed to fetch users:", err));
      return;
    }

    const delayDebounce = setTimeout(() => {
      axios
        .get(
          `https://wander-lust-server-site.vercel.app/searchUsers?query=${encodeURIComponent(
            searchQuery
          )}`
        )
        .then((res) => {
          setUsers(res.data);
        })
        .catch((err) => {
          console.error("❌ Search failed", err);
        });
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  // Toggle role between 'user' and 'member'
  const handleToggleRole = async (userId, currentRole) => {
    const newRole = currentRole === "user" ? "member" : "user";
    try {
      await axios.patch(`https://wander-lust-server-site.vercel.app/updateRole/${userId}`, {
        role: newRole,
      });

      Swal.fire({
        icon: "success",
        title: "Role Updated",
        text: `User is now a ${newRole}`,
        timer: 1500,
        showConfirmButton: false,
      });

      // Refresh user list after role update
      const { data } = await axios.get("https://wander-lust-server-site.vercel.app/adduser");
      setUsers(data);
    } catch (error) {
      console.error("❌ Failed to update role:", error.message);
      Swal.fire({
        icon: "error",
        title: "Failed to Update Role",
        text: error.message,
      });
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-indigo-700 flex items-center gap-2">
            <User size={28} className="text-indigo-500" /> All Users
          </h2>

          {/* Search Input */}
          <div className="relative w-full max-w-xs">
            <input
              type="text"
              placeholder="Search users by name, email, or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-2 pl-10 pr-4 rounded-xl border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <Search
              className="absolute left-3 top-2.5 text-indigo-400"
              size={18}
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-indigo-200">
            <thead className="bg-indigo-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-indigo-600 uppercase tracking-wider">
                  #
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-indigo-600 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-indigo-600 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-indigo-600 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-indigo-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-indigo-100">
              {[...users].reverse().map((user, index) => (
                <tr key={user._id} className="hover:bg-indigo-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 flex items-center gap-1">
                    <Mail size={16} className="text-indigo-400" />
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        user.role === "admin"
                          ? "bg-green-100 text-green-700"
                          : user.role === "member"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600 font-semibold space-x-2">
                    <NavLink to={`edit-user/${user._id}`} className="hover:underline" >Edit</NavLink>
                    <button
  className="hover:underline text-red-500"
  onClick={() => handleDelete(user._id)} // pass user._id here
>
  Delete
</button>
                    {(user.role === "user" || user.role === "member") && (
                      <button
                        onClick={() => handleToggleRole(user._id, user.role)}
                        className="hover:underline text-yellow-500"
                      >
                        Make {user.role === "user" ? "Member" : "User"}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllUser;
