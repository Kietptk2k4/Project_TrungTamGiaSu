package com.trungtangiasu.server.models;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Payment")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Payment {
    
    @Id
    @Column(name = "paymentID", nullable = false)
    private Integer paymentID;
    
    @Column(name = "price", nullable = false)
    private Integer price;
    
    @ManyToOne
    @JoinColumn(name = "tutorID", referencedColumnName = "tutorId", nullable = false)
    private Tutor tutor;
    
    @ManyToOne
    @JoinColumn(name = "clientId", referencedColumnName = "clientId", nullable = false)
    private Client client;
    
    @ManyToOne
    @JoinColumn(name = "courseId", referencedColumnName = "courseId", nullable = false)
    private Course course;
    
    @Column(name = "servicefee", nullable = false)
    private Integer serviceFee;
}
