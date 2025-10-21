import React from "react";

const AdminStoriesSuggestionPage = () => {
  // Sample stories suggestion data
  const suggestions = [
    { id: 1, user: "Alice", title: "Mountain Adventure", date: "2025-10-18", status: "Pending" },
    { id: 2, user: "Bob", title: "City Food Tour", date: "2025-10-19", status: "Approved" },
    { id: 3, user: "Charlie", title: "Cultural Festival", date: "2025-10-20", status: "Rejected" },
  ];

  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-md w-full">
      <h1 className="text-2xl font-bold text-white mb-4">Stories Suggestions</h1>

      <p className="text-gray-300 mb-6">
        Review all story suggestions submitted by users.
      </p>

      <table className="w-full text-left border-collapse border border-gray-700">
        <thead>
          <tr className="bg-gray-700">
            <th className="p-2 border border-gray-600">ID</th>
            <th className="p-2 border border-gray-600">User</th>
            <th className="p-2 border border-gray-600">Title</th>
            <th className="p-2 border border-gray-600">Date</th>
            <th className="p-2 border border-gray-600">Status</th>
          </tr>
        </thead>
        <tbody>
          {suggestions.map((s) => (
            <tr key={s.id} className="hover:bg-gray-700">
              <td className="p-2 border border-gray-600">{s.id}</td>
              <td className="p-2 border border-gray-600">{s.user}</td>
              <td className="p-2 border border-gray-600">{s.title}</td>
              <td className="p-2 border border-gray-600">{s.date}</td>
              <td className="p-2 border border-gray-600">{s.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminStoriesSuggestionPage;
