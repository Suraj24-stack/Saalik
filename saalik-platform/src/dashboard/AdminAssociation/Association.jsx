import React from "react";

const AdminAssociationPage = () => {
  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-md w-full">
      <h1 className="text-2xl font-bold text-white mb-4">
        In Association
      </h1>

      <p className="text-gray-300 mb-6">
        Manage associations, partners, or collaborations here.
      </p>

      {/* Example table or content */}
      <table className="w-full text-left border-collapse border border-gray-700">
        <thead>
          <tr className="bg-gray-700">
            <th className="p-2 border border-gray-600">Name</th>
            <th className="p-2 border border-gray-600">Type</th>
            <th className="p-2 border border-gray-600">Contact</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-gray-700">
            <td className="p-2 border border-gray-600">Partner A</td>
            <td className="p-2 border border-gray-600">NGO</td>
            <td className="p-2 border border-gray-600">contact@partnera.com</td>
          </tr>
          <tr className="hover:bg-gray-700">
            <td className="p-2 border border-gray-600">Partner B</td>
            <td className="p-2 border border-gray-600">Corporate</td>
            <td className="p-2 border border-gray-600">contact@partnerb.com</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AdminAssociationPage;
