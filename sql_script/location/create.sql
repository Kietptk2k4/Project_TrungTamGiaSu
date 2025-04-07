CREATE DATABASE location;
USE location;
-- CREATE TABLES
CREATE TABLE Provinces(
    code varchar(255) PRIMARY KEY,
    name varchar(255)
);

CREATE TABLE Districts(
    code varchar(255) PRIMARY KEY, 
    province_code varchar(255),
    name varchar(255),
    FOREIGN KEY (province_code) REFERENCES Provinces(code)
);

CREATE TABLE Wards(
    code varchar(255) PRIMARY KEY,
    district_code varchar(255), 
    name varchar(255),
    FOREIGN KEY (district_code) REFERENCES Districts(code)
);

-- INSERT

INSERT INTO Provinces(code, name)
SELECT code, full_name 
FROM vietnamese_administrative_units.provinces
WHERE code = (
    SELECT code 
    FROM vietnamese_administrative_units.provinces
    WHERE full_name = 'Thành phố Hồ Chí Minh');

INSERT INTO Districts(code, province_code, name)
SELECT code, province_code,full_name
FROM vietnamese_administrative_units.districts
WHERE province_code IN (SELECT code FROM Provinces);

INSERT INTO Wards(code, district_code, name)
SELECT code, district_code, full_name
FROM vietnamese_administrative_units.wards
WHERE district_code IN 
    (SELECT code 
    FROM Districts);
