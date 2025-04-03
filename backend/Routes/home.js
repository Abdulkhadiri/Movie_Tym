const express = require("express");
const router = express.Router();
const db = require("../Middleware/Database");

// Helper function to execute database queries
const execute_query = async(query, params) => {
    return new Promise((resolve, reject) => {
        db.query(query, params, (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
};

// Fetch all show details
router.get("/getshows", async(req, res) => {
    try {
        const query = "SELECT * FROM show_table"; // Fetch all shows
        const results = await execute_query(query, []);

        if (results.length === 0) {
            return res.status(404).json({ message: "No shows found" });
        }

        res.status(200).json(results);
    } catch (error) {
        console.error("Error fetching show details:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/getshow/:show_id", async(req, res) => {
    try {
        const { show_id } = req.params;
        const query = "SELECT * FROM show_table WHERE show_id = ?";
        const results = await execute_query(query, [show_id]);

        if (results.length === 0) {
            return res.status(404).json({ message: "Show not found" });
        }

        res.status(200).json(results[0]);
    } catch (error) {
        console.error("Error fetching show:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Add a new show
router.post("/addshow", async(req, res) => {
    try {
        const { show_id, movie_name, show_date, show_time, Language, Movie_Type, screen, price, theater_id } = req.body;

        if (!show_id || !movie_name || !show_date || !show_time || !Language || !Movie_Type || !screen || !price || !theater_id) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const query = `INSERT INTO show_table (show_id, movie_name, show_date, show_time, Language, Movie_Type, screen, price, theater_id) 
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        await execute_query(query, [show_id, movie_name, show_date, show_time, Language, Movie_Type, screen, price, theater_id]);

        res.status(201).json({ message: "Show added successfully" });
    } catch (error) {
        console.error("Error adding show:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Update a show
router.get("/autocomplete", async(req, res) => {
    try {
        const { query } = req.query;
        console.log(query);
        // Get the query parameter  
        if (!query) {
            return res.status(400).json({ message: "Missing search query" });
        }
        console.log(query);
        const sqlQuery = "SELECT DISTINCT movie_name FROM show_table WHERE movie_name LIKE ? LIMIT 10";
        const results = await execute_query(sqlQuery, [`${query}%`]); // Use LIKE to match movie names  
        const movie_names = results.map(row => row.movie_name);
        console.log(movie_names) // Extract movie names from the results
        res.status(200).json(movie_names);
    } catch (error) {
        console.error("Error fetching movie autocomplete results:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
router.post("/updateshow/:show_id", async(req, res) => {
    try {
        const { show_id } = req.params;
        const { movie_name, show_date, show_time, Language, Movie_Type, screen, price, theater_id } = req.body;

        if (!movie_name || !show_date || !show_time || !Language || !Movie_Type || !screen || !price || !theater_id) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const query = `UPDATE show_table 
                   SET movie_name = ?, show_date = ?, show_time = ?, Language = ?, Movie_Type = ?, screen = ?, price = ?, theater_id = ?
                   WHERE show_id = ?`;
        const results = await execute_query(query, [movie_name, show_date, show_time, Language, Movie_Type, screen, price, theater_id, show_id]);

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Show not found or no changes made" });
        }

        res.status(200).json({ message: "Show updated successfully" });
    } catch (error) {
        console.error("Error updating show:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.delete("/deleteshow/:show_id", async(req, res) => {
    try {
        const { show_id } = req.params;
        const query = "DELETE FROM show_table WHERE show_id = ?";
        const results = await execute_query(query, [show_id]);

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Show not found" });
        }

        res.status(200).json({ message: "Show deleted successfully" });
    } catch (error) {
        console.error("Error deleting show:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;