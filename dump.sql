-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: shows
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `booking`
--

DROP TABLE IF EXISTS `booking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `booking` (
  `booking_id` varchar(200) NOT NULL,
  `user_id` int DEFAULT NULL,
  `show_id` varchar(20) NOT NULL,
  `booking_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`booking_id`),
  KEY `booking_fk_user` (`user_id`),
  KEY `booking_fk_show` (`show_id`),
  CONSTRAINT `booking_fk_show` FOREIGN KEY (`show_id`) REFERENCES `show_table` (`show_id`) ON DELETE CASCADE,
  CONSTRAINT `booking_fk_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booking`
--

LOCK TABLES `booking` WRITE;
/*!40000 ALTER TABLE `booking` DISABLE KEYS */;
INSERT INTO `booking` VALUES ('$2b$10$d73cuLcTvMBbtYvFiqitXuD7K6zcXrBptUFaoqpk/Acmivkb6QZxC',1,'SHW004','2025-03-19 12:22:49'),('$2b$10$fjeD7n.Vd5jm/2Cobj77kOnb0A5qNzGHtbmCwg/NByEBHuEtrYbJO',1,'SHW004','2025-03-19 12:23:24');
/*!40000 ALTER TABLE `booking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seat`
--

DROP TABLE IF EXISTS `seat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seat` (
  `seat_id` int NOT NULL AUTO_INCREMENT,
  `booking_id` varchar(200) DEFAULT NULL,
  `show_id` varchar(20) NOT NULL,
  `seat_number` int NOT NULL,
  `status` enum('available','booked','blocked') NOT NULL DEFAULT 'available',
  `seat_type` enum('regular','premium','vip') NOT NULL,
  PRIMARY KEY (`seat_id`),
  KEY `seat_fk_show` (`show_id`),
  KEY `seat_fk_booking` (`booking_id`),
  CONSTRAINT `seat_fk_booking` FOREIGN KEY (`booking_id`) REFERENCES `booking` (`booking_id`) ON DELETE SET NULL,
  CONSTRAINT `seat_fk_show` FOREIGN KEY (`show_id`) REFERENCES `show_table` (`show_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seat`
--

LOCK TABLES `seat` WRITE;
/*!40000 ALTER TABLE `seat` DISABLE KEYS */;
INSERT INTO `seat` VALUES (4,NULL,'SHW004',1,'available','regular'),(5,NULL,'SHW004',2,'available','regular'),(6,NULL,'SHW004',3,'available','regular'),(7,NULL,'SHW004',4,'available','regular'),(8,NULL,'SHW004',5,'available','regular'),(9,NULL,'SHW004',6,'available','regular'),(10,NULL,'SHW004',7,'available','regular'),(11,NULL,'SHW004',8,'available','regular'),(12,NULL,'SHW004',9,'available','regular'),(13,NULL,'SHW004',11,'available','regular'),(14,'$2b$10$fjeD7n.Vd5jm/2Cobj77kOnb0A5qNzGHtbmCwg/NByEBHuEtrYbJO','SHW004',12,'available','regular');
/*!40000 ALTER TABLE `seat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `show_table`
--

DROP TABLE IF EXISTS `show_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `show_table` (
  `show_id` varchar(20) NOT NULL,
  `theater_id` int DEFAULT NULL,
  `movie_name` varchar(100) NOT NULL,
  `show_date` date DEFAULT NULL,
  `show_time` time DEFAULT NULL,
  `Language` varchar(200) DEFAULT NULL,
  `Movie_Type` varchar(200) DEFAULT NULL,
  `screen` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`show_id`),
  KEY `show_fk_theater` (`theater_id`),
  CONSTRAINT `show_fk_theater` FOREIGN KEY (`theater_id`) REFERENCES `theater` (`theater_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `show_table`
--

LOCK TABLES `show_table` WRITE;
/*!40000 ALTER TABLE `show_table` DISABLE KEYS */;
INSERT INTO `show_table` VALUES ('SHW004',1,'Return of the Dragon','2025-03-20','18:30:00','English','Action',1,250.00),('SHW005',2,'Mazaka','2025-03-21','21:00:00','Telugu','Thriller',2,300.00),('SHW006',3,'Shabdam','2025-03-22','15:00:00','Malayalam','Drama',1,200.00);
/*!40000 ALTER TABLE `show_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `theater`
--

DROP TABLE IF EXISTS `theater`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `theater` (
  `theater_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `location` varchar(100) NOT NULL,
  `owner_id` int DEFAULT NULL,
  `city` varchar(100) NOT NULL,
  `state` varchar(100) NOT NULL,
  `pincode` varchar(10) NOT NULL,
  `total_seats` int NOT NULL,
  `total_screens` int NOT NULL,
  PRIMARY KEY (`theater_id`),
  KEY `theater_fk_owner` (`owner_id`),
  CONSTRAINT `theater_fk_owner` FOREIGN KEY (`owner_id`) REFERENCES `user` (`user_id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `theater`
--

LOCK TABLES `theater` WRITE;
/*!40000 ALTER TABLE `theater` DISABLE KEYS */;
INSERT INTO `theater` VALUES (1,'PVR Cinemas','Downtown Plaza',2,'Hyderabad','Telangana','500081',200,5),(2,'INOX Movies','City Center',2,'Hyderabad','Telangana','500001',150,3),(3,'Cinepolis','Mega Mall',2,'Bangalore','Karnataka','560001',180,4);
/*!40000 ALTER TABLE `theater` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `user_type` enum('customer','theater_owner') NOT NULL,
  `phone_number` varchar(15) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'john_doe','hashed_password_123','john@example.com','customer','9876543210'),(2,'alice_smith','hashed_password_456','alice@example.com','theater_owner','8765432109'),(3,'your_username','$2b$10$7g6sFyd4AZBEBDQueXJfde4U1NXVqt6QplA2gcguauK2W3DoD9upW','your_email@example.com','customer','7672066201');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-20 10:17:23
