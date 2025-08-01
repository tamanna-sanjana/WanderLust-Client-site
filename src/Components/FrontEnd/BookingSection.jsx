// BookingSection.jsx
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";

export default function BookingSection({ selectedPackage, onClose }) {
  // ✅ Initialize form with empty values
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    days: "",
    date: "",
    destination: "",
    persons: "1",
    package: "",
    request: "",
    price: "",
  });

  // ✅ Populate destination, package, and price when selectedPackage changes
  useEffect(() => {
    if (selectedPackage) {
      setFormData((prev) => ({
        ...prev,
        destination: selectedPackage.destination || "",
        package: selectedPackage.title || "",
        price: selectedPackage.price || "",
      }));
    }
  }, [selectedPackage]);

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Submit booking and payment
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, days, date } = formData;
    if (!name || !email || !days || !date) {
      Swal.fire({
        icon: "warning",
        title: "Please fill in all required fields",
      });
      return;
    }

    try {
      // 1️⃣ Save booking info
      await axios.post("http://localhost:3000/api/booking", formData);

      // 2️⃣ Mock payment
      const paymentRes = await axios.post("http://localhost:3000/api/payment", {
        email: formData.email,
        amount: formData.price,
        method: "Bkash",
        package: formData.package,
        status: "Success",
      });

      // 3️⃣ Success message
      Swal.fire({
        icon: "success",
        title: "Booking & Payment Successful!",
        text: `Transaction ID: ${paymentRes.data.transactionId}`,
      });

      // 4️⃣ Close modal
      onClose();

      // 5️⃣ Reset form
      setFormData({
        name: "",
        email: "",
        days: "",
        date: "",
        destination: selectedPackage?.destination || "",
        persons: "1",
        package: selectedPackage?.title || "",
        request: "",
        price: selectedPackage?.price || "",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error processing booking/payment!",
      });
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-3xl p-8 shadow-2xl relative">
        {/* ❌ Close Button */}
        <button onClick={onClose} className="absolute top-2 right-3 text-xl font-bold">✖</button>

        {/* ✅ Modal Title */}
        <h2 className="text-3xl font-semibold mb-6 text-center text-blue-900">
          Booking for {selectedPackage?.title}
        </h2>

        {/* ✅ Booking Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="border px-4 py-2 rounded bg-gray-100"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="border px-4 py-2 rounded bg-gray-100"
              required
            />
            <input
              type="text"
              name="days"
              placeholder="Days of Stay"
              value={formData.days}
              onChange={handleChange}
              className="border px-4 py-2 rounded bg-gray-100"
              required
            />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="border px-4 py-2 rounded bg-gray-100"
              required
            />
            <select
              name="persons"
              value={formData.persons}
              onChange={handleChange}
              className="border px-4 py-2 rounded bg-gray-100"
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4+</option>
            </select>
            <input
              type="text"
              name="destination"
              value={formData.destination}
              readOnly
              className="border px-4 py-2 rounded bg-gray-100 text-gray-500"
            />
          </div>

          <textarea
            name="request"
            placeholder="Special Request"
            value={formData.request}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded bg-gray-100 resize-none"
            rows={3}
          />

          {/* ✅ Price Display */}
          <p className="font-bold text-blue-800 text-lg">
            Price: ৳{formData.price}
          </p>

          {/* ✅ Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-900 text-white py-2 rounded hover:bg-blue-700"
          >
            Pay via Bkash & Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
}
