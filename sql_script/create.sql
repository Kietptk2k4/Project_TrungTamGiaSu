SET default_storage_engine=InnoDB;
SET NAMES utf8mb4;

DROP DATABASE IF EXISTS TutorLink;
CREATE DATABASE TutorLink;
USE TutorLink;

CREATE TABLE `Role` (
  `role_id` INT PRIMARY KEY AUTO_INCREMENT,
  `role_name` VARCHAR(100) UNIQUE NOT NULL 
);

CREATE TABLE `Permission` (
  `permission_id` INT PRIMARY KEY AUTO_INCREMENT,
  `permission_name` VARCHAR(100) UNIQUE NOT NULL,
  `description` VARCHAR(255)
);

CREATE TABLE `Role_Permission` (
  `role_id` INT,
  `permission_id` INT,
  PRIMARY KEY (`role_id`, `permission_id`),
  FOREIGN KEY (`role_id`) REFERENCES `Role` (`role_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`permission_id`) REFERENCES `Permission` (`permission_id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `Account` (
  `user_id` INT PRIMARY KEY AUTO_INCREMENT,
  `username` VARCHAR(100) UNIQUE NOT NULL,
  `email` VARCHAR(255) UNIQUE NOT NULL,
  `hashed_password` VARCHAR(255) NOT NULL,
  `unread_notifications` INT DEFAULT 0,
  `role_id` INT,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `is_active` BOOLEAN DEFAULT TRUE,
  FOREIGN KEY (`role_id`) REFERENCES `Role` (`role_id`) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE `Notification` (
  `notification_id` INT PRIMARY KEY AUTO_INCREMENT,
  `content` TEXT,
  `user_id` INT NOT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `is_read` BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (`user_id`) REFERENCES `Account` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `Admin` (
  `admin_id` INT PRIMARY KEY AUTO_INCREMENT,
  `user_id` INT UNIQUE NOT NULL,
  `name` VARCHAR(255),
  `gender` ENUM("MALE", "FEMALE"),
  `phone_number` VARCHAR(20) UNIQUE,
  FOREIGN KEY (`user_id`) REFERENCES `Account` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `Customer` (
  `customer_id` INT PRIMARY KEY AUTO_INCREMENT,
  `user_id` INT UNIQUE NOT NULL,
  `name` VARCHAR(255),
  `gender` ENUM("MALE", "FEMALE"),
  `address` TEXT,
  `phone_number` VARCHAR(20) UNIQUE,
  FOREIGN KEY (`user_id`) REFERENCES `Account` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `Tutor` (
  `tutor_id` INT PRIMARY KEY AUTO_INCREMENT,
  `user_id` INT UNIQUE NOT NULL,
  `name` VARCHAR(255),
  `gender` ENUM("MALE", "FEMALE"),
  `introduction` TEXT,
  `avg_rating` DECIMAL(10,2) DEFAULT 0,
  `completed_courses` INT DEFAULT 0,
  `feedback_course_count` INT DEFAULT 0,
  `phone_number` VARCHAR(20) UNIQUE,
  `is_approved` BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (`user_id`) REFERENCES `Account` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `Tutor_Certificate` (
  `certificate_id` INT PRIMARY KEY AUTO_INCREMENT,
  `tutor_id` INT,
  `certificate_name` VARCHAR(255),
  `issue_date` DATETIME,
  `issuing_authority` VARCHAR(255),
  FOREIGN KEY (`tutor_id`) REFERENCES `Tutor` (`tutor_id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `Subject` (
  `subject_id` INT PRIMARY KEY AUTO_INCREMENT,
  `subject_name` VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE `Class` (
  `class_id` INT PRIMARY KEY AUTO_INCREMENT,
  `class_name` VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE `Subject_Class_Mapping` (
  `subject_class_id` INT PRIMARY KEY AUTO_INCREMENT,
  `subject_id` INT,
  `class_id` INT,
  UNIQUE (`subject_id`, `class_id`),
  FOREIGN KEY (`subject_id`) REFERENCES `Subject` (`subject_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`class_id`) REFERENCES `Class` (`class_id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `Tutor_Subject_Class` (
  `tutor_id` INT,
  `subject_class_id` INT,
  PRIMARY KEY (`tutor_id`, `subject_class_id`),
  FOREIGN KEY (`tutor_id`) REFERENCES `Tutor` (`tutor_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`subject_class_id`) REFERENCES `Subject_Class_Mapping` (`subject_class_id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `Province` (
  `province_id` VARCHAR(20) PRIMARY KEY,
  `name` VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE `District` (
  `district_id` VARCHAR(20) PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `province_id` VARCHAR(20),
  FOREIGN KEY (`province_id`) REFERENCES `Province` (`province_id`) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE `Ward` (
  `ward_id` VARCHAR(20) PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `district_id` VARCHAR(20),
  FOREIGN KEY (`district_id`) REFERENCES `District` (`district_id`) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE `Tutoring_Request` (
  `request_id` INT PRIMARY KEY AUTO_INCREMENT,
  `customer_id` INT NOT NULL,
  `tutor_id` INT,
  `subject_class_id` INT,
  `sessions_per_week` INT,
  `ward_id` VARCHAR(20) NOT NULL,
  `address_detail` VARCHAR(255),
  `proposed_fee_per_session` DECIMAL(15, 2),
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `expired_at` DATETIME,
  `status` ENUM("Pending", "Approved", "Rejected", "Assigned", "Cancelled") DEFAULT "Pending",
  FOREIGN KEY (`customer_id`) REFERENCES `Customer` (`customer_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`tutor_id`) REFERENCES `Tutor` (`tutor_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  FOREIGN KEY (`subject_class_id`) REFERENCES `Subject_Class_Mapping` (`subject_class_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (`ward_id`) REFERENCES `Ward` (`ward_id`) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE `Request_Schedule` (
  `schedule_id` INT PRIMARY KEY AUTO_INCREMENT,
  `request_id` INT,
  `day_of_week` INT CHECK(`day_of_week` >= 1 AND `day_of_week` <= 7),
  `start_time` TIME,
  `end_time` TIME,
  FOREIGN KEY (`request_id`) REFERENCES `Tutoring_Request` (`request_id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `Course` (
  `course_id` INT PRIMARY KEY AUTO_INCREMENT,
  `request_id` INT UNIQUE NOT NULL,
  `start_date` DATE,
  `end_date` DATE,
  `status` ENUM("In Progress", "Completed", "Cancelled") DEFAULT "In Progress",
  `sessions_per_week` INT,
  FOREIGN KEY (`request_id`) REFERENCES `Tutoring_Request` (`request_id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `Course_Schedule` (
  `course_id` INT,
  `schedule_id` INT PRIMARY KEY AUTO_INCREMENT,
  `day_of_week` INT CHECK(`day_of_week` >= 1 AND `day_of_week` <= 7),
  `start_time` TIME,
  `end_time` TIME,
  FOREIGN KEY (`course_id`) REFERENCES `Course` (`course_id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `Cancellation_Request` (
  `cancellation_request_id` INT PRIMARY KEY AUTO_INCREMENT,
  `course_id` INT NOT NULL,
  `requester_type` ENUM("Tutor", "Customer"),
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `reason` TEXT,
  FOREIGN KEY (`course_id`) REFERENCES `Course` (`course_id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `Cancellation_Response` (
  `cancellation_response_id` INT PRIMARY KEY AUTO_INCREMENT,
  `cancellation_request_id` INT UNIQUE NOT NULL,
  `admin_id` INT,
  `is_approved` BOOLEAN,
  `reason` TEXT,
  `refund_deposit` DECIMAL(15, 2) DEFAULT 0,
  `refund_tuition` DECIMAL(15, 2) DEFAULT 0,
  `created_at` DATETIME,
  FOREIGN KEY (`admin_id`) REFERENCES `Admin` (`admin_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  FOREIGN KEY (`cancellation_request_id`) REFERENCES `Cancellation_Request` (`cancellation_request_id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `Payment` (
  `payment_id` INT PRIMARY KEY AUTO_INCREMENT,
  `course_id` INT NOT NULL,
  `customer_id` INT NOT NULL,
  `amount` DECIMAL(15, 2) NOT NULL,
  `payment_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `payment_method` VARCHAR(50),
  `transaction_code` VARCHAR(100),
  `payment_status` VARCHAR(30) DEFAULT 'Completed',
  `processed_by_user_id` INT,
  `description` TEXT,
  `notes` TEXT,
  FOREIGN KEY (`course_id`) REFERENCES `Course` (`course_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (`customer_id`) REFERENCES `Customer` (`customer_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (`processed_by_user_id`) REFERENCES `Account` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE `Feedback` (
  `feedback_id` INT PRIMARY KEY AUTO_INCREMENT,
  `course_id` INT NOT NULL,
  `rating` INT,
  `content` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`course_id`) REFERENCES `Course` (`course_id`) ON DELETE CASCADE ON UPDATE CASCADE
);