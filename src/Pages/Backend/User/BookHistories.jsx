import React from "react";
import { Eye } from "lucide-react";

const dummyBookings = [
  {
    id: "b001",
    name: "John Doe",
    email: "john@example.com",
    packageName: "Premium Plan",
    status: "Confirmed",
  },
  {
    id: "b002",
    name: "Jane Smith",
    email: "jane@example.com",
    packageName: "Basic Plan",
    status: "Pending",
  },
  {
    id: "b003",
    name: "Alice Johnson",
    email: "alice@example.com",
    packageName: "Business Plan",
    status: "Cancelled",
  },
];

const statusBadge = (status) => {
  const base =
    "px-3 py-1 text-xs font-semibold rounded-full inline-block text-white";
  switch (status) {
    case "Confirmed":
      return `${base} bg-green-500`;
    case "Pending":
      return `${base} bg-yellow-500`;
    case "Cancelled":
      return `${base} bg-red-500`;
    default:
      return `${base} bg-gray-400`;
  }
};

const BookHistories = () => {
  return (
    <div className="p-6 md:p-10">
      <h1 className="text-3xl font-bold text-indigo-700 mb-8 text-center">
        📚 Booking History
      </h1>

      <div className="overflow-x-auto bg-white shadow-2xl rounded-xl">
        <table className="min-w-full text-sm text-left table-auto">
          <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
            <tr>
              <th className="px-6 py-4">#</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Package</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {dummyBookings.map((booking, index) => (
              <tr
                key={booking.id}
                className="hover:bg-indigo-50 transition duration-200"
              >
                <td className="px-6 py-4 font-medium">{index + 1}</td>
                <td className="px-6 py-4">{booking.name}</td>
                <td className="px-6 py-4">{booking.email}</td>
                <td className="px-6 py-4">{booking.packageName}</td>
                <td className="px-6 py-4">
                  <span className={statusBadge(booking.status)}>
                    {booking.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-lg shadow-md flex items-center gap-1 text-sm transition">
                    <Eye size={16} /> View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookHistories;
