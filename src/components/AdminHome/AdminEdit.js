import React, { useState, useEffect } from 'react';
import './VendorForm.css';

const VendorEditForm = ({ vendor, onUpdateVendor, onCancel }) => {
  const [theaterData, setTheaterData] = useState({
    ownerName: '',
    email: '',
    phone: '',
    theaterName: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    totalScreens: '',
    totalSeats: '',
    facilities: [],
    screenTypes: [],
    licenseNumber: '',
    openingHours: '',
    closingHours: '',
    status: 'active'
  });

  const facilities = [
    'Parking',
    'Food Court',
    'Wheelchair Access',
    'Dolby Sound',
    'IMAX',
    'Restaurant',
    'Gaming Zone',
    'VIP Lounge'
  ];

  const screenTypes = [
    '2D',
    '3D',
    '4DX',
    'IMAX',
    'VIP Screen',
    'Dolby Atmos'
  ];

  // Populate form with existing vendor data when component mounts
  useEffect(() => {
    if (vendor) {
      setTheaterData({
        ...vendor
      });
    }
  }, [vendor]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateVendor(theaterData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTheaterData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleCheckboxChange = (type, value) => {
    setTheaterData(prevData => ({
      ...prevData,
      [type]: prevData[type].includes(value)
        ? prevData[type].filter(item => item !== value)
        : [...prevData[type], value]
    }));
  };

  return (
    <div className="theater-form-container">
      <h2 className="theater-form-title">Edit Theater Details</h2>
      <form onSubmit={handleSubmit} className="theater-form">
        {/* Owner Details Section */}
        <div className="form-sect">
          <h3 className="section-title">Owner Details</h3>
          <div className="form-group">
            <label>Owner Name</label>
            <input
              type="text"
              name="ownerName"
              value={theaterData.ownerName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={theaterData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={theaterData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>License Number</label>
            <input
              type="text"
              name="licenseNumber"
              value={theaterData.licenseNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Status</label>
            <select
              name="status"
              value={theaterData.status}
              onChange={handleChange}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Rest of the form remains similar to VendorForm */}
        {/* ... (include the rest of the form sections from VendorForm) */}

        <div className="form-actions">
          <button type="submit" className="submit-butt">
            Update Theater
          </button>
          <button 
            type="button" 
            className="cancel-butt" 
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

// Example usage in a parent component
const VendorManagement = () => {
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [vendors, setVendors] = useState([]);

  const handleUpdateVendor = (updatedVendor) => {
    setVendors(prevVendors => 
      prevVendors.map(vendor => 
        vendor.id === updatedVendor.id ? updatedVendor : vendor
      )
    );
    setSelectedVendor(null);
  };

  const handleEditVendor = (vendor) => {
    setSelectedVendor(vendor);
  };

  const handleCancelEdit = () => {
    setSelectedVendor(null);
  };

  return (
    <div>
      {selectedVendor ? (
        <VendorEditForm 
          vendor={selectedVendor}
          onUpdateVendor={handleUpdateVendor}
          onCancel={handleCancelEdit}
        />
      ) : (
        // Render vendor list with edit buttons
        <div>
          {vendors.map(vendor => (
            <div key={vendor.id}>
              {vendor.theaterName}
              <button onClick={() => handleEditVendor(vendor)}>
                Edit
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VendorEditForm;