-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: shows
-- ------------------------------------------------------
-- Server version	8.0.41

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
  `booking_id` varchar(255) NOT NULL,
  `user_id` int NOT NULL,
  `show_id` varchar(255) NOT NULL,
  `booking_time` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`booking_id`),
  KEY `user_id` (`user_id`),
  KEY `show_id` (`show_id`),
  CONSTRAINT `booking_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `booking_ibfk_2` FOREIGN KEY (`show_id`) REFERENCES `show_table` (`show_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booking`
--

LOCK TABLES `booking` WRITE;
/*!40000 ALTER TABLE `booking` DISABLE KEYS */;
INSERT INTO `booking` VALUES ('a1a546f',2,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','2025-04-02 15:16:14'),('f45bee0',2,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','2025-04-02 15:04:26');
/*!40000 ALTER TABLE `booking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `private_booking`
--

DROP TABLE IF EXISTS `private_booking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `private_booking` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `location` varchar(255) NOT NULL,
  `no_of_people` int NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `private_booking_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `private_booking`
--

LOCK TABLES `private_booking` WRITE;
/*!40000 ALTER TABLE `private_booking` DISABLE KEYS */;
/*!40000 ALTER TABLE `private_booking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ratings`
--

DROP TABLE IF EXISTS `ratings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ratings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `rating` tinyint NOT NULL,
  `comment` text,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `ratings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `ratings_chk_1` CHECK ((`rating` between 1 and 5))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ratings`
--

LOCK TABLES `ratings` WRITE;
/*!40000 ALTER TABLE `ratings` DISABLE KEYS */;
/*!40000 ALTER TABLE `ratings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seat`
--

DROP TABLE IF EXISTS `seat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seat` (
  `seat_id` int NOT NULL AUTO_INCREMENT,
  `booking_id` varchar(255) DEFAULT NULL,
  `show_id` varchar(255) NOT NULL,
  `seat_number` varchar(255) NOT NULL,
  `status` enum('available','booked','blocked') DEFAULT 'available',
  `seat_type` enum('Orchestra','Mezzanine','Balcony') NOT NULL,
  `extra_price` int NOT NULL,
  PRIMARY KEY (`seat_id`),
  KEY `booking_id` (`booking_id`),
  KEY `show_id` (`show_id`),
  CONSTRAINT `seat_ibfk_1` FOREIGN KEY (`booking_id`) REFERENCES `booking` (`booking_id`) ON DELETE CASCADE,
  CONSTRAINT `seat_ibfk_2` FOREIGN KEY (`show_id`) REFERENCES `show_table` (`show_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seat`
--

LOCK TABLES `seat` WRITE;
/*!40000 ALTER TABLE `seat` DISABLE KEYS */;
INSERT INTO `seat` VALUES (1,NULL,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','A1','available','Orchestra',20050),(2,NULL,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','A2','available','Orchestra',20050),(3,NULL,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','A3','blocked','Orchestra',20050),(4,NULL,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','A4','blocked','Orchestra',20050),(5,'a1a546f','edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','A5','booked','Orchestra',20050),(6,NULL,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','A6','available','Orchestra',20050),(7,NULL,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','A7','available','Orchestra',20050),(8,NULL,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','A8','available','Orchestra',20050),(9,NULL,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','A9','available','Orchestra',20050),(10,NULL,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','A10','available','Orchestra',20050),(11,NULL,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','B1','available','Orchestra',20050),(12,NULL,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','B2','available','Orchestra',20050),(13,NULL,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','B3','available','Orchestra',20050),(14,NULL,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','B4','available','Orchestra',20050),(15,NULL,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','B5','blocked','Orchestra',20050),(16,NULL,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','B6','available','Orchestra',20050),(17,NULL,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','B7','blocked','Orchestra',20050),(18,NULL,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','B8','available','Orchestra',20050),(19,NULL,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','B9','available','Orchestra',20050),(20,NULL,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','B10','available','Orchestra',20050),(21,NULL,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','C1','available','Orchestra',20050),(22,NULL,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','C2','available','Orchestra',20050),(23,NULL,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','C3','available','Orchestra',20050),(24,NULL,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','C4','available','Orchestra',20050),(25,NULL,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','C5','available','Orchestra',20050),(26,NULL,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','C6','available','Orchestra',20050),(27,'f45bee0','edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','C7','booked','Orchestra',20050),(28,NULL,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','C8','available','Orchestra',20050),(29,NULL,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','C9','available','Orchestra',20050),(30,NULL,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','C10','available','Orchestra',20050),(31,NULL,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','D1','available','Mezzanine',200100),(32,NULL,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','D2','available','Mezzanine',200100),(33,NULL,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','D3','available','Mezzanine',200100),(34,NULL,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','D4','blocked','Mezzanine',200100),(35,NULL,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','D5','available','Mezzanine',200100),(36,NULL,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','D6','available','Mezzanine',200100),(37,NULL,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','D7','available','Mezzanine',200100),(38,NULL,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','D8','available','Mezzanine',200100),(39,NULL,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','D9','available','Mezzanine',200100),(40,NULL,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','D10','blocked','Mezzanine',200100),(41,NULL,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','E1','available','Mezzanine',200100),(42,NULL,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','E2','available','Mezzanine',200100),(43,NULL,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','E3','available','Mezzanine',200100),(44,NULL,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','E4','available','Mezzanine',200100),(45,NULL,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','E5','available','Mezzanine',200100),(46,NULL,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','E6','available','Mezzanine',200100),(47,NULL,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','E7','available','Mezzanine',200100),(48,NULL,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','E8','available','Mezzanine',200100),(49,NULL,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','E9','available','Mezzanine',200100),(50,NULL,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','E10','available','Mezzanine',200100),(51,NULL,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','F1','available','Mezzanine',200100),(52,NULL,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','F2','available','Mezzanine',200100),(53,NULL,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','F3','available','Mezzanine',200100),(54,NULL,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','F4','available','Mezzanine',200100),(55,NULL,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','F5','available','Mezzanine',200100),(56,NULL,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','F6','available','Mezzanine',200100),(57,NULL,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','F7','available','Mezzanine',200100),(58,NULL,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','F8','blocked','Mezzanine',200100),(59,NULL,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','F9','blocked','Mezzanine',200100),(60,'a1a546f','edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','F10','booked','Mezzanine',200100),(61,NULL,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','G1','available','Balcony',200150),(62,NULL,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','G2','available','Balcony',200150),(63,NULL,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','G3','available','Balcony',200150),(64,NULL,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','G4','blocked','Balcony',200150),(65,NULL,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','G5','available','Balcony',200150),(66,NULL,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','G6','available','Balcony',200150),(67,NULL,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','G7','available','Balcony',200150),(68,NULL,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','G8','blocked','Balcony',200150),(69,'f45bee0','edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','G9','booked','Balcony',200150),(70,NULL,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','G10','available','Balcony',200150),(71,NULL,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','H1','available','Balcony',200150),(72,NULL,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','H2','available','Balcony',200150),(73,NULL,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','H3','available','Balcony',200150),(74,NULL,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','H4','available','Balcony',200150),(75,NULL,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','H5','available','Balcony',200150),(76,NULL,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','H6','available','Balcony',200150),(77,NULL,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','H7','available','Balcony',200150),(78,NULL,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','H8','available','Balcony',200150),(79,NULL,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','H9','available','Balcony',200150),(80,NULL,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','H10','available','Balcony',200150),(81,NULL,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','I1','available','Balcony',200150),(82,NULL,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','I2','available','Balcony',200150),(83,NULL,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','I3','available','Balcony',200150),(84,NULL,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','I4','available','Balcony',200150),(85,NULL,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','I5','available','Balcony',200150),(86,NULL,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','I6','available','Balcony',200150),(87,NULL,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','I7','available','Balcony',200150),(88,NULL,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','I8','available','Balcony',200150),(89,NULL,'edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','I9','available','Balcony',200150),(90,'a1a546f','edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','I10','booked','Balcony',200150);
/*!40000 ALTER TABLE `seat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `show_table`
--

DROP TABLE IF EXISTS `show_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `show_table` (
  `show_id` varchar(255) NOT NULL,
  `movie_name` varchar(255) NOT NULL,
  `show_date` date DEFAULT NULL,
  `show_time` time DEFAULT NULL,
  `Language` varchar(50) DEFAULT NULL,
  `Movie_Type` varchar(50) DEFAULT NULL,
  `screen` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `theater_id` int DEFAULT NULL,
  PRIMARY KEY (`show_id`),
  KEY `theater_id` (`theater_id`),
  CONSTRAINT `show_table_ibfk_1` FOREIGN KEY (`theater_id`) REFERENCES `theater` (`theater_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `show_table`
--

LOCK TABLES `show_table` WRITE;
/*!40000 ALTER TABLE `show_table` DISABLE KEYS */;
INSERT INTO `show_table` VALUES ('edaeb05752b3c54d4e5c63a6483d4bcbd439cddce92dd4c2fbbdb8c5841dcd41','Return of the Dragon','2025-04-10','17:34:00','Hindi',NULL,2,200.00,9);
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
  `owner_licence` varchar(100) NOT NULL,
  `location` varchar(100) NOT NULL,
  `owner_id` int DEFAULT NULL,
  `city` varchar(100) NOT NULL,
  `state` varchar(100) NOT NULL,
  `pincode` varchar(10) NOT NULL,
  `total_seats` int NOT NULL,
  `total_screens` int NOT NULL,
  `parking` tinyint(1) NOT NULL DEFAULT '0',
  `food_court` tinyint(1) NOT NULL DEFAULT '0',
  `wheelchair_access` tinyint(1) NOT NULL DEFAULT '0',
  `dolby_sound` tinyint(1) NOT NULL DEFAULT '0',
  `restaurant` tinyint(1) NOT NULL DEFAULT '0',
  `gaming_zone` tinyint(1) NOT NULL DEFAULT '0',
  `vip_lounge` tinyint(1) NOT NULL DEFAULT '0',
  `screen_2d` tinyint(1) NOT NULL DEFAULT '0',
  `screen_3d` tinyint(1) NOT NULL DEFAULT '0',
  `screen_4dx` tinyint(1) NOT NULL DEFAULT '0',
  `screen_imax` tinyint(1) NOT NULL DEFAULT '0',
  `screen_vip` tinyint(1) NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`theater_id`),
  KEY `theater_fk_owner` (`owner_id`),
  CONSTRAINT `theater_fk_owner` FOREIGN KEY (`owner_id`) REFERENCES `user` (`user_id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `theater`
--

LOCK TABLES `theater` WRITE;
/*!40000 ALTER TABLE `theater` DISABLE KEYS */;
INSERT INTO `theater` VALUES (9,'Abdul Studio','qwertyuiop','KPHB colony , Road 1',1,'Hyderabad','Telengana','515001',50,2,1,0,1,1,1,1,0,0,1,1,0,1,1),(10,'sandhya multiplex','ASDFGHJKL','Balanager',3,'Hyderabad','Telangana','500085',150,5,1,1,1,1,0,0,0,0,1,0,0,1,1),(11,'Akhil imax','qwertyuiop','kphb',4,'Hyderabad','Telangana','50085',10,5,0,1,1,0,1,0,0,1,1,1,0,0,1);
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
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `user_type` enum('customer','theater_owner') NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Abdul Khadiri Kola','$2b$10$ZTwaxjH8ZRs5zm0v.HOnOeNwZzKJ1YAoLEigjdWGzEEZyCeYI7SXu','abdul@gmail.com','theater_owner','1234567899'),(2,'Jillu','$2b$10$VNXibpJqvVcNByGWVMZrbufAOeK/IQjsVnN1cb2T1wKyFZfR4XTMa','abduljillu@gmail.com','customer','7780124859'),(3,'qwerty','$2b$10$SnEKmSGcM/lpsWIZD//29ekve9mpkC3UgfF9Ftv0j/0eDC/Q9aK7S','saikahil@m2003','theater_owner','7894563210'),(4,'AkhilM','$2b$10$CTR94hyx8jIUrRAw3/6GX.uL0ja8AwP21iQMEhLAkT5hI05q4ZKa2','Akhil@9033','theater_owner','1234567891'),(5,'sandhya','$2b$10$UXYSBPeY/I44hD8oCKLX8.aqeRAvFG3ucoUx5rBxWzyPikXIVeANC','sandhya@gmail.com','customer','1234567890');
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

-- Dump completed on 2025-04-02 16:29:57
