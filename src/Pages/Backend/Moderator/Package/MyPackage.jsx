import React, { useState } from "react";

const dummyPackages = [
  {
    id: 1,
    title: "Starter Pack",
    shortDescription:
      "This starter pack includes basic features suitable for beginners and small projects.",
    status: "Active",
  },
  {
    id: 2,
    title: "Business Pack",
    shortDescription:
      "Perfect for growing businesses, this package offers advanced tools and support.",
    status: "Inactive",
  },
  {
    id: 3,
    title: "Premium Pack",
    shortDescription:
      "All-inclusive package with premium features and priority customer service.",
    status: "Active",
  },
];

const MyPackage = () => {
  const [packages, setPackages] = useState(dummyPackages);
  const [searchTerm, setSearchTerm] = useState("");

  const handleView = (id) => {
    alert(`View package with ID: ${id}`);
  };

  const handleEdit = (id) => {
    alert(`Edit package with ID: ${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this package?")) {
      setPackages(packages.filter((pkg) => pkg.id !== id));
    }
  };

  const filteredPackages = packages.filter((pkg) =>
    pkg.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto bg-white shadow-2xl rounded-2xl p-6">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6">My Packages</h2>

        {/* Search Input */}
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
                    key={pkg.id}
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
                      <span
                        className={`px-3 py-1 text-sm rounded-full font-semibold ${
                          pkg.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {pkg.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 flex gap-3">
                      <button
                        onClick={() => handleView(pkg.id)}
                        className="text-blue-600 hover:text-blue-800 font-semibold"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleEdit(pkg.id)}
                        className="text-indigo-600 hover:text-indigo-800 font-semibold"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(pkg.id)}
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
