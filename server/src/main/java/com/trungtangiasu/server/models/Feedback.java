package com.trungtangiasu.server.models;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "Feedbacks")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Feedback {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "feedbackId", nullable = false)
    private Integer feedbackId;
    
    @ManyToOne
    @JoinColumn(name = "courseId", referencedColumnName = "courseId", nullable = false)
    private Course course;
    
    @ManyToOne
    @JoinColumn(name = "clientId", referencedColumnName = "clientId", nullable = false)
    private Client client;
    
    @Column(name = "rating", nullable = false)
    private Integer rating;
    
    @Column(name = "comment", length = 500)
    private String comment;
    
    @Column(name = "feedbackDate", nullable = false)
    private LocalDate feedbackDate;
}