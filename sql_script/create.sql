CREATE DATABASE  IF NOT EXISTS `tutorlink` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `tutorlink`;
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: tutorlink
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accounts` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `hashed_password` varchar(255) NOT NULL,
  `otp` varchar(255) DEFAULT NULL,
  `otp_expired_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `unread_notifications` int DEFAULT '0',
  `role_id` int DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `is_active` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `accounts_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES (1,'nguyenvana@gmail.com','mat_khau_1',NULL,'2025-04-21 23:54:43',0,2,'2025-04-21 23:54:43',1),(2,'tranthib@gmail.com','mat_khau_2',NULL,'2025-04-21 23:54:43',0,3,'2025-04-21 23:54:43',1),(3,'levanc@gmail.com','mat_khau_3',NULL,'2025-04-21 23:54:43',0,1,'2025-04-21 23:54:43',1),(4,'phamthid@gmail.com','mat_khau_4',NULL,'2025-04-21 23:54:43',0,3,'2025-04-21 23:54:43',1),(5,'hoangvane@gmail.com','mat_khau_5',NULL,'2025-04-21 23:54:43',0,2,'2025-04-21 23:54:43',1),(6,'vuthif@gmail.com','mat_khau_6',NULL,'2025-04-21 23:54:43',0,2,'2025-04-21 23:54:43',1),(7,'buivang@gmail.com','mat_khau_7',NULL,'2025-04-21 23:54:43',0,3,'2025-04-21 23:54:43',1),(8,'nguyenthih@gmail.com','mat_khau_8',NULL,'2025-04-21 23:54:43',0,2,'2025-04-21 23:54:43',1),(9,'tranvani@gmail.com','mat_khau_9',NULL,'2025-04-21 23:54:43',0,1,'2025-04-21 23:54:43',1),(10,'lethij@gmail.com','mat_khau_10',NULL,'2025-04-21 23:54:43',0,3,'2025-04-21 23:54:43',1),(12,'khachhang@gmail.com','$2a$10$gE7G2HdWoulvjBuShWW94eZxodlTPI7OAwGjFPXYiy.xoiEapNGYC',NULL,'2025-04-22 01:02:56',0,3,'2025-04-22 01:02:57',1),(13,'giasu@gmail.com','$2a$10$QDcVjO/8XJ.yUGxG8gG6Hu2GAJmCzVS/bV/endIJkLqfj6q6vGayS',NULL,'2025-04-22 01:15:55',0,2,'2025-04-22 01:15:55',1),(14,'khachhang1@gmail.com','$2a$10$wZB/O3MnQQd9yGTto0Svo.SJUK41hS8EgqFVXTQCW.XJtgTKtrIdK',NULL,'2025-04-22 09:07:47',0,3,'2025-04-22 09:07:48',1),(15,'testdangky@hmail.com','$2a$10$/owZdr50wNw1.52iapgNHupooDVbEd9vsbtpShTRYztyMeVkYnG.2',NULL,'2025-04-23 13:56:51',0,1,'2025-04-23 13:56:51',1),(16,'kiet@gmail.com','$2a$10$k9SQfEO.VimsrxULn7gvCOBSYOyFlcH0PZ9GsJ9xpwLOK4yyCirkq',NULL,'2025-04-23 14:24:25',0,1,'2025-04-23 14:24:26',1),(17,'giasu1@gmail.com','$2a$10$tXcr8gml4s/.6G.TV0OhLuEqlYbZ9vM2xnrkVSZNvnW628rljki9e',NULL,'2025-04-23 15:04:09',0,2,'2025-04-23 15:04:09',1),(20,'admin@gmail.com','$2a$10$dL8n0kPCr4tsKvchPKOtW.8HAMqt6ZY9vbtVwKrwdmGEqJjmpDWmC',NULL,'2025-04-27 14:44:17',0,1,'2025-04-27 14:44:17',1),(21,'giasu2@gmail.com','$2a$10$6N9FBNlGqKb3dS88lgQ89OR9yFkcL0608ZmJVFNvf6iX6mkrRuNGC',NULL,'2025-04-27 18:16:23',0,2,'2025-04-27 18:16:23',1),(22,'sadasdasd@gmail.com','$2a$10$flrJJ.zr9Q1CSlUg6kzggOy00Fnakt3EUJMKj1i5Q9IEavrNhWkWa',NULL,'2025-05-08 21:30:41',0,3,'2025-05-08 21:30:41',1);
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_otp_expired_date_insert` BEFORE INSERT ON `accounts` FOR EACH ROW BEGIN
  IF NEW.otp IS NOT NULL THEN
    SET NEW.otp_expired_time = NOW() + INTERVAL 5 MINUTE;
  END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_otp_expired_date_update` BEFORE UPDATE ON `accounts` FOR EACH ROW BEGIN
  IF (NEW.otp IS NOT NULL AND (OLD.otp IS NULL OR OLD.otp <> NEW.otp)) THEN
    SET NEW.otp_expired_time = NOW() + INTERVAL 5 MINUTE;
  END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admins` (
  `admin_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  PRIMARY KEY (`admin_id`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `admins_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `accounts` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES (3,1),(4,2),(1,3),(5,4),(6,5),(7,6),(8,7),(9,8),(2,16),(11,20);
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cancellationrequests`
--

DROP TABLE IF EXISTS `cancellationrequests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cancellationrequests` (
  `cancellation_request_id` int NOT NULL AUTO_INCREMENT,
  `course_id` int NOT NULL,
  `requester_type` enum('TUTOR','CUSTOMER') DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `reason` text,
  PRIMARY KEY (`cancellation_request_id`),
  KEY `course_id` (`course_id`),
  CONSTRAINT `cancellationrequests_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cancellationrequests`
--

LOCK TABLES `cancellationrequests` WRITE;
/*!40000 ALTER TABLE `cancellationrequests` DISABLE KEYS */;
/*!40000 ALTER TABLE `cancellationrequests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cancellationresponses`
--

DROP TABLE IF EXISTS `cancellationresponses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cancellationresponses` (
  `cancellation_response_id` int NOT NULL AUTO_INCREMENT,
  `cancellation_request_id` int NOT NULL,
  `admin_id` int DEFAULT NULL,
  `is_approved` tinyint(1) DEFAULT NULL,
  `reason` text,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`cancellation_response_id`),
  UNIQUE KEY `cancellation_request_id` (`cancellation_request_id`),
  KEY `admin_id` (`admin_id`),
  CONSTRAINT `cancellationresponses_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`admin_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `cancellationresponses_ibfk_2` FOREIGN KEY (`cancellation_request_id`) REFERENCES `cancellationrequests` (`cancellation_request_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cancellationresponses`
--

LOCK TABLES `cancellationresponses` WRITE;
/*!40000 ALTER TABLE `cancellationresponses` DISABLE KEYS */;
/*!40000 ALTER TABLE `cancellationresponses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courses` (
  `course_id` int NOT NULL AUTO_INCREMENT,
  `request_id` int NOT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `status` enum('INPROGRESS','COMPLETED','CANCELLED') DEFAULT 'INPROGRESS',
  `sessions_per_week` int DEFAULT NULL,
  PRIMARY KEY (`course_id`),
  UNIQUE KEY `request_id` (`request_id`),
  CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`request_id`) REFERENCES `tutoringrequests` (`request_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES (24,5,'2025-05-04',NULL,'COMPLETED',2),(25,6,'2025-05-06',NULL,'INPROGRESS',2);
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courseschedules`
--

DROP TABLE IF EXISTS `courseschedules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courseschedules` (
  `course_id` int DEFAULT NULL,
  `schedule_id` int NOT NULL AUTO_INCREMENT,
  `day_of_week` int DEFAULT NULL,
  `start_time` time DEFAULT NULL,
  `end_time` time DEFAULT NULL,
  PRIMARY KEY (`schedule_id`),
  KEY `course_id` (`course_id`),
  CONSTRAINT `courseschedules_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `courseschedules_chk_1` CHECK (((`day_of_week` >= 1) and (`day_of_week` <= 7)))
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courseschedules`
--

LOCK TABLES `courseschedules` WRITE;
/*!40000 ALTER TABLE `courseschedules` DISABLE KEYS */;
INSERT INTO `courseschedules` VALUES (24,38,2,'18:00:00','19:30:00'),(24,39,5,'18:00:00','19:30:00'),(25,40,2,'18:00:00','19:30:00'),(25,41,5,'18:00:00','19:30:00');
/*!40000 ALTER TABLE `courseschedules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coursescheduleschanges`
--

DROP TABLE IF EXISTS `coursescheduleschanges`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coursescheduleschanges` (
  `course_schedule_change_id` int NOT NULL,
  `course_id` int DEFAULT NULL,
  `new_day_of_week` int DEFAULT NULL,
  `new_start_time` time DEFAULT NULL,
  `new_end_time` time DEFAULT NULL,
  `status` enum('PEDING','APPROVED','REJECT') DEFAULT NULL,
  `sender` enum('TUTOR','CUSTOMER') DEFAULT NULL,
  PRIMARY KEY (`course_schedule_change_id`),
  CONSTRAINT `coursescheduleschanges_chk_1` CHECK (((`new_day_of_week` >= 1) and (`new_day_of_week` <= 7)))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coursescheduleschanges`
--

LOCK TABLES `coursescheduleschanges` WRITE;
/*!40000 ALTER TABLE `coursescheduleschanges` DISABLE KEYS */;
/*!40000 ALTER TABLE `coursescheduleschanges` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `customer_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  PRIMARY KEY (`customer_id`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `customers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `accounts` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (1,1),(10,2),(5,3),(6,4),(2,5),(3,6),(7,7),(4,8),(8,9),(9,10),(12,12),(18,22);
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `district`
--

DROP TABLE IF EXISTS `district`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `district` (
  `district_id` varchar(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `province_id` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`district_id`),
  KEY `province_id` (`province_id`),
  CONSTRAINT `district_ibfk_1` FOREIGN KEY (`province_id`) REFERENCES `province` (`province_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `district`
--

LOCK TABLES `district` WRITE;
/*!40000 ALTER TABLE `district` DISABLE KEYS */;
INSERT INTO `district` VALUES ('001','Quận Ba Đình','01'),('002','Quận Hoàn Kiếm','01'),('003','Quận Tây Hồ','01'),('004','Quận Long Biên','01'),('005','Quận Cầu Giấy','01'),('006','Quận Đống Đa','01'),('007','Quận Hai Bà Trưng','01'),('008','Quận Hoàng Mai','01'),('009','Quận Thanh Xuân','01'),('016','Huyện Sóc Sơn','01'),('017','Huyện Đông Anh','01'),('018','Huyện Gia Lâm','01'),('019','Quận Nam Từ Liêm','01'),('020','Huyện Thanh Trì','01'),('021','Quận Bắc Từ Liêm','01'),('250','Huyện Mê Linh','01'),('268','Quận Hà Đông','01'),('269','Thị xã Sơn Tây','01'),('271','Huyện Ba Vì','01'),('272','Huyện Phúc Thọ','01'),('273','Huyện Đan Phượng','01'),('274','Huyện Hoài Đức','01'),('275','Huyện Quốc Oai','01'),('276','Huyện Thạch Thất','01'),('277','Huyện Chương Mỹ','01'),('278','Huyện Thanh Oai','01'),('279','Huyện Thường Tín','01'),('280','Huyện Phú Xuyên','01'),('281','Huyện Ứng Hòa','01'),('282','Huyện Mỹ Đức','01'),('490','Quận Liên Chiểu','48'),('491','Quận Thanh Khê','48'),('492','Quận Hải Châu','48'),('493','Quận Sơn Trà','48'),('494','Quận Ngũ Hành Sơn','48'),('495','Quận Cẩm Lệ','48'),('497','Huyện Hòa Vang','48'),('498','Huyện Hoàng Sa','48'),('760','Quận 1','79'),('761','Quận 12','79'),('764','Quận Gò Vấp','79'),('765','Quận Bình Thạnh','79'),('766','Quận Tân Bình','79'),('767','Quận Tân Phú','79'),('768','Quận Phú Nhuận','79'),('769','Thành phố Thủ Đức','79'),('770','Quận 3','79'),('771','Quận 10','79'),('772','Quận 11','79'),('773','Quận 4','79'),('774','Quận 5','79'),('775','Quận 6','79'),('776','Quận 8','79'),('777','Quận Bình Tân','79'),('778','Quận 7','79'),('783','Huyện Củ Chi','79'),('784','Huyện Hóc Môn','79'),('785','Huyện Bình Chánh','79'),('786','Huyện Nhà Bè','79'),('787','Huyện Cần Giờ','79');
/*!40000 ALTER TABLE `district` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedbacks`
--

DROP TABLE IF EXISTS `feedbacks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedbacks` (
  `feedback_id` int NOT NULL AUTO_INCREMENT,
  `course_id` int NOT NULL,
  `rating` int DEFAULT NULL,
  `content` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`feedback_id`),
  KEY `course_id` (`course_id`),
  CONSTRAINT `feedbacks_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `feedbacks_chk_1` CHECK ((`rating` between 0 and 5))
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedbacks`
--

LOCK TABLES `feedbacks` WRITE;
/*!40000 ALTER TABLE `feedbacks` DISABLE KEYS */;
/*!40000 ALTER TABLE `feedbacks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grades`
--

DROP TABLE IF EXISTS `grades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `grades` (
  `grade_id` int NOT NULL AUTO_INCREMENT,
  `grade_name` varchar(100) NOT NULL,
  PRIMARY KEY (`grade_id`),
  UNIQUE KEY `class_name` (`grade_name`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grades`
--

LOCK TABLES `grades` WRITE;
/*!40000 ALTER TABLE `grades` DISABLE KEYS */;
INSERT INTO `grades` VALUES (1,'Lớp 1'),(10,'Lớp 10'),(11,'Lớp 11'),(12,'Lớp 12'),(2,'Lớp 2'),(3,'Lớp 3'),(4,'Lớp 4'),(5,'Lớp 5'),(6,'Lớp 6'),(7,'Lớp 7'),(8,'Lớp 8'),(9,'Lớp 9');
/*!40000 ALTER TABLE `grades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `notification_id` int NOT NULL AUTO_INCREMENT,
  `content` text,
  `user_id` int NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `is_read` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`notification_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `accounts` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES (1,'Yêu cầu gia sư của bạn đã được phê duyệt!',1,'2025-04-21 23:54:54',0),(2,'Khóa học mới đã được mở.',2,'2025-04-21 23:54:54',1),(3,'Thanh toán đã được nhận thành công.',3,'2025-04-21 23:54:54',0),(4,'Hồ sơ của bạn đã được cập nhật.',4,'2025-04-21 23:54:54',1),(5,'Nhận được phản hồi mới cho khóa học.',5,'2025-04-21 23:54:54',0),(6,'Yêu cầu gia sư bị từ chối.',6,'2025-04-21 23:54:54',1),(7,'Lịch học đã được cập nhật.',7,'2025-04-21 23:54:54',0),(8,'Chứng chỉ mới đã được thêm.',8,'2025-04-21 23:54:54',1),(9,'Xác minh tài khoản hoàn tất.',9,'2025-04-21 23:54:54',0),(10,'Nhắc nhở: Hoàn thiện hồ sơ của bạn.',10,'2025-04-21 23:54:54',1);
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `payment_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `tutoring_request_id` int DEFAULT NULL,
  `type` enum('DEPOSIT','PAYMENT','REFUND') DEFAULT NULL,
  `amount` int DEFAULT NULL,
  `description` text,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`payment_id`),
  KEY `user_id` (`user_id`),
  KEY `payments_ibfk_2` (`tutoring_request_id`),
  CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `accounts` (`user_id`),
  CONSTRAINT `payments_ibfk_2` FOREIGN KEY (`tutoring_request_id`) REFERENCES `tutoringrequests` (`request_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
INSERT INTO `payments` VALUES (1,1,NULL,'DEPOSIT',200000,'Đặt cọc cho khóa học Toán','2025-04-22 00:24:15'),(2,2,NULL,'PAYMENT',360000,'Thanh toán cho khóa học Vật lý','2025-04-22 00:24:15'),(3,3,NULL,'REFUND',110000,'Hoàn tiền cho khóa học Hóa học','2025-04-22 00:24:15'),(5,5,NULL,'PAYMENT',200000,'Thanh toán cho khóa học Tiếng Anh','2025-04-22 00:24:15'),(6,6,NULL,'REFUND',115000,'Hoàn tiền cho khóa học Lịch sử','2025-04-22 00:24:15'),(7,7,NULL,'DEPOSIT',250000,'Đặt cọc cho khóa học Địa lý','2025-04-22 00:24:15'),(8,8,NULL,'PAYMENT',315000,'Thanh toán cho khóa học Ngữ văn','2025-04-22 00:24:15'),(9,9,NULL,'REFUND',100000,'Hoàn tiền cho khóa học Tin học','2025-04-22 00:24:15');
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permissions` (
  `permission_id` int NOT NULL AUTO_INCREMENT,
  `permission_name` varchar(100) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`permission_id`),
  UNIQUE KEY `permission_name` (`permission_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personalinfos`
--

DROP TABLE IF EXISTS `personalinfos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personalinfos` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(255) DEFAULT NULL,
  `avatarUrl` text
  `gender` enum('MALE','FEMALE') DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `address` text,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `phone_number` (`phone_number`),
  CONSTRAINT `personalinfos_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `accounts` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personalinfos`
--

LOCK TABLES `personalinfos` WRITE;
/*!40000 ALTER TABLE `personalinfos` DISABLE KEYS */;
INSERT INTO `personalinfos` VALUES (1,'Nguyễn Văn An','MALE','0912345671','123 Đường Lê Lợi, Quận 1'),(2,'Trần Thị Bình','FEMALE','0912345672','456 Đường Nguyễn Huệ, Quận 3'),(3,'Lê Văn Cường','MALE','0912345673','789 Đường Trần Hưng Đạo, Quận 5'),(4,'Phạm Thị Dung','FEMALE','0912345674','101 Đường Võ Văn Tần, Quận 7'),(5,'Hoàng Văn Em','MALE','0912345675','202 Đường Phạm Văn Đồng, Thủ Đức'),(6,'Vũ Thị Phượng','FEMALE','0912345676','303 Đường Nguyễn Văn Cừ, Quận 5'),(7,'Bùi Văn Giang','MALE','0912345677','404 Đường Lý Thường Kiệt, Quận 10'),(8,'Nguyễn Thị Hạnh','FEMALE','0912345678','505 Đường Cách Mạng Tháng Tám, Quận 3'),(9,'Trần Văn In','MALE','0912345679','606 Đường Trường Chinh, Tân Bình'),(10,'Lê Thị Kim','FEMALE','0912345680','707 Đường Nguyễn Trãi, Quận 5'),(12,'Tien Dat','MALE','0901234567',NULL),(13,'Vu Tien Dat','MALE','0921445689',NULL),(14,'Tien Dat','MALE','0327623849',NULL),(15,'Tien Dat','MALE','0921445688',NULL),(16,'kiet','MALE','0123123123',NULL),(17,'cxc','MALE','0123548563',NULL),(20,'ADMIN ','MALE','0901234666',NULL),(21,'Gia Sư Toán','MALE','0901237777',NULL),(22,'sadasdsad','MALE','0123445555',NULL);
/*!40000 ALTER TABLE `personalinfos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `province`
--

DROP TABLE IF EXISTS `province`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `province` (
  `province_id` varchar(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`province_id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `province`
--

LOCK TABLES `province` WRITE;
/*!40000 ALTER TABLE `province` DISABLE KEYS */;
INSERT INTO `province` VALUES ('48','Thành phố Đà Nẵng'),('01','Thành phố Hà Nội'),('79','Thành phố Hồ Chí Minh');
/*!40000 ALTER TABLE `province` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `refundresponses`
--

DROP TABLE IF EXISTS `refundresponses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `refundresponses` (
  `cancellation_response_id` int NOT NULL,
  `refund_deposit` int DEFAULT NULL,
  `refund_tuition` int DEFAULT NULL,
  `id_payment_tutor` int DEFAULT NULL,
  `id_payment_customer` int DEFAULT NULL,
  PRIMARY KEY (`cancellation_response_id`),
  KEY `id_payment_tutor` (`id_payment_tutor`),
  KEY `id_payment_customer` (`id_payment_customer`),
  CONSTRAINT `refundresponses_ibfk_1` FOREIGN KEY (`cancellation_response_id`) REFERENCES `cancellationresponses` (`cancellation_response_id`),
  CONSTRAINT `refundresponses_ibfk_2` FOREIGN KEY (`id_payment_tutor`) REFERENCES `payments` (`payment_id`),
  CONSTRAINT `refundresponses_ibfk_3` FOREIGN KEY (`id_payment_customer`) REFERENCES `payments` (`payment_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refundresponses`
--

LOCK TABLES `refundresponses` WRITE;
/*!40000 ALTER TABLE `refundresponses` DISABLE KEYS */;
/*!40000 ALTER TABLE `refundresponses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `requestschedules`
--

DROP TABLE IF EXISTS `requestschedules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `requestschedules` (
  `schedule_id` int NOT NULL AUTO_INCREMENT,
  `request_id` int DEFAULT NULL,
  `day_of_week` int DEFAULT NULL,
  `start_time` time DEFAULT NULL,
  `end_time` time DEFAULT NULL,
  PRIMARY KEY (`schedule_id`),
  KEY `request_id` (`request_id`),
  CONSTRAINT `requestschedules_ibfk_1` FOREIGN KEY (`request_id`) REFERENCES `tutoringrequests` (`request_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `requestschedules_chk_1` CHECK (((`day_of_week` >= 1) and (`day_of_week` <= 7)))
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `requestschedules`
--

LOCK TABLES `requestschedules` WRITE;
/*!40000 ALTER TABLE `requestschedules` DISABLE KEYS */;
INSERT INTO `requestschedules` VALUES (1,1,2,'18:00:00','19:30:00'),(2,1,5,'18:00:00','19:30:00'),(3,2,2,'18:00:00','19:30:00'),(4,2,5,'18:00:00','19:30:00'),(5,3,2,'18:00:00','19:30:00'),(6,3,5,'18:00:00','19:30:00'),(7,4,2,'18:00:00','19:30:00'),(8,4,5,'18:00:00','19:30:00'),(9,5,2,'18:00:00','19:30:00'),(10,5,5,'18:00:00','19:30:00'),(11,6,2,'18:00:00','19:30:00'),(12,6,5,'18:00:00','19:30:00'),(13,7,2,'18:00:00','19:30:00'),(14,7,5,'18:00:00','19:30:00'),(15,8,2,'18:00:00','19:30:00'),(16,8,5,'18:00:00','19:30:00'),(17,9,2,'18:00:00','19:30:00'),(18,9,5,'18:00:00','19:30:00'),(19,9,6,'18:00:00','19:30:00'),(20,11,2,'18:00:00','19:30:00'),(21,11,5,'18:00:00','19:30:00'),(22,12,2,'18:00:00','19:30:00'),(23,12,5,'18:00:00','19:30:00');
/*!40000 ALTER TABLE `requestschedules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rolepermissions`
--

DROP TABLE IF EXISTS `rolepermissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rolepermissions` (
  `role_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`role_id`,`permission_id`),
  KEY `permission_id` (`permission_id`),
  CONSTRAINT `rolepermissions_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `rolepermissions_ibfk_2` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`permission_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rolepermissions`
--

LOCK TABLES `rolepermissions` WRITE;
/*!40000 ALTER TABLE `rolepermissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `rolepermissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `role_id` int NOT NULL AUTO_INCREMENT,
  `role_name` varchar(100) NOT NULL,
  PRIMARY KEY (`role_id`),
  UNIQUE KEY `role_name` (`role_name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'ADMIN'),(3,'CUSTOMER'),(2,'TUTOR');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subjects`
--

DROP TABLE IF EXISTS `subjects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subjects` (
  `subject_id` int NOT NULL AUTO_INCREMENT,
  `subject_name` varchar(100) NOT NULL,
  PRIMARY KEY (`subject_id`),
  UNIQUE KEY `subject_name` (`subject_name`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subjects`
--

LOCK TABLES `subjects` WRITE;
/*!40000 ALTER TABLE `subjects` DISABLE KEYS */;
INSERT INTO `subjects` VALUES (7,'Địa lý'),(10,'Giáo dục công dân'),(3,'Hóa học'),(6,'Lịch sử'),(8,'Ngữ văn'),(4,'Sinh học'),(5,'Tiếng Anh'),(9,'Tin học'),(1,'Toán học'),(2,'Vật lý');
/*!40000 ALTER TABLE `subjects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tutorcertificates`
--

DROP TABLE IF EXISTS `tutorcertificates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tutorcertificates` (
  `certificate_id` int NOT NULL AUTO_INCREMENT,
  `tutor_id` int DEFAULT NULL,
  `certificate_image` text,
  `certificate_name` varchar(255) DEFAULT NULL,
  `issue_date` datetime DEFAULT NULL,
  `issuing_authority` varchar(255) DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`certificate_id`),
  KEY `tutor_id` (`tutor_id`),
  CONSTRAINT `tutorcertificates_ibfk_1` FOREIGN KEY (`tutor_id`) REFERENCES `tutors` (`tutor_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tutorcertificates`
--

LOCK TABLES `tutorcertificates` WRITE;
/*!40000 ALTER TABLE `tutorcertificates` DISABLE KEYS */;
INSERT INTO `tutorcertificates` VALUES (1,1,'Chứng chỉ giảng dạy Toán','2023-01-15 00:00:00','Sở Giáo dục','Cấp cao'),(2,2,'Bằng Tiến sĩ Vật lý','2022-06-10 00:00:00','Đại học Quốc gia','Chuyên sâu'),(3,3,'Chứng chỉ Hóa học','2023-03-20 00:00:00','Học viện Khoa học','Xuất sắc'),(4,4,'Giấy phép giảng dạy Sinh học','2021-11-05 00:00:00','Sở Giáo dục','Đạt chuẩn'),(5,5,'Chứng chỉ Tiếng Anh C1','2023-02-12 00:00:00','Viện Ngôn ngữ','Cấp quốc tế'),(6,6,'Chứng chỉ giảng dạy Lịch sử','2022-09-25 00:00:00','Sở Giáo dục','Đạt chuẩn'),(7,7,'Bằng Thạc sĩ Địa lý','2023-07-30 00:00:00','Đại học Sư phạm','Chuyên nghiên cứu'),(8,8,'Chứng chỉ Văn học','2022-12-01 00:00:00','Học viện Văn học','Hạng ưu'),(9,9,'Bằng Cử nhân Tin học','2023-04-18 00:00:00','Đại học Công nghệ','Đạt chuẩn'),(10,13,'Giấy phép giảng dạy Giáo dục công dân','2021-08-22 00:00:00','Sở Giáo dục','Đạt chuẩn');
/*!40000 ALTER TABLE `tutorcertificates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tutoringrequests`
--

DROP TABLE IF EXISTS `tutoringrequests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tutoringrequests` (
  `request_id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int NOT NULL,
  `tutor_id` int DEFAULT NULL,
  `subject_class_id` int DEFAULT NULL,
  `sessions_per_week` int DEFAULT NULL,
  `ward_id` varchar(20) NOT NULL,
  `address_detail` varchar(255) DEFAULT NULL,
  `proposed_fee_per_session` int DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `expired_at` datetime DEFAULT NULL,
  `status` enum('PENDING','APPROVED','REJECTED','ASSIGNED','CANCELLED','REFUNDED') DEFAULT 'PENDING',
  `subject_id` int DEFAULT NULL,
  `grade_id` int DEFAULT NULL,
  PRIMARY KEY (`request_id`),
  KEY `customer_id` (`customer_id`),
  KEY `tutor_id` (`tutor_id`),
  KEY `subject_class_id` (`subject_class_id`),
  KEY `ward_id` (`ward_id`),
  KEY `fk_tutoringrequests_subject` (`subject_id`),
  KEY `fk_tutoringrequests_grade` (`grade_id`),
  CONSTRAINT `fk_tutoringrequests_grade` FOREIGN KEY (`grade_id`) REFERENCES `grades` (`grade_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_tutoringrequests_subject` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`subject_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `tutoringrequests_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `tutoringrequests_ibfk_2` FOREIGN KEY (`tutor_id`) REFERENCES `tutors` (`tutor_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tutoringrequests_ibfk_4` FOREIGN KEY (`ward_id`) REFERENCES `ward` (`ward_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tutoringrequests`
--

LOCK TABLES `tutoringrequests` WRITE;
/*!40000 ALTER TABLE `tutoringrequests` DISABLE KEYS */;
INSERT INTO `tutoringrequests` VALUES (1,12,15,NULL,2,'20326','97 Man ',150000,'2025-05-04 11:16:33',NULL,'PENDING',10,3),(2,12,NULL,NULL,2,'20326','97 Man ',150000,'2025-05-04 11:17:22',NULL,'PENDING',10,3),(3,12,15,NULL,2,'20326','97 Man ',150000,'2025-05-04 11:17:39',NULL,'PENDING',10,3),(4,12,15,NULL,2,'20326','97 Man ',150000,'2025-05-04 11:17:45',NULL,'PENDING',10,3),(5,12,15,NULL,2,'20326','97 Man ',150000,'2025-05-04 11:17:50',NULL,'APPROVED',10,3),(6,12,15,NULL,2,'20326','97 Man ',150000,'2025-05-04 11:17:58',NULL,'APPROVED',10,3),(7,1,NULL,NULL,2,'20308','123 Đường Lê Lợi, Phường Bến Thành',150000,'2025-05-07 00:14:30',NULL,'PENDING',9,3),(8,12,NULL,NULL,2,'20308','123 Đường Lê Lợi, Phường Bến Thành',150000,'2025-05-07 00:15:34',NULL,'PENDING',9,3),(9,12,NULL,NULL,3,'20200','79 nha',14999999,'2025-05-07 00:16:53',NULL,'PENDING',1,2),(11,12,NULL,NULL,2,'20209','97 Man ',150000,'2025-05-07 01:49:47',NULL,'APPROVED',3,12),(12,12,NULL,NULL,2,'20308','123 Đường Lê Lợi, Phường Bến Thành',150000,'2025-05-08 15:22:34',NULL,'APPROVED',9,3);
/*!40000 ALTER TABLE `tutoringrequests` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_after_approve_tutoring_request` AFTER UPDATE ON `tutoringrequests` FOR EACH ROW BEGIN
  -- Kiểm tra nếu status chuyển từ khác APPROVED thành APPROVED
  IF OLD.status != 'APPROVED' AND NEW.status = 'APPROVED' AND OLD.tutor_id IS NOT NULL THEN

    -- 1. Chèn bản ghi mới vào bảng Courses
    INSERT INTO Courses (
      request_id,
      start_date,
      status,
      sessions_per_week
    )
    VALUES (
      NEW.request_id,
      CURDATE(),            -- Ngày bắt đầu là ngày hiện tại
      'INPROGRESS',
      NEW.sessions_per_week
    );

    -- 2. Chèn các lịch từ RequestSchedules sang CourseSchedules
    INSERT INTO CourseSchedules (
      course_id,
      day_of_week,
      start_time,
      end_time
    )
    SELECT 
      c.course_id,
      rs.day_of_week,
      rs.start_time,
      rs.end_time
    FROM RequestSchedules rs
    JOIN Courses c ON c.request_id = rs.request_id
    WHERE rs.request_id = NEW.request_id;

  END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `tutors`
--

DROP TABLE IF EXISTS `tutors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tutors` (
  `tutor_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `introduction` text,
  `avg_rating` decimal(10,2) DEFAULT '0.00',
  `completed_courses` int DEFAULT '0',
  `feedback_course_count` int DEFAULT '0',
  `is_approved` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`tutor_id`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `tutors_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `accounts` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tutors`
--

LOCK TABLES `tutors` WRITE;
/*!40000 ALTER TABLE `tutors` DISABLE KEYS */;
INSERT INTO `tutors` VALUES (1,2,'Gia sư Toán với 5 năm kinh nghiệm',4.50,10,8,1),(2,4,'Chuyên gia Vật lý, từng giảng dạy tại trường THPT',4.80,15,12,1),(3,7,'Chuyên dạy Hóa học, phương pháp dễ hiểu',4.20,5,4,1),(4,10,'Gia sư Sinh học với bằng Tiến sĩ',4.90,20,18,1),(5,1,'Gia sư Tiếng Anh, luyện thi IELTS',4.00,3,2,0),(6,3,'Giáo viên Lịch sử, giàu kinh nghiệm',4.30,7,6,1),(7,5,'Gia sư Địa lý, hỗ trợ học sinh thi THPTQG',4.70,12,10,1),(8,6,'Yêu thích giảng dạy Văn học',4.10,4,3,0),(9,17,'Gia sư Tin học, chuyên lập trình',4.60,9,7,1),(13,13,'Gia sư Giáo dục công dân, tận tâm',4.40,6,5,1),(15,21,NULL,0.00,0,0,1);
/*!40000 ALTER TABLE `tutors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tutorsubjectclasses`
--

DROP TABLE IF EXISTS `tutorsubjectclasses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tutorsubjectclasses` (
  `tutor_id` int NOT NULL,
  `subject_id` int NOT NULL,
  `grade_id` int NOT NULL,
  PRIMARY KEY (`tutor_id`,`subject_id`,`grade_id`),
  KEY `fk_tutorsubjectclasses_grade` (`grade_id`),
  KEY `fk_tutorsubjectclasses_subject` (`subject_id`),
  CONSTRAINT `fk_tutorsubjectclasses_grade` FOREIGN KEY (`grade_id`) REFERENCES `grades` (`grade_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_tutorsubjectclasses_subject` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`subject_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `tutorsubjectclasses_ibfk_1` FOREIGN KEY (`tutor_id`) REFERENCES `tutors` (`tutor_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tutorsubjectclasses`
--

LOCK TABLES `tutorsubjectclasses` WRITE;
/*!40000 ALTER TABLE `tutorsubjectclasses` DISABLE KEYS */;
INSERT INTO `tutorsubjectclasses` VALUES (8,1,1),(1,1,2),(13,1,2),(7,1,4),(2,2,5),(9,4,5),(3,4,7),(4,4,8),(5,7,8),(6,8,9);
/*!40000 ALTER TABLE `tutorsubjectclasses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ward`
--

DROP TABLE IF EXISTS `ward`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ward` (
  `ward_id` varchar(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `district_id` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`ward_id`),
  KEY `district_id` (`district_id`),
  CONSTRAINT `ward_ibfk_1` FOREIGN KEY (`district_id`) REFERENCES `district` (`district_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ward`
--

LOCK TABLES `ward` WRITE;
/*!40000 ALTER TABLE `ward` DISABLE KEYS */;
INSERT INTO `ward` VALUES ('00001','Phường Phúc Xá','001'),('00004','Phường Trúc Bạch','001'),('00006','Phường Vĩnh Phúc','001'),('00007','Phường Cống Vị','001'),('00008','Phường Liễu Giai','001'),('00013','Phường Quán Thánh','001'),('00016','Phường Ngọc Hà','001'),('00019','Phường Điện Biên','001'),('00022','Phường Đội Cấn','001'),('00025','Phường Ngọc Khánh','001'),('00028','Phường Kim Mã','001'),('00031','Phường Giảng Võ','001'),('00034','Phường Thành Công','001'),('00037','Phường Phúc Tân','002'),('00040','Phường Đồng Xuân','002'),('00043','Phường Hàng Mã','002'),('00046','Phường Hàng Buồm','002'),('00049','Phường Hàng Đào','002'),('00052','Phường Hàng Bồ','002'),('00055','Phường Cửa Đông','002'),('00058','Phường Lý Thái Tổ','002'),('00061','Phường Hàng Bạc','002'),('00064','Phường Hàng Gai','002'),('00067','Phường Chương Dương','002'),('00070','Phường Hàng Trống','002'),('00073','Phường Cửa Nam','002'),('00076','Phường Hàng Bông','002'),('00079','Phường Tràng Tiền','002'),('00082','Phường Trần Hưng Đạo','002'),('00085','Phường Phan Chu Trinh','002'),('00088','Phường Hàng Bài','002'),('00091','Phường Phú Thượng','003'),('00094','Phường Nhật Tân','003'),('00097','Phường Tứ Liên','003'),('00100','Phường Quảng An','003'),('00103','Phường Xuân La','003'),('00106','Phường Yên Phụ','003'),('00109','Phường Bưởi','003'),('00112','Phường Thụy Khuê','003'),('00115','Phường Thượng Thanh','004'),('00118','Phường Ngọc Thụy','004'),('00121','Phường Giang Biên','004'),('00124','Phường Đức Giang','004'),('00127','Phường Việt Hưng','004'),('00130','Phường Gia Thụy','004'),('00133','Phường Ngọc Lâm','004'),('00136','Phường Phúc Lợi','004'),('00139','Phường Bồ Đề','004'),('00145','Phường Long Biên','004'),('00148','Phường Thạch Bàn','004'),('00151','Phường Phúc Đồng','004'),('00154','Phường Cự Khối','004'),('00157','Phường Nghĩa Đô','005'),('00160','Phường Nghĩa Tân','005'),('00163','Phường Mai Dịch','005'),('00166','Phường Dịch Vọng','005'),('00167','Phường Dịch Vọng Hậu','005'),('00169','Phường Quan Hoa','005'),('00172','Phường Yên Hoà','005'),('00175','Phường Trung Hoà','005'),('00178','Phường Cát Linh','006'),('00181','Phường Văn Miếu - Quốc Tử Giám','006'),('00187','Phường Láng Thượng','006'),('00190','Phường Ô Chợ Dừa','006'),('00193','Phường Văn Chương','006'),('00196','Phường Hàng Bột','006'),('00199','Phường Láng Hạ','006'),('00202','Phường Khâm Thiên','006'),('00205','Phường Thổ Quan','006'),('00208','Phường Nam Đồng','006'),('00214','Phường Quang Trung','006'),('00217','Phường Trung Liệt','006'),('00226','Phường Phương Liên - Trung Tự','006'),('00229','Phường Kim Liên','006'),('00232','Phường Phương Mai','006'),('00235','Phường Thịnh Quang','006'),('00238','Phường Khương Thượng','006'),('00241','Phường Nguyễn Du','007'),('00244','Phường Bạch Đằng','007'),('00247','Phường Phạm Đình Hổ','007'),('00256','Phường Lê Đại Hành','007'),('00259','Phường Đồng Nhân','007'),('00262','Phường Phố Huế','007'),('00268','Phường Thanh Lương','007'),('00271','Phường Thanh Nhàn','007'),('00277','Phường Bách Khoa','007'),('00280','Phường Đồng Tâm','007'),('00283','Phường Vĩnh Tuy','007'),('00289','Phường Quỳnh Mai','007'),('00292','Phường Bạch Mai','007'),('00295','Phường Minh Khai','007'),('00298','Phường Trương Định','007'),('00301','Phường Thanh Trì','008'),('00304','Phường Vĩnh Hưng','008'),('00307','Phường Định Công','008'),('00310','Phường Mai Động','008'),('00313','Phường Tương Mai','008'),('00316','Phường Đại Kim','008'),('00319','Phường Tân Mai','008'),('00322','Phường Hoàng Văn Thụ','008'),('00325','Phường Giáp Bát','008'),('00328','Phường Lĩnh Nam','008'),('00331','Phường Thịnh Liệt','008'),('00334','Phường Trần Phú','008'),('00337','Phường Hoàng Liệt','008'),('00340','Phường Yên Sở','008'),('00343','Phường Nhân Chính','009'),('00346','Phường Thượng Đình','009'),('00349','Phường Khương Trung','009'),('00352','Phường Khương Mai','009'),('00355','Phường Thanh Xuân Trung','009'),('00358','Phường Phương Liệt','009'),('00364','Phường Khương Đình','009'),('00367','Phường Thanh Xuân Bắc','009'),('00373','Phường Hạ Đình','009'),('00376','Thị trấn Sóc Sơn','016'),('00379','Xã Bắc Sơn','016'),('00382','Xã Minh Trí','016'),('00385','Xã Hồng Kỳ','016'),('00388','Xã Nam Sơn','016'),('00391','Xã Trung Giã','016'),('00394','Xã Tân Hưng','016'),('00397','Xã Minh Phú','016'),('00400','Xã Phù Linh','016'),('00403','Xã Bắc Phú','016'),('00406','Xã Tân Minh','016'),('00409','Xã Quang Tiến','016'),('00412','Xã Hiền Ninh','016'),('00415','Xã Tân Dân','016'),('00418','Xã Tiên Dược','016'),('00421','Xã Việt Long','016'),('00424','Xã Xuân Giang','016'),('00427','Xã Mai Đình','016'),('00430','Xã Đức Hoà','016'),('00433','Xã Thanh Xuân','016'),('00436','Xã Đông Xuân','016'),('00439','Xã Kim Lũ','016'),('00442','Xã Phú Cường','016'),('00445','Xã Phú Minh','016'),('00448','Xã Phù Lỗ','016'),('00451','Xã Xuân Thu','016'),('00454','Thị trấn Đông Anh','017'),('00457','Xã Xuân Nộn','017'),('00460','Xã Thuỵ Lâm','017'),('00463','Xã Bắc Hồng','017'),('00466','Xã Nguyên Khê','017'),('00469','Xã Nam Hồng','017'),('00472','Xã Tiên Dương','017'),('00475','Xã Vân Hà','017'),('00478','Xã Uy Nỗ','017'),('00481','Xã Vân Nội','017'),('00484','Xã Liên Hà','017'),('00487','Xã Việt Hùng','017'),('00490','Xã Kim Nỗ','017'),('00493','Xã Kim Chung','017'),('00496','Xã Dục Tú','017'),('00499','Xã Đại Mạch','017'),('00502','Xã Vĩnh Ngọc','017'),('00505','Xã Cổ Loa','017'),('00508','Xã Hải Bối','017'),('00511','Xã Xuân Canh','017'),('00514','Xã Võng La','017'),('00517','Xã Tàm Xá','017'),('00520','Xã Mai Lâm','017'),('00523','Xã Đông Hội','017'),('00526','Thị trấn Yên Viên','018'),('00529','Xã Yên Thường','018'),('00532','Xã Yên Viên','018'),('00535','Xã Ninh Hiệp','018'),('00541','Xã Thiên Đức','018'),('00544','Xã Phù Đổng','018'),('00550','Xã Lệ Chi','018'),('00553','Xã Cổ Bi','018'),('00556','Xã Đặng Xá','018'),('00562','Xã Phú Sơn','018'),('00565','Thị trấn Trâu Quỳ','018'),('00568','Xã Dương Quang','018'),('00571','Xã Dương Xá','018'),('00577','Xã Đa Tốn','018'),('00580','Xã Kiêu Kỵ','018'),('00583','Xã Bát Tràng','018'),('00589','Xã Kim Đức','018'),('00592','Phường Cầu Diễn','019'),('00595','Phường Thượng Cát','021'),('00598','Phường Liên Mạc','021'),('00601','Phường Đông Ngạc','021'),('00602','Phường Đức Thắng','021'),('00604','Phường Thụy Phương','021'),('00607','Phường Tây Tựu','021'),('00610','Phường Xuân Đỉnh','021'),('00611','Phường Xuân Tảo','021'),('00613','Phường Minh Khai','021'),('00616','Phường Cổ Nhuế 1','021'),('00617','Phường Cổ Nhuế 2','021'),('00619','Phường Phú Diễn','021'),('00620','Phường Phúc Diễn','021'),('00622','Phường Xuân Phương','019'),('00623','Phường Phương Canh','019'),('00625','Phường Mỹ Đình 1','019'),('00626','Phường Mỹ Đình 2','019'),('00628','Phường Tây Mỗ','019'),('00631','Phường Mễ Trì','019'),('00632','Phường Phú Đô','019'),('00634','Phường Đại Mỗ','019'),('00637','Phường Trung Văn','019'),('00640','Thị trấn Văn Điển','020'),('00643','Xã Tân Triều','020'),('00646','Xã Thanh Liệt','020'),('00649','Xã Tả Thanh Oai','020'),('00652','Xã Hữu Hoà','020'),('00655','Xã Tam Hiệp','020'),('00658','Xã Tứ Hiệp','020'),('00661','Xã Yên Mỹ','020'),('00664','Xã Vĩnh Quỳnh','020'),('00667','Xã Ngũ Hiệp','020'),('00670','Xã Duyên Hà','020'),('00673','Xã Ngọc Hồi','020'),('00676','Xã Vạn Phúc','020'),('00679','Xã Đại áng','020'),('00682','Xã Liên Ninh','020'),('00685','Xã Đông Mỹ','020'),('04927','Xã Yên Trung','276'),('04930','Xã Yên Bình','276'),('04936','Xã Tiến Xuân','276'),('04939','Xã Đông Xuân','275'),('08973','Thị trấn Chi Đông','250'),('08974','Xã Đại Thịnh','250'),('08977','Xã Kim Hoa','250'),('08980','Xã Thạch Đà','250'),('08983','Xã Tiến Thắng','250'),('08986','Xã Tự Lập','250'),('08989','Thị trấn Quang Minh','250'),('08992','Xã Thanh Lâm','250'),('08995','Xã Tam Đồng','250'),('08998','Xã Liên Mạc','250'),('09004','Xã Chu Phan','250'),('09007','Xã Tiến Thịnh','250'),('09010','Xã Mê Linh','250'),('09013','Xã Văn Khê','250'),('09016','Xã Hoàng Kim','250'),('09019','Xã Tiền Phong','250'),('09022','Xã Tráng Việt','250'),('09538','Phường Quang Trung','268'),('09541','Phường Mộ Lao','268'),('09542','Phường Văn Quán','268'),('09544','Phường Vạn Phúc','268'),('09551','Phường La Khê','268'),('09552','Phường Phú La','268'),('09553','Phường Phúc La','268'),('09556','Phường Hà Cầu','268'),('09562','Phường Yên Nghĩa','268'),('09565','Phường Kiến Hưng','268'),('09568','Phường Phú Lãm','268'),('09571','Phường Phú Lương','268'),('09574','Phường Ngô Quyền','269'),('09577','Phường Phú Thịnh','269'),('09586','Phường Sơn Lộc','269'),('09589','Phường Xuân Khanh','269'),('09592','Xã Đường Lâm','269'),('09595','Phường Viên Sơn','269'),('09598','Xã Xuân Sơn','269'),('09601','Phường Trung Hưng','269'),('09604','Xã Thanh Mỹ','269'),('09607','Phường Trung Sơn Trầm','269'),('09610','Xã Kim Sơn','269'),('09613','Xã Sơn Đông','269'),('09616','Xã Cổ Đông','269'),('09619','Thị trấn Tây Đằng','271'),('09625','Xã Phú Cường','271'),('09628','Xã Cổ Đô','271'),('09634','Xã Vạn Thắng','271'),('09640','Xã Phong Vân','271'),('09643','Xã Phú Đông','271'),('09646','Xã Phú Hồng','271'),('09649','Xã Phú Châu','271'),('09652','Xã Thái Hòa','271'),('09655','Xã Đồng Thái','271'),('09658','Xã Phú Sơn','271'),('09661','Xã Minh Châu','271'),('09664','Xã Vật Lại','271'),('09667','Xã Chu Minh','271'),('09670','Xã Tòng Bạt','271'),('09673','Xã Cẩm Lĩnh','271'),('09676','Xã Sơn Đà','271'),('09679','Xã Đông Quang','271'),('09682','Xã Tiên Phong','271'),('09685','Xã Thụy An','271'),('09688','Xã Cam Thượng','271'),('09691','Xã Thuần Mỹ','271'),('09694','Xã Tản Lĩnh','271'),('09697','Xã Ba Trại','271'),('09700','Xã Minh Quang','271'),('09703','Xã Ba Vì','271'),('09706','Xã Vân Hòa','271'),('09709','Xã Yên Bài','271'),('09712','Xã Khánh Thượng','271'),('09715','Thị trấn Phúc Thọ','272'),('09721','Xã Vân Phúc','272'),('09724','Xã Nam Hà','272'),('09727','Xã Xuân Đình','272'),('09733','Xã Sen Phương','272'),('09739','Xã Võng Xuyên','272'),('09742','Xã Tích Lộc','272'),('09745','Xã Long Thượng','272'),('09751','Xã Hát Môn','272'),('09757','Xã Thanh Đa','272'),('09760','Xã Trạch Mỹ Lộc','272'),('09763','Xã Phúc Hòa','272'),('09766','Xã Ngọc Tảo','272'),('09769','Xã Phụng Thượng','272'),('09772','Xã Tam Thuấn','272'),('09775','Xã Tam Hiệp','272'),('09778','Xã Hiệp Thuận','272'),('09781','Xã Liên Hiệp','272'),('09784','Thị trấn Phùng','273'),('09787','Xã Trung Châu','273'),('09790','Xã Thọ An','273'),('09793','Xã Thọ Xuân','273'),('09796','Xã Hồng Hà','273'),('09799','Xã Liên Hồng','273'),('09802','Xã Liên Hà','273'),('09805','Xã Hạ Mỗ','273'),('09808','Xã Liên Trung','273'),('09811','Xã Phương Đình','273'),('09814','Xã Thượng Mỗ','273'),('09817','Xã Tân Hội','273'),('09820','Xã Tân Lập','273'),('09823','Xã Đan Phượng','273'),('09826','Xã Đồng Tháp','273'),('09829','Xã Song Phượng','273'),('09832','Thị trấn Trạm Trôi','274'),('09835','Xã Đức Thượng','274'),('09838','Xã Minh Khai','274'),('09841','Xã Dương Liễu','274'),('09844','Xã Di Trạch','274'),('09847','Xã Đức Giang','274'),('09850','Xã Cát Quế','274'),('09853','Xã Kim Chung','274'),('09856','Xã Yên Sở','274'),('09859','Xã Sơn Đồng','274'),('09862','Xã Vân Canh','274'),('09865','Xã Đắc Sở','274'),('09868','Xã Lại Yên','274'),('09871','Xã Tiền Yên','274'),('09874','Xã Song Phương','274'),('09877','Xã An Khánh','274'),('09880','Xã An Thượng','274'),('09883','Xã Vân Côn','274'),('09886','Phường Dương Nội','268'),('09889','Xã La Phù','274'),('09892','Xã Đông La','274'),('09895','Thị trấn Quốc Oai','275'),('09898','Xã Sài Sơn','275'),('09904','Xã Phượng Sơn','275'),('09907','Xã Ngọc Liệp','275'),('09910','Xã Ngọc Mỹ','275'),('09916','Xã Thạch Thán','275'),('09919','Xã Đồng Quang','275'),('09922','Xã Phú Cát','275'),('09925','Xã Tuyết Nghĩa','275'),('09928','Xã Liệp Nghĩa','275'),('09931','Xã Cộng Hòa','275'),('09934','Xã Hưng Đạo','275'),('09940','Xã Phú Mãn','275'),('09943','Xã Cấn Hữu','275'),('09949','Xã Hòa Thạch','275'),('09952','Xã Đông Yên','275'),('09955','Thị trấn Liên Quan','276'),('09958','Xã Đại Đồng','276'),('09961','Xã Cẩm Yên','276'),('09964','Xã Lại Thượng','276'),('09967','Xã Phú Kim','276'),('09970','Xã Hương Ngải','276'),('09973','Xã Lam Sơn','276'),('09976','Xã Kim Quan','276'),('09982','Xã Bình Yên','276'),('09988','Xã Thạch Hoà','276'),('09991','Xã Cần Kiệm','276'),('09997','Xã Phùng Xá','276'),('10000','Xã Tân Xã','276'),('10003','Xã Thạch Xá','276'),('10006','Xã Quang Trung','276'),('10009','Xã Hạ Bằng','276'),('10012','Xã Đồng Trúc','276'),('10015','Thị trấn Chúc Sơn','277'),('10018','Thị trấn Xuân Mai','277'),('10021','Xã Phụng Châu','277'),('10024','Xã Tiên Phương','277'),('10027','Xã Đông Sơn','277'),('10030','Xã Đông Phương Yên','277'),('10033','Xã Phú Nghĩa','277'),('10039','Xã Trường Yên','277'),('10042','Xã Ngọc Hòa','277'),('10045','Xã Thủy Xuân Tiên','277'),('10048','Xã Thanh Bình','277'),('10051','Xã Trung Hòa','277'),('10054','Xã Đại Yên','277'),('10057','Xã Thụy Hương','277'),('10060','Xã Tốt Động','277'),('10063','Xã Lam Điền','277'),('10066','Xã Tân Tiến','277'),('10069','Xã Nam Phương Tiến','277'),('10072','Xã Hợp Đồng','277'),('10075','Xã Hoàng Văn Thụ','277'),('10078','Xã Hoàng Diệu','277'),('10081','Xã Hữu Văn','277'),('10084','Xã Quảng Bị','277'),('10087','Xã Mỹ Lương','277'),('10090','Xã Thượng Vực','277'),('10096','Xã Hồng Phú','277'),('10099','Xã Trần Phú','277'),('10102','Xã Văn Võ','277'),('10105','Xã Đồng Lạc','277'),('10108','Xã Hòa Phú','277'),('10114','Thị trấn Kim Bài','278'),('10117','Phường Đồng Mai','268'),('10120','Xã Cự Khê','278'),('10123','Phường Biên Giang','268'),('10126','Xã Bích Hòa','278'),('10129','Xã Mỹ Hưng','278'),('10132','Xã Cao Viên','278'),('10135','Xã Bình Minh','278'),('10138','Xã Tam Hưng','278'),('10141','Xã Thanh Cao','278'),('10144','Xã Thanh Thùy','278'),('10147','Xã Thanh Mai','278'),('10150','Xã Thanh Văn','278'),('10153','Xã Đỗ Động','278'),('10156','Xã Kim An','278'),('10159','Xã Kim Thư','278'),('10162','Xã Phương Trung','278'),('10165','Xã Tân Ước','278'),('10168','Xã Dân Hòa','278'),('10171','Xã Liên Châu','278'),('10174','Xã Cao Xuân Dương','278'),('10180','Xã Hồng Dương','278'),('10183','Thị trấn Thường Tín','279'),('10186','Xã Ninh Sở','279'),('10189','Xã Nhị Khê','279'),('10192','Xã Duyên Thái','279'),('10195','Xã Khánh Hà','279'),('10198','Xã Hòa Bình','279'),('10201','Xã Văn Bình','279'),('10204','Xã Hiền Giang','279'),('10207','Xã Hồng Vân','279'),('10210','Xã Vân Tảo','279'),('10213','Xã Liên Phương','279'),('10216','Xã Văn Phú','279'),('10219','Xã Tự Nhiên','279'),('10222','Xã Tiền Phong','279'),('10225','Xã Hà Hồi','279'),('10231','Xã Nguyễn Trãi','279'),('10234','Xã Quất Động','279'),('10237','Xã Chương Dương','279'),('10240','Xã Tân Minh','279'),('10243','Xã Lê Lợi','279'),('10246','Xã Thắng Lợi','279'),('10249','Xã Dũng Tiến','279'),('10255','Xã Nghiêm Xuyên','279'),('10258','Xã Tô Hiệu','279'),('10261','Xã Văn Tự','279'),('10264','Xã Vạn Nhất','279'),('10267','Xã Minh Cường','279'),('10270','Thị trấn Phú Minh','280'),('10273','Thị trấn Phú Xuyên','280'),('10276','Xã Hồng Minh','280'),('10279','Xã Phượng Dực','280'),('10282','Xã Nam Tiến','280'),('10291','Xã Văn Hoàng','280'),('10294','Xã Phú Túc','280'),('10300','Xã Hồng Thái','280'),('10303','Xã Hoàng Long','280'),('10312','Xã Nam Phong','280'),('10315','Xã Tân Dân','280'),('10318','Xã Quang Hà','280'),('10321','Xã Chuyên Mỹ','280'),('10324','Xã Khai Thái','280'),('10327','Xã Phúc Tiến','280'),('10330','Xã Vân Từ','280'),('10333','Xã Tri Thủy','280'),('10336','Xã Đại Xuyên','280'),('10339','Xã Phú Yên','280'),('10342','Xã Bạch Hạ','280'),('10345','Xã Quang Lãng','280'),('10348','Xã Châu Can','280'),('10351','Xã Minh Tân','280'),('10354','Thị trấn Vân Đình','281'),('10363','Xã Hoa Viên','281'),('10366','Xã Quảng Phú Cầu','281'),('10369','Xã Trường Thịnh','281'),('10375','Xã Liên Bạt','281'),('10378','Xã Cao Sơn Tiến','281'),('10384','Xã Phương Tú','281'),('10387','Xã Trung Tú','281'),('10390','Xã Đồng Tân','281'),('10393','Xã Tảo Dương Văn','281'),('10396','Xã Thái Hòa','281'),('10399','Xã Minh Đức','281'),('10402','Xã Trầm Lộng','281'),('10411','Xã Kim Đường','281'),('10417','Xã Hòa Phú','281'),('10423','Xã Đại Hùng','281'),('10426','Xã Đông Lỗ','281'),('10429','Xã Phù Lưu','281'),('10432','Xã Đại Cường','281'),('10435','Xã Bình Lưu Quang','281'),('10441','Thị trấn Đại Nghĩa','282'),('10444','Xã Đồng Tâm','282'),('10447','Xã Thượng Lâm','282'),('10450','Xã Tuy Lai','282'),('10453','Xã Phúc Lâm','282'),('10459','Xã Mỹ Xuyên','282'),('10462','Xã An Mỹ','282'),('10465','Xã Hồng Sơn','282'),('10468','Xã Lê Thanh','282'),('10471','Xã Xuy Xá','282'),('10474','Xã Phùng Xá','282'),('10477','Xã Phù Lưu Tế','282'),('10480','Xã Đại Hưng','282'),('10483','Xã Vạn Tín','282'),('10489','Xã Hương Sơn','282'),('10492','Xã Hùng Tiến','282'),('10495','Xã An Tiến','282'),('10498','Xã Hợp Tiến','282'),('10501','Xã Hợp Thanh','282'),('10504','Xã An Phú','282'),('20194','Phường Hòa Hiệp Bắc','490'),('20195','Phường Hòa Hiệp Nam','490'),('20197','Phường Hòa Khánh Bắc','490'),('20198','Phường Hòa Khánh Nam','490'),('20200','Phường Hòa Minh','490'),('20206','Phường Thanh Khê Tây','491'),('20207','Phường Thanh Khê Đông','491'),('20209','Phường Xuân Hà','491'),('20215','Phường Chính Gián','491'),('20218','Phường Thạc Gián','491'),('20224','Phường An Khê','491'),('20227','Phường Thanh Bình','492'),('20230','Phường Thuận Phước','492'),('20233','Phường Thạch Thang','492'),('20236','Phường Hải Châu','492'),('20242','Phường Phước Ninh','492'),('20245','Phường Hòa Thuận Tây','492'),('20254','Phường Bình Thuận','492'),('20257','Phường Hòa Cường Bắc','492'),('20258','Phường Hòa Cường Nam','492'),('20260','Phường Khuê Trung','495'),('20263','Phường Thọ Quang','493'),('20266','Phường Nại Hiên Đông','493'),('20269','Phường Mân Thái','493'),('20272','Phường An Hải Bắc','493'),('20275','Phường Phước Mỹ','493'),('20278','Phường An Hải Nam','493'),('20284','Phường Mỹ An','494'),('20285','Phường Khuê Mỹ','494'),('20287','Phường Hoà Quý','494'),('20290','Phường Hoà Hải','494'),('20293','Xã Hòa Bắc','497'),('20296','Xã Hòa Liên','497'),('20299','Xã Hòa Ninh','497'),('20302','Xã Hòa Sơn','497'),('20305','Phường Hòa Phát','495'),('20306','Phường Hòa An','495'),('20308','Xã Hòa Nhơn','497'),('20311','Phường Hòa Thọ Tây','495'),('20312','Phường Hòa Thọ Đông','495'),('20314','Phường Hòa Xuân','495'),('20317','Xã Hòa Phú','497'),('20320','Xã Hòa Phong','497'),('20323','Xã Hòa Châu','497'),('20326','Xã Hòa Tiến','497'),('20329','Xã Hòa Phước','497'),('20332','Xã Hòa Khương','497'),('26734','Phường Tân Định','760'),('26737','Phường Đa Kao','760'),('26740','Phường Bến Nghé','760'),('26743','Phường Bến Thành','760'),('26746','Phường Nguyễn Thái Bình','760'),('26749','Phường Phạm Ngũ Lão','760'),('26752','Phường Cầu Ông Lãnh','760'),('26755','Phường Cô Giang','760'),('26758','Phường Nguyễn Cư Trinh','760'),('26761','Phường Cầu Kho','760'),('26764','Phường Thạnh Xuân','761'),('26767','Phường Thạnh Lộc','761'),('26770','Phường Hiệp Thành','761'),('26773','Phường Thới An','761'),('26776','Phường Tân Chánh Hiệp','761'),('26779','Phường An Phú Đông','761'),('26782','Phường Tân Thới Hiệp','761'),('26785','Phường Trung Mỹ Tây','761'),('26787','Phường Tân Hưng Thuận','761'),('26788','Phường Đông Hưng Thuận','761'),('26791','Phường Tân Thới Nhất','761'),('26794','Phường Linh Xuân','769'),('26797','Phường Bình Chiểu','769'),('26800','Phường Linh Trung','769'),('26803','Phường Tam Bình','769'),('26806','Phường Tam Phú','769'),('26809','Phường Hiệp Bình Phước','769'),('26812','Phường Hiệp Bình Chánh','769'),('26815','Phường Linh Chiểu','769'),('26818','Phường Linh Tây','769'),('26821','Phường Linh Đông','769'),('26824','Phường Bình Thọ','769'),('26827','Phường Trường Thọ','769'),('26830','Phường Long Bình','769'),('26833','Phường Long Thạnh Mỹ','769'),('26836','Phường Tân Phú','769'),('26839','Phường Hiệp Phú','769'),('26842','Phường Tăng Nhơn Phú A','769'),('26845','Phường Tăng Nhơn Phú B','769'),('26848','Phường Phước Long B','769'),('26851','Phường Phước Long A','769'),('26854','Phường Trường Thạnh','769'),('26857','Phường Long Phước','769'),('26860','Phường Long Trường','769'),('26863','Phường Phước Bình','769'),('26866','Phường Phú Hữu','769'),('26872','Phường 15','764'),('26875','Phường 17','764'),('26876','Phường 6','764'),('26878','Phường 16','764'),('26881','Phường 12','764'),('26882','Phường 14','764'),('26884','Phường 10','764'),('26887','Phường 5','764'),('26890','Phường 1','764'),('26898','Phường 8','764'),('26899','Phường 11','764'),('26902','Phường 3','764'),('26905','Phường 13','765'),('26908','Phường 11','765'),('26911','Phường 27','765'),('26914','Phường 26','765'),('26917','Phường 12','765'),('26920','Phường 25','765'),('26923','Phường 5','765'),('26926','Phường 7','765'),('26929','Phường 14','765'),('26941','Phường 2','765'),('26944','Phường 1','765'),('26950','Phường 17','765'),('26953','Phường 19','765'),('26956','Phường 22','765'),('26962','Phường 28','765'),('26965','Phường 2','766'),('26968','Phường 4','766'),('26971','Phường 12','766'),('26974','Phường 13','766'),('26977','Phường 1','766'),('26980','Phường 3','766'),('26983','Phường 11','766'),('26986','Phường 7','766'),('26989','Phường 5','766'),('26992','Phường 10','766'),('26995','Phường 6','766'),('26998','Phường 8','766'),('27001','Phường 9','766'),('27004','Phường 14','766'),('27007','Phường 15','766'),('27010','Phường Tân Sơn Nhì','767'),('27013','Phường Tây Thạnh','767'),('27016','Phường Sơn Kỳ','767'),('27019','Phường Tân Quý','767'),('27022','Phường Tân Thành','767'),('27025','Phường Phú Thọ Hòa','767'),('27028','Phường Phú Thạnh','767'),('27031','Phường Phú Trung','767'),('27034','Phường Hòa Thạnh','767'),('27037','Phường Hiệp Tân','767'),('27040','Phường Tân Thới Hòa','767'),('27043','Phường 4','768'),('27046','Phường 5','768'),('27049','Phường 9','768'),('27052','Phường 7','768'),('27058','Phường 1','768'),('27061','Phường 2','768'),('27064','Phường 8','768'),('27070','Phường 10','768'),('27073','Phường 11','768'),('27076','Phường 15','768'),('27085','Phường 13','768'),('27088','Phường Thảo Điền','769'),('27091','Phường An Phú','769'),('27094','Phường An Khánh','769'),('27097','Phường Bình Trưng Đông','769'),('27100','Phường Bình Trưng Tây','769'),('27109','Phường Cát Lái','769'),('27112','Phường Thạnh Mỹ Lợi','769'),('27115','Phường An Lợi Đông','769'),('27118','Phường Thủ Thiêm','769'),('27127','Phường 14','770'),('27130','Phường 12','770'),('27133','Phường 11','770'),('27139','Phường Võ Thị Sáu','770'),('27142','Phường 9','770'),('27148','Phường 4','770'),('27151','Phường 5','770'),('27154','Phường 3','770'),('27157','Phường 2','770'),('27160','Phường 1','770'),('27163','Phường 15','771'),('27166','Phường 13','771'),('27169','Phường 14','771'),('27172','Phường 12','771'),('27178','Phường 10','771'),('27181','Phường 9','771'),('27184','Phường 1','771'),('27187','Phường 8','771'),('27190','Phường 2','771'),('27193','Phường 4','771'),('27202','Phường 6','771'),('27208','Phường 15','772'),('27211','Phường 5','772'),('27214','Phường 14','772'),('27220','Phường 3','772'),('27226','Phường 11','772'),('27229','Phường 8','772'),('27232','Phường 10','772'),('27238','Phường 7','772'),('27247','Phường 1','772'),('27253','Phường 16','772'),('27259','Phường 13','773'),('27265','Phường 9','773'),('27271','Phường 8','773'),('27277','Phường 18','773'),('27283','Phường 4','773'),('27286','Phường 3','773'),('27289','Phường 16','773'),('27292','Phường 2','773'),('27295','Phường 15','773'),('27298','Phường 1','773'),('27301','Phường 4','774'),('27304','Phường 9','774'),('27307','Phường 2','774'),('27310','Phường 12','774'),('27316','Phường 7','774'),('27325','Phường 1','774'),('27328','Phường 11','774'),('27331','Phường 14','774'),('27334','Phường 5','774'),('27343','Phường 13','774'),('27346','Phường 14','775'),('27349','Phường 13','775'),('27352','Phường 9','775'),('27358','Phường 12','775'),('27364','Phường 11','775'),('27367','Phường 2','775'),('27373','Phường 1','775'),('27376','Phường 8','775'),('27382','Phường 7','775'),('27385','Phường 10','775'),('27397','Phường Rạch Ông','776'),('27403','Phường Hưng Phú','776'),('27409','Phường 4','776'),('27415','Phường Xóm Củi','776'),('27418','Phường 5','776'),('27421','Phường 14','776'),('27424','Phường 6','776'),('27427','Phường 15','776'),('27430','Phường 16','776'),('27433','Phường 7','776'),('27436','Phường Bình Hưng Hòa','777'),('27439','Phường Bình Hưng Hoà A','777'),('27442','Phường Bình Hưng Hoà B','777'),('27445','Phường Bình Trị Đông','777'),('27448','Phường Bình Trị Đông A','777'),('27451','Phường Bình Trị Đông B','777'),('27454','Phường Tân Tạo','777'),('27457','Phường Tân Tạo A','777'),('27460','Phường An Lạc','777'),('27463','Phường An Lạc A','777'),('27466','Phường Tân Thuận Đông','778'),('27469','Phường Tân Thuận Tây','778'),('27472','Phường Tân Kiểng','778'),('27475','Phường Tân Hưng','778'),('27478','Phường Bình Thuận','778'),('27481','Phường Tân Quy','778'),('27484','Phường Phú Thuận','778'),('27487','Phường Tân Phú','778'),('27490','Phường Tân Phong','778'),('27493','Phường Phú Mỹ','778'),('27496','Thị trấn Củ Chi','783'),('27499','Xã Phú Mỹ Hưng','783'),('27502','Xã An Phú','783'),('27505','Xã Trung Lập Thượng','783'),('27508','Xã An Nhơn Tây','783'),('27511','Xã Nhuận Đức','783'),('27514','Xã Phạm Văn Cội','783'),('27517','Xã Phú Hòa Đông','783'),('27520','Xã Trung Lập Hạ','783'),('27523','Xã Trung An','783'),('27526','Xã Phước Thạnh','783'),('27529','Xã Phước Hiệp','783'),('27532','Xã Tân An Hội','783'),('27535','Xã Phước Vĩnh An','783'),('27538','Xã Thái Mỹ','783'),('27541','Xã Tân Thạnh Tây','783'),('27544','Xã Hòa Phú','783'),('27547','Xã Tân Thạnh Đông','783'),('27550','Xã Bình Mỹ','783'),('27553','Xã Tân Phú Trung','783'),('27556','Xã Tân Thông Hội','783'),('27559','Thị trấn Hóc Môn','784'),('27562','Xã Tân Hiệp','784'),('27565','Xã Nhị Bình','784'),('27568','Xã Đông Thạnh','784'),('27571','Xã Tân Thới Nhì','784'),('27574','Xã Thới Tam Thôn','784'),('27577','Xã Xuân Thới Sơn','784'),('27580','Xã Tân Xuân','784'),('27583','Xã Xuân Thới Đông','784'),('27586','Xã Trung Chánh','784'),('27589','Xã Xuân Thới Thượng','784'),('27592','Xã Bà Điểm','784'),('27595','Thị trấn Tân Túc','785'),('27598','Xã Phạm Văn Hai','785'),('27601','Xã Vĩnh Lộc A','785'),('27604','Xã Vĩnh Lộc B','785'),('27607','Xã Bình Lợi','785'),('27610','Xã Lê Minh Xuân','785'),('27613','Xã Tân Nhựt','785'),('27616','Xã Tân Kiên','785'),('27619','Xã Bình Hưng','785'),('27622','Xã Phong Phú','785'),('27625','Xã An Phú Tây','785'),('27628','Xã Hưng Long','785'),('27631','Xã Đa Phước','785'),('27634','Xã Tân Quý Tây','785'),('27637','Xã Bình Chánh','785'),('27640','Xã Quy Đức','785'),('27643','Thị trấn Nhà Bè','786'),('27646','Xã Phước Kiển','786'),('27649','Xã Phước Lộc','786'),('27652','Xã Nhơn Đức','786'),('27655','Xã Phú Xuân','786'),('27658','Xã Long Thới','786'),('27661','Xã Hiệp Phước','786'),('27664','Thị trấn Cần Thạnh','787'),('27667','Xã Bình Khánh','787'),('27670','Xã Tam Thôn Hiệp','787'),('27673','Xã An Thới Đông','787'),('27676','Xã Thạnh An','787'),('27679','Xã Long Hòa','787'),('27682','Xã Lý Nhơn','787');
/*!40000 ALTER TABLE `ward` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'tutorlink'
--

--
-- Dumping routines for database 'tutorlink'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-24  6:26:17
