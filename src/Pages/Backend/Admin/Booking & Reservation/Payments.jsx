import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../../Components/Backend/Provider/AuthContext";

const Payments = () => {
  const { user } = useContext(AuthContext);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPayments = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get("https://wander-lust-server-site.vercel.app/all/payments");
      setPayments(res.data || []);
    } catch (error) {
      console.error("❌ Fetch error:", error);
      setError("⚠️ Failed to load payment history.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [user]);

  return (
    <div className="p-6 md:p-10">
      <h1 className="text-3xl font-bold text-indigo-700 mb-8 text-center">
        💳 Payment History
      </h1>

      {error && <p className="text-red-600 text-center mb-4">{error}</p>}
      {loading && <p className="text-gray-600 text-center mb-4">Loading...</p>}

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
           {[...payments].reverse().map((payment, index) => (
  <tr
    key={payment._id || index}
    className="hover:bg-indigo-50 transition duration-200"
  >
    <td className="px-6 py-4 font-medium">{index + 1}</td>
    <td className="px-6 py-4">{payment.packageId || "N/A"}</td>
    <td className="px-6 py-4">{payment.method || "N/A"}</td>
    <td className="px-6 py-4">{payment.bkashNumber || "N/A"}</td>
    <td className="px-6 py-4">{payment.amount || "N/A"}</td>
    <td className="px-6 py-4">
      {payment?.paymentDate
        ? new Date(payment.paymentDate).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
        : "N/A"}
    </td>
    <td className="px-6 py-4">
      {payment?.paymentDate
        ? new Date(payment.paymentDate).toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
          })
        : "N/A"}
    </td>
  </tr>
))}

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payments;
