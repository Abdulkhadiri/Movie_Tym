
import React, { useState } from 'react';
import './VendorList.css';
import { Edit2, Trash2, Eye } from 'lucide-react';
import axios from 'axios';

const VendorList = ({ vendors, onDeleteVendor,refreshVendors}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTheater, setSelectedTheater] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updatedVendor, setUpdatedVendor] = useState(null);

  // Filter theaters based on search input
  const filteredVendors = vendors.filter(vendor =>
    vendor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.state?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Modal for displaying full theater details
  const TheaterDetailsModal = ({ theater, onClose }) => (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{theater.name}</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        <div className="theater-details">
          <div className="detail-section">
            <h3>Owner Information</h3>
            <p><strong>Owner ID:</strong> {theater.owner_id}</p>
            <p><strong>Owner Name:</strong> {theater.username}</p>
            <p><strong>Email:</strong> {theater.email}</p>
            <p><strong>Phone Number:</strong> {theater.phone_number}</p>
            <p><strong>License No:</strong> {theater.owner_licence}</p>
          </div>
          <div className="detail-section">
            <h3>Theater Information</h3>
            <p><strong>Theater ID:</strong> {theater.theater_id}</p>
            <p><strong>Location:</strong> {theater.location}</p>
            <p><strong>City:</strong> {theater.city}</p>
            <p><strong>State:</strong> {theater.state}</p>
            <p><strong>Pincode:</strong> {theater.pincode}</p>
          </div>
          <div className="detail-section">
            <h3>Facilities</h3>
            <p><strong>Dolby Sound:</strong> {theater.dolby_sound ? 'Yes' : 'No'}</p>
            <p><strong>Food Court:</strong> {theater.food_court ? 'Yes' : 'No'}</p>
            <p><strong>Gaming Zone:</strong> {theater.gaming_zone ? 'Yes' : 'No'}</p>
            <p><strong>Parking:</strong> {theater.parking ? 'Yes' : 'No'}</p>
            <p><strong>Wheelchair Access:</strong> {theater.wheelchair_access ? 'Yes' : 'No'}</p>
            <p><strong>Restaurant:</strong> {theater.restaurant ? 'Yes' : 'No'}</p>
            <p><strong>VIP Lounge:</strong> {theater.vip_lounge ? 'Yes' : 'No'}</p>
          </div>
          <div className="detail-section">
            <h3>Screen Information</h3>
            <p><strong>Total Screens:</strong> {theater.total_screens}</p>
            <p><strong>Total Seats:</strong> {theater.total_seats}</p>
            <p><strong>Screen Types:</strong></p>
            <ul>
              <li> <b> 2D: </b>{theater.screen_2d}</li>
              <li> <b> 3D:  </b>{theater.screen_3d}</li>
              <li> <b> 4DX: </b> {theater.screen_4dx}</li>
              <li> <b> IMAX: </b> {theater.screen_imax}</li>
              <li> <b> VIP: </b> {theater.screen_vip}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  // Update Vendor Modal
  const UpdateVendorModal = ({ vendor, onClose }) => {
    const [updatedData, setUpdatedData] = useState({ ...vendor });

const handleChange = (e) => {
  const { name, value, type } = e.target;
  
  if (type === 'checkbox') {
    setUpdatedData(prevData => ({
      ...prevData,
      [name]: value ? 1 : 0
    }));
  } else {
    setUpdatedData(prevData => ({
      ...prevData,
      [name]: value
    }));
  }
};

    const handleUpdate = async () => {
      try {
        console.log("Updated Data:", updatedData); // Debugging
    
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/admin/update_vendor`,
          updatedData,
          {
            headers: {
              "Content-Type": "application/json", // Ensure correct content type
            },
          }
        );
    
        if (response.status === 200) {
          onClose();
          setUpdatedData({ ...updatedData });
          await refreshVendors();
        }
      } catch (error) {
        console.error("Error updating vendor:", error.response?.data || error.message);
      }
    };
    

  return (
    <div className="update-modal-overlay">
      <div className="update-modal-content">
        <div className="update-modal-header">
          <h2>Update Vendor</h2>
          <button
            className="update-close-button"
            onClick={onClose}
            aria-label="Close"
          >
            &times;
          </button>
        </div>
        <div className="update-theater-details">
          {/* Editable Fields Excluding Owner Details */}
          <div className="update-detail-section">
            <label className="update-label" htmlFor="name">
              Name:
              <input
                id="name"
                type="text"
                name="name"
                value={updatedData.name}
                onChange={handleChange}
                placeholder="Enter vendor name"
                required
                aria-label="Vendor Name"
                className="update-input-field"
              />
            </label>
          </div>
          <div className="update-detail-section">
            <label className="update-label" htmlFor="location">
              Location:
              <input
                id="location"
                type="text"
                name="location"
                value={updatedData.location}
                onChange={handleChange}
                placeholder="Enter location"
                required
                aria-label="Location"
                className="update-input-field"
              />
            </label>
          </div>
          <div className="update-detail-section">
            <label className="update-label" htmlFor="city">
              City:
              <input
                id="city"
                type="text"
                name="city"
                value={updatedData.city}
                onChange={handleChange}
                placeholder="Enter city"
                required
                aria-label="City"
                className="update-input-field"
              />
            </label>
          </div>
          <div className="update-detail-section">
            <label className="update-label" htmlFor="state">
              State:
              <input
                id="state"
                type="text"
                name="state"
                value={updatedData.state}
                onChange={handleChange}
                placeholder="Enter state"
                required
                aria-label="State"
                className="update-input-field"
              />
            </label>
          </div>
          <div className="update-detail-section">
            <label className="update-label" htmlFor="pincode">
              Pincode:
              <input
                id="pincode"
                type="text"
                name="pincode"
                value={updatedData.pincode}
                onChange={handleChange}
                placeholder="Enter pincode"
                required
                aria-label="Pincode"
                className="update-input-field"
              />
            </label>
          </div>
          <div className="update-detail-section">
            <label className="update-label" htmlFor="total_screens">
              Total Screens:
              <input
                id="total_screens"
                type="number"
                name="total_screens"
                value={updatedData.total_screens}
                onChange={handleChange}
                placeholder="Enter total screens"
                required
                aria-label="Total Screens"
                className="update-input-field"
              />
            </label>
          </div>
          <div className="update-detail-section">
            <label className="update-label" htmlFor="total_seats">
              Total Seats:
              <input
                id="total_seats"
                type="number"
                name="total_seats"
                value={updatedData.total_seats}
                onChange={handleChange}
                placeholder="Enter total seats"
                required
                aria-label="Total Seats"
                className="update-input-field"
              />
            </label>
          </div>
          <div className="update-detail-section">
            <label className="update-label" htmlFor="dolby_sound">
              Dolby Sound:
              <input
                id="dolby_sound"
                type="checkbox"
                name="dolby_sound"
                checked={updatedData.dolby_sound}
                onChange={(e) => handleChange({ target: { name: 'dolby_sound', value: e.target.checked } })}
                aria-label="Dolby Sound"
                className="update-input-field"
              />
            </label>
          </div>
          <div className="update-detail-section">
            <label className="update-label" htmlFor="food_court">
              Food Court:
              <input
                id="food_court"
                type="checkbox"
                name="food_court"
                checked={updatedData.food_court}
                onChange={(e) => handleChange({ target: { name: 'food_court', value: e.target.checked } })}
                aria-label="Food Court"
                className="update-input-field"
              />
            </label>
          </div>
          <div className="update-detail-section">
            <label className="update-label" htmlFor="gaming_zone">
              Gaming Zone:
              <input
                id="gaming_zone"
                type="checkbox"
                name="gaming_zone"
                checked={updatedData.gaming_zone}
                onChange={(e) => handleChange({ target: { name: 'gaming_zone', value: e.target.checked } })}
                aria-label="Gaming Zone"
                className="update-input-field"
              />
            </label>
          </div>
          <div className="update-detail-section">
            <label className="update-label" htmlFor="parking">
              Parking:
              <input
                id="parking"
                type="checkbox"
                name="parking"
                checked={updatedData.parking}
                onChange={(e) => handleChange({ target: { name: 'parking', value: e.target.checked } })}
                aria-label="Parking"
                className="update-input-field"
              />
            </label>
          </div>
          <div className="update-detail-section">
            <label className="update-label" htmlFor="wheelchair_access">
              Wheelchair Access:
              <input
                id="wheelchair_access"
                type="checkbox"
                name="wheelchair_access"
                checked={updatedData.wheelchair_access}
                onChange={(e) => handleChange({ target: { name: 'wheelchair_access', value: e.target.checked } })}
                aria-label="Wheelchair Access"
                className="update-input-field"
              />
            </label>
          </div>
          <div className="update-detail-section">
            <label className="update-label" htmlFor="restaurant">
              Restaurant:
              <input
                id="restaurant"
                type="checkbox"
                name="restaurant"
                checked={updatedData.restaurant}
                onChange={(e) => handleChange({ target: { name: 'restaurant', value: e.target.checked } })}
                aria-label="Restaurant"
                className="update-input-field"
              />
            </label>
          </div>
          <div className="update-detail-section">
            <label className="update-label" htmlFor="vip_lounge">
              VIP Lounge:
              <input
                id="vip_lounge"
                type="checkbox"
                name="vip_lounge"
                checked={updatedData.vip_lounge}
                onChange={(e) => handleChange({ target: { name: 'vip_lounge', value: e.target.checked } })}
                aria-label="VIP Lounge"
                className="update-input-field"
              />
            </label>
          </div>
          <div className="update-detail-section">
            <label className="update-label" htmlFor="screen_2d">
              Screen 2D:
              <input
                id="screen_2d"
                type="checkbox"
                name="screen_2d"
                checked={updatedData.screen_2d}
                onChange={(e) => handleChange({ target: { name: 'screen_2d', value: e.target.checked } })}
                aria-label="screen_2d"
                className="update-input-field"
              />
            </label>
          </div>
          <div className="update-detail-section">
            <label className="update-label" htmlFor="screen_3d">
              Screen 3D:
              <input
                id="screen_3d"
                type="checkbox"
                name="screen_3d"
                checked={updatedData.screen_3d}
                onChange={(e) => handleChange({ target: { name: 'screen_3d', value: e.target.checked } })}
                aria-label="screen_3d"
                className="update-input-field"
              />
            </label>
          </div>
          <div className="update-detail-section">
            <label className="update-label" htmlFor="screen_4dx">
              Screen 4DX:
              <input
                id="screen_4dx"
                type="checkbox"
                name="screen_4dx"
                checked={updatedData.screen_4dx}
                onChange={(e) => handleChange({ target: { name: 'screen_4dx', value: e.target.checked } })}
                aria-label="screen_4dx"
                className="update-input-field"
              />
            </label>
          </div>
          <div className="update-detail-section">
            <label className="update-label" htmlFor="screen_imax">
              Screen IMAX:
              <input
                id="screen_imax"
                type="checkbox"
                name="screen_imax"
                checked={updatedData.screen_imax}
                onChange={(e) => handleChange({ target: { name: 'screen_imax', value: e.target.checked } })}
                aria-label="screen_imax"
                className="update-input-field"
              />
            </label>
          </div>
          <div className="update-detail-section">
            <label className="update-label" htmlFor="screen_vip">
              Screen VIP:
              <input
                id="screen_vip"
                type="checkbox"
                name="screen_vip"
                checked={updatedData.screen_vip}
                onChange={(e) => handleChange({ target: { name: 'screen_vip', value: e.target.checked } })}
                aria-label="screen_vip"
                className="update-input-field"
              />
            </label>
          </div>
          <div className="update-detail-section">
            <label className="update-label" htmlFor="is_active">
              Is Active:
              <input
                id="is_active"
                type="checkbox"
                name="is_active"
                checked={updatedData.is_active}
                onChange={(e) => handleChange({ target: { name: 'is_active', value: e.target.checked } })}
                aria-label="is_active"
                className="update-input-field"
              />
            </label>
          </div>
  
          <button
            onClick={handleUpdate}
            className="update-button"
            aria-label="Save Changes"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );  
};
  return (
    <div className="vendor-list-container">
      <div className="vendor-list-header">
        <h2>Theater List</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search theaters..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="table-container">
        <table className="vendor-table">
          <thead>
            <tr>
              <th>Theater Name</th>
              <th>City</th>
              <th>State</th>
              <th>Total Screens</th>
              <th>Total Seats</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredVendors.map(theater => (
              <tr key={theater.theater_id}>
                <td>{theater.name}</td>
                <td>{theater.city}</td>
                <td>{theater.state}</td>
                <td>{theater.total_screens}</td>
                <td>{theater.total_seats}</td>
                <td>{theater.is_active ? 'Active' : 'In-Active'}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="view-button"
                      onClick={() => setSelectedTheater(theater)}
                      title="View Details"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      className="edit-button"
                      onClick={() => {
                        setUpdatedVendor(theater);
                        setShowUpdateModal(true);
                      }}
                      title="Edit Theater"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => {onDeleteVendor(theater.theater_id)
                      }
                        
                      }
                      title="Delete Theater"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Show modal if a theater is selected */}
      {selectedTheater && (
        <TheaterDetailsModal
          theater={selectedTheater}
          onClose={() => setSelectedTheater(null)}
        />
      )}

      {/* Show Update Vendor Modal if selected */}
      {showUpdateModal && updatedVendor && (
        <UpdateVendorModal
          vendor={updatedVendor}
          onClose={() => setShowUpdateModal(false)}
        />
      )}
    </div>
  );
};

export default VendorList;

