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
  console.log(id)
  if (!id) return res.status(400).send("id cannot be emoty");
  try {
    const query =
      "UPDATE theater SET is_active = 0 WHERE theater_id = ? AND is_active = 1";
    const result= await execute_query(query, [id]);
    return res.status(200).send("Theater deleted successfully");
  } catch (err) {
    console.error(err);
  }
});

adminRouter.get('/get_vendor/:id',async(req,res) =>{
  const query = "SELECT * FROM theater WHERE theater_id = ?";
  const {id} = req.params;
  try {
    const result = await execute_query(query, id);
    console.log(result);
    return res.status(200).send(result);
    } catch (err) {
      console.error(err);
      }
} );

adminRouter.post("/update_vendor", async (req, res) => {
  try {
    // const {
    //   name,
    //   location,
    //   city,
    //   state,
    //   pincode,
    //   total_screens,
    //   total_seats,
    //   parking,
    //   foodcourt,
    //   wheelchair,
    //   dolby_sound,
    //   restaurant,
    //   gaming_zone,
    //   vip_lounge,
    //   screen_2d,
    //   screen_3d,
    //   screen_4dx,
    //   screen_imax,
    //   screen_vip,
    //   is_active,
    //   id
    // } = req.body;

    const theaterData = {
      theater_id: req.body.theater_id,
      name: req.body.name,
      owner_licence: req.body.owner_licence,
      location: req.body.location,
      owner_id: req.body.owner_id,
      city: req.body.city,
      state: req.body.state,
      pincode: req.body.pincode,
      total_seats: req.body.total_seats,
      total_screens: req.body.total_screens,
      parking: req.body.parking,
      food_court: req.body.food_court,
      wheelchair_access: req.body.wheelchair_access,
      dolby_sound: req.body.dolby_sound,
      restaurant: req.body.restaurant,
      gaming_zone: req.body.gaming_zone,
      vip_lounge: req.body.vip_lounge,
      screen_2d: req.body.screen_2d,
      screen_3d: req.body.screen_3d,
      screen_4dx: req.body.screen_4dx,
      screen_imax: req.body.screen_imax,
      screen_vip: req.body.screen_vip,
      is_active: req.body.is_active,
  };
    console.log(req.body);
    console.log("Entered Here")
    // Validate required fields
    if (!theaterData.theater_id) {
      return res.status(400).send("Theater ID is required");
    }

    // Log incoming data for debugging
    const query =
      "UPDATE theater SET name=?,location=?,city=?,state=?,pincode=?,total_screens=?,total_seats=?,parking=?, food_court=?,wheelchair_access=?,dolby_sound=?,restaurant=?,gaming_zone=?,vip_lounge=?,screen_2d=?,screen_3d=?,screen_4dx=?,screen_imax=?,screen_vip=?,is_active=? WHERE theater_id = ?";
    
    const results = await execute_query(query, [
      theaterData.name,
      theaterData.location,
      theaterData.city,
      theaterData.state,
      theaterData.pincode,
      theaterData.total_screens,
      theaterData.total_seats,
      theaterData.parking,
      theaterData.food_court,
      theaterData.wheelchair_access,
      theaterData.dolby_sound,
      theaterData.restaurant,
      theaterData.gaming_zone,
      theaterData.vip_lounge,
      theaterData.screen_2d,
      theaterData.screen_3d,
      theaterData.screen_4dx,
      theaterData.screen_imax,
      theaterData.screen_vip,
      theaterData.is_active,
      theaterData.theater_id
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
