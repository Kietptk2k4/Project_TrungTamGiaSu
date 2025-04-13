-- 
-- INSERT TINH THANH
-- 
INSERT INTO Province(province_id, name)
SELECT code, full_name 
FROM vietnamese_administrative_units.provinces
WHERE code IN (
    SELECT code 
    FROM vietnamese_administrative_units.provinces
    WHERE full_name = 'Thành phố Hồ Chí Minh')
    OR full_name = 'Thành phố Hà Nội'
    OR full_name = 'Thành phố Đà Nẵng';

INSERT INTO District(district_id, province_id, name)
SELECT code, province_code,full_name
FROM vietnamese_administrative_units.districts
WHERE province_code IN (SELECT province_id FROM Province);

INSERT INTO Ward(ward_id, district_id, name)
SELECT code, district_code, full_name
FROM vietnamese_administrative_units.wards
WHERE district_code IN 
    (SELECT district_id 
    FROM District);

-- 
-- INSERT NGUOI DUNG , ROLE, PERSONAL INFOR
-- 3 account
-- Tu: admin , user_id = 1, admin_id = 1
-- Dat: tutor, user_id = 2, tutor_id = 1
-- Son: customer, user_id = 3, customer_id = 1
-- Kiet: customer, user_id = 4, customer_id = 2
-- 

INSERT INTO Role( role_name)
VALUES ('ADMIN'),
       ('TUTOR'),
       ('CUSTOMER');

-- ACCOUNT
INSERT INTO Account(username, email, hashed_password, role_id)
VALUES
    ("Tu123", "n22dccn193@student.pitihcm.edu.vn", "pass", 1), -- admin
    ("Dat123", "n22dccn120@student.pitihcm.edu.vn", "pass", 2), -- tutor 
    ("Son123", "n22dccn169@student.pitihcm.edu.vn", "pass", 3), -- customer
    ("Kiet123", "n22dccn145@student.pitihcm.edu.vn", "pass", 3), -- customer
    ("gs_dang_cho_duyet", "gs@gmail.com", "pass", 2); -- tutor dang cho duyet, tutor_ id = 2


INSERT INTO Personal_Info (name, gender, phone_number)
VALUES 
("Le Ngoc Tu", "MALE", "07546352758"), -- id 1
("Vu Tien Dat", "MALE", "0098743526"), -- id 2
("Dam Huy Son", "MALE", "0643212123"), -- id 3
("Phan Tuan Kiet", "MALE", "0893464738"), -- id 4
("Nguyen Van Teo", "MALE", "2309480923");

INSERT INTO Admin(user_id, personal_info_id)
VALUES (1, 1);

INSERT INTO Customer(user_id,personal_info_id, address)
VALUES (3,  3, "123 Nguyen Van Cu, District 5, Ho Chi Minh City"),
       (4,  4, "456 Le Loi, District 1, Ho Chi Minh City");

INSERT INTO Tutor(user_id,personal_info_id , introduction, is_approved)
VALUES 
    (2, 2, "Chao, toi la Gia su Mon Toan", TRUE),
    (5, 5, "Chao, toi la Gia su Mon Ly", FALSE);
   
INSERT INTO Subject(subject_name)
VALUES 
    ("Toan"),
    ("Ly"),
    ("Hoa"),
    ("Anh");

INSERT INTO Tutor_Certificate(tutor_id, certificate_name, issue_date, issuing_authority)
VALUES (1, "Chung chi Toan", "2023-01-01 00:00:00", "Truong Dai Hoc Bach Khoa"),
        (2, "Chung chi Ly", "2023-01-01 00:00:00", "Truong Dai Hoc Bach Khoa");

INSERT INTO Class(class_name)   
VALUES 
    ("Lop 10"),
    ("Lop 11"),
    ("Lop 12");

INSERT INTO Subject_Class_Mapping(subject_id, class_id)    
VALUES 
    (1, 1),(1, 2), (1, 3), -- 1 2 3 
    (2, 1), (2, 2), (2, 3), -- 4 5 6
    (3, 1), (3, 2), (3, 3), -- 7 8 9
    (4, 1), (4, 2), (4, 3); -- 10 11 12

INSERT INTO Tutor_Subject_Class(tutor_id, subject_class_id)
VALUES 
        (1, 1),
        (1, 2),
        (1, 3),

        (2, 4),
        (2, 5),
        (2, 6);

INSERT INTO Tutoring_Request
(customer_id, tutor_id, subject_class_id, sessions_per_week, ward_id, address_detail, proposed_fee_per_session)
VALUES
(1, 1,      1, 2, 26839, "123 Nguyen Van Cu", 50000),  -- toan 11 phuong hiep phu 2 buoi /tuan; 50k/buoi; chua tao thanh lop hoc
(2, NULL,   6, 3, 27127, "ko biet", 600000); -- ly 12 phuong 14 quan 3 3 buoi/tuan, 60k/buoi; chua tao thanh lop hoc

INSERT INTO Request_Schedule (request_id, day_of_week, start_time, end_time)
VALUES
    (1, 1, '08:00:00', '10:00:00'),  -- Thứ 2, 08:00 - 10:00
    (1, 3, '10:00:00', '12:00:00'),  -- Thứ 3, 10:00 - 12:00
    (2, 5, '14:00:00', '16:00:00'),  -- Thứ 5, 14:00 - 16:00
    (2, 6, '08:00:00', '10:00:00'),  -- Thứ 6, 08:00 - 10:00
    (2, 7, '16:00:00', '18:00:00');  -- Thứ 7, 16:00 - 18:00
