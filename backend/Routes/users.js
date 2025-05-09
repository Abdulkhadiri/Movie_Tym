const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const db = require("../Middleware/Database");
const Auth = require("../Middleware/Authentication");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const sendEmail = require("../Middleware/mailer");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const adminRouter = require("./admin");
app.use("/admin", adminRouter);
//const adminGraph = require("./admingraph");
//app.use("/admin", adminGraph);

const privaterouter = require("./privatebooking")
app.use("/privatebooking", privaterouter);

const homeRouter = require("./home");
app.use("/home",  homeRouter);

const Seats = require("./Seats");
app.use("/seats", Seats);

const vendorRouter = require("./Vendors");
app.use("/Vendors", vendorRouter);

const Theater = require("./Theater_Generation");
app.use("/Theater_generation", Theater);

// Helper function to execute database queries
const execute_query = async(query, params) => {
    return new Promise((resolve, reject) => {
        db.query(query, params, (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
};

// app.post("/login", async (req, res) => {
//   const { username, password } = req.body;
//   const query = "SELECT username, password,user_type FROM user WHERE Email= ?";

//   try {
//     const results = await execute_query(query, [username]);

//     if (results.length === 0)
//       return res.status(401).send("Check your username or password");

//     const hashedPassword = results[0].password;
//     const role = results[0].user_type;
//     const isMatch = await bcrypt.compare(password, hashedPassword);
//     if (!isMatch)
//       return res.status(401).send("Check your username or password");
//     const token = Auth.createToken(username, password, role);
//     res.status(200).send(token);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal server error");
//   }
// });
app.post("/login", async(req, res) => {
    const { username, password } = req.body;
    const query = "SELECT username, password, user_type FROM user WHERE Email= ?";

    try {
        const results = await execute_query(query, [username]);

        if (results.length === 0) {
            return res.status(401).json({ message: "Username not found" });
        }

        const hashedPassword = results[0].password;
        const role = results[0].user_type;
        const isMatch = await bcrypt.compare(password, hashedPassword);

        if (!isMatch) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        const token = Auth.createToken(username, password, role);
        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.post("/signup_user", async(req, res) => {
    const { username, email, password, cnfpassword, phone_number } = req.body;

    if (password !== cnfpassword)
        return res.status(400).send("Passwords must match");

    const passwordRegex =
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password))
        return res
            .status(400)
            .send(
                "Password must be at least 8 characters long, include one uppercase letter, one number, and one special character."
            );

    try {
        const existingUser = await execute_query(
            "SELECT username FROM user WHERE username = ?", [username]
        );
        if (existingUser.length > 0)
            return res.status(409).send("Username already exists");

        const existingEmail = await execute_query(
            "SELECT email FROM user WHERE email = ?", [email]
        );
        if (existingEmail.length > 0)
            return res.status(409).send("Email already exists");

        const hashedPassword = await bcrypt.hash(password, 10);
        const insertQuery =
            "INSERT INTO user (username, password, user_type, email,phone_number) VALUES (?, ?, ?, ?,?)";

        await execute_query(insertQuery, [
            username,
            hashedPassword,
            "Customer",
            email,
            phone_number,
        ]);
        res.status(201).send("User registered successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred during signup");
    }
});

// Get User Profile
app.get("/getprofile", async(req, res) => {
    try {
        // Check if req.user is set (assuming authentication middleware is used)

        const email = req.query.email; // Extract user ID from authentication middleware
        // Query to fetch user profile from the 'users' table
        const rows = await execute_query(
            "SELECT user_id, username, email, phone_number, user_type FROM user WHERE Email = ?", [email]
        );
        // If no user found, return 404
        if (rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        // Return user profile (excluding sensitive information)
        return res.status(200).json({ rows });
    } catch (error) {
        console.error("Profile retrieval error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: process.env.NODE_ENV === "development" ? error.message : undefined,
        });
    }
});

app.post("/updateprofile", async(req, res) => {
    try {
        const { username, phone_number, email } = req.body;

        if (!username || !phone_number || !email) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const rows = await execute_query(
            "UPDATE `user` SET username = ?, phone_number = ? WHERE Email = ?", [username, phone_number, email]
        );

        if (rows.affectedRows === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "Profile updated successfully" });
    } catch (error) {
        console.error("Profile update error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: process.env.NODE_ENV === "development" ? error.message : undefined,
        });
    }
});

const validatePassword = (password) => {
    const passwordRegex =
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
};

const otpStore = new Map();
app.post("/send-otp/email", async(req, res) => {
    const { email } = req.body;
    const otp = Math.floor(Math.random() * 900) + 1000;
    console.log(`Generated OTP: ${otp}`);
    otpStore.set(email, { otp, expiresAt: Date.now() + 5 * 60 * 1000 });
    const emailResponse = await sendEmail(email, otp);
    if (emailResponse.success) {
        console.log("OTP email sent successfully");
        res.json({ otp });
    } else {
        return res.status(500).json(emailResponse);
    }
});

app.post("/forgot-password", async(req, res) => {
    const { email, phone } = req.body;
    try {
        const query = "select * from user where email = ? ";
        const result = await execute_query(query, [email]);
        if (result.length > 0) {
            return res.status(200).send("user exists");
        }
    } catch (err) {
        console.error(err);
    }
});

app.post("/update-password", async(req, res) => {
    const { password, email, phone } = req.body;

    //if (!validatePassword(password)) return res.status(400).send("Password must be at least 8 characters long, include one uppercase letter, one number, and one special character.");
    const updateQuery =
        "UPDATE user SET password = ? WHERE email = ? OR phone_number = ?";

    const hashedPassword = await bcrypt.hash(password, 10);
    await execute_query(updateQuery, [hashedPassword, email, phone]);
    res.status(200).send("Password updated successfully!");
});

app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
);

app.get("/getbookings", async(req, res) => {
    try {
        const email = req.query.email; // Get user_id from JWT middleware
        console.log(email);
        const query = "SELECT user_id FROM user WHERE Email= ?";
        const results = await execute_query(query, [email]);
        console.log(results);
        const userId = results[0].user_id;
        console.log(userId);
        const bookingQuery = `
      SELECT 
    b.booking_id,
    b.user_id,
    b.booking_time,
    t.name AS theater_name,
    CONCAT(t.location, ', ', t.city, ', ', t.pincode) AS address, -- Concatenated address
    s.movie_name,
    s.show_time,
    s.show_date,
    s.language,
    s.screen, 
    GROUP_CONCAT(
        CONCAT(seat.seat_type, ' ', seat.seat_number) 
        ORDER BY seat.seat_type, seat.seat_number SEPARATOR ', '
    ) AS booked_tickets
FROM booking b
JOIN seat ON b.booking_id = seat.booking_id
JOIN show_table s ON b.show_id = s.show_id
JOIN theater t ON s.theater_id = t.theater_id
WHERE b.user_id = ?
GROUP BY b.booking_id;

`;

        const bookings = await execute_query(bookingQuery, [userId]);
        console.log(bookings);
        res.json(bookings);
    } catch (error) {
        console.error("Error fetching bookings:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post('/reviews', async(req, res) => {


    try {
        const { user_name, rating, comment } = req.body;
        const results = await execute_query("SELECT user_id FROM user WHERE email = ?", [user_name]);
        console.log(results);
        const user_id = results[0].user_id;
        const query1 = "INSERT INTO ratings (user_id,rating, comment) VALUES (?,?,?)";
        const params = [user_id, rating, comment];
        await execute_query(query1, params);
        res.status(200).send("Review added successfully");
    } catch (err) {
        console.error(err);
    }

});