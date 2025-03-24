import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCouch } from "@fortawesome/free-solid-svg-icons";
import "./SeatSelection.css";

const sections = [
  { name: "Orchestra", price: 200, rows: ["A", "B", "C"], seatsPerRow: 10 },
  { name: "Mezzanine", price: 300, rows: ["D", "E", "F"], seatsPerRow: 10 },
  { name: "Balcony", price: 400, rows: ["G", "H", "I"], seatsPerRow: 10 },
];

const SeatSelection = () => {
  const location = useLocation();
  const { movieName, theatreName, showTime, showDate } = location.state || {};
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = (seatId) => {
    setSelectedSeats((prevSelected) =>
      prevSelected.includes(seatId)
        ? prevSelected.filter((seat) => seat !== seatId)
        : [...prevSelected, seatId]
    );
  };

  const handleConfirmBooking = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat.");
      return;
    }

    let totalCost = 0;
    selectedSeats.forEach((seatId) => {
      const section = sections.find((sec) => sec.rows.includes(seatId.charAt(0)));
      if (section) {
        totalCost += section.price;
      }
    });

    navigate("/ticket", {
      state: { selectedSeats, totalCost, movieName, theatreName, showTime, showDate }
    });
  };

  return (
    <div>
      <h2>Select Your Seats</h2>
      <div className="curved-screen">SCREEN</div>


      {sections.map((section) => (
        <div key={section.name} className="section">
          <h3>{section.name} - ₹{section.price}</h3>
          {section.rows.map((row) => (
            <div key={row} className="seat-row">
              <span className="row-label">{row}</span>
              {[...Array(section.seatsPerRow)].map((_, index) => {
                const seatId = `${row}${index + 1}`;
                return (
                  <div key={seatId} className="seat-container" onClick={() => handleSeatClick(seatId)}>
                    <FontAwesomeIcon icon={faCouch} className={`seat-icon ${selectedSeats.includes(seatId) ? "selected" : ""}`} />
                    <span className="seat-label">{seatId}</span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      ))}
      <button className="confirm-button" onClick={handleConfirmBooking}>Confirm Booking</button>
    </div>
  );
};

export default SeatSelection;
