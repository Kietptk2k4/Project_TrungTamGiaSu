package com.trungtangiasu.server.repository;

import com.trungtangiasu.server.models.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Integer> {
    List<Notification> findByUserUserId(Integer userId);
    List<Notification> findByUserUserIdAndIsReadFalse(Integer userId);
}
