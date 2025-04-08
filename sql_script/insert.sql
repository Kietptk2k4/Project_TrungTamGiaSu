INSERT INTO Province(province_id, name)
SELECT code, full_name 
FROM vietnamese_administrative_units.provinces
WHERE code = (
    SELECT code 
    FROM vietnamese_administrative_units.provinces
    WHERE full_name = 'Thành phố Hồ Chí Minh');

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
