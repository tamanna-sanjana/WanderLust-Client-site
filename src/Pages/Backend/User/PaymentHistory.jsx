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

const PaymentHistory = () => {
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
      const res = await axios.get("http://localhost:3000/api/mypayments", {
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
        💳 Payment History
      </h1>

      <div className="overflow-x-auto bg-white shadow-2xl rounded-xl">
        <table className="min-w-full text-sm text-left table-auto">
          <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
            <tr>
              <th className="px-6 py-4">#</th>
              <th className="px-6 py-4">Package ID</th>
              <th className="px-6 py-4">Payment Method</th>
              <th className="px-6 py-4">Phone Number / Card Number</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {posts.map((payment, index) => (
              <tr
                key={payment.id}
                className="hover:bg-indigo-50 transition duration-200"
              >
                <td className="px-6 py-4 font-medium">{index + 1}</td>
                <td className="px-6 py-4">{payment.packageId}</td>
                <td className="px-6 py-4">{payment.method}</td>
                <td className="px-6 py-4">{payment.bkashNumber}</td>
                <td className="px-6 py-4">{payment.amount}</td>
                <td className="px-6 py-4">
                  {new Date(payment.paymentDate).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="px-6 py-4">
                  {new Date(payment.paymentDate).toLocaleTimeString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: false, // Use true if you want AM/PM format
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
