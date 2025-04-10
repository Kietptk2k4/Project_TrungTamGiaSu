package com.trungtangiasu.server.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Customer")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "customer_id")
    private Integer customerId;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id", nullable = false)
    private Account user;

    @OneToOne
    @JoinColumn(name = "personal_info_id", referencedColumnName = "personal_info_id", nullable = false)
    private PersonalInfo personalInfo;

    @Column(name = "address", columnDefinition = "TEXT")
    private String address;
}