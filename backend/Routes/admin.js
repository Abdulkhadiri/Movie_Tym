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
const {
    name,
    email,
    password,
    phone,
    licencenumber,
    theatername,
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
    imax,
    restaurant,
    gaming_zone,
    vip_lounge,
    screen_2d,
    screen_3d,
    screen_4dx,
    screen_imax,
    screen_vip,
    dolby_atmos
  } = req.body;

  try {
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
    
    const query = `INSERT INTO theater (name,owner_licence,location,owner_id,city,state,pincode,total_seats,total_screens,parking,food_court,wheelchair_access,dolby_sound,imax,restaurant,gaming_zone,vip_lounge,screen_2d,screen_3d,screen_4dx,screen_imax,screen_vip,dolby_atmos) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);`;
    
    const params = [
        theatername,
        licencenumber,
        location,
        owner_id,
        city,
        state,
        pincode,
        total_screens,
        total_seats,
        parking,
        foodcourt,
        wheelchair,
        dolby_sound,
        imax, 
        restaurant,
        gaming_zone,
        vip_lounge,
        screen_2d,
        screen_3d,
        screen_4dx,
        screen_imax,
        screen_vip,
        dolby_atmos
    ];
    
    console.log("Params Length:", params.length);  // Debugging step
    
    const result = await execute_query(query, params);
    return res.status(200).send("Vendor added successfully.");
  } catch (err) {
    console.log(err);
    return res.status(400).send("Failed to add vendor");
  }
});



adminRouter.post("/delete_vendor", async (req, res) => {
  const { vendor_id, theater_id } = req.body;
  if (!id) return res.status(400).send("id cannot be emoty");
  try {
    const query =
      "delete from table theater where owner_id = ? AND theatre_id=? ";
    execute_query(query, [vendor_id, theater_id]);
    return res.status(200).send("vendor deleted successfully");
  } catch (err) {
    console.error(err);
  }
});

adminRouter.post("/update_vendor", async (req, res) => {
  const { id } = req.body;
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
  } = req.body;
  try {
    const query =
      "update table SET name=?,location=?,city=?,state=?,pincode=?,total_screens=?,total_seats=?,database_parking=?, food_court=?,wheelchair_access=?,dolby_sound=?,restaurant=?,gaming_zone=?,vip_lounge=?,screen_2d=?,screen_3d=?,screen_4dx=?,screen_imax=?,screen_vip=? where theater_id = ?";
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
      id,
    ]);
    return res.status(200).send("vendor updates successfully");
  } catch (err) {
    return res.status(400).send("updation failed");
  }
});
module.exports = adminRouter;
