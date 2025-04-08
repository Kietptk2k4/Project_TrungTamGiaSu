DELIMITER $$
CREATE TRIGGER Tutor_Approve_Trigger
BEFORE UPDATE
ON Tutor FOR EACH ROW
BEGIN
    IF OLD.is_approved <> NEW.is_approved THEN
	    IF NEW.is_approved = TRUE THEN
		    INSERT INTO Notification(content, user_id)
            VALUES ('Chao mung ban den voi he thong!', OLD.user_id);
        ELSEIF NEW.is_approved = FALSE THEN
		    SIGNAL SQLSTATE '45000'
		    SET MESSAGE_TEXT = 'Không thể chỉnh is_approved true thành false';
	    END IF;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER trg_update_expired_date
BEFORE UPDATE ON Tutoring_Request
FOR EACH ROW
BEGIN
  SET NEW.expired_at = NOW() + INTERVAL 7 DAY;
END$$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER trg_tutoring_request_before_insert
BEFORE INSERT ON Tutoring_Request
FOR EACH ROW
BEGIN
  IF (
    (NEW.tutor_id IS NULL AND (NEW.status = 'Assigned' OR NEW.status = 'Cancelled')) OR
    (NEW.tutor_id IS NOT NULL AND (NEW.status = 'Approved' OR NEW.status = 'Rejected'))
  ) THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'value (tutor_id, status) is invalid';
  END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER trg_tutoring_request_before_update
BEFORE UPDATE ON Tutoring_Request
FOR EACH ROW
BEGIN
  IF (
    (NEW.tutor_id IS NULL AND (NEW.status = 'Assigned' OR NEW.status = 'Cancelled')) OR
    (NEW.tutor_id IS NOT NULL AND (NEW.status = 'Approved' OR NEW.status = 'Rejected'))
  ) THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'value (tutor_id, status) is invalid';
  END IF;
END$$
DELIMITER ;
