const express = require('express');
const db = require('../Middleware/Database');
const code_generator = require('../Middleware/Generate_show_id');
const Seat_Generator = require('../Middleware/Generate_Seats');
const Auth = require('../Middleware/Authentication');
const bcrypt = require("bcrypt");
const vendorRouter = express.Router();
const execute_query = async(query, params) => {
    return new Promise((resolve, reject) => {
        db.query(query, params, (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
};

// Route to add a new show
vendorRouter.post('/add_Show', async(req, res) => {
    const {
        movieName,
        releaseDate,
        time,
        movieImage,
        ticketPrice,
        language,
        city,
        area,
        theatre,
        screenNumber,
        movieType
    } = req.body;

    console.log(req.body);
    if (!theatre || !movieName || !releaseDate || !time || !screenNumber || !ticketPrice) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    try {
        const show_id = code_generator(city, theatre, movieName); // Generates unique show_id
        const newShow = {
            show_id,
            theater_id: theatre, // Matches theater_id in show_table
            movie_name: movieName,
            show_date: releaseDate,
            show_time: time,
            Language: language, // Matches case in DB
            Movie_Type: movieType, // New field added
            screen: screenNumber, // Matches screen column
            price: ticketPrice
        };

        const result = await execute_query('INSERT INTO show_table SET ?', newShow);
        Seat_Generator(show_id, ticketPrice);
        res.status(201).json({ message: 'Show added successfully', show_id });
    } catch (error) {
        console.error('Error adding show:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


vendorRouter.get('/theaters/:city', async(req, res) => {
    const { city } = req.params;

    try {
        const theaters = await execute_query('SELECT theater_id, theater_name FROM theater WHERE city = ?', [city]);
        res.status(200).json(theaters);
    } catch (error) {
        console.error('Error fetching theaters:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
vendorRouter.post('/login', async(req, res) => {
    const { username, password } = req.body;
    console.log(username, password);
    if (!username || !password) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    try {
        const query = 'SELECT * FROM user WHERE email = ? AND  user_type = "theater_owner"';
        const result = await execute_query(query, [username]);
        if (result.length === 0) {
            console.log("hjkl")
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const hashedPassword = result[0].password;
        const isMatch = await bcrypt.compare(password, hashedPassword);
        const token = Auth.createToken(username, password, 'theater_owner');
        res.status(200).send({
            token: token
        });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
vendorRouter.get("/fetch_city", async(req, res) => {
    try {
        const { username } = req.query;
        const query = "Select user_id from user where email = ? and user_type='theater_owner'";
        const result = await execute_query(query, [username]);
        const user_id = result[0].user_id;
        console.log(user_id, username)
        const query1 = "Select city from theater where owner_id = ?";
        const result1 = await execute_query(query1, [user_id]);
        console.log(result1)
        const names = [...new Set(result1.map(student => student.city))];
        res.status(200).json(names);
    } catch (error) {
        console.error("Error fetching locations:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
vendorRouter.get("/getTheatres", async(req, res) => {
    try {
        const { username, city } = req.query;
        console.log(username, city);
        const query = "SELECT user_id FROM user WHERE email = ? AND user_type = 'theater_owner'";
        const result = await execute_query(query, [username]);

        if (result.length === 0) {
            return res.status(404).json({ error: "User not found or not a theater owner" });
        }
        const user_id = result[0].user_id;
        const query1 = "SELECT name,theater_id FROM theater WHERE owner_id = ? AND city = ?";
        const result1 = await execute_query(query1, [user_id, city]);
        const theaterNames = result1.map(theater => theater.name);
        res.status(200).json(result1);
    } catch (error) {
        console.error("Error fetching theatres:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
vendorRouter.get("/getScreens", async(req, res) => {
    try {
        console.log("hello");
        const {
            theatre
        } = req.query;
        const query = "SELECT total_screens FROM theater WHERE theater_id = ?";
        const result = await execute_query(query, [theatre]);
        console.log(result);
        res.json(result[0].total_screens);
    } catch (error) {
        console.error("Error fetching movies:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

vendorRouter.get("/getAreas", async(req, res) => {
    const { owner_id, city } = req.query;
    console.log(city, owner_id)
    if (!city || !owner_id) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    const query = "SELECT user_id FROM user WHERE email = ? AND user_type = 'theater_owner'";
    const result = await execute_query(query, [owner_id]);
    if (result.length === 0) {
        return res.status(402).json({ error: "User not found or not a theater owner" });
    }
    let owner_id1 = result[0].user_id;
    console.log(owner_id1)
    const query1 = "SELECT DISTINCT location FROM theater WHERE city = ? AND owner_id = ?";
    try {
        const results = await execute_query(query1, [city, owner_id1]);
        console.log(results);
        res.json(results.map(row => row.location));
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Database error", details: error.message });
    }
});
module.exports = vendorRouter;