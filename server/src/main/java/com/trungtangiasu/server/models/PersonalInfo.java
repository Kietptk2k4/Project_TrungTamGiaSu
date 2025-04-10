package com.trungtangiasu.server.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Personal_Info")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PersonalInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "personal_info_id")
    private Integer personalInfoId;

    @Column(name = "name", length = 255)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "gender", columnDefinition = "ENUM('MALE', 'FEMALE')")
    private Gender gender;

    @Column(name = "phone_number", length = 20, unique = true)
    private String phoneNumber;

    public enum Gender {
        MALE, FEMALE
    }
}