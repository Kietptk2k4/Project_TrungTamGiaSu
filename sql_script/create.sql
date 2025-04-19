SET default_storage_engine=InnoDB;
SET NAMES utf8mb4;

DROP DATABASE IF EXISTS TutorLink;
CREATE DATABASE TutorLink;
USE TutorLink;

CREATE TABLE `Roles` (
  `role_id` INT PRIMARY KEY AUTO_INCREMENT,
  `role_name` VARCHAR(100) UNIQUE NOT NULL 
);

CREATE TABLE `Permissions` (
  `permission_id` INT PRIMARY KEY AUTO_INCREMENT,
  `permission_name` VARCHAR(100) UNIQUE NOT NULL,
  `description` VARCHAR(255)
);

CREATE TABLE `RolePermissions` (
  `role_id` INT,
  `permission_id` INT,
  PRIMARY KEY (`role_id`, `permission_id`),
  FOREIGN KEY (`role_id`) REFERENCES `Roles` (`role_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`permission_id`) REFERENCES `Permissions` (`permission_id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `Accounts` (
  `user_id` INT PRIMARY KEY AUTO_INCREMENT,
  `email` VARCHAR(255) UNIQUE NOT NULL,
  `hashed_password` VARCHAR(255) NOT NULL,
  `otp` VARCHAR(255) DEFAULT NULL,
  `otp_expired_time` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `unread_notifications` INT DEFAULT 0,
  `role_id` INT,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `is_active` BOOLEAN DEFAULT TRUE,
  FOREIGN KEY (`role_id`) REFERENCES `Roles` (`role_id`) ON DELETE SET NULL ON UPDATE CASCADE
);

-- Trigger BEFORE INSERT
DELIMITER $$
CREATE TRIGGER trg_otp_expired_date_insert
BEFORE INSERT ON `Accounts`
FOR EACH ROW
BEGIN
  IF NEW.otp IS NOT NULL THEN
    SET NEW.otp_expired_time = NOW() + INTERVAL 5 MINUTE;
  END IF;
END$$
DELIMITER ;

-- Trigger BEFORE UPDATE
DELIMITER $$
CREATE TRIGGER trg_otp_expired_date_update
BEFORE UPDATE ON `Accounts`
FOR EACH ROW
BEGIN
  IF (NEW.otp IS NOT NULL AND (OLD.otp IS NULL OR OLD.otp <> NEW.otp)) THEN
    SET NEW.otp_expired_time = NOW() + INTERVAL 5 MINUTE;
  END IF;
END$$
DELIMITER ;

CREATE TABLE `Notifications` (
  `notification_id` INT PRIMARY KEY AUTO_INCREMENT,
  `content` TEXT,
  `user_id` INT NOT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `is_read` BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (`user_id`) REFERENCES `Accounts` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `PersonalInfos` (
  `user_id` INT PRIMARY KEY AUTO_INCREMENT ,
  `full_name` VARCHAR(255),
  `gender` ENUM("MALE", "FEMALE"),
  `phone_number` VARCHAR(20) UNIQUE,
  `address` TEXT,
  FOREIGN KEY (`user_id`) REFERENCES `Accounts` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `Admins` (
  `admin_id` INT PRIMARY KEY AUTO_INCREMENT,
  `user_id` INT UNIQUE NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `Accounts` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE `Customers` (
  `customer_id` INT PRIMARY KEY AUTO_INCREMENT,
  `user_id` INT UNIQUE NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `Accounts` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE `Tutors` (
  `tutor_id` INT PRIMARY KEY AUTO_INCREMENT,
  `user_id` INT UNIQUE NOT NULL,
  `introduction` TEXT,
  `avg_rating` DECIMAL(10, 2) DEFAULT 0,
  `completed_courses` INT DEFAULT 0,
  `feedback_course_count` INT DEFAULT 0,
  `is_approved` BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (`user_id`) REFERENCES `Accounts` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE `TutorCertificates` (
  `certificate_id` INT PRIMARY KEY AUTO_INCREMENT,
  `tutor_id` INT,
  `certificate_name` VARCHAR(255),
  `issue_date` DATETIME,
  `issuing_authority` VARCHAR(255),
  `note` VARCHAR(255),
  FOREIGN KEY (`tutor_id`) REFERENCES `Tutors` (`tutor_id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `Subjects` (
  `subject_id` INT PRIMARY KEY AUTO_INCREMENT,
  `subject_name` VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE `Classes` (
  `class_id` INT PRIMARY KEY AUTO_INCREMENT,
  `class_name` VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE `SubjectClassMappings` (
  `subject_class_id` INT PRIMARY KEY AUTO_INCREMENT,
  `subject_id` INT,
  `class_id` INT,
  UNIQUE (`subject_id`, `class_id`),
  FOREIGN KEY (`subject_id`) REFERENCES `Subjects` (`subject_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`class_id`) REFERENCES `Classes` (`class_id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `TutorSubjectClasses` (
  `tutor_id` INT,
  `subject_class_id` INT,
  PRIMARY KEY (`tutor_id`, `subject_class_id`),
  FOREIGN KEY (`tutor_id`) REFERENCES `Tutors` (`tutor_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`subject_class_id`) REFERENCES `SubjectClassMappings` (`subject_class_id`) ON DELETE CASCADE ON UPDATE CASCADE
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

CREATE TABLE `TutoringRequests` (
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
  `status` ENUM("PENDING", "APPROVED", "REJECTED", "ASSIGNED", "CANCELLED", "REFUNDED") DEFAULT "PENDING",
  FOREIGN KEY (`customer_id`) REFERENCES `Customers` (`customer_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`tutor_id`) REFERENCES `Tutors` (`tutor_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  FOREIGN KEY (`subject_class_id`) REFERENCES `SubjectClassMappings` (`subject_class_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (`ward_id`) REFERENCES `Ward` (`ward_id`) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE `RequestSchedules` (
  `schedule_id` INT PRIMARY KEY AUTO_INCREMENT,
  `request_id` INT,

  -- CN=1 ; T2->T7 2, 3, ...7
  `day_of_week` INT CHECK(`day_of_week` >= 1 AND `day_of_week` <= 7),
  `start_time` TIME,
  `end_time` TIME,
  FOREIGN KEY (`request_id`) REFERENCES `TutoringRequests` (`request_id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `Courses` (
  `course_id` INT PRIMARY KEY AUTO_INCREMENT,
  `request_id` INT UNIQUE NOT NULL,
  `start_date` DATE,
  `end_date` DATE,
  `status` ENUM("INPROGRESS", "COMPLETED", "CANCELLED") DEFAULT "INPROGRESS",
  `sessions_per_week` INT,
  FOREIGN KEY (`request_id`) REFERENCES `TutoringRequests` (`request_id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `CourseSchedules` (
  `course_id` INT,
  `schedule_id` INT PRIMARY KEY AUTO_INCREMENT,
  `day_of_week` INT CHECK(`day_of_week` >= 1 AND `day_of_week` <= 7),
  `start_time` TIME,
  `end_time` TIME,
  FOREIGN KEY (`course_id`) REFERENCES `Courses` (`course_id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE CourseSchedulesChanges(
  `course_schedule_change_id` int PRIMARY KEY,
  `course_id` INT,
  `new_day_of_week` INT CHECK(`new_day_of_week` >= 1 AND `new_day_of_week` <= 7),
  `new_start_time` TIME,
  `new_end_time` TIME,
  `status` ENUM("PEDING","APPROVED","REJECT"),
  `sender` ENUM("TUTOR","CUSTOMER")
);

CREATE TABLE `CancellationRequests` (
  `cancellation_request_id` INT PRIMARY KEY AUTO_INCREMENT,
  `course_id` INT NOT NULL,
  `requester_type` ENUM("TUTOR", "CUSTOMER"),
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `reason` TEXT,
  FOREIGN KEY (`course_id`) REFERENCES `Courses` (`course_id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `CancellationResponses` (
  `cancellation_response_id` INT PRIMARY KEY AUTO_INCREMENT,
  `cancellation_request_id` INT UNIQUE NOT NULL,
  `admin_id` INT,
  `is_approved` BOOLEAN,
  `reason` TEXT,
  `created_at` DATETIME,
  FOREIGN KEY (`admin_id`) REFERENCES `Admins` (`admin_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  FOREIGN KEY (`cancellation_request_id`) REFERENCES `CancellationRequests` (`cancellation_request_id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `Payments` (
    `payment_id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT,
    `tutoring_request_id` INT,
    `type` ENUM('DEPOSIT', 'PAYMENT', 'REFUND'),
    `amount` INT,
    `description` TEXT,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `Accounts`(`user_id`),
    FOREIGN KEY (`tutoring_request_id`) REFERENCES `TutoringRequests`(`request_id`)
);

CREATE TABLE `RefundReponses` (
    `cancellation_response_id` INT PRIMARY KEY,
    `refund_deposit` INT, -- hoanTienCoc
    `refund_tuition` INT, -- hoanHocPhi
    `id_payment_tutor` INT,
    `id_payment_customer` INT,
    FOREIGN KEY (`cancellation_response_id`) REFERENCES `CancellationResponses`(`cancellation_response_id`),
    FOREIGN KEY (`id_payment_tutor`) REFERENCES `Payments`(`payment_id`),
    FOREIGN KEY (`id_payment_customer`) REFERENCES `Payments`(`payment_id`)
);


CREATE TABLE `Feedbacks` (
  `feedback_id` INT PRIMARY KEY AUTO_INCREMENT,
  `course_id` INT NOT NULL,
  `rating` INT CHECK (`rating` BETWEEN 0 AND 5),
  `content` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`course_id`) REFERENCES `Courses` (`course_id`) ON DELETE CASCADE ON UPDATE CASCADE
);