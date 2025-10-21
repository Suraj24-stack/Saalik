import React from "react";

const AdminTicketBookingPage = () => {
  // Sample ticket bookings data
  const tickets = [
    { id: 1, user: "John Doe", event: "Music Concert", date: "2025-10-20", status: "Confirmed" },
    { id: 2, user: "Jane Smith", event: "Art Workshop", date: "2025-10-22", status: "Pending" },
    { id: 3, user: "Mike Lee", event: "Food Festival", date: "2025-10-25", status: "Cancelled" },
  ];

  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-md w-full">
      <h1 className="text-2xl font-bold text-white mb-4">Ticket Bookings</h1>

      <p className="text-gray-300 mb-6">
        Manage all ticket bookings from your users here.
      </p>

      <table className="w-full text-left border-collapse border border-gray-700">
        <thead>
          <tr className="bg-gray-700">
            <th className="p-2 border border-gray-600">ID</th>
            <th className="p-2 border border-gray-600">User</th>
            <th className="p-2 border border-gray-600">Event</th>
            <th className="p-2 border border-gray-600">Date</th>
            <th className="p-2 border border-gray-600">Status</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id} className="hover:bg-gray-700">
              <td className="p-2 border border-gray-600">{ticket.id}</td>
              <td className="p-2 border border-gray-600">{ticket.user}</td>
              <td className="p-2 border border-gray-600">{ticket.event}</td>
              <td className="p-2 border border-gray-600">{ticket.date}</td>
              <td className="p-2 border border-gray-600">{ticket.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTicketBookingPage;
