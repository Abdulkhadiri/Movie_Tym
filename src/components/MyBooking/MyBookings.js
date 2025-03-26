import React, { useEffect, useState } from 'react';
import { Camera, Edit2, Check, X, Ticket, User, Mail, Phone, MapPin, Menu } from 'lucide-react';
import './UserProfile.css';
import './MyBooking.css';
import axios from 'axios';

function MyBookings() {
  const [showBookings, setShowBookings] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [time, setTime] = useState('');
   
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setShowBookings(true);
        const user = sessionStorage.getItem("user") || "defaultUserId"; // Ensure `user` is retrieved properly
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/getbookings`,
          {
            params: { email: user },
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
  
    fetchBookings(); // Call the function inside useEffect
  }, []);
  
return (
  <div className="bookings-container">
    <h1 className="title">My Bookings</h1>
    <button className="toggle-btn" onClick={() => setShowBookings(!showBookings)}>
      {showBookings ? "Hide Bookings" : "Show My Bookings"}
    </button>

    {showBookings && (
      <div className="bookings-list">
        {bookings.map((booking, index) => {
          const bookingTime = new Date(booking.booking_time); // Convert to Date object
          const formattedDate = bookingTime.toISOString().split("T")[0]; // "YYYY-MM-DD"
          const formattedTime = bookingTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }); // "HH:MM"

          return (
            <div key={index} className="booking-card">
              <img src={booking.image} alt={booking.title} className="booking-image" />
              <div className="booking-info">
                <h2 className="booking-title">Movie: {booking.movie_name}</h2>
                <p className="booking-language">Language: {booking.language}</p>
                <p className="booking-ticket">Theater: {booking.theater_name}</p>
                <p className="booking-ticket">Seat Number: {booking.seat_number}</p>
                <p className="booking-ticket">Seat Type: {booking.seat_type}</p>
                <p className="booking-ticket">Screen: {booking.screen}</p>
                <p className="booking-ticket">Price: {booking.price}</p>
                <p className="booking-date">Date: {formattedDate}</p>
                <p className="booking-time">Time: {formattedTime}</p>
                <p className="booking-venue">Location: {booking.location}</p>
                <p className="booking-ticket">State: {booking.state}</p>
              </div>
            </div>
          );
        })}
      </div>
    )}
  </div>
);
};

export default MyBookings;