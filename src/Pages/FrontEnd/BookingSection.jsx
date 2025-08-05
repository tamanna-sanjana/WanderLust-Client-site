import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { AuthContext } from "../../Components/Backend/Provider/AuthContext";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const Booking = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [pkg, setPkg] = useState(null);
  const [paymentMethod] = useState("Bkash");
  const [showModal, setShowModal] = useState(false);
  const [bkashNumber, setBkashNumber] = useState("");
  const [persons, setPersons] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    axios
      .get(`https://wander-lust-server-site.vercel.app/api/packages/${id}`)
      .then((res) => {
        setPkg(res.data);
        setTotalPrice(res.data.price); // initial total price
      })
      .catch((err) => console.error("Package fetch failed", err));
  }, [id]);

  useEffect(() => {
    if (pkg) {
      setTotalPrice(pkg.price * persons);
    }
  }, [persons, pkg]);

  const handleBooking = async (e) => {
    e.preventDefault();
    setShowModal(true); // Show the modal after confirm payment
  };

  const handleBkashPay = async () => {
    if (!bkashNumber || bkashNumber.length < 11) {
      Swal.fire("Invalid", "Please enter a valid Bkash number", "warning");
      return;
    }

    const bookingData = {
      name:user.displayName,
      title: pkg.title,
      authorEmail: pkg.email,
      userEmail: user.email,
      packageId: id,
      persons: persons,
      status: 0,
    };

const paymentData = {
  name:user.displayName,
  userEmail: user.email,
  authorEmail: pkg.email,
  method: paymentMethod,
  amount: totalPrice,
  packageId: id,
  status: 0,
  bkashNumber,
  paymentDate: new Date().toISOString(), 
};


    try {
      await axios.post("https://wander-lust-server-site.vercel.app/api/bookings", bookingData);
      await axios.post("https://wander-lust-server-site.vercel.app/api/payments", paymentData);

      Swal.fire("Success", "Booking and payment completed!", "success").then(() => {
        setShowModal(false);
        setBkashNumber("");
        navigate("/"); // ✅ redirect to homepage
      });
    } catch (error) {
      console.error("Payment failed:", error);
      Swal.fire("Error", "Something went wrong.", "error");
    }
  };

  if (!pkg) return <div className="text-center mt-20 text-lg">Loading...</div>;

  return (
    <>
      {/* Header Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] flex items-center justify-center text-center bg-blue-500">
        <img
          src="https://i.ibb.co/60rYM9wZ/subscribe-img.jpg"
          alt="About Us"
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
        <div className="relative z-10 text-white">
          <h1 className="text-4xl font-bold">{pkg.title}</h1>
          <a href="/" className="text-blue-800 hover:underline">
            Home
          </a>
        </div>
      </div>

      {/* Booking Section */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-3xl mx-auto mt-14 p-8 rounded-3xl bg-gradient-to-br from-white to-blue-50 shadow-2xl"
      >
        <h2 className="text-4xl font-extrabold text-blue-800 mb-8 text-center">
          Secure Your Booking
        </h2>

        <div className="bg-white p-6 rounded-xl shadow-md border border-blue-100">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <img
              src={pkg.thumbnail || "https://via.placeholder.com/300x200"}
              alt={pkg.title}
              className="w-full md:w-1/2 h-60 object-cover rounded-xl shadow"
            />
            <div className="flex-1">
              <h3 className="text-xl font-bold text-blue-900 mb-2">{pkg.title}</h3>
              <p className="text-gray-600 mb-3">{pkg.shortDescription}</p>
              <p className="text-lg font-semibold text-blue-700">
                ৳{pkg.price} BDT / person
              </p>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <form
          onSubmit={handleBooking}
          className="mt-10 space-y-6 bg-blue-50 p-6 rounded-xl shadow-md"
        >
          <input type="hidden" name="title" value={pkg.title} />
          <input type="hidden" name="authorEmail" value={pkg.email} />
          <input type="hidden" name="userEmail" value={user.email} />
          <input type="hidden" name="packageId" value={id} />
          <input type="hidden" name="amount" value={totalPrice} />

          {/* User Email */}
          <div>
            <label className="block font-semibold text-gray-800 mb-1">
              Your Email
            </label>
            <input
              type="text"
              value={user.email}
              disabled
              className="w-full px-4 py-2 rounded-lg border bg-gray-100 text-gray-700"
            />
          </div>

          {/* Number of Persons */}
          <div>
            <label className="block font-semibold text-gray-800 mb-1">
              Number of Persons
            </label>
            <input
              type="number"
              min="1"
              value={persons}
              onChange={(e) => setPersons(parseInt(e.target.value))}
              className="w-full px-4 py-2 rounded-lg border text-gray-700"
            />
          </div>

          {/* Total Price */}
          <div className="text-lg font-semibold text-blue-700">
            Total: ৳{totalPrice} BDT
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            type="submit"
            className="w-full bg-pink-600 hover:bg-pink-700 text-white text-lg font-semibold py-3 rounded-xl shadow-lg transition-all duration-300"
          >
            Confirm Payment
          </motion.button>
        </form>

        {/* Bkash Payment Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
            >
              <h3 className="text-2xl font-bold text-center text-pink-700 mb-4">
                Bkash Payment
              </h3>
              <p className="mb-3 text-center text-gray-600">
                Enter your Bkash number to proceed
              </p>
              <input
                type="text"
                placeholder="e.g. 01XXXXXXXXX"
                value={bkashNumber}
                onChange={(e) => setBkashNumber(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 mb-5"
              />
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBkashPay}
                  className="bg-pink-600 hover:bg-pink-700 text-white px-5 py-2 rounded-md font-semibold"
                >
                  Pay ৳{totalPrice}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </motion.div>
    </>
  );
};

export default Booking;
