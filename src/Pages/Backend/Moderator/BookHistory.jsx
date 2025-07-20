import React, { useState } from "react";

const BookHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const bookings = [
    { id: 1, clientName: "John Doe", status: "Booked" },
    { id: 2, clientName: "Jane Smith", status: "Pending" },
    { id: 3, clientName: "Alice Johnson", status: "Confirm" },
    { id: 4, clientName: "Michael Brown", status: "Check In" },
    { id: 5, clientName: "Sarah Davis", status: "Check Out" },
  ];

  const filteredBookings = bookings.filter((booking) =>
    booking.clientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusStyle = (status) => {
    switch (status) {
      case "Booked":
        return "bg-indigo-100 text-indigo-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Confirm":
        return "bg-green-100 text-green-700";
      case "Check In":
        return "bg-blue-100 text-blue-700";
      case "Check Out":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-purple-100 p-6">
      <div className="bg-white shadow-lg rounded-xl p-6 overflow-x-auto">
        <h2 className="text-3xl font-bold text-purple-700 mb-6 text-center">
          Booking History
        </h2>

        {/* Search Input */}
        <div className="flex justify-end mb-4">
          <input
            type="text"
            placeholder="Search by client name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-purple-300 rounded-md px-4 py-2 w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        {/* Booking Table */}
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-purple-100 text-purple-700 text-left">
              <th className="px-4 py-3 border-b">#</th>
              <th className="px-4 py-3 border-b">Client Name</th>
              <th className="px-4 py-3 border-b">Status</th>
              <th className="px-4 py-3 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((booking, index) => (
              <tr
                key={booking.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3 font-medium text-gray-800">
                  {booking.clientName}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusStyle(
                      booking.status
                    )}`}
                  >
                    {booking.status}
                  </span>
                </td>
                <td className="px-4 py-3 space-x-2">
                  <button className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600">
                    Confirm
                  </button>
                  <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
                    Check In
                  </button>
                  <button className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600">
                    Check Out
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredBookings.length === 0 && (
          <div className="text-center text-gray-500 py-6">
            No bookings found.
          </div>
        )}
      </div>
    </div>
  );
};

export default BookHistory;
