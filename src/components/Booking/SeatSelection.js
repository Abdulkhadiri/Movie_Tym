import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCouch } from '@fortawesome/free-solid-svg-icons';
import './SeatSelection.css';

const SeatSelection = () => {
    const [sections, setSections] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [seatsBooked, setSeatsBooked] = useState([]);
    const { showId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const user = sessionStorage.getItem("user");
    const token = sessionStorage.getItem("token");
    const { movieName, theatreName, showTime, showDate } = location.state || {};

    // Fetch the base price from API
    const fetchBasePrice = useCallback(async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/seats/price?show_id=${showId}`, {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            
            if (!response.ok) {
                console.error('Failed to fetch base price');
                return;
            }

            const data = await response.json();
            const input = data.price;
            const basePrice = parseInt(input, 10); 
            // Example API response: { "price": 200 }

            // Adjust prices dynamically
            const updatedSections = [
                { name: 'Orchestra', price: basePrice + 50, rows: ['A', 'B', 'C'], seatsPerRow: 10 },
                { name: 'Mezzanine', price: basePrice + 100, rows: ['D', 'E', 'F'], seatsPerRow: 10 },
                { name: 'Balcony', price: basePrice + 150, rows: ['G', 'H', 'I'], seatsPerRow: 10 },
            ];

            setSections(updatedSections);
        } catch (error) {
            console.error('Error fetching base price:', error);
        }
    }, [token]);

    useEffect(() => {
        fetchBasePrice();
    }, [fetchBasePrice]);

    // Fetch booked seats
    const fetchBookedSeats = useCallback(async () => {
        if (!showId) return;
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/seats/seats_booked?show_id=${showId}`, {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
            });

            if (!response.ok) return;
            const data = await response.json();
            setSeatsBooked(data.map(seat => seat.seat_number));
        } catch (error) {
            console.error('Error fetching booked seats:', error);
        }
    }, [showId, token]);

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
            if (!token) return;

            // Step 1: Lock seats for payment
            const bookResult = await fetch(`${process.env.REACT_APP_API_URL}/seats/book_seats`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: user, seats: selectedSeats, show_id: showId })
            });

            if (!bookResult.ok) {
                console.error('Failed to lock seats');
                return;
            }

            // Step 2: Call dummy payment API (simulating a payment response)
            const paymentResult = await fetch(`${process.env.REACT_APP_API_URL}/seats/dummy`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: totalPrice })
            });

            const paymentData = await paymentResult.json();
            const paymentSuccess = paymentData.status === "success"; // Assuming success response

            // Step 3: Confirm booking or release seats
            const confirmResult = await fetch(`${process.env.REACT_APP_API_URL}/seats/confirm_booking`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: user, seats: selectedSeats, show_id: showId, paymentSuccess })
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

    // Calculate total price based on selected seats
    const totalPrice = selectedSeats.reduce((total, seat) => {
        const section = sections.find(sec => sec.rows.some(row => seat.startsWith(row)));
        return total + (section ? section.price : 0);
    }, 0);

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
            
            <h3>Total Price: ₹{totalPrice}</h3>

            <button className="confirm-button" onClick={handlePurchase} disabled={selectedSeats.length === 0}>
                Confirm Booking
            </button>
        </div>
    );
};

export default SeatSelection;
