// SuggestStoryModal.jsx - Public Story Suggestion Form
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { X } from 'lucide-react';
import {
  createStorySuggestion,
  clearError,
  clearSuccess,
  selectSuggestionLoading,
  selectSuggestionError,
  selectSuggestionSuccess,
  selectSuggestionSuccessMessage
} from '../../store/slices/storysuggestionSlice';

const SuggestStoryModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  
  // Redux state
  const loading = useSelector(selectSuggestionLoading);
  const error = useSelector(selectSuggestionError);
  const success = useSelector(selectSuggestionSuccess);
  const successMessage = useSelector(selectSuggestionSuccessMessage);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    description: '',
    submitted_by_name: '',
    submitted_by_email: ''
  });

  // Handle success
  useEffect(() => {
    if (success) {
      // Show success message briefly
      setTimeout(() => {
        dispatch(clearSuccess());
        onClose();
        // Reset form
        setFormData({
          title: '',
          location: '',
          description: '',
          submitted_by_name: '',
          submitted_by_email: ''
        });
      }, 2000);
    }
  }, [success, dispatch, onClose]);

  // Handle error
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch(clearError());
      }, 5000);
    }
  }, [error, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      alert('Please enter a story title');
      return;
    }
    
    dispatch(createStorySuggestion(formData));
  };

  const handleClose = () => {
    if (!loading) {
      dispatch(clearError());
      dispatch(clearSuccess());
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2 border-green-500/30">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-gray-900 to-gray-800 p-6 border-b border-green-500/30 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-green-500">Suggest a Story</h2>
            <p className="text-gray-400 text-sm mt-1">Share untold stories of Nepal with us</p>
          </div>
          <button
            onClick={handleClose}
            disabled={loading}
            className="text-gray-400 hover:text-white transition-colors disabled:opacity-50"
          >
            <X size={24} />
          </button>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mx-6 mt-6 p-4 bg-green-500/20 border border-green-500 rounded-lg">
            <p className="text-green-500 font-medium text-center">
              {successMessage || 'Thank you! Your suggestion has been submitted successfully.'}
            </p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mx-6 mt-6 p-4 bg-red-500/20 border border-red-500 rounded-lg">
            <p className="text-red-500 font-medium text-center">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Story Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-white mb-2">
              Story Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., The Hidden Temple of Manakamana"
              required
              disabled={loading || success}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all disabled:opacity-50"
            />
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-semibold text-white mb-2">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g., Gorkha, Gandaki Province"
              disabled={loading || success}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all disabled:opacity-50"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-white mb-2">
              Story Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Tell us briefly about this story... What makes it special? Why should it be shared?"
              rows="5"
              disabled={loading || success}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all resize-y disabled:opacity-50"
            />
          </div>

          {/* Divider */}
          <div className="border-t border-gray-700 pt-5">
            <p className="text-gray-400 text-sm mb-4">
              Your contact information (optional) - helps us reach out if we need more details
            </p>
          </div>

          {/* Your Name */}
          <div>
            <label htmlFor="submitted_by_name" className="block text-sm font-semibold text-white mb-2">
              Your Name
            </label>
            <input
              type="text"
              id="submitted_by_name"
              name="submitted_by_name"
              value={formData.submitted_by_name}
              onChange={handleChange}
              placeholder="Your full name"
              disabled={loading || success}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all disabled:opacity-50"
            />
          </div>

          {/* Your Email */}
          <div>
            <label htmlFor="submitted_by_email" className="block text-sm font-semibold text-white mb-2">
              Your Email
            </label>
            <input
              type="email"
              id="submitted_by_email"
              name="submitted_by_email"
              value={formData.submitted_by_email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              disabled={loading || success}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all disabled:opacity-50"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="submit"
              disabled={loading || success}
              className="flex-1 px-6 py-3 bg-green-500 hover:bg-green-600 text-black font-bold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-green-500/30"
            >
              {loading ? 'Submitting...' : success ? '✓ Submitted' : 'Submit Suggestion'}
            </button>
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-lg transition-all duration-300 disabled:opacity-50"
            >
              Cancel
            </button>
          </div>

          {/* Privacy Note */}
          <p className="text-xs text-gray-500 text-center pt-2">
            By submitting, you agree that your suggestion may be reviewed and used for creating stories on our platform.
          </p>
        </form>
      </div>
    </div>
  );
};

export default SuggestStoryModal;