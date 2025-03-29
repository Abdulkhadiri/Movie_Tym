const express = require('express');
require('dotenv').config();
const app = express();

const privaterouter = express.Router();


const execute_query = async(query, params) => {
    return new Promise((resolve, reject) => {
        db.query(query, params, (error, results) => {
            if (error) return reject(error);
            resolve(results);
        })
    })
}


privaterouter.post('/add_details',async(req,res)=>{
    const {user_id,no_of_people,location,date,time,price}=req.body;

    try{
        const query = 'Insert into private_booking(user_id,location,no.of.people,date,time,price) values (?,?,?,?,?,?)'
        const result = await execute_query(query,[user_id,location,no_of_people ,date,time,price]);
        if(result !== null)
        return res.status(200).json({message:'data inserted successfully'})
        else
        return res.status(400).json({message:'data not inserted'})
    }
    catch(err){
        console.error(err);
    }

});

privaterouter.post("/check-availability", async (req, res) => {
    try {
        const { location, date, time } = req.body;

        if (!location || !date || !time) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const query = `
            SELECT * FROM private_booking 
            WHERE location = $1
            AND date = $2
            AND time BETWEEN $3 AND ($3::TIME + INTERVAL '3 hours')
        `;

        const result = await execute_query(query, [location, date, time]);

        if (result.rows.length > 0) {
            return res.json({ available: false, message: "Not Available" });
        } else {
            return res.json({ available: true, message: "Available" });
        }
    } catch (error) {
        console.error("Error checking availability:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = privaterouter;