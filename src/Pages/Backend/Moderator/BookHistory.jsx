import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../Components/Backend/Provider/AuthContext";
import Swal from "sweetalert2";

const BookHistory = () => {
  const { user } = useContext(AuthContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchBookings = async () => {
    if (!user) return;

    setLoading(true);
    setError("");

    try {
      const token = await user.getIdToken();
      const res = await axios.get("https://wander-lust-server-site.vercel.app/api/booking", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(res.data);
    } catch (err) {
      console.error("❌ Fetch error:", err);
      setError("⚠️ Failed to load bookings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [user]);

  // Update booking status in backend and update UI
  const handleStatusUpdate = async (bookingId, newStatus) => {
  if (!user) return;

  try {
    const token = await user.getIdToken();
    await axios.put(
      `https://wander-lust-server-site.vercel.app/api/booking/${bookingId}`,
      { status: newStatus },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // Update local state
    setBookings((prev) =>
      prev.map((b) =>
        b._id === bookingId || b.id === bookingId ? { ...b, status: newStatus } : b
      )
    );

    // ✅ Show success toast
    Swal.fire({
      icon: "success",
      title:
        newStatus === 1
          ? "Checked In successfully!"
          : newStatus === 2
          ? "Checked Out successfully!"
          : "Status Updated!",
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });
  } catch (err) {
    console.error("❌ Update error:", err);
    // ❌ Show error alert
    Swal.fire({
      icon: "error",
      title: "Failed to update status",
      text: err.response?.data?.error || "Something went wrong.",
    });
  }
};

  // Map numeric status to text
  const getStatusText = (status) => {
    switch (status) {
      case 0:
        return "Waiting for Check In";
      case 1:
        return "Check In";
      case 2:
        return "Check Out";
      default:
        return "Unknown";
    }
  };

  // Status badge styles by numeric status
  const getStatusStyle = (status) => {
    switch (status) {
      case 0:
        return "bg-yellow-100 text-yellow-700";
      case 1:
        return "bg-blue-100 text-blue-700";
      case 2:
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const filteredBookings = bookings.filter((booking) =>
    (booking.name || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-purple-100 p-6">
      <div className="bg-white shadow-lg rounded-xl p-6 overflow-x-auto">
        <h2 className="text-3xl font-bold text-purple-700 mb-6 text-center">
          Booking History
        </h2>

        <div className="flex justify-end mb-4">
          <input
            type="text"
            placeholder="Search by client name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-purple-300 rounded-md px-4 py-2 w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        {loading && <div className="text-center text-gray-500 py-4">Loading...</div>}
        {error && <div className="text-center text-red-500 py-4">{error}</div>}

        {!loading && filteredBookings.length > 0 && (
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-purple-100 text-purple-700 text-left">
                <th className="px-4 py-3 border-b">#</th>
                <th className="px-4 py-3 border-b">Client Name</th>
                <th className="px-4 py-3 border-b">Package Name</th>
                <th className="px-4 py-3 border-b">Status</th>
                <th className="px-4 py-3 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking, index) => (
                <tr
                  key={booking._id || booking.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {booking.name || "Unknown"}
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {booking.title || "Unknown"}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusStyle(
                        booking.status
                      )}`}
                    >
                      {getStatusText(booking.status)}
                    </span>
                  </td>
                  <td className="px-4 py-3 space-x-2">
                    {/* Hide buttons if status === 2 */}
                    {booking.status !== 2 && (
                      <>
                        {booking.status === 0 && (
                          <button
                            onClick={() => handleStatusUpdate(booking._id || booking.id, 1)}
                            className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                          >
                            Check In
                          </button>
                        )}
                        {booking.status === 1 && (
                          <button
                            onClick={() => handleStatusUpdate(booking._id || booking.id, 2)}
                            className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                          >
                            Check Out
                          </button>
                        )}
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {!loading && filteredBookings.length === 0 && (
          <div className="text-center text-gray-500 py-6">No bookings found.</div>
        )}
      </div>
    </div>
  );
};

export default BookHistory;
