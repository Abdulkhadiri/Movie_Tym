require('dotenv').config();
const mysql = require('mysql2');

// Create MySQL Connection
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    multipleStatements: true
});
connection.connect(async(err) => {
    if (err) {
        console.error('❌ Database connection failed: ' + err.stack);
        return;
    }
    console.log('✅ Connected to the database.');
    const tables = [
        `CREATE TABLE IF NOT EXISTS user (
            user_id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            user_type ENUM('customer', 'theater_owner') NOT NULL,
            phone_number VARCHAR(20) NOT NULL
        );`,
        `CREATE TABLE IF NOT EXISTS theater (
            theater_id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            location VARCHAR(255) NOT NULL,
            city VARCHAR(100) NOT NULL,
            state VARCHAR(100) NOT NULL,
            pincode VARCHAR(20) NOT NULL,
            total_seats INT NOT NULL,
            total_screens INT NOT NULL
        );`,
        `CREATE TABLE IF NOT EXISTS show_table (
            show_id VARCHAR(255) PRIMARY KEY,
            movie_name VARCHAR(255) NOT NULL,
            show_date DATE,
            show_time TIME,
            Language VARCHAR(50),
            Movie_Type VARCHAR(50),
            screen INT NOT NULL,
            price DECIMAL(10,2) NOT NULL,
            theater_id INT,
            FOREIGN KEY (theater_id) REFERENCES theater(theater_id) ON DELETE CASCADE
        );`,
        `CREATE TABLE IF NOT EXISTS booking (
            booking_id VARCHAR(255) PRIMARY KEY,
            user_id INT NOT NULL,
            show_id VARCHAR(255) NOT NULL,
            booking_time DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE,
            FOREIGN KEY (show_id) REFERENCES show_table(show_id) ON DELETE CASCADE
        );`,
        `CREATE TABLE IF NOT EXISTS seat (
            seat_id INT AUTO_INCREMENT PRIMARY KEY,
            booking_id VARCHAR(255),
            show_id VARCHAR(255) NOT NULL,
            seat_number INT NOT NULL,
            status ENUM('available', 'booked', 'blocked') DEFAULT 'available',
            seat_type ENUM('regular', 'premium', 'vip') NOT NULL,
            FOREIGN KEY (booking_id) REFERENCES booking(booking_id) ON DELETE CASCADE,
            FOREIGN KEY (show_id) REFERENCES show_table(show_id) ON DELETE CASCADE
        );`
    ];
    try {
        for (const query of tables) {
            await new Promise((resolve, reject) => {
                connection.query(query, (err) => {
                    if (err) {
                        console.error("❌ Error creating table:", err);
                        reject(err);
                    } else {
                        console.log("✅ Table created successfully or already exists.");
                        resolve();
                    }
                });
            });
        }
    } catch (err) {
        console.error("⚠️ Stopping execution due to an error.");
    }
    module.exports = connection;
});