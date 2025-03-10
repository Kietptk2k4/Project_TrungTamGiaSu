package com.trungtangiasu.server.models;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Tutors")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Tutor {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tutorId", nullable = false)
    private Integer tutorId;
    
    @OneToOne
    @JoinColumn(name = "userId", referencedColumnName = "userId", nullable = false)
    private ClientInfor clientInfor;
}