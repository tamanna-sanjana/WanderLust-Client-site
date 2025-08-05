import React, { useContext, useEffect, useState } from "react";
import { Eye } from "lucide-react";
import axios from "axios";
import { AuthContext } from "../../../Components/Backend/Provider/AuthContext";

const statusBadge = (status) => {
  const base =
    "px-3 py-1 text-xs font-semibold rounded-full inline-block text-white";
  switch (status) {
    case 0:
      return `${base} bg-yellow-500`; // Waiting
    case 1:
      return `${base} bg-blue-500`; // Check In
    case 2:
      return `${base} bg-green-500`; // Check Out
    default:
      return `${base} bg-gray-400`; // Unknown
  }
};

const BookHistories = () => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      const token = await user.getIdToken();
      const res = await axios.get("https://wander-lust-server-site.vercel.app/api/mybooking", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(res.data);
    } catch (error) {
      console.error("❌ Fetch error:", error);
      setError("⚠️ Failed to load bookings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [user]);

  return (
    <div className="p-6 md:p-10">
      <h1 className="text-3xl font-bold text-indigo-700 mb-8 text-center">
        📚 Booking History
      </h1>

      {loading ? (
        <div className="text-center text-gray-500 font-medium">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500 font-medium">{error}</div>
      ) : posts.length === 0 ? (
        <div className="text-center text-gray-500 font-medium">
          No bookings found.
        </div>
      ) : (
        <div className="overflow-x-auto bg-white shadow-2xl rounded-xl">
          <table className="min-w-full text-sm text-left table-auto">
            <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
              <tr>
                <th className="px-6 py-4">#</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Package Id</th>
                <th className="px-6 py-4">Number Of Person</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {posts.map((booking, index) => (
                <tr
                  key={booking._id || index}
                  className="hover:bg-indigo-50 transition duration-200"
                >
                  <td className="px-6 py-4 font-medium">{index + 1}</td>
                  <td className="px-6 py-4">{booking.title}</td>
                  <td className="px-6 py-4">{booking.packageId}</td>
                  <td className="px-6 py-4">{booking.persons}</td>
                  <td className="px-6 py-4">
                    <span className={statusBadge(booking.status)}>
                      {booking.status === 0
                        ? "Waiting for Check In"
                        : booking.status === 1
                        ? "Check In"
                        : booking.status === 2
                        ? "Check Out"
                        : "Unknown"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BookHistories;
