import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import axios from 'axios';
import './VenderDashboard.css';

const VendorDashboard = () => {
  const navigate = useNavigate();
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch vendors from backend
  const fetchVendors = async () => {
    try {
      const userId = sessionStorage.getItem('user');
      console.log("User ID from session:", userId);

      const response = await axios.get(`${process.env.REACT_APP_API_URL}/Vendors/get_movies`, {
        params: { email: userId }
      });

      console.log("Fetched vendors successfully:", JSON.stringify(response.data, null, 2));

      if (response.status === 200) {
        setVendors(response.data);
      } else {
        throw new Error("Failed to fetch vendors");
      }
    } catch (error) {
      console.error("Error fetching vendors:", error);
      setError("Failed to load vendors.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  const handleAdd = () => {
    navigate('/venderhome');
  };

  const handleEdit = (showId) => {
    navigate('/vendor-edit/${showId}');
  };

  const handleRemove = async (showId) => {
    try {
      await axios.delete('http://localhost:5000/api/vendors/${showId}');
      fetchVendors(); // Refresh list after deletion
    } catch (error) {
      console.error("Error deleting vendor:", error);
      alert("Failed to delete vendor. Please try again.");
    }
  };

  return (
    <div className="vendor-dashboard">
      <div className="dashboard-header">
        <h1>Vendor Dashboard</h1>
        <button className="add-button" onClick={handleAdd}>
          <Plus size={20} />
          Add New Vendor
        </button>
      </div>

      {/* Show loading state */}
      {loading && <p>Loading vendors...</p>}

      {/* Show error state */}
      {error && <p className="error">{error}</p>}

      {/* Vendors Grid */}
      {!loading && !error && vendors.length > 0 ? (
        <div className="vendors-grid">
          {vendors.map((vendor, index) => (
            <div key={vendor.show_id || index} className="vendor-card">
              <div className="vendor-info">
                <h3>{vendor.name || "No Name"}</h3>
                
                <p><strong>Movie Name:</strong> {vendor.movie_name || "N/A"}</p>
                 
                <p><strong>Show Time:</strong> {vendor.show_time || "N/A"}</p>
                <p><strong>location:</strong> {vendor.location || "N/A"}</p>
                <p><strong>city:</strong> {vendor.city || "N/A"}</p>
                <p><strong>price:</strong> {vendor.price || "N/A"}</p>
                <p><strong>Screen Number:</strong> {vendor.screen || "N/A"}</p>
              </div>
              <div className="vendor-actions">
                <button className="icon-button edit" onClick={() => handleEdit(vendor.show_id)}>
                  <Edit2 size={16} />
                </button>
                <button className="icon-button delete" onClick={() => handleRemove(vendor.show_id)}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !loading && <p>No vendors found.</p>
      )}
    </div>
  );
};

export default VendorDashboard;
