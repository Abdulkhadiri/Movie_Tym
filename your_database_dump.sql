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
-- Current Database: `shows`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `shows` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `shows`;

--
-- Table structure for table `booking`
--

DROP TABLE IF EXISTS `booking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `booking` (
  `booking_id` varchar(200) NOT NULL,
  `user_id` int DEFAULT NULL,
  `show_id` varchar(200) NOT NULL,
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
INSERT INTO `booking` VALUES ('$2b$10$0tMHA4jUyWfoFx.U7201LO.1Om4MNWpp9wIeAmxd4RTZQm/k.j4p6',2,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','2025-03-25 06:14:12'),('$2b$10$BrlfvkAPQc1pOGCOBtcguugkexJGmlRPsDcVNDXcTF3VMaD9L2sS.',1,'0d16fedea5410854aeaef44da611f9cde4ca079e789d6aba5557a7277747a4eb','2025-03-24 12:13:09'),('$2b$10$d73cuLcTvMBbtYvFiqitXuD7K6zcXrBptUFaoqpk/Acmivkb6QZxC',1,'SHW004','2025-03-19 12:22:49'),('$2b$10$dlKDHU.U5GtC/2JXmmM5KeTxgYfbu.1.0TwABX4wf8en9VK1SglQS',2,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','2025-03-25 06:12:33'),('$2b$10$dY1TcZa/YMx14FoVLGn1AOzi33H34QEpNYxcno0TJsEJTUZai5LU6',2,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','2025-03-25 06:17:55'),('$2b$10$EKRQBUsDgX5wZZnPoDXmw./C/ACx6rj3hhelOdHAHfpC/raxenEru',1,'0d16fedea5410854aeaef44da611f9cde4ca079e789d6aba5557a7277747a4eb','2025-03-24 12:17:10'),('$2b$10$fjeD7n.Vd5jm/2Cobj77kOnb0A5qNzGHtbmCwg/NByEBHuEtrYbJO',1,'SHW004','2025-03-19 12:23:24'),('$2b$10$K2CMh4GzVVGaPtGMF2J03uB1ZjLfsPX8GfIV8596uhMK.bwIevdf2',1,'0d16fedea5410854aeaef44da611f9cde4ca079e789d6aba5557a7277747a4eb','2025-03-24 12:12:10'),('$2b$10$SjJE/oI8xlsZTthcSnfqBOmisHuYSDpNRp8FwCXjxbHHl2kAediVy',2,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','2025-03-25 06:12:12'),('$2b$10$u571meuSpVZpyg8a6d0KCueZDHbFEOlpjfCik7smF8Ksup4FxqSwq',1,'SHW004','2025-03-24 12:10:19'),('$2b$10$W5tJu1SNgRMIULZBPjV2kOXyvOl4XvMDq3h.LO0MIPGgURfn721mq',2,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','2025-03-25 06:26:32'),('$2b$10$WJa0Ed/HYKmCmf9PlvJZSecGwcGPR3jxNAgpcH.n1SdTtdkVh.PIu',2,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','2025-03-25 06:13:55');
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
  `show_id` varchar(200) NOT NULL,
  `seat_number` varchar(20) NOT NULL,
  `status` enum('available','booked','blocked') NOT NULL DEFAULT 'available',
  `seat_type` enum('Orchestra','Mezzanine','Balcony') NOT NULL,
  `extra_price` decimal(10,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`seat_id`),
  KEY `seat_fk_show` (`show_id`),
  KEY `seat_fk_booking` (`booking_id`),
  CONSTRAINT `seat_fk_booking` FOREIGN KEY (`booking_id`) REFERENCES `booking` (`booking_id`) ON DELETE SET NULL,
  CONSTRAINT `seat_fk_show` FOREIGN KEY (`show_id`) REFERENCES `show_table` (`show_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=201 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seat`
--

LOCK TABLES `seat` WRITE;
/*!40000 ALTER TABLE `seat` DISABLE KEYS */;
INSERT INTO `seat` VALUES (1,NULL,'SHW004','A1','available','Orchestra',100.00),(2,NULL,'SHW004','A2','available','Orchestra',100.00),(3,NULL,'SHW004','A3','available','Orchestra',100.00),(4,NULL,'SHW004','B1','available','Mezzanine',50.00),(5,NULL,'SHW004','B2','available','Mezzanine',50.00),(6,NULL,'SHW004','B3','available','Mezzanine',50.00),(7,NULL,'SHW004','C1','available','Balcony',30.00),(8,NULL,'SHW004','C2','available','Balcony',30.00),(9,NULL,'SHW004','C3','available','Balcony',30.00),(10,NULL,'SHW005','A1','available','Orchestra',120.00),(11,NULL,'SHW005','A2','available','Orchestra',120.00),(12,NULL,'SHW005','B1','available','Mezzanine',60.00),(13,NULL,'SHW005','B2','available','Mezzanine',60.00),(14,NULL,'SHW005','C1','available','Balcony',40.00),(15,NULL,'SHW005','C2','available','Balcony',40.00),(16,NULL,'SHW006','A1','available','Orchestra',90.00),(17,NULL,'SHW006','A2','available','Orchestra',90.00),(18,NULL,'SHW006','B1','available','Mezzanine',45.00),(19,NULL,'SHW006','B2','available','Mezzanine',45.00),(20,NULL,'SHW006','C1','available','Balcony',25.00),(21,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','A1','available','Orchestra',350.00),(22,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','A2','available','Orchestra',350.00),(23,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','A3','available','Orchestra',350.00),(24,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','A4','available','Orchestra',350.00),(25,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','A5','available','Orchestra',350.00),(26,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','A6','available','Orchestra',350.00),(27,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','A7','available','Orchestra',350.00),(28,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','A8','available','Orchestra',350.00),(29,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','A9','available','Orchestra',350.00),(30,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','A10','available','Orchestra',350.00),(31,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','B1','available','Orchestra',350.00),(32,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','B2','available','Orchestra',350.00),(33,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','B3','available','Orchestra',350.00),(34,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','B4','available','Orchestra',350.00),(35,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','B5','available','Orchestra',350.00),(36,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','B6','available','Orchestra',350.00),(37,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','B7','available','Orchestra',350.00),(38,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','B8','available','Orchestra',350.00),(39,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','B9','available','Orchestra',350.00),(40,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','B10','available','Orchestra',350.00),(41,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','C1','available','Orchestra',350.00),(42,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','C2','available','Orchestra',350.00),(43,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','C3','available','Orchestra',350.00),(44,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','C4','available','Orchestra',350.00),(45,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','C5','available','Orchestra',350.00),(46,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','C6','available','Orchestra',350.00),(47,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','C7','available','Orchestra',350.00),(48,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','C8','available','Orchestra',350.00),(49,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','C9','available','Orchestra',350.00),(50,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','C10','available','Orchestra',350.00),(51,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','D1','available','Mezzanine',400.00),(52,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','D2','available','Mezzanine',400.00),(53,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','D3','available','Mezzanine',400.00),(54,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','D4','available','Mezzanine',400.00),(55,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','D5','available','Mezzanine',400.00),(56,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','D6','available','Mezzanine',400.00),(57,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','D7','available','Mezzanine',400.00),(58,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','D8','available','Mezzanine',400.00),(59,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','D9','available','Mezzanine',400.00),(60,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','D10','available','Mezzanine',400.00),(61,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','E1','available','Mezzanine',400.00),(62,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','E2','available','Mezzanine',400.00),(63,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','E3','available','Mezzanine',400.00),(64,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','E4','available','Mezzanine',400.00),(65,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','E5','available','Mezzanine',400.00),(66,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','E6','available','Mezzanine',400.00),(67,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','E7','available','Mezzanine',400.00),(68,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','E8','available','Mezzanine',400.00),(69,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','E9','available','Mezzanine',400.00),(70,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','E10','available','Mezzanine',400.00),(71,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','F1','available','Mezzanine',400.00),(72,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','F2','available','Mezzanine',400.00),(73,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','F3','available','Mezzanine',400.00),(74,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','F4','available','Mezzanine',400.00),(75,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','F5','available','Mezzanine',400.00),(76,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','F6','available','Mezzanine',400.00),(77,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','F7','available','Mezzanine',400.00),(78,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','F8','available','Mezzanine',400.00),(79,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','F9','available','Mezzanine',400.00),(80,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','F10','available','Mezzanine',400.00),(81,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','G1','available','Balcony',450.00),(82,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','G2','available','Balcony',450.00),(83,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','G3','available','Balcony',450.00),(84,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','G4','available','Balcony',450.00),(85,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','G5','available','Balcony',450.00),(86,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','G6','available','Balcony',450.00),(87,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','G7','available','Balcony',450.00),(88,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','G8','available','Balcony',450.00),(89,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','G9','available','Balcony',450.00),(90,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','G10','available','Balcony',450.00),(91,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','H1','available','Balcony',450.00),(92,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','H2','available','Balcony',450.00),(93,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','H3','available','Balcony',450.00),(94,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','H4','available','Balcony',450.00),(95,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','H5','available','Balcony',450.00),(96,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','H6','available','Balcony',450.00),(97,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','H7','available','Balcony',450.00),(98,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','H8','available','Balcony',450.00),(99,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','H9','available','Balcony',450.00),(100,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','H10','available','Balcony',450.00),(101,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','I1','available','Balcony',450.00),(102,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','I2','available','Balcony',450.00),(103,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','I3','available','Balcony',450.00),(104,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','I4','available','Balcony',450.00),(105,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','I5','available','Balcony',450.00),(106,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','I6','available','Balcony',450.00),(107,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','I7','available','Balcony',450.00),(108,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','I8','available','Balcony',450.00),(109,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','I9','available','Balcony',450.00),(110,NULL,'67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8','I10','available','Balcony',450.00),(111,'$2b$10$dY1TcZa/YMx14FoVLGn1AOzi33H34QEpNYxcno0TJsEJTUZai5LU6','79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','A1','booked','Orchestra',350.00),(112,NULL,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','A2','available','Orchestra',350.00),(113,NULL,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','A3','blocked','Orchestra',350.00),(114,NULL,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','A4','blocked','Orchestra',350.00),(115,NULL,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','A5','available','Orchestra',350.00),(116,NULL,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','A6','available','Orchestra',350.00),(117,NULL,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','A7','available','Orchestra',350.00),(118,NULL,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','A8','available','Orchestra',350.00),(119,NULL,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','A9','available','Orchestra',350.00),(120,NULL,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','A10','available','Orchestra',350.00),(121,NULL,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','B1','available','Orchestra',350.00),(122,NULL,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','B2','available','Orchestra',350.00),(123,NULL,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','B3','available','Orchestra',350.00),(124,NULL,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','B4','available','Orchestra',350.00),(125,NULL,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','B5','available','Orchestra',350.00),(126,NULL,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','B6','available','Orchestra',350.00),(127,NULL,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','B7','available','Orchestra',350.00),(128,NULL,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','B8','available','Orchestra',350.00),(129,NULL,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','B9','available','Orchestra',350.00),(130,NULL,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','B10','available','Orchestra',350.00),(131,NULL,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','C1','available','Orchestra',350.00),(132,NULL,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','C2','available','Orchestra',350.00),(133,NULL,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','C3','available','Orchestra',350.00),(134,NULL,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','C4','available','Orchestra',350.00),(135,NULL,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','C5','available','Orchestra',350.00),(136,NULL,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','C6','available','Orchestra',350.00),(137,NULL,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','C7','available','Orchestra',350.00),(138,NULL,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','C8','available','Orchestra',350.00),(139,NULL,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','C9','available','Orchestra',350.00),(140,NULL,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','C10','available','Orchestra',350.00),(141,NULL,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','D1','available','Mezzanine',400.00),(142,NULL,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','D2','available','Mezzanine',400.00),(143,'$2b$10$WJa0Ed/HYKmCmf9PlvJZSecGwcGPR3jxNAgpcH.n1SdTtdkVh.PIu','79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','D3','booked','Mezzanine',400.00),(144,NULL,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','D4','available','Mezzanine',400.00),(145,NULL,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','D5','available','Mezzanine',400.00),(146,NULL,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','D6','available','Mezzanine',400.00),(147,NULL,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','D7','available','Mezzanine',400.00),(148,NULL,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','D8','available','Mezzanine',400.00),(149,NULL,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','D9','available','Mezzanine',400.00),(150,NULL,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','D10','available','Mezzanine',400.00),(151,NULL,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','E1','available','Mezzanine',400.00),(152,NULL,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','E2','available','Mezzanine',400.00),(153,NULL,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','E3','available','Mezzanine',400.00),(154,NULL,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','E4','available','Mezzanine',400.00),(155,'$2b$10$SjJE/oI8xlsZTthcSnfqBOmisHuYSDpNRp8FwCXjxbHHl2kAediVy','79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','E5','booked','Mezzanine',400.00),(156,'$2b$10$dlKDHU.U5GtC/2JXmmM5KeTxgYfbu.1.0TwABX4wf8en9VK1SglQS','79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','E6','booked','Mezzanine',400.00),(157,NULL,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','E7','available','Mezzanine',400.00),(158,NULL,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','E8','available','Mezzanine',400.00),(159,NULL,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','E9','available','Mezzanine',400.00),(160,NULL,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','E10','available','Mezzanine',400.00),(161,NULL,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','F1','available','Mezzanine',400.00),(162,NULL,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','F2','available','Mezzanine',400.00),(163,NULL,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','F3','available','Mezzanine',400.00),(164,NULL,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','F4','available','Mezzanine',400.00),(165,NULL,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','F5','available','Mezzanine',400.00),(166,NULL,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','F6','available','Mezzanine',400.00),(167,NULL,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','F7','available','Mezzanine',400.00),(168,NULL,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','F8','available','Mezzanine',400.00),(169,NULL,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','F9','available','Mezzanine',400.00),(170,NULL,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','F10','available','Mezzanine',400.00),(171,NULL,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','G1','available','Balcony',450.00),(172,NULL,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','G2','available','Balcony',450.00),(173,NULL,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','G3','available','Balcony',450.00),(174,NULL,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','G4','available','Balcony',450.00),(175,'$2b$10$0tMHA4jUyWfoFx.U7201LO.1Om4MNWpp9wIeAmxd4RTZQm/k.j4p6','79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','G5','booked','Balcony',450.00),(176,'$2b$10$W5tJu1SNgRMIULZBPjV2kOXyvOl4XvMDq3h.LO0MIPGgURfn721mq','79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','G6','booked','Balcony',450.00),(177,NULL,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','G7','available','Balcony',450.00),(178,NULL,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','G8','available','Balcony',450.00),(179,NULL,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','G9','available','Balcony',450.00),(180,NULL,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','G10','available','Balcony',450.00),(181,NULL,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','H1','available','Balcony',450.00),(182,NULL,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','H2','available','Balcony',450.00),(183,NULL,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','H3','available','Balcony',450.00),(184,NULL,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','H4','available','Balcony',450.00),(185,NULL,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','H5','available','Balcony',450.00),(186,NULL,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','H6','available','Balcony',450.00),(187,NULL,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','H7','available','Balcony',450.00),(188,NULL,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','H8','available','Balcony',450.00),(189,NULL,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','H9','available','Balcony',450.00),(190,NULL,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','H10','available','Balcony',450.00),(191,NULL,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','I1','available','Balcony',450.00),(192,NULL,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','I2','available','Balcony',450.00),(193,NULL,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','I3','available','Balcony',450.00),(194,NULL,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','I4','available','Balcony',450.00),(195,NULL,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','I5','available','Balcony',450.00),(196,NULL,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','I6','available','Balcony',450.00),(197,NULL,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','I7','available','Balcony',450.00),(198,NULL,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','I8','available','Balcony',450.00),(199,NULL,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','I9','available','Balcony',450.00),(200,NULL,'79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25','I10','available','Balcony',450.00);
/*!40000 ALTER TABLE `seat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `show_table`
--

DROP TABLE IF EXISTS `show_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `show_table` (
  `show_id` varchar(200) NOT NULL,
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
INSERT INTO `show_table` VALUES ('0262c40f2ead14ad95f61807559ccb040330ac2e0bea3f3b6dc6cd87d75afef5',1,'Inception','2025-04-10','18:30:00','English','IMAX',2,300.00),('0317b54f5ae82405fab2b492f2922b8a72073569858e1d13071d5cdd547bddc0',3,'Inception','2025-04-10','18:30:00','English','IMAX',2,300.00),('0d16fedea5410854aeaef44da611f9cde4ca079e789d6aba5557a7277747a4eb',1,'Inception','2025-03-22','18:30:00','English','Sci-Fi',2,250.00),('1201509d12e39cffc8ff9eed13ca8cd8458972b57bc7e484c3bd7ffcf1e04d57',1,'Inception','2025-04-10','18:30:00','English','IMAX',2,300.00),('24effac6540a17f3b5c17f19fac1b99e435856035c28036f57b8bd120673bb53',1,'Inception','2025-04-10','18:30:00','English','IMAX',2,300.00),('41010e8afea92e19ccb5a7403d13eaaef77a54b56d35c52fd8903af9b43ff7e6',1,'Inception','2025-04-10','18:30:00','English','IMAX',2,300.00),('4ebd5674f412916d9451ac02eac7d0ced14ccd961f29e6b97791f46e718fd66f',1,'Inception','2025-04-10','18:30:00','English','IMAX',2,300.00),('54a2826a49d2e215effc35338b7754d0f4f012aa1dfd5a8bed89e2cf7484a3a2',1,'Chhaava','2025-03-23','14:22:00','Telugu',NULL,1,200.00),('5d6ff73396d14638ecec0d550b67a7603dc070a84f7c8d508c6c7c1b9d9f0d28',1,'Inception','2025-04-10','18:30:00','English','IMAX',2,300.00),('67ef248d7c2826f71d643d7a67eda1ad489c4a906980420cac66cb145069abb8',1,'Inception','2025-04-10','18:30:00','English','IMAX',2,300.00),('6fa7e153bdff6724277ed23af1f75a9d78a3283f10959a32d224ccef2de42005',1,'Deba deba','2025-03-30','13:23:00','Telugu',NULL,1,200.00),('79f1fc3cfa0f3c42b411cbfe5240088bcf04f5a3fdce49ee179baadf51411b25',1,'Return of the Dragon','2025-04-10','18:30:00','English','IMAX',2,300.00),('9536955b4d0c2d53683eb8b9013669e5d32692c09a4fe97a7c324f8674b617cb',2,'Inception','2025-04-10','18:30:00','English','IMAX',2,300.00),('d15dc05e7539088aa2c06d9c4a94bab8c49408980e730cb6b714699e86b3c929',3,'Chhaava','2025-03-22','11:15:00','Telugu',NULL,2,200.00),('SHW004',1,'Return of the Dragon','2025-03-20','18:30:00','English','Action',1,250.00),('SHW005',2,'Mazaka','2025-03-21','21:00:00','Telugu','Thriller',2,300.00),('SHW006',3,'Shabdam','2025-03-22','15:00:00','Malayalam','Drama',1,200.00);
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
  `database_parking` tinyint(1) NOT NULL DEFAULT '0',
  `food_court` tinyint(1) NOT NULL DEFAULT '0',
  `wheelchair_access` tinyint(1) NOT NULL DEFAULT '0',
  `dolby_sound` tinyint(1) NOT NULL DEFAULT '0',
  `imax` tinyint(1) NOT NULL DEFAULT '0',
  `restaurant` tinyint(1) NOT NULL DEFAULT '0',
  `gaming_zone` tinyint(1) NOT NULL DEFAULT '0',
  `vip_lounge` tinyint(1) NOT NULL DEFAULT '0',
  `screen_2d` tinyint(1) NOT NULL DEFAULT '0',
  `screen_3d` tinyint(1) NOT NULL DEFAULT '0',
  `screen_4dx` tinyint(1) NOT NULL DEFAULT '0',
  `screen_imax` tinyint(1) NOT NULL DEFAULT '0',
  `screen_vip` tinyint(1) NOT NULL DEFAULT '0',
  `dolby_atmos` tinyint(1) NOT NULL DEFAULT '0',
  `screen_type` varchar(50) NOT NULL DEFAULT 'Standard',
  PRIMARY KEY (`theater_id`),
  KEY `theater_fk_owner` (`owner_id`),
  CONSTRAINT `theater_fk_owner` FOREIGN KEY (`owner_id`) REFERENCES `user` (`user_id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `theater`
--

LOCK TABLES `theater` WRITE;
/*!40000 ALTER TABLE `theater` DISABLE KEYS */;
INSERT INTO `theater` VALUES (1,'PVR Cinemas','Downtown Plaza',2,'Hyderabad','Telangana','500081',200,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,'Standard'),(2,'INOX Movies','City Center',2,'Hyderabad','Telangana','500001',150,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,'Standard'),(3,'Cinepolis','Mega Mall',2,'Bangalore','Karnataka','560001',180,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,'Standard'),(4,'Galaxy Cinemas','MG Road',2,'Mumbai','Maharashtra','400001',250,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,'Standard'),(5,'Regal Multiplex','Brigade Road',2,'Bangalore','Karnataka','560001',300,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,'Standard'),(6,'Grand Cineplex','Connaught Place',2,'Delhi','Delhi','110001',350,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,'Standard'),(7,'Silver Screen','Park Street',2,'Kolkata','West Bengal','700016',280,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,'Standard'),(8,'PVR Plaza','Anna Salai',2,'Chennai','Tamil Nadu','600002',320,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,'Standard');
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'john_doe','hashed_password_123','john@example.com','customer','9876543210'),(2,'alice_smith','hashed_password_456','alice@example.com','theater_owner','8765432109'),(3,'your_username','$2b$10$7g6sFyd4AZBEBDQueXJfde4U1NXVqt6QplA2gcguauK2W3DoD9upW','your_email@example.com','customer','7672066201'),(4,'test1@example.com','$2b$10$Y1rBKRr6N1TS.k/irq0GGuTWw9HAJX6l04H2q1y6BUTL54.ckc.cu','test1@example.com','customer','12345678910');
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

-- Dump completed on 2025-03-25 12:02:57
