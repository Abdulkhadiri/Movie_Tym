import React, { useEffect, useState } from 'react';
import VendorForm from './VendorForm';
import VendorList from './VendorList';
import './AdminHome.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminHome() {
  const [vendors, setVendors] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // const navigate = useNavigate();
  const [data, setData] = useState('Initial Value');

  // Callback function to update parent state
  const handleDataUpdate = (newValue) => {
    setData(newValue);
  };

  const fetchVendors = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/admin/display_vendors`);
      setVendors(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching vendors:", error);
    }
  };


  useEffect(() => {

    fetchVendors();
},[]);

  const handleAddVendor = (newVendor) => {
    setVendors([...vendors, newVendor]);
    setShowForm(false);
  };

  const handleDeleteVendor = async (id) => {
    console.log(id);
    const response = await axios.delete(`${process.env.REACT_APP_API_URL}/admin/delete_vendor/${id}`)
    await fetchVendors();
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
          refreshVendors={fetchVendors}
          onDeleteVendor={handleDeleteVendor}
        />
        </div>
      )}
    </div>
  );
}

export default AdminHome;
