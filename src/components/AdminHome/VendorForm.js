import React, { useState } from 'react';
import './VendorForm.css';
import axios from 'axios';

const VendorForm = ({ onAddVendor }) => {
  const [theaterData, setTheaterData] = useState({
    ownerName: '',
    email: '',
    password:'',
    phone: '',
    licenseNumber: '',
    theaterName: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    totalScreens: '',
    totalSeats: '',
  });
  // Individual state variables for checkboxes
  const [parking, setParking] = useState(0);
  const [foodCourt, setFoodCourt] = useState(0);
  const [wheelchairAccess, setWheelchairAccess] = useState(0);
  const [dolbySound, setDolbySound] = useState(0);
  const [restaurant, setRestaurant] = useState(0);
  const [gamingZone, setGamingZone] = useState(0);
  const [vipLounge, setVipLounge] = useState(0);

  const [screen2D, setScreen2D] = useState(0);
  const [screen3D, setScreen3D] = useState(0);
  const [screen4DX, setScreen4DX] = useState(0);
  const [screenIMAX, setScreenIMAX] = useState(0);
  const [vipScreen, setVipScreen] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = {
      ...theaterData,
      facilities: { parking, foodCourt, wheelchairAccess, dolbySound, restaurant, gamingZone, vipLounge },
      screenTypes: { screen2D, screen3D, screen4DX, screenIMAX, vipScreen }
    };
    
    onAddVendor({ ...formData, id: Date.now() });
    axios.post(`${process.env.REACT_APP_API_URL}/admin/add_vendor`, formData).then(res => console.log("Got error mams"));
    console.log(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTheaterData(prevData => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="theater-form-container">
      <h2 className="theater-form-title">Add New Theater</h2>
      <form onSubmit={handleSubmit} className="theater-form">
        {/* Owner Details Section */}
        <div className="form-sect">
          <h4 className="sec-tit">Owner Details</h4>
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
            <label>Password</label>
            <input
              type="text"
              name="password"
              value={theaterData.password}
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
        </div>

        {/* Theater Details Section */}
        <div className="form-sect">
          <h4 className="sec-tit">Theater Details</h4>
          <div className="form-group">
            <label>Theater Name</label>
            <input
              type="text"
              name="theaterName"
              value={theaterData.theaterName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Address</label>
            <textarea
              name="address"
              value={theaterData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                name="city"
                value={theaterData.city}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>State</label>
              <input
                type="text"
                name="state"
                value={theaterData.state}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Pincode</label>
              <input
                type="text"
                name="pincode"
                value={theaterData.pincode}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        {/* Theater Specifications */}
        <div className="form-sect">
          <h4 className="sec-tit">Theater Specifications</h4>
          <div className="form-row">
            <div className="form-group">
              <label>Total Screens</label>
              <input
                type="number"
                name="totalScreens"
                value={theaterData.totalScreens}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Total Seats</label>
              <input
                type="number"
                name="totalSeats"
                value={theaterData.totalSeats}
                onChange={handleChange}
                required
              />
            </div>
          </div>

        </div>
          {/* Facilities */}
          <div className="form-sect">
          <h4 className="sec-tit">Facilities Available</h4>
          <div className='checkbo'>
          <label><input type="checkbox" checked={parking} onChange={() => setParking(parking ? 0 : 1)} /> Parking</label>
          <label><input type="checkbox" checked={foodCourt} onChange={() => setFoodCourt(foodCourt ? 0 : 1)} /> Food Court</label>
          <label><input type="checkbox" checked={wheelchairAccess} onChange={() => setWheelchairAccess(wheelchairAccess ? 0 : 1)} /> Wheelchair Access</label>
          <label><input type="checkbox" checked={dolbySound} onChange={() => setDolbySound(dolbySound ? 0 : 1)} /> Dolby Sound</label>
          <label><input type="checkbox" checked={restaurant} onChange={() => setRestaurant(restaurant ? 0 : 1)} /> Restaurant</label>
          <label><input type="checkbox" checked={gamingZone} onChange={() => setGamingZone(gamingZone ? 0 : 1)} /> Gaming Zone</label>
          <label><input type="checkbox" checked={vipLounge} onChange={() => setVipLounge(vipLounge ? 0 : 1)} /> VIP Lounge</label>
          </div>
        </div>

        <div className="form-sect">
          <h4 className="sec-tit">Screen Types</h4>
          <div className='checkbo'>
          <label><input type="checkbox" checked={screen2D} onChange={() => setScreen2D(screen2D ? 0 : 1)} /> 2D</label>
          <label><input type="checkbox" checked={screen3D} onChange={() => setScreen3D(screen3D ? 0 : 1)} /> 3D</label>
          <label><input type="checkbox" checked={screen4DX} onChange={() => setScreen4DX(screen4DX ? 0 : 1)} /> 4DX</label>
          <label><input type="checkbox" checked={screenIMAX} onChange={() => setScreenIMAX(screenIMAX ? 0 : 1)} /> IMAX</label>
          <label><input type="checkbox" checked={vipScreen} onChange={() => setVipScreen(vipScreen ? 0 : 1)} /> VIP Screen</label>
          </div>
        </div>

        <button type="submit" className="submit-butt">
          Add Theater
        </button>
      </form>
    </div>
  );
};

export default VendorForm;