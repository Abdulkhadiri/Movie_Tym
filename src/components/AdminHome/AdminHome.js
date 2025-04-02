import React, { useEffect, useState } from 'react';
import VendorForm from './VendorForm';
import VendorList from './VendorList';
import './AdminHome.css';
import axios from 'axios';

function AdminHome() {
  const [vendors, setVendors] = useState([]);
  const [showForm, setShowForm] = useState(false);
  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/admin/display_vendors`);
        setVendors(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching vendors:", error);
      }
    };

    fetchVendors();
}, []);

  const handleAddVendor = (newVendor) => {
    setVendors([...vendors, newVendor]);
    setShowForm(false);
  };

  const handleDeleteVendor = (id) => {
    const response= axios.put(`${process.env.REACT_APP_API_URL}/admin/delete_vendors/${id}`)
    console.log(response);
  };

  const handleUpdateVendor = (id) => {
    // Implement update functionality
    console.log('Update vendor with id:', id);
  };

  return (
    <div className="admin-home">
      <div className="admin-header">
        <h1>Vendor Management</h1>
        <button
          className="add-vendor-button"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Back to Vendor List' : 'Add New Vendor'}
        </button>
      </div>

      {showForm ? (
        <VendorForm onAddVendor={handleAddVendor} />
      ) : (
        <div className='list'>
        <VendorList
          vendors={vendors}
          onDeleteVendor={handleDeleteVendor}
          onUpdateVendor={handleUpdateVendor}
        />
        </div>
      )}
    </div>
  );
}

export default AdminHome;
