package com.trungtangiasu.server.service;

import com.trungtangiasu.server.models.Notification;
import com.trungtangiasu.server.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    // Lấy danh sách thông báo theo User ID
    public List<Notification> getNotificationsByUserId(Integer userId) {
        return notificationRepository.findByUserUserId(userId);
    }

    // Đánh dấu thông báo là đã đọc
    public Notification markAsRead(Integer notificationId) {
        Notification notification = notificationRepository.findById(notificationId).orElse(null);
        if (notification != null) {
            notification.setIsRead(true);
            return notificationRepository.save(notification);
        }
        return null;
    }
}
