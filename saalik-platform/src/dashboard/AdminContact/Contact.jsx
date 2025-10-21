import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllContacts } from '../../../store/slices/contactSlice'; // adjust path as needed

const AdminContactPage = () => {
  const dispatch = useDispatch();
  const { contacts, loading, error } = useSelector(state => state.contact || {});

  useEffect(() => {
    dispatch(fetchAllContacts());
  }, [dispatch]);

  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-md w-full">
      <h1 className="text-2xl font-bold text-white mb-4">Contact Requests</h1>
      <p className="text-gray-300 mb-6">
        View and manage all contact requests submitted through the website.
      </p>

      {loading && <p className="text-white">Loading contacts...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      <table className="w-full text-left border-collapse border border-gray-700">
        <thead>
          <tr className="bg-gray-700">
            <th className="p-2 border border-gray-600">Name</th>
            <th className="p-2 border border-gray-600">Email</th>
            <th className="p-2 border border-gray-600">Phone</th>
          </tr>
        </thead>
        <tbody>
          {contacts && contacts.length > 0 ? (
            contacts.map((contact, index) => (
              <tr key={index} className="hover:bg-gray-700">
                <td className="p-2 border border-gray-600">{contact.name}</td>
                <td className="p-2 border border-gray-600">{contact.email}</td>
                <td className="p-2 border border-gray-600">{contact.phone}</td>
              </tr>
            ))
          ) : (
            !loading && <tr><td colSpan="3" className="p-2 text-center text-gray-400">No contacts found.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminContactPage;
