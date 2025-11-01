// AdminStoriesPage.jsx - COMPLETE FINAL VERSION
import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EditorComponent, { serialize, deserialize } from "../../components/EditorComponent";
import {
  fetchAllStories,
  createStory,
  updateStory,
  deleteStory,
  publishStory,
  unpublishStory,
  selectAllStories,
  selectStoryLoading,
  selectStoryError,
  selectStorySuccess,
  selectStorySuccessMessage,
  clearError,
  clearSuccess,
} from "../../../store/slices/storySlice";

const AdminStoriesPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Redux State
  const stories = useSelector(selectAllStories);
  const loading = useSelector(selectStoryLoading);
  const error = useSelector(selectStoryError);
  const success = useSelector(selectStorySuccess);
  const successMessage = useSelector(selectStorySuccessMessage);

  // Local State
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("desc");

  // Form State
  const [form, setForm] = useState({
    title: "",
    slug: "",
    location: "",
    summary: "",
    image_alt: "",
    is_published: false,
    featured_image: null,
  });

  // Editor State
  const [editorContent, setEditorContent] = useState([
    { type: "paragraph", children: [{ text: "" }] }
  ]);

  const [imagePreview, setImagePreview] = useState(null);

  // Check authentication on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert("Please login to access this page");
      navigate('/login');
      return;
    }
  }, [navigate]);

  // Fetch stories on mount
  useEffect(() => {
    dispatch(fetchAllStories({ sortBy, order: sortOrder }));
  }, [dispatch, sortBy, sortOrder]);

  // Handle success/error messages
  useEffect(() => {
    if (success) {
      alert(successMessage || "Operation successful!");
      dispatch(clearSuccess());
      resetForm();
      setShowForm(false);
    }
  }, [success, successMessage, dispatch]);

  useEffect(() => {
    if (error) {
      if (error.includes('403') || error.toLowerCase().includes('forbidden') || error.toLowerCase().includes('not authorized')) {
        alert("Permission denied. Please make sure you're logged in as admin or super_admin.");
        // Optionally redirect to login
        // navigate('/login');
      } else if (error.includes('401') || error.toLowerCase().includes('unauthorized')) {
        alert("Session expired. Please login again.");
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        alert("Error: " + error);
      }
      dispatch(clearError());
    }
  }, [error, dispatch, navigate]);

  // Auto-generate slug from title
  useEffect(() => {
    if (!editingId && form.title) {
      const slug = form.title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
      setForm(prev => ({ ...prev, slug }));
    }
  }, [form.title, editingId]);

  // Filter and search stories
  const filteredStories = useMemo(() => {
    let filtered = [...stories];

    if (filterStatus === "published") {
      filtered = filtered.filter(s => s.is_published);
    } else if (filterStatus === "draft") {
      filtered = filtered.filter(s => !s.is_published);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        s =>
          s.title?.toLowerCase().includes(query) ||
          s.location?.toLowerCase().includes(query) ||
          s.summary?.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [stories, filterStatus, searchQuery]);

  // Form Handlers
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB");
        e.target.value = "";
        return;
      }

      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        e.target.value = "";
        return;
      }

      setForm(prev => ({ ...prev, featured_image: file }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setForm({
      title: "",
      slug: "",
      location: "",
      summary: "",
      image_alt: "",
      is_published: false,
      featured_image: null,
    });
    setEditorContent([{ type: "paragraph", children: [{ text: "" }] }]);
    setImagePreview(null);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check authentication
    const token = localStorage.getItem('token');
    if (!token) {
      alert("You must be logged in to create stories");
      navigate('/login');
      return;
    }

    if (!form.title.trim()) {
      alert("Title is required");
      return;
    }

    if (!form.slug.trim()) {
      alert("Slug is required");
      return;
    }

    const contentHtml = serialize(editorContent);

    if (!contentHtml || contentHtml.trim() === "" || contentHtml === "<p></p>") {
      alert("Content cannot be empty");
      return;
    }

    const storyData = {
      title: form.title.trim(),
      slug: form.slug.trim(),
      location: form.location.trim() || null,
      summary: form.summary.trim() || null,
      image_alt: form.image_alt.trim() || null,
      content: contentHtml,
      is_published: form.is_published,
    };

    if (form.featured_image instanceof File) {
      storyData.featured_image = form.featured_image;
    }

    if (editingId) {
      await dispatch(updateStory({ id: editingId, storyData }));
    } else {
      await dispatch(createStory(storyData));
    }
  };

  const handleEdit = (story) => {
    setEditingId(story.id);
    setForm({
      title: story.title || "",
      slug: story.slug || "",
      location: story.location || "",
      summary: story.summary || "",
      image_alt: story.image_alt || "",
      is_published: story.is_published || false,
      featured_image: null,
    });

    const deserializedContent = deserialize(story.content || "");
    setEditorContent(deserializedContent);

    if (story.featured_image) {
      setImagePreview(story.featured_image);
    }

    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this story? This action cannot be undone.")) {
      await dispatch(deleteStory(id));
    }
  };

  const handlePublishToggle = async (story) => {
    if (story.is_published) {
      await dispatch(unpublishStory(story.id));
    } else {
      await dispatch(publishStory(story.id));
    }
  };

  const handleCancel = () => {
    resetForm();
    setShowForm(false);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 pb-4 border-b-2 border-gray-200 gap-4">
        <h1 className="text-3xl font-bold text-white">📚 Manage Stories</h1>
        <button
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 flex items-center gap-2 w-full sm:w-auto justify-center"
          onClick={() => {
            resetForm();
            setShowForm(!showForm);
          }}
        >
          {showForm ? "📋 View All Stories" : "➕ Create New Story"}
        </button>
      </div>

      {/* Form Section */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900">
              {editingId ? "✏️ Edit Story" : "➕ Create New Story"}
            </h2>
            {editingId && (
              <button 
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors"
                onClick={handleCancel}
              >
                Cancel
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title and Slug */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Enter story title"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 placeholder-gray-400 bg-white"
                />
              </div>

              <div>
                <label htmlFor="slug" className="block text-sm font-semibold text-gray-700 mb-2">
                  Slug <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="slug"
                  name="slug"
                  value={form.slug}
                  onChange={handleChange}
                  placeholder="story-url-slug"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 placeholder-gray-400 bg-white"
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="e.g., Kathmandu, Pokhara"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 placeholder-gray-400 bg-white"
              />
            </div>

            {/* Summary */}
            <div>
              <label htmlFor="summary" className="block text-sm font-semibold text-gray-700 mb-2">
                Summary
              </label>
              <textarea
                id="summary"
                name="summary"
                value={form.summary}
                onChange={handleChange}
                placeholder="Brief summary of the story (optional)"
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-y text-gray-900 placeholder-gray-400 bg-white"
              />
            </div>

            {/* Featured Image */}
            <div>
              <label htmlFor="featured_image" className="block text-sm font-semibold text-gray-700 mb-2">
                Featured Image
              </label>
              <input
                type="file"
                id="featured_image"
                name="featured_image"
                onChange={handleImageChange}
                accept="image/*"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 bg-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {imagePreview && (
                <div className="mt-4 relative inline-block">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="max-w-xs max-h-48 rounded-lg shadow-md object-cover"
                  />
                  <button
                    type="button"
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm font-semibold transition-colors"
                    onClick={() => {
                      setForm(prev => ({ ...prev, featured_image: null }));
                      setImagePreview(null);
                    }}
                  >
                    ✕ Remove
                  </button>
                </div>
              )}
            </div>

            {/* Image Alt Text */}
            <div>
              <label htmlFor="image_alt" className="block text-sm font-semibold text-gray-700 mb-2">
                Image Alt Text
              </label>
              <input
                type="text"
                id="image_alt"
                name="image_alt"
                value={form.image_alt}
                onChange={handleChange}
                placeholder="Describe the featured image for accessibility"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 placeholder-gray-400 bg-white"
              />
            </div>

            {/* Content Editor */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Content <span className="text-red-500">*</span>
              </label>
              <EditorComponent value={editorContent} setValue={setEditorContent} />
            </div>

            {/* Publish Checkbox */}
            <div className="flex items-center">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="is_published"
                  checked={form.is_published}
                  onChange={handleChange}
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                />
                <span className="text-sm font-medium text-gray-900">Publish immediately</span>
              </label>
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button 
                type="submit" 
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                disabled={loading}
              >
                {loading ? "⏳ Saving..." : editingId ? "💾 Update Story" : "✅ Create Story"}
              </button>
              {showForm && !editingId && (
                <button 
                  type="button" 
                  className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      {/* Stories List Section */}
      {!showForm && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          {/* List Controls */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Search Box */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="🔍 Search stories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 placeholder-gray-400 bg-white"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              <select 
                value={filterStatus} 
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 cursor-pointer"
              >
                <option value="all">All Stories ({stories.length})</option>
                <option value="published">Published ({stories.filter(s => s.is_published).length})</option>
                <option value="draft">Drafts ({stories.filter(s => !s.is_published).length})</option>
              </select>

              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split("-");
                  setSortBy(field);
                  setSortOrder(order);
                  dispatch(fetchAllStories({ sortBy: field, order }));
                }}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 cursor-pointer"
              >
                <option value="created_at-desc">Newest First</option>
                <option value="created_at-asc">Oldest First</option>
                <option value="title-asc">Title (A-Z)</option>
                <option value="title-desc">Title (Z-A)</option>
                <option value="views-desc">Most Viewed</option>
              </select>
            </div>
          </div>

          {/* Stories Grid */}
          {loading && stories.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-600">
              <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
              <p className="text-lg">Loading stories...</p>
            </div>
          ) : filteredStories.length === 0 ? (
            <div className="text-center py-20 text-gray-600">
              <p className="text-xl mb-4">📭 No stories found</p>
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                >
                  Clear search
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStories.map((story) => (
                <div 
                  key={story.id} 
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {story.featured_image && (
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={story.featured_image} 
                        alt={story.image_alt || story.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}

                  <div className="p-5">
                    <div className="flex justify-between items-start gap-3 mb-3">
                      <h3 className="text-lg font-bold text-gray-900 flex-1 line-clamp-2">
                        {story.title}
                      </h3>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                        story.is_published 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {story.is_published ? "✓ Published" : "📝 Draft"}
                      </span>
                    </div>

                    {story.location && (
                      <p className="text-sm text-gray-600 mb-2">📍 {story.location}</p>
                    )}

                    {story.summary && (
                      <p className="text-sm text-gray-700 mb-3 line-clamp-3 leading-relaxed">
                        {story.summary}
                      </p>
                    )}

                    <div className="flex gap-4 mb-4 pt-3 border-t border-gray-100 text-sm text-gray-600">
                      <span>👁️ {story.views || 0} views</span>
                      <span>📅 {new Date(story.created_at).toLocaleDateString()}</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button
                        className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors"
                        onClick={() => handleEdit(story)}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        className={`flex-1 px-3 py-2 text-sm font-semibold rounded-lg transition-colors disabled:opacity-50 ${
                          story.is_published
                            ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                            : 'bg-green-600 hover:bg-green-700 text-white'
                        }`}
                        onClick={() => handlePublishToggle(story)}
                        disabled={loading}
                      >
                        {story.is_published ? "📤 Unpublish" : "📢 Publish"}
                      </button>
                      <button
                        className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg transition-colors disabled:opacity-50"
                        onClick={() => handleDelete(story.id)}
                        disabled={loading}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminStoriesPage;