// src/dashboard/AdminStoriesPage/AdminStoriesPage.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllStories,
  createStory,
  updateStory,
  deleteStory,
  clearSuccess,
  clearError,
} from "../../../store/slices/storySlice";

const AdminStoriesPage = () => {
  const dispatch = useDispatch();
  const { stories, loading, error, success } = useSelector((state) => state.story);

  const [formData, setFormData] = useState({
    title: "",
    image: null,
    excerpt: "",
    content: "",
    category: "",
    location: "",
    date: "",
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    dispatch(fetchAllStories());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      setFormData({
        title: "",
        image: null,
        excerpt: "",
        content: "",
        category: "",
        location: "",
        date: "",
      });
      setEditingId(null);
      dispatch(clearSuccess());
    }
  }, [success, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
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
      image: null, // leave null; admin can re-upload
      excerpt: story.excerpt,
      content: story.content,
      category: story.category,
      location: story.location,
      date: story.date,
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this story?")) {
      dispatch(deleteStory(id));
    }
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h2 className="text-2xl font-bold mb-6">Admin Stories</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-8 bg-gray-800 p-6 rounded-lg space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full p-2 rounded bg-gray-700 text-white"
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
          className="w-full text-white"
        />

        <input
          type="text"
          placeholder="Excerpt"
          value={formData.excerpt}
          onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
          className="w-full p-2 rounded bg-gray-700 text-white"
        />

        <textarea
          placeholder="Content"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className="w-full p-2 rounded bg-gray-700 text-white"
        />

        <input
          type="text"
          placeholder="Category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="w-full p-2 rounded bg-gray-700 text-white"
        />

        <input
          type="text"
          placeholder="Location"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          className="w-full p-2 rounded bg-gray-700 text-white"
        />

        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="w-full p-2 rounded bg-gray-700 text-white"
        />

        <button
          type="submit"
          className="bg-green-500 px-6 py-2 rounded hover:bg-green-600 transition"
        >
          {editingId ? "Update Story" : "Add Story"}
        </button>
      </form>

      {/* Messages */}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-400 mb-4">Operation successful!</p>}

      {/* Stories Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border border-gray-700">
          <thead>
            <tr className="bg-gray-800">
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Title</th>
              <th className="px-4 py-2 border">Category</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {stories.map((story) => (
              <tr key={story.id} className="border-t border-gray-700">
                <td className="px-4 py-2">{story.id}</td>
                <td className="px-4 py-2">{story.title}</td>
                <td className="px-4 py-2">{story.category}</td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleEdit(story)}
                    className="bg-yellow-500 px-2 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(story.id)}
                    className="bg-red-500 px-2 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminStoriesPage;
