import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Trash2 } from "lucide-react";

const AllServices = () => {
  const [services, setServices] = useState([]);

  // Fetch all services on mount
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/api/services");
        setServices(data);
      } catch (err) {
        console.error("Failed to fetch services", err);
        Swal.fire("Error", "Could not load services", "error");
      }
    };

    fetchServices();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmDelete.isConfirmed) {
      try {
        await axios.delete(`http://localhost:3000/api/services/${id}`);
        setServices((prev) => prev.filter((s) => s._id !== id));
        Swal.fire("Deleted!", "The service has been removed.", "success");
      } catch (err) {
        console.error("Delete error:", err);
        Swal.fire("Error", "Failed to delete service", "error");
      }
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
              <tr key={service._id} className="hover:bg-purple-50 transition-all">
                <td className="p-3 border border-purple-200 text-gray-700 font-semibold">{index + 1}</td>
                <td className="p-3 border border-purple-200">
                  <img
                    src={service.iconUrl}
                    alt="Service Icon"
                    className="h-10 w-10 rounded-full object-cover border shadow"
                  />
                </td>
                <td className="p-3 border border-purple-200 text-gray-700">{service.title}</td>
                <td className="p-3 border border-purple-200 text-center">
                  <button
                    onClick={() => handleDelete(service._id)}
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
