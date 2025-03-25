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
    const totalPrice = selectedSeats.reduce((total, seat) => {
    const section = sections.find(sec => sec.rows.some(row => seat.startsWith(row)));
    return total + (section ? section.price : 0);
}, 0);
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
            console.error('Error fetching booked seats:', error.status);
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
    if (selectedSeats.length === 0) return;
    
    try {
        const token = localStorage.getItem('token') || '';
        if (!token) return;

        // Step 1: Lock seats for payment
        const bookResult = await fetch(`${process.env.REACT_APP_API_URL}/seats/book_seats`, {
            method: 'POST',
            headers: { 
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ username: 'alice_smith', seats: selectedSeats, show_id: showId })
        });

        if (!bookResult.ok) {
            console.error('Failed to lock seats');
            return;
        }

        // Step 2: Call dummy payment API (simulating a payment response)
        const paymentResult = await fetch(`${process.env.REACT_APP_API_URL}/seats/dummy`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount: 100 }) // Example amount
        });

        const paymentData = await paymentResult.json();
        const paymentSuccess = paymentData.status === "success"; // Assuming success response

        // Step 3: Confirm booking or release seats
        const confirmResult = await fetch(`${process.env.REACT_APP_API_URL}/seats/confirm_booking`, {
            method: 'POST',
            headers: { 
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ 
                username: 'alice_smith', 
                seats: selectedSeats, 
                show_id: showId, 
                paymentSuccess 
            })
        });

        if (!confirmResult.ok) {
            console.error('Failed to confirm booking');
            return;
        }



        // Step 4: Update UI
        setSelectedSeats([]);
        window.location.reload();
        fetchBookedSeats();

    } catch (error) {
        console.error('Error during purchase process:', error);
    }
};


    const isDisabled = (seatId) => seatsBooked.includes(seatId);

    return (
        <div>
            <h2 className='he'>Select Your Seats</h2>
            <div className="curved-screen">SCREEN</div>

            {sections.map((section) => (
                <div key={section.name} className="section">
                    <h3 className='hed'>{section.name} - ₹{section.price}</h3>
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
