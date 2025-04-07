-- Database Schema Exported to MySQL
-- Docs: https://dbml.dbdiagram.io/docs

-- Set default engine and character set
SET default_storage_engine=InnoDB;
SET NAMES utf8mb4;

-- Create tables in dependency order

CREATE TABLE `Role` (
  `role_id` INT PRIMARY KEY,
  `role_name` VARCHAR(100) -- Increased length for role names
);

CREATE TABLE `Permission` (
  `permission_id` INT PRIMARY KEY,
  `permission_name` VARCHAR(100) UNIQUE NOT NULL COMMENT 'Permission name (E.g., "CREATE_COURSE", "EDIT_COURSE")', -- Increased length
  `description` VARCHAR(255) COMMENT 'Permission description'
);

CREATE TABLE `Account` (
  `user_id` INT PRIMARY KEY AUTO_INCREMENT COMMENT 'Added primary key and auto-increment',
  `username` VARCHAR(100) UNIQUE NOT NULL COMMENT 'Added unique and not null constraint', -- Increased length
  `email` VARCHAR(255) UNIQUE NOT NULL COMMENT 'Added unique and not null constraint',
  `password` VARCHAR(255) NOT NULL COMMENT 'Added not null constraint - Store hashed passwords!',
  `role_id` INT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Added default timestamp',
  `is_active` BOOLEAN DEFAULT TRUE COMMENT 'Added default value',
  FOREIGN KEY (`role_id`) REFERENCES `Role` (`role_id`) ON DELETE SET NULL ON UPDATE CASCADE -- Allow setting role to NULL if deleted, update if role_id changes
) COMMENT='Stores user account login information';

CREATE TABLE `Customer` (
  `customer_id` INT PRIMARY KEY AUTO_INCREMENT COMMENT 'Renamed id and added increment',
  `user_id` INT UNIQUE NOT NULL COMMENT 'Changed reference direction, added unique constraint assuming one account per customer', -- Added NOT NULL
  `name` VARCHAR(255),
  `gender` VARCHAR(20), -- Increased length
  `address` TEXT COMMENT 'Consider normalizing address if more detail is needed later', -- Changed to TEXT
  `phone_number` VARCHAR(20), -- Standardized phone length
  FOREIGN KEY (`user_id`) REFERENCES `Account` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE -- Cascade delete if account is removed
) COMMENT='Customer profile information';

CREATE TABLE `Tutor` (
  `tutor_id` INT PRIMARY KEY AUTO_INCREMENT COMMENT 'Renamed id and added increment',
  `user_id` INT UNIQUE NOT NULL COMMENT 'Changed reference direction, added unique constraint assuming one account per tutor', -- Added NOT NULL
  `name` VARCHAR(255),
  `gender` VARCHAR(20), -- Increased length
  `introduction` TEXT COMMENT 'Renamed LoiGioiThieu, changed to TEXT',
  `is_approved` BOOLEAN DEFAULT FALSE COMMENT 'Renamed duocDuyet',
  FOREIGN KEY (`user_id`) REFERENCES `Account` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE -- Cascade delete if account is removed
) COMMENT='Tutor profile information';

CREATE TABLE `Admin` (
  `admin_id` INT PRIMARY KEY AUTO_INCREMENT COMMENT 'Renamed id and added increment',
  `user_id` INT UNIQUE NOT NULL COMMENT 'Changed reference direction, added unique constraint assuming one account per admin', -- Added NOT NULL
  `name` VARCHAR(255),
  FOREIGN KEY (`user_id`) REFERENCES `Account` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE -- Cascade delete if account is removed
) COMMENT='Admin profile information';

CREATE TABLE `Province` (
  `province_id` VARCHAR(20) PRIMARY KEY COMMENT 'Renamed id, specified length',
  `name` VARCHAR(100) UNIQUE -- Increased length
) COMMENT='List of provinces/cities';

CREATE TABLE `District` (
  `district_id` VARCHAR(20) PRIMARY KEY COMMENT 'Renamed id, specified length',
  `name` VARCHAR(100) UNIQUE, -- Increased length
  `province_id` VARCHAR(20), -- Specified length
  FOREIGN KEY (`province_id`) REFERENCES `Province` (`province_id`) ON DELETE RESTRICT ON UPDATE CASCADE -- Restrict deletion of province if districts exist
) COMMENT='List of districts';

CREATE TABLE `Ward` (
  `ward_id` VARCHAR(20) PRIMARY KEY COMMENT 'Renamed id and made PK, specified length',
  `name` VARCHAR(100), -- Increased length
  `district_id` VARCHAR(20), -- Specified length
  FOREIGN KEY (`district_id`) REFERENCES `District` (`district_id`) ON DELETE RESTRICT ON UPDATE CASCADE -- Restrict deletion of district if wards exist
) COMMENT='List of wards/communes';

CREATE TABLE `Subject` (
  `subject_id` INT PRIMARY KEY AUTO_INCREMENT COMMENT 'Renamed id_MonHoc',
  `subject_name` VARCHAR(100) UNIQUE COMMENT 'Renamed ten_monHoc, added unique, increased length'
) COMMENT='List of subjects taught';

CREATE TABLE `Class` (
  `class_id` INT PRIMARY KEY AUTO_INCREMENT COMMENT 'Renamed id_lop (could be GradeLevel)',
  `class_name` VARCHAR(100) UNIQUE COMMENT 'Renamed tenLop, added unique, increased length'
) COMMENT='List of classes/grades';

CREATE TABLE `Subject_Class_Mapping` (
  `subject_id` INT,
  `class_id` INT,
  PRIMARY KEY (`subject_id`, `class_id`), -- Composite key defines a valid teaching combination
  FOREIGN KEY (`subject_id`) REFERENCES `Subject` (`subject_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`class_id`) REFERENCES `Class` (`class_id`) ON DELETE CASCADE ON UPDATE CASCADE
) COMMENT='Mapping table defining valid combinations of subjects and classes';

CREATE TABLE `Tutor_Subject_Class` (
  `tutor_id` INT,
  `subject_id` INT,
  `class_id` INT,
  PRIMARY KEY (`tutor_id`, `subject_id`, `class_id`),
  FOREIGN KEY (`tutor_id`) REFERENCES `Tutor` (`tutor_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`subject_id`, `class_id`) REFERENCES `Subject_Class_Mapping` (`subject_id`, `class_id`) ON DELETE CASCADE ON UPDATE CASCADE -- Composite Foreign Key
) COMMENT='Links tutors to specific subject-class combinations they can teach';

CREATE TABLE `Tutor_Certificate` (
  `tutor_id` INT COMMENT 'Renamed id_GiaSu',
  `certificate_id` INT COMMENT 'Renamed id_BangCap - Made INT, consider if needs to be unique per tutor',
  `certificate_name` VARCHAR(255) COMMENT 'Renamed Ten_Bang',
  `issue_date` DATE COMMENT 'Renamed NgayCap',
  `issuing_authority` VARCHAR(255) COMMENT 'Renamed NoiCap',
  `note` TEXT, -- Changed to TEXT
  PRIMARY KEY (`tutor_id`, `certificate_id`), -- Made composite primary key
  FOREIGN KEY (`tutor_id`) REFERENCES `Tutor` (`tutor_id`) ON DELETE CASCADE ON UPDATE CASCADE
) COMMENT='Stores tutor certificates/qualifications';

CREATE TABLE `TutoringRequest` (
  `request_id` INT PRIMARY KEY AUTO_INCREMENT COMMENT 'Renamed id_BaiDang and added increment',
  `customer_id` INT NOT NULL, -- Added NOT NULL
  `tutor_id` INT COMMENT 'Renamed id_GiaSu (Can be null if customer posts a general request)',
  `subject_id` INT NOT NULL, -- Added NOT NULL
  `class_id` INT NOT NULL, -- Added NOT NULL
  `number_of_sessions` INT COMMENT 'Renamed SoBuoi',
  `teaching_days_preference` VARCHAR(255) COMMENT 'Renamed NgayDay - describes preferred days/times',
  `ward_id` VARCHAR(20) NOT NULL, -- Added NOT NULL, specified length
  `proposed_fee` VARCHAR(100) COMMENT 'Renamed GiaTien - Kept as varchar for flexibility like "Negotiable"', -- Increased length
  `is_assigned` BOOLEAN DEFAULT FALSE COMMENT 'Renamed DaDuocChon',
  `created_date` DATE, -- Renamed ngayTao
  `status` ENUM("Pending", "Approved", "Rejected") DEFAULT "Pending" COMMENT 'Renamed TrangThai and translated values',
  FOREIGN KEY (`customer_id`) REFERENCES `Customer` (`customer_id`) ON DELETE CASCADE ON UPDATE CASCADE, -- Cascade if customer is deleted
  FOREIGN KEY (`tutor_id`) REFERENCES `Tutor` (`tutor_id`) ON DELETE SET NULL ON UPDATE CASCADE, -- Set tutor to NULL if tutor is deleted
  FOREIGN KEY (`subject_id`) REFERENCES `Subject` (`subject_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (`class_id`) REFERENCES `Class` (`class_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (`ward_id`) REFERENCES `Ward` (`ward_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  INDEX `idx_tutoringrequest_customer` (`customer_id`),
  INDEX `idx_tutoringrequest_tutor` (`tutor_id`),
  INDEX `idx_tutoringrequest_status` (`status`)
) COMMENT='Customer requests for tutoring';

CREATE TABLE `Request_Schedule` (
  `request_id` INT COMMENT 'Renamed idYeuCau',
  `schedule_item_id` INT COMMENT 'Renamed idLich - Made INT, represents an item sequence',
  `day_of_week` VARCHAR(20) COMMENT 'Renamed ngay (e.g., "Monday", "Tuesday")',
  `start_time` TIME COMMENT 'Renamed start, changed type to time',
  `end_time` TIME COMMENT 'Renamed end, changed type to time',
  PRIMARY KEY (`request_id`, `schedule_item_id`), -- Made composite primary key
  FOREIGN KEY (`request_id`) REFERENCES `TutoringRequest` (`request_id`) ON DELETE CASCADE ON UPDATE CASCADE
) COMMENT='Preferred schedule requested by customer';

CREATE TABLE `Course` (
  `course_id` INT PRIMARY KEY AUTO_INCREMENT COMMENT 'Renamed id_KhoaHoc and added increment',
  `request_id` INT UNIQUE NOT NULL COMMENT 'Renamed id_BaiDang, added unique constraint assuming 1 course per approved request', -- Added NOT NULL
  `start_date` DATE,
  `end_date` DATE,
  `status` ENUM("In Progress", "Completed", "Ended", "Cancelled") COMMENT 'Renamed TrangThai and values, added Cancelled',
  `sessions_per_week` INT COMMENT 'Renamed soBuoiTrongTuan',
  FOREIGN KEY (`request_id`) REFERENCES `TutoringRequest` (`request_id`) ON DELETE CASCADE ON UPDATE CASCADE, -- Cascade delete if original request is deleted
  INDEX `idx_course_request` (`request_id`),
  INDEX `idx_course_status` (`status`)
) COMMENT='Represents an active or past tutoring course';

CREATE TABLE `Course_Schedule` (
  `course_id` INT,
  `schedule_item_id` INT COMMENT 'Renamed idLich - Made INT',
  `day_of_week` VARCHAR(20) COMMENT 'Renamed ngay',
  `start_time` TIME COMMENT 'Renamed start, changed type to time',
  `end_time` TIME COMMENT 'Renamed end, changed type to time',
  PRIMARY KEY (`course_id`, `schedule_item_id`), -- Made composite primary key
  FOREIGN KEY (`course_id`) REFERENCES `Course` (`course_id`) ON DELETE CASCADE ON UPDATE CASCADE
) COMMENT='Actual agreed schedule for the course';

CREATE TABLE `Feedback` (
  `feedback_id` INT PRIMARY KEY AUTO_INCREMENT COMMENT 'Added primary key',
  `course_id` INT NOT NULL, -- Added NOT NULL
  `user_id` INT NOT NULL COMMENT 'Added user_id to know who gave feedback (customer or tutor)', -- Added NOT NULL
  `rating` INT COMMENT 'Optional: Added rating (e.g., 1-5 stars)',
  `content` TEXT COMMENT 'Renamed NoiDung, changed to text',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Added timestamp',
  FOREIGN KEY (`course_id`) REFERENCES `Course` (`course_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`user_id`) REFERENCES `Account` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE, -- Cascade if user deleted
  INDEX `idx_feedback_course` (`course_id`),
  INDEX `idx_feedback_user` (`user_id`)
) COMMENT='Feedback provided for a course by customer or tutor';

CREATE TABLE `Payment` (
  `payment_id` INT PRIMARY KEY AUTO_INCREMENT COMMENT 'Renamed id_HoaDon',
  `course_id` INT NOT NULL COMMENT 'Renamed id_KhoaHoc',
  `customer_id` INT NOT NULL COMMENT 'Added customer link (inferred from course -> request -> customer)',
  `amount` DECIMAL(15, 2) NOT NULL COMMENT 'Renamed SoTien, changed type',
  `payment_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Added payment date',
  `payment_method` VARCHAR(50) COMMENT 'Added payment method',
  `transaction_code` VARCHAR(100) COMMENT 'Added optional transaction code',
  `payment_status` VARCHAR(30) DEFAULT 'Completed' COMMENT 'e.g., "Completed", "Pending", "Failed"',
  `processed_by_user_id` INT COMMENT 'Renamed nguoiGui to reflect processor, link to Account',
  `description` TEXT COMMENT 'Renamed noiDung, changed type to text',
  `notes` TEXT COMMENT 'Renamed ghichu, changed type to text',
  FOREIGN KEY (`course_id`) REFERENCES `Course` (`course_id`) ON DELETE RESTRICT ON UPDATE CASCADE, -- Restrict deleting course if payments exist
  FOREIGN KEY (`customer_id`) REFERENCES `Customer` (`customer_id`) ON DELETE RESTRICT ON UPDATE CASCADE, -- Restrict deleting customer if payments exist
  FOREIGN KEY (`processed_by_user_id`) REFERENCES `Account` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE, -- Set processor to NULL if account deleted
  INDEX `idx_payment_course` (`course_id`),
  INDEX `idx_payment_customer` (`customer_id`),
  INDEX `idx_payment_date` (`payment_date`)
) COMMENT='Records customer payments for courses (tuition fees)';

CREATE TABLE `Tutor_Deposit` (
  `deposit_id` INT PRIMARY KEY AUTO_INCREMENT COMMENT 'Renamed id_HoaDon_TienCoc',
  `course_id` INT NOT NULL, -- Added NOT NULL
  `tutor_id` INT NOT NULL, -- Added NOT NULL
  `amount` DECIMAL(15, 2) NOT NULL COMMENT 'Renamed SoTien, Changed to Decimal, Added NOT NULL',
  `description` VARCHAR(255), -- Renamed noidung, Increased length
  `notes` TEXT, -- Renamed GhiChu, changed to TEXT
  `payment_date` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT 'Added payment date for deposit',
  `status` VARCHAR(30) DEFAULT 'Paid' COMMENT 'Added status e.g., Paid, Refunded',
  FOREIGN KEY (`course_id`) REFERENCES `Course` (`course_id`) ON DELETE RESTRICT ON UPDATE CASCADE, -- Restrict course deletion if deposit exists
  FOREIGN KEY (`tutor_id`) REFERENCES `Tutor` (`tutor_id`) ON DELETE RESTRICT ON UPDATE CASCADE, -- Restrict tutor deletion if deposit exists
  INDEX `idx_tutordeposit_course` (`course_id`),
  INDEX `idx_tutordeposit_tutor` (`tutor_id`)
) COMMENT='Records deposits paid by tutors for assigned courses';

CREATE TABLE `Tutor_Refund` (
  `refund_id` INT PRIMARY KEY AUTO_INCREMENT COMMENT 'Renamed id_HoaDon_TienHoan',
  `deposit_id` INT UNIQUE NOT NULL COMMENT 'Renamed idHoaDon_TienCoc, added unique constraint, NOT NULL',
  `amount` DECIMAL(15, 2) NOT NULL COMMENT 'Added refund amount, Added NOT NULL',
  `description` VARCHAR(255), -- Renamed noidung, Increased length
  `notes` TEXT, -- Renamed GhiChu, changed to TEXT
  `refund_date` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT 'Added refund date',
  `processed_by_user_id` INT COMMENT 'Added processor link',
  FOREIGN KEY (`deposit_id`) REFERENCES `Tutor_Deposit` (`deposit_id`) ON DELETE CASCADE ON UPDATE CASCADE, -- Cascade delete if original deposit is deleted
  FOREIGN KEY (`processed_by_user_id`) REFERENCES `Account` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE -- Set processor to NULL if account deleted
) COMMENT='Records refunds of tutor deposits';

CREATE TABLE `Cancellation_Request` (
  `cancellation_request_id` INT PRIMARY KEY AUTO_INCREMENT COMMENT 'Renamed id',
  `course_id` INT NOT NULL, -- Added NOT NULL
  `requester_type` ENUM("Tutor", "Customer") COMMENT 'Renamed nguoiGui and values',
  `requested_at` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT 'Renamed thoiGianGui',
  `reason` TEXT, -- Changed to TEXT
  FOREIGN KEY (`course_id`) REFERENCES `Course` (`course_id`) ON DELETE CASCADE ON UPDATE CASCADE -- Cascade delete if course is deleted
) COMMENT='Requests to cancel an ongoing course';

CREATE TABLE `Cancellation_Response` (
  `cancellation_response_id` INT PRIMARY KEY AUTO_INCREMENT COMMENT 'Renamed id',
  `admin_id` INT, -- Link to Admin who responded
  `cancellation_request_id` INT UNIQUE NOT NULL COMMENT 'Renamed idYeuCau, added unique constraint, NOT NULL',
  `is_approved` BOOLEAN COMMENT 'Renamed chapNhan',
  `reason` TEXT COMMENT 'Renamed lydo, changed to TEXT',
  `refund_deposit` BOOLEAN DEFAULT FALSE COMMENT 'Renamed hoanToanCoc',
  `refund_tuition` BOOLEAN DEFAULT FALSE COMMENT 'Renamed hoanHocPhi',
  `response_date` DATE, -- Renamed thoiGian
  FOREIGN KEY (`admin_id`) REFERENCES `Admin` (`admin_id`) ON DELETE SET NULL ON UPDATE CASCADE, -- Set admin to NULL if deleted
  FOREIGN KEY (`cancellation_request_id`) REFERENCES `Cancellation_Request` (`cancellation_request_id`) ON DELETE CASCADE ON UPDATE CASCADE -- Cascade delete if request is deleted
) COMMENT='Admin response to a cancellation request';

CREATE TABLE `Role_Permission` (
  `role_id` INT,
  `permission_id` INT,
  PRIMARY KEY (`role_id`, `permission_id`),
  FOREIGN KEY (`role_id`) REFERENCES `Role` (`role_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`permission_id`) REFERENCES `Permission` (`permission_id`) ON DELETE CASCADE ON UPDATE CASCADE
) COMMENT='Mapping table for roles and their permissions';

CREATE TABLE `Notification` (
  `notification_id` INT PRIMARY KEY AUTO_INCREMENT COMMENT 'Renamed id and added increment',
  `content` TEXT, -- Changed to TEXT
  `user_id` INT NOT NULL, -- Added NOT NULL
  `notification_date` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT 'Renamed thoiGian, Changed to DATETIME',
  `is_read` BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (`user_id`) REFERENCES `Account` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE, -- Cascade delete notifications if user deleted
  INDEX `idx_notification_user` (`user_id`),
  INDEX `idx_notification_read_date` (`is_read`, `notification_date`)
) COMMENT='Stores notifications for users';
