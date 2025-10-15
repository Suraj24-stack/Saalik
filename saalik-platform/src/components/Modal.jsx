import React, { useState } from "react";
import { X } from "lucide-react";

// --------------------------
// Waitlist Modal
// --------------------------
export const WaitlistModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!formData.name || !formData.email) {
      alert("Please fill in all required fields");
      return;
    }
    alert("Thank you for joining the waitlist!");
    setFormData({ name: "", email: "", message: "" });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-2xl p-8 max-w-md w-full border-2 border-green-500/30">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Join Waitlist</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 bg-black border border-green-500/30 rounded-lg text-white focus:border-green-400 outline-none"
          />
          <input
            type="email"
            placeholder="Your Email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 bg-black border border-green-500/30 rounded-lg text-white focus:border-green-400 outline-none"
          />
          <textarea
            placeholder="Message (Optional)"
            rows={4}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full px-4 py-3 bg-black border border-green-500/30 rounded-lg text-white focus:border-green-400 outline-none resize-none"
          />
          <button
            onClick={handleSubmit}
            className="w-full bg-green-500 hover:bg-green-400 text-black font-bold py-3 rounded-lg transition-all"
          >
            Join Waitlist
          </button>
        </div>
      </div>
    </div>
  );
};

// --------------------------
// Suggest Story Modal
// --------------------------
export const SuggestStoryModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ title: "", location: "", description: "" });
  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!formData.title || !formData.location || !formData.description) {
      alert("Please fill in all fields");
      return;
    }
    alert("Thank you for your suggestion!");
    setFormData({ title: "", location: "", description: "" });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-2xl p-8 max-w-md w-full border-2 border-green-500/30">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Suggest a Story</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Story Title"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-3 bg-black border border-green-500/30 rounded-lg text-white focus:border-green-400 outline-none"
          />
          <input
            type="text"
            placeholder="Location"
            required
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full px-4 py-3 bg-black border border-green-500/30 rounded-lg text-white focus:border-green-400 outline-none"
          />
          <textarea
            placeholder="Description"
            rows={5}
            required
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-3 bg-black border border-green-500/30 rounded-lg text-white focus:border-green-400 outline-none resize-none"
          />
          <button
            onClick={handleSubmit}
            className="w-full bg-green-500 hover:bg-green-400 text-black font-bold py-3 rounded-lg transition-all"
          >
            Submit Suggestion
          </button>
        </div>
      </div>
    </div>
  );
};

// Default export (for convenience)
export default { WaitlistModal, SuggestStoryModal };
