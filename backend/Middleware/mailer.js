const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();

const sendEmail = async (email, otp) => {
    try {
        if (!process.env.BREVO_API_KEY) {
            console.error("Brevo API Key is not set.");
            return { success: false, message: "Brevo API Key is not set." };
        }
        console.log("Using Brevo API Key: ✅ Loaded");
        console.log("Sending OTP to:", email);

        const response = await axios.post(
            "https://api.brevo.com/v3/smtp/email",
            {
                sender: { name: "MOVIE_TYM", email: "ganderamu2001@gmail.com" }, 
                to: [{ email: email }],
                subject: "Your OTP Code",
                htmlContent: `<p>Your OTP code is <strong>${otp}</strong>. It is valid for 5 minutes.</p>`,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "api-key": process.env.BREVO_API_KEY,
                },
            }
        );

        console.log("Brevo Response:", response.data);
        return { success: true, message: "Email sent successfully", data: response.data };
    } catch (error) {
        console.error("Brevo API Error:", error.response?.data || error.message);
        return { success: false, message: "Error sending email", error: error.response?.data || error.message };
    }
};

module.exports = sendEmail;
