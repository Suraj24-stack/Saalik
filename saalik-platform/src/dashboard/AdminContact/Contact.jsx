import React from "react";

const AdminContactPage = () => {
  // Example contact data
  const contacts = [
    { name: "John Doe", email: "john@example.com", phone: "+977-9840836890" },
    { name: "Jane Smith", email: "jane@example.com", phone: "+977-9840836891" },
    { name: "Bob Lee", email: "bob@example.com", phone: "+977-9840836892" },
  ];

  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-md w-full">
      <h1 className="text-2xl font-bold text-white mb-4">Contact Requests</h1>

      <p className="text-gray-300 mb-6">
        View and manage all contact requests submitted through the website.
      </p>

      <table className="w-full text-left border-collapse border border-gray-700">
        <thead>
          <tr className="bg-gray-700">
            <th className="p-2 border border-gray-600">Name</th>
            <th className="p-2 border border-gray-600">Email</th>
            <th className="p-2 border border-gray-600">Phone</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact, index) => (
            <tr key={index} className="hover:bg-gray-700">
              <td className="p-2 border border-gray-600">{contact.name}</td>
              <td className="p-2 border border-gray-600">{contact.email}</td>
              <td className="p-2 border border-gray-600">{contact.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminContactPage;
