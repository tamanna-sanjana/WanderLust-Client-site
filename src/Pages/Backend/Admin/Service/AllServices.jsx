import React, { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

const AllServices = () => {
const [services, setServices] = useState([
  {
    id: 1,
    icon: "https://cdn-icons-png.flaticon.com/512/684/684908.png", // ✈️
    title: "Flight Booking",
  },
  {
    id: 2,
    icon: "https://cdn-icons-png.flaticon.com/512/235/235861.png", // 🏨
    title: "Hotel Reservation",
  },
  {
    id: 3,
    icon: "https://cdn-icons-png.flaticon.com/512/854/854894.png", // 🚗
    title: "Car Rentals",
  },
  {
    id: 4,
    icon: "https://cdn-icons-png.flaticon.com/512/201/201623.png", // 🌍
    title: "International Tours",
  },
  {
    id: 5,
    icon: "https://cdn-icons-png.flaticon.com/512/3081/3081559.png", // 🛳️
    title: "Cruise Trips",
  },
  {
    id: 6,
    icon: "https://cdn-icons-png.flaticon.com/512/854/854878.png", // 🏝️
    title: "Holiday Packages",
  },
]);


  const handleEdit = (id) => {
    alert(`Edit service with ID: ${id}`);
    // Navigate or open modal to edit
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this service?");
    if (confirmDelete) {
      setServices((prev) => prev.filter((s) => s.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-6 overflow-x-auto">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">All Services</h2>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-purple-200 text-purple-800">
              <th className="p-3 border border-purple-300">#</th>
              <th className="p-3 border border-purple-300">Icon</th>
              <th className="p-3 border border-purple-300">Title</th>
              <th className="p-3 border border-purple-300 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service, index) => (
              <tr key={service.id} className="hover:bg-purple-50 transition-all">
                <td className="p-3 border border-purple-200 text-gray-700 font-semibold">{index + 1}</td>
                <td className="p-3 border border-purple-200">
                  <img
                    src={service.icon}
                    alt="Service Icon"
                    className="h-10 w-10 rounded-full object-cover border shadow"
                  />
                </td>
                <td className="p-3 border border-purple-200 text-gray-700">{service.title}</td>
                <td className="p-3 border border-purple-200 text-center">
                  <button
                    onClick={() => handleEdit(service.id)}
                    className="text-blue-600 hover:text-blue-800 mr-4"
                    title="Edit"
                  >
                    <Pencil size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete"
                  >
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}

            {services.length === 0 && (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500 italic">
                  No services available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllServices;
