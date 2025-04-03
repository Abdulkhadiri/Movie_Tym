import React, { useEffect, useState } from 'react';
import { Ticket } from 'lucide-react';
import './UserProfile.css';
import './MyBooking.css';
import axios from 'axios';

function MyBookings() {
  const [showBookings, setShowBookings] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('/movies2.json')
      .then(response => response.json())
      .then(data => setMovies(data.movies || [])) // Ensure movies is an array
      .catch(error => console.error('Error fetching movies:', error));
  }, []);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setShowBookings(true);
        const user = sessionStorage.getItem("user") || "defaultUserId";
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
        
        setBookings(response.data || []); // Ensure bookings is an array
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
  
    fetchBookings();
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
            const bookingTime = new Date(booking.booking_time);
            const formattedDate = bookingTime.toISOString().split("T")[0];
            const formattedTime = bookingTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

            // Find the corresponding movie (handling case differences)
            const movie = movies.find(m => 
              m.title?.toLowerCase() === booking.movie_name?.toLowerCase()
            );

            return (
              <div key={index} className="booking-card">
                <img 
                  src={movie?.image_url || booking.image || '/default-movie.jpg'} 
                  alt={booking.movie_name} 
                  className="booking-image" 
                />
                <div className="booking-info">
                  <h2 className="booking-title">Movie: {booking.movie_name}</h2>
                  <p className="booking-language">Language: {booking.language}</p>
                  <p className="booking-ticket">Theater: {booking.theater_name}</p>
                  <p className="booking-ticket">Seats: {booking.booked_tickets}</p>
                  <p className="booking-ticket">Screen: {booking.screen}</p>
                  <p className="booking-date">Date: {formattedDate}</p>
                  <p className="booking-time">Time: {formattedTime}</p>
                  <p className="booking-venue">Address: {booking.address}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MyBookings;
