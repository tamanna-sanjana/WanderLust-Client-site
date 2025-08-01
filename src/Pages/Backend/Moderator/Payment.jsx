import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../Components/Backend/Provider/AuthContext";

const Payment = () => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchPosts = async () => {
    if (!user) return;
    setLoading(true);
    setError(null);

    try {
      const token = await user.getIdToken();
      const res = await axios.get("http://localhost:3000/api/payments", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(res.data);
    } catch (error) {
      console.error("❌ Fetch error:", error);
      setError("⚠️ Failed to load payments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [user]);

  // 🔍 Filter posts based on searchTerm (phone/card number)
  const filteredPosts = posts.filter((payment) =>
    payment?.bkashNumber?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 md:p-10 min-h-screen bg-gradient-to-b from-gray-50 to-indigo-100">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6 text-center">
        💳 Payment History
      </h1>

      {/* Search */}
      <div className="max-w-md mx-auto mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="🔍 Search by phone/card number..."
          className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center text-indigo-600 text-lg py-4">
          Loading payment data...
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="text-center text-red-600 py-4">{error}</div>
      )}

      {/* Table */}
      {!loading && filteredPosts.length > 0 && (
        <div className="overflow-x-auto bg-white shadow-2xl rounded-xl">
          <table className="min-w-full text-sm text-left table-auto">
            <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
              <tr>
                <th className="px-6 py-4">#</th>
                <th className="px-6 py-4">Package ID</th>
                <th className="px-6 py-4">Payment Method</th>
                <th className="px-6 py-4">Phone/Card Number</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPosts.map((payment, index) => {
                const paymentDate = payment?.paymentDate
                  ? new Date(payment.paymentDate)
                  : null;

                return (
                  <tr
                    key={payment._id || index}
                    className="hover:bg-indigo-50 transition duration-200"
                  >
                    <td className="px-6 py-4 font-medium">{index + 1}</td>
                    <td className="px-6 py-4">{payment?.packageId || "N/A"}</td>
                    <td className="px-6 py-4 capitalize">{payment?.method || "N/A"}</td>
                    <td className="px-6 py-4">
                      {payment?.bkashNumber || "—"}
                    </td>
                    <td className="px-6 py-4">{payment?.amount || "—"} ৳</td>
                    <td className="px-6 py-4">
                      {paymentDate
                        ? paymentDate.toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                        : "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      {paymentDate
                        ? paymentDate.toLocaleTimeString("en-GB", {
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                            hour12: false,
                          })
                        : "N/A"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* No results */}
      {!loading && filteredPosts.length === 0 && !error && (
        <div className="text-center text-gray-500 mt-6">
          No payments match your search.
        </div>
      )}
    </div>
  );
};

export default Payment;
