import React, { useState } from "react";
import { Pencil } from "lucide-react";

const dummyData = [
  {
    id: 1,
    icon: "https://via.placeholder.com/40",
    title: "Web Development",
    status: "Active",
  },
  {
    id: 2,
    icon: "https://via.placeholder.com/40",
    title: "SEO Optimization",
    status: "Inactive",
  },
  {
    id: 3,
    icon: "https://via.placeholder.com/40",
    title: "Graphic Design",
    status: "Active",
  },
];

const AllService = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredServices = dummyData.filter((service) =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-2xl p-6">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-3xl font-bold text-indigo-700">All Services</h2>
          <input
            type="text"
            placeholder="Search by title..."
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border border-gray-200">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Icon</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {filteredServices.length > 0 ? (
                filteredServices.map((service, index) => (
                  <tr
                    key={service.id}
                    className="border-t border-gray-200 hover:bg-indigo-50 transition"
                  >
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3">
                      <img
                        src={service.icon}
                        alt="icon"
                        className="w-10 h-10 object-cover rounded-full shadow"
                      />
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-700">
                      {service.title}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 text-sm rounded-full font-semibold ${
                          service.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {service.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition">
                        <Pencil size={18} />
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-6 text-gray-500 font-medium"
                  >
                    No services found.
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

export default AllService;
