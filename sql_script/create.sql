SET default_storage_engine=InnoDB;
SET NAMES utf8mb4;

DROP DATABASE IF EXISTS TutorLink;
CREATE DATABASE TutorLink;
USE TutorLink;

CREATE TABLE `Role` (
  `role_id` INT PRIMARY KEY,
  `role_name` VARCHAR(100)
);

CREATE TABLE `Permission` (
  `permission_id` INT PRIMARY KEY,
  `permission_name` VARCHAR(100) UNIQUE NOT NULL,
  `description` VARCHAR(255)
);

CREATE TABLE `Account` (
  `user_id` INT PRIMARY KEY AUTO_INCREMENT,
  `username` VARCHAR(100) UNIQUE NOT NULL,
  `email` VARCHAR(255) UNIQUE NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `role_id` INT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `is_active` BOOLEAN DEFAULT TRUE,
  FOREIGN KEY (`role_id`) REFERENCES `Role` (`role_id`) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE `Customer` (
  `customer_id` INT PRIMARY KEY AUTO_INCREMENT,
  `user_id` INT UNIQUE NOT NULL,
  `name` VARCHAR(255),
  `gender` VARCHAR(20),
  `address` TEXT,
  `phone_number` VARCHAR(20),
  FOREIGN KEY (`user_id`) REFERENCES `Account` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `Tutor` (
  `tutor_id` INT PRIMARY KEY AUTO_INCREMENT,
  `user_id` INT UNIQUE NOT NULL,
  `name` VARCHAR(255),
  `gender` VARCHAR(20),
  `introduction` TEXT,
  `is_approved` BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (`user_id`) REFERENCES `Account` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `Admin` (
  `admin_id` INT PRIMARY KEY AUTO_INCREMENT,
  `user_id` INT UNIQUE NOT NULL,
  `name` VARCHAR(255),
  FOREIGN KEY (`user_id`) REFERENCES `Account` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `Province` (
  `province_id` VARCHAR(20) PRIMARY KEY,
  `name` VARCHAR(100) UNIQUE
);

CREATE TABLE `District` (
  `district_id` VARCHAR(20) PRIMARY KEY,
  `name` VARCHAR(100) UNIQUE,
  `province_id` VARCHAR(20),
  FOREIGN KEY (`province_id`) REFERENCES `Province` (`province_id`) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE `Ward` (
  `ward_id` VARCHAR(20) PRIMARY KEY,
  `name` VARCHAR(100),
  `district_id` VARCHAR(20),
  FOREIGN KEY (`district_id`) REFERENCES `District` (`district_id`) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE `Subject` (
  `subject_id` INT PRIMARY KEY AUTO_INCREMENT,
  `subject_name` VARCHAR(100) UNIQUE
);

CREATE TABLE `Class` (
  `class_id` INT PRIMARY KEY AUTO_INCREMENT,
  `class_name` VARCHAR(100) UNIQUE
);

CREATE TABLE `Subject_Class_Mapping` (
  `subject_id` INT,
  `class_id` INT,
  PRIMARY KEY (`subject_id`, `class_id`),
  FOREIGN KEY (`subject_id`) REFERENCES `Subject` (`subject_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`class_id`) REFERENCES `Class` (`class_id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `Tutor_Subject_Class` (
  `tutor_id` INT,
  `subject_id` INT,
  `class_id` INT,
  PRIMARY KEY (`tutor_id`, `subject_id`, `class_id`),
  FOREIGN KEY (`tutor_id`) REFERENCES `Tutor` (`tutor_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`subject_id`, `class_id`) REFERENCES `Subject_Class_Mapping` (`subject_id`, `class_id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `Tutor_Certificate` (
  `tutor_id` INT,
  `certificate_id` INT,
  `certificate_name` VARCHAR(255),
  `issue_date` DATE,
  `issuing_authority` VARCHAR(255),
  `note` TEXT,
  PRIMARY KEY (`tutor_id`, `certificate_id`),
  FOREIGN KEY (`tutor_id`) REFERENCES `Tutor` (`tutor_id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `TutoringRequest` (
  `request_id` INT PRIMARY KEY AUTO_INCREMENT,
  `customer_id` INT NOT NULL,
  `tutor_id` INT,
  `subject_id` INT NOT NULL,
  `class_id` INT NOT NULL,
  `number_of_sessions` INT,
  `teaching_days_preference` VARCHAR(255),
  `ward_id` VARCHAR(20) NOT NULL,
  `proposed_fee` VARCHAR(100),
  `is_assigned` BOOLEAN DEFAULT FALSE,
  `created_date` DATE,
  `status` ENUM("Pending", "Approved", "Rejected") DEFAULT "Pending",
  FOREIGN KEY (`customer_id`) REFERENCES `Customer` (`customer_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`tutor_id`) REFERENCES `Tutor` (`tutor_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  FOREIGN KEY (`subject_id`) REFERENCES `Subject` (`subject_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (`class_id`) REFERENCES `Class` (`class_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (`ward_id`) REFERENCES `Ward` (`ward_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  INDEX `idx_tutoringrequest_customer` (`customer_id`),
  INDEX `idx_tutoringrequest_tutor` (`tutor_id`),
  INDEX `idx_tutoringrequest_status` (`status`)
);

CREATE TABLE `Request_Schedule` (
  `request_id` INT,
  `schedule_item_id` INT,
  `day_of_week` VARCHAR(20),
  `start_time` TIME,
  `end_time` TIME,
  PRIMARY KEY (`request_id`, `schedule_item_id`),
  FOREIGN KEY (`request_id`) REFERENCES `TutoringRequest` (`request_id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `Course` (
  `course_id` INT PRIMARY KEY AUTO_INCREMENT,
  `request_id` INT UNIQUE NOT NULL,
  `start_date` DATE,
  `end_date` DATE,
  `status` ENUM("In Progress", "Completed", "Ended", "Cancelled"),
  `sessions_per_week` INT,
  FOREIGN KEY (`request_id`) REFERENCES `TutoringRequest` (`request_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  INDEX `idx_course_request` (`request_id`),
  INDEX `idx_course_status` (`status`)
);

CREATE TABLE `Course_Schedule` (
  `course_id` INT,
  `schedule_item_id` INT,
  `day_of_week` VARCHAR(20),
  `start_time` TIME,
  `end_time` TIME,
  PRIMARY KEY (`course_id`, `schedule_item_id`),
  FOREIGN KEY (`course_id`) REFERENCES `Course` (`course_id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `Feedback` (
  `feedback_id` INT PRIMARY KEY AUTO_INCREMENT,
  `course_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `rating` INT,
  `content` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`course_id`) REFERENCES `Course` (`course_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`user_id`) REFERENCES `Account` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  INDEX `idx_feedback_course` (`course_id`),
  INDEX `idx_feedback_user` (`user_id`)
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
  FOREIGN KEY (`processed_by_user_id`) REFERENCES `Account` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  INDEX `idx_payment_course` (`course_id`),
  INDEX `idx_payment_customer` (`customer_id`),
  INDEX `idx_payment_date` (`payment_date`)
);

CREATE TABLE `Cancellation_Request` (
  `cancellation_request_id` INT PRIMARY KEY AUTO_INCREMENT,
  `course_id` INT NOT NULL,
  `requester_type` ENUM("Tutor", "Customer"),
  `requested_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `reason` TEXT,
  FOREIGN KEY (`course_id`) REFERENCES `Course` (`course_id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `Cancellation_Response` (
  `cancellation_response_id` INT PRIMARY KEY AUTO_INCREMENT,
  `admin_id` INT,
  `cancellation_request_id` INT UNIQUE NOT NULL,
  `is_approved` BOOLEAN,
  `reason` TEXT,
  `refund_deposit` BOOLEAN DEFAULT FALSE,
  `refund_tuition` BOOLEAN DEFAULT FALSE,
  `response_date` DATE,
  FOREIGN KEY (`admin_id`) REFERENCES `Admin` (`admin_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  FOREIGN KEY (`cancellation_request_id`) REFERENCES `Cancellation_Request` (`cancellation_request_id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `Role_Permission` (
  `role_id` INT,
  `permission_id` INT,
  PRIMARY KEY (`role_id`, `permission_id`),
  FOREIGN KEY (`role_id`) REFERENCES `Role` (`role_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`permission_id`) REFERENCES `Permission` (`permission_id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `Notification` (
  `notification_id` INT PRIMARY KEY AUTO_INCREMENT,
  `content` TEXT,
  `user_id` INT NOT NULL,
  `notification_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `is_read` BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (`user_id`) REFERENCES `Account` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  INDEX `idx_notification_user` (`user_id`),
  INDEX `idx_notification_read_date` (`is_read`, `notification_date`)
);
