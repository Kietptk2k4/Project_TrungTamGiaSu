package com.trungtangiasu.server.dto;

import lombok.Data;

@Data
public class CustomerDTO {
    private Integer customerId;
    private Integer userId;
    private Integer personalInfoId;
    private String address;
}