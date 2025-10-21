import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllContacts } from '../../store/slices/contactSlice'; // adjust path as needed
import { X } from 'lucide-react';

const ContactPage = () => {
  const dispatch = useDispatch();
  const { contacts, loading, error } = useSelector(state => state.contact || {});

  useEffect(() => {
    dispatch(fetchAllContacts());
  }, [dispatch]);

  // Assuming single contact or displaying just contact info from backend—adjust as needed for your data structure
  const contactInfo = contacts && contacts.length > 0 ? contacts[0] : null;

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="relative w-full max-w-md">
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 border-2 border-green-500 shadow-[0_0_40px_rgba(34,197,94,0.3)]">
          <button className="absolute top-4 right-4 text-white hover:text-green-400 transition-colors">
            <X size={24} />
          </button>

          <h2 className="text-3xl font-bold text-green-400 mb-10 text-center tracking-wide">
            Contact Information
          </h2>

          {loading && <p className="text-white">Loading contact information...</p>}
          {error && <p className="text-red-500">Error: {error}</p>}
          {contactInfo ? (
            <>
              <div className="mb-8 border-l-4 border-green-500 pl-6 py-2">
                <div className="text-green-400 text-xs font-semibold uppercase tracking-widest mb-2">
                  EMAIL
                </div>
                <a href={`mailto:${contactInfo.email}`} className="text-white text-xl hover:text-green-400 transition-colors duration-300">
                  {contactInfo.email}
                </a>
              </div>

              <div className="mb-10 border-l-4 border-green-500 pl-6 py-2">
                <div className="text-green-400 text-xs font-semibold uppercase tracking-widest mb-2">
                  PHONE
                </div>
                <a href={`tel:${contactInfo.phone}`} className="text-white text-xl hover:text-green-400 transition-colors duration-300">
                  {contactInfo.phone}
                </a>
              </div>
            </>
          ) : (
            !loading && <p className="text-white text-center">No contact information available.</p>
          )}
        </div>

        <div className="absolute inset-0 bg-green-500/10 blur-3xl rounded-3xl -z-10"></div>
      </div>
    </div>
  );
};

export default ContactPage;
