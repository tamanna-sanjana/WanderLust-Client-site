import React from "react";
import { Search, User, Mail, ShieldCheck } from "lucide-react";

const AllUser = () => {
  return (
    <div className=" p-6">
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
              placeholder="Search users..."
              className="w-full py-2 pl-10 pr-4 rounded-xl border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <Search className="absolute left-3 top-2.5 text-indigo-400" size={18} />
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
              {/* Example Row */}
              <tr className="hover:bg-indigo-50 transition">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">1</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                  Jeshan Khan
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 flex items-center gap-1">
                  <Mail size={16} className="text-indigo-400" />
                  jeshan@example.com
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                    Admin
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600 font-semibold space-x-2">
                  <button className="hover:underline">Edit</button>
                  <button className="hover:underline text-red-500">Delete</button>
                </td>
              </tr>

              {/* Add more rows dynamically later */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllUser;
