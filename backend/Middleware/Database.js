require('dotenv').config();
const mysql = require('mysql2');

// Create MySQL Connection
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    
});

connection.connect((err) => {
    if (err) {
        console.error('❌ Database connection failed: ' + err.stack);
        return;
    }
    console.log('✅ Connected to the database.');

    createTables()
        .then(() => console.log("✅ All tables are set up successfully."))
        .catch((err) => console.error("⚠️ Error setting up tables:", err));
});

// Function to create tables using Promises
const createTables = async() => {
    const tables = [
        `CREATE TABLE IF NOT EXISTS user (
            user_id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            user_type ENUM('customer', 'theater_owner') NOT NULL,
            phone_number VARCHAR(20) NOT NULL
        );`,

        `CREATE TABLE IF NOT EXISTS private_booking (
            id INT AUTO_INCREMENT  PRIMARY KEY,
            user_id INT NOT NULL,
            location VARCHAR(255) NOT NULL,
            no_of_people INT NOT NULL,
            date DATE NOT NULL,
            time TIME NOT NULL,
            price DECIMAL(10,2) NOT NULL,
            FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE
        );`,
        
        `CREATE TABLE IF NOT EXISTS theater (
            theater_id int NOT NULL AUTO_INCREMENT,
            name varchar(100) NOT NULL,
            owner_licence varchar(100) NOT NULL,
            location varchar(100) NOT NULL,
            owner_id int DEFAULT NULL,
            city varchar(100) NOT NULL,
            state varchar(100) NOT NULL,
            pincode varchar(10) NOT NULL,
            total_seats int NOT NULL,
            total_screens int NOT NULL,
            parking tinyint(1) NOT NULL DEFAULT 0,
            food_court tinyint(1) NOT NULL DEFAULT 0,
            wheelchair_access tinyint(1) NOT NULL DEFAULT 0,
            dolby_sound tinyint(1) NOT NULL DEFAULT 0,
            restaurant tinyint(1) NOT NULL DEFAULT 0,
            gaming_zone tinyint(1) NOT NULL DEFAULT 0,
            vip_lounge tinyint(1) NOT NULL DEFAULT 0,
            screen_2d tinyint(1) NOT NULL DEFAULT 0,
            screen_3d tinyint(1) NOT NULL DEFAULT 0,
            screen_4dx tinyint(1) NOT NULL DEFAULT 0,
            screen_imax tinyint(1) NOT NULL DEFAULT 0,
            screen_vip tinyint(1) NOT NULL DEFAULT 0,
            PRIMARY KEY (theater_id),
            KEY theater_fk_owner (owner_id),
            CONSTRAINT theater_fk_owner FOREIGN KEY (owner_id) REFERENCES user (user_id) ON DELETE SET NULL
          ) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`,
           
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
        );`,
        `CREATE TABLE IF NOT EXISTS ratings (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            rating TINYINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
            comment TEXT,
            FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE
        );`
    ];

    for (const query of tables) {
        await executeQuery(query);
    }
};

// Function to execute queries
const executeQuery = (query) => {
    return new Promise((resolve, reject) => {
        connection.query(query, (err, results) => {
            if (err) {
                console.error("❌ Error creating table:", err);
                reject(err);
            } else {
                console.log("✅ Table created successfully or already exists.");
                resolve(results);
            }
        });
    });
};

module.exports = connection;