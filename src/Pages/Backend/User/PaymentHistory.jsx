import React from "react";
import { Eye } from "lucide-react";

const dummyPayments = [
  {
    id: "p001",
    name: "John Doe",
    email: "john@example.com",
    amount: "$99.00",
    status: "Paid",
    date: "2025-07-10",
  },
  {
    id: "p002",
    name: "Jane Smith",
    email: "jane@example.com",
    amount: "$49.00",
    status: "Pending",
    date: "2025-07-15",
  },
  {
    id: "p003",
    name: "Alice Johnson",
    email: "alice@example.com",
    amount: "$129.00",
    status: "Failed",
    date: "2025-07-20",
  },
];

const statusBadge = (status) => {
  const base =
    "px-3 py-1 text-xs font-semibold rounded-full text-white inline-block";
  switch (status) {
    case "Paid":
      return `${base} bg-green-500`;
    case "Pending":
      return `${base} bg-yellow-500`;
    case "Failed":
      return `${base} bg-red-500`;
    default:
      return `${base} bg-gray-400`;
  }
};

const PaymentHistory = () => {
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
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {dummyPayments.map((payment, index) => (
              <tr
                key={payment.id}
                className="hover:bg-indigo-50 transition duration-200"
              >
                <td className="px-6 py-4 font-medium">{index + 1}</td>
                <td className="px-6 py-4">{payment.name}</td>
                <td className="px-6 py-4">{payment.email}</td>
                <td className="px-6 py-4">{payment.amount}</td>
                <td className="px-6 py-4">
                  <span className={statusBadge(payment.status)}>
                    {payment.status}
                  </span>
                </td>
                <td className="px-6 py-4">{payment.date}</td>
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

export default PaymentHistory;
