package com.trungtangiasu.server.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Accounts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Account {
    
    @Id
    @Column(name = "accountId", nullable = false, length = 255)
    private String accountId;
    
    @Column(name = "username", nullable = false, length = 255)
    private String username;
    
    @Column(name = "email", nullable = false, unique = true, length = 255)
    private String email;
    
    @Column(name = "password", nullable = false, length = 255)
    private String password;
    
    @Column(name = "role", nullable = false, length = 255)
    private String role;
    
    @Column(name = "isActive", nullable = false)
    private Boolean isActive;
}
