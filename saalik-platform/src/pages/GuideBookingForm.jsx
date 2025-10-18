import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function GuideBookingForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    travelDate: "",
    destination: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // For now, just simulate submission
    alert("Form submitted successfully! Our team will contact you soon.");
    navigate("/guide-booking"); // ✅ Go back to main booking page after submit
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      <div className="max-w-lg w-full bg-gray-900 rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-green-400">
          Guide Booking Form
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Travel Date</label>
            <input
              type="date"
              name="travelDate"
              value={formData.travelDate}
              onChange={handleChange}
              className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Destination</label>
            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="3"
              className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold py-2 rounded-md transition duration-300"
          >
            Submit Booking
          </button>
        </form>

        <button
          onClick={() => navigate("/guide-booking")}
          className="mt-4 w-full text-gray-400 hover:text-green-400 text-sm"
        >
          ← Back to Guide Booking
        </button>
      </div>
    </div>
  );
}
