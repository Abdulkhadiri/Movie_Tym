import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./VendorForm.css";

const UpdateVendorForm = () => {
 
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    city: "",
    state: "",
    pincode: "",
    total_screens: "",
    total_seats: "",
    parking: false,
    foodcourt: false,
    wheelchair: false,
    dolby_sound: false,
    restaurant: false,
    gaming_zone: false,
    vip_lounge: false,
    screen_2d: false,
    screen_3d: false,
    screen_4dx: false,
    screen_imax: false,
    screen_vip: false,
    is_active: true,
    id: "",
  });
  const { uid } = useParams();

  useEffect(() => {
    const fetchVendor = async () => {
      try {
        console.log(uid);
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/get_vendor/${uid}`);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching vendor data:", error);
      }
    };

    if (uid) {
      fetchVendor();
    }
  }, [uid]);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/update_vendor", formData);
      if (response.status === 200) {
        alert("Vendor updated successfully!");
      } else {
        alert("Failed to update vendor.");
      }
    } catch (error) {
      console.error("Error updating vendor:", error);
    }
  };

  return (
    <div className="theater-form-container">
      <h2 className="theater-form-title">Update Vendor</h2>
      <form onSubmit={handleSubmit} className="theater-form">
        <div className="form-row">
          {[
            "name",
            "location",
            "city",
            "state",
            "pincode",
            "total_screens",
            "total_seats",
            "id",
          ].map((field) => (
            <input
              key={field}
              name={field}
              placeholder={field.replace("_", " ").toUpperCase()}
              value={formData[field]}
              onChange={handleChange}
              className="form-group"
            />
          ))}
        </div>

        <div className="checkbo">
          {[
            "parking",
            "foodcourt",
            "wheelchair",
            "dolby_sound",
            "restaurant",
            "gaming_zone",
            "vip_lounge",
            "screen_2d",
            "screen_3d",
            "screen_4dx",
            "screen_imax",
            "screen_vip",
            "is_active",
          ].map((field) => (
            <label key={field} className="checkbox-label">
              <input
                type="checkbox"
                name={field}
                checked={formData[field]}
                onChange={handleChange}
              />
              {field.replace("_", " ").toUpperCase()}
            </label>
          ))}
        </div>

        <button type="submit" className="submit-butt">Update Vendor</button>
      </form>
    </div>
  );
};

export default UpdateVendorForm;
