import React, { useState, useEffect } from "react";

export default function Admininitiatives() {
  const [initiatives, setInitiatives] = useState([]);
  const [form, setForm] = useState({ name: "", description: "", logo: null });

  const fetchData = async () => {
    const data = await getInitiatives();
    setInitiatives(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    if (form.logo) formData.append("logo", form.logo);

    await addInitiative(formData);
    setForm({ name: "", description: "", logo: null });
    fetchData();
  };

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">Admin Initiatives</h2>

      <form onSubmit={handleSubmit} className="mb-6 flex flex-col gap-4">
        <input
          type="text"
          placeholder="Initiative Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="p-2 rounded bg-gray-800"
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="p-2 rounded bg-gray-800"
        />
        <input
          type="file"
          onChange={(e) => setForm({ ...form, logo: e.target.files[0] })}
          className="p-2 rounded bg-gray-800"
        />
        <button
          type="submit"
          className="bg-green-400 text-black px-4 py-2 rounded hover:bg-green-300"
        >
          Add Initiative
        </button>
      </form>

      <div>
        <h3 className="text-xl font-semibold mb-2">Existing Initiatives</h3>
        <ul className="space-y-2">
          {initiatives.map((item) => (
            <li key={item.id} className="bg-gray-900 p-2 rounded flex justify-between items-center">
              <span>{item.name}</span>
              <img src={item.logo_url} alt={item.name} className="w-12 h-12 object-contain"/>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
