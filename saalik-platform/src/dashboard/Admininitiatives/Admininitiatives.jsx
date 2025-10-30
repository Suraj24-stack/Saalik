import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllInitiatives,
  createInitiative,
  updateInitiative,
  deleteInitiative,
  clearError,
  clearSuccess,
} from '../../../store/slices/initiativeSlice';
import { Plus, Edit2, Trash2, Save, X, Image as ImageIcon, Loader2, Upload } from 'lucide-react';

const AdminInitiatives = () => {
  const dispatch = useDispatch();
  const { initiatives, loading, error, success, successMessage } = useSelector(
    (state) => state.initiative
  );

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    website: '',
    display_order: '',
    is_active: true,
    logo: null,
  });
  const [logoPreview, setLogoPreview] = useState(null);

  // Proper API URL construction
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';
  const UPLOADS_BASE_URL = API_BASE_URL.replace('/api/v1', '');

  // Fetch initiatives on component mount
  useEffect(() => {
    dispatch(fetchAllInitiatives());
  }, [dispatch]);

  // Handle success/error messages
  useEffect(() => {
    if (success) {
      setTimeout(() => {
        dispatch(clearSuccess());
        handleCloseForm();
      }, 2000);
    }
  }, [success, dispatch]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch(clearError());
      }, 5000);
    }
  }, [error, dispatch]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle file upload with validation
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        alert('Please upload a valid image file (JPG, PNG, GIF, or WEBP)');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      setFormData((prev) => ({ ...prev, logo: file }));
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove logo
  const handleRemoveLogo = () => {
    setFormData((prev) => ({ ...prev, logo: null }));
    setLogoPreview(null);
  };

  // Helper to get full logo URL
  const getLogoUrl = (logoUrl) => {
    if (!logoUrl) return null;
    if (logoUrl.startsWith('http://') || logoUrl.startsWith('https://')) {
      return logoUrl;
    }
    return `${UPLOADS_BASE_URL}${logoUrl}`;
  };

  // Open form for creating new initiative
  const handleOpenCreateForm = () => {
    setIsFormOpen(true);
    setEditingId(null);
    setFormData({
      name: '',
      description: '',
      website: '',
      display_order: initiatives.length + 1,
      is_active: true,
      logo: null,
    });
    setLogoPreview(null);
  };

  // Open form for editing existing initiative
  const handleOpenEditForm = (initiative) => {
    setIsFormOpen(true);
    setEditingId(initiative.id);
    setFormData({
      name: initiative.name || '',
      description: initiative.description || '',
      website: initiative.website || '',
      display_order: initiative.display_order || 0,
      is_active: initiative.is_active !== undefined ? initiative.is_active : true,
      logo: null,
    });
    
    // Set existing logo as preview
    if (initiative.logo_url) {
      const logoUrl = getLogoUrl(initiative.logo_url);
      setLogoPreview(logoUrl);
    } else {
      setLogoPreview(null);
    }
  };

  // Close form and reset
  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
    setFormData({
      name: '',
      description: '',
      website: '',
      display_order: '',
      is_active: true,
      logo: null,
    });
    setLogoPreview(null);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      alert('Initiative name is required');
      return;
    }

    const submitData = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      website: formData.website.trim(),
      display_order: parseInt(formData.display_order) || 0,
      is_active: formData.is_active,
    };

    // Add logo only if a new file was selected
    if (formData.logo instanceof File) {
      submitData.logo = formData.logo;
    }

    if (editingId) {
      // Update existing initiative
      dispatch(updateInitiative({ id: editingId, data: submitData }));
    } else {
      // Create new initiative
      dispatch(createInitiative(submitData));
    }
  };

  // Handle delete
  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      dispatch(deleteInitiative(id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manage Initiatives</h1>
            <p className="text-gray-600 mt-1">
              Create and manage platform initiatives
            </p>
          </div>
          <button
            onClick={handleOpenCreateForm}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus size={20} />
            Add Initiative
          </button>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center justify-between">
            <span>{successMessage}</span>
            <button onClick={() => dispatch(clearSuccess())} className="text-green-700 hover:text-green-900">
              <X size={20} />
            </button>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center justify-between">
            <span>{error}</span>
            <button onClick={() => dispatch(clearError())} className="text-red-700 hover:text-red-900">
              <X size={20} />
            </button>
          </div>
        )}

        {/* Initiatives List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {loading && !isFormOpen ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="animate-spin text-green-600" size={48} />
            </div>
          ) : initiatives.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <ImageIcon size={48} className="mx-auto mb-4 text-gray-400" />
              <p className="text-lg">No initiatives found</p>
              <p className="text-sm mt-2">Click "Add Initiative" to create your first initiative</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Logo
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Website
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {initiatives.map((initiative) => {
                    const logoUrl = getLogoUrl(initiative.logo_url);
                    return (
                      <tr key={initiative.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          {logoUrl ? (
                            <img
                              src={logoUrl}
                              alt={initiative.name}
                              className="h-12 w-12 object-contain rounded"
                              onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextElementSibling.style.display = 'flex';
                              }}
                            />
                          ) : null}
                          <div 
                            className="h-12 w-12 bg-gray-200 rounded items-center justify-center"
                            style={{ display: logoUrl ? 'none' : 'flex' }}
                          >
                            <ImageIcon size={20} className="text-gray-400" />
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">
                            {initiative.name}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-500 max-w-xs truncate">
                            {initiative.description || '-'}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {initiative.website ? (
                            <a
                              href={initiative.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-blue-600 hover:underline"
                            >
                              Visit
                            </a>
                          ) : (
                            <span className="text-sm text-gray-400">-</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-900">
                            {initiative.display_order}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              initiative.is_active
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {initiative.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => handleOpenEditForm(initiative)}
                            className="text-blue-600 hover:text-blue-900 mr-4"
                            title="Edit"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(initiative.id, initiative.name)}
                            className="text-red-600 hover:text-red-900"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Form Modal */}
        {isFormOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {editingId ? 'Edit Initiative' : 'Create New Initiative'}
                  </h2>
                  <button
                    onClick={handleCloseForm}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Initiative Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
                      required
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
                    />
                  </div>

                  {/* Website */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Website URL
                    </label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      placeholder="https://example.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
                    />
                  </div>

                  {/* Display Order */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Display Order
                    </label>
                    <input
                      type="number"
                      name="display_order"
                      value={formData.display_order}
                      onChange={handleInputChange}
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
                    />
                    <p className="text-xs text-gray-500 mt-1">Lower numbers appear first</p>
                  </div>

                  {/* Logo Upload with Drag & Drop */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Initiative Logo
                    </label>
                    
                    {!logoPreview ? (
                      <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-10 h-10 mb-3 text-gray-400" />
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">PNG, JPG, GIF or WEBP (MAX. 5MB)</p>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                          onChange={handleFileChange}
                        />
                      </label>
                    ) : (
                      <div className="relative">
                        {/* Logo Preview */}
                        <div className="p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
                          <div className="flex items-center justify-center">
                            <div className="relative w-40 h-40 rounded-lg bg-white border-2 border-green-500 flex items-center justify-center p-4">
                              <img
                                src={logoPreview}
                                alt="Logo preview"
                                className="w-full h-full object-contain"
                              />
                            </div>
                          </div>
                          
                          {/* Change and Remove Buttons */}
                          <div className="flex gap-2 mt-4">
                            <label className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer text-center">
                              Change Logo
                              <input
                                type="file"
                                className="hidden"
                                accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                                onChange={handleFileChange}
                              />
                            </label>
                            <button
                              type="button"
                              onClick={handleRemoveLogo}
                              className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                            >
                              Remove Logo
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Active Status */}
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="is_active"
                      checked={formData.is_active}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-900">
                      Active (visible on website)
                    </label>
                  </div>

                  {/* Form Actions */}
                  <div className="flex justify-end gap-3 pt-4 border-t">
                    <button
                      type="button"
                      onClick={handleCloseForm}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="animate-spin" size={18} />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save size={18} />
                          {editingId ? 'Update Initiative' : 'Create Initiative'}
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminInitiatives;