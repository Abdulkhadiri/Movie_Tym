import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
// import './App.css';
import './VenderEdit.css';


const VendorEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vendor, setVendor] = useState({
    name: '',
    category: '',
    location: ''
  });

  useEffect(() => {
    const vendors = JSON.parse(localStorage.getItem('vendors') || '[]');
    const existingVendor = vendors.find(v => v.id === id);
    if (existingVendor) {
      setVendor(existingVendor);
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const vendors = JSON.parse(localStorage.getItem('vendors') || '[]');
    const updatedVendors = vendors.map(v => 
      v.id === id ? { ...vendor, id } : v
    );
    localStorage.setItem('vendors', JSON.stringify(updatedVendors));
    navigate('/');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVendor(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="vendor-edit">
      <div className="edit-header">
        <button className="back-button" onClick={() => navigate('/')}>
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>
        <h1>Edit Vendor</h1>
      </div>

      <form className="edit-form" onSubmit={handleSubmit}>
        <div className="fogroup">
          <label htmlFor="name">Vendor Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={vendor.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="fogroup">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={vendor.category}
            onChange={handleChange}
            required
          />
        </div>

        <div className="fogroup">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={vendor.location}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="save-button">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default VendorEdit;