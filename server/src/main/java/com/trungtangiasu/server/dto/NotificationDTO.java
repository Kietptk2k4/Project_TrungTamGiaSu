package com.trungtangiasu.server.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class NotificationDTO {
    private Integer notificationId;
    private String content;
    private Integer userId;
    private LocalDateTime createdAt;
    private Boolean isRead;
}
