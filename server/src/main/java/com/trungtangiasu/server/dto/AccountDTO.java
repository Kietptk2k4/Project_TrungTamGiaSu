package com.trungtangiasu.server.dto;

import lombok.Data;

@Data
public class AccountDTO {
    private Integer userId;
    private String username;
    private String email;
    private Integer roleId;
    private Boolean isActive;
    private Integer unreadNotifications;
}
