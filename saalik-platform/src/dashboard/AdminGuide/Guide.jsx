import React from "react";

const AdminGuideBookingPage = () => {
  // Sample guide booking data
  const bookings = [
    { id: 1, name: "John Doe", guide: "Alice", date: "2025-10-20", status: "Confirmed" },
    { id: 2, name: "Jane Smith", guide: "Bob", date: "2025-10-21", status: "Pending" },
    { id: 3, name: "Mike Lee", guide: "Charlie", date: "2025-10-22", status: "Cancelled" },
  ];

  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-md w-full">
      <h1 className="text-2xl font-bold text-white mb-4">Guide Bookings</h1>

      <p className="text-gray-300 mb-6">
        Manage all guide bookings from your users here.
      </p>

      <table className="w-full text-left border-collapse border border-gray-700">
        <thead>
          <tr className="bg-gray-700">
            <th className="p-2 border border-gray-600">ID</th>
            <th className="p-2 border border-gray-600">User Name</th>
            <th className="p-2 border border-gray-600">Guide</th>
            <th className="p-2 border border-gray-600">Date</th>
            <th className="p-2 border border-gray-600">Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id} className="hover:bg-gray-700">
              <td className="p-2 border border-gray-600">{booking.id}</td>
              <td className="p-2 border border-gray-600">{booking.name}</td>
              <td className="p-2 border border-gray-600">{booking.guide}</td>
              <td className="p-2 border border-gray-600">{booking.date}</td>
              <td className="p-2 border border-gray-600">{booking.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminGuideBookingPage;
