const express = require('express');
const db = require('../Middleware/Database');
const code_generator = require('../Middleware/Generate_show_id');

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
    const { movie_name, show_date, image, price, language, type, location, theater_id, show_time } = req.body;

    if (!theater_id || !movie_name || !show_date || !show_time) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const show_id = code_generator(location, theater_id, movie_name);
        const newShow = {
            show_id,
            theater_id,
            movie_name,
            show_date,
            show_time,
            price,
        };

        const result = await execute_query('INSERT INTO show_table SET ?', newShow);
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

vendorRouter.get("/fetch_locations", async(req, res) => {
    try {
        const username = req.query.username;

        const query = "Select user_id from user where username = ? and user_type='theater_owner'";
        const result = await execute_query(query, [username]);
        const user_id = result[0].user_id;
        const query1 = "Select city from theater where owner_id = ?";
        const result1 = await execute_query(query1, [user_id]);
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
        // Fetch user_id of the theater owner
        const query = "SELECT user_id FROM user WHERE username = ? AND user_type = 'theater_owner'";
        const result = await execute_query(query, [username]);

        if (result.length === 0) {
            return res.status(404).json({ error: "User not found or not a theater owner" });
        }
        const user_id = result[0].user_id;
        const query1 = "SELECT name FROM theater WHERE owner_id = ? AND city = ?";
        const result1 = await execute_query(query1, [user_id, city]);
        const theaterNames = result1.map(theater => theater.name);
        res.status(200).json(theaterNames);
    } catch (error) {
        console.error("Error fetching theatres:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
module.exports = vendorRouter;