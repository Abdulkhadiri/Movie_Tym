import db from '../Middleware/Database.js';
export const tables = async() => {
    try {
        await db.promise().query(`
                CREATE DATABASE IF NOT EXISTS shows;
                USE shows;
                
                CREATE TABLE user (
                  user_id INT NOT NULL AUTO_INCREMENT,
                  username VARCHAR(50) NOT NULL,
                  password VARCHAR(255) NOT NULL,
                  email varchar(255) NOT NULL,
                  user_type ENUM('customer','theater_owner') NOT NULL,
                  phone_number VARCHAR(15) NOT NULL,
                  PRIMARY KEY (user_id),
                  UNIQUE KEY username (username)
                ) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
                 
                CREATE TABLE theater (
                  theater_id INT NOT NULL AUTO_INCREMENT,
                  name VARCHAR(100) NOT NULL,
                  location VARCHAR(100) NOT NULL,
                  owner_id INT DEFAULT NULL,
                  city VARCHAR(100) NOT NULL,
                  state VARCHAR(100) NOT NULL,
                  pincode VARCHAR(10) NOT NULL,
                  total_seats INT NOT NULL,
                  total_screens INT NOT NULL,
                  PRIMARY KEY (theater_id),
                
                  KEY owner_id (owner_id),
                  CONSTRAINT theater_ibfk_1 FOREIGN KEY (owner_id) REFERENCES user (user_id)
                ) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
                
                CREATE TABLE show_table (
                  show_id VARCHAR(20) NOT NULL,
                  theater_id INT DEFAULT NULL,
                  movie_name VARCHAR(100) NOT NULL,
                  show_date DATE DEFAULT NULL,
                  show_time TIME DEFAULT NULL,
                  Language VARCHAR(200) DEFAULT NULL,
                  Movie_Type VARCHAR(200) DEFAULT NULL,
                  screen INT NOT NULL,
                  price DECIMAL(10, 2) NOT NULL,
                  PRIMARY KEY (show_id),
                
                  KEY theater_id (theater_id),
                  CONSTRAINT show_table_ibfk_1 FOREIGN KEY (theater_id) REFERENCES theater (theater_id)
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
                
                CREATE TABLE seat (
                  seat_id INT NOT NULL AUTO_INCREMENT,
                   booking_id VARCHAR(20),
                  show_id VARCHAR(20) DEFAULT NULL,
                  seat_number VARCHAR(10) NOT NULL,
                  status ENUM('available','booked','blocked') NOT NULL,
                  seat_type ENUM('regular', 'premium', 'vip') NOT NULL,
                  PRIMARY KEY (seat_id),
                
                  KEY show_id (show_id),
                  CONSTRAINT seat_ibfk_1 FOREIGN KEY (show_id) REFERENCES show_table (show_id)
                ) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
                
                CREATE TABLE booking (
                  booking_id VARCHAR(20),
                  user_id INT DEFAULT NULL,
                  show_id VARCHAR(20) DEFAULT NULL,
                  booking_time TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
                  PRIMARY KEY (booking_id),
                  KEY user_id (user_id),
                  KEY show_id (show_id),
                  KEY seat_id (seat_id),
                  CONSTRAINT booking_ibfk_1 FOREIGN KEY (user_id) REFERENCES user (user_id),
                  CONSTRAINT booking_ibfk_2 FOREIGN KEY (show_id) REFERENCES show_table (show_id),
                  CONSTRAINT booking_ibfk_3 FOREIGN KEY (seat_id) REFERENCES seat (seat_id)
                ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`

        )
    } catch (err) {
        console.log("error in creating table", err)
    }
}