import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCouch } from '@fortawesome/free-solid-svg-icons';
import './SeatSelection.css';

const sections = [
    { name: 'Orchestra', price: 200, rows: ['A', 'B', 'C'], seatsPerRow: 10 },
    { name: 'Mezzanine', price: 300, rows: ['D', 'E', 'F'], seatsPerRow: 10 },
    { name: 'Balcony', price: 400, rows: ['G', 'H', 'I'], seatsPerRow: 10 },
];

const SeatSelection = () => {
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [seatsBooked, setSeatsBooked] = useState([]);
    const { showId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { movieName, theatreName, showTime, showDate } = location.state || {};

    const fetchBookedSeats = useCallback(async () => {
        if (!showId) return;
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const result = await fetch(`${process.env.REACT_APP_API_URL}/seats/seats_booked?show_id=${showId}`, {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
            });

            if (!result.ok) return;
            const data = await result.json();
            setSeatsBooked(data.map(seat => seat.seat_number));
        } catch (error) {
            console.error('Error fetching booked seats:', error);
        }
    }, [showId]);

    useEffect(() => {
        if (showId) fetchBookedSeats();
        return () => setSeatsBooked([]);
    }, [showId, fetchBookedSeats]);

    const handleSeatSelection = (seatId) => {
        setSelectedSeats(prev =>
            prev.includes(seatId) ? prev.filter(seat => seat !== seatId) : [...prev, seatId]
        );
    };

    const handlePurchase = async () => {
      console.log("Hekllo")
        if (selectedSeats.length === 0) return;
        try {
            const token = localStorage.getItem('token')||'';
           
            if (!token) return;

            const result = await fetch(`${process.env.REACT_APP_API_URL}/seats/book_seats`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ seats: selectedSeats, show_id: showId })
            });

            if (!result.ok) return;
            setSelectedSeats([]);
            fetchBookedSeats();
        } catch (error) {
            console.error('Error booking seats:', error);
        }
    };

    const isDisabled = (seatId) => seatsBooked.includes(seatId);

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
                                    <div
                                        key={seatId}
                                        className={`seat-container ${isDisabled(seatId) ? 'disabled' : ''}`}
                                        onClick={() => !isDisabled(seatId) && handleSeatSelection(seatId)}
                                    >
                                        <FontAwesomeIcon
                                            icon={faCouch}
                                            className={`seat-icon ${selectedSeats.includes(seatId) ? 'selected' : ''}`}
                                        />
                                        <span className="seat-label">{seatId}</span>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            ))}
            <button className="confirm-button" onClick={handlePurchase} disabled={selectedSeats.length === 0}>
                Confirm Booking
            </button>
        </div>
    );
};

export default SeatSelection;
