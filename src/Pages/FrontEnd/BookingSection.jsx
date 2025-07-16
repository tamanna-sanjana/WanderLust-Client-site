import React, { useState } from "react";
import Swal from "sweetalert2";

export default function BookingSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    days: "",
    date: "",
    destination: "Sylhet",
    persons: "1",
    package: "Sylhet Tea Garden",
    request: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, days, date } = formData;
    if (!name || !email || !days || !date) {
      Swal.fire({
        icon: "warning",
        title: "Please fill in all required fields",
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Booking Confirmed!",
      text: `Your booking for ${formData.package} is received.`,
    });

    setFormData({
      name: "",
      email: "",
      days: "",
      date: "",
      destination: "Sylhet",
      persons: "1",
      package: "Sylhet Tea Garden",
      request: "",
    });
  };

  return (
    <>
      {/* Header */}
      <div className="text-center pt-12 pb-4 mb-20">
        <h2 className="text-4xl md:text-[100px] font-extrabold text-black leading-none opacity-20">
          Book Your Adventure
        </h2>
        <h3 className="text-3xl font-semibold md:-mt-16 -mt-12 text-blue-950 relative z-10">
          Reserve Your Journey
          <div className="w-16 h-1 bg-blue-800 mx-auto mt-2 rounded-full"></div>
        </h3>
      </div>

      <div
        className="w-full min-h-screen flex items-center justify-center bg-cover bg-center px-4 md:px-6 py-12 md:py-16"
        style={{
          backgroundImage: `url('https://i.ibb.co/6Jb6339W/ABQ-International-Balloon-Festival.jpg')`,
        }}
      >
        <div className="bg-blue-700/80 backdrop-blur-md rounded-xl shadow-2xl p-6 md:p-10 w-full max-w-6xl grid md:grid-cols-2 gap-6 md:gap-8 text-white">
          {/* Left Info */}
          <div className="text-left space-y-4">
            <p className="uppercase text-blue-200 font-semibold tracking-wider">Booking</p>
            <h2 className="text-3xl md:text-4xl font-bold">Online Booking</h2>
            <p className="text-white text-lg md:text-xl">
              Ready to turn your travel dreams into reality? With our seamless online booking
              system, your next adventure is just a click away. Whether you're planning a tranquil
              escape or an exhilarating journey, our platform ensures a hassle-free experience from
              start to finish. Discover the world your way—quick, easy, and tailored to you.
            </p>
          </div>

          {/* Right Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-2xl font-semibold">Book A Tour Deals</h3>
            <p className="text-sm text-gray-100 mb-2">
              Get <span className="text-yellow-400 font-bold">50% Off</span> On Your First Adventure
              Trip With WanderLust. Get More Deal Offers Here.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="border px-4 py-2 rounded bg-white text-black"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="border px-4 py-2 rounded bg-white text-black"
                required
              />

              <input
                type="text"
                name="days"
                placeholder="Stay Day's"
                value={formData.days}
                onChange={handleChange}
                className="border px-4 py-2 rounded bg-white text-black"
                required
              />
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="border px-4 py-2 rounded bg-white text-black"
                required
              />

              <select
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                className="border px-4 py-2 rounded bg-white text-black"
              >
                <option>Sylhet</option>
                <option>Cox's Bazar</option>
                <option>Bandarban</option>
                <option>Chittagong</option>
              </select>

              <select
                name="persons"
                value={formData.persons}
                onChange={handleChange}
                className="border px-4 py-2 rounded bg-white text-black"
              >
                <option>Persons 1</option>
                <option>Persons 2</option>
                <option>Persons 3</option>
                <option>Persons 4+</option>
              </select>

              <select
                name="package"
                value={formData.package}
                onChange={handleChange}
                className="col-span-2 border px-4 py-2 rounded bg-white text-black"
              >
                <option>Sylhet Tea Garden</option>
                <option>Beach Explorer</option>
                <option>Mountain Trek</option>
                <option>City Highlights</option>
              </select>

              <textarea
                name="request"
                placeholder="Special Request"
                value={formData.request}
                onChange={handleChange}
                className="col-span-2 border px-4 py-2 rounded resize-none bg-white text-black"
                rows={3}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-950 text-white py-2 rounded hover:bg-blue-800 transition"
            >
              Book Now
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
