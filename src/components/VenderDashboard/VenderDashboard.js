import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import './VenderDashboard.css';

const VendorDashboard = () => {
  const navigate = useNavigate();
  const [vendors, setVendors] = useState(() => {
    const savedVendors = localStorage.getItem('vendors');
    return savedVendors ? JSON.parse(savedVendors) : [
      {
        id: '1',
        name: 'Tech Solutions Inc',
        category: 'Technology',
        location: 'New York'
      },
      {
        id: '2',
        name: 'Fresh Foods Co',
        category: 'Food & Beverage',
        location: 'Los Angeles'
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('vendors', JSON.stringify(vendors));
  }, [vendors]);

  const handleAdd = () => {
    navigate('/venderhome');
  };

  const handleEdit = (id) => {
    navigate(`/vendor-edit/${id}`);
  };

  const handleRemove = (id) => {
    setVendors(vendors.filter(vendor => vendor.id !== id));
  };

  return (
    <div className="vendor-dashboard">
      <div className="dashboard-header">
        <h1>Vendor Dashboard</h1>
        <button className="add-button" onClick={handleAdd}>
          <Plus size={20} />
          Add New Movie
        </button>
      </div>

      <div className="vendors-grid">
        {vendors.map(vendor => (
          <div key={vendor.id} className="vendor-card">
            <div className="vendor-info">
              <h3>{vendor.name}</h3>
              <p>{vendor.category}</p>
              <p>{vendor.location}</p>
            </div>
            <div className="vendor-actions">
              <button 
                className="icon-button edit"
                onClick={() => handleEdit(vendor.id)}
              >
                <Edit2 size={16} />
              </button>
              <button 
                className="icon-button delete"
                onClick={() => handleRemove(vendor.id)}
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VendorDashboard;