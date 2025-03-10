package com.trungtangiasu.server.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "ClientInfors")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClientInfor {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "userId", nullable = false)
    private Integer userId;
    
    @OneToOne
    @JoinColumn(name = "accountId", referencedColumnName = "accountId", unique = true, nullable = false)
    private Account account;
    
    @Column(name = "email", nullable = false, length = 255)
    private String email;
    
    @Column(name = "phone", nullable = false, length = 20)
    private String phone;
    
    @Column(name = "gender", nullable = false, length = 10)
    private String gender;
    
    @Column(name = "address", nullable = false, length = 500)
    private String address;
}