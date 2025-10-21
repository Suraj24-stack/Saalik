import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllInitiatives, createInitiative, deleteInitiative, clearError, clearSuccess } from "../../../store/slices/initiativeSlice";

const AdminInitiatives = () => {
  const dispatch = useDispatch();
  const { initiatives, loading, error, success } = useSelector(state => state.initiative);

  const [formData, setFormData] = useState({
    name: "",
    logo: null,
    description: "",
    website: "",
    display_order: 0
  });

  useEffect(() => {
    dispatch(fetchAllInitiatives());
  }, [dispatch]);

  const handleChange = e => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (formData[key] !== null) data.append(key, formData[key]);
    });
    dispatch(createInitiative(data));
    setFormData({ name: "", logo: null, description: "", website: "", display_order: 0 });
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Admin Initiatives</h2>

      {error && <div className="text-red-500 mb-4">{error}</div>}
      {success && <div className="text-green-500 mb-4">Action successful!</div>}

      <form onSubmit={handleSubmit} className="mb-6 flex flex-col gap-4">
        <input type="text" placeholder="Name" name="name" value={formData.name} onChange={handleChange} className="border p-2 rounded" required />
        <input type="file" name="logo" onChange={handleChange} className="border p-2 rounded" />
        <input type="text" placeholder="Description" name="description" value={formData.description} onChange={handleChange} className="border p-2 rounded" />
        <input type="text" placeholder="Website" name="website" value={formData.website} onChange={handleChange} className="border p-2 rounded" />
        <input type="number" placeholder="Display Order" name="display_order" value={formData.display_order} onChange={handleChange} className="border p-2 rounded" />
        <button type="submit" className="bg-green-500 text-white p-2 rounded hover:bg-green-600">Add Initiative</button>
      </form>

      <h3 className="text-xl font-bold mb-4">Existing Initiatives</h3>
      {loading ? <p>Loading...</p> :
        <ul className="space-y-2">
          {initiatives.map(i => (
            <li key={i.id} className="border p-2 rounded flex justify-between items-center">
              <div>
                <p className="font-bold">{i.name}</p>
                {i.logo_url && <img src={i.logo_url.startsWith("http") ? i.logo_url : `${import.meta.env.VITE_API_URL}${i.logo_url}`} alt={i.name} className="w-20 h-20 object-contain" />}
                <p>{i.description}</p>
              </div>
              <button onClick={() => dispatch(deleteInitiative(i.id))} className="text-red-500 hover:text-red-700">Delete</button>
            </li>
          ))}
        </ul>
      }
    </div>
  );
};

export default AdminInitiatives;
