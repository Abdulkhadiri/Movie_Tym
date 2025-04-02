const express = require("express");
const adminRouter = express.Router();
const db = require("../Middleware/Database");
const bcrypt = require("bcrypt");

const execute_query = async (query, params) => {
  return new Promise((resolve, reject) => {
    db.query(query, params, (error, results) => {
      if (error) return reject(error);
      resolve(results);
    });
  });
};

adminRouter.post("/add_vendor", async (req, res) => {
  try {
    const location = req.body.address;
    // const owner_=req.body.licencenumber
    const city = req.body.city;
    const email = req.body.email;
    const dolby_sound = req.body.facilities.dolbySound;
    const foodcourt = req.body.facilities.foodCourt;
    const gaming_zone = req.body.facilities.gamingZone;
    const parking = req.body.facilities.parking;
    const restaurant = req.body.facilities.restaurant;
    const vip_lounge = req.body.facilities.vipLounge;
    const wheelchair = req.body.facilities.wheelchairAccess;
    const licencenumber = req.body.licenseNumber;
    const name = req.body.ownerName;
    const password = req.body.password;
    const phone = req.body.phone;
    const pincode = req.body.pincode;
    const screen_2d = req.body.screenTypes.screen2D;
    const screen_3d = req.body.screenTypes.screen3D;
    const screen_4dx = req.body.screenTypes.screen4DX;
    const screen_imax = req.body.screenTypes.screenIMAX;
    const screen_vip = req.body.screenTypes.vipScreen;
    const state = req.body.state;
    const theatername = req.body.theaterName;
    const total_screens = req.body.totalScreens;
    const total_seats = req.body.totalSeats;
    const hashedPassword = await bcrypt.hash(password, 10);

    const uqur = `INSERT INTO user (username,email,password,user_type,phone_number) VALUES (?,?,?,?,?)`;
    const para = [name, email, hashedPassword, "theater_owner", phone];
    await execute_query(uqur, para);

    const getqur = "SELECT user_id from user where username=?";
    const getpara = [name];
    const ownerResult = await execute_query(getqur, getpara);

    if (!ownerResult || ownerResult.length === 0) {
      return res.status(400).send("Error: Could not fetch owner ID.");
    }
    const owner_id = ownerResult[0].user_id;

    const query = `INSERT INTO theater (name,owner_licence,location,owner_id,city,state,pincode,total_seats,total_screens,parking,food_court,wheelchair_access,dolby_sound,restaurant,gaming_zone,vip_lounge,screen_2d,screen_3d,screen_4dx,screen_imax,screen_vip) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);`;

    const params = [
      theatername,
      licencenumber,
      location,
      owner_id,
      city,
      state,
      pincode,
      total_seats,
      total_screens,
      parking,
      foodcourt,
      wheelchair,
      dolby_sound,
      restaurant,
      gaming_zone,
      vip_lounge,
      screen_2d,
      screen_3d,
      screen_4dx,
      screen_imax,
      screen_vip,
    ];

    console.log("Params Length:", params.length); // Debugging step

    const result = await execute_query(query, params);
    return res.status(200).send("Vendor added successfully.");
  } catch (err) {
    console.log(err);
    return res.status(400).send("Failed to add vendor");
  }
});



adminRouter.delete('/delete_vendor/:id', async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).send("id cannot be emoty");
  try {
    const query =
      "UPDATE theater SET is_active = 0 WHERE owner_id = ? AND is_active = 1";
    const result= await execute_query(query, [id]);
    return res.status(200).send("vendor deleted successfully");
  } catch (err) {
    console.error(err);
  }
});


adminRouter.post("/update_vendor", async (req, res) => {
  try {
    const {
      name,
      location,
      city,
      state,
      pincode,
      total_screens,
      total_seats,
      parking,
      foodcourt,
      wheelchair,
      dolby_sound,
      restaurant,
      gaming_zone,
      vip_lounge,
      screen_2d,
      screen_3d,
      screen_4dx,
      screen_imax,
      screen_vip,
      is_active,
      id
    } = req.body;

    // Validate required fields
    if (!id) {
      return res.status(400).send("Theater ID is required");
    }

    // Log incoming data for debugging
    console.log("Update Vendor Request:", {
      id,
      name,
      // Add other fields as needed
    });

    const query =
      "UPDATE theater SET name=?,location=?,city=?,state=?,pincode=?,total_screens=?,total_seats=?,parking=?, food_court=?,wheelchair_access=?,dolby_sound=?,restaurant=?,gaming_zone=?,vip_lounge=?,screen_2d=?,screen_3d=?,screen_4dx=?,screen_imax=?,screen_vip=?,is_active=? WHERE theater_id = ?";
    
    const results = await execute_query(query, [
      name,
      location,
      city,
      state,
      pincode,
      total_screens,
      total_seats,
      parking,
      foodcourt,
      wheelchair,
      dolby_sound,
      restaurant,
      gaming_zone,
      vip_lounge,
      screen_2d,
      screen_3d,
      screen_4dx,
      screen_imax,
      screen_vip,
      is_active,
      id,
    ]);

    // Check if any rows were actually updated
    if (results.affectedRows === 0) {
      return res.status(404).send("No theater found with the given ID");
    }

    return res.status(200).json({
      message: "Vendor updated successfully",
      updatedRows: results.affectedRows
    });

  } catch (err) {
    console.error("Update vendor error:", err);
    return res.status(500).send(err.message || "Internal server error");
  }
});


adminRouter.get("/display_vendors", async (req, res) => {
  try {
    const query = `
      SELECT 
        *
      FROM theater t
      JOIN user u ON t.owner_id = u.user_id`;
    
    const results = await execute_query(query, []);
    return res.status(200).send(results);
  } catch (err) {
    return res.status(400).send("failed to display");
  }
});

module.exports = adminRouter;
