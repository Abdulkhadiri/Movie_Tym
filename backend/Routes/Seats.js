const express = require("express");
const Seats = express.Router();
const db = require('../Middleware/Database');
const booking_id = require('../Middleware/Booking_ud');
const execute_query = async(query, params) => {
    return new Promise((resolve, reject) => {
        db.query(query, params, (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
};
Seats.post("/book_seats", async(req, res) => {
    console.log("Backend");
    const { username, seats, show_id } = req.body;
    console.log(req.body)
    if (!seats || seats.length === 0 || !show_id) {
        return res.status(400).json({ message: "Invalid request data" });
    }

    try {
        // Check if seats are already booked or pending
        const placeholders = seats.map(() => '?').join(',');
        const query = `SELECT seat_number FROM seat 
                       WHERE show_id = ? AND seat_number IN (${placeholders}) 
                       AND status IN ('booked', 'pending')`;
        const params = [show_id, ...seats];
        const bookedSeats = await execute_query(query, params);

        if (bookedSeats.length > 0) {
            return res.status(403).json({
                message: "Some seats are already booked or pending",
                seats: bookedSeats.map(seat => seat.seat_number)
            });
        }

        // Fetch seat prices
        const priceQuery = `SELECT SUM(extra_price) as total_price FROM seat 
                            WHERE show_id = ? AND seat_number IN (${placeholders})`;
        const priceResult = await execute_query(priceQuery, params);
        const totalPrice = priceResult[0].total_price;

        // Lock seats for payment (set status = 'pending')
        const lockQuery = `UPDATE seat SET status = 'blocked' 
                           WHERE show_id = ? AND seat_number IN (${placeholders})`;
        await execute_query(lockQuery, params);

        res.status(200).json({
            message: "Seats locked for payment",
            totalPrice
        });

    } catch (error) {
        console.error("Error booking seats:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
Seats.post("/confirm_booking", async(req, res) => {
    console.log("Payment Confirmation Backend");
    const { username, seats, show_id, paymentSuccess } = req.body;

    if (!seats || seats.length === 0 || !show_id || paymentSuccess === undefined) {
        return res.status(400).json({ message: "Invalid request data" });
    }

    try {
        const placeholders = seats.map(() => '?').join(',');

        if (paymentSuccess) {
            // Generate booking ID
            const book_id = booking_id(username, show_id);

            // Get user_id from username
            const userQuery = "SELECT user_id FROM user WHERE email = ?";
            const userResult = await execute_query(userQuery, [username]);
            if (userResult.length === 0) {
                return res.status(403).json({ message: "User not found" });
            }
            const user_id = userResult[0].user_id;

            // Insert into booking table
            const bookingQuery = "INSERT INTO booking (booking_id, user_id, show_id) VALUES (?, ?, ?)";
            await execute_query(bookingQuery, [book_id, user_id, show_id]);

            // Update seats to 'booked'
            const updateQuery = `UPDATE seat SET booking_id = ?, status = 'booked' 
                                 WHERE show_id = ? AND seat_number IN (${placeholders})`;
            const updateParams = [book_id, show_id, ...seats];
            await execute_query(updateQuery, updateParams);

            res.status(200).json({
                success: true,
                message: "Payment successful, seats booked",
                book_id,
                timestamp: new Date().toISOString(),
            });

        } else {
            // If payment fails, release the seats back to 'available'
            const resetQuery = `UPDATE seat SET status = 'available' 
                                WHERE show_id = ? AND seat_number IN (${placeholders})`;
            await execute_query(resetQuery, [show_id, ...seats]);

            res.status(200).json({ message: "Payment failed, seats released" });
        }

    } catch (error) {
        console.error("Error confirming booking:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


Seats.get("/seats_booked", async(req, res) => {
    console.log("Seats Booked Backend");
    try {
        const { show_id } = req.query;
        console.log(show_id)
        if (!show_id) {
            return res.status(400).json({ error: "show_id is required" });
        }

        // Fetch only seats that are not available
        const query = "SELECT seat_number FROM seat WHERE show_id = ? AND status <> 'available'";
        const result = await execute_query(query, [show_id]);
        res.status(200).json(result);
    } catch (error) {
        console.error('Database query failed:', error);
        res.status(500).json({ error: "Internal server error" });
    }
});

Seats.get('/price', async(req, res) => {
    const { show_id } = req.query;

    if (!show_id) {
        return res.status(400).json({ error: "Show ID is required" });
    }

    try {
        const result = await execute_query('SELECT price FROM show_table WHERE show_id = ?', [show_id]);

        if (result.length === 0) {
            return res.status(404).json({ error: "Show not found" });
        }

        console.log("Sending JSON Response:", { price: result[0].price });
        res.setHeader("Content-Type", "application/json");
        console.log(res) // ✅ Ensure JSON content type
        res.status(200).json(result[0]);

    } catch (error) {
        console.error("Error fetching seat prices:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});



Seats.post("/dummy", async(req, res) => {
    const paymentResponse = {
        status: "success",
        transactionId: `TXN${Date.now()}`, // Generate a unique transaction ID
    };

    res.json(paymentResponse);
});
Seats.get("/get_ticket", async(req, res) => {
    try {
        const { show_id } = req.query;
        console.log("Fetching details for show_id:", show_id);

        // Step 1: Get screen, show_date, show_time, theater_id, and movie_name from show_table
        const query1 = "SELECT theater_id, screen, show_date, show_time, movie_name FROM show_table WHERE show_id = ?";
        const show_details = await execute_query(query1, [show_id]);

        if (show_details.length === 0) {
            return res.status(404).json({ message: "Show details not found" });
        }

        const { theater_id, screen, show_date, show_time, movie_name } = show_details[0];

        // Step 2: Fetch theater_name and full address from theater_table
        const query2 = `
            SELECT name AS theater_name, 
                   CONCAT(city, ', ', location, ', ', state, ', ', pincode) AS address 
            FROM theater 
            WHERE theater_id = ?`;
        const theater_details = await execute_query(query2, [theater_id]);

        if (theater_details.length === 0) {
            return res.status(404).json({ message: "Theater details not found" });
        }

        const { theater_name, address } = theater_details[0];

        // Step 3: Return the combined result
        res.json({
            theater_name,
            address,
            screen,
            show_date,
            show_time,
            movie_name
        });

    } catch (error) {
        console.error("Error fetching seat details:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


module.exports = Seats;