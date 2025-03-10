package com.trungtangiasu.server.models;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "Clients")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Client {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "clientId", nullable = false)
    private Integer clientId;
    
    @OneToOne
    @JoinColumn(name = "userId", referencedColumnName = "userId", nullable = false)
    private ClientInfor clientInfor;
    
    @Column(name = "enrollment_date", nullable = false)
    private LocalDate enrollmentDate;
}
