package com.trungtangiasu.server.models;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "Enrollments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Enrollment {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "enrollmentId", nullable = false)
    private Integer enrollmentId;
    
    @ManyToOne
    @JoinColumn(name = "studentId", referencedColumnName = "clientId", nullable = false)
    private Client student;
    
    @ManyToOne
    @JoinColumn(name = "classId", referencedColumnName = "courseId", nullable = false)
    private Course course;
    
    @Column(name = "enrollmentDate", nullable = false)
    private LocalDate enrollmentDate;
}
