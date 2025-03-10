package com.trungtangiasu.server.models;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Requests")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Request {
    
    @Id
    @Column(name = "courseId", nullable = false)
    private Integer courseId;
    
    @ManyToOne
    @JoinColumn(name = "subjectId", referencedColumnName = "subjectId", nullable = false)
    private Subject subject;
    
    @ManyToOne
    @JoinColumn(name = "tutorId", referencedColumnName = "tutorId", nullable = false)
    private Tutor tutor;
    
    @Column(name = "subjectName", columnDefinition = "NCHAR", nullable = false)
    private String subjectName;
    
    @Column(name = "numofLec", nullable = false)
    private Integer numOfLec;
    
    @Column(name = "adress", nullable = false, length = 255)
    private String address;
    
    @Column(name = "price", nullable = false)
    private Integer price;
    
    @Column(name = "Request", length = 255)
    private String request;
    
    @Column(name = "Type", length = 50)
    private String type;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private RequestStatus status;
}

enum RequestStatus {
    ACCEPTED,
    REJECTED,
    PENDING
}