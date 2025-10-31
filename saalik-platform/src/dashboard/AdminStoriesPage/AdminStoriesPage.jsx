import React, { useState, useEffect, useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllStories,
  createStory,
  updateStory,
  deleteStory,
  clearSuccess,
  clearError,
} from "../../../store/slices/storySlice";
import { Search, Plus, Edit2, Trash2, Eye, Calendar, MapPin, X, Image, FileText } from "lucide-react";

import axios from 'axios';
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

const { quill, quillRef } = useQuill({ theme: "snow" });

useEffect(() => {
  if (quill) {
    quill.root.innerHTML = formData.content || "";
    quill.on("text-change", () => {
      setFormData((prev) => ({
        ...prev,
        content: quill.root.innerHTML,
      }));
    });
  }
}, [quill]);

const AdminStoriesPage = () => {
  const dispatch = useDispatch();
  const { stories, loading, error, success } = useSelector((state) => state.story);
  const quillRef = useRef(null);

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

  const [formData, setFormData] = useState({
    title: "",
    featured_image: null,
    image_alt: "",
    summary: "",
    content: "",
    location: "",
    published_at: "",
    is_published: false,
  });

  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPublished, setFilterPublished] = useState("all");
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    dispatch(fetchAllStories());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      resetForm();
      setShowModal(false);
      dispatch(clearSuccess());
    }
  }, [success, dispatch]);

  useEffect(() => {
    if (error) {
      setTimeout(() => dispatch(clearError()), 5000);
    }
  }, [error, dispatch]);

  // Custom image handler for Quill editor
  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (file) {
        const formData = new FormData();
        formData.append('image', file);

        try {
          const token = localStorage.getItem('token');
          const response = await axios.post(
            `${API_BASE_URL}/stories/upload-image`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
              }
            }
          );

          if (response.data.success) {
            const imageUrl = response.data.url;
            const quill = quillRef.current.getEditor();
            const range = quill.getSelection();
            quill.insertEmbed(range.index, 'image', imageUrl);
          }
        } catch (error) {
          console.error('Error uploading image:', error);
          alert('Failed to upload image. Please try again.');
        }
      }
    };
  };

  // Quill modules configuration
  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'font': [] }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],
        [{ 'align': [] }],
        ['link', 'image', 'video'],
        ['blockquote', 'code-block'],
        ['clean']
      ],
      handlers: {
        image: imageHandler
      }
    },
    clipboard: {
      matchVisual: false
    }
  }), []);

  // Quill formats
  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'script',
    'list', 'bullet', 'indent',
    'direction', 'align',
    'link', 'image', 'video',
    'blockquote', 'code-block'
  ];

  const resetForm = () => {
    setFormData({
      title: "",
      featured_image: null,
      image_alt: "",
      summary: "",
      content: "",
      location: "",
      published_at: "",
      is_published: false,
    });
    setEditingId(null);
    setImagePreview(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData();
    
    // Add fields to FormData, but skip featured_image if it's null
    Object.entries(formData).forEach(([key, value]) => {
      // Skip null values and empty strings
      if (value === null || value === "") {
        return;
      }
      
      // Special handling for featured_image - only add if it's a File object
      if (key === "featured_image") {
        if (value instanceof File) {
          form.append(key, value);
        }
        return;
      }
      
      // Add all other fields
      form.append(key, value);
    });

    if (editingId) {
      dispatch(updateStory({ id: editingId, storyData: form }));
    } else {
      dispatch(createStory(form));
    }
  };

  const handleEdit = (story) => {
    setEditingId(story.id);
    setFormData({
      title: story.title,
      featured_image: null,
      image_alt: story.image_alt || "",
      summary: story.summary || "",
      content: story.content,
      location: story.location || "",
      published_at: story.published_at ? story.published_at.split('T')[0] : "",
      is_published: story.is_published,
    });
    setImagePreview(story.featured_image || null);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this story? This action cannot be undone.")) {
      dispatch(deleteStory(id));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, featured_image: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const filteredStories = stories.filter((story) => {
    const matchesSearch = story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (story.location && story.location.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filterPublished === "all" ||
                         (filterPublished === "published" && story.is_published) ||
                         (filterPublished === "draft" && !story.is_published);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Stories Management
          </h1>
          <p className="text-slate-400">Create, edit, and manage your stories</p>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6 bg-slate-800/50 p-4 rounded-xl backdrop-blur-sm border border-slate-700/50">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search stories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-400"
            />
          </div>
          
          <select
            value={filterPublished}
            onChange={(e) => setFilterPublished(e.target.value)}
            className="px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          >
            <option value="all">All Stories</option>
            <option value="published">Published</option>
            <option value="draft">Drafts</option>
          </select>

          <button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
          >
            <Plus className="w-5 h-5" />
            <span>New Story</span>
          </button>
        </div>

        {/* Messages */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 flex items-center gap-2">
            <X className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}
        {success && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/50 rounded-lg text-green-400">
            Operation successful!
          </div>
        )}

        {/* Stories Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStories.map((story) => (
              <div
                key={story.id}
                className="bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700/50 hover:border-slate-600 transition-all hover:shadow-xl group"
              >
                <div className="relative h-48 bg-slate-700 overflow-hidden">
                  {story.featured_image ? (
                    <img
                      src={story.featured_image}
                      alt={story.image_alt || story.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Image className="w-16 h-16 text-slate-600" />
                    </div>
                  )}
                  <div className="absolute top-3 right-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        story.is_published
                          ? "bg-green-500/20 text-green-400 border border-green-500/50"
                          : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/50"
                      }`}
                    >
                      {story.is_published ? "Published" : "Draft"}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-semibold mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                    {story.title}
                  </h3>
                  
                  {story.summary && (
                    <p className="text-slate-400 text-sm mb-3 line-clamp-2">
                      {story.summary}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-3 mb-4 text-xs text-slate-400">
                    {story.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>{story.location}</span>
                      </div>
                    )}
                    {story.published_at && (
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(story.published_at).toLocaleDateString()}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      <span>{story.views || 0} views</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(story)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-all border border-blue-500/30"
                    >
                      <Edit2 className="w-4 h-4" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(story.id)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all border border-red-500/30"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredStories.length === 0 && !loading && (
          <div className="text-center py-16">
            <FileText className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400 text-lg">No stories found</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto border border-slate-700 shadow-2xl">
            <div className="sticky top-0 bg-slate-800 border-b border-slate-700 p-6 flex justify-between items-center z-10">
              <h2 className="text-2xl font-bold">
                {editingId ? "Edit Story" : "Create New Story"}
              </h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  required
                />
              </div>

              {/* Featured Image Upload */}
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">
                  Featured Image (Cover Photo)
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="featured-image-upload"
                  />
                  <label
                    htmlFor="featured-image-upload"
                    className="px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg cursor-pointer hover:bg-slate-700 transition-colors flex items-center gap-2"
                  >
                    <Image className="w-5 h-5" />
                    <span>Choose Featured Image</span>
                  </label>
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="h-16 w-16 object-cover rounded-lg border border-slate-600"
                    />
                  )}
                </div>
                <p className="text-xs text-slate-400 mt-1">This image will appear as the cover/thumbnail</p>
              </div>

              {/* Image Alt Text */}
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">
                  Image Alt Text
                </label>
                <input
                  type="text"
                  value={formData.image_alt}
                  onChange={(e) => setFormData({ ...formData, image_alt: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  placeholder="Describe the featured image for accessibility"
                />
              </div>

              {/* Summary */}
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">
                  Summary
                </label>
                <textarea
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  rows={3}
                  placeholder="Brief summary of the story (shown in previews)"
                />
              </div>

              {/* Rich Text Content Editor */}
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">
                  Content * 
                  <span className="text-xs text-slate-400 ml-2">(Use the toolbar to format text, add images, and links)</span>
                </label>
                <div className="bg-white rounded-lg">
                  <ReactQuill
                    ref={quillRef}
                    theme="snow"
                    value={formData.content}
                    onChange={(content) => setFormData({ ...formData, content })}
                    modules={modules}
                    formats={formats}
                    placeholder="Write your story here... Click the image icon in the toolbar to insert images inline."
                    className="min-h-[400px]"
                  />
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  💡 Tip: Click the image icon (📷) in the toolbar to upload and insert images directly into your story content
                </p>
              </div>

              {/* Location & Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-300">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    placeholder="e.g., Kathmandu, Nepal"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-300">
                    Published Date
                  </label>
                  <input
                    type="date"
                    value={formData.published_at}
                    onChange={(e) => setFormData({ ...formData, published_at: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  />
                </div>
              </div>

              {/* Published Status */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="is_published"
                  checked={formData.is_published}
                  onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                  className="w-5 h-5 rounded bg-slate-700 border-slate-600 text-blue-500 focus:ring-blue-500 focus:ring-2"
                />
                <label htmlFor="is_published" className="text-sm font-medium text-slate-300 cursor-pointer">
                  Publish this story (make it visible to public)
                </label>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-slate-700">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  {loading ? "Saving..." : editingId ? "Update Story" : "Create Story"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="px-6 py-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Custom Styles for Quill Editor */}
      <style>{`
        .ql-toolbar {
          background: #1e293b !important;
          border: 1px solid #475569 !important;
          border-radius: 0.5rem 0.5rem 0 0 !important;
        }
        .ql-container {
          background: white !important;
          border: 1px solid #475569 !important;
          border-top: none !important;
          border-radius: 0 0 0.5rem 0.5rem !important;
          min-height: 400px;
        }
        .ql-editor {
          min-height: 400px;
          font-size: 16px;
          color: #1e293b;
        }
        .ql-editor.ql-blank::before {
          color: #94a3b8;
          font-style: normal;
        }
        .ql-toolbar button {
          color: #e2e8f0 !important;
        }
        .ql-toolbar button:hover {
          color: #60a5fa !important;
        }
        .ql-toolbar .ql-stroke {
          stroke: #e2e8f0 !important;
        }
        .ql-toolbar button:hover .ql-stroke {
          stroke: #60a5fa !important;
        }
        .ql-toolbar .ql-fill {
          fill: #e2e8f0 !important;
        }
        .ql-toolbar button:hover .ql-fill {
          fill: #60a5fa !important;
        }
        .ql-toolbar .ql-picker-label {
          color: #e2e8f0 !important;
        }
        .ql-toolbar .ql-picker-label:hover {
          color: #60a5fa !important;
        }
        .ql-snow .ql-picker-options {
          background: #1e293b !important;
          border: 1px solid #475569 !important;
        }
        .ql-snow .ql-picker-item:hover {
          color: #60a5fa !important;
        }
      `}</style>
    </div>
  );
};

export default AdminStoriesPage;