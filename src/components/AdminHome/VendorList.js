// import React, { useState } from 'react';
// import './VendorList.css';
// import { Edit2, Trash2, Eye } from 'lucide-react';

// const VendorList = ({ vendors, onDeleteVendor, onUpdateVendor }) => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedTheater, setSelectedTheater] = useState(null);

//   // Filter theaters based on search input
//   const filteredVendors = vendors.filter(vendor =>
//     vendor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     vendor.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     vendor.state?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Modal for displaying full theater details
//   const TheaterDetailsModal = ({ theater, onClose }) => (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <div className="modal-header">
//           <h2>{theater.name}</h2>
//           <button className="close-button" onClick={onClose}>&times;</button>
//         </div>
//         <div className="theater-details">
//           <div className="detail-section">
//             <h3>Owner Information</h3>
//             <p><strong>Owner ID:</strong> {theater.owner_id}</p>
//             <p><strong>Owner Name:</strong> {theater.username}</p>
//             <p><strong>Email:</strong> {theater.email}</p>
//             <p><strong>Phone Number:</strong> {theater.phone_number}</p>
//             <p><strong>License No:</strong> {theater.owner_licence}</p>
//           </div>
//           <div className="detail-section">
//             <h3>Theater Information</h3>
//             <p><strong>Theater ID:</strong> {theater.theater_id}</p>
//             <p><strong>Location:</strong> {theater.location}</p>
//             <p><strong>City:</strong> {theater.city}</p>
//             <p><strong>State:</strong> {theater.state}</p>
//             <p><strong>Pincode:</strong> {theater.pincode}</p>
//           </div>
//           <div className="detail-section">
//             <h3>Facilities</h3>
//             <p><strong>Dolby Sound:</strong> {theater.dolby_sound ? 'Yes' : 'No'}</p>
//             <p><strong>Food Court:</strong> {theater.food_court ? 'Yes' : 'No'}</p>
//             <p><strong>Gaming Zone:</strong> {theater.gaming_zone ? 'Yes' : 'No'}</p>
//             <p><strong>Parking:</strong> {theater.parking ? 'Yes' : 'No'}</p>
//             <p><strong>Wheelchair Access:</strong> {theater.wheelchair_access ? 'Yes' : 'No'}</p>
//             <p><strong>Restaurant:</strong> {theater.restaurant ? 'Yes' : 'No'}</p>
//             <p><strong>VIP Lounge:</strong> {theater.vip_lounge ? 'Yes' : 'No'}</p>
//           </div>
//           <div className="detail-section">
//             <h3>Screen Information</h3>
//             <p><strong>Total Screens:</strong> {theater.total_screens}</p>
//             <p><strong>Total Seats:</strong> {theater.total_seats}</p>
//             <p><strong>Screen Types:</strong></p>
//             <ul>
//               <li> <b> 2D: </b>{theater.screen_2d}</li>
//               <li> <b> 3D:  </b>{theater.screen_3d}</li>
//               <li> <b> 4DX: </b> {theater.screen_4dx}</li>
//               <li> <b> IMAX: </b> {theater.screen_imax}</li>
//               <li> <b> VIP: </b> {theater.screen_vip}</li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="vendor-list-container">
//       <div className="vendor-list-header">
//         <h2>Theater List</h2>
//         <div className="search-bar">
//           <input
//             type="text"
//             placeholder="Search theaters..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//       </div>

//       <div className="table-container">
//         <table className="vendor-table">
//           <thead>
//             <tr>
//               <th>Theater Name</th>
//               <th>City</th>
//               <th>State</th>
//               <th>Total Screens</th>
//               <th>Total Seats</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredVendors.map(theater => (
//               <tr key={theater.theater_id}>
//                 <td>{theater.name}</td>
//                 <td>{theater.city}</td>
//                 <td>{theater.state}</td>
//                 <td>{theater.total_screens}</td>
//                 <td>{theater.total_seats}</td>
//                 <td>
//                   <div className="action-buttons">
//                     <button
//                       className="view-button"
//                       onClick={() => setSelectedTheater(theater)}
//                       title="View Details"
//                     >
//                       <Eye size={18} />
//                     </button>
//                     <button
//                       className="edit-button"
//                       onClick={() => onUpdateVendor(theater.theater_id)}
//                       title="Edit Theater"
//                     >
//                       <Edit2 size={18} />
//                     </button>
//                     <button
//                       className="delete-button"
//                       onClick={() => onDeleteVendor(theater.theater_id)}
//                       title="Delete Theater"
//                     >
//                       <Trash2 size={18} />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Show modal if a theater is selected */}
//       {selectedTheater && (
//         <TheaterDetailsModal
//           theater={selectedTheater}
//           onClose={() => setSelectedTheater(null)}
//         />
//       )}
//     </div>
//   );
// };

// export default VendorList;
import React, { useState } from 'react';
import './VendorList.css';
import { Edit2, Trash2, Eye } from 'lucide-react';

const VendorList = ({ vendors, onDeleteVendor, onUpdateVendor }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTheater, setSelectedTheater] = useState(null);

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
                      onClick={() => onUpdateVendor(theater.theater_id)}
                      title="Edit Theater"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => onDeleteVendor(theater.theater_id)}
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
    </div>
  );
};

export default VendorList;
