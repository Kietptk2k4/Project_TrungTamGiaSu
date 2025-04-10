package com.trungtangiasu.server.dto;

import lombok.Data;

@Data
public class PersonalInfoDTO {
    private Integer personalInfoId;
    private String name;
    private String gender; // MALE or FEMALE
    private String phoneNumber;
}