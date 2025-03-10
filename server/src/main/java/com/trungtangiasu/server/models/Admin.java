package com.trungtangiasu.server.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Admins")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Admin {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "adminId", nullable = false)
    private Integer adminId;
    
    @OneToOne
    @JoinColumn(name = "userId", referencedColumnName = "userId", nullable = false)
    private ClientInfor clientInfor;
}
